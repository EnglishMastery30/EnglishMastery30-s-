import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Zap, Layers, Copy, Languages } from 'lucide-react';

interface VerbData {
  base: string;
  thirdPerson: string;
  ing: string;
  past: string;
  participle: string;
  telugu: string;
}

const REGULAR_VERBS: VerbData[] = [
  { base: 'Abuse', thirdPerson: 'abuses', ing: 'abusing', past: 'abused', participle: 'abused', telugu: 'తిట్టు' },
  { base: 'Achieve', thirdPerson: 'achieves', ing: 'achieving', past: 'achieved', participle: 'achieved', telugu: 'సాధించు' },
  { base: 'Add', thirdPerson: 'adds', ing: 'adding', past: 'added', participle: 'added', telugu: 'కలుపు' },
  { base: 'Alter', thirdPerson: 'alters', ing: 'altering', past: 'altered', participle: 'altered', telugu: 'మార్చు' },
  { base: 'Ask', thirdPerson: 'asks', ing: 'asking', past: 'asked', participle: 'asked', telugu: 'అడుగు' },
  { base: 'Attend', thirdPerson: 'attends', ing: 'attending', past: 'attended', participle: 'attended', telugu: 'హాజరవు' },
  { base: 'Call', thirdPerson: 'calls', ing: 'calling', past: 'called', participle: 'called', telugu: 'పిలువు' },
  { base: 'Clean', thirdPerson: 'cleans', ing: 'cleaning', past: 'cleaned', participle: 'cleaned', telugu: 'శుభ్రపరచు' },
  { base: 'Help', thirdPerson: 'helps', ing: 'helping', past: 'helped', participle: 'helped', telugu: 'సహాయపడు' },
  { base: 'Work', thirdPerson: 'works', ing: 'working', past: 'worked', participle: 'worked', telugu: 'పని చేయు' }
];

const IRREGULAR_VERBS: VerbData[] = [
  { base: 'Bring', thirdPerson: 'brings', ing: 'bringing', past: 'brought', participle: 'brought', telugu: 'తెచ్చు' },
  { base: 'Come', thirdPerson: 'comes', ing: 'coming', past: 'came', participle: 'come', telugu: 'వచ్చు' },
  { base: 'Eat', thirdPerson: 'eats', ing: 'eating', past: 'ate', participle: 'eaten', telugu: 'తిను' },
  { base: 'Go', thirdPerson: 'goes', ing: 'going', past: 'went', participle: 'gone', telugu: 'వెళ్లు' },
  { base: 'Know', thirdPerson: 'knows', ing: 'knowing', past: 'knew', participle: 'known', telugu: 'తెలుసు' },
  { base: 'Sleep', thirdPerson: 'sleeps', ing: 'sleeping', past: 'slept', participle: 'slept', telugu: 'నిద్రించు' },
  { base: 'Speak', thirdPerson: 'speaks', ing: 'speaking', past: 'spoke', participle: 'spoken', telugu: 'మాట్లాడు' },
  { base: 'Take', thirdPerson: 'takes', ing: 'taking', past: 'took', participle: 'taken', telugu: 'తీసుకొను' },
  { base: 'Write', thirdPerson: 'writes', ing: 'writing', past: 'wrote', participle: 'written', telugu: 'వ్రాయు' }
];

const SAME_FORM_VERBS: VerbData[] = [
  { base: 'Bet', thirdPerson: 'bets', ing: 'betting', past: 'bet', participle: 'bet', telugu: 'పందెంకాయు' },
  { base: 'Cost', thirdPerson: 'costs', ing: 'costing', past: 'cost', participle: 'cost', telugu: 'ఖరీదు' },
  { base: 'Cut', thirdPerson: 'cuts', ing: 'cutting', past: 'cut', participle: 'cut', telugu: 'కోయు' },
  { base: 'Hit', thirdPerson: 'hits', ing: 'hitting', past: 'hit', participle: 'hit', telugu: 'కొట్టు' },
  { base: 'Hurt', thirdPerson: 'hurts', ing: 'hurting', past: 'hurt', participle: 'hurt', telugu: 'నొప్పించు' },
  { base: 'Let', thirdPerson: 'lets', ing: 'letting', past: 'let', participle: 'let', telugu: 'అనుమతించు' },
  { base: 'Put', thirdPerson: 'puts', ing: 'putting', past: 'put', participle: 'put', telugu: 'పెట్టు' },
  { base: 'Set', thirdPerson: 'sets', ing: 'setting', past: 'set', participle: 'set', telugu: 'అమర్చు' },
  { base: 'Shut', thirdPerson: 'shuts', ing: 'shutting', past: 'shut', participle: 'shut', telugu: 'మూయు' }
];

