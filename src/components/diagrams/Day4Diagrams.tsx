import React from 'react';
import { ArrowRight } from 'lucide-react';

export const WhQuestionsDiagram = () => {
    return (
      <div className="my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="bg-slate-50 dark:bg-slate-950 p-4 border-b border-slate-200 dark:border-slate-800 text-center">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Wh- Question Words Usage</h3>
        </div>
        <div className="p-8 overflow-x-auto mx-auto max-w-full hidden md:block">
          <div className="min-w-[600px] grid grid-cols-2 gap-8 items-stretch text-center max-w-2xl mx-auto relative">
            <div className="flex flex-col space-y-4">
               {['What', 'Why', 'Where', 'When', 'Which'].map((w,i) => (
                   <div key={w} className="flex items-center gap-4">
                       <span className="bg-indigo-500 text-white py-2 px-6 rounded shadow font-bold w-32">{w}</span>
                       <ArrowRight className="text-slate-400" />
                       <span className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2 px-4 rounded shadow-sm flex-1 text-left font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                           {w === 'What' && 'Information about something'}
                           {w === 'Why' && 'Reason for something'}
                           {w === 'Where' && 'Place or position'}
                           {w === 'When' && 'Time or occasion'}
                           {w === 'Which' && 'Choice between alternatives'}
                       </span>
                   </div>
               ))}
            </div>
            <div className="flex flex-col space-y-4">
               {['Who', 'Whose', 'Whom', 'How'].map((w,i) => (
                   <div key={w} className="flex items-center gap-4">
                       <span className="bg-emerald-500 text-white py-2 px-6 rounded shadow font-bold w-32">{w}</span>
                       <ArrowRight className="text-slate-400" />
                       <span className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2 px-4 rounded shadow-sm flex-1 text-left font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                           {w === 'Who' && 'Person (subject)'}
                           {w === 'Whose' && 'Possession'}
                           {w === 'Whom' && 'Person (object)'}
                           {w === 'How' && 'Manner, condition or way'}
                       </span>
                   </div>
               ))}
            </div>
          </div>
        </div>
        <div className="p-8 text-center text-slate-500 italic block md:hidden">Please rotate your device.</div>
      </div>
    )
}
