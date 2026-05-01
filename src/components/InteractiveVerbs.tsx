import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Zap, Layers, Copy, Languages, Volume2, ChevronDown } from 'lucide-react';

interface VerbData {
  base: string;
  thirdPerson: string;
  ing: string;
  past: string;
  participle: string;
  definition: string;
  ipa?: string;
}

const REGULAR_VERBS: VerbData[] = [
  { base: 'Abuse', thirdPerson: 'abuses', ing: 'abusing', past: 'abused', participle: 'abused', definition: 'To use something to bad effect or for a bad purpose.', ipa: '/əˈbjuz/' },
  { base: 'Achieve', thirdPerson: 'achieves', ing: 'achieving', past: 'achieved', participle: 'achieved', definition: 'To successfully reach a goal by effort, skill, or courage.', ipa: '/əˈtʃiv/' },
  { base: 'Add', thirdPerson: 'adds', ing: 'adding', past: 'added', participle: 'added', definition: 'To join something to something else so as to increase the size, number, or amount.', ipa: '/æd/' },
  { base: 'Alter', thirdPerson: 'alters', ing: 'altering', past: 'altered', participle: 'altered', definition: 'To change or cause to change in character or composition.', ipa: '/ˈɔltər/' },
  { base: 'Ask', thirdPerson: 'asks', ing: 'asking', past: 'asked', participle: 'asked', definition: 'To say something in order to obtain information or a reply.', ipa: '/æsk/' },
  { base: 'Attend', thirdPerson: 'attends', ing: 'attending', past: 'attended', participle: 'attended', definition: 'To be present at an event, meeting, or function.', ipa: '/əˈtɛnd/' },
  { base: 'Call', thirdPerson: 'calls', ing: 'calling', past: 'called', participle: 'called', definition: 'To cry out to someone in order to summon them or attract their attention.', ipa: '/kɔl/' },
  { base: 'Clean', thirdPerson: 'cleans', ing: 'cleaning', past: 'cleaned', participle: 'cleaned', definition: 'To remove dirt, marks, or stains from something.', ipa: '/klin/' },
  { base: 'Help', thirdPerson: 'helps', ing: 'helping', past: 'helped', participle: 'helped', definition: 'To make it easier for someone to do something by offering one\'s services or resources.', ipa: '/hɛlp/' },
  { base: 'Work', thirdPerson: 'works', ing: 'working', past: 'worked', participle: 'worked', definition: 'To be engaged in physical or mental effort in order to achieve a purpose or result.', ipa: '/wɜrk/' }
];

const IRREGULAR_VERBS: VerbData[] = [
  { base: 'Bring', thirdPerson: 'brings', ing: 'bringing', past: 'brought', participle: 'brought', definition: 'To take or go with someone or something to a place.', ipa: '/brɪŋ/' },
  { base: 'Come', thirdPerson: 'comes', ing: 'coming', past: 'came', participle: 'come', definition: 'To move or travel toward or into a place thought of as near or familiar.', ipa: '/kʌm/' },
  { base: 'Eat', thirdPerson: 'eats', ing: 'eating', past: 'ate', participle: 'eaten', definition: 'To put food into the mouth and chew and swallow it.', ipa: '/it/' },
  { base: 'Go', thirdPerson: 'goes', ing: 'going', past: 'went', participle: 'gone', definition: 'To move from one place to another.', ipa: '/ɡoʊ/' },
  { base: 'Know', thirdPerson: 'knows', ing: 'knowing', past: 'knew', participle: 'known', definition: 'To be aware of through observation, inquiry, or information.', ipa: '/noʊ/' },
  { base: 'Sleep', thirdPerson: 'sleeps', ing: 'sleeping', past: 'slept', participle: 'slept', definition: 'To rest in the state of natural suspension of consciousness.', ipa: '/slip/' },
  { base: 'Speak', thirdPerson: 'speaks', ing: 'speaking', past: 'spoke', participle: 'spoken', definition: 'To say something in order to convey information, an opinion, or a feeling.', ipa: '/spik/' },
  { base: 'Take', thirdPerson: 'takes', ing: 'taking', past: 'took', participle: 'taken', definition: 'To lay hold of something with one\'s hands; reach for and hold.', ipa: '/teɪk/' },
  { base: 'Write', thirdPerson: 'writes', ing: 'writing', past: 'wrote', participle: 'written', definition: 'To mark letters, words, or other symbols on a surface.', ipa: '/raɪt/' }
];

