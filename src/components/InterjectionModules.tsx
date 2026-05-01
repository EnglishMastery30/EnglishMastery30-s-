import React from 'react';
import { motion } from 'motion/react';
import { Zap, Heart, Star, Sparkles, ArrowRight, MessageCircle, Mic } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { WordCard } from './WordCard';

interface InterjectionItem {
  en: string;
  tag: string;
}

const JOY_INTERJECTIONS: InterjectionItem[] = [
  { en: "Hurrah! I have won the match.", tag: "Victory" },
  { en: "Wonderful!", tag: "Admiration" },
  { en: "You did it!", tag: "Success" },
  { en: "Hooray!", tag: "Joy" },
  { en: "That's wonderful!", tag: "Joy" }
];

const SORROW_INTERJECTIONS: InterjectionItem[] = [
  { en: "Alas! He is no more.", tag: "Sorrow" },
  { en: "Oh! What a shame!", tag: "Sorrow" },
  { en: "What a shame!", tag: "Pity" },
  { en: "Oh!", tag: "Shock" }
];

const SURPRISE_INTERJECTIONS: InterjectionItem[] = [
  { en: "What a surprise!", tag: "Surprise" },
  { en: "What a nice idea!", tag: "Surprise" },
  { en: "What a relief!", tag: "Relief" },
  { en: "Just in time!", tag: "Precision" }
];

const CATEGORIES = {
  joy: { 
    title: "Joy & Celebration", 
    definition: "Interjections used to express happiness, triumph, or celebration.",
    items: JOY_INTERJECTIONS, 
    icon: <Sparkles className="w-5 h-5" />, 
    color: "amber" 
  },
  sorrow: { 
    title: "Sorrow & Pity", 
    definition: "Interjections used to express sadness, regret, or sympathy.",
    items: SORROW_INTERJECTIONS, 
    icon: <Heart className="w-5 h-5" />, 
    color: "rose" 
  },
  surprise: { 
    title: "Surprise & Relief", 
    definition: "Interjections used to express wonder, shock, or a sense of ease after stress.",
    items: SURPRISE_INTERJECTIONS, 
    icon: <Zap className="w-5 h-5" />, 
    color: "indigo" 
  }
};

export function InterjectionModules({ type }: { type: 'joy' | 'sorrow' | 'surprise' | 'all' }) {
  const renderCategory = (catKey: keyof typeof CATEGORIES) => {
    const cat = CATEGORIES[catKey];
    const config = { 
      border: `border-slate-100`, 
      darkBorder: `dark:border-slate-800`, 
      hoverBorder: `hover:border-${cat.color}-300`, 
      text: `group-hover:text-${cat.color}-600`, 
      bg: `group-hover:bg-${cat.color}-50`, 
      button: `bg-indigo-600` 
    };

    return (
      <div key={catKey} className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-3 bg-${cat.color}-50 dark:bg-${cat.color}-900/30 text-${cat.color}-600 dark:text-${cat.color}-400 rounded-2xl`}>
            {cat.icon}
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            {cat.title}
          </h3>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 italic border-l-4 border-indigo-100 dark:border-indigo-900/30 pl-4">
          {cat.definition}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cat.items.map((item, idx) => (
            <WordCard 
              key={idx} 
              word={item.en} 
              category={item.tag} 
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

  return (
    <div className="mt-8">
      {type === 'all' ? (
        Object.keys(CATEGORIES).map(key => renderCategory(key as keyof typeof CATEGORIES))
      ) : (
        renderCategory(type as keyof typeof CATEGORIES)
      )}
      
      <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
            <ArrowRight className="w-5 h-5 text-indigo-500" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">Learning Tip</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Interjections are used to express sudden bursts of emotion. They are grammatically independent and usually stand alone. In writing, they are almost always followed by an exclamation mark (!).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
