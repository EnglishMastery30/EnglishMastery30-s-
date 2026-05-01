import React from 'react';
import { motion } from 'motion/react';
import { Layers, Bookmark, Hash, Quote, ArrowRight, FileText, Volume2 } from 'lucide-react';
import { WordCard } from './WordCard';

interface PrepositionItem {
  en: string;
}

const SIMPLE_PREPOSITIONS: PrepositionItem[] = [
  { en: "After" },
  { en: "As" },
  { en: "At" },
  { en: "But" },
  { en: "By" },
  { en: "Down" },
  { en: "During" },
  { en: "Except" },
  { en: "For" },
  { en: "From" },
  { en: "In" },
  { en: "Like" },
  { en: "Near" },
  { en: "Of" },
  { en: "Off" },
  { en: "On" },
  { en: "Out" },
  { en: "Over" },
  { en: "Past" },
  { en: "Round" },
  { en: "Since" },
  { en: "Than" },
  { en: "Through" },
  { en: "Till" },
  { en: "To" },
  { en: "Under" },
  { en: "Up" },
  { en: "With" }
];

const COMPOUND_PREPOSITIONS: PrepositionItem[] = [
  { en: "Aboard" },
  { en: "About" },
  { en: "Above" },
  { en: "Across" },
  { en: "Against" },
  { en: "Along" },
  { en: "Alongside" },
  { en: "Amid" },
  { en: "Among" },
  { en: "Around" },
  { en: "Before" },
  { en: "Behind" },
  { en: "Below" },
  { en: "Beneath" },
  { en: "Beside" },
  { en: "Besides" },
  { en: "Between" },
  { en: "Beyond" },
  { en: "Despite" },
  { en: "Inside" },
  { en: "Into" },
  { en: "Onto" },
  { en: "Opposite" },
  { en: "Outside" },
  { en: "Throughout" },
  { en: "Towards" },
  { en: "Underneath" },
  { en: "Until" },
  { en: "Upon" },
  { en: "Within" },
  { en: "Without" }
];

const TWO_WORD_PREPOSITIONS: PrepositionItem[] = [
  { en: "According to" },
  { en: "Ahead of" },
  { en: "Along with" },
  { en: "Apart from" },
  { en: "As for" },
  { en: "As regards" },
  { en: "As to" },
  { en: "Away from" },
  { en: "Because of" },
  { en: "Close to" },
  { en: "Contrary to" },
  { en: "Depending on" },
  { en: "Due to" },
  { en: "Except for" },
  { en: "Exclusive of" },
  { en: "From among" },
  { en: "From behind" },
  { en: "From under" },
  { en: "From within" },
  { en: "Instead of" },
  { en: "Inclusive of" },
  { en: "Near to" },
  { en: "Next to" },
  { en: "Opposite to" },
  { en: "Out of" },
  { en: "Owing to" },
  { en: "Prior to" },
  { en: "Regardless of" },
  { en: "Thanks to" },
  { en: "Up to" }
];

const PHRASE_PREPOSITIONS = [
  "As well as", "At the back of", "At the bottom of", "At the end of", "At the expense of", "At the risk of", "By dint of", "By force of", "By means of", "By reason of", "By virtue of", "By way of",
  "For fear of", "For the benefit of", "For the lack of", "For the love of", "For the sake of", "For want of",
  "In accordance with", "In addition to", "In advance of", "In aid of", "In case of", "In comparison with", "In compliance with", "In connection with", "In consequence of", "In consultation with", "In contradiction to", "In favour of", "In front of", "In lieu of", "In need of", "In order to", "In place of", "In quest of", "In reference to", "In regard to", "In search of", "In spite of", "In stead of", "In support of",
  "In the absence of", "In the event of", "In the matter of", "In the presence of", "In view of",
  "On account of", "On behalf of", "On the basis of", "On the condition of", "On the eve of", "On the grounds of", "On the part of", "On the point of", "On the receipt of", "On top of",
  "Under the cover of", "Under the eye of", "Under the guidance of", "Under the pretence of", "Under the wings of",
  "With a view to", "With an aim to", "With an eye to", "With reference to", "With regard to", "With the purpose of", "With respect to"
];

