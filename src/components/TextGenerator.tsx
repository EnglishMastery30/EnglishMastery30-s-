import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Send, Sparkles, Loader2, Bot, User, Copy, CheckCircle2 } from 'lucide-react';
import { useCredits } from '../contexts/CreditsContext';
import { generateContentWithFallback } from '../utils/aiFallback';

export function TextGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { consumeCredits, apiKeys } = useCredits();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    if (!consumeCredits(1, 'Text Generation AI')) {
      alert('Insufficient AI Credits. Please upgrade to Pro or add your own API key.');
      return;
    }

    setIsGenerating(true);
    setGeneratedText('');

    try {
      const apiKey = apiKeys.gemini || import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key is missing.");

      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });

      const response = await generateContentWithFallback(ai, {
        model: 'gemini-1.5-flash',
        contents: `You are an AI assistant helping a user with their English writing. The user has provided the following prompt: "${prompt}". Generate a helpful, well-structured, and clear text response based on the prompt. If they ask to write an email, write it. If they ask for content generation, generate it beautifully. Format with markdown if necessary.`,
      });

      setGeneratedText(response.text || 'Failed to generate content.');
    } catch (error) {
      console.error('Generation error:', error);
      setGeneratedText('Error generating text. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl mb-4">
          <FileText className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">AI Writing Assistant</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          Need help writing an email, essay, or creative piece? Describe what you want, and let AI draft it for you.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-[600px]">
        {/* Output Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-slate-950/50">
          {!generatedText && !isGenerating && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 space-y-4">
              <Sparkles className="w-12 h-12 text-slate-300 dark:text-slate-600" />
              <p>Your generated content will appear here</p>
            </div>
          )}

          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-sm p-4 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
                <span className="text-slate-600 dark:text-slate-300">Generating content...</span>
              </div>
            </div>
          )}

          {generatedText && !isGenerating && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-start group relative"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-sm p-6 shadow-sm border border-slate-100 dark:border-slate-700 max-w-3xl prose dark:prose-invert prose-indigo">
                <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300">{generatedText}</div>
              </div>
              
              <div className="absolute -right-12 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={copyToClipboard}
                  className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-md text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  title="Copy to clipboard"
                >
                  {isCopied ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="relative flex items-end gap-2 max-w-3xl mx-auto">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Write a polite email asking for sick leave..."
              className="w-full bg-slate-100 dark:bg-slate-800/50 border-0 rounded-2xl px-4 py-3 min-h-[56px] max-h-32 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 resize-none shadow-inner"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
              rows={prompt.split('\n').length > 1 ? Math.min(prompt.split('\n').length, 4) : 1}
            />
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className={`p-3.5 rounded-2xl flex items-center justify-center transition-all ${
                prompt.trim() && !isGenerating
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-xs text-slate-400 mt-2">
            Press Enter to send, Shift + Enter for new line. Costs 1 AI Credit.
          </p>
        </div>
      </div>
    </div>
  );
}
