import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Sparkles, Loader2, CheckCircle, XCircle, RefreshCw, ChevronRight } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { generateContentWithFallback } from '../utils/aiFallback';
import { useCredits } from '../contexts/CreditsContext';

interface DrillItem {
  sentence: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export function SentenceCompletionDrill() {
  const [drill, setDrill] = useState<DrillItem | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const { consumeCredits, apiKeys, useCustomKeys } = useCredits();

  const generateDrill = async () => {
    setIsLoading(true);
    setDrill(null);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowExplanation(false);

    if (!consumeCredits(2, 'Sentence Completion AI')) {
      alert("Insufficient credits");
      setIsLoading(false);
      return;
    }

    try {
      const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key is missing.");
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `Generate a high-quality "Sentence Completion" exercise for an English learner.
The sentence should have one missing part (a phrase or clause) represented as "__________".
Provide 4 plausible options, with only one being correct.
The difficulty should be Intermediate to Advanced.
Focus on common idioms, phrasal verbs, or complex grammatical structures.

Return a JSON object with this exact structure:
{
  "sentence": "The sentence with __________",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "The correct option text exactly",
  "explanation": "A short, helpful explanation of why this is correct and why others are wrong."
}`;

      const response = await generateContentWithFallback(ai, {
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });

      const data: DrillItem = JSON.parse(response.text || '{}');
      setDrill(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateDrill();
  }, []);

  const handleOptionSelect = (option: string) => {
    if (isCorrect !== null) return;
    setSelectedOption(option);
    const correct = option === drill?.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-indigo-50/30 dark:bg-indigo-500/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-2xl">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Sentence Completion</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Master complex structures and idioms</p>
          </div>
        </div>
        <button 
          onClick={generateDrill}
          disabled={isLoading}
          className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center justify-center text-slate-500 gap-4"
            >
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
              <p className="font-medium animate-pulse">Generating your next challenge...</p>
            </motion.div>
          ) : drill ? (
            <motion.div 
              key="content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 bg-indigo-500 h-full" />
                <Sparkles className="absolute -right-4 -top-4 w-16 h-16 text-indigo-500/5 group-hover:rotate-12 transition-transform duration-700" />
                <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                  {drill.sentence}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {drill.options.map((option, index) => {
                  const isSelected = selectedOption === option;
                  const isThisCorrect = option === drill.correctAnswer;
                  
                  let buttonClass = "p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden ";
                  if (isCorrect === null) {
                    buttonClass += "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-md";
                  } else if (isThisCorrect) {
                    buttonClass += "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-100";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += "bg-rose-50 dark:bg-rose-500/10 border-rose-500 text-rose-900 dark:text-rose-100";
                  } else {
                    buttonClass += "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 opacity-50";
                  }

                  return (
                    <motion.button
                      key={index}
                      whileHover={isCorrect === null ? { x: 4 } : {}}
                      onClick={() => handleOptionSelect(option)}
                      disabled={isCorrect !== null}
                      className={buttonClass}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-bold text-base sm:text-lg">{option}</span>
                        {isCorrect !== null && isThisCorrect && <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />}
                        {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {showExplanation && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-[2rem] ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-rose-50 dark:bg-rose-500/10'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-xl shrink-0 ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                      {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className={`font-black text-xs uppercase tracking-widest mb-1 ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {isCorrect ? 'Excellent Work!' : 'Not quite right'}
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 font-medium">
                        {drill.explanation}
                      </p>
                      <button 
                        onClick={generateDrill}
                        className="mt-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                      >
                        Next Challenge <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500">Failed to load drill. Please try again.</p>
              <button onClick={generateDrill} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-xl">Retry</button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
