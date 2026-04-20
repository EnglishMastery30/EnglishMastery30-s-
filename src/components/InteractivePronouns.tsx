import React from 'react';
import { motion } from 'motion/react';
import { Layers } from 'lucide-react';

const PRONOUN_TABLES = [
  {
    title: "Personal & Possessive",
    columns: [
      { name: "Subject", words: ["I", "We", "You", "They", "He", "She", "It"] },
      { name: "Object", words: ["Me", "Us", "You", "Them", "Him", "Her", "It"] },
      { name: "Possessive", words: ["My / Mine", "Our / Ours", "Your / Yours", "Their / Theirs", "His", "Her / Hers", "Its"] },
      { name: "Reflexive", words: ["Myself", "Ourselves", "Yourself", "Yourselves", "Themselves", "Himself", "Herself", "Itself"] }
    ]
  },
  {
    title: "Indefinite Words",
    columns: [
      { name: "Person (Body)", words: ["Somebody", "Everybody", "Anybody", "Nobody"] },
      { name: "Person (One)", words: ["Some one", "Every one", "Any one", "No one"] },
      { name: "Thing", words: ["Something", "Everything", "Anything", "Nothing"] },
      { name: "Place & Time", words: ["Some where", "Every where", "Any where", "No where", "Some day", "Every day", "Any day", "No day"] }
    ]
  },
  {
    title: "Question & Relative Words",
    columns: [
      { name: "Base", words: ["What", "Why", "Where", "When", "Which", "Whose", "Whom", "How", "Who"] },
      { name: "Ever", words: ["Whatever", "Why ever", "Wherever", "Whenever", "Whichever", "Whosever", "Whomever", "However", "Whoever"] },
      { name: "So ever", words: ["What so ever", "Why so ever", "Where so ever", "When so ever", "Which so ever", "Whose so ever", "Whom so ever", "How so ever", "Who so ever"] }
    ]
  }
];

export function InteractivePronouns() {
  return (
    <div className="mt-8 space-y-8 max-w-5xl mx-auto">
      {PRONOUN_TABLES.map((table, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-slate-50 dark:bg-slate-800/50 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700"
        >
          <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            {table.title}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {table.columns.map((col, j) => (
              <div key={j} className="bg-white dark:bg-slate-900 rounded-xl p-3 sm:p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col h-full">
                <h5 className="font-bold text-indigo-700 dark:text-indigo-400 text-xs sm:text-sm mb-3 border-b border-slate-100 dark:border-slate-800 pb-2 text-center uppercase tracking-wider">
                  {col.name}
                </h5>
                <div className="space-y-2 flex-grow">
                  {col.words.map((word, k) => (
                    <div 
                      key={k} 
                      className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-500/30 px-2 sm:px-3 py-2 rounded-lg text-center transition-colors cursor-default"
                    >
                      {word}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
