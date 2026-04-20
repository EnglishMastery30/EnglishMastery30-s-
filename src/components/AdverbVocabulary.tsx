import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Search } from 'lucide-react';

interface WordItem {
  en: string;
  te: string;
}

const VOCAB_1_WORDS: WordItem[] = [
  { en: "Accidentally", te: "అనుకోకుండా" },
  { en: "Afterwards", te: "తరువాత" },
  { en: "Ago", te: "క్రితం" },
  { en: "All", te: "అంతా" },
  { en: "Alone", te: "ఒంటరిగా" },
  { en: "Angrily", te: "కోపంగా" },
  { en: "Anywhere", te: "ఎక్కడైనా" },
  { en: "Artificially", te: "కృత్రిమంగా" },
  { en: "Automatically", te: "దానంతట అదే" },
  { en: "Away", te: "దూరంగా" },
  { en: "Back", te: "వెనుకకు" },
  { en: "Badly", te: "ఘోరంగా" },
  { en: "Before", te: "ముందు" },
  { en: "Behind", te: "వెనుక" },
  { en: "Below", te: "క్రింద" },
  { en: "Beyond", te: "ఆవల" },
  { en: "Brightly", te: "ప్రకాశవంతంగా" },
  { en: "Calmly", te: "ప్రశాంతంగా" },
  { en: "Carefully", te: "జాగ్రత్తగా" },
  { en: "Carelessly", te: "అజాగ్రత్తగా" },
  { en: "Certainly", te: "ఖచ్చితంగా" },
  { en: "Cheaply", te: "చౌకగా" },
  { en: "Closely", te: "దగ్గరగా" },
  { en: "Completely", te: "పూర్తిగా" },
  { en: "Confidently", te: "ఆత్మవిశ్వాసంతో" },
  { en: "Continuously", te: "నిరంతరంగా" },
  { en: "Correctly", te: "సరిగ్గా" },
  { en: "Deeply", te: "లోతుగా" },
  { en: "Definitely", te: "నిశ్చయంగా" },
  { en: "Deliberately", te: "కావాలనే" },
  { en: "Differently", te: "భిన్నంగా" },
  { en: "Directly", te: "నేరుగా" },
  { en: "Dishonestly", te: "అవినీతిగా" },
  { en: "Downwards", te: "క్రిందికి" },
  { en: "Easily", te: "సులభంగా" },
  { en: "Effectively", te: "ప్రభావవంతంగా" },
  { en: "Efficiently", te: "సమర్థవంతంగా" },
  { en: "Equally", te: "సమానంగా" },
  { en: "Especially", te: "ముఖ్యంగా" },
  { en: "Evenly", te: "సమంగా" },
  { en: "Ever", te: "ఎప్పుడైనా" },
  { en: "Everywhere", te: "అన్నిచోట్లా" },
  { en: "Exactly", te: "ఖచ్చితంగా" },
  { en: "Extremely", te: "అత్యంత" },
  { en: "Fairly", te: "న్యాయంగా" },
  { en: "Far", te: "దూరం" },
  { en: "Fast", te: "వేగంగా" },
  { en: "Finally", te: "చివరకు" },
  { en: "Financially", te: "ఆర్థికంగా" },
  { en: "Finely", te: "ముక్కలుగా" },
  { en: "Firmly", te: "దృఢంగా" },
  { en: "Forcefully", te: "బలవంతంగా" },
  { en: "Formally", te: "అధికారికంగా" },
  { en: "Forwards", te: "ముందుకు" },
  { en: "Freely", te: "స్వేచ్ఛగా" },
  { en: "Frequently", te: "తరచుగా" },
  { en: "Fully", te: "పూర్తిగా" },
  { en: "Further", te: "మరింత" },
  { en: "Generally", te: "సాధారణంగా" },
  { en: "Generously", te: "ఉదారంగా" },
  { en: "Gently", te: "మెల్లిగా" },
  { en: "Gradually", te: "క్రమంగా" },
  { en: "Halfway", te: "సగం దారిలో" },
  { en: "Happily", te: "సంతోషంగా" },
  { en: "Hardly", te: "కష్టంగా" },
  { en: "Harshly", te: "కఠినంగా" },
  { en: "Heavily", te: "భారీగా" },
  { en: "Here", te: "ఇక్కడ" },
  { en: "Highly", te: "ఎక్కువగా" },
  { en: "Honestly", te: "నిజాయితీగా" },
  { en: "However", te: "ఏది ఏమైనా" },
  { en: "Illegally", te: "అక్రమంగా" },
  { en: "Immediately", te: "వెంటనే" },
  { en: "Independently", te: "స్వతంత్రంగా" },
  { en: "Indirectly", te: "పరోక్షంగా" },
  { en: "Instead", te: "బదులుగా" },
  { en: "Inwards", te: "లోపలికి" },
  { en: "Least", te: "కనీసం" },
  { en: "Legally", te: "చట్టబద్ధంగా" },
  { en: "Lightly", te: "తేలికగా" },
  { en: "Loosely", te: "వదులుగా" },
  { en: "Loudly", te: "గట్టిగా" },
  { en: "Low", te: "తక్కువ" }
];

