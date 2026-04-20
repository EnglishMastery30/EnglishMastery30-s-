import React from 'react';
import { ArrowRight } from 'lucide-react';
import { DiagramGroup } from './UniversalDiagram';

export interface UniversalQuestionDiagramProps {
  title: string;
  verbFormLabel: string;
  verbFormSymbol: string;
  groups: DiagramGroup[];
}

const colorMap = {
  indigo: { bg: 'bg-indigo-50 dark:bg-indigo-500/10', border: 'border-indigo-100 dark:border-indigo-500/20', text: 'text-indigo-900 dark:text-indigo-300', textMute: 'text-indigo-400', arrow: 'text-indigo-300 dark:text-indigo-600/50', pop: 'bg-indigo-500' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-100 dark:border-emerald-500/20', text: 'text-emerald-900 dark:text-emerald-300', textMute: 'text-emerald-400', arrow: 'text-emerald-300 dark:text-emerald-600/50', pop: 'bg-emerald-500' },
  sky: { bg: 'bg-sky-50 dark:bg-sky-500/10', border: 'border-sky-100 dark:border-sky-500/20', text: 'text-sky-900 dark:text-sky-300', textMute: 'text-sky-400', arrow: 'text-sky-300 dark:text-sky-600/50', pop: 'bg-sky-500' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-100 dark:border-amber-500/20', text: 'text-amber-900 dark:text-amber-300', textMute: 'text-amber-400', arrow: 'text-amber-300 dark:text-amber-600/50', pop: 'bg-amber-500' },
  rose: { bg: 'bg-rose-50 dark:bg-rose-500/10', border: 'border-rose-100 dark:border-rose-500/20', text: 'text-rose-900 dark:text-rose-300', textMute: 'text-rose-400', arrow: 'text-rose-300 dark:text-rose-600/50', pop: 'bg-rose-500' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-500/10', border: 'border-purple-100 dark:border-purple-500/20', text: 'text-purple-900 dark:text-purple-300', textMute: 'text-purple-400', arrow: 'text-purple-300 dark:text-purple-600/50', pop: 'bg-purple-500' },
  fuchsia: { bg: 'bg-fuchsia-50 dark:bg-fuchsia-500/10', border: 'border-fuchsia-100 dark:border-fuchsia-500/20', text: 'text-fuchsia-900 dark:text-fuchsia-300', textMute: 'text-fuchsia-400', arrow: 'text-fuchsia-300 dark:text-fuchsia-600/50', pop: 'bg-fuchsia-500' },
};

export const UniversalQuestionDiagram: React.FC<UniversalQuestionDiagramProps> = ({
  title,
  verbFormLabel,
  verbFormSymbol,
  groups
}) => {
  const whWords = [
    { word: 'What', id: 'what' },
    { word: 'Why', id: 'why' },
    { word: 'Where', id: 'where' },
    { word: 'When', id: 'when' },
    { word: 'Which', id: 'which' },
    { word: 'Whose', id: 'whose' },
    { word: 'Whom', id: 'whom' },
    { word: 'How', id: 'how' },
  ];

  return (
    <div className="my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-950 p-4 border-b border-slate-200 dark:border-slate-800 text-center">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">{title}</h3>
      </div>
      <div className="p-8 overflow-x-auto mx-auto max-w-full hidden md:block">
        <div className="min-w-[700px] grid grid-cols-4 gap-6 items-stretch text-center max-w-4xl mx-auto relative">
          
          {/* Wh- Words (Col 1) */}
          <div className="flex flex-col justify-between space-y-4">
             <div className="bg-slate-50 dark:bg-slate-500/10 rounded-2xl p-4 border border-slate-200 dark:border-slate-500/20 shadow-sm flex flex-col space-y-2 relative h-full justify-center">
               {whWords.map(item => (
                 <div key={item.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1 px-4 font-bold text-slate-700 dark:text-slate-300 shadow-sm text-center tracking-wide rounded relative z-10 w-full text-sm">
                   {item.word}
                 </div>
               ))}
               <div className="absolute top-1/2 -right-5 -translate-y-1/2 text-slate-300 dark:text-slate-600/50"><ArrowRight /></div>
             </div>
             
             <div className="bg-rose-50 dark:bg-rose-500/10 rounded-2xl p-4 border border-rose-100 dark:border-rose-500/20 shadow-sm flex flex-col relative justify-center min-h-[60px]">
               <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 px-4 font-bold text-slate-700 dark:text-slate-300 shadow-sm text-center tracking-wide rounded relative z-10">
                   Who
               </div>
               <div className="absolute top-1/2 -right-5 -translate-y-1/2 text-rose-300 dark:text-rose-600/50"><ArrowRight /></div>
             </div>
          </div>

          {/* Helping Verbs (Col 2) */}
          <div className="flex flex-col justify-between space-y-4 pt-8 pb-32">
            {groups.map((g, i) => {
              const c = colorMap[g.color];
              return (
                <div key={i} className="flex flex-col items-center justify-center flex-1 relative min-h-[80px]">
                  {g.helperBase ? (
                     <div className={`w-full ${c.pop} text-white font-bold text-2xl py-2 px-4 rounded-full shadow-md relative z-10 flex flex-col items-center capitalize`}>
                        <span>{g.helperBase}</span>
                     </div>
                  ) : (
                     <div className="w-full bg-slate-200 dark:bg-slate-700 text-transparent font-bold text-2xl py-2 rounded-full relative z-10">
                        -
                     </div>
                  )}
                  {g.helperNeg && (
                     <div className={`mt-1 ${c.textMute} font-medium italic font-serif capitalize`}>{g.helperNeg}</div>
                  )}
                  <div className="absolute -right-5 top-1/3 text-slate-300 dark:text-slate-700 hidden lg:block"><ArrowRight /></div>
                </div>
              );
            })}
          </div>

          {/* Subjects (Col 3) */}
          <div className="flex flex-col justify-between space-y-4 pt-4 pb-28">
            {groups.map((g, i) => {
              const c = colorMap[g.color];
              return (
                <div key={i} className={`${c.bg} rounded-2xl p-4 border ${c.border} shadow-sm flex flex-col space-y-2 relative h-full justify-center`}>
                   {g.subjects.map(sub => (
                     <div key={sub} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1 px-4 font-bold text-slate-700 dark:text-slate-300 shadow-sm text-center rounded">
                       {sub}
                     </div>
                   ))}
                   <div className={`absolute top-1/2 -right-5 -translate-y-1/2 ${c.arrow}`}><ArrowRight /></div>
                </div>
              );
            })}
          </div>

          {/* Verb base form (Col 4) */}
          <div className="flex flex-col justify-center items-center relative pl-4">
             <div className="text-slate-700 dark:text-slate-300 font-bold text-xl text-center space-y-1 relative w-full">
                <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-2 border-slate-300 dark:border-slate-600 rounded-2xl p-6 font-bold shadow-lg flex flex-col items-center justify-center gap-1">
                   <span>{verbFormLabel}</span>
                   {verbFormSymbol && (
                     <span className="text-slate-500 font-serif text-lg">{verbFormSymbol}</span>
                   )}
                </div>
                <div className="text-6xl absolute -right-8 top-1/2 -translate-y-1/2 font-serif text-slate-800 dark:text-slate-100">?</div>
             </div>
             {/* Invisible spacer to match the "Who" block at the bottom */}
             <div className="h-16 mt-4"></div>
          </div>

        </div>
      </div>
      <div className="p-8 text-center text-slate-500 italic block md:hidden">
        Please rotate your device or use a larger screen to view the Question table in this section.
      </div>
    </div>
  );
};
