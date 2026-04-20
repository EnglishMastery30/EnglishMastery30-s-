import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, MessageSquare, Mic, MicOff, Lock } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { generateContentWithFallback } from '../utils/aiFallback';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';
import { useCredits } from '../contexts/CreditsContext';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_INSTRUCTION = `You are a friendly AI conversation partner. Your goal is to help the user practice their daily English conversation skills.
Keep your responses relatively short, natural, and engaging. Ask questions to keep the conversation going.
If the user makes a grammar or pronunciation mistake, gently correct them in a supportive way, but focus primarily on the flow of conversation.`;

export function DailyTalk({ isLocked = false }: { isLocked?: boolean }) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('dailytalk_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse daily talk messages", e);
      }
    }
    return [{ id: '1', role: 'model', text: 'Hi there! How is your day going? What would you like to talk about today?' }];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const { consumeCredits, apiKeys, useCustomKeys } = useCredits();

  useEffect(() => {
    localStorage.setItem('dailytalk_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + (prev ? ' ' : '') + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isLocked) return;
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error("Speech recognition error:", e);
        setIsListening(false);
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLocked) return;

    if (!consumeCredits(1, 'Daily Talk AI')) {
      alert('Insufficient credits. Please buy more credits or use your own API key.');
      return;
    }

    const userText = input.trim();
    setInput('');
    
    const newMessages = [...messages, { id: Date.now().toString(), role: 'user' as const, text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API key is missing.");
      }
      const ai = new GoogleGenAI({ apiKey });
      
      let filteredMessages = [...newMessages];
      if (filteredMessages.length > 0 && filteredMessages[0].role === 'model') {
        filteredMessages = [{ id: '0', role: 'user', text: 'Hello, let\'s start chatting.' } as Message, ...filteredMessages];
      }
      
      const contents = filteredMessages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const response = await generateContentWithFallback(ai, {
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });
      
      const aiResponseText = response.text || 'Sorry, I could not generate a response.';
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: aiResponseText
      }]);

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        // Strip markdown before speaking
        const strippedText = aiResponseText.replace(/[*#_`~]/g, '');
        const utterance = new SpeechSynthesisUtterance(strippedText);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
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
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] min-h-[500px] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden relative">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">Daily Talk with AI</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Practice your daily conversation</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50 dark:bg-slate-950/50"
        aria-live="polite"
        role="log"
      >
        {messages.map((msg) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-emerald-500 text-white'
              }`}>
                {msg.role === 'user' ? 'U' : 'AI'}
              </div>
              <div 
                className={`p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-sm' 
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-sm shadow-sm'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="flex gap-3 max-w-[85%] sm:max-w-[75%]">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-1">
                AI
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                <span className="text-sm text-slate-500">Thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-end gap-2 max-w-4xl mx-auto relative">
          <button
            onClick={toggleListening}
            disabled={isLocked}
            className={`p-3 rounded-xl transition-colors shrink-0 ${
              isLocked ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed' :
              isListening 
                ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 animate-pulse' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
            }`}
            aria-label={isListening ? "Stop voice input" : "Start voice input"}
            title={isListening ? "Stop listening" : "Start speaking"}
          >
            {isLocked ? <Lock className="w-5 h-5" /> : isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={isLocked ? "Premium feature locked" : "Type your message..."}
              disabled={isLocked}
              className={`w-full bg-slate-100 dark:bg-slate-800 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white transition-all outline-none resize-none min-h-[52px] max-h-[120px] ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
              rows={1}
            />
          </div>
          
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading || isLocked}
            aria-label="Send message"
            className={`p-3 rounded-xl transition-colors shrink-0 ${
              isLocked ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white'
            }`}
          >
            {isLocked ? <Lock className="w-5 h-5" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
