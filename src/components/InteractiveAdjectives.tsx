import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, BookOpen, Volume2, FileText } from 'lucide-react';

interface AdjectiveDegree {
  positive: string;
  comparative: string;
  superlative: string;
  definition: string;
  ipa?: {
    positive: string;
    comparative: string;
    superlative: string;
  }
}

const ADJECTIVE_DATA: AdjectiveDegree[] = [
  { 
    positive: 'Rich', comparative: 'Richer', superlative: 'Richest', 
    definition: 'Having a lot of money or valuable possessions.',
    ipa: { positive: '/rɪtʃ/', comparative: '/ˈrɪtʃər/', superlative: '/ˈrɪtʃɪst/' } 
  },
  { 
    positive: 'Poor', comparative: 'Poorer', superlative: 'Poorest', 
    definition: 'Lacking sufficient money to live at a standard considered comfortable.',
    ipa: { positive: '/pʊr/', comparative: '/ˈpʊrər/', superlative: '/ˈpʊrɪst/' } 
  },
  { 
    positive: 'Great', comparative: 'Greater', superlative: 'Greatest', 
    definition: 'Of an extent, amount, or intensity considerably above the normal or average.',
    ipa: { positive: '/ɡreɪt/', comparative: '/ˈɡreɪtər/', superlative: '/ˈɡreɪtɪst/' } 
  },
  { 
    positive: 'Small', comparative: 'Smaller', superlative: 'Smallest', 
    definition: 'Less than normal in size, amount, or intensity.',
    ipa: { positive: '/smɔl/', comparative: '/ˈsmɔlər/', superlative: '/ˈsmɔlɪst/' } 
  },
  { 
    positive: 'Tall', comparative: 'Taller', superlative: 'Tallest', 
    definition: 'Great or more than average height.',
    ipa: { positive: '/tɔl/', comparative: '/ˈtɔlər/', superlative: '/ˈtɔlɪst/' } 
  },
  { 
    positive: 'Short', comparative: 'Shorter', superlative: 'Shortest', 
    definition: 'Measuring a small distance from end to end.',
    ipa: { positive: '/ʃɔrt/', comparative: '/ˈʃɔrtər/', superlative: '/ˈʃɔrtɪst/' } 
  },
  { 
    positive: 'Kind', comparative: 'Kinder', superlative: 'Kindest', 
    definition: 'Having or showing a friendly, generous, and considerate nature.',
    ipa: { positive: '/kaɪnd/', comparative: '/ˈkaɪndər/', superlative: '/ˈkaɪndɪst/' } 
  },
  { 
    positive: 'Strong', comparative: 'Stronger', superlative: 'Strongest', 
    definition: 'Having the power to move heavy weights or perform other physically demanding tasks.',
    ipa: { positive: '/strɔŋ/', comparative: '/ˈstrɔŋər/', superlative: '/ˈstrɔŋɪst/' } 
  },
  { 
    positive: 'Weak', comparative: 'Weaker', superlative: 'Weakest', 
    definition: 'Lacking the power to perform physically demanding tasks; lacking strength.',
    ipa: { positive: '/wik/', comparative: '/ˈwikər/', superlative: '/ˈwikɪst/' } 
  },
  { 
    positive: 'Bright', comparative: 'Brighter', superlative: 'Brightest', 
    definition: 'Giving out or reflecting a lot of light; shining.',
    ipa: { positive: '/braɪt/', comparative: '/ˈbraɪtər/', superlative: '/ˈbraɪtɪst/' } 
  }
];