const SAME_FORM_VERBS: VerbData[] = [
  { base: 'Bet', thirdPerson: 'bets', ing: 'betting', past: 'bet', participle: 'bet', definition: 'To risk a sum of money or valued item on the outcome of an unpredictable event.', ipa: '/bɛt/' },
  { base: 'Cost', thirdPerson: 'costs', ing: 'costing', past: 'cost', participle: 'cost', definition: 'To require the payment of a specified sum of money before it can be acquired.', ipa: '/kɔst/' },
  { base: 'Cut', thirdPerson: 'cuts', ing: 'cutting', past: 'cut', participle: 'cut', definition: 'To make an opening, incision, or wound in something with a sharp-edged tool.', ipa: '/kʌt/' },
  { base: 'Hit', thirdPerson: 'hits', ing: 'hitting', past: 'hit', participle: 'hit', definition: 'To bring one\'s hand or a tool or weapon into contact with someone or something quickly and forcefully.', ipa: '/hɪt/' },
  { base: 'Hurt', thirdPerson: 'hurts', ing: 'hurting', past: 'hurt', participle: 'hurt', definition: 'To cause physical pain or injury to.', ipa: '/hɜrt/' },
  { base: 'Let', thirdPerson: 'lets', ing: 'letting', past: 'let', participle: 'let', definition: 'To allow someone to do something or to allow something to happen.', ipa: '/lɛt/' },
  { base: 'Put', thirdPerson: 'puts', ing: 'putting', past: 'put', participle: 'put', definition: 'To move something into a particular place or position.', ipa: '/pʊt/' },
  { base: 'Set', thirdPerson: 'sets', ing: 'setting', past: 'set', participle: 'set', definition: 'To put, lay, or stand something in a specified place or position.', ipa: '/set/' },
  { base: 'Shut', thirdPerson: 'shuts', ing: 'shutting', past: 'shut', participle: 'shut', definition: 'To move something into position so as to block an opening.', ipa: '/ʃʌt/' }
];

const TWO_FORM_VERBS: VerbData[] = [
  { base: 'Burn', thirdPerson: 'burns', ing: 'burning', past: 'burnt/burned', participle: 'burnt/burned', definition: 'To be or cause to be on fire.', ipa: '/bɜrn/' },
  { base: 'Dream', thirdPerson: 'dreams', ing: 'dreaming', past: 'dreamt/dreamed', participle: 'dreamt/dreamed', definition: 'To experience a series of thoughts, images, and sensations during sleep.', ipa: '/drim/' },
  { base: 'Grip', thirdPerson: 'grips', ing: 'gripping', past: 'gript/gripped', participle: 'gript/gripped', definition: 'To take and keep a firm hold of; grasp.', ipa: '/ɡrɪp/' },
  { base: 'Learn', thirdPerson: 'learns', ing: 'learning', past: 'learnt/learned', participle: 'learnt/learned', definition: 'To acquire knowledge of or skill in something by study, experience, or being taught.', ipa: '/lɜrn/' },
  { base: 'Light', thirdPerson: 'lights', ing: 'lighting', past: 'lit/lighted', participle: 'lit/lighted', definition: 'To provide with light or illuminate.', ipa: '/laɪt/' },
  { base: 'Smell', thirdPerson: 'smells', ing: 'smelling', past: 'smelt/smelled', participle: 'smelt/smelled', definition: 'To perceive or recognize the odor of something.', ipa: '/smɛl/' },
  { base: 'Spoil', thirdPerson: 'spoils', ing: 'spoiling', past: 'spoilt/spoiled', participle: 'spoilt/spoiled', definition: 'To diminish or destroy the value or quality of.', ipa: '/spɔɪl/' }
];