const TWO_FORM_VERBS: VerbData[] = [
  { base: 'Burn', thirdPerson: 'burns', ing: 'burning', past: 'burnt/burned', participle: 'burnt/burned', telugu: 'కాలు' },
  { base: 'Dream', thirdPerson: 'dreams', ing: 'dreaming', past: 'dreamt/dreamed', participle: 'dreamt/dreamed', telugu: 'కలగను' },
  { base: 'Grip', thirdPerson: 'grips', ing: 'gripping', past: 'gript/gripped', participle: 'gript/gripped', telugu: 'పట్టు బిగించు' },
  { base: 'Learn', thirdPerson: 'learns', ing: 'learning', past: 'learnt/learned', participle: 'learnt/learned', telugu: 'నేర్చుకొను' },
  { base: 'Light', thirdPerson: 'lights', ing: 'lighting', past: 'lit/lighted', participle: 'lit/lighted', telugu: 'వెలిగించు' },
  { base: 'Smell', thirdPerson: 'smells', ing: 'smelling', past: 'smelt/smelled', participle: 'smelt/smelled', telugu: 'వాసనచూచు' },
  { base: 'Spoil', thirdPerson: 'spoils', ing: 'spoiling', past: 'spoilt/spoiled', participle: 'spoilt/spoiled', telugu: 'చెడగొట్టు' }
];

export function InteractiveVerbs() {
  const [showTelugu, setShowTelugu] = useState(false);

  const renderTable = (title: string, icon: React.ReactNode, verbs: VerbData[], accentColor: string) => (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col transition-all hover:shadow-2xl hover:border-indigo-100 dark:hover:border-indigo-900/40">
      <div className={`p-6 bg-gradient-to-r from-${accentColor}-50 to-white dark:from-${accentColor}-950/20 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-${accentColor}-100 dark:border-${accentColor}-800`}>
            {icon}
          </div>
          <div>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h4>
            <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">Verb Sheet</p>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto p-4 sm:p-6">
        <table className="w-full min-w-[700px] border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">
              <th className="text-left py-2 px-4">Base Form (V1)</th>
              <th className="text-left py-2 px-4">S-Form (V1 + s/es)</th>
              <th className="text-left py-2 px-4">Continuous (V4)</th>
              <th className="text-left py-2 px-4">Past Tense (V2)</th>
              <th className="text-left py-2 px-4">Past Participle (V3)</th>
            </tr>
          </thead>
          <tbody>
            {verbs.map((verb, idx) => (
              <tr key={idx} className="group">
                <td className="py-2 px-4 bg-slate-50 dark:bg-slate-800/40 rounded-l-xl border-y border-l border-transparent group-hover:border-indigo-100 dark:group-hover:border-indigo-900/30 transition-all">
                  <div className="flex flex-col">
                    <span className={`text-lg font-bold text-${accentColor}-600 dark:text-${accentColor}-400`}>{verb.base}</span>
                    {showTelugu && verb.telugu && (
                      <span className="text-[11px] text-slate-400 font-bold leading-none mt-1">{verb.telugu}</span>
                    )}
                  </div>
                </td>
                <td className="py-2 px-4 bg-slate-50 dark:bg-slate-800/40 border-y border-transparent group-hover:border-indigo-100 dark:group-hover:border-indigo-900/30 text-sm text-slate-600 dark:text-slate-400 font-bold">{verb.thirdPerson}</td>
                <td className="py-2 px-4 bg-slate-50 dark:bg-slate-800/40 border-y border-transparent group-hover:border-indigo-100 dark:group-hover:border-indigo-900/30 text-sm text-slate-600 dark:text-slate-400 font-bold italic">{verb.ing}</td>
                <td className="py-2 px-4 bg-slate-50 dark:bg-slate-800/40 border-y border-transparent group-hover:border-indigo-100 dark:group-hover:border-indigo-900/30 text-base font-black text-slate-900 dark:text-slate-100">{verb.past}</td>
                <td className="py-2 px-4 bg-slate-50 dark:bg-slate-800/40 rounded-r-xl border-y border-r border-transparent group-hover:border-indigo-100 dark:group-hover:border-indigo-900/30 text-base font-black text-slate-900 dark:text-slate-100">{verb.participle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="mt-8 space-y-8 max-w-6xl mx-auto px-4">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-16 h-1 bg-indigo-500 rounded-full mb-6"></div>
        <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-3">Mastering Verb Forms</h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl">
          Verbs take different shapes to show time and agreement. Study the patterns below.
        </p>
        
        <button 
          onClick={() => setShowTelugu(!showTelugu)}
          className="mt-6 flex items-center gap-2 px-6 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm"
        >
          <Languages className="w-4 h-4" />
          {showTelugu ? 'Hide Telugu Meanings' : 'Show Telugu Meanings'}
        </button>
      </div>

      <div className="grid gap-10">
        {renderTable('Regular Verbs', <Activity className="w-8 h-8 text-indigo-500" />, REGULAR_VERBS, 'indigo')}
        {renderTable('Irregular Verbs', <Zap className="w-8 h-8 text-amber-500" />, IRREGULAR_VERBS, 'amber')}
        {renderTable('Verbs with Same Form', <Copy className="w-8 h-8 text-emerald-500" />, SAME_FORM_VERBS, 'emerald')}
        {renderTable('Verbs with Two Forms', <Layers className="w-8 h-8 text-purple-500" />, TWO_FORM_VERBS, 'purple')}
      </div>
    </div>
  );
}