const DEFINITIONS = {
  simple: "Single-word prepositions that indicate basic relationships of time, place, and direction.",
  compound: "Prepositions formed by combining words, often a prefix with another word particle.",
  two_word: "Functional units consisting of two distinct words that act as a single prepositional relationship.",
  phrase: "Groups of three or more words (often starting and ending with a preposition) that function together collectively."
};

const TITLES = {
  simple: "Simple Prepositions",
  compound: "Compound Prepositions",
  two_word: "Two-Word Prepositions",
  phrase: "Phrase Prepositions"
};

const COLORS = {
  simple: "blue",
  compound: "indigo",
  two_word: "violet",
  phrase: "purple"
};

const ICONS = {
  simple: <Hash className="w-5 h-5" />,
  compound: <Layers className="w-5 h-5" />,
  two_word: <Bookmark className="w-5 h-5" />,
  phrase: <Quote className="w-5 h-5" />
};

export function PrepositionModules({ type }: { type: 'simple' | 'compound' | 'two_word' | 'phrase' }) {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [definingWord, setDefiningWord] = React.useState<string | null>(null);
  
  const words = type === 'simple' ? SIMPLE_PREPOSITIONS : 
                type === 'compound' ? COMPOUND_PREPOSITIONS : 
                type === 'two_word' ? TWO_WORD_PREPOSITIONS : PHRASE_PREPOSITIONS;
  
  const color = COLORS[type];
  const icon = ICONS[type];

  return (
    <div className="mt-8 space-y-6">
      <div className={`p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative`}>
        <div className={`absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none`}>
          <div className="scale-[4]">
            {icon}
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 bg-${color}-50 dark:bg-${color}-900/30 text-${color}-600 dark:text-${color}-400 rounded-xl`}>
              {icon}
            </div>
            <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              {TITLES[type]}
            </h4>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700/50">
            <ArrowRight className="w-5 h-5 text-slate-400 mt-0.5" />
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
              {DEFINITIONS[type]}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {words.map((item, idx) => {
          // If phrase, it's just a string for now, but we'll treat it as string or object
          const isObject = typeof item !== 'string';
          const en = isObject ? (item as any).en : item;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.01 }}
              onClick={() => setSelected(selected === en ? null : en)}
              className={`px-4 py-3 cursor-pointer bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-center transition-all shadow-sm group flex flex-col items-center gap-2 ${
                selected === en 
                  ? `bg-${color}-600 border-${color}-600 text-white` 
                  : `hover:border-${color}-300 dark:hover:border-${color}-700 hover:bg-${color}-50/30 dark:hover:bg-${color}-900/10`
              }`}
            >
              <div className={`font-bold text-sm ${selected === en ? 'text-white' : 'text-slate-700 dark:text-slate-300'} group-hover:text-${color}-600 dark:group-hover:text-${color}-400 transition-colors`}>
                {en}
              </div>
              {selected === en && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="w-full flex flex-col items-center gap-2 mt-1"
                >
                  <div className="flex items-center gap-2 mt-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setDefiningWord(definingWord === en ? null : en); }}
                      className="p-1 px-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-1 text-white"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold">Define</span>
                    </button>
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if ('speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                          const msg = new SpeechSynthesisUtterance(en);
                          msg.lang = 'en-US';
                          window.speechSynthesis.speak(msg);
                        }
                      }}
                      className="p-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-1 text-white"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      {definingWord && (
        <div className="mt-6 w-full animate-in fade-in slide-in-from-top-4">
           <WordCard 
              word={definingWord} 
              category="preposition" 
              idx={0} 
              config={{
                border: `border-${color}-200`, text: `text-${color}-800 dark:text-${color}-200`,
                darkBorder: `dark:border-${color}-900/30`, hoverBorder: `border-${color}-400 dark:border-${color}-500`,
                bg: `bg-${color}-50 dark:bg-${color}-900/20`, button: `bg-${color}-600 hover:bg-${color}-700 dark:bg-${color}-500 dark:hover:bg-${color}-600`
              }} 
            />
        </div>
      )}
    </div>
  );
}
