import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot, Zap, Sparkles, Lock, Mic, MicOff, Trash2, Paperclip, Image as ImageIcon } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { generateContentWithFallback } from '../utils/aiFallback';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { useCredits } from '../contexts/CreditsContext';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  attachment?: { url: string, type: string, base64: string };
}

export function Chatbot({ isLocked = false }: { isLocked?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chatbot_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse chatbot messages", e);
      }
    }
    return [{ id: '1', role: 'model', text: 'Hi! I am your AI English Assistant. How can I help you today?' }];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [deletingMessageId, setDeletingMessageId] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<{url: string, type: string, file: File, base64: string} | null>(null);
  const [viewingAttachment, setViewingAttachment] = useState<{url: string, type: string} | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const { consumeCredits, apiKeys, useCustomKeys } = useCredits();

  useEffect(() => {
    localStorage.setItem('chatbot_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleListening = async () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    try {
      // Request microphone permission explicitly first
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      console.error("Microphone permission denied:", err);
      alert("Microphone permission is required to use speech recognition. Please allow microphone access in your browser settings.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + (prev ? ' ' : '') + transcript);
    };
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error !== 'no-speech') {
        alert(`Microphone error: ${event.error}. Please try again.`);
      }
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    
    try {
      recognition.start();
    } catch (err) {
      console.error("Failed to start recognition:", err);
      setIsListening(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setAttachment({
        url: URL.createObjectURL(file),
        type: file.type,
        file,
        base64
      });
    };
    reader.readAsDataURL(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !attachment) return;

    // Check credits before sending
    const creditCost = isAdvanced ? 2 : 1;
    if (!consumeCredits(creditCost, 'Chatbot AI')) {
      alert('Insufficient credits. Please buy more credits or use your own API key.');
      return;
    }

    const userText = input.trim();
    const currentAttachment = attachment;
    
    setInput('');
    setAttachment(null);
    
    const newMessages = [...messages, { 
      id: Date.now().toString(), 
      role: 'user' as const, 
      text: userText,
      attachment: currentAttachment ? { url: currentAttachment.url, type: currentAttachment.type, base64: currentAttachment.base64 } : undefined
    }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API key is missing.");
      }
      const ai = new GoogleGenAI({ apiKey });
      
      // Format history for generateContent (skip the initial greeting)
      const contents = newMessages.slice(1).map(msg => {
        const parts: any[] = [];
        if (msg.text) parts.push({ text: msg.text });
        if (msg.attachment && msg.attachment.base64) {
          const base64Data = msg.attachment.base64.split(',')[1];
          parts.push({
            inlineData: {
              data: base64Data,
              mimeType: msg.attachment.type
            }
          });
        }
        return { role: msg.role, parts };
      });

      const response = await generateContentWithFallback(ai, {
        model: isAdvanced ? 'gemini-3.1-pro-preview' : 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: 'You are a helpful English language learning assistant. Answer questions about grammar, vocabulary, pronunciation, and general English usage clearly and concisely. Provide gentle, contextual corrections for the user\'s pronunciation and grammar mistakes during the conversation. Always prompt the user to repeat the correct phrase after providing a correction.',
        }
      });
      
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: response.text || 'Sorry, I could not generate a response.' 
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: 'Sorry, there was an error connecting to the AI. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => { if (!isLocked) setIsOpen(true); }}
        disabled={isLocked}
        className={`fixed bottom-24 lg:bottom-6 right-4 lg:right-6 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform z-40 ${isOpen ? 'scale-0' : 'scale-100'} ${isLocked ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105'}`}
        aria-label="Open AI Chatbot"
      >
        {isLocked ? <Lock className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-24 lg:bottom-6 right-4 lg:right-6 ${viewingAttachment ? 'w-[700px] sm:w-[800px]' : 'w-[340px] sm:w-96'} h-[500px] max-h-[75vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-row z-50 overflow-hidden transition-all duration-300`}
          >
            {/* Side Attachment Viewer */}
            {viewingAttachment && (
              <div className="w-1/2 bg-slate-100 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col relative">
                <div className="absolute top-2 right-2 z-10">
                  <button 
                    onClick={() => setViewingAttachment(null)}
                    className="p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
                  {viewingAttachment.type.startsWith('image/') ? (
                    <img src={viewingAttachment.url} alt="Attachment" className="max-w-full max-h-full object-contain rounded-lg" />
                  ) : viewingAttachment.type.startsWith('video/') ? (
                    <video src={viewingAttachment.url} controls className="max-w-full max-h-full rounded-lg" />
                  ) : (
                    <div className="flex flex-col items-center text-slate-500">
                      <ImageIcon className="w-12 h-12 mb-2" />
                      <p>Preview not available</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className={`flex flex-col h-full ${viewingAttachment ? 'w-1/2' : 'w-full'}`}>
              {/* Header */}
              <div className="p-4 bg-indigo-600 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <h3 className="font-semibold">AI Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAdvanced(!isAdvanced)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                    isAdvanced 
                      ? 'bg-amber-500 text-white shadow-sm' 
                      : 'bg-indigo-500/50 text-indigo-100 hover:bg-indigo-500'
                  }`}
                  title={isAdvanced ? "Advanced Mode (Pro)" : "Fast Mode (Flash)"}
                >
                  {isAdvanced ? <Sparkles className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
                  {isAdvanced ? 'Advanced' : 'Fast'}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-indigo-700 rounded-md transition-colors ml-1"
                  aria-label="Close Chatbot"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    onClick={() => setDeletingMessageId(msg.id)}
                    className={`relative max-w-[85%] p-3 rounded-2xl cursor-pointer transition-all ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-sm' 
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-sm shadow-sm'
                    } ${deletingMessageId === msg.id ? 'ring-2 ring-rose-500 opacity-90' : 'hover:opacity-90'}`}
                    title="Click to delete"
                  >
                    {deletingMessageId === msg.id ? (
                      <div className="flex flex-col items-center justify-center gap-2 min-w-[120px]">
                        <p className="text-sm font-medium mb-1 flex items-center gap-1">
                          <Trash2 className="w-4 h-4" /> Delete?
                        </p>
                        <div className="flex gap-2 w-full">
                          <button 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              setMessages(prev => prev.filter(m => m.id !== msg.id)); 
                              setDeletingMessageId(null); 
                            }}
                            className="flex-1 px-2 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-md hover:bg-rose-600 transition-colors"
                          >
                            Yes
                          </button>
                          <button 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              setDeletingMessageId(null); 
                            }}
                            className={`flex-1 px-2 py-1.5 text-xs font-bold rounded-md transition-colors ${
                              msg.role === 'user' 
                                ? 'bg-indigo-500 hover:bg-indigo-400 text-white' 
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
                            }`}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    ) : msg.role === 'user' ? (
                      <div className="flex flex-col gap-2">
                        {msg.attachment && (
                          <div 
                            className="relative rounded-lg overflow-hidden cursor-pointer border border-indigo-400/30"
                            onClick={() => setViewingAttachment(msg.attachment!)}
                          >
                            {msg.attachment.type.startsWith('image/') ? (
                              <img src={msg.attachment.url} alt="Upload" className="w-full max-w-[200px] h-auto object-cover rounded-lg" />
                            ) : msg.attachment.type.startsWith('video/') ? (
                              <video src={msg.attachment.url} className="w-full max-w-[200px] h-auto rounded-lg" />
                            ) : (
                              <div className="p-3 bg-indigo-500/20 flex items-center gap-2">
                                <Paperclip className="w-4 h-4" />
                                <span className="text-xs truncate max-w-[150px]">Attachment</span>
                              </div>
                            )}
                          </div>
                        )}
                        {msg.text && <p className="text-sm whitespace-pre-wrap">{msg.text}</p>}
                      </div>
                    ) : (
                      <div className="text-sm prose prose-sm dark:prose-invert prose-p:leading-snug prose-pre:bg-slate-100 dark:prose-pre:bg-slate-900 max-w-none pointer-events-none">
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl rounded-bl-sm shadow-sm">
                    <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
              {attachment && (
                <div className="mb-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2 overflow-hidden">
                    {attachment.type.startsWith('image/') ? (
                      <img src={attachment.url} alt="Preview" className="w-8 h-8 object-cover rounded" />
                    ) : (
                      <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center">
                        <Paperclip className="w-4 h-4 text-slate-500" />
                      </div>
                    )}
                    <span className="text-xs text-slate-600 dark:text-slate-300 truncate max-w-[150px]">{attachment.file.name}</span>
                  </div>
                  <button 
                    onClick={() => setAttachment(null)}
                    className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/*,video/*"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 rounded-xl transition-colors shrink-0 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  aria-label="Attach file"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <button
                  onClick={toggleListening}
                  className={`p-2.5 rounded-xl transition-colors shrink-0 ${
                    isListening 
                      ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  aria-label={isListening ? "Stop listening" : "Start listening"}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="flex-1 bg-slate-100 dark:bg-slate-800 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white transition-all outline-none min-w-0"
                />
                <button
                  onClick={handleSend}
                  disabled={(!input.trim() && !attachment) || isLoading}
                  className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl transition-colors shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
