import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Box, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { WordCard } from './WordCard';
import { useLanguage } from '../contexts/LanguageContext';

const NOUN_CATEGORIES = [
  {
    title: "Common & Proper Nouns",
    description: "Common nouns name general items. Proper nouns name specific ones (and are capitalized).",
    items: [
      { en: "city", tag: "Common" },
      { en: "London", tag: "Proper" },
      { en: "car", tag: "Common" },
      { en: "Toyota", tag: "Proper" },
      { en: "planet", tag: "Common" },
      { en: "Mars", tag: "Proper" }
    ],
    icon: <Box className="w-5 h-5" />,
    color: "blue"
  },
  {
    title: "Abstract Nouns",
    description: "Nouns that express ideas, concepts, or feelings that you cannot see or touch.",
    items: [
      { en: "happiness", tag: "Abstract" },
      { en: "courage", tag: "Abstract" },
      { en: "freedom", tag: "Abstract" },
      { en: "knowledge", tag: "Abstract" },
      { en: "time", tag: "Abstract" },
      { en: "friendship", tag: "Abstract" }
    ],
    icon: <Sparkles className="w-5 h-5" />,
    color: "purple"
  },
  {
    title: "Countable & Uncountable",
    description: "Countable nouns can be counted (one apple, two apples). Uncountable cannot (water, advice).",
    items: [
      { en: "apple", tag: "Countable" },
      { en: "water", tag: "Uncountable" },
      { en: "book", tag: "Countable" },
      { en: "information", tag: "Uncountable" },
      { en: "chair", tag: "Countable" },
      { en: "sugar", tag: "Uncountable" }
    ],
    icon: <Volume2 className="w-5 h-5" />,
    color: "teal"
  }
];

export function InteractiveNouns() {
  const { t, targetLanguage } = useLanguage();

  const renderCategory = (cat: typeof NOUN_CATEGORIES[0], idKey: number) => {
    const config = { 
      border: `border-slate-100`, 
      darkBorder: `dark:border-slate-800`, 
      hoverBorder: `hover:border-${cat.color}-300`, 
      text: `group-hover:text-${cat.color}-600`, 
      bg: `group-hover:bg-${cat.color}-50`, 
      button: `bg-${cat.color}-600` 
    };

    return (
      <div key={idKey} className="mb-12">
        <div className={`p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative mb-6`}>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 bg-${cat.color}-50 dark:bg-${cat.color}-900/30 text-${cat.color}-600 dark:text-${cat.color}-400 rounded-xl`}>
                {cat.icon}
              </div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {cat.title}
              </h4>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <ArrowRight className="w-5 h-5 text-slate-400 mt-0.5" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                {cat.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    <div className="max-w-5xl mx-auto space-y-8">
      {NOUN_CATEGORIES.map((cat, i) => renderCategory(cat, i))}
    </div>
  );
}
