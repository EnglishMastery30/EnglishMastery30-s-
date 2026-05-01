import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WORDS_POOL = [
  { word: "Beautiful", type: "adjective" },
  { word: "Quickly", type: "adverb" },
  { word: "Happiness", type: "noun" },
  { word: "Running", type: "verb" },
  { word: "Under", type: "preposition" },
  { word: "And", type: "conjunction" },
  { word: "Ouch", type: "interjection" },
  { word: "They", type: "pronoun" },
  { word: "Delicious", type: "adjective" },
  { word: "Slowly", type: "adverb" },
  { word: "Elephant", type: "noun" },
  { word: "Singing", type: "verb" },
  { word: "Beside", type: "preposition" },
  { word: "But", type: "conjunction" },
  { word: "Wow", type: "interjection" },
  { word: "We", type: "pronoun" },
];

const TYPES = ["noun", "pronoun", "verb", "adjective", "adverb", "preposition", "conjunction", "interjection"];

export function IdentifyWords() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const DEFINITIONS: Record<string, string> = {
    noun: t('def.noun'),
    pronoun: t('def.pronoun'),
    verb: t('def.verb'),
    adjective: t('def.adjective'),
    adverb: t('def.adverb'),
    preposition: t('def.preposition'),
    conjunction: t('def.conjunction'),
    interjection: t('def.interjection')
  };

  const shuffledWords = useMemo(() => {
    return [...WORDS_POOL].sort(() => Math.random() - 0.5);
  }, []);

  const currentWord = shuffledWords[currentIndex % shuffledWords.length];

  const handleCheck = (type: string) => {
    setSelectedType(type);
    const correct = type === currentWord.type;
    setIsCorrect(correct);
    setTotal(prev => prev + 1);
    if (correct) setScore(prev => prev + 1);

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setSelectedType(null);
      setIsCorrect(null);
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
          <Search className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('practice.identifyWords')}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 min-h-[1.25rem]">
          {hoveredType ? DEFINITIONS[hoveredType] : t('practice.whatType')}
        </p>
        
        <div className="mt-4 flex items-center gap-4 text-sm font-bold">
          <span className="text-indigo-600 dark:text-indigo-400">{t('practice.score')}: {score}/{total}</span>
          <button 
            onClick={() => { setScore(0); setTotal(0); setCurrentIndex(0); }}
            className="text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            {t('common.reset')}
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center mb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord.word}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-4xl md:text-5xl font-black text-indigo-900 dark:text-indigo-100 tracking-tight"
          >
            {currentWord.word}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {TYPES.map((type) => (
          <button
            key={type}
            disabled={selectedType !== null}
            onClick={() => handleCheck(type)}
            onMouseEnter={() => setHoveredType(type)}
            onMouseLeave={() => setHoveredType(null)}
            className={`px-4 py-3 rounded-xl border-2 font-bold text-sm capitalize transition-all ${
              selectedType === type
                ? isCorrect
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-900/20'
                  : 'bg-rose-50 border-rose-500 text-rose-700 dark:bg-rose-900/20'
                : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-indigo-50/30'
            }`}
          >
            <div className="flex items-center justify-between">
              {type}
              {selectedType === type && (
                isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />
              )}
            </div>
          </button>
        ))}
      </div>
      
      {isCorrect !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 text-center font-bold text-sm ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}
        >
          {isCorrect ? 'Excellent! Correct!' : `Oops! That's a ${currentWord.type}.`}
        </motion.div>
      )}
    </div>
  );
}
