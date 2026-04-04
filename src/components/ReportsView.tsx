import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { TrendingUp, Award, Calendar, Zap, MessageSquare, Target, Clock, Brain, Check, Smile, Activity, Mic, BookOpen } from 'lucide-react';

// Mock data to visualize the user's progress over the last 7 days
const performanceData = [
  { day: 'Day 1', score: 65, confidence: 60, vocabulary: 50 },
  { day: 'Day 2', score: 68, confidence: 62, vocabulary: 55 },
  { day: 'Day 3', score: 74, confidence: 65, vocabulary: 60 },
  { day: 'Day 4', score: 72, confidence: 70, vocabulary: 65 },
  { day: 'Day 5', score: 79, confidence: 75, vocabulary: 70 },
  { day: 'Day 6', score: 82, confidence: 78, vocabulary: 75 },
  { day: 'Day 7', score: 85, confidence: 82, vocabulary: 80 },
];

const aiSuggestions = [
  {
    id: 1,
    type: 'pronunciation',
    title: 'Focus on "th" sounds',
    description: 'Your pronunciation of "th" in words like "think" and "that" is improving, but still needs practice. Try placing your tongue slightly between your teeth.',
    icon: <MessageSquare className="w-5 h-5 text-amber-500" />
  },
  {
    id: 2,
    type: 'grammar',
    title: 'Past Tense Consistency',
    description: 'You sometimes switch to present tense when telling stories about the past. Remember to use verbs like "went", "saw", and "did".',
    icon: <Brain className="w-5 h-5 text-indigo-500" />
  },
  {
    id: 3,
    type: 'vocabulary',
    title: 'Expand Business Idioms',
    description: 'You are doing great with basic vocabulary! Try incorporating idioms like "touch base" or "get the ball rolling" in your next professional session.',
    icon: <Target className="w-5 h-5 text-emerald-500" />
  }
];

const confidenceLevels = ['Beginner', 'Improving', 'Confident', 'Advanced', 'Fluent'];
const currentLevelIndex = 2; // 'Confident'

export function ReportsView() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Learning Analytics</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Track your speaking progress and confidence over time.</p>
        </div>
        
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit transition-colors duration-300">
          {(['daily', 'weekly', 'monthly'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${
                timeframe === t 
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Confidence Meter Section */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Confidence Meter</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Your overall fluency and confidence progression.</p>
        </div>

        {/* Stepped Progress Bar */}
        <div className="relative max-w-4xl mx-auto mb-12 px-4 md:px-0">
          <div className="absolute top-5 left-0 w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full -z-10"></div>
          <div 
            className="absolute top-5 left-0 h-1.5 bg-indigo-500 dark:bg-indigo-400 rounded-full -z-10 transition-all duration-1000" 
            style={{ width: `${(currentLevelIndex / (confidenceLevels.length - 1)) * 100}%` }}
          ></div>
          
          <div className="flex justify-between">
            {confidenceLevels.map((level, i) => {
              const isCompleted = i < currentLevelIndex;
              const isCurrent = i === currentLevelIndex;
              
              return (
                <div key={level} className="flex flex-col items-center gap-3 relative">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-sm transition-colors duration-500 ${
                      isCompleted ? 'bg-indigo-500 dark:bg-indigo-400 text-white dark:text-slate-900' : 
                      isCurrent ? 'bg-indigo-600 dark:bg-indigo-500 text-white ring-4 ring-indigo-100 dark:ring-indigo-500/30' : 
                      'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : <span className="text-sm font-bold">{i + 1}</span>}
                  </div>
                  <span className={`text-xs md:text-sm font-medium ${isCurrent ? 'text-indigo-700 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                    {level}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Specific Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800/50">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
              <Smile className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              Confidence Level
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">82</span>
              <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">/ 100</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
              <div className="bg-blue-500 dark:bg-blue-400 h-2 rounded-full" style={{ width: '82%' }}></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
              <Activity className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
              Speaking Frequency
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">85</span>
              <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">/ 100</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
              <div className="bg-emerald-500 dark:bg-emerald-400 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
              <Mic className="w-5 h-5 text-purple-500 dark:text-purple-400" />
              Pronunciation Accuracy
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">78</span>
              <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">/ 100</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
              <div className="bg-purple-500 dark:bg-purple-400 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
              <BookOpen className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              Vocabulary Growth
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">80</span>
              <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">/ 100</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
              <div className="bg-amber-500 dark:bg-amber-400 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              Daily Goal
            </h3>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">100%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 mb-2">
            <div className="bg-amber-500 dark:bg-amber-400 h-3 rounded-full" style={{ width: '100%' }}></div>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Session completed today. Great job!</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
              Weekly Progress
            </h3>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">5 / 7 Days</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 mb-2">
            <div className="bg-indigo-500 dark:bg-indigo-400 h-3 rounded-full" style={{ width: '71%' }}></div>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">You are on a 5-day streak!</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
              Monthly Journey
            </h3>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">7 / 30 Days</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 mb-2">
            <div className="bg-emerald-500 dark:bg-emerald-400 h-3 rounded-full" style={{ width: '23%' }}></div>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">23% of the curriculum completed.</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Speaking Score Graph */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Speaking Score</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Based on fluency, pronunciation, and grammar.</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--tw-colors-white)' }}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  name="Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Confidence Improvement Graph */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Confidence Improvement</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Measured by speaking pace and hesitation frequency.</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--tw-colors-white)' }}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="confidence" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorConfidence)" 
                  name="Confidence"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">AI Tutor Suggestions</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiSuggestions.map((suggestion) => (
            <div key={suggestion.id} className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/50 hover:border-indigo-100 dark:hover:border-indigo-500/30 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                  {suggestion.icon}
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100">{suggestion.title}</h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {suggestion.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
