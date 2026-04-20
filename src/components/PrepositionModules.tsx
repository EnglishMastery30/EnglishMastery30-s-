import React from 'react';
import { motion } from 'motion/react';
import { Layers, Bookmark, Hash, Quote, Info } from 'lucide-react';

interface PrepositionItem {
  en: string;
  te: string;
}

const SIMPLE_PREPOSITIONS: PrepositionItem[] = [
  { en: "After", te: "తరువాత" },
  { en: "At", te: "వద్ద" },
  { en: "But", te: "కానీ" },
  { en: "By", te: "ద్వారా" },
  { en: "Down", te: "క్రిందకు" },
  { en: "For", te: "కొరకు" },
  { en: "From", te: "నుండి" },
  { en: "In", te: "లో" },
  { en: "Of", te: "యొక్క" },
  { en: "Off", te: "దూరంగా" },
  { en: "On", te: "మీద" },
  { en: "Out", te: "బయట" },
  { en: "Over", te: "పైన" },
  { en: "Past", te: "గతించిన" },
  { en: "Per", te: "ప్రతి" },
  { en: "Round", te: "చుట్టూ" },
  { en: "Since", te: "నుండి" },
  { en: "Than", te: "కంటే" },
  { en: "Through", te: "ద్వారా" },
  { en: "Till", te: "వరకు" },
  { en: "To", te: "కు/కి" },
  { en: "Under", te: "క్రింద" },
  { en: "Up", te: "పైన" },
  { en: "Via", te: "గుండా" },
  { en: "With", te: "తో" }
];

const COMPOUND_PREPOSITIONS: PrepositionItem[] = [
  { en: "Aboard", te: "ఓడ/విమానం మీద" },
  { en: "About", te: "గురించి" },
  { en: "Above", te: "పైన" },
  { en: "Across", te: "అడ్డంగా" },
  { en: "Against", te: "వ్యతిరేకంగా" },
  { en: "Along", te: "వెంట" },
  { en: "Alongside", te: "పక్కనే" },
  { en: "Amid", te: "మధ్యలో" },
  { en: "Among", te: "మధ్య" },
  { en: "Around", te: "చుట్టూ" },
  { en: "Before", te: "ముందు" },
  { en: "Behind", te: "వెనుక" },
  { en: "Below", te: "క్రింద" },
  { en: "Between", te: "మధ్య" },
  { en: "Beneath", te: "క్రింద" },
  { en: "Beside", te: "పక్కన" },
  { en: "Besides", te: "అంతేకాకుండా" },
  { en: "Beyond", te: "ఆవల" },
  { en: "Despite", te: "అయినప్పటికీ" },
  { en: "Inside", te: "లోపల" },
  { en: "Into", te: "లోనికి" },
  { en: "Opposite", te: "ఎదురుగా" },
  { en: "Outside", te: "బయట" },
  { en: "Throughout", te: "మొత్తం" },
  { en: "Towards", te: "వైపు" },
  { en: "Underneath", te: "అడుగున" },
  { en: "Until", te: "వరకు" },
  { en: "Upon", te: "మీద" },
  { en: "Within", te: "లోపల" },
  { en: "Without", te: "లేకుండా" }
];

const TWO_WORD_PREPOSITIONS: PrepositionItem[] = [
  { en: "According to", te: "ప్రకారం" },
  { en: "Along with", te: "తో పాటు" },
  { en: "As regards", te: "సంబంధించి" },
  { en: "Away from", te: "నుండి దూరంగా" },
  { en: "Because of", te: "కారణంగా" },
  { en: "Close to", te: "దగ్గరగా" },
  { en: "Due to", te: "కారణంగా" },
  { en: "Exclusive of", te: "మినహాయించి" },
  { en: "From among", te: "మధ్య నుండి" },
  { en: "From behind", te: "వెనుక నుండి" },
  { en: "From under", te: "క్రింద నుండి" },
  { en: "From within", te: "లోపల నుండి" },
  { en: "Inclusive of", te: "కలిపి" },
  { en: "Near to", te: "దగ్గరగా" },
  { en: "Next to", te: "పక్కన" },
  { en: "Opposite to", te: "ఎదురుగా" },
  { en: "Out of", te: "లో నుండి" },
  { en: "Owing to", te: "కారణంగా" }
];

const PHRASE_PREPOSITIONS = [
  "At the back of", "At the end of", "At the expense of", "At the risk of", "By dint of", "By force of", "By means of", "By reason of", "By virtue of", "By way of",
  "For fear of", "For the benefit of", "For the lack of", "For the love of", "For the sake of", "For want of",
  "In accordance with", "In addition to", "In advance of", "In aid of", "In case of", "In comparison with", "In compliance with", "In connection with", "In consequence of", "In consultation with", "In contradiction to", "In favour of", "In front of", "In lieu of", "In need of", "In order to", "In place of", "In quest of", "In reference to", "In regard to", "In search of", "In spite of", "In stead of", "In support of",
  "In the absence of", "In the event of", "In the matter of", "In the presence of", "In view of",
  "On account of", "On behalf of", "On the basis of", "On the condition of", "On the eve of", "On the grounds of", "On the part of", "On the point of", "On the receipt of",
  "Under the cover of", "Under the eye of", "Under the guidance of", "Under the pretence of", "Under the wings of",
  "With a view to", "With an aim to", "With an eye to", "With reference to", "With the purpose of"
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
            <Info className="w-5 h-5 text-slate-400 mt-0.5" />
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
          const te = isObject ? (item as any).te : null;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.01 }}
              onClick={() => te && setSelected(selected === en ? null : en)}
              className={`px-4 py-3 cursor-pointer bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-center transition-all shadow-sm group ${
                selected === en 
                  ? `bg-${color}-600 border-${color}-600 text-white` 
                  : `hover:border-${color}-300 dark:hover:border-${color}-700 hover:bg-${color}-50/30 dark:hover:bg-${color}-900/10`
              }`}
            >
              <div className={`font-bold text-sm ${selected === en ? 'text-white' : 'text-slate-700 dark:text-slate-300'} group-hover:text-${color}-600 dark:group-hover:text-${color}-400 transition-colors`}>
                {en}
              </div>
              {selected === en && te && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-[10px] mt-1 text-white/80"
                >
                  {te}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
