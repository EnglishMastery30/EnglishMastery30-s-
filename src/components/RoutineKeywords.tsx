import React from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, Repeat, Volume2, Mic } from 'lucide-react';

interface Keyword {
  en: string;
  category: 'unit' | 'frequency' | 'period';
  definition: string;
}

const KEYWORDS: Keyword[] = [
  { en: 'Every minute', category: 'unit', definition: 'Repeating once every 60 seconds.' },
  { en: 'Every hour', category: 'unit', definition: 'Repeating once every 60 minutes.' },
  { en: 'Every day', category: 'unit', definition: 'Happening on each successive day.' },
  { en: 'Every morning', category: 'unit', definition: 'Happening during the early part of each day.' },
  { en: 'Every evening', category: 'unit', definition: 'Happening during the later part of each day.' },
  { en: 'Every night', category: 'unit', definition: 'Happening during the time of darkness each day.' },
  { en: 'Daily', category: 'frequency', definition: 'Occurring or done every day.' },
  { en: 'Weekly', category: 'frequency', definition: 'Occurring or done once a week.' },
  { en: 'Monthly', category: 'frequency', definition: 'Occurring or done once a month.' },
  { en: 'Yearly', category: 'frequency', definition: 'Occurring or done once a year.' },
  { en: 'Always', category: 'frequency', definition: 'At all times; on all occasions.' },
  { en: 'Usually', category: 'frequency', definition: 'Under normal conditions; generally.' },
  { en: 'Often', category: 'frequency', definition: 'Many times; at short intervals.' },
  { en: 'Sometimes', category: 'frequency', definition: 'Occasionally; rather than all of the time.' },
  { en: 'Rarely', category: 'frequency', definition: 'Not often; seldom.' },
  { en: 'Never', category: 'frequency', definition: 'At no time in the past or future.' },
  { en: 'Once a day', category: 'period', definition: 'Happening only one time within a single day.' },
  { en: 'Twice a day', category: 'period', definition: 'Happening two times within a single day.' },
  { en: 'Once a week', category: 'period', definition: 'Happening only one time within a single week.' },
  { en: 'Once a month', category: 'period', definition: 'Happening only one time within a single month.' }
];

export function RoutineKeywords() {
  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
      {KEYWORDS.map((kw, idx) => (
        <motion.div
          key={kw.en}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.03 }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 shadow-sm hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all flex flex-col items-center text-center gap-2 group relative"
        >
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {kw.category === 'unit' ? <Clock className="w-4 h-4" /> : kw.category === 'frequency' ? <Repeat className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
          </div>
          <div className="flex flex-col">
            <span className="font-black text-slate-800 dark:text-slate-200 tracking-tight">{kw.en}</span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 opacity-100 italic">
              {kw.definition}
            </p>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); handleSpeak(kw.en); }}
            className={`absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all`}
            title="Listen"
          >
            <Mic className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      ))}
    </div>
  );
}
