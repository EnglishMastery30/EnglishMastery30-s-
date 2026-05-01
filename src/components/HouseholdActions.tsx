import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Coffee, ChefHat, Book, Flower2, Bed, Bath, Search, ChevronRight } from 'lucide-react';
import { WordCard } from './WordCard';

interface VerbItem {
  en: string;
}

interface LocationData {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  verbs: VerbItem[];
}

const HOUSEHOLD_DATA: LocationData[] = [
  {
    title: 'Living Room',
    description: 'The space for socializing, relaxing, and family time.',
    icon: <Home className="w-6 h-6" />,
    color: 'indigo',
    verbs: [
      { en: 'Call' },
      { en: 'Discuss' },
      { en: 'Drink' },
      { en: 'Play' },
      { en: 'Read' },
      { en: 'Receive' },
      { en: 'Relax' },
      { en: 'Reset' },
      { en: 'See' },
      { en: 'Set' },
      { en: 'Sit' },
      { en: 'Watch' },
      { en: 'Write' },
      { en: 'Lean' },
      { en: 'Tell' }
    ]
  },
  {
    title: 'Dining Hall',
    description: 'The area where meals are shared and enjoyed.',
    icon: <Coffee className="w-6 h-6" />,
    color: 'amber',
    verbs: [
      { en: 'Sit' },
      { en: 'Set' },
      { en: 'Serve' },
      { en: 'Eat' },
      { en: 'Drink' },
      { en: 'Take' },
      { en: 'Have' },
      { en: 'Prefer' },
      { en: 'Finish' },
      { en: 'Wash' },
      { en: 'Drop' },
      { en: 'Put' },
      { en: 'Leave' }
    ]
  },
  {
    title: 'Kitchen',
    description: 'The place for preparing, cooking, and storing food.',
    icon: <ChefHat className="w-6 h-6" />,
    color: 'emerald',
    verbs: [
      { en: 'Add' },
      { en: 'Arrange' },
      { en: 'Bake' },
      { en: 'Blend' },
      { en: 'Boil' },
      { en: 'Check' },
      { en: 'Chop' },
      { en: 'Clean' },
      { en: 'Cook' },
      { en: 'Cut' },
      { en: 'Garnish' },
      { en: 'Grill' },
      { en: 'Heat' },
      { en: 'Keep' },
      { en: 'Mash' },
      { en: 'Mince' },
      { en: 'Mix' },
      { en: 'Mop' },
      { en: 'Peel' },
      { en: 'Pour' },
      { en: 'Prepare' },
      { en: 'Roast' },
      { en: 'Serve' },
      { en: 'Shred' },
      { en: 'Sprinkle' },
      { en: 'Stir' },
      { en: 'Sweep' },
      { en: 'Taste' },
      { en: 'Try' }
    ]
  },
  {
    title: 'Bedroom',
    description: 'A private space for sleeping and resting.',
    icon: <Bed className="w-6 h-6" />,
    color: 'purple',
    verbs: [
      { en: 'Sleep' },
      { en: 'Wake up' },
      { en: 'Wish' },
      { en: 'Wear' },
      { en: 'Get up' },
      { en: 'Pray' },
      { en: 'Stretch' },
      { en: 'Make' },
      { en: 'Fold' },
      { en: 'Unfold' },
      { en: 'Set' },
      { en: 'Sweep' },
      { en: 'Mop' },
      { en: 'Clean' },
      { en: 'Do' },
      { en: 'Dream' },
      { en: 'Remove' },
      { en: 'Spray' },
      { en: 'Switch off' },
      { en: 'Switch on' }
    ]
  },
  {
    title: 'Study Room',
    description: 'An area dedicated to reading, learning, and working.',
    icon: <Book className="w-6 h-6" />,
    color: 'rose',
    verbs: [
      { en: 'Browse' },
      { en: 'Chat' },
      { en: 'Check' },
      { en: 'Complete' },
      { en: 'Copy' },
      { en: 'Go through' },
      { en: 'Make' },
      { en: 'Open' },
      { en: 'Practice' },
      { en: 'Prepare' },
      { en: 'Refer' },
      { en: 'Revise' },
      { en: 'Send' },
      { en: 'See' },
      { en: 'Nap' },
      { en: 'Draw' },
      { en: 'Note' },
      { en: 'Doze' }
    ]
  },
  {
    title: 'Wash Room',
    description: 'A place for personal hygiene and cleaning.',
    icon: <Bath className="w-6 h-6" />,
    color: 'sky',
    verbs: [
      { en: 'Apply' },
      { en: 'Bath' },
      { en: 'Brush' },
      { en: 'Change' },
      { en: 'Clean' },
      { en: 'Comb' },
      { en: 'Decorate' },
      { en: 'Wash' },
      { en: 'Wear' }
    ]
  },
  {
    title: 'Garden',
    description: 'Outdoor space for plants and connecting with nature.',
    icon: <Flower2 className="w-6 h-6" />,
    color: 'green',
    verbs: [
      { en: 'Walk' },
      { en: 'Look' },
      { en: 'Do' },
      { en: 'Pour' },
      { en: 'Cut off' },
      { en: 'Pluck' },
      { en: 'Use' },
      { en: 'Spend' }
    ]
  }
];

