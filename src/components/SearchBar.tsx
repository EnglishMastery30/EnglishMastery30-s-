import { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, LayoutDashboard, MessageCircle, MapPin, BarChart2, User, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { curriculum, DaySession } from '../data/curriculum';

interface SearchResult {
  type: 'feature' | 'lesson';
  id: string;
  title: string;
  description?: string;
  icon?: any;
  day?: DaySession;
}

interface SearchBarProps {
  onNavigate: (view: string) => void;
  onSelectDay: (day: DaySession) => void;
}

export function SearchBar({ onNavigate, onSelectDay }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const features: SearchResult[] = [
    { type: 'feature', id: 'dashboard', title: 'Dashboard', description: 'View your progress and daily tasks', icon: LayoutDashboard },
    { type: 'feature', id: 'journey', title: 'Curriculum', description: 'Browse all 30 days of lessons', icon: BookOpen },
    { type: 'feature', id: 'calls', title: 'Calls', description: 'Practice with AI voice calls', icon: MessageCircle },
    { type: 'feature', id: 'nearby', title: 'Nearby Classes', description: 'Find English classes near you', icon: MapPin },
    { type: 'feature', id: 'reports', title: 'Reports', description: 'View your performance analytics', icon: BarChart2 },
    { type: 'feature', id: 'profile', title: 'Profile', description: 'Manage your account and settings', icon: User },
  ];

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    
    // Search features
    const matchedFeatures = features.filter(f => 
      f.title.toLowerCase().includes(lowerQuery) || 
      (f.description && f.description.toLowerCase().includes(lowerQuery))
    );

    // Search lessons
    const matchedLessons = curriculum.filter(d => 
      d.topic.toLowerCase().includes(lowerQuery) || 
      d.description.toLowerCase().includes(lowerQuery) ||
      `day ${d.day}`.includes(lowerQuery)
    ).map(d => ({
      type: 'lesson' as const,
      id: `day-${d.day}`,
      title: `Day ${d.day}: ${d.topic}`,
      description: d.description,
      day: d
    }));

    setResults([...matchedFeatures, ...matchedLessons].slice(0, 8)); // Limit to 8 results
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (result: SearchResult) => {
    setIsOpen(false);
    setQuery('');
    
    if (result.type === 'feature') {
      onNavigate(result.id);
    } else if (result.type === 'lesson' && result.day) {
      onSelectDay(result.day);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg z-50">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
          placeholder="Search lessons, features..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
        />
      </div>

      <AnimatePresence>
        {isOpen && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute mt-2 w-full bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            {results.length > 0 ? (
              <ul className="max-h-96 overflow-y-auto py-2">
                {results.map((result) => (
                  <li key={result.id}>
                    <button
                      onClick={() => handleSelect(result)}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-start gap-3 transition-colors group"
                    >
                      <div className="mt-0.5 shrink-0 p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors">
                        {result.type === 'feature' && result.icon ? (
                          <result.icon className="w-4 h-4" />
                        ) : (
                          <BookOpen className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                            {result.title}
                          </p>
                          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 shrink-0">
                            {result.type}
                          </span>
                        </div>
                        {result.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {result.description}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 shrink-0 self-center opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-8 text-center">
                <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-900 dark:text-white">No results found</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Try searching for "Day 1", "Dashboard", or "Grammar"
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
