import React from 'react';
import { ArrowRight } from 'lucide-react';

export const DidDiagram = () => {
  return (
    <div className="my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-950 p-4 border-b border-slate-200 dark:border-slate-800 text-center">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Table of DID</h3>
      </div>
      <div className="p-8 overflow-x-auto mx-auto max-w-full hidden md:block">
        <div className="min-w-[700px] grid grid-cols-4 gap-6 items-stretch text-center max-w-4xl mx-auto">
          <div className="font-bold text-slate-500 uppercase tracking-widest text-sm mb-4">Subject<br/>Noun/Pronoun</div>
          <div className="font-bold text-slate-500 uppercase tracking-widest text-sm mb-4">Helping<br/>Verbs</div>
          <div className="font-bold text-slate-500 uppercase tracking-widest text-sm mb-4">Verb<br/>used in</div>
          <div className="font-bold text-slate-500 uppercase tracking-widest text-sm mb-4">Use</div>

          <div className="flex flex-col justify-center space-y-8">
            <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl p-4 border border-indigo-100 dark:border-indigo-500/20 shadow-sm flex flex-col space-y-2 relative">
               <span className="font-bold text-lg text-indigo-900 dark:text-indigo-300">I, We, You, They</span>
               <span className="font-bold text-lg text-emerald-900 dark:text-emerald-300">He, She, It</span>
               <div className="absolute -right-5 top-1/2 -translate-y-1/2 text-indigo-300 dark:text-indigo-600/50"><ArrowRight /></div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-8">
             <div className="flex flex-col items-center justify-center flex-1 relative">
               <div className="w-full bg-blue-500 text-white font-bold text-2xl py-4 rounded-full shadow-md relative z-10 flex flex-col items-center">
                  <span>did</span>
               </div>
               <div className="mt-2 text-blue-400 font-medium italic font-serif">didn't</div>
               <div className="absolute -right-5 top-1/3 text-slate-300 dark:text-slate-700 hidden lg:block"><ArrowRight /></div>
             </div>
          </div>

          <div className="flex flex-col justify-center items-center relative">
             <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-2 border-slate-300 dark:border-slate-600 rounded-2xl p-6 font-bold text-xl shadow-lg relative tracking-wide">
                base form
                <div className="absolute -bottom-6 -right-2 text-slate-400 dark:text-slate-500 font-serif text-xl font-bold italic">V₁</div>
             </div>
             <div className="absolute -right-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-700"><ArrowRight /></div>
          </div>

          <div className="flex flex-col justify-center items-start text-left">
             <div className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed bg-amber-50 dark:bg-amber-500/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-500/20 shadow-sm">
               To express an action that <span className="font-bold text-amber-600 dark:text-amber-400 border-b-2 border-amber-300 dark:border-amber-700 pb-1">happened in the past</span>
             </div>
          </div>
        </div>
      </div>
      <div className="p-8 text-center text-slate-500 italic block md:hidden">Please rotate your device.</div>
    </div>
  );
};

export const QuestionDidDiagram = () => {
  const whWords = [{ word: 'What' }, { word: 'Why' }, { word: 'Where' }, { word: 'When' }, { word: 'Which' }, { word: 'Whose' }, { word: 'Whom' }, { word: 'How' }];
  return (
    <div className="my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-950 p-4 border-b border-slate-200 dark:border-slate-800 text-center">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Question table for DID</h3>
      </div>
      <div className="p-8 overflow-x-auto mx-auto max-w-full hidden md:block">
        <div className="min-w-[700px] grid grid-cols-4 gap-6 items-stretch text-center max-w-4xl mx-auto relative">
          
          <div className="flex flex-col justify-between space-y-4">
             <div className="bg-sky-50 dark:bg-sky-500/10 rounded-2xl p-4 border border-sky-100 dark:border-sky-500/20 shadow-sm flex flex-col space-y-2 relative h-full justify-center">
               {whWords.map(item => (
                 <div key={item.word} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1 px-4 font-bold text-slate-700 dark:text-slate-300 shadow-sm text-center rounded relative z-10 w-full text-sm">
                   {item.word}
                 </div>
               ))}
               <div className="absolute top-1/2 -right-5 -translate-y-1/2 text-sky-300 dark:text-sky-600/50"><ArrowRight /></div>
             </div>
             
             <div className="bg-rose-50 dark:bg-rose-500/10 rounded-2xl p-4 border border-rose-100 dark:border-rose-500/20 shadow-sm flex flex-col relative justify-center">
               <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 px-4 font-bold text-slate-700 dark:text-slate-300 shadow-sm text-center rounded text-sm mb-8">Who</div>
               <div className="absolute top-1/2 -right-5 -translate-y-1/2 text-rose-300 dark:text-rose-600/50"><ArrowRight /></div>
             </div>
          </div>

          <div className="flex flex-col justify-center space-y-8 pb-32 pt-8">
             <div className="flex flex-col items-center justify-center flex-1 relative">
               <div className="w-full bg-blue-500 text-white font-bold text-2xl py-4 rounded-full shadow-md relative z-10 flex flex-col items-center">
                  <span>Did</span>
               </div>
               <div className="mt-2 text-blue-400 font-medium italic font-serif">Didn't</div>
               <div className="absolute -right-5 top-1/3 text-slate-300 dark:text-slate-700 hidden lg:block"><ArrowRight /></div>
             </div>
          </div>

          <div className="flex flex-col justify-center space-y-8 pb-28 pt-6">
             <div className="bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl p-4 border border-indigo-100 dark:border-indigo-500/20 shadow-sm flex flex-col space-y-2 relative h-full justify-center">
                 {['I', 'We', 'You', 'They', 'He', 'She', 'It'].map(sub => (
                   <div key={sub} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 px-4 font-bold text-slate-700 dark:text-slate-300 shadow-sm text-center rounded">
                     {sub}
                   </div>
                 ))}
                 <div className="absolute top-1/2 -right-5 -translate-y-1/2 text-indigo-300 dark:text-indigo-600/50"><ArrowRight /></div>
             </div>
          </div>

          <div className="flex flex-col justify-center items-center relative pl-4">
             <div className="text-slate-700 dark:text-slate-300 font-bold text-xl text-center space-y-1 relative w-full mb-10">
                <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-2 border-slate-300 dark:border-slate-600 rounded-2xl p-6 font-bold shadow-lg flex flex-col items-center justify-center">
                   <span>Verb</span><span>in</span><span>base</span><span>form</span>
                </div>
                <div className="text-6xl absolute -right-6 top-1/2 -translate-y-1/2 font-serif text-slate-800 dark:text-slate-100">?</div>
             </div>
             
             {/* Past form for Who */}
             <div className="text-slate-700 dark:text-slate-300 font-bold text-xl text-center space-y-1 relative w-full mb-5 z-20">
                <div className="bg-rose-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-2 border-rose-300 dark:border-slate-600 rounded-2xl p-3 font-bold shadow-lg flex flex-col items-center justify-center">
                   <span className="text-sm">Verb in</span><span>past form (V₂)</span>
                </div>
                <div className="text-4xl absolute -right-4 top-1/2 -translate-y-1/2 font-serif text-slate-800 dark:text-slate-100">?</div>
             </div>
          </div>
        </div>
      </div>
      <div className="p-8 text-center text-slate-500 italic block md:hidden">Please rotate your device.</div>
    </div>
  );
};
