import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ArrowRight, Languages, Loader2, ChevronDown, ChevronUp, Play, Volume2, Type, Mic, MicOff, Eye, EyeOff } from 'lucide-react';
import { presentTenseDayOne, pastTenseDayTwo, futureTenseDayThree, presentContinuousDayFour, pastContinuousDayFive, futureContinuousDaySix, whQuestionsDayFour, abilityDayEight, possibilityDayNine, obligationDayTen, usedToDayTwentyThree } from '../data/practiceSentences';
import { day36Content, day37Content, day38Content, day39Content, day40Content, day41Content, day42Content, day43Content } from '../data/part5Sentences';
import { day44Content, day45Content, day46Content, day47Content, day48Content, day49Content, day50Content, day51Content, day52Content } from '../data/part6Sentences';
import { GoogleGenAI } from '@google/genai';
import { WhQuestionsDiagram } from './diagrams/Day4Diagrams';
import { UniversalDiagram } from './diagrams/UniversalDiagram';
import { UniversalQuestionDiagram } from './diagrams/UniversalQuestionDiagram';
import { generateDiagramProps } from '../utils/diagramHelper';
import { dayConfigs } from '../data/dayConfigs';
import { generateSentences } from '../utils/sentenceGenerator';
import { InteractiveVocabulary } from './InteractiveVocabulary';
import { InteractivePronouns } from './InteractivePronouns';
import { InteractiveVerbs } from './InteractiveVerbs';
import { ObjectivePersonality } from './ObjectivePersonality';
import { AdverbVocabulary } from './AdverbVocabulary';
import { PrepositionModules } from './PrepositionModules';
import { ConjunctionModules } from './ConjunctionModules';
import { InterjectionModules } from './InterjectionModules';
import { SmartHighlight } from './SmartHighlight';
import { InteractiveAdjectives } from './InteractiveAdjectives';
import { HouseholdActions } from './HouseholdActions';
import { RoutineKeywords } from './RoutineKeywords';

const emptyContent = `
🔸 Subject: Coming Soon
🔹 Currently Unavailable
These practice sentences are being generated and will be available soon.
`;

