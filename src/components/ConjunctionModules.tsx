import React from 'react';
import { Combine, ArrowRight, CheckCircle2, ListChecks, MessageSquareText } from 'lucide-react';
import { WordCard } from './WordCard';

const COORDINATING_CONJUNCTIONS = [
  { en: "And" },
  { en: "Or" },
  { en: "But" },
  { en: "Also" },
  { en: "Nor" },
  { en: "So" },
  { en: "Yet" },
  { en: "For" }
];

const CORRELATIVE_CONJUNCTIONS = [
  { en: "Either...or" },
  { en: "Neither...nor" },
  { en: "Whether...or" },
  { en: "Not only...but also" },
  { en: "Both...and" },
  { en: "Though...yet" }
];

const COMPOUND_CONJUNCTIONS = [
  { en: "In order that" },
  { en: "On condition that" },
  { en: "Even if" },
  { en: "So that" },
  { en: "As well as" },
  { en: "As soon as" }
];

const OTHER_CONJUNCTIONS = [
  { en: "Before" },
  { en: "After" },
  { en: "Although" },
  { en: "If" },
  { en: "That" },
  { en: "Till" },
  { en: "When" },
  { en: "Where" },
  { en: "While" },
  { en: "Than" },
  { en: "Unless" }
];

const DEFINITIONS = {
  coordinating: "Words that connect words, phrases, or clauses of equal grammatical rank (FANBOYS).",
  correlative: "Pairs of conjunctions that work together to join balanced words or groups of words.",
  compound: "Groups of words that function as a single conjunction to express purpose, condition, or comparison.",
  subordinating: "Words that connect a dependent clause to an independent clause, introducing time, place, or reason."
};

export function ConjunctionModules({ type }: { type: 'coordinating' | 'words_to_know' }) {
  const isWordsToKnow = type === 'words_to_know';

  const WordBox = ({ title, words, definition, icon, color }: any) => {
    const config = { 
      border: `border-slate-100`, 
      darkBorder: `dark:border-slate-800`, 
      hoverBorder: `hover:border-${color}-300`, 
      text: `group-hover:text-${color}-600`, 
      bg: `group-hover:bg-${color}-50`, 
      button: `bg-${color}-600` 
    };

    return (
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
              <ArrowRight className="w-5 h-5 text-slate-400 mt-0.5" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                {definition}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {words.map((item: any, idx: number) => (
            <WordCard 
              key={idx} 
              word={item.en} 
              category={title} 
              config={config} 
              idx={idx} 
              autoFetch={false}
              showDefine={true}
            />
          ))}
        </div>
      </div>
    );
  };

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
