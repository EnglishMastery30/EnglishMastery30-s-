import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, ArrowRight, Lock, Crown } from 'lucide-react';

interface TrialBannerProps {
  isLocked: boolean;
  onUpgrade: () => void;
}

export function TrialBanner({ isLocked, onUpgrade }: TrialBannerProps) {
  if (!isLocked) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-indigo-600 text-white py-3 px-4 relative z-50 shadow-lg"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-sm sm:text-base tracking-tight">Your 24-hour free trial has expired.</p>
            <p className="text-xs text-indigo-100 opacity-80 decoration-indigo-200/50">Upgrade today to continue practicing with our advanced AI tutors.</p>
          </div>
        </div>
        
        <button
          onClick={onUpgrade}
          className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2 group whitespace-nowrap shadow-xl shadow-indigo-950/20"
        >
          Upgrade Now
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

export function TrialModal({ isOpen, onClose, onUpgrade }: { isOpen: boolean; onClose: () => void; onUpgrade: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-cover grayscale opacity-50 contrast-125"
                alt="Trial Expired"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse">
                  <Lock className="w-10 h-10" />
                </div>
              </div>
            </div>

            <div className="p-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <Crown className="w-3 h-3" /> Trail Ended
              </div>
              
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter leading-tight">
                Unlock Your Potential
              </h2>
              
              <p className="text-slate-500 dark:text-slate-400 text-lg mb-10 leading-relaxed font-medium">
                Your free period was great! But learning a language takes consistency. Continue your journey with unlimited AI sessions, expert feedback, and personalized roadmaps.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={onUpgrade}
                  className="w-full py-5 bg-indigo-600 text-white font-black rounded-[1.5rem] hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/40 text-lg uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95"
                >
                  Upgrade to Pro <ArrowRight className="w-6 h-6" />
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold transition-all text-sm uppercase tracking-widest"
                >
                  Maybe Later
                </button>
              </div>
            </div>
            
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs text-slate-400 font-bold flex items-center justify-center gap-2 uppercase tracking-tighter">
                <AlertCircle className="w-4 h-4" /> 7-day money-back guarantee on all plans
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