const DAYS: Array<{ id: string, title?: string, content?: string, available?: boolean, type?: 'header', titleText?: string, subtitleText?: string }> = [
  { id: 'pos_mastery', type: 'header', titleText: 'Parts of Speech Mastery', subtitleText: 'Core Fundamentals' },
  { id: 'day44', title: 'Nouns: Definition', content: day44Content, available: true },
  { id: 'day45', title: 'Pronouns: Definition', content: day45Content, available: true },
  { id: 'day46', title: 'Verbs: Action and State', content: day46Content, available: true },
  { id: 'day47', title: 'Adjectives: Describing Nouns', content: day47Content, available: true },
  { id: 'day48', title: 'Adverbs: Modifying Actions', content: day48Content, available: true },
  { id: 'day49', title: 'Prepositions: Core Relationships', content: day49Content, available: true },
  { id: 'day50', title: 'Conjunctions: Connecting Ideas', content: day50Content, available: true },
  { id: 'day51', title: 'Interjections: Expressing Emotion', content: day51Content, available: true },
  { id: 'day52', title: 'Action Words & Routines', content: day52Content, available: true },

  { id: 'part1', type: 'header', titleText: 'Part 1', subtitleText: 'Core Verbs & Tenses' },
  { id: 'day1', title: 'Day 1: Present Tense (DO - DOES)', content: presentTenseDayOne, available: true },
  { id: 'day2', title: 'Day 2: Past Tense (DID)', content: pastTenseDayTwo, available: true },
  { id: 'day3', title: 'Day 3: Future Tense (WILL - SHALL)', content: futureTenseDayThree, available: true },
  { id: 'day4', title: 'Day 4: Present Continuous (AM - IS - ARE)', content: presentContinuousDayFour, available: true },
  { id: 'day5', title: 'Day 5: Past Continuous (WAS - WERE)', content: pastContinuousDayFive, available: true },
  { id: 'day6', title: 'Day 6: Future Continuous (SHALL BE - WILL BE)', content: futureContinuousDaySix, available: true },
  { id: 'day7', title: 'Day 7: Question Words (WH- QUESTIONS)', content: whQuestionsDayFour, available: true },

  { id: 'part2', type: 'header', titleText: 'Part 2', subtitleText: 'Special Verbs' },
  { id: 'day8', title: 'Day 8: Ability (CAN - COULD)', content: abilityDayEight, available: true },
  { id: 'day9', title: 'Day 9: Permission & Possibility (MAY - MIGHT)', content: possibilityDayNine, available: true },
  { id: 'day10', title: 'Day 10: Advice & Obligation (SHOULD - MUST)', content: obligationDayTen, available: true },
  { id: 'day11', title: 'Day 11: Conditionals & Habits (WOULD)', content: emptyContent, available: true },

  { id: 'part3', type: 'header', titleText: 'Part 3', subtitleText: 'Advanced Intentions' },
  { id: 'day12', title: 'Day 12: External Obligation (HAVE TO - HAS TO)', content: emptyContent, available: true },
  { id: 'day13', title: 'Day 13: Necessity (NEED TO - NEEDS TO)', content: emptyContent, available: true },
  { id: 'day14', title: 'Day 14: Desire (WANT TO - WANTS TO)', content: emptyContent, available: true },
  { id: 'day15', title: 'Day 15: Challenge (DARE TO - DARES TO)', content: emptyContent, available: true },
  { id: 'day16', title: 'Day 16: Strong Desire (WISH TO - WISHES TO)', content: emptyContent, available: true },
  { id: 'day17', title: 'Day 17: Polite Request (WOULD LIKE TO)', content: emptyContent, available: true },
  { id: 'day18', title: 'Day 18: Moral Duty (OUGHT TO)', content: emptyContent, available: true },
  { id: 'day19', title: 'Day 19: Planned Future (GOING TO)', content: emptyContent, available: true },
  { id: 'day20', title: 'Day 20: Capability (ABLE TO)', content: emptyContent, available: true },
  { id: 'day21', title: 'Day 21: Past Obligation (HAD TO)', content: emptyContent, available: true },
  { id: 'day22', title: 'Day 22: Willingness (WILLING TO)', content: emptyContent, available: true },
  { id: 'day23', title: 'Day 23: Past Habit (USED TO)', content: usedToDayTwentyThree, available: true },

  { id: 'part4', type: 'header', titleText: 'Part 4', subtitleText: 'Perfect Tenses & More' },
  { id: 'day24', title: 'Day 24: Present Perfect (HAVE - HAS)', content: emptyContent, available: true },
  { id: 'day25', title: 'Day 25: Past Perfect (HAD)', content: emptyContent, available: true },
  { id: 'day26', title: 'Day 26: Future Perfect (SHALL HAVE - WILL HAVE)', content: emptyContent, available: true },
  { id: 'day27', title: 'Day 27: Past Advice & Certainty (SHOULD HAVE - MUST HAVE)', content: emptyContent, available: true },
  { id: 'day28', title: 'Day 28: Past Possibility (MAY HAVE - MIGHT HAVE)', content: emptyContent, available: true },
  { id: 'day29', title: 'Day 29: Past Conditionals & Ability (WOULD HAVE - COULD HAVE)', content: emptyContent, available: true },
  { id: 'day30', title: 'Day 30: Present Perfect Continuous (HAVE BEEN - HAS BEEN)', content: emptyContent, available: true },
  { id: 'day31', title: 'Day 31: Past Perfect Continuous (HAD BEEN)', content: emptyContent, available: true },
  { id: 'day32', title: 'Day 32: Future Perfect Continuous (SHALL HAVE BEEN - WILL HAVE BEEN)', content: emptyContent, available: true },
  { id: 'day33', title: 'Day 33: Past Continuous Advice & Certainty (SHOULD HAVE BEEN - MUST HAVE BEEN)', content: emptyContent, available: true },
  { id: 'day34', title: 'Day 34: Past Continuous Possibility (MAY HAVE BEEN - MIGHT HAVE BEEN)', content: emptyContent, available: true },
  { id: 'day35', title: 'Day 35: Past Continuous Conditionals (WOULD HAVE BEEN - COULD HAVE BEEN)', content: emptyContent, available: true },

  { id: 'part5', type: 'header', titleText: 'Part 5', subtitleText: 'Advanced Usage & Communication' },
  { id: 'day36', title: 'Day 36: Conditional Thinking', content: day36Content, available: true },
  { id: 'day37', title: 'Day 37: Everyday Expressions', content: day37Content, available: true },
  { id: 'day38', title: 'Day 38: Spoken Communication', content: day38Content, available: true },
  { id: 'day39', title: 'Day 39: Be-Form Voice Practice', content: day39Content, available: true },
  { id: 'day40', title: 'Day 40: Been-Form Structures', content: day40Content, available: true },
  { id: 'day41', title: 'Day 41: To-Be Voice Patterns', content: day41Content, available: true },
  { id: 'day42', title: 'Day 42: Auxiliary Verb Mastery', content: day42Content, available: true },
  { id: 'day43', title: 'Day 43: Infinitive Expressions', content: day43Content, available: true }
];
import { generateContentWithFallback } from '../utils/aiFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { useCredits } from '../contexts/CreditsContext';