export function InteractiveVerbs() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Regular Verbs': false,
    'Irregular Verbs': false,
    'Verbs with Same Form': false,
    'Verbs with Two Forms': false
  });

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const playAudio = (text: string, lang: string = 'en-US') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    }
  };

  const renderTable = (title: string, icon: React.ReactNode, verbs: VerbData[], accentColor: string) => (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col transition-all hover:shadow-2xl hover:border-indigo-100 dark:hover:border-indigo-900/40">
      <div 
        className={`p-6 sm:p-8 bg-gradient-to-r from-${accentColor}-50 to-white dark:from-${accentColor}-950/20 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between cursor-pointer`}
        onClick={() => toggleSection(title)}
      >
        <div className="flex items-center gap-4 sm:gap-6">
          <div className={`p-4 sm:p-5 bg-white dark:bg-slate-800 rounded-[1.5rem] shadow-sm border border-${accentColor}-100 dark:border-${accentColor}-800`}>
            {icon}
          </div>
          <div>
            <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">{title}</h4>
            <p className="text-xs sm:text-sm text-slate-500 font-bold tracking-[0.2em] uppercase mt-1">Verb Forms (V1-V5)</p>
          </div>
        </div>
        <div className={`p-2 rounded-full bg-${accentColor}-100/50 dark:bg-${accentColor}-900/30 text-${accentColor}-600 dark:text-${accentColor}-400 transition-transform duration-300 ${openSections[title] ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
      
      <AnimatePresence>
        {openSections[title] && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-8 flex flex-col gap-6">
              {verbs.map((verb, idx) => (
          <div key={idx} className={`bg-slate-50 dark:bg-slate-800/40 p-5 rounded-3xl border border-slate-100 dark:border-slate-700/50 flex flex-col gap-5 transition-all hover:border-${accentColor}-200 dark:hover:border-${accentColor}-800/50 shadow-sm hover:shadow-md`}>
            {/* Header: V1 */}
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700/50 pb-5`}>
              <div>
                <div className="flex items-center gap-3">
                  <span className={`text-3xl sm:text-4xl font-black text-${accentColor}-600 dark:text-${accentColor}-400 tracking-tight`}>{verb.base}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => playAudio(verb.base)} 
                      className={`p-2 bg-${accentColor}-100 hover:bg-${accentColor}-200 dark:bg-${accentColor}-500/20 dark:hover:bg-${accentColor}-500/30 text-${accentColor}-600 dark:text-${accentColor}-400 rounded-xl transition-colors`}
                      title="Listen to Base Form"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-3 items-center mt-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest text-${accentColor}-500 bg-${accentColor}-50 dark:bg-${accentColor}-500/10 px-2 py-1 rounded-md`}>Base (V1)</span>
                  {verb.ipa && <span className="text-sm text-slate-500 dark:text-slate-400 font-mono">{verb.ipa}</span>}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 italic border-l-2 border-indigo-200 dark:border-indigo-800 pl-3">
                  {verb.definition}
                </p>
              </div>
            </div>

            {/* Grid: V2 to V5 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Past (V2)</div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="font-bold text-lg text-slate-800 dark:text-slate-200">{verb.past}</div>
                  <button onClick={() => playAudio(verb.past)} className="w-min p-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"><Volume2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Past Part. (V3)</div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="font-bold text-lg text-slate-800 dark:text-slate-200">{verb.participle}</div>
                  <button onClick={() => playAudio(verb.participle)} className="w-min p-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"><Volume2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Continuous (V4)</div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="font-bold text-lg text-slate-800 dark:text-slate-200">{verb.ing}</div>
                  <button onClick={() => playAudio(verb.ing)} className="w-min p-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"><Volume2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">S-Form (V5)</div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="font-bold text-lg text-slate-800 dark:text-slate-200">{verb.thirdPerson}</div>
                  <button onClick={() => playAudio(verb.thirdPerson)} className="w-min p-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"><Volume2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
