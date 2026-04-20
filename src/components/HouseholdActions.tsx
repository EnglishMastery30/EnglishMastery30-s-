import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Coffee, ChefHat, Book, Flower2, Bed, Bath, Languages, Search, ChevronRight } from 'lucide-react';

interface VerbItem {
  en: string;
  te: string;
}

interface LocationData {
  title: string;
  icon: React.ReactNode;
  color: string;
  verbs: VerbItem[];
}

const HOUSEHOLD_DATA: LocationData[] = [
  {
    title: 'Living Room',
    icon: <Home className="w-6 h-6" />,
    color: 'indigo',
    verbs: [
      { en: 'Call', te: 'పిలువు' },
      { en: 'Discuss', te: 'చర్చించు' },
      { en: 'Drink', te: 'త్రాగు' },
      { en: 'Play', te: 'ఆడు' },
      { en: 'Read', te: 'చదువు' },
      { en: 'Receive', te: 'స్వీకరించు' },
      { en: 'Relax', te: 'విశ్రాంతి తీసుకొను' },
      { en: 'Reset', te: 'తిరిగి చేయు' },
      { en: 'See', te: 'చూడు' },
      { en: 'Set', te: 'అమర్చు' },
      { en: 'Sit', te: 'కూర్చో' },
      { en: 'Watch', te: 'చూడు' },
      { en: 'Write', te: 'వ్రాయి' },
      { en: 'Lean', te: 'ఒరుగు' },
      { en: 'Tell', te: 'చెప్పండి' }
    ]
  },
  {
    title: 'Dining Hall',
    icon: <Coffee className="w-6 h-6" />,
    color: 'amber',
    verbs: [
      { en: 'Sit', te: 'కూర్చో' },
      { en: 'Set', te: 'సెట్ చేయు' },
      { en: 'Serve', te: 'వడ్డించు' },
      { en: 'Eat', te: 'తిను' },
      { en: 'Drink', te: 'త్రాగు' },
      { en: 'Take', te: 'తీసుకో' },
      { en: 'Have', te: 'కలిగి ఉండు' },
      { en: 'Prefer', te: 'ఇష్టపడు' },
      { en: 'Finish', te: 'పూర్తి చేయు' },
      { en: 'Wash', te: 'కడుగు' },
      { en: 'Drop', te: 'డ్రాప్ చేయు' },
      { en: 'Put', te: 'పెట్టు' },
      { en: 'Leave', te: 'వదిలిపెట్టు' }
    ]
  },
  {
    title: 'Kitchen',
    icon: <ChefHat className="w-6 h-6" />,
    color: 'emerald',
    verbs: [
      { en: 'Add', te: 'చేర్చు' },
      { en: 'Arrange', te: 'సమకూర్చు' },
      { en: 'Bake', te: 'రొట్టె కాల్చు' },
      { en: 'Blend', te: 'కలుపు' },
      { en: 'Boil', te: 'ఉడికించు' },
      { en: 'Check', te: 'సరిచూచు' },
      { en: 'Chop', te: 'తరుగు' },
      { en: 'Clean', te: 'శుభ్రపరచు' },
      { en: 'Cook', te: 'వంట చేయు' },
      { en: 'Cut', te: 'కోయు' },
      { en: 'Garnish', te: 'అలంకరించు' },
      { en: 'Grill', te: 'కాల్చు' },
      { en: 'Heat', te: 'వేడి చేయు' },
      { en: 'Keep', te: 'ఉంచు' },
      { en: 'Mash', te: 'నలిపి' },
      { en: 'Mince', te: 'చిన్నగా తరుగు' },
      { en: 'Mix', te: 'కలుపు' },
      { en: 'Mop', te: 'తుడువు' },
      { en: 'Peel', te: 'తొక్క తీయు' },
      { en: 'Pour', te: 'పోయు' },
      { en: 'Prepare', te: 'సిద్ధం చేయు' },
      { en: 'Roast', te: 'వేపు' },
      { en: 'Serve', te: 'వడ్డించు' },
      { en: 'Shred', te: 'ముక్కలుగా చేయు' },
      { en: 'Sprinkle', te: 'వెద జల్లు' },
      { en: 'Stir', te: 'కలుపు' },
      { en: 'Sweep', te: 'ఊడ్చు' },
      { en: 'Taste', te: 'రుచి' },
      { en: 'Try', te: 'ప్రయత్నించు' }
    ]
  },
  {
    title: 'Bedroom',
    icon: <Bed className="w-6 h-6" />,
    color: 'purple',
    verbs: [
      { en: 'Sleep', te: 'నిద్రించు' },
      { en: 'Wake up', te: 'మేల్కొను' },
      { en: 'Wish', te: 'కోరుకొను' },
      { en: 'Wear', te: 'ధరించు' },
      { en: 'Get up', te: 'లేచు' },
      { en: 'Pray', te: 'ప్రార్థించు' },
      { en: 'Stretch', te: 'సాగదీయు' },
      { en: 'Make', te: 'చేయు' },
      { en: 'Fold', te: 'మడత పెట్టు' },
      { en: 'Unfold', te: 'మడత విప్పు' },
      { en: 'Set', te: 'అమర్చు' },
      { en: 'Sweep', te: 'ఊడ్చు' },
      { en: 'Mop', te: 'తుడువు' },
      { en: 'Clean', te: 'శుభ్రం చేయు' },
      { en: 'Do', te: 'చేయు' },
      { en: 'Dream', te: 'కలలు కను' },
      { en: 'Remove', te: 'తీసివేయవు' },
      { en: 'Spray', te: 'చల్లు' },
      { en: 'Switch off', te: 'ఆఫ్ చేయు' },
      { en: 'Switch on', te: 'ఆన్ చేయు' }
    ]
  },
  {
    title: 'Study Room',
    icon: <Book className="w-6 h-6" />,
    color: 'rose',
    verbs: [
      { en: 'Browse', te: 'శోధించు' },
      { en: 'Chat', te: 'మాట్లాడు' },
      { en: 'Check', te: 'సరిచూచు' },
      { en: 'Complete', te: 'పూర్తి చేయు' },
      { en: 'Copy', te: 'నకలు చేయు' },
      { en: 'Go through', te: 'పరిశీలించు' },
      { en: 'Make', te: 'తయారుచేయు' },
      { en: 'Open', te: 'తెరువు' },
      { en: 'Practice', te: 'సాధన చేయు' },
      { en: 'Prepare', te: 'తయారు చేయు' },
      { en: 'Refer', te: 'సూచించు' },
      { en: 'Revise', te: 'సవరించు' },
      { en: 'Send', te: 'పంపించు' },
      { en: 'See', te: 'చూచు' },
      { en: 'Nap', te: 'కునుకు తీయు' },
      { en: 'Draw', te: 'చిత్రించు' },
      { en: 'Note', te: 'రాసుకొను' },
      { en: 'Doze', te: 'కునుకు పాట్లు పడు' }
    ]
  },
  {
    title: 'Wash Room',
    icon: <Bath className="w-6 h-6" />,
    color: 'sky',
    verbs: [
      { en: 'Apply', te: 'రాసుకొను' },
      { en: 'Bath', te: 'స్నానం చేయు' },
      { en: 'Brush', te: 'బ్రష్ చేయు' },
      { en: 'Change', te: 'మార్చు' },
      { en: 'Clean', te: 'శుభ్రం చేయు' },
      { en: 'Comb', te: 'దువ్వు' },
      { en: 'Decorate', te: 'అలంకరించు' },
      { en: 'Wash', te: 'కడుగు' },
      { en: 'Wear', te: 'ధరించు' }
    ]
  },
  {
    title: 'Garden',
    icon: <Flower2 className="w-6 h-6" />,
    color: 'green',
    verbs: [
      { en: 'Walk', te: 'నడువు' },
      { en: 'Look', te: 'చూచు' },
      { en: 'Do', te: 'చేయు' },
      { en: 'Pour', te: 'పోయు' },
      { en: 'Cut off', te: 'కత్తిరించి వేయు' },
      { en: 'Pluck', te: 'తెంపు' },
      { en: 'Use', te: 'ఉపయోగించు' },
      { en: 'Spend', te: 'గడుపు' }
    ]
  }
];

export function HouseholdActions() {
  const [activeLocation, setActiveLocation] = useState<number | null>(0);
  const [showTelugu, setShowTelugu] = useState(false);
  const [search, setSearch] = useState('');

  const filteredVerbs = activeLocation !== null 
    ? HOUSEHOLD_DATA[activeLocation].verbs.filter(v => 
        v.en.toLowerCase().includes(search.toLowerCase()) || 
        v.te.includes(search)
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

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => setShowTelugu(!showTelugu)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm"
          >
            <Languages className="w-4 h-4" />
            {showTelugu ? 'Hide Meanings' : 'Show Meanings'}
          </button>
        </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredVerbs.map((verb, idx) => (
                <motion.div
                  key={verb.en}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-all group"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{verb.en}</span>
                    <AnimatePresence>
                      {showTelugu && (
                        <motion.span 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-indigo-600 dark:text-indigo-400 font-bold"
                        >
                          {verb.te}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
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