interface PracticeItem {
  id: string; // usually the sentence text
  text: string;
  answer?: string;
}

interface Section {
  title: string;
  items: PracticeItem[];
}

const parseSentences = (text: string): Record<string, Section[]> => {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l);
  const groups: Record<string, Section[]> = {
    'I': [],
    'We': [],
    'You': [],
    'They': [],
    'He': [],
    'She': [],
    'It': [],
    'What': [],
    'Why': [],
    'Where': [],
    'When': [],
    'Which': [],
    'Whose': [],
    'Whom': [],
    'How': [],
    'Who': [],
    'Coming Soon': [],
  };
  
  let currentSection: Section | null = null;
  let currentSubjects: string[] = [];
  let currentQ: string | null = null;

  for (const line of lines) {
    if (line.startsWith('🔸') || line.startsWith('🔹')) {
      if (currentSection && currentSection.items.length > 0 && currentSubjects.length > 0) {
        currentSubjects.forEach(sub => {
          if (!groups[sub]) groups[sub] = [];
          groups[sub].push(currentSection!);
        });
      }
      
      let isSubjectLine = false;
      if (line.startsWith('🔸 Subject: ')) {
        const sub = line.replace('🔸 Subject: ', '').trim();
        // Handle the "He / She / It" combined case if needed, otherwise just use the parsed string
        if (sub === 'He / She / It') {
           currentSubjects = ['He', 'She', 'It'];
        } else {
           currentSubjects = [sub];
        }
        isSubjectLine = true;
      } else if (line.includes('🔸 I ')) {
        currentSubjects = ['I'];
        isSubjectLine = true;
      }
      
      if (!isSubjectLine && line.startsWith('🔸')) {
         currentSubjects = [];
      }

      if (isSubjectLine) {
         currentSection = null; // Clear section since we just started a new subject
      }

      if (!isSubjectLine) {
        currentSection = { title: line.replace(/^[🔸🔹]\s*/, ''), items: [] };
      }
      currentQ = null;
    } else if (currentSection && currentSubjects.length > 0) {
      if (line !== '`;') {
        if (line.startsWith('Q: ')) {
          currentQ = line.replace('Q: ', '').trim();
          currentSection.items.push({ id: currentQ, text: currentQ });
        } else if (line.startsWith('A: ') && currentQ) {
          const lastItem = currentSection.items[currentSection.items.length - 1];
          if (lastItem) {
            lastItem.answer = line.replace('A: ', '').trim();
          }
          currentQ = null;
        } else {
          currentSection.items.push({ id: line, text: line });
        }
      }
    }
  }
  if (currentSection && currentSection.items.length > 0 && currentSubjects.length > 0) {
    currentSubjects.forEach(sub => {
      if (!groups[sub]) groups[sub] = [];
      groups[sub].push(currentSection!);
    });
  }
  return groups;
};

