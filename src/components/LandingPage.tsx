import { motion } from 'motion/react';
import { Globe, Mic, Zap, ArrowRight, Download, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function LandingPage({ onLogin }: { onLogin: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 dark:bg-indigo-500 rounded-xl flex items-center justify-center transition-transform hover:rotate-12">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-2xl tracking-tighter dark:text-white leading-none">English Master</span>
                <span className="font-black text-[10px] px-1.5 py-0.5 rounded bg-amber-500 text-white tracking-widest leading-none">RRR</span>
              </div>
              <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 tracking-widest uppercase mt-0.5">Read, Repeat, Respond.</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button 
              onClick={onLogin}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
            >
              {t('landing.login')}
            </button>
            <button 
              onClick={onLogin}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              {t('landing.getStarted')}
            </button>
          </div>
        </div>
      </nav>

      {/* Methodology Section */}
      <section className="bg-white dark:bg-slate-900 py-24 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-black text-indigo-600 dark:text-indigo-400 tracking-[0.3em] uppercase">The Methodology</h2>
            <p className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">Read, Repeat, Respond.</p>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Our unique RRR framework is designed to bridge the gap between knowing English and speaking it fluently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 transition-all hover:scale-105 group">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-3xl mb-6 shadow-lg shadow-indigo-200 dark:shadow-none group-hover:rotate-6 transition-transform">R</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Read</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Consume high-quality content that matches your level. Expand your vocabulary and understand structure through immersive reading sessions.
              </p>
            </div>
            
            <div className="p-8 bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 transition-all hover:scale-105 group">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-2xl flex items-center justify-center font-black text-3xl mb-6 shadow-lg shadow-purple-200 dark:shadow-none group-hover:rotate-6 transition-transform">R</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Repeat</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Reinforce what you learn through AI-assisted repetition. Perfect your pronunciation and internalize common patterns until they become automatic.
              </p>
            </div>
            
            <div className="p-8 bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 transition-all hover:scale-105 group">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-black text-3xl mb-6 shadow-lg shadow-emerald-200 dark:shadow-none group-hover:rotate-6 transition-transform">R</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Respond</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Apply your skills in real-time AI conversations. Learn to think on your feet and respond naturally to unexpected questions and scenarios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 pt-20 pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-semibold">
              <Zap className="w-4 h-4" />
              <span>The #1 AI English Tutor</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {t('landing.title1')} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                {t('landing.title2')}
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0">
              {t('landing.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button 
                onClick={onLogin}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
              >
                {t('landing.startLearning')} <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all">
                <Download className="w-5 h-5" /> {t('landing.downloadApp')}
              </button>
            </div>
          </motion.div>

          {/* Hero Image/Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 w-full max-w-lg lg:max-w-none relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl blur-3xl opacity-20 dark:opacity-40"></div>
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center">
                  <Mic className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">AI Tutor Session</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Day 5: Ordering Food</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none w-4/5">
                  <p className="text-slate-700 dark:text-slate-300">Welcome to the restaurant! Are you ready to order, or do you need a few more minutes?</p>
                </div>
                <div className="bg-indigo-600 text-white p-4 rounded-2xl rounded-tr-none w-4/5 ml-auto">
                  <p>I think I'm ready. I'll have the grilled salmon, please.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none w-4/5">
                  <p className="text-slate-700 dark:text-slate-300">Excellent choice. Would you like a salad or soup with that?</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
              <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Real-life Scenarios</h3>
            <p className="text-slate-600 dark:text-slate-400">Practice conversations you'll actually use, from coffee shops to job interviews.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
              <Mic className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Instant Feedback</h3>
            <p className="text-slate-600 dark:text-slate-400">Get real-time corrections on your pronunciation, grammar, and vocabulary.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
              <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Track Progress</h3>
            <p className="text-slate-600 dark:text-slate-400">Watch your confidence meter rise as you complete daily lessons and challenges.</p>
          </div>
        </div>
      </main>

      {/* Footer - Hidden on mobile */}
      <footer className="hidden md:block bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} English Mastery 30. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
