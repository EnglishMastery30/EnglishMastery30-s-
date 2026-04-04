import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Activity, Target, Brain, ArrowRight, CheckCircle, Sparkles, Zap, BookOpen, MessageCircle, Briefcase, Mic, Volume2, Languages, Quote, ArrowRightLeft, Code } from 'lucide-react';
import { curriculum, DaySession } from '../data/curriculum';
import { PremiumUpgrade } from './PremiumUpgrade';
import { InviteBanner } from './InviteBanner';
import { QuickTranslate } from './QuickTranslate';

export function MainDashboard({ onSelectDay, onSelectSection, streak = 0, isPro = false }: { onSelectDay: (day: DaySession) => void, onSelectSection: (section: string) => void, streak?: number, isPro?: boolean }) {
  const todaysLesson = curriculum[4]; // Day 5: Ordering Food
  const nextLesson = curriculum[5];
  const [activeSlide, setActiveSlide] = useState(0);

  const playAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const sections = [
    { id: 'beginner', title: 'Beginner English', icon: Target, color: 'emerald', description: 'Start your journey with the basics' },
    { id: 'daily', title: 'Daily Conversation', icon: MessageCircle, color: 'blue', description: 'Practice everyday scenarios' },
    { id: 'grammar', title: 'Grammar Speaking', icon: BookOpen, color: 'purple', description: 'Master sentence structures' },
    { id: 'pronunciation', title: 'Pronunciation Trainer', icon: Zap, color: 'rose', description: 'Perfect your accent and clarity' },
    { id: 'vocabulary', title: 'Vocabulary Builder', icon: Sparkles, color: 'amber', description: 'Expand your word bank' },
    { id: 'professional', title: 'Professional English', icon: Briefcase, color: 'indigo', description: 'Business and workplace communication' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Daily Motivation / Word of the Day */}
      <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 h-48 sm:h-64 group">
        <img 
          src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=1200&h=400" 
          alt="Motivation" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
          <div className="inline-flex items-center gap-1.5 text-white/80 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" /> Word of the Day
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">Perseverance</h3>
          <p className="text-white/90 text-sm sm:text-base italic leading-relaxed max-w-2xl">
            "Success is not final, failure is not fatal: it is the courage to continue that counts."
          </p>
        </div>
      </div>

      {/* Hero: Today's Lesson */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-900 dark:to-purple-900 rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="space-y-4 flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-semibold backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Today's Lesson
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {todaysLesson.topic}
            </h2>
            <p className="text-indigo-100 text-lg max-w-xl">
              {todaysLesson.description}
            </p>
          </div>
          <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto">
            <button 
              onClick={() => onSelectDay(todaysLesson)}
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Play className="w-5 h-5" /> Start Lesson
            </button>
            <button 
              onClick={() => onSelectDay(todaysLesson)}
              className="bg-indigo-800/50 hover:bg-indigo-800/80 dark:bg-white/10 dark:hover:bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-colors flex items-center justify-center gap-2 backdrop-blur-sm border border-white/10"
            >
              <Zap className="w-5 h-5 text-amber-400" /> Quick Practice (5m)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Confidence */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mb-3">
                <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{streak}</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Days Streak</span>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center mb-3">
                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">12</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Sessions</span>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-purple-50 dark:bg-purple-500/10 rounded-full flex items-center justify-center mb-3">
                <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">145</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">New Words</span>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-amber-50 dark:bg-amber-500/10 rounded-full flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">85%</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Accuracy</span>
            </div>
          </div>

          {/* Confidence Meter (Mini) */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-500" /> Confidence Meter
              </h3>
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full">
                Level: Improving
              </span>
            </div>
            
            <div className="relative h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-8">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
                style={{ width: '45%' }}
              />
            </div>
            
            <div className="flex justify-between text-xs font-medium text-slate-400 dark:text-slate-500 px-2">
              <span className="text-indigo-600 dark:text-indigo-400">Beginner</span>
              <span className="text-indigo-600 dark:text-indigo-400">Improving</span>
              <span>Confident</span>
              <span>Advanced</span>
              <span>Fluent</span>
            </div>
          </div>

          {/* Learning Sections */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Learning Sections</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <div
                    key={section.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectSection(section.title)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectSection(section.title); }}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-${section.color}-300 dark:hover:border-${section.color}-500/50 transition-colors text-left group flex flex-col relative cursor-pointer`}
                  >
                    <div className="flex justify-between items-start w-full mb-3">
                      <div className={`w-10 h-10 bg-${section.color}-50 dark:bg-${section.color}-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-5 h-5 text-${section.color}-600 dark:text-${section.color}-400`} />
                      </div>
                      <button 
                        onClick={(e) => playAudio(e, `${section.title}. ${section.description}`)}
                        className={`p-1.5 rounded-full hover:bg-${section.color}-100 dark:hover:bg-${section.color}-500/20 text-slate-400 hover:text-${section.color}-600 dark:hover:text-${section.color}-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100`}
                        title="Listen to section"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{section.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{section.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Widgets & AI Suggestions */}
        <div className="space-y-6">
          <div className="block md:hidden">
            <div 
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 -mx-4 px-4 gap-4"
              onScroll={(e) => {
                const target = e.target as HTMLDivElement;
                const slideWidth = target.offsetWidth;
                const newSlide = Math.round(target.scrollLeft / slideWidth);
                setActiveSlide(newSlide);
              }}
            >
              <div className="snap-center shrink-0 w-[calc(100vw-2rem)]">
                <QuickTranslate />
              </div>
              <div className="snap-center shrink-0 w-[calc(100vw-2rem)]">
                {/* AI Suggestions Mobile */}
                <div className="bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/20 p-6 rounded-2xl h-full">
                  <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-100 flex items-center gap-2 mb-4">
                    <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> AI Suggestions
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-indigo-100/50 dark:border-indigo-500/10">
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Pronunciation Focus</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Work on the "th" sound in words like "think" and "though".
                      </p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-indigo-100/50 dark:border-indigo-500/10">
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Vocabulary Expansion</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Try using "I would prefer" instead of "I want" for more polite requests.
                      </p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-indigo-100/50 dark:border-indigo-500/10">
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Grammar Tip</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Remember to use "any" in negative sentences instead of "some".
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-2">
              <div className={`w-2 h-2 rounded-full transition-colors ${activeSlide === 0 ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
              <div className={`w-2 h-2 rounded-full transition-colors ${activeSlide === 1 ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
            </div>
          </div>

          <div className="hidden md:block space-y-6">
            <QuickTranslate />
            {/* AI Suggestions Desktop */}
            <div className="bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/20 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-100 flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> AI Suggestions
              </h3>
              <div className="space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-indigo-100/50 dark:border-indigo-500/10">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Pronunciation Focus</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Work on the "th" sound in words like "think" and "though".
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-indigo-100/50 dark:border-indigo-500/10">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Vocabulary Expansion</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Try using "I would prefer" instead of "I want" for more polite requests.
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-indigo-100/50 dark:border-indigo-500/10">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Grammar Tip</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Remember to use "any" in negative sentences instead of "some".
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InviteBanner />
      {!isPro && <PremiumUpgrade />}
    </motion.div>
  );
}
