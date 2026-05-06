import { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Mic, Zap, ArrowRight, Download, CheckCircle, Smartphone, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { Logo } from './Logo';

export function LandingPage({ onLogin }: { onLogin: () => void }) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Handled by onAuthStateChanged in App.tsx
    } catch (err: any) {
      console.error('Google login failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
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
              <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start mt-6">
               <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900 hover:bg-black text-white px-5 py-3 rounded-xl transition-all">
                  <svg viewBox="0 0 384 512" className="w-6 h-6 fill-current"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] font-medium">Download on the</span>
                    <span className="text-xl font-bold font-sans">App Store</span>
                  </div>
               </button>
               <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900 hover:bg-black text-white px-5 py-3 rounded-xl transition-all">
                  <svg viewBox="0 0 512 512" className="w-6 h-6 fill-current"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] font-medium uppercase tracking-wide text-slate-300">Get it on</span>
                    <span className="text-xl font-bold font-sans">Google Play</span>
                  </div>
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

        {/* Testimonials */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Loved by learners worldwide</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Over 100,000 students have improved their English with our AI tutor.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <div className="text-amber-400 mb-4 flex gap-1">
                {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-6 font-medium italic">"The AI tutor feels like talking to a real native speaker. My confidence in business meetings has skyrocketed within just a month!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700">M</div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Maria S.</h4>
                  <p className="text-xs text-slate-500">Marketing Professional</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <div className="text-amber-400 mb-4 flex gap-1">
                {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-6 font-medium italic">"I prepare for my job interviews using the roleplay scenarios. The instant feedback on grammar is surprisingly accurate."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center font-bold text-emerald-700">D</div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">David Chen</h4>
                  <p className="text-xs text-slate-500">Software Engineer</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <div className="text-amber-400 mb-4 flex gap-1">
                {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-6 font-medium italic">"Best investment for my spoken English. Unlike other apps where you just fill in blanks, here you actually have to speak!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center font-bold text-rose-700">A</div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Aisha K.</h4>
                  <p className="text-xs text-slate-500">University Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <Logo />
            </div>
            <p className="text-sm text-slate-500 max-w-xs font-medium mt-4">Master English fluency with the power of artificial intelligence (RRR System).</p>
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
               <a href="https://wa.me/#" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-emerald-500 transition-colors">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 7.454c-1.895 0-3.744-.509-5.35-1.47l-.384-.228-3.978 1.043 1.062-3.877-.25-.398a10.428 10.428 0 0 1-1.594-5.597c0-5.767 4.693-10.46 10.46-10.46 2.793 0 5.42 1.087 7.401 3.04a10.4 10.4 0 0 1 3.037 7.42c0 5.768-4.693 10.46-10.461 10.46m8.873-19.332A11.94 11.94 0 0 0 12.652 0C5.652 0 .012 5.666 0 12.67c0 2.23.593 4.407 1.71 6.347L0 24l5.12-1.343a11.9 11.9 0 0 0 5.617 1.417h.005c6.994 0 12.65-5.667 12.657-12.67a11.9 11.9 0 0 0-3.376-8.535z"/></svg>
               </a>
               <a href="https://instagram.com/#" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-500 transition-colors">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
               </a>
               <a href="https://facebook.com/#" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
               </a>
            </div>
            <p className="text-xs text-slate-400 pt-2">&copy; {new Date().getFullYear()} English Master AI (RRR System). All rights reserved.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
             <button className="flex items-center gap-3 bg-slate-900 text-white px-5 py-2 rounded-xl border border-slate-800 hover:bg-black transition-all">
                <Smartphone className="w-5 h-5 text-indigo-400" />
                <div className="text-left leading-none">
                  <p className="text-[10px] opacity-70 mb-1">Download on</p>
                  <p className="text-sm font-bold">App Store</p>
                </div>
             </button>
             <button className="flex items-center gap-3 bg-slate-900 text-white px-5 py-2 rounded-xl border border-slate-800 hover:bg-black transition-all">
                <Play className="w-5 h-5 text-emerald-400" />
                <div className="text-left leading-none">
                  <p className="text-[10px] opacity-70 mb-1">Get it on</p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
             </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
