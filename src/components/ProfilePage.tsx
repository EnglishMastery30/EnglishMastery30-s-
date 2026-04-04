import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, CreditCard, Globe, Moon, Sun, LogOut, Shield, Bell, ChevronRight, Clock, Target } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { CheckoutButton } from './CheckoutButton';
import { PremiumUpgrade } from './PremiumUpgrade';
import { InviteBanner } from './InviteBanner';
import { auth } from '../firebase';

export function ProfilePage({ 
  isDark, 
  onToggleDark, 
  onLogout,
  isPro,
  onUpgrade,
  streak = 0
}: { 
  isDark: boolean; 
  onToggleDark: () => void;
  onLogout: () => void;
  isPro: boolean;
  onUpgrade: () => void;
  streak?: number;
}) {
  const { language, setLanguage, t } = useLanguage();
  const user = auth.currentUser;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <div className="flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center sm:text-left">
        <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <User className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            {user?.displayName || 'English Learner'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            {user?.email || user?.phoneNumber || 'No contact info'}
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold rounded-full border border-emerald-200 dark:border-emerald-500/20">
              <Shield className="w-4 h-4" /> {isPro ? 'Pro Member' : 'Free Member'}
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-semibold rounded-full border border-amber-200 dark:border-amber-500/20">
              <Target className="w-4 h-4" /> {streak} Day Streak
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Time Spent */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
              <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Daily Time Spent</h3>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Today's Practice</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">1h 45m</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Daily Goal</p>
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">2h 00m</p>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
              <CreditCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('profile.subscription')}</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Current Plan</span>
              <span className="font-semibold text-slate-900 dark:text-white">{isPro ? 'Pro Plan' : 'Free Plan'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Status</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Active</span>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
              <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('profile.preferences')}</h3>
          </div>
          <div className="space-y-2">
            <div className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors group">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                <span className="font-medium text-slate-700 dark:text-slate-300">{t('profile.languageSettings')}</span>
              </div>
              <div className="flex items-center gap-2">
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="bg-transparent border-none text-sm text-slate-500 focus:ring-0 cursor-pointer outline-none"
                >
                  <option value="en">English</option>
                  <option value="te">Telugu (తెలుగు)</option>
                  <option value="hi">Hindi (हिन्दी)</option>
                  <option value="ta">Tamil (தமிழ்)</option>
                  <option value="kn">Kannada (ಕನ್ನಡ)</option>
                  <option value="ml">Malayalam (മലയാളം)</option>
                  <option value="mr">Marathi (मराठी)</option>
                  <option value="bn">Bengali (বাংলা)</option>
                  <option value="gu">Gujarati (ગુજરાતી)</option>
                  <option value="pa">Punjabi (ਪੰਜਾਬੀ)</option>
                  <option value="ur">Urdu (اردو)</option>
                  <option value="es">Spanish (Español)</option>
                  <option value="fr">French (Français)</option>
                  <option value="de">German (Deutsch)</option>
                  <option value="it">Italian (Italiano)</option>
                  <option value="pt">Portuguese (Português)</option>
                  <option value="ru">Russian (Русский)</option>
                  <option value="zh">Chinese (中文)</option>
                  <option value="ja">Japanese (日本語)</option>
                  <option value="ko">Korean (한국어)</option>
                  <option value="ar">Arabic (العربية)</option>
                </select>
              </div>
            </div>
            <button className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors group">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                <span className="font-medium text-slate-700 dark:text-slate-300">{t('profile.notifications')}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button 
              onClick={() => {
                const event = new CustomEvent('navigate', { detail: 'privacy' });
                window.dispatchEvent(event);
              }}
              className="w-full flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                <span className="font-medium text-slate-700 dark:text-slate-300">Privacy Policy</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <div className="flex items-center justify-between p-3 rounded-xl">
              <div className="flex items-center gap-3">
                {isDark ? (
                  <Moon className="w-5 h-5 text-indigo-400" />
                ) : (
                  <Sun className="w-5 h-5 text-amber-500" />
                )}
                <span className="font-medium text-slate-700 dark:text-slate-300">{t('profile.darkMode')}</span>
              </div>
              <button 
                onClick={onToggleDark}
                className={`w-12 h-6 rounded-full transition-colors relative ${isDark ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${isDark ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <InviteBanner />

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <PremiumUpgrade />
      </div>

      <div className="flex justify-center pt-8">
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 font-medium px-6 py-3 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {t('profile.signOut')}
        </button>
      </div>
    </motion.div>
  );
}
