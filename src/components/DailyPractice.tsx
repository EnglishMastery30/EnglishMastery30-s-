import { motion } from 'motion/react';
import { Play, Activity, Target, Brain, ArrowRight, CheckCircle, Sparkles, Zap, BookOpen, MessageCircle, Briefcase, Mic, ArrowLeft, Volume2 } from 'lucide-react';
import { curriculum, DaySession } from '../data/curriculum';

export function DailyPractice({ onSelectDay, onBack }: { onSelectDay: (day: DaySession) => void, onBack: () => void }) {
  const todaysLesson = curriculum[4]; // Day 5: Ordering Food
  const nextLesson = curriculum[5];

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
      className="space-y-8 max-w-5xl mx-auto"
    >
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500 dark:text-slate-400"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Daily Practice</h2>
          <p className="text-slate-500 dark:text-slate-400">Your personalized daily learning path.</p>
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

      {/* Learning Sections */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Practice Areas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectDay(todaysLesson)} // For now, route to today's lesson
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectDay(todaysLesson); }}
                className={`bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-${section.color}-300 dark:hover:border-${section.color}-500/50 transition-colors text-left group flex flex-col h-full relative cursor-pointer`}
              >
                <div className="flex justify-between items-start w-full mb-4">
                  <div className={`w-12 h-12 bg-${section.color}-50 dark:bg-${section.color}-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${section.color}-600 dark:text-${section.color}-400`} />
                  </div>
                  <button 
                    onClick={(e) => playAudio(e, `${section.title}. ${section.description}`)}
                    className={`p-2 rounded-full hover:bg-${section.color}-100 dark:hover:bg-${section.color}-500/20 text-slate-400 hover:text-${section.color}-600 dark:hover:text-${section.color}-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100`}
                    title="Listen to section"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{section.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-auto">{section.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
