import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Medal, Star, TrendingUp, Users, ChevronRight, ChevronLeft, Calendar, Globe } from 'lucide-react';

const GLOBAL_LEADERBOARD_DATA = [
  { id: 101, name: 'Emma Wilson', score: 45000, streak: 120, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
  { id: 102, name: 'Li Wei', score: 42800, streak: 95, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
  { id: 103, name: 'Sofia Rodriguez', score: 41200, streak: 88, avatar: 'https://images.unsplash.com/photo-1544717297-fa15739a5447?w=100&h=100&fit=crop' },
  { id: 6, name: 'Alex Johnson', score: 38450, streak: 42, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
  { id: 7, name: 'Sarah Chen', score: 31820, streak: 35, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
];

const DAILY_LEADERBOARD_DATA = [
  { id: 1, name: 'Alex Johnson', score: 1245, streak: 42, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
  { id: 2, name: 'Sarah Chen', score: 1182, streak: 35, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: 3, name: 'Marco Rossi', score: 1090, streak: 28, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { id: 4, name: 'Yuki Tanaka', score: 955, streak: 21, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  { id: 5, name: 'David Smith', score: 870, streak: 15, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
];

export function Leaderboard() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [viewType, setViewType] = useState<'daily' | 'global'>('daily');
  const [showAllDays, setShowAllDays] = useState(false);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const displayedDays = showAllDays ? days : days.slice(0, 10);

  const renderRankingList = (data: typeof DAILY_LEADERBOARD_DATA) => (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {data.map((user, index) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
            index === 0 
              ? 'bg-amber-50/50 dark:bg-amber-500/5 border-amber-200 dark:border-amber-900/30 shadow-sm' 
              : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-indigo-200'
          }`}
        >
          <div className="flex items-center justify-center w-8 h-8 shrink-0">
            {index === 0 && <Medal className="w-6 h-6 text-amber-500" />}
            {index === 1 && <Medal className="w-6 h-6 text-slate-400" />}
            {index === 2 && <Medal className="w-6 h-6 text-amber-700" />}
            {index > 2 && <span className="font-black text-slate-400 text-lg">#{index + 1}</span>}
          </div>

          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-900 dark:text-white truncate">{user.name}</h4>
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span className="flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-md">
                <Star className="w-3 h-3 fill-current" /> {user.score} XP
              </span>
              <span className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-md">
                <TrendingUp className="w-3 h-3" /> {user.streak} Days
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-none overflow-hidden h-full min-h-[600px] flex flex-col relative">
      {/* View Switcher Tabs */}
      {!selectedDay && (
        <div className="p-4 pb-0">
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl flex items-center gap-1">
            <button
              onClick={() => setViewType('daily')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-black uppercase tracking-tighter flex items-center justify-center gap-2 transition-all ${
                viewType === 'daily' 
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm shadow-indigo-500/10' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Daily
            </button>
            <button
              onClick={() => setViewType('global')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-black uppercase tracking-tighter flex items-center justify-center gap-2 transition-all ${
                viewType === 'global' 
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm shadow-indigo-500/10' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Globe className="w-4 h-4" />
              Global
            </button>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {selectedDay ? (
          <motion.div 
            key="leaderboard-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-full"
          >
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-amber-50/30 dark:bg-amber-500/5">
              <button 
                onClick={() => setSelectedDay(null)}
                className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white mb-6 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Days
              </button>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-500/20 text-amber-600 rounded-xl">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Day {selectedDay} Leaderboard</h3>
                </div>
                <div className="flex items-center gap-1 text-xs font-black text-amber-500 uppercase tracking-widest bg-amber-50 dark:bg-amber-500/10 px-3 py-1.5 rounded-full">
                  <Users className="w-3 h-3" /> 2.4k Active
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Compete with learners worldwide</p>
            </div>
            {renderRankingList(DAILY_LEADERBOARD_DATA)}
          </motion.div>
        ) : viewType === 'daily' ? (
          <motion.div 
            key="days-list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col h-full"
          >
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-amber-50/30 dark:bg-amber-500/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-100 dark:bg-amber-500/20 text-amber-600 rounded-xl">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Daily Leaderboards</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Select a day to view top performers</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {displayedDays.map((day, index) => (
                <motion.button
                  key={day}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.5) }}
                  onClick={() => setSelectedDay(day)}
                  className="w-full flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold">
                      {day}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Day {day}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">View rankings for Day {day}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </motion.button>
              ))}
              
              {!showAllDays && days.length > 10 && (
                <button
                  onClick={() => setShowAllDays(true)}
                  className="w-full mt-4 py-4 text-center text-sm font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-2xl transition-colors"
                >
                  View All Days
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="global-list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col h-full"
          >
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-indigo-50/30 dark:bg-indigo-500/5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 rounded-xl">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Global Ranking</h3>
                </div>
                <div className="flex items-center gap-1 text-xs font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 rounded-full">
                  <Star className="w-3 h-3" /> All Time
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Top performers from all courses combined</p>
            </div>
            {renderRankingList(GLOBAL_LEADERBOARD_DATA)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
