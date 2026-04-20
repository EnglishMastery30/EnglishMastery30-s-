import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Book, Users } from 'lucide-react';

const VOCABULARY_WORDS = [
  "Ancestor", "Ancients", "Aunt", "Babe", "Bachelor", "Bride", "Bride-Groom", 
  "Bride-Maid", "Bride's man", "Brother-in-law", "Child", "Client", "Coheir", 
  "Confident", "Consort", "Co-son-in-law", "Cousin", "Crony", "Dame", "Darling", 
  "Daughter-in-law", "Fore father", "Foster brother", "Gaffer", "Gammer", 
  "Grand child", "Grand-sire", "Great-grand son", "Half-brother", "Heir", 
  "Heiress", "Helpmate", "Host", "Hostess", "House-keeper", "House-wife", 
  "Hubby", "Infant"
];

const RELATIONSHIP_WORDS = [
  "Inheritor", "Intimate", "Junior", "Juvenile", "Kin", "Kith", "Lad", "Lass", 
  "Lover", "Macrobiote", "Maintainer", "Major", "Mamma", "Mate", "Maternal Uncle", 
  "Matron", "Minor", "Mother-in-law", "Nephew", "Niece", "Off spring", "Orphan", 
  "Parents", "Paternal uncle", "Patron", "Pet", "Polygamist", "Primogenitor", 
  "Progenitor", "Progeny", "Protector", "Protégé", "Redeemer", "Scion", "Sire", 
  "Sister-in-law", "Spouse", "Uncle", "Well-wisher", "Widow", "Widower"
];

const getRandomWords = (array: string[], count: number) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export function InteractiveVocabulary() {
  const [vocabWords, setVocabWords] = useState<string[]>([]);
  const [relWords, setRelWords] = useState<string[]>([]);

  const handleGenerateVocab = () => {
    setVocabWords(getRandomWords(VOCABULARY_WORDS, 5));
  };

  const handleGenerateRels = () => {
    setRelWords(getRandomWords(RELATIONSHIP_WORDS, 5));
  };

  return (
    <div className="mt-8 space-y-8 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
      <div className="text-center">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Known to Unknown</h3>
        <p className="text-slate-600 dark:text-slate-400">Discover and practice words based on parts of speech</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Vocabulary Section */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm flex flex-col items-center">
          <Book className="w-8 h-8 text-indigo-500 mb-4" />
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Vocabulary</h4>
          <button 
            onClick={handleGenerateVocab}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-500/30 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Show Random Words
          </button>
          
          <AnimatePresence mode="popLayout">
            <div className="mt-6 w-full space-y-2 relative min-h-[160px]">
              {vocabWords.map((word, i) => (
                <motion.div
                  key={word + i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center font-medium border border-slate-200 dark:border-slate-700"
                >
                  {word}
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>

        {/* Relationships Section */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-emerald-100 dark:border-emerald-900/50 shadow-sm flex flex-col items-center">
          <Users className="w-8 h-8 text-emerald-500 mb-4" />
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Relationships</h4>
          <button 
            onClick={handleGenerateRels}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold rounded-xl hover:bg-emerald-200 dark:hover:bg-emerald-500/30 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Show Random Words
          </button>
          
          <AnimatePresence mode="popLayout">
            <div className="mt-6 w-full space-y-2 relative min-h-[160px]">
              {relWords.map((word, i) => (
                <motion.div
                  key={word + i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center font-medium border border-slate-200 dark:border-slate-700"
                >
                  {word}
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