export function HouseholdActions() {
  const [activeLocation, setActiveLocation] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const filteredVerbs = activeLocation !== null 
    ? HOUSEHOLD_DATA[activeLocation].verbs.filter(v => 
        v.en.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="mt-12 space-y-8 max-w-6xl mx-auto px-4">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-1 bg-indigo-500 rounded-full mb-6"></div>
        <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-3">Household Actions</h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl">
          Learn vocabulary for actions we perform in different parts of our home.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Locations */}
        <div className="lg:col-span-1 space-y-2">
          {HOUSEHOLD_DATA.map((loc, idx) => (
            <button
              key={loc.title}
              onClick={() => { setActiveLocation(idx); setSearch(''); }}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all group ${
                activeLocation === idx
                  ? `bg-${loc.color}-50 border-${loc.color}-200 dark:bg-${loc.color}-500/10 dark:border-${loc.color}-500/30 text-${loc.color}-600 dark:text-${loc.color}-400 shadow-sm`
                  : 'bg-white border-slate-100 dark:bg-slate-900 dark:border-slate-800 text-slate-500 hover:border-slate-200 dark:hover:border-slate-700'
              }`}
            >
              <div className={`p-2 rounded-xl transition-colors ${
                activeLocation === idx ? `bg-white dark:bg-slate-800 shadow-sm` : 'bg-slate-50 dark:bg-slate-800'
              }`}>
                {loc.icon}
              </div>
              <span className="font-bold tracking-tight">{loc.title}</span>
              <ChevronRight className={`ml-auto w-4 h-4 transition-transform ${activeLocation === idx ? 'translate-x-1' : 'opacity-0'}`} />
            </button>
          ))}
        </div>

        {/* Verbs Display */}
        <div className="lg:col-span-3 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder={`Search in ${activeLocation !== null ? HOUSEHOLD_DATA[activeLocation].title : 'library'}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-6 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none text-slate-900 dark:text-white font-medium"
            />
          </div>

          {activeLocation !== null && (
            <div className={`p-6 rounded-2xl border bg-${HOUSEHOLD_DATA[activeLocation].color}-50 dark:bg-${HOUSEHOLD_DATA[activeLocation].color}-500/5 border-${HOUSEHOLD_DATA[activeLocation].color}-100 dark:border-${HOUSEHOLD_DATA[activeLocation].color}-500/20`}>
               <h4 className={`text-lg font-bold text-${HOUSEHOLD_DATA[activeLocation].color}-600 dark:text-${HOUSEHOLD_DATA[activeLocation].color}-400 mb-1`}>{HOUSEHOLD_DATA[activeLocation].title}</h4>
               <p className="text-sm text-slate-500 dark:text-slate-400">{HOUSEHOLD_DATA[activeLocation].description}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredVerbs.map((verb, idx) => {
                const config = { 
                  border: `border-slate-100 dark:border-slate-800`, 
                  darkBorder: '', 
                  hoverBorder: `hover:border-indigo-300`, 
                  text: 'group-hover:text-indigo-600', 
                  bg: 'group-hover:bg-indigo-50', 
                  button: 'bg-indigo-600' 
                };
                return (
                  <WordCard 
                    key={verb.en}
                    word={verb.en}
                    category={HOUSEHOLD_DATA[activeLocation!].title}
                    config={config}
                    idx={idx}
                    autoFetch={false}
                    showDefine={true}
                  />
                );
              })}
            </AnimatePresence>
            
            {filteredVerbs.length === 0 && (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400">
                <Search className="w-12 h-12 mb-4 opacity-20" />
                <p className="font-bold uppercase tracking-widest text-xs">No words found matching your search</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
