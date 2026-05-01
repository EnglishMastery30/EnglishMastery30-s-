import React from 'react';
import { motion } from 'motion/react';
import { Layers, Volume2 } from 'lucide-react';

const PRONOUN_TABLES = [
  {
    title: "Personal Pronouns",
    description: "Words replacing names of people or things and showing ownership.",
    columns: [
      { name: "Subject", words: ["I", "We", "You", "You", "They", "He", "She", "It"] },
      { name: "Object", words: ["Me", "Us", "You", "You", "Them", "Him", "Her", "It"] },
      { name: "Possessive (Adj)", words: ["My", "Our", "Your", "Your", "Their", "His", "Her", "Its"] },
      { name: "Possessive (Pro)", words: ["Mine", "Ours", "Yours", "Yours", "Theirs", "His", "Hers", "Its"] },
      { name: "Reflexive", words: ["Myself", "Ourselves", "Yourself", "Yourselves", "Themselves", "Himself", "Herself", "Itself"] }
    ]
  },
  {
    title: "Indefinite Pronouns",
    description: "Words referring to non-specific people, things, or places.",
    columns: [
      { name: "Person (Body)", words: ["Somebody", "Everybody", "Anybody", "Nobody"] },
      { name: "Person (One)", words: ["Some one", "Every one", "Any one", "No one (none)"] },
      { name: "Thing", words: ["Something", "Everything", "Anything", "Nothing"] },
      { name: "Place", words: ["Some where", "Every where", "Any where", "No where"] },
      { name: "Time", words: ["Some day", "Every day", "Any day", "No day"] }
    ]
  },
  {
    title: "Question and Relative Pronouns",
    description: "Words used to ask questions or link relative clauses.",
    columns: [
      { name: "Base", words: ["What", "Why", "Where", "When", "Which", "Whose", "Whom", "How", "Who"] },
      { name: "Ever", words: ["Whatever", "Why ever", "Wherever", "Whenever", "Whichever", "Whosever", "Whomever", "However", "Whoever"] },
      { name: "So ever", words: ["What so ever", "Why so ever", "Where so ever", "When so ever", "Which so ever", "Whose so ever", "Whom so ever", "How so ever", "Who so ever"] }
    ]
  }
];

interface InteractivePronounsProps {
  section?: 'personal' | 'indefinite' | 'question' | 'all';
}

export function InteractivePronouns({ section = 'all' }: InteractivePronounsProps) {
  const filteredTables = section === 'all' 
    ? PRONOUN_TABLES 
    : PRONOUN_TABLES.filter(t => {
        if (section === 'personal') return t.title.includes('Personal');
        if (section === 'indefinite') return t.title.includes('Indefinite');
        if (section === 'question') return t.title.includes('Question');
        return false;
      });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {filteredTables.map((table, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white dark:bg-slate-900/50 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800"
        >
          <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            {table.title}
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{table.description}</p>
          <div 
            className={`grid gap-3 sm:gap-4 ${
              table.columns.length === 5 
                ? "grid-cols-2 lg:grid-cols-5" 
                : table.columns.length === 4 
                ? "grid-cols-2 md:grid-cols-4" 
                : "grid-cols-2 md:grid-cols-3"
            }`}
          >
            {table.columns.map((col, j) => (
              <div key={j} className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 sm:p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col h-full">
                <h5 className="font-bold text-indigo-700 dark:text-indigo-400 text-xs sm:text-sm mb-3 border-b border-slate-200 dark:border-slate-800 pb-2 text-center uppercase tracking-wider">
                  {col.name}
                </h5>
                <div className="space-y-2 flex-grow">
                  {col.words.map((word, k) => (
                    <div 
                      key={k} 
                      className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 group hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all font-bold text-slate-800 dark:text-slate-200"
                    >
                      <span className="text-sm">{word}</span>
                      <button 
                        onClick={() => {
                          if ('speechSynthesis' in window) {
                            window.speechSynthesis.cancel();
                            const msg = new SpeechSynthesisUtterance(word);
                            msg.lang = 'en-US';
                            window.speechSynthesis.speak(msg);
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-900 rounded transition-all"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
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
