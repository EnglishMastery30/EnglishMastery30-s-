import React from 'react';
import { ArrowRight } from 'lucide-react';

export const AmIsAreDiagram = () => {
  return (
    <div className="my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-950 p-4 border-b border-slate-200 dark:border-slate-800 text-center">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Table of AM / IS / ARE</h3>
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
            <div className="bg-sky-50 dark:bg-sky-500/10 rounded-2xl p-4 border border-sky-100 dark:border-sky-500/20 shadow-sm flex flex-col space-y-2 relative">
               <span className="font-bold text-lg text-sky-900 dark:text-sky-300">I</span>
               <div className="absolute -right-5 top-1/2 -translate-y-1/2 text-sky-300 dark:text-sky-600/50"><ArrowRight /></div>
            </div>
            
            <div className="bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl p-4 border border-emerald-100 dark:border-emerald-500/20 shadow-sm flex flex-col space-y-2 relative">
               <span className="font-bold text-lg text-emerald-900 dark:text-emerald-300">He</span>
               <span className="font-bold text-lg text-emerald-900 dark:text-emerald-300">She</span>
               <span className="font-bold text-lg text-emerald-900 dark:text-emerald-300">It</span>
               <div className="absolute -right-5 top-1/2 -translate-y-1/2 text-emerald-300 dark:text-emerald-600/50"><ArrowRight /></div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl p-4 border border-indigo-100 dark:border-indigo-500/20 shadow-sm flex flex-col space-y-2 relative">
               <span className="font-bold text-lg text-indigo-900 dark:text-indigo-300">We</span>
               <span className="font-bold text-lg text-indigo-900 dark:text-indigo-300">You</span>
               <span className="font-bold text-lg text-indigo-900 dark:text-indigo-300">They</span>
               <div className="absolute -right-5 top-1/2 -translate-y-1/2 text-indigo-300 dark:text-indigo-600/50"><ArrowRight /></div>
            </div>
          </div>

          {/* Helping Verbs */}
          <div className="flex flex-col justify-between space-y-4">
             <div className="flex flex-col items-center justify-center flex-1 relative">
               <div className="w-full bg-sky-500 text-white font-bold text-2xl py-2 rounded-full shadow-md relative z-10 flex flex-col items-center">
                  <span>am</span>
               </div>
               <div className="mt-1 text-sky-400 font-medium italic font-serif">am not / 'm not</div>
               <div className="absolute -right-5 top-1/3 text-slate-300 dark:text-slate-700 hidden lg:block"><ArrowRight /></div>
             </div>

             <div className="flex flex-col items-center justify-center flex-[1.5] relative">
               <div className="w-full bg-emerald-500 text-white font-bold text-2xl py-2 rounded-full shadow-md relative z-10 flex flex-col items-center">
                  <span>is</span>
               </div>
               <div className="mt-1 text-emerald-400 font-medium italic font-serif">isn't</div>
               <div className="absolute -right-5 top-1/3 text-slate-300 dark:text-slate-700 hidden lg:block"><ArrowRight /></div>
             </div>

             <div className="flex flex-col items-center justify-center flex-[1.5] relative">
               <div className="w-full bg-indigo-500 text-white font-bold text-2xl py-2 rounded-full shadow-md relative z-10 flex flex-col items-center">
                  <span>are</span>
               </div>
               <div className="mt-1 text-indigo-400 font-medium italic font-serif">aren't</div>
               <div className="absolute -right-5 top-1/3 text-slate-300 dark:text-slate-700 hidden lg:block"><ArrowRight /></div>
             </div>
          </div>

          {/* Verb base form */}
          <div className="flex flex-col justify-center items-center relative">
             <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-2 border-slate-300 dark:border-slate-600 rounded-2xl p-6 font-bold text-xl shadow-lg relative tracking-wide flex flex-col items-center gap-2">
                <span>ing form</span>
                <span className="text-sm font-normal text-slate-500 dark:text-slate-400">(V₁ + ing)</span>
                <div className="absolute -bottom-6 -right-2 text-slate-400 dark:text-slate-500 font-serif text-xl font-bold italic">
                  V₄
                </div>
             </div>
             <div className="absolute -right-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-700"><ArrowRight /></div>
          </div>

          {/* Use description */}
          <div className="flex flex-col justify-center items-start text-left">
             <div className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed bg-amber-50 dark:bg-amber-500/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-500/20 shadow-sm">
               To express an action that is happening <span className="font-bold text-amber-600 dark:text-amber-400 border-b-2 border-amber-300 dark:border-amber-700 pb-1">right now</span> (Present Continuous/Progressive)
             </div>
          </div>

        </div>
      </div>
      <div className="p-8 text-center text-slate-500 italic block md:hidden">
        Please rotate your device or use a larger screen to view the Diagram table in this section.
      </div>
    </div>
  );
};

export const QuestionAmIsAreDiagram = () => {
    return (
      <div className="my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="bg-slate-50 dark:bg-slate-950 p-4 border-b border-slate-200 dark:border-slate-800 text-center">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Question Table for AM / IS / ARE</h3>
        </div>
        {/* We can construct a similar reverse flow diagram here for questions */}
        <div className="p-8 text-center text-slate-500 italic border-t border-slate-200 dark:border-slate-800">
           Questions place "Am", "Is", or "Are" in front of the subject: <br/> "Am I playing?", "Is she eating?", "Are we going?"
        </div>
      </div>
    );
}
