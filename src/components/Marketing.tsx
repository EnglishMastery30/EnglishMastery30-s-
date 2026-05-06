import React from 'react';
import { motion } from 'motion/react';
import { Megaphone, TrendingUp, Presentation, ArrowLeft } from 'lucide-react';

export function Marketing({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-slate-500 dark:text-slate-400" />
        </button>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Marketing & Media</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10 flex flex-col items-center gap-6">
            <Megaphone className="w-12 h-12" />
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Partner With Us</h3>
            <p className="text-indigo-100 max-w-2xl text-lg">
              We're always looking for content creators, influencers, and educational institutions to collaborate with. Let's make learning available to everyone.
            </p>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold mt-4 hover:bg-indigo-50 transition-colors">
              Download Media Kit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Affiliate Program</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Join our affiliate network and earn commissions for every student you refer to English Master Pro. 
            </p>
            <button className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">Apply Now →</button>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-6">
              <Presentation className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Press & Media</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Are you a journalist or blogger? Access our press releases, official logos, and brand guidelines.
            </p>
            <button className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">View Press Page →</button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Share English Master</h4>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-lg mx-auto">Love using our app? Share it with your friends and colleagues to help them master spoken English!</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="px-6 py-2 bg-slate-900 dark:bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors">
              Share on X
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
              Share on Facebook
            </button>
            <button className="px-6 py-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 font-medium rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-500/30 transition-colors">
              Copy Link
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
