import { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

const languages: { code: Language; label: string, native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'ar', label: 'Arabic', native: 'العربية' },
];

export function LanguageSwitcher() {
  const { language, setLanguage, setTargetLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    setTargetLanguage(code); // Keep experience unified
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 relative"
        aria-label="Select Language"
        title="Select Language"
      >
        <Globe className="w-5 h-5" />
        <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider">
          {language}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-none border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Preferred Language
            </h3>
          </div>
          
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {languages.map((lang) => {
              const isActive = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-colors flex items-center justify-between group ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold shadow-none'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`}
                >
                  <div className="flex flex-col">
                    <span className={`text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>
                      {lang.native}
                    </span>
                    <span className={`text-[10px] ${isActive ? 'text-indigo-400 dark:text-indigo-300' : 'text-slate-400'}`}>
                      {lang.label}
                    </span>
                  </div>
                  {isActive && (
                    <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
