import React from 'react';
import { motion } from 'motion/react';
import { Combine, Info, CheckCircle2, ListChecks, MessageSquareText } from 'lucide-react';

const COORDINATING_CONJUNCTIONS = [
  { en: "And", te: "మరియు" },
  { en: "Or", te: "లేదా" },
  { en: "But", te: "కానీ" },
  { en: "Also", te: "కూడా" },
  { en: "Nor", te: "కాదు" },
  { en: "So", te: "కాబట్టి" },
  { en: "Yet", te: "ఇంకా" },
  { en: "For", te: "కొరకు" }
];

const CORRELATIVE_CONJUNCTIONS = [
  { en: "Either...or", te: "ఇది లేదా అది" },
  { en: "Neither...nor", te: "ఇది కాదు అది కాదు" },
  { en: "Whether...or", te: "అవునా కాదా" },
  { en: "Not only...but also", te: "కేవలం అది మాత్రమే కాదు ఇది కూడా" },
  { en: "Both...and", te: "రెండూ" },
  { en: "Though...yet", te: "అయినప్పటికీ" }
];

const COMPOUND_CONJUNCTIONS = [
  { en: "In order that", te: "అందుకోసం" },
  { en: "On condition that", te: "ఆ షరతు మీద" },
  { en: "Even if", te: "ఒకవేళ అయినా" },
  { en: "So that", te: "అందువలన" },
  { en: "As well as", te: "తో పాటు" },
  { en: "As soon as", te: "వెంటనే" }
];

const OTHER_CONJUNCTIONS = [
  { en: "Before", te: "ముందు" },
  { en: "After", te: "తరువాత" },
  { en: "Although", te: "అయినప్పటికీ" },
  { en: "If", te: "ఒకవేళ" },
  { en: "That", te: "అని" },
  { en: "Till", te: "వరకు" },
  { en: "When", te: "అప్పుడు" },
  { en: "Where", te: "ఎక్కడ" },
  { en: "While", te: "ఉన్నప్పుడు" },
  { en: "Than", te: "కంటే" },
  { en: "Unless", te: "తప్ప" }
];

const DEFINITIONS = {
  coordinating: "Words that connect words, phrases, or clauses of equal grammatical rank (FANBOYS).",
  correlative: "Pairs of conjunctions that work together to join balanced words or groups of words.",
  compound: "Groups of words that function as a single conjunction to express purpose, condition, or comparison.",
  subordinating: "Words that connect a dependent clause to an independent clause, introducing time, place, or reason."
};

export function ConjunctionModules({ type }: { type: 'coordinating' | 'words_to_know' }) {
  const [selectedWord, setSelectedWord] = React.useState<string | null>(null);
  const isWordsToKnow = type === 'words_to_know';

  const WordBox = ({ title, words, definition, icon, color }: any) => (
    <div className="mb-12">
      <div className={`p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative mb-6`}>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 bg-${color}-50 dark:bg-${color}-900/30 text-${color}-600 dark:text-${color}-400 rounded-xl`}>
              {icon}
            </div>
            <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              {title}
            </h4>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700/50">
            <Info className="w-5 h-5 text-slate-400 mt-0.5" />
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              {definition}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {words.map((item: any, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.01 }}
            onClick={() => setSelectedWord(selectedWord === item.en ? null : item.en)}
            className={`flex flex-col gap-1 p-4 cursor-pointer border rounded-2xl shadow-sm transition-all group ${
              selectedWord === item.en 
                ? `bg-indigo-600 border-indigo-600` 
                : `bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700`
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${selectedWord === item.en ? 'bg-white' : 'bg-sky-400 opacity-20 group-hover:opacity-100'} transition-all`} />
              <span className={`text-sm font-bold ${selectedWord === item.en ? 'text-white' : 'text-slate-700 dark:text-slate-300'} group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors`}>
                {item.en}
              </span>
            </div>
            {selectedWord === item.en && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-[10px] text-white/80 ml-5 font-bold"
              >
                {item.te}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (!isWordsToKnow) {
    return (
      <div className="mt-8">
        <WordBox 
          title="Coordinating Conjunctions" 
          words={COORDINATING_CONJUNCTIONS} 
          definition={DEFINITIONS.coordinating}
          icon={<Combine className="w-5 h-5" />}
          color="sky"
        />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4 mb-10 pb-6 border-bottom-dashed">
        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-3xl">
          <ListChecks className="w-8 h-8 text-indigo-500" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Words to Know</h2>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Extended Conjunction Guide</p>
        </div>
      </div>

      <div className="space-y-4">
        <WordBox 
          title="Correlative Conjunctions" 
          words={CORRELATIVE_CONJUNCTIONS} 
          definition={DEFINITIONS.correlative}
          icon={<MessageSquareText className="w-5 h-5" />}
          color="indigo"
        />
        <WordBox 
          title="Compound Formations" 
          words={COMPOUND_CONJUNCTIONS} 
          definition={DEFINITIONS.compound}
          icon={<CheckCircle2 className="w-5 h-5" />}
          color="emerald"
        />
        <WordBox 
          title="Subordinating & Others" 
          words={OTHER_CONJUNCTIONS} 
          definition={DEFINITIONS.subordinating}
          icon={<Layers className="w-5 h-5" />}
          color="amber"
          className="bg-red-500"
        />
      </div>
    </div>
  );
}

const Layers = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.27a1 1 0 0 0 0 1.46l8.57 4.09a2 2 0 0 0 1.66 0l8.57-4.09a1 1 0 0 0 0-1.46Z"/>
    <path d="m2 12 10 4.76L22 12"/>
    <path d="m2 17 10 4.76L22 17"/>
  </svg>
);
