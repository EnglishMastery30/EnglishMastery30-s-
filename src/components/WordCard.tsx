import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mic, FileText, Volume2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { generateContentWithFallback } from '../utils/aiFallback';
import { useCredits } from '../contexts/CreditsContext';
import { useLanguage } from '../contexts/LanguageContext';

interface ThemeConfig {
  border: string;
  darkBorder: string;
  hoverBorder: string;
  bg: string;
  text: string;
  button: string;
}

interface WordCardProps {
  word: string;
  ipa?: string;
  category?: string;
  config?: ThemeConfig;
  idx?: number;
  onClose?: () => void;
  autoFetch?: boolean;
  showDefine?: boolean;
}

const DEFAULT_CONFIG: ThemeConfig = {
  border: 'border-slate-200',
  darkBorder: 'dark:border-slate-800',
  hoverBorder: 'hover:border-indigo-400',
  bg: 'bg-white dark:bg-slate-900',
  text: 'text-slate-800 dark:text-slate-200',
  button: 'bg-indigo-600 hover:bg-indigo-700'
};

export function WordCard({ word, ipa, category = 'Vocabulary', config = DEFAULT_CONFIG, idx = 0, onClose, autoFetch = true, showDefine = true }: WordCardProps) {
  const [wordData, setWordData] = useState<{ ipa?: string; translation: string, definitionEn: string, definitionLocal: string, examples?: string[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { consumeCredits, apiKeys, useCustomKeys } = useCredits();
  const { language, targetLanguage } = useLanguage();

  const handleSpeak = (text: string, lang: string = 'en-US') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleFetchDetails = async () => {
    if (wordData || isLoading) return;
    if (!consumeCredits(1, 'AI Dictionary')) {
      alert('Insufficient credits.');
      return;
    }
    
    setIsLoading(true);
    setFetchError(null);
    try {
      const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : undefined;
      const ai = new GoogleGenAI({ apiKey: apiKey || (process.env.GEMINI_API_KEY as string) });

      const prompt = `Provide the IPA pronunciation, translation, detailed definition, and exactly 6 practical common examples for the term "${word}".
Target Language for translation: ${targetLanguage}.
For the examples, provide each sentence in English followed by its meaning in ${targetLanguage} in parentheses. e.g., "This is an example. (meaning in target language)".
Format the response as JSON:
{
  "ipa": "IPA pronunciation string",
  "translation": "Translated word in ${targetLanguage}",
  "definitionEn": "Detailed comprehensive definition in English",
  "definitionLocal": "Detailed definition in ${targetLanguage}",
  "examples": ["Example 1 (translation)", "Example 2 (translation)", "Example 3 (translation)", "Example 4 (translation)", "Example 5 (translation)", "Example 6 (translation)"]
}
Return ONLY the JSON. No conversational text.`;

      const response = await generateContentWithFallback(ai, {
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
          temperature: 0.1,
          responseMimeType: "application/json",
        }
      });
      
      const rawText = response?.text || '{}';
      
      // Much more aggressive extraction
      let cleanedText = rawText;
      const firstBrace = rawText.indexOf('{');
      const lastBrace = rawText.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleanedText = rawText.substring(firstBrace, lastBrace + 1);
      }
      
      const resData = JSON.parse(cleanedText);
      setWordData(resData);
    } catch (error) {
      console.error("Fetch error:", error);
      setFetchError("Failed to fetch details.");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (autoFetch && !wordData && !isLoading) {
      handleFetchDetails();
    }
  }, [word, autoFetch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (idx % 15) * 0.03 }}
      className={`group p-5 sm:p-6 bg-white dark:bg-slate-950 rounded-[2rem] border-2 ${config.border} ${config.darkBorder} shadow-xl relative flex flex-col justify-start overflow-hidden hover:shadow-2xl transition-all`}
    >
      {/* Close Button */}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-rose-500 transition-colors z-20"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      <div className="flex items-center justify-between w-full relative z-10 mb-4">
        <div className="flex flex-col flex-1">
          <div className="flex items-center flex-wrap gap-3">
            <div className="flex flex-col">
              <span className={`text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white ${config.text} tracking-tight leading-none`}>
                {word}
              </span>
              {(ipa || wordData?.ipa) && (
                <span className="text-sm font-mono text-slate-500 dark:text-slate-400 mt-1 opacity-75">
                  {ipa || wordData?.ipa}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); handleSpeak(word, 'en-US'); }}
                className={`p-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all flex items-center gap-1`}
                title="Listen"
              >
                <Mic className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Play</span>
              </button>
              {showDefine && !wordData && !isLoading && (
                <button 
                  onClick={(e) => { e.stopPropagation(); handleFetchDetails(); }}
                  className={`p-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all flex items-center gap-1`}
                  title="Deep Meaning"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Define</span>
                </button>
              )}
            </div>
          </div>
          <span className="text-[10px] text-indigo-500 font-extrabold uppercase tracking-[0.15em] mt-3 opacity-60">
            {category}
          </span>
        </div>
      </div>

      {/* Word Definition Display */}
      {(wordData || isLoading || fetchError) && (
        <div className="pt-4 border-t border-slate-50 dark:border-slate-800/60 w-full animate-in fade-in slide-in-from-top-1">
          {isLoading ? (
            <div className="flex flex-col gap-2">
              <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="h-full w-1/2 bg-indigo-500"
                />
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">AI Analyzing...</div>
            </div>
          ) : fetchError ? (
            <div className="text-xs text-rose-500 font-medium">{fetchError}</div>
          ) : wordData && (
            <div className="flex flex-col gap-3">
              {/* Translation */}
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase font-black tracking-widest text-indigo-500">Translation</span>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{wordData.translation}</p>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      const voiceMap: Record<string, string> = { te: 'te-IN', hi: 'hi-IN', ta: 'ta-IN', kn: 'kn-IN', ml: 'ml-IN', es: 'es-ES', fr: 'fr-FR', ar: 'ar-SA', ja: 'ja-JP', en: 'en-US' };
                      handleSpeak(wordData.translation, voiceMap[targetLanguage] || targetLanguage); 
                    }}
                    className="p-1 rounded-md text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Local Definition */}
              <div className="flex flex-col gap-1 bg-indigo-50/50 dark:bg-indigo-500/5 p-2 rounded-xl border border-indigo-100/50 dark:border-indigo-500/10">
                <span className="text-[9px] uppercase font-black tracking-widest text-indigo-500">Meaning ({language.toUpperCase()})</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{wordData.definitionLocal}</p>
              </div>

              {/* Examples */}
              {wordData.examples && wordData.examples.length > 0 && (
                <div className="flex flex-col gap-2 bg-emerald-50/50 dark:bg-emerald-500/5 p-2 rounded-xl border border-emerald-100/50 dark:border-emerald-500/10">
                  <span className="text-[9px] uppercase font-black tracking-widest text-emerald-500">Context Examples</span>
                  <ul className="flex flex-col gap-1.5">
                    {wordData.examples.slice(0, 3).map((ex: string, i: number) => (
                      <li key={i} className="flex items-start justify-between gap-1.5 border-b border-emerald-100/30 dark:border-emerald-500/5 pb-1.5 last:border-0 last:pb-0">
                        <span className="text-[11px] text-slate-600 dark:text-slate-400">"{ex}"</span>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleSpeak(ex, 'en-US'); }}
                          className="shrink-0 p-0.5 rounded-md text-emerald-500"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