export function Practice({ isLocked = false, completedSessions = [] }: { isLocked?: boolean, completedSessions?: number[] }) {
  const [activeDayId, setActiveDayId] = useState<string | null>(null);
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const { language } = useLanguage();
  const { consumeCredits, apiKeys, useCustomKeys } = useCredits();
  
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [ipas, setIpas] = useState<Record<string, string>>({});
  const [translatingSentence, setTranslatingSentence] = useState<string | null>(null);
  const [fetchingIpa, setFetchingIpa] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const [expandedSentences, setExpandedSentences] = useState<Record<string, boolean>>({});
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [selectedTextTranslation, setSelectedTextTranslation] = useState<{text: string, translation: string, x: number, y: number} | null>(null);
  const [isTranslatingSelection, setIsTranslatingSelection] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  
  const [isListeningSentence, setIsListeningSentence] = useState<string | null>(null);
  const listeningRef = useRef<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    listeningRef.current = isListeningSentence;
  }, [isListeningSentence]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        const currentSentence = listeningRef.current;
        if (currentSentence) {
          setUserInputs(prev => ({
            ...prev,
            [currentSentence]: (prev[currentSentence] || '') + (prev[currentSentence] ? ' ' : '') + transcript
          }));
        }
        setIsListeningSentence(null);
      };

      recognitionRef.current.onerror = () => setIsListeningSentence(null);
      recognitionRef.current.onend = () => setIsListeningSentence(null);
    }
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const toggleListening = (sentence: string) => {
    if (isLocked) return;
    if (isListeningSentence === sentence) {
      recognitionRef.current?.stop();
      setIsListeningSentence(null);
    } else {
      if (isListeningSentence) {
        recognitionRef.current?.stop();
      }
      setIsListeningSentence(sentence);
      setTimeout(() => {
        try {
          recognitionRef.current?.start();
        } catch (e) {
          setIsListeningSentence(null);
        }
      }, 100);
    }
  };

  const parsedDays = useMemo(() => {
    const result: Record<string, Record<string, Section[]>> = {};
    DAYS.forEach(day => {
      if (day.available && day.content) {
        if (day.content === emptyContent && dayConfigs[day.id]) {
          result[day.id] = parseSentences(generateSentences(dayConfigs[day.id]));
        } else {
          result[day.id] = parseSentences(day.content);
        }
      }
    });
    return result;
  }, []);

  const handleTranslateSentence = async (sentence: string) => {
    if (translations[sentence]) return; // Already translated
    
    if (!consumeCredits(1, 'Translation AI')) {
      alert('Insufficient credits. Please buy more credits or use your own API key.');
      return;
    }

    setTranslatingSentence(sentence);
    try {
      const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key is missing.");
      const ai = new GoogleGenAI({ apiKey });

      const targetLang = language === 'en' ? 'te' : language;

      const response = await generateContentWithFallback(ai, {
        model: 'gemini-3-flash-preview',
        contents: `Translate the following English sentence into ${targetLang}. Provide ONLY the translation, nothing else.
        
        Sentence: ${sentence}`
      });

      if (response.text) {
        setTranslations(prev => ({ ...prev, [sentence]: response.text.trim() }));
      }
    } catch (error) {
      console.error(error);
      alert('Sorry, there was an error translating the sentence.');
    } finally {
      setTranslatingSentence(null);
    }
  };

  const handleFetchIpa = async (sentence: string) => {
    if (ipas[sentence]) return;
    
    if (!consumeCredits(1, 'IPA AI')) {
      alert('Insufficient credits.');
      return;
    }

    setFetchingIpa(sentence);
    try {
      const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key is missing.");
      const ai = new GoogleGenAI({ apiKey });

      const response = await generateContentWithFallback(ai, {
        model: 'gemini-3-flash-preview',
        contents: `Provide ONLY the IPA (International Phonetic Alphabet) pronunciation for this English sentence. Do not include any other text.
        
        Sentence: ${sentence}`
      });

      if (response.text) {
        setIpas(prev => ({ ...prev, [sentence]: response.text.trim() }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFetchingIpa(null);
    }
  };

  const handlePlayAudio = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  const handleTextSelection = async (e: React.MouseEvent) => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setSelectedTextTranslation(null);
      return;
    }

    const text = selection.toString().trim();
    if (text.length === 0 || text.split(' ').length > 5) return; // Only translate short phrases/words on selection

    if (!consumeCredits(1, 'Quick Translate AI')) return;

    setIsTranslatingSelection(true);
    
    // Get coordinates for popover
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    setSelectedTextTranslation({ text, translation: 'Translating...', x: rect.left + window.scrollX + (rect.width / 2), y: rect.top + window.scrollY - 10 });

    try {
      const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key is missing.");
      const ai = new GoogleGenAI({ apiKey });
      const targetLang = language === 'en' ? 'te' : language;

      const response = await generateContentWithFallback(ai, {
        model: 'gemini-3-flash-preview',
        contents: `Translate this short English text into ${targetLang}. Provide ONLY the translation. Text: "${text}"`
      });

      if (response.text) {
        setSelectedTextTranslation(prev => prev ? { ...prev, translation: response.text!.trim() } : null);
      }
    } catch (error) {
      setSelectedTextTranslation(null);
    } finally {
      setIsTranslatingSelection(false);
    }
  };

  if (!activeDayId) {
    return (
      <div className="space-y-8 max-w-5xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Practice Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Select a day to begin your practice.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DAYS.map(day => {
            if (day.type === 'header') {
              return (
                <div key={day.id} className="col-span-1 md:col-span-2 mt-8 mb-2">
                   <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-3">
                     <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm uppercase tracking-widest">{day.titleText}</span>
                     {day.subtitleText}
                   </h2>
                   <div className="h-px bg-slate-200 dark:bg-slate-800 mt-4 w-full"></div>
                </div>
              );
            }
            const dayMatch = day.id.match(/\d+/);
            const dayNumber = dayMatch ? parseInt(dayMatch[0], 10) : 0;
            const isCompleted = completedSessions.includes(dayNumber);

            return (
            <motion.button
              key={day.id}
              whileHover={day.available ? { scale: 1.02 } : {}}
              whileTap={day.available ? { scale: 0.98 } : {}}
              onClick={() => {
                if (day.available) {
                  setActiveDayId(day.id);
                }
              }}
              className={`p-6 rounded-2xl border text-left transition-all group ${
                day.available 
                  ? isCompleted 
                    ? 'bg-emerald-50/30 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-500/30 shadow-sm hover:shadow-md hover:border-emerald-400 dark:hover:border-emerald-500/60 cursor-pointer'
                    : 'bg-red-50/30 dark:bg-red-900/10 border-red-200 dark:border-red-500/30 shadow-sm hover:shadow-md hover:border-red-400 dark:hover:border-red-500/60 cursor-pointer'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-70 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform ${
                  day.available 
                    ? isCompleted
                      ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 group-hover:scale-110'
                      : 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 group-hover:scale-110'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
                }`}>
                  <BookOpen className="w-6 h-6" />
                </div>
                {!day.available && (
                  <span className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider rounded-full">
                    Coming Soon
                  </span>
                )}
                {day.available && isCompleted && (
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full">
                    Completed
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {(() => {
                  const titleMatch = day.title?.match(/^(.*?)(\s*\(.*\))?$/);
                  if (!titleMatch) return day.title;
                  const mainText = titleMatch[1];
                  const parenText = titleMatch[2];
                  
                  return (
                    <>
                      <span className={day.available ? (isCompleted ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400") : "text-slate-900 dark:text-white"}>{mainText}</span>
                      {parenText && <span className="text-slate-500 dark:text-slate-400">{parenText}</span>}
                    </>
                  );
                })()}
              </h2>
              {day.available ? (
                <div className={`flex items-center font-medium mt-4 ${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                  View Subjects <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              ) : (
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-4">Content is being prepared.</p>
              )}
            </motion.button>
          )})}
        </div>
      </div>
    );
  }

  const currentDay = DAYS.find(d => d.id === activeDayId);

  if (activeDayId && !activeSubject) {
    return (
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveDayId(null)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <ArrowRight className="w-5 h-5 rotate-180 text-slate-600 dark:text-slate-400" />
          </button>
          <div>
            <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">Practice Dashboard</div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{currentDay?.title}</h1>
            <p className="text-slate-600 dark:text-slate-400">Select a subject pronoun to practice.</p>
          </div>
        </div>

        {activeDayId === 'day7' && (
          <>
            <WhQuestionsDiagram />
          </>
        )}

        {/* Dynamic Universal Diagrams for all days except Day 7 */}
        {activeDayId !== 'day7' && (() => {
           const props = generateDiagramProps(activeDayId);
           if (!props) return null;
           return (
             <>
               <UniversalDiagram {...props.diagProps} />
               <UniversalQuestionDiagram {...props.qDiagProps} />
             </>
           );
        })()}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.keys(parsedDays[activeDayId] || {})
            .filter(subject => parsedDays[activeDayId][subject].length > 0)
            .map((subject) => (
            <motion.button
              key={subject}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveSubject(subject);
                setExpandedSection(0);
              }}
              className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all text-center group flex flex-col items-center gap-4"
            >
              <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">"{subject}"</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{parsedDays[activeDayId][subject].length} subsections</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  const sections = parsedDays[activeDayId]?.[activeSubject!] || [];

  return (
    <div className="space-y-8 max-w-4xl mx-auto relative" onMouseUp={handleTextSelection}>
      {selectedTextTranslation && (
        <div 
          className="absolute z-50 bg-slate-900 text-white text-sm px-3 py-2 rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 translate-y-3 whitespace-nowrap"
          style={{ left: selectedTextTranslation.x, top: selectedTextTranslation.y }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900"></div>
          <div className="text-indigo-300 font-bold mb-1">{selectedTextTranslation.translation}</div>
          <div className="font-medium text-slate-300 text-xs">{selectedTextTranslation.text}</div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setActiveSubject(null)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
        >
          <ArrowRight className="w-5 h-5 rotate-180 text-slate-600 dark:text-slate-400" />
        </button>
        <div>
          <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">{currentDay?.title}</div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">"{activeSubject}" Practice</h1>
          <p className="text-slate-600 dark:text-slate-400">Click any sentence to translate it.</p>
        </div>
      </div>

      <div className="space-y-12">
        {sections.map((section, sIndex) => (
          <div key={sIndex} className="space-y-6">
            <div className="border-l-4 border-indigo-500 pl-4 py-1">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                <SmartHighlight text={section.title} topic={activeSubject || currentDay?.title} />
              </h3>
            </div>
            
            <div className="space-y-4">
              {section.items.map((item, index) => {
                const sentence = item.text;
                
                if (sentence === '[INTERACTIVE_WORDS]') {
                  return <InteractiveVocabulary key={index} />;
                }

                if (sentence === '[INTERACTIVE_PRONOUNS]') {
                  return <InteractivePronouns key={index} />;
                }

                if (sentence === '[INTERACTIVE_VERBS]') {
                  return <InteractiveVerbs key={index} />;
                }

                if (sentence === '[OBJECTIVE_PERSONALITY]') {
                  return <ObjectivePersonality key={index} />;
                }

                if (sentence === '[PERSONALITY_MAN]') {
                  return <ObjectivePersonality key={index} section="man" />;
                }

                if (sentence === '[PERSONALITY_WOMAN]') {
                  return <ObjectivePersonality key={index} section="woman" />;
                }

                if (sentence === '[PERSONALITY_CHILD]') {
                  return <ObjectivePersonality key={index} section="child" />;
                }

                if (sentence === '[CHARACTER_TRAIT]') {
                  return <ObjectivePersonality key={index} section="trait" />;
                }

                if (sentence === '[INTERACTIVE_ADJECTIVES]') {
                  return <InteractiveAdjectives key={index} />;
                }

                if (sentence === '[ADVERB_VOCAB_1]') {
                  return <AdverbVocabulary key={index} type="vocab_1" />;
                }

                if (sentence === '[ADVERB_VOCAB_2]') {
                  return <AdverbVocabulary key={index} type="vocab_2" />;
                }

                if (sentence === '[PREPOSITIONS_SIMPLE]') {
                  return <PrepositionModules key={index} type="simple" />;
                }

                if (sentence === '[PREPOSITIONS_COMPOUND]') {
                  return <PrepositionModules key={index} type="compound" />;
                }

                if (sentence === '[PREPOSITIONS_TWO_WORD]') {
                  return <PrepositionModules key={index} type="two_word" />;
                }

                if (sentence === '[PREPOSITIONS_PHRASE]') {
                  return <PrepositionModules key={index} type="phrase" />;
                }

                if (sentence === '[CONJUNCTIONS_BASIC]') {
                  return <ConjunctionModules key={index} type="coordinating" />;
                }

                if (sentence === '[CONJUNCTIONS_WORDS_TO_KNOW]') {
                  return <ConjunctionModules key={index} type="words_to_know" />;
                }

                if (sentence === '[INTERJECTIONS_MODULE_ALL]') {
                  return <InterjectionModules key={index} type="all" />;
                }

                if (sentence === '[INTERJECTIONS_JOY]') {
                  return <InterjectionModules key={index} type="joy" />;
                }

                if (sentence === '[HOUSEHOLD_ACTIONS]') {
                  return <HouseholdActions key={index} />;
                }

                if (sentence === '[ROUTINE_KEYWORDS]') {
                  return <RoutineKeywords key={index} />;
                }

                return (
                  <div 
                    key={index}
                    className={`p-1 rounded-3xl border transition-all ${
                      expandedSentences[sentence]
                        ? 'bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-500/10 dark:to-slate-900 border-indigo-200 dark:border-indigo-500/30 shadow-md' 
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div 
                      className={`flex items-start justify-between gap-4 cursor-pointer p-4 sm:p-5 rounded-[22px] transition-colors ${expandedSentences[sentence] ? '' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                      onClick={() => {
                        setExpandedSentences(prev => {
                          const isExpanding = !prev[sentence];
                          if (isExpanding && !translations[sentence] && !isLocked) {
                            handleTranslateSentence(sentence);
                          }
                          return { ...prev, [sentence]: isExpanding };
                        });
                      }}
                    >
                      <p className={`text-lg sm:text-xl font-medium transition-colors ${expandedSentences[sentence] ? 'text-indigo-900 dark:text-indigo-100' : 'text-slate-800 dark:text-slate-200'}`}>
                        <SmartHighlight text={sentence} topic={activeSubject || currentDay?.title} />
                      </p>
                      
                      <div className="flex items-center shrink-0 mt-0.5">
                        <div
                          className={`p-2 rounded-xl transition-colors ${
                            expandedSentences[sentence] 
                              ? 'text-indigo-600 bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-400' 
                              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-300'
                          }`}
                        >
                          {expandedSentences[sentence] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedSentences[sentence] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden px-4 sm:px-5 pb-4 sm:pb-5"
                        >
                          <div className="pt-2">
                            
                            {/* Action Buttons Toolbar */}
                            <div className="flex gap-2 sm:gap-4 mb-5">
                              <button
                                onClick={(e) => { e.stopPropagation(); handlePlayAudio(sentence, e); }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 py-3 px-6 bg-white hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-500/10 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition-all font-medium border border-slate-200 dark:border-slate-700 shadow-sm w-full"
                                title="Listen"
                              >
                                <Volume2 className="w-5 h-5" />
                                <span className="text-xs sm:text-sm">Listen</span>
                              </button>
                            </div>

                            {/* Content Displays */}
                            <div className="space-y-3 mb-5">
                              {/* IPA Display */}
                              {ipas[sentence] && (
                                <motion.div 
                                  initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                                  className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700"
                                >
                                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1.5">Pronunciation</div>
                                  <p className="text-slate-700 dark:text-slate-300 font-mono text-base">{ipas[sentence]}</p>
                                </motion.div>
                              )}
                              
                              {/* Translation Display */}
                              {translations[sentence] && (
                                <motion.div 
                                  initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                                  className="p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl border border-indigo-100 dark:border-indigo-500/20"
                                >
                                  <div className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold mb-1.5">Translation</div>
                                  <p className="text-indigo-800 dark:text-indigo-200 font-medium text-lg">{translations[sentence]}</p>
                                </motion.div>
                              )}

                              {/* Loading States */}
                              {(translatingSentence === sentence || fetchingIpa === sentence) && (
                                <div className="flex items-center justify-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 py-4 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-xl border border-indigo-100/50 dark:border-indigo-500/10">
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span>{translatingSentence === sentence ? 'Translating securely...' : 'Generating IPA pronunciation...'}</span>
                                </div>
                              )}
                            </div>

                            {/* Answer Feature */}
                            {item.answer && (
                              <div className="mb-5">
                                <button
                                  onClick={(e) => { e.stopPropagation(); setRevealedAnswers(prev => ({ ...prev, [sentence]: !prev[sentence] })) }}
                                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/20 rounded-lg text-sm font-semibold transition-colors"
                                >
                                  {revealedAnswers[sentence] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                  {revealedAnswers[sentence] ? 'Hide Answer' : 'Show Answer'}
                                </button>
                                
                                <AnimatePresence>
                                  {revealedAnswers[sentence] && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden mt-3"
                                    >
                                      <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-xl">
                                        <div className="flex items-start justify-between gap-4">
                                          <p className="text-emerald-800 dark:text-emerald-200 font-medium whitespace-pre-wrap">{item.answer}</p>
                                          <button
                                            onClick={(e) => { e.stopPropagation(); handlePlayAudio(item.answer!, e); }}
                                            className="p-2 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 shadow-sm border border-emerald-100 dark:border-emerald-500/20 rounded-lg transition-colors shrink-0"
                                            title="Listen to Answer"
                                          >
                                            <Volume2 className="w-5 h-5" />
                                          </button>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}

                            {/* User Input Field */}
                            <div className="relative group mt-2 pt-5 border-t border-slate-100 dark:border-slate-800/60">
                              <input
                                type="text"
                                placeholder="Type this sentence to practice..."
                                value={userInputs[sentence] || ''}
                                onChange={(e) => setUserInputs(prev => ({ ...prev, [sentence]: e.target.value }))}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl pl-5 pr-14 py-4 text-slate-900 dark:text-white transition-all outline-none font-medium text-lg placeholder:text-slate-400 placeholder:font-normal shadow-inner"
                              />
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleListening(sentence); }}
                                className={`absolute right-3 top-[calc(50%+10px)] -translate-y-1/2 p-2.5 rounded-lg transition-colors shadow-sm ${
                                  isListeningSentence === sentence 
                                    ? 'text-white bg-red-500 animate-pulse hover:bg-red-600' 
                                    : 'text-slate-500 bg-slate-100 hover:text-indigo-600 hover:bg-indigo-50 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-indigo-500/20 dark:hover:text-indigo-300'
                                }`}
                                title={isListeningSentence === sentence ? "Stop listening" : "Use microphone"}
                              >
                                {isListeningSentence === sentence ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                              </button>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Youtube Link for the current day */}
      {activeDayId && currentDay && activeSubject && (
        <div className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 bg-red-50 dark:bg-red-500/10 border-b border-red-100 dark:border-red-500/20 text-center flex flex-col items-center gap-4">
            <h3 className="text-xl font-bold flex items-center justify-center gap-2 text-red-700 dark:text-red-400">
              <Play className="w-6 h-6 fill-current" />
              Watch Video Lessons for "{activeSubject}" ({currentDay.title})
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-lg mx-auto">
              Want to see more examples and hear explanations? Search YouTube for lessons directly related to this grammar topic!
            </p>
            <a 
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent('English Grammar ' + (currentDay.title || '') + ' ' + activeSubject)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors shadow-sm"
            >
              <Play className="w-5 h-5 fill-current" />
              Search YouTube Lessons
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
