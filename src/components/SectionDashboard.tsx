import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Activity, Target, Brain, Sparkles, CheckCircle, Clock, BookOpen } from 'lucide-react';
import { sectionExamples } from '../data/sectionExamples';

interface SectionDashboardProps {
  sectionName: string;
  onBack: () => void;
  isLocked?: boolean;
}

export function SectionDashboard({ sectionName, onBack, isLocked = false }: SectionDashboardProps) {
  // Specific mock data for each section
  const sectionData: Record<string, any> = {
    'Beginner English': {
      accuracyScore: 92,
      practiceCount: 14,
      progressPercent: 65,
      tips: [
        { title: 'Focus Area 1', desc: 'Practice your basic vocabulary in front of a mirror to build confidence.' },
        { title: 'Focus Area 2', desc: 'Try to use the new vocabulary words in simple sentences throughout your day.' },
        { title: 'Focus Area 3', desc: 'Listen to native speakers and try to mimic their intonation on simple phrases.' }
      ],
      history: [
        { title: 'Session 14: Introductions', time: '1 day ago • 12 mins', score: 95 },
        { title: 'Session 13: Numbers & Time', time: '3 days ago • 15 mins', score: 88 },
        { title: 'Session 12: Basic Questions', time: '4 days ago • 10 mins', score: 92 }
      ]
    },
    'Daily Conversation': {
      accuracyScore: 85,
      practiceCount: 22,
      progressPercent: 45,
      tips: [
        { title: 'Focus Area 1', desc: 'Try to speak slightly slower to improve clarity. Your pronunciation is good, but pacing will help.' },
        { title: 'Focus Area 2', desc: 'Use filler words like "well" or "you know" naturally to sound more conversational.' },
        { title: 'Focus Area 3', desc: 'Practice active listening. Before responding, take a brief pause to formulate your thoughts.' }
      ],
      history: [
        { title: 'Session 22: Ordering Food', time: '2 hours ago • 10 mins', score: 88 },
        { title: 'Session 21: Small Talk', time: '2 days ago • 15 mins', score: 82 },
        { title: 'Session 20: Asking Directions', time: '5 days ago • 12 mins', score: 85 }
      ]
    },
    'Grammar Speaking': {
      accuracyScore: 78,
      practiceCount: 8,
      progressPercent: 25,
      tips: [
        { title: 'Focus Area 1', desc: 'Pay attention to subject-verb agreement, especially with third-person singular.' },
        { title: 'Focus Area 2', desc: 'Practice using past tense verbs correctly when telling stories.' },
        { title: 'Focus Area 3', desc: 'Review the difference between "much" and "many" with countable and uncountable nouns.' }
      ],
      history: [
        { title: 'Session 8: Past Tense Narratives', time: '1 day ago • 20 mins', score: 75 },
        { title: 'Session 7: Future Plans', time: '3 days ago • 15 mins', score: 82 },
        { title: 'Session 6: Conditionals', time: '1 week ago • 18 mins', score: 78 }
      ]
    },
    'Pronunciation Trainer': {
      accuracyScore: 88,
      practiceCount: 35,
      progressPercent: 80,
      tips: [
        { title: 'Focus Area 1', desc: 'Work on the "th" sound. Make sure your tongue is between your teeth.' },
        { title: 'Focus Area 2', desc: 'Practice word stress. Remember that nouns usually have stress on the first syllable.' },
        { title: 'Focus Area 3', desc: 'Focus on linking words together to sound more fluid and natural.' }
      ],
      history: [
        { title: 'Session 35: The "th" Sound', time: '5 hours ago • 8 mins', score: 92 },
        { title: 'Session 34: Word Stress', time: '1 day ago • 10 mins', score: 85 },
        { title: 'Session 33: Vowel Sounds', time: '2 days ago • 12 mins', score: 88 }
      ]
    },
    'Vocabulary Builder': {
      accuracyScore: 95,
      practiceCount: 42,
      progressPercent: 90,
      tips: [
        { title: 'Focus Area 1', desc: 'Review the vocabulary from your last session. Using these words in different contexts will help.' },
        { title: 'Focus Area 2', desc: 'Try to learn words in chunks or phrases rather than individually.' },
        { title: 'Focus Area 3', desc: 'Use flashcards to test your memory of new words daily.' }
      ],
      history: [
        { title: 'Session 42: Travel & Tourism', time: '1 day ago • 15 mins', score: 98 },
        { title: 'Session 41: Food & Dining', time: '2 days ago • 12 mins', score: 95 },
        { title: 'Session 40: Technology', time: '4 days ago • 15 mins', score: 92 }
      ]
    },
    'Professional English': {
      accuracyScore: 82,
      practiceCount: 12,
      progressPercent: 35,
      tips: [
        { title: 'Focus Area 1', desc: 'Practice using formal business phrases and sign-offs in emails and meetings.' },
        { title: 'Focus Area 2', desc: 'Learn common business idioms to sound more natural in a corporate setting.' },
        { title: 'Focus Area 3', desc: 'Work on your presentation skills, focusing on clear transitions between topics.' }
      ],
      history: [
        { title: 'Session 12: Job Interviews', time: '2 days ago • 25 mins', score: 85 },
        { title: 'Session 11: Leading Meetings', time: '4 days ago • 20 mins', score: 78 },
        { title: 'Session 10: Email Etiquette', time: '1 week ago • 15 mins', score: 82 }
      ]
    }
  };

  const data = sectionData[sectionName] || sectionData['Daily Conversation'];
  const { accuracyScore, practiceCount, progressPercent, tips, history } = data;

  const [showAllExamples, setShowAllExamples] = useState(false);
  const examples = sectionExamples[sectionName] || [];
  const displayedExamples = showAllExamples ? examples : examples.slice(0, 10);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8 max-w-5xl mx-auto"
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500 dark:text-slate-400"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{sectionName}</h2>
          <p className="text-slate-500 dark:text-slate-400">Track your progress and improve your skills.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Accuracy Score */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-1">{accuracyScore}%</h3>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Accuracy Score</p>
        </div>

        {/* Practice History */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4">
            <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-1">{practiceCount}</h3>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sessions Completed</p>
        </div>

        {/* Progress Tracking */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white">Progress</span>
            </div>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="relative h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Practice History List */}
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-500" />
            Recent Practice History
          </h3>
          <div className="space-y-4">
            {history.map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-indigo-600 dark:text-indigo-400">{item.score}%</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Tips */}
        <div className="bg-indigo-50 dark:bg-indigo-500/5 p-6 md:p-8 rounded-3xl border border-indigo-100 dark:border-indigo-500/20">
          <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-6 flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Improvement Tips
          </h3>
          <div className="space-y-4">
            {tips.map((tip: any, i: number) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-indigo-100/50 dark:border-indigo-500/10">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{tip.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Examples Section */}
      {examples.length > 0 && (
        <div id="examples-section" className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              Practice Examples for {sectionName}
            </h3>
            {examples.length > 10 && (
              <button 
                onClick={() => {
                  setShowAllExamples(!showAllExamples);
                  if (!showAllExamples) {
                     setTimeout(() => {
                        document.getElementById('examples-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                     }, 100);
                  }
                }}
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
              >
                {showAllExamples ? 'Show Less' : 'View All'}
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedExamples.map((example: string, i: number) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex items-start gap-3">
                <span className="text-indigo-500 font-bold text-sm mt-0.5">{i + 1}.</span>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{example}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

