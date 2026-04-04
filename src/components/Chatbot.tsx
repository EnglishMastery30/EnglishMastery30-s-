import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot, Zap, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: 'Hi! I am your AI English Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setInput('');
    
    const newMessages = [...messages, { id: Date.now().toString(), role: 'user' as const, text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Format history for generateContent (skip the initial greeting)
      const contents = newMessages.slice(1).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
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
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 z-40 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Open AI Chatbot"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[340px] sm:w-96 h-[500px] max-h-[80vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col z-50 overflow-hidden"
          >
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
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-sm' 
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      <div className="text-sm prose prose-sm dark:prose-invert prose-p:leading-snug prose-pre:bg-slate-100 dark:prose-pre:bg-slate-900 max-w-none">
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
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="flex-1 bg-slate-100 dark:bg-slate-800 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white transition-all outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl transition-colors shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
