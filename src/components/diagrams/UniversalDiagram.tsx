import React from 'react';
import { ArrowRight } from 'lucide-react';

export type DiagramGroup = {
  subjects: string[];
  color: 'indigo' | 'emerald' | 'sky' | 'amber' | 'rose' | 'purple' | 'fuchsia';
  helperBase: string;
  helperNeg: string;
};

export interface UniversalDiagramProps {
  title: string;
  description: string;
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

export const UniversalDiagram: React.FC<UniversalDiagramProps> = ({
  title,
  description,
  verbFormLabel,
  verbFormSymbol,
  groups
}) => {
  return (
    <div className="my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-950 p-4 border-b border-slate-200 dark:border-slate-800 text-center">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">{title}</h3>
      </div>
      <div className="p-8 overflow-x-auto mx-auto max-w-full hidden md:block">
        <div className="min-w-[700px] grid grid-cols-4 gap-6 items-stretch text-center max-w-4xl mx-auto">
          
          {/* Headers */}
          <div className="font-bold text-slate-500 uppercase tracking-widest text-sm mb-4">Subject<br/>Noun/Pronoun</div>
          <div className="font-bold text-slate-500 uppercase tracking-widest text-sm mb-4">Helping<br/>Verbs</div>
          <div className="font-bold text-slate-500 uppercase tracking-widest text-sm mb-4">Verb<br/>used in</div>
          <div className="font-bold text-slate-500 uppercase tracking-widest text-sm mb-4">Use</div>

          {/* Subjects */}
          <div className="flex flex-col justify-between space-y-4">
            {groups.map((g, i) => {
              const c = colorMap[g.color];
              return (
                <div key={i} className={`${c.bg} rounded-2xl p-4 border ${c.border} shadow-sm flex flex-col space-y-2 relative h-full justify-center`}>
                   {g.subjects.map(s => (
                     <span key={s} className={`font-bold text-lg ${c.text}`}>{s}</span>
                   ))}
                   <div className={`absolute -right-5 top-1/2 -translate-y-1/2 ${c.arrow}`}><ArrowRight /></div>
                </div>
              );
            })}
          </div>

          {/* Helping Verbs */}
          <div className="flex flex-col justify-between space-y-4">
            {groups.map((g, i) => {
              const c = colorMap[g.color];
              return (
                <div key={i} className="flex flex-col items-center justify-center flex-1 relative min-h-[80px]">
                  {g.helperBase ? (
                     <div className={`w-full ${c.pop} text-white font-bold text-2xl py-2 rounded-full shadow-md relative z-10 flex flex-col items-center px-4`}>
                        <span>{g.helperBase}</span>
                     </div>
                  ) : (
                     <div className="w-full bg-slate-200 dark:bg-slate-700 text-transparent font-bold text-2xl py-2 rounded-full relative z-10">
                        -
                     </div>
                  )}
                  {g.helperNeg && (
                     <div className={`mt-1 ${c.textMute} font-medium italic font-serif`}>{g.helperNeg}</div>
                  )}
                  <div className="absolute -right-5 top-1/3 text-slate-300 dark:text-slate-700 hidden lg:block"><ArrowRight /></div>
                </div>
              );
            })}
          </div>

          {/* Verb base form */}
          <div className="flex flex-col justify-center items-center relative">
             <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-2 border-slate-300 dark:border-slate-600 rounded-2xl p-6 font-bold text-xl shadow-lg relative tracking-wide flex flex-col items-center gap-2">
                <span>{verbFormLabel}</span>
                {verbFormSymbol && (
                  <div className="absolute -bottom-6 -right-2 text-slate-400 dark:text-slate-500 font-serif text-xl font-bold italic">
                    {verbFormSymbol}
                  </div>
                )}
             </div>
             <div className="absolute -right-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-700"><ArrowRight /></div>
          </div>

          {/* Use description */}
          <div className="flex flex-col justify-center items-start text-left">
             <div className="text-lg md:text-[17px] font-medium text-slate-600 dark:text-slate-300 leading-relaxed bg-amber-50 dark:bg-amber-500/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-500/20 shadow-sm" dangerouslySetInnerHTML={{ __html: description }} />
          </div>

        </div>
      </div>
      <div className="p-8 text-center text-slate-500 italic block md:hidden">
        Please rotate your device or use a larger screen to view the Diagram table in this section.
      </div>
    </div>
  );
};
