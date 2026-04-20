import React from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, Repeat } from 'lucide-react';

interface Keyword {
  en: string;
  te: string;
  category: 'unit' | 'frequency' | 'period';
}

const KEYWORDS: Keyword[] = [
  { en: 'Every minute', te: 'ప్రతి నిమిషం', category: 'unit' },
  { en: 'Every hour', te: 'ప్రతి గంట', category: 'unit' },
  { en: 'Every day', te: 'ప్రతి రోజు', category: 'unit' },
  { en: 'Every morning', te: 'ప్రతి ఉదయం', category: 'unit' },
  { en: 'Every evening', te: 'ప్రతి సాయంత్రం', category: 'unit' },
  { en: 'Every night', te: 'ప్రతి రాత్రి', category: 'unit' },
  { en: 'Daily', te: 'రోజూ', category: 'frequency' },
  { en: 'Weekly', te: 'వారానికి ఒకసారి', category: 'frequency' },
  { en: 'Monthly', te: 'నెలకు ఒకసారి', category: 'frequency' },
  { en: 'Yearly', te: 'సంవత్సరానికి ఒకసారి', category: 'frequency' },
  { en: 'Always', te: 'ఎప్పుడూ', category: 'frequency' },
  { en: 'Usually', te: 'సాధారణంగా', category: 'frequency' },
  { en: 'Often', te: 'తరచుగా', category: 'frequency' },
  { en: 'Sometimes', te: 'అప్పుడప్పుడు', category: 'frequency' },
  { en: 'Rarely', te: 'అరుదుగా', category: 'frequency' },
  { en: 'Never', te: 'ఎప్పుడూ లేదు', category: 'frequency' },
  { en: 'Once a day', te: 'రోజుకు ఒకసారి', category: 'period' },
  { en: 'Twice a day', te: 'రోజుకు రెండు సార్లు', category: 'period' },
  { en: 'Once a week', te: 'వారానికి ఒకసారి', category: 'period' },
  { en: 'Once a month', te: 'నెలకు ఒకసారి', category: 'period' }
];

export function RoutineKeywords() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
      {KEYWORDS.map((kw, idx) => (
        <motion.div
          key={kw.en}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.03 }}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 shadow-sm hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-500/30 transition-all flex flex-col items-center text-center gap-2 group"
        >
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {kw.category === 'unit' ? <Clock className="w-4 h-4" /> : kw.category === 'frequency' ? <Repeat className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
          </div>
          <div className="flex flex-col">
            <span className="font-black text-slate-800 dark:text-slate-200 tracking-tight">{kw.en}</span>
            <span className="text-sm text-indigo-600 dark:text-indigo-400 font-bold">{kw.te}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