const VOCAB_2_GROUPS = [
  {
    title: "Time & Frequency",
    words: [
      { en: "Now", te: "ఇప్పుడు" },
      { en: "Then", te: "అప్పుడు" },
      { en: "Today", te: "ఈ రోజు" },
      { en: "Yesterday", te: "నిన్న" },
      { en: "Early", te: "త్వరగా" },
      { en: "Soon", te: "త్వరలో" },
      { en: "Just before", te: "కాస్త ముందు" },
      { en: "Just now", te: "ఇప్పుడే" },
      { en: "Only", te: "మాత్రమే" },
      { en: "Never", te: "ఎప్పుడూ కాదు" },
      { en: "Seldom", te: "అరుదుగా" },
      { en: "Occasionally", te: "అప్పుడప్పుడు" },
      { en: "Once", te: "ఒకసారి" },
      { en: "Twice", te: "రెండుసార్లు" },
      { en: "Frequently", te: "తరచుగా" },
      { en: "Regularly", te: "క్రమం తప్పకుండా" }
    ]
  },
  {
    title: "Place & Direction",
    words: [
      { en: "Here", te: "ఇక్కడ" },
      { en: "There", te: "అక్కడ" },
      { en: "In", te: "లోపల" },
      { en: "Out", te: "బయట" },
      { en: "Forward", te: "ముందుకు" },
      { en: "Backward", te: "వెనుకకు" },
      { en: "Within", te: "లోపల" },
      { en: "Away", te: "దూరంగా" }
    ]
  },
  {
    title: "Manner & Degree",
    words: [
      { en: "Clearly", te: "స్పష్టంగా" },
      { en: "Quickly", te: "వేగంగా" },
      { en: "Happily", te: "సంతోషంగా" },
      { en: "Sadly", te: "విచారంగా" },
      { en: "Smoothly", te: "సునాయాసంగా" },
      { en: "Roughly", te: "సుమారుగా" },
      { en: "Slowly", te: "నెమ్మదిగా" },
      { en: "Sincerely", te: "నిజాయితీగా" },
      { en: "Fully", te: "పూర్తిగా" },
      { en: "Partly", te: "పాక్షికంగా" },
      { en: "Almost", te: "దాదాపు" },
      { en: "Very", te: "చాలా" },
      { en: "Fairly", te: "న్యాయంగా" },
      { en: "Enough", te: "చాలు" },
      { en: "Immensely", te: "అత్యధికంగా" }
    ]
  },
  {
    title: "Certainty",
    words: [
      { en: "Definitely", te: "ఖచ్చితంగా" },
      { en: "Obviously", te: "స్పష్టంగా" },
      { en: "Certainly", te: "ఖచ్చితంగా" },
      { en: "Surely", te: "నిశ్చయంగా" }
    ]
  },
  {
    title: "Self-Emphasis (Time)",
    words: [
      { en: "Now itself", te: "ఇప్పుడే" },
      { en: "Then itself", te: "అప్పుడే" },
      { en: "Today itself", te: "ఈ రోజే" },
      { en: "Yesterday itself", te: "నిన్ననే" },
      { en: "Tomorrow itself", te: "రేపే" },
      { en: "Morning itself", te: "ఉదయమే" },
      { en: "Afternoon itself", te: "మధ్యాహ్నమే" },
      { en: "Evening itself", te: "సాయంత్రమే" }
    ]
  },
  {
    title: "Self-Emphasis (Place/Thing)",
    words: [
      { en: "here itself", te: "ఇక్కడే" },
      { en: "There itself", te: "అక్కడే" },
      { en: "In Hyderabad itself", te: "హైదరాబాద్ లోనే" },
      { en: "In the institute itself", "te": "ఇన్స్టిట్యూట్ లోనే" },
      { en: "That itself", te: "అదే" },
      { en: "This itself", te: "ఇదే" },
      { en: "English itself", te: "ఇంగ్లీషే" },
      { en: "Movie itself", te: "సినిమానే" }
    ]
  }
];

export function AdverbVocabulary({ type }: { type: 'vocab_1' | 'vocab_2' }) {
  const [selectedWord, setSelectedWord] = React.useState<string | null>(null);

  if (type === 'vocab_1') {
    return (
      <div className="mt-8 space-y-6">
        <div className="flex items-center gap-3 mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
          <BookOpen className="w-6 h-6 text-indigo-500" />
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">Adverbs Vocabulary: A to L</h4>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {VOCAB_1_WORDS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.005 }}
              onClick={() => setSelectedWord(selectedWord === item.en ? null : item.en)}
              className={`p-3 cursor-pointer border rounded-xl text-center transition-all shadow-sm ${
                selectedWord === item.en 
                  ? 'bg-indigo-600 border-indigo-600 text-white' 
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
              }`}
            >
              <div className="font-bold text-sm">{item.en}</div>
              {selectedWord === item.en && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs mt-1 text-indigo-100"
                >
                  {item.te}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-10">
      <div className="flex items-center gap-3 mb-2 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800">
        <Search className="w-6 h-6 text-emerald-500" />
        <h4 className="text-xl font-bold text-slate-900 dark:text-white">Adverbs: Contextual Groups</h4>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {VOCAB_2_GROUPS.map((group, gIdx) => (
          <div key={gIdx} className="space-y-4">
            <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-2">
              {group.title}
            </h5>
            <div className="flex flex-wrap gap-2">
              {group.words.map((item, wIdx) => (
                <motion.div
                  key={wIdx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (gIdx * 0.05) + (wIdx * 0.01) }}
                  onClick={() => setSelectedWord(selectedWord === item.en ? null : item.en)}
                  className={`px-3 py-2 cursor-pointer rounded-lg text-sm font-bold border transition-all ${
                    selectedWord === item.en
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-md scale-105'
                      : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span>{item.en}</span>
                    {selectedWord === item.en && (
                      <motion.span 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-[10px] text-emerald-100 mt-1"
                      >
                        {item.te}
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
