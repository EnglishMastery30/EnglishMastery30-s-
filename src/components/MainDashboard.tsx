import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Activity, Target, Brain, ArrowRight, CheckCircle, Sparkles, Zap, BookOpen, MessageCircle, Briefcase, Mic, Volume2, Languages, Quote, ArrowRightLeft, Code, Lock, Flame, CreditCard, Clock, Share2, Headphones, ChevronRight, Info, Star } from 'lucide-react';
import { curriculum, DaySession } from '../data/curriculum';
import { PremiumUpgrade } from './PremiumUpgrade';
import { InviteBanner } from './InviteBanner';
import { QuickTranslate } from './QuickTranslate';
import { useCredits } from '../contexts/CreditsContext';

export function MainDashboard({ onSelectDay, onSelectSection, streak = 0, isPro = false, isLocked = false, completedSessions = [] }: { onSelectDay: (day: DaySession) => void, onSelectSection: (section: string) => void, streak?: number, isPro?: boolean, isLocked?: boolean, completedSessions?: number[] }) {
  const nextLessonIndex = curriculum.findIndex(d => !completedSessions.includes(d.day));
  const todaysLesson = nextLessonIndex !== -1 ? curriculum[nextLessonIndex] : curriculum[0];
  const nextLesson = nextLessonIndex !== -1 && nextLessonIndex + 1 < curriculum.length ? curriculum[nextLessonIndex + 1] : curriculum[0];
  const [activeSlide, setActiveSlide] = useState(0);
  const { credits, useCustomKeys } = useCredits();

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
    { id: 'shadowing', title: 'Shadowing Practice', icon: Headphones, color: 'orange', description: 'Mimic native speakers for fluency' },
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
      {/* Branded Header Section */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border-2 border-indigo-100 dark:border-indigo-900/30 shadow-none relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">English Master</h2>
              <span className="px-3 py-1 bg-amber-500 text-white text-xs font-black rounded-lg tracking-[0.2em] shadow-none">RRR</span>
            </div>
            <p className="text-sm font-black text-indigo-500 dark:text-indigo-400 tracking-[0.3em] uppercase">Read, Repeat, Respond.</p>
            <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-md font-medium leading-relaxed">
              Master the art of English through our scientifically proven RRR methodology. Engage with immersive sessions that build natural fluency.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-4 w-full">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 text-center transition-transform hover:scale-105">
              <div className="text-indigo-600 dark:text-indigo-400 font-black text-xl mb-1">R</div>
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Read</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 text-center transition-transform hover:scale-105">
              <div className="text-indigo-600 dark:text-indigo-400 font-black text-xl mb-1">R</div>
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Repeat</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 text-center transition-transform hover:scale-105">
              <div className="text-indigo-600 dark:text-indigo-400 font-black text-xl mb-1">R</div>
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Respond</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Bar with Credits */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-none">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
            <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Current Streak</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1">
              {streak} Days <Flame className="w-4 h-4 text-orange-500" />
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => {
            const event = new CustomEvent('navigate', { detail: 'api-keys' });
            window.dispatchEvent(event);
          }}
          className="flex items-center gap-3 px-4 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
        >
          <div className="text-right">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">AI Credits</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {useCustomKeys ? 'BYOK Active' : credits}
            </p>
          </div>
          <div className={`p-1.5 rounded-lg ${useCustomKeys ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400'}`}>
            <Zap className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* Daily Motivation / Word of the Day */}
      <div className="relative rounded-3xl overflow-hidden shadow-none border border-slate-200 dark:border-slate-800 h-48 sm:h-64 group">
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
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">De-escalate</h3>
          <p className="text-white/90 text-sm sm:text-base italic leading-relaxed max-w-2xl">
            "To reduce the intensity of a conflict or potentially violent situation."
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold text-white/90">Verb</span>
            <span className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold text-white/90">Mitigate</span>
            <span className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold text-white/90">Alleviate</span>
          </div>
        </div>
      </div>

      {/* Learning Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-none flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Completed Lessons</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{completedSessions.length}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-none flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Vocabulary Learned</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{completedSessions.length * 5}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-none flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center">
            <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Learning History</p>
            <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Review Sessions</button>
          </div>
        </div>
      </div>

      {/* Hero: Today's Lesson */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-900 dark:to-purple-900 rounded-[2.5rem] p-6 sm:p-8 md:p-12 text-white shadow-none relative overflow-hidden flex flex-col md:flex-row items-center gap-8 group/hero">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
        
        <div className="relative z-10 w-full md:w-1/3 h-48 sm:h-64 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl flex-shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600&h=600" 
            alt="Collaboration" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover/hero:scale-110" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-indigo-600/20" />
        </div>

        <div className="relative z-10 flex-1 space-y-6 text-center md:text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-sm border border-white/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Today's Lesson
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {todaysLesson.topic}
            </h3>
            <p className="text-lg sm:text-xl text-indigo-100 font-medium max-w-xl">
              {todaysLesson.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <button 
              onClick={() => {
                if (!isLocked) onSelectDay(todaysLesson);
              }}
              disabled={isLocked}
              className={`bg-white text-indigo-600 hover:bg-slate-50 px-8 py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl hover:-translate-y-1 active:scale-[0.98] ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLocked ? <Lock className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />} Start Lesson
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-lg transition-all border border-white/20 backdrop-blur-md">
              Preview
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Confidence */}
        <div className="lg:col-span-2 space-y-8">
          {/* Weekly Streak Calendar */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-none flex flex-col sm:flex-row items-center justify-between gap-6 relative">
             <button 
              onClick={() => {
                const text = `I'm on a ${streak}-day learning streak on LingoQuest! 🔥 Join me in mastering English!`;
                if (navigator.share) {
                  navigator.share({ title: 'My Learning Streak', text });
                } else {
                  console.log('Share API not supported', text);
                }
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-indigo-600 transition-colors p-2"
              title="Share your streak"
             >
                <Share2 className="w-5 h-5" />
             </button>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 rounded-full flex items-center justify-center shrink-0">
                <Flame className="w-8 h-8 text-orange-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  {streak} Day Streak!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {streak > 0 ? "You're on a roll. Keep it up!" : "Start your learning streak today!"}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2 sm:gap-3">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                const isCompleted = streak > 0 && i >= 7 - Math.min(streak, 7);
                const isToday = i === 6;
                
                return (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div 
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        isCompleted 
                          ? 'bg-orange-500 text-white shadow-none' 
                          : isToday 
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-2 border-dashed border-slate-300 dark:border-slate-700'
                            : 'bg-slate-50 dark:bg-slate-800/50 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <Flame className="w-4 h-4 sm:w-5 sm:h-5" /> : day}
                    </div>
                    <span className={`text-xs font-medium ${isToday ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-none flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center mb-3">
                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">12</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Sessions</span>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-none flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-purple-50 dark:bg-purple-500/10 rounded-full flex items-center justify-center mb-3">
                <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">145</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">New Words</span>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-none flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-amber-50 dark:bg-amber-500/10 rounded-full flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">85%</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Accuracy</span>
            </div>
          </div>

          {/* Confidence Meter (Mini) */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-none">
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
                    tabIndex={isLocked ? -1 : 0}
                    onClick={() => {
                      if (isLocked) return;
                      if (section.id === 'vocabulary') {
                        // We need to pass this up to App.tsx, but we only have onSelectSection which expects a string.
                        // Let's use a custom event for now to trigger navigation.
                        window.dispatchEvent(new CustomEvent('navigate', { detail: 'vocabulary' }));
                      } else if (section.id === 'grammar') {
                        window.dispatchEvent(new CustomEvent('navigate', { detail: 'grammar-drill' }));
                      } else if (section.id === 'shadowing') {
                        window.dispatchEvent(new CustomEvent('navigate', { detail: 'shadowing' }));
                      } else {
                        onSelectSection(section.title);
                      }
                    }}
                    onKeyDown={(e) => { 
                      if (isLocked) return;
                      if (e.key === 'Enter' || e.key === ' ') {
                        if (section.id === 'vocabulary') {
                          window.dispatchEvent(new CustomEvent('navigate', { detail: 'vocabulary' }));
                        } else if (section.id === 'grammar') {
                          window.dispatchEvent(new CustomEvent('navigate', { detail: 'grammar-drill' }));
                        } else if (section.id === 'shadowing') {
                          window.dispatchEvent(new CustomEvent('navigate', { detail: 'shadowing' }));
                        } else {
                          onSelectSection(section.title);
                        }
                      }
                    }}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-none ${isLocked ? 'opacity-60 cursor-not-allowed' : `hover:border-${section.color}-300 dark:hover:border-${section.color}-500/50 cursor-pointer`} transition-colors text-left group flex flex-col relative`}
                  >
                    <div className="flex justify-between items-start w-full mb-3">
                      <div className={`w-10 h-10 bg-${section.color}-50 dark:bg-${section.color}-500/10 rounded-xl flex items-center justify-center ${!isLocked && 'group-hover:scale-110'} transition-transform`}>
                        {isLocked ? <Lock className={`w-5 h-5 text-${section.color}-600 dark:text-${section.color}-400`} /> : <Icon className={`w-5 h-5 text-${section.color}-600 dark:text-${section.color}-400`} />}
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
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Leaderboard</h3>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-none">
            <div className="space-y-4">
              {[
                { name: 'Emma Wilson', score: 45000, streak: 120, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
                { name: 'Li Wei', score: 42800, streak: 95, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
                { name: 'Sofia Rodriguez', score: 41200, streak: 88, avatar: 'https://images.unsplash.com/photo-1544717297-fa15739a5447?w=100&h=100&fit=crop' }
              ].map((user, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${i === 0 ? 'bg-amber-50/50 dark:bg-amber-500/5 border-amber-200 dark:border-amber-900/30' : 'border-slate-100 dark:border-slate-800'}`}>
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{user.name}</h4>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                       <span className="flex items-center gap-1 text-amber-600"><Star className="w-3 h-3 fill-current" /> {user.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'leaderboard' }))}
              className="mt-6 w-full py-3 text-center text-sm font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-6 lg:sticky lg:top-24">
            <QuickTranslate isLocked={isLocked} />
            {/* AI Suggestions */}
            <div className="bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/20 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-100 flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> AI Suggestions
              </h3>
              <div className="space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-none border border-indigo-100/50 dark:border-indigo-500/10">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Pronunciation Focus</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Work on the "th" sound in words like "think" and "though".
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-none border border-indigo-100/50 dark:border-indigo-500/10">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">Vocabulary Expansion</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Try using "I would prefer" instead of "I want" for more polite requests.
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-none border border-indigo-100/50 dark:border-indigo-500/10">
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
