import React from 'react';
import { motion } from 'motion/react';
import { Zap, Heart, Star, Sparkles, Info, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface InterjectionItem {
  en: string;
  te: string;
  tag: string;
}

const JOY_INTERJECTIONS: InterjectionItem[] = [
  { en: "Hurrah! I have won the match.", te: "భళా! నేను మ్యాచ్ గెలిచాను.", tag: "Victory" },
  { en: "Wonderful!", te: "అద్భుతం!", tag: "Admiration" },
  { en: "You did it!", te: "నీవు సాధించావు!", tag: "Success" },
  { en: "Hooray!", te: "భళా!", tag: "Joy" },
  { en: "That's wonderful!", te: "అది అద్భుతం!", tag: "Joy" }
];

const SORROW_INTERJECTIONS: InterjectionItem[] = [
  { en: "Alas! He is no more.", te: "అయ్యో! అతను ఇక లేడు.", tag: "Sorrow" },
  { en: "Oh! What a shame!", te: "ఓహ్! ఎంత అవమానం!", tag: "Sorrow" },
  { en: "What a shame!", te: "ఎంత సిగ్గుచేటు!", tag: "Pity" },
  { en: "Oh!", te: "ఓహో!", tag: "Shock" }
];

const SURPRISE_INTERJECTIONS: InterjectionItem[] = [
  { en: "What a surprise!", te: "ఎంత ఆశ్చర్యం!", tag: "Surprise" },
  { en: "What a nice idea!", te: "ఎంత మంచి ఆలోచన!", tag: "Surprise" },
  { en: "What a relief!", te: "ఎంత ఉపశమనం!", tag: "Relief" },
  { en: "Just in time!", te: "సరిగ్గా సమయానికి!", tag: "Precision" }
];

const CATEGORIES = {
  joy: { title: "Joy & Celebration", items: JOY_INTERJECTIONS, icon: <Sparkles className="w-5 h-5" />, color: "yellow" },
  sorrow: { title: "Sorrow & Pity", items: SORROW_INTERJECTIONS, icon: <Heart className="w-5 h-5" />, color: "rose" },
  surprise: { title: "Surprise & Relief", items: SURPRISE_INTERJECTIONS, icon: <Zap className="w-5 h-5" />, color: "sky" }
};

export function InterjectionModules({ type }: { type: 'joy' | 'sorrow' | 'surprise' | 'all' }) {
  const { language } = useLanguage();
  const showTelugu = language === 'te';

  const renderCategory = (catKey: keyof typeof CATEGORIES) => {
    const cat = CATEGORIES[catKey];
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cat.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 bg-slate-50 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-400 rounded-full">
                  {item.tag}
                </span>
                <MessageCircle className="w-4 h-4 text-slate-200 group-hover:text-indigo-400 transition-colors" />
              </div>
              
              <div className="space-y-2">
                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  {item.en}
                </p>
                {showTelugu && (
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {item.te}
                  </p>
                )}
              </div>
            </motion.div>
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
            <Info className="w-5 h-5 text-indigo-500" />
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