export function InteractiveAdjectives() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="my-12 space-y-10">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4 shadow-sm">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Degrees of Comparison</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mt-2">
          Adjectives change form when we compare things. Toggle an adjective to see its three degrees.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {ADJECTIVE_DATA.map((adj, idx) => (
          <motion.button
            key={idx}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedIndex(selectedIndex === idx ? null : idx)}
            className={`p-5 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${
              selectedIndex === idx 
                ? 'bg-amber-50 border-amber-300 dark:bg-amber-900/20 dark:border-amber-500/50 shadow-lg' 
                : 'bg-white border-slate-100 dark:bg-slate-900 dark:border-slate-800 hover:border-amber-200 dark:hover:border-amber-900/30'
            }`}
          >
            <span className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">{adj.positive}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedIndex !== null && (
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-gradient-to-br from-amber-500 to-orange-600 p-1 rounded-[32px] shadow-2xl relative overflow-hidden"
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-900/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

            <div className="bg-white dark:bg-slate-950 rounded-[30px] p-8 sm:p-12">
              <div className="mb-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg border border-amber-100 dark:border-amber-500/20 mb-4">
                  <FileText className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Definition</span>
                </div>
                <p className="text-xl font-medium text-slate-800 dark:text-slate-200">
                  {ADJECTIVE_DATA[selectedIndex].definition}
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
                
                <div className="flex flex-col items-center gap-4 group">
                    <div className="text-[11px] font-black text-amber-500 dark:text-amber-400 uppercase tracking-[0.2em] mb-2 flex items-center justify-center relative w-full">
                        <span>Positive</span>
                        <div className="absolute -right-12 flex items-center gap-1">
                          <button 
                            onClick={(e) => { e.stopPropagation(); playAudio(ADJECTIVE_DATA[selectedIndex].positive); }}
                            className="p-1.5 text-amber-500 bg-amber-50 dark:bg-amber-500/10 rounded-full hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                    </div>
                    <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tighter group-hover:scale-110 transition-transform">{ADJECTIVE_DATA[selectedIndex].positive}</div>
                    {ADJECTIVE_DATA[selectedIndex].ipa && (
                        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">{ADJECTIVE_DATA[selectedIndex].ipa.positive}</div>
                    )}
                </div>

                <div className="hidden md:flex flex-col items-center">
                    <ArrowRight className="w-8 h-8 text-slate-200 dark:text-slate-800" />
                </div>

                <div className="flex flex-col items-center gap-4 group">
                    <div className="text-[11px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-[0.2em] mb-2 flex items-center justify-center relative w-full">
                        <span>Comparative</span>
                        <div className="absolute -right-12 flex items-center gap-1">
                          <button 
                            onClick={(e) => { e.stopPropagation(); playAudio(ADJECTIVE_DATA[selectedIndex].comparative); }}
                            className="p-1.5 text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                    </div>
                    <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tighter group-hover:scale-110 transition-transform">{ADJECTIVE_DATA[selectedIndex].comparative}</div>
                    {ADJECTIVE_DATA[selectedIndex].ipa && (
                        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">{ADJECTIVE_DATA[selectedIndex].ipa.comparative}</div>
                    )}
                    <div className="text-xs font-bold text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 px-3 py-1 rounded-lg mt-1">v1 + -er</div>
                </div>

                <div className="hidden md:flex flex-col items-center">
                    <ArrowRight className="w-8 h-8 text-slate-200 dark:text-slate-800" />
                </div>

                <div className="flex flex-col items-center gap-4 group">
                    <div className="text-[11px] font-black text-emerald-500 dark:text-emerald-400 uppercase tracking-[0.2em] mb-2 flex items-center justify-center relative w-full">
                        <span>Superlative</span>
                        <div className="absolute -right-12 flex items-center gap-1">
                          <button 
                            onClick={(e) => { e.stopPropagation(); playAudio(ADJECTIVE_DATA[selectedIndex].superlative); }}
                            className="p-1.5 text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                    </div>
                    <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tighter group-hover:scale-110 transition-transform">{ADJECTIVE_DATA[selectedIndex].superlative}</div>
                    {ADJECTIVE_DATA[selectedIndex].ipa && (
                        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">{ADJECTIVE_DATA[selectedIndex].ipa.superlative}</div>
                    )}
                    <div className="text-xs font-bold text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 px-3 py-1 rounded-lg mt-1">v1 + -est</div>
                </div>

              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                    "He is <strong>{ADJECTIVE_DATA[selectedIndex].positive}</strong>, but his brother is <strong>{ADJECTIVE_DATA[selectedIndex].comparative}</strong>. However, their cousin is the <strong>{ADJECTIVE_DATA[selectedIndex].superlative}</strong>."
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedIndex(null)}
                  className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  Close Mastery
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
