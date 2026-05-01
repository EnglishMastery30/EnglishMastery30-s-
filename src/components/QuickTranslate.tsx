import React, { useState } from 'react';
import { Languages, ExternalLink, Lock, Loader2, Volume2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCredits } from '../contexts/CreditsContext';
import { GoogleGenAI } from '@google/genai';
import { generateContentWithFallback } from '../utils/aiFallback';

interface TranslationResult {
  translation: string;
  definitionEn: string;
  definitionLocal: string;
  examples: string[];
}

export function QuickTranslate({ isLocked = false }: { isLocked?: boolean }) {
  const [translateText, setTranslateText] = useState('');
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { targetLanguage, language } = useLanguage();
  const { apiKeys, consumeCredits, useCustomKeys } = useCredits();

  const handleSpeak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!translateText.trim()) return;
    
    if (!consumeCredits(1, 'AI Dictionary')) {
      alert('Insufficient credits.');
      return;
    }
    
    setIsLoading(true);
    setResult(null);
    try {
      const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : undefined;
      const ai = new GoogleGenAI({ apiKey: apiKey || (process.env.GEMINI_API_KEY as string) });

      const prompt = `Provide the translation, detailed definition, and exactly 3 practical common examples for the phrase/word "${translateText}".
Target Language for translation: ${targetLanguage}.
For the examples, provide each sentence in English followed by its meaning in ${targetLanguage} in parentheses.
Format the response as JSON:
{
  "translation": "Translated text in ${targetLanguage}",
  "definitionEn": "Detailed comprehensive definition in English",
  "definitionLocal": "Detailed definition in ${targetLanguage}",
  "examples": ["Example 1 (translation)", "Example 2 (translation)", "Example 3 (translation)"]
}
Ensure it is valid JSON and has exactly 3 examples.`;

      const response = await generateContentWithFallback(ai, {
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
          temperature: 0.2,
          responseMimeType: "application/json",
        }
      });
      
      const rawText = response?.text || '{}';
      
      // Extract just the JSON part from the response
      let cleanedText = rawText;
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanedText = jsonMatch[0];
      }
      
      const resData = JSON.parse(cleanedText);
      setResult(resData);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to load translation.");
    } finally {
      setIsLoading(false);
    }
  };

  const voiceMap: Record<string, string> = { te: 'te-IN', hi: 'hi-IN', ta: 'ta-IN', kn: 'kn-IN', ml: 'ml-IN', es: 'es-ES', fr: 'fr-FR', ar: 'ar-SA', ja: 'ja-JP', en: 'en-US' };
  const targetVoice = voiceMap[targetLanguage] || targetLanguage;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 rounded-2xl shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center">
          <Languages className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">Quick Translate</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Translate & learn words instantly</p>
        </div>
      </div>
      
      <form onSubmit={handleTranslate} className="flex flex-col gap-3 flex-1">
        <textarea
          value={translateText}
          onChange={(e) => setTranslateText(e.target.value)}
          placeholder={isLocked ? "Premium feature locked" : "Enter a word or phrase to learn..."}
          disabled={isLocked || isLoading}
          className={`w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-3 sm:p-4 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none min-h-[100px] ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        
        {result && !isLoading && (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 mt-2 space-y-4 max-h-[300px] overflow-y-auto">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-indigo-500">Translation</span>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{result.translation}</p>
                <button 
                  type="button"
                  onClick={() => handleSpeak(result.translation, targetVoice)}
                  className="p-1.5 bg-slate-200 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 rounded hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">Meaning ({language.toUpperCase()})</span>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium mt-1">{result.definitionLocal}</p>
              </div>
            </div>

            {result.examples && result.examples.length > 0 && (
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest text-emerald-500">Examples</span>
                <ul className="mt-2 space-y-2">
                  {result.examples.map((ex, i) => (
                    <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2 last:border-0 last:pb-0">
                      <span>{ex}</span>
                      <button 
                        type="button"
                        onClick={() => handleSpeak(ex, 'en-US')}
                        className="shrink-0 p-1 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <button 
          type="submit"
          disabled={!translateText.trim() || isLocked || isLoading}
          className={`flex items-center justify-center gap-2 w-full py-3 font-medium rounded-xl transition-colors mt-auto ${isLocked ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:text-slate-200 text-white'}`}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Translate & Learn</span>
              {isLocked ? <Lock className="w-4 h-4" /> : <Languages className="w-4 h-4" />}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
