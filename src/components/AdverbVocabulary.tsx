import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Search } from 'lucide-react';
import { WordCard } from './WordCard';

interface WordItem {
  en: string;
}

const VOCAB_1_WORDS: WordItem[] = [
  { en: "Accidentally" },
  { en: "Afterwards" },
  { en: "Ago" },
  { en: "All" },
  { en: "Alone" },
  { en: "Angrily" },
  { en: "Anywhere" },
  { en: "Artificially" },
  { en: "Automatically" },
  { en: "Away" },
  { en: "Back" },
  { en: "Badly" },
  { en: "Before" },
  { en: "Behind" },
  { en: "Below" },
  { en: "Beyond" },
  { en: "Brightly" },
  { en: "Calmly" },
  { en: "Carefully" },
  { en: "Carelessly" },
  { en: "Certainly" },
  { en: "Cheaply" },
  { en: "Closely" },
  { en: "Completely" },
  { en: "Confidently" },
  { en: "Continuously" },
  { en: "Correctly" },
  { en: "Deeply" },
  { en: "Definitely" },
  { en: "Deliberately" },
  { en: "Differently" },
  { en: "Directly" },
  { en: "Dishonestly" },
  { en: "Downwards" },
  { en: "Easily" },
  { en: "Effectively" },
  { en: "Efficiently" },
  { en: "Equally" },
  { en: "Especially" },
  { en: "Evenly" },
  { en: "Ever" },
  { en: "Everywhere" },
  { en: "Exactly" },
  { en: "Extremely" },
  { en: "Fairly" },
  { en: "Far" },
  { en: "Fast" },
  { en: "Finally" },
  { en: "Financially" },
  { en: "Finely" },
  { en: "Firmly" },
  { en: "Forcefully" },
  { en: "Formally" },
  { en: "Forwards" },
  { en: "Freely" },
  { en: "Frequently" },
  { en: "Fully" },
  { en: "Further" },
  { en: "Generally" },
  { en: "Generously" },
  { en: "Gently" },
  { en: "Gradually" },
  { en: "Halfway" },
  { en: "Happily" },
  { en: "Hardly" },
  { en: "Harshly" },
  { en: "Heavily" },
  { en: "Here" },
  { en: "Highly" },
  { en: "Honestly" },
  { en: "However" },
  { en: "Illegally" },
  { en: "Immediately" },
  { en: "Independently" },
  { en: "Indirectly" },
  { en: "Instead" },
  { en: "Inwards" },
  { en: "Least" },
  { en: "Legally" },
  { en: "Lightly" },
  { en: "Loosely" },
  { en: "Loudly" },
  { en: "Low" }
];

const VOCAB_2_GROUPS = [
  {
    title: "Time & Frequency",
    words: [
      { en: "Now" },
      { en: "Then" },
      { en: "Today" },
      { en: "Yesterday" },
      { en: "Early" },
      { en: "Soon" },
      { en: "Just before" },
      { en: "Just now" },
      { en: "Only" },
      { en: "Never" },
      { en: "Seldom" },
      { en: "Occasionally" },
      { en: "Once" },
      { en: "Twice" },
      { en: "Frequently" },
      { en: "Regularly" }
    ]
  },
  {
    title: "Place & Direction",
    words: [
      { en: "Here" },
      { en: "There" },
      { en: "In" },
      { en: "Out" },
      { en: "Forward" },
      { en: "Backward" },
      { en: "Within" },
      { en: "Away" }
    ]
  },
  {
    title: "Manner & Degree",
    words: [
      { en: "Clearly" },
      { en: "Quickly" },
      { en: "Happily" },
      { en: "Sadly" },
      { en: "Smoothly" },
      { en: "Roughly" },
      { en: "Slowly" },
      { en: "Sincerely" },
      { en: "Fully" },
      { en: "Partly" },
      { en: "Almost" },
      { en: "Very" },
      { en: "Fairly" },
      { en: "Enough" },
      { en: "Immensely" }
    ]
  },
  {
    title: "Certainty",
    words: [
      { en: "Definitely" },
      { en: "Obviously" },
      { en: "Certainly" },
      { en: "Surely" }
    ]
  },
  {
    title: "Self-Emphasis (Time)",
    words: [
      { en: "Now itself" },
      { en: "Then itself" },
      { en: "Today itself" },
      { en: "Yesterday itself" },
      { en: "Tomorrow itself" },
      { en: "Morning itself" },
      { en: "Afternoon itself" },
      { en: "Evening itself" }
    ]
  },
  {
    title: "Self-Emphasis (Place/Thing)",
    words: [
      { en: "here itself" },
      { en: "There itself" },
      { en: "In Hyderabad itself" },
      { en: "In the institute itself" },
      { en: "That itself" },
      { en: "This itself" },
      { en: "English itself" },
      { en: "Movie itself" }
    ]
  }
];

export function AdverbVocabulary({ type }: { type: 'vocab_1' | 'vocab_2' }) {
  if (type === 'vocab_1') {
    const config = { border: 'border-indigo-100', darkBorder: 'dark:border-indigo-800', hoverBorder: 'hover:border-indigo-300 dark:hover:border-indigo-500/50', text: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400', bg: 'group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10', button: 'bg-gradient-to-br from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700' };

    return (
      <div className="mt-8 space-y-6 px-4">
        <div className="flex flex-col mb-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-8 py-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-6 h-6 text-indigo-500" />
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">Adverbs Vocabulary: A to L</h4>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Adverbs are words that describe or modify verbs, adjectives, or other adverbs.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {VOCAB_1_WORDS.map((item, idx) => (
            <WordCard 
              key={idx} 
              word={item.en} 
              category="Adverb" 
              config={config} 
              idx={idx} 
              autoFetch={false}
              showDefine={true}
            />
          ))}
        </div>
      </div>
    );
  }

  const config2 = { border: 'border-emerald-100', darkBorder: 'dark:border-emerald-800', hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-500/50', text: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400', bg: 'group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10', button: 'bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700' };

  return (
    <div className="mt-8 space-y-10 px-4">
      <div className="flex flex-col mb-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-8 py-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all">
        <div className="flex items-center gap-3 mb-2">
          <Search className="w-6 h-6 text-emerald-500" />
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">Adverbs: Contextual Groups</h4>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Explore adverbs grouped by their usage in time, frequency, place, and more.</p>
      </div>

      <div className="space-y-12">
        {VOCAB_2_GROUPS.map((group, gIdx) => (
          <div key={gIdx} className="space-y-6">
            <h5 className="text-xl font-black text-slate-800 dark:text-slate-200 border-l-4 border-emerald-500 pl-4 py-1">
              {group.title}
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {group.words.map((item, wIdx) => (
                <WordCard 
                  key={wIdx} 
                  word={item.en} 
                  category={group.title} 
                  config={config2} 
                  idx={wIdx} 
                  autoFetch={false}
                  showDefine={true}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
