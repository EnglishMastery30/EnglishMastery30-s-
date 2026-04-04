import React, { useState } from 'react';
import { Languages, ExternalLink } from 'lucide-react';

export function QuickTranslate() {
  const [translateText, setTranslateText] = useState('');

  const handleTranslate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!translateText.trim()) return;
    window.open(`https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(translateText)}&op=translate`, '_blank');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 rounded-2xl shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center">
          <Languages className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white">Google Translate</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Translate text instantly</p>
        </div>
      </div>
      
      <form onSubmit={handleTranslate} className="flex flex-col gap-3 flex-1">
        <textarea
          value={translateText}
          onChange={(e) => setTranslateText(e.target.value)}
          placeholder="Enter text to translate..."
          className="flex-1 w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-3 sm:p-4 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none min-h-[120px]"
        />
        <button 
          type="submit"
          disabled={!translateText.trim()}
          className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white font-medium rounded-xl transition-colors mt-auto"
        >
          <span>Translate in Google</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
