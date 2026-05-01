import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, Loader2, Volume2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { generateContentWithFallback } from '../utils/aiFallback';
import { useCredits } from '../contexts/CreditsContext';
import { useLanguage } from '../contexts/LanguageContext';

interface DictionaryResult {
  word: string;
  meaning: string;
  description: string;
  pronunciation?: string;
  examples: string[];
  translation?: string;
}

export function GlobalDictionary() {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [result, setResult] = useState<DictionaryResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { apiKeys } = useCredits();
  const { language, targetLanguage } = useLanguage();

  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      // Don't trigger if clicking inside the modal
      if (modalRef.current && modalRef.current.contains(e.target as Node)) {
        return;
      }

      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        if (!modalRef.current?.contains(e.target as Node)) {
          setSelectedWord(null);
        }
        return;
      }

      const text = selection.toString().trim();
      // Increase limit to handle generic translations
      if (text && text.length > 0 && text.length < 200) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Position below the selection
        setPosition({
          x: Math.max(10, Math.min(rect.left + rect.width / 2 - 150, window.innerWidth - 320)),
          y: rect.bottom + window.scrollY + 10
        });
        
        if (selectedWord !== text) {
          setSelectedWord(text);
          fetchDefinition(text);
        }
      } else {
        setSelectedWord(null);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [selectedWord, language]);

  const fetchDefinition = async (word: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiKey = apiKeys.gemini || process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key is missing.");
      
      const ai = new GoogleGenAI({ apiKey });
      
      const translationLang = language === 'en' ? targetLanguage : language;
      const prompt = `You are a helpful dictionary and translation assistant. The user has selected the following text: "${word}".
      The user's preferred language code for UI is "${language}". 
      The user's native/target language for translation is "${translationLang}".
      
      If the text is a sentence, provide a clear explanation and translation.
      
      Return the response as a JSON object with the following structure:
      {
        "word": "The original text",
        "pronunciation": "Phonetic pronunciation (optional)",
        "meaning": "A concise, clear meaning or summary (in language: ${language})",
        "description": "A description or context (in language: ${language})",
        "translation": "A direct translation into (language: ${translationLang})",
        "examples": ["Example sentence 1", "Example sentence 2"]
      }
      Ensure the response is valid JSON.`;

      const response = await generateContentWithFallback(ai, {
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      if (response.text) {
        const data = JSON.parse(response.text) as DictionaryResult;
        setResult(data);
      } else {
        throw new Error("No response from AI");
      }
    } catch (err) {
      console.error("Dictionary error:", err);
      setError("Failed to load definition. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <AnimatePresence>
      {selectedWord && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{ 
            position: 'absolute', 
            left: position.x, 
            top: position.y,
            zIndex: 9999 
          }}
          className="w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-indigo-50/50 dark:bg-indigo-500/5">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <ArrowRight className="w-4 h-4" />
              <span className="font-semibold text-sm">Dictionary</span>
            </div>
            <button 
              onClick={() => setSelectedWord(null)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-6 gap-3">
                <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
                <p className="text-sm text-slate-500 dark:text-slate-400">Looking up definition...</p>
              </div>
            ) : error ? (
              <div className="text-center py-4">
                <p className="text-sm text-rose-500 dark:text-rose-400">{error}</p>
                <button 
                  onClick={() => fetchDefinition(selectedWord)}
                  className="mt-3 px-4 py-1.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-medium rounded-lg hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : result ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
                      {result.word}
                    </h3>
                    <button 
                      onClick={() => playAudio(result.word)}
                      className="flex items-center gap-1 p-1.5 px-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors shadow-sm"
                      title="Listen"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span className="text-xs font-semibold">Listen</span>
                    </button>
                  </div>
                  {result.pronunciation && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-mono mt-1">
                      {result.pronunciation}
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Meaning</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {result.meaning}
                  </p>
                </div>

                {result.translation && (
                  <div className="bg-indigo-50 dark:bg-indigo-500/10 p-3 rounded-xl border border-indigo-100 dark:border-indigo-500/20">
                    <h4 className="text-xs font-bold text-indigo-400 dark:text-indigo-500 uppercase tracking-wider mb-1">Translation</h4>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-indigo-700 dark:text-indigo-300 font-bold">
                        {result.translation}
                      </p>
                      <button
                        onClick={() => {
                          if ('speechSynthesis' in window) {
                            window.speechSynthesis.cancel();
                            const langToUse = language === 'ja' ? 'ja-JP' : language === 'ko' ? 'ko-KR' : language === 'zh' ? 'zh-CN' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : language === 'kn' ? 'kn-IN' : language === 'ml' ? 'ml-IN' : language === 'ar' ? 'ar-SA' : 'en-US';
                            const utterance = new SpeechSynthesisUtterance(result.translation);
                            utterance.lang = langToUse;
                            window.speechSynthesis.speak(utterance);
                          }
                        }}
                        className="p-1 rounded text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors flex items-center justify-center shrink-0"
                        title="Listen to Translation"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Description</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {result.description}
                  </p>
                </div>

                {result.examples && result.examples.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Examples</h4>
                    <ul className="space-y-1.5">
                      {result.examples.map((example, idx) => (
                        <li key={idx} className="text-sm text-slate-600 dark:text-slate-400 italic flex gap-2">
                          <span className="text-indigo-300 dark:text-indigo-700">•</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
