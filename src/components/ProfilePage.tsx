import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, CreditCard, Globe, Moon, Sun, LogOut, Shield, Bell, ChevronRight, Clock, Target, Key, ShoppingBag, EyeOff, Sparkles, Wand2, Image as ImageIcon, Briefcase, Lock, CheckCircle, Languages } from 'lucide-react';
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
  streak = 0,
  userRole,
  onRoleChange
}: { 
  isDark: boolean; 
  onToggleDark: () => void;
  onLogout: () => void;
  isPro: boolean;
  onUpgrade: () => void;
  streak?: number;
  userRole: 'student' | 'teacher';
  onRoleChange: (role: 'student' | 'teacher') => void;
}) {
  const { language, setLanguage, targetLanguage, setTargetLanguage, t } = useLanguage();
  const [isPrivate, setIsPrivate] = useState(false);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [bio, setBio] = useState('');
  const user = auth.currentUser;
  
  const professionalAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=" + (user?.uid || "default");

  const purchasedItems = [
    { id: '1', title: 'Advanced Grammar e-Book', purchaseDate: '2026-04-24T10:00:00Z', price: '$12.99' }, // 4 days ago
    { id: '2', title: 'IELTS Practice Tests', purchaseDate: '2026-04-27T14:30:00Z', price: '$24.50' },   // 1 day ago
    { id: '3', title: 'Business English Intensive', purchaseDate: '2026-04-28T18:00:00Z', price: '$49.99' }, // Today
  ];

  const getLockStatus = (date: string) => {
    const purchase = new Date(date).getTime();
    const now = new Date('2026-04-28T18:24:16Z').getTime();
    const diffDays = Math.floor((now - purchase) / (1000 * 60 * 60 * 24));
    const daysRemaining = 3 - diffDays;
    return {
      locked: diffDays < 3,
      daysLeft: Math.max(0, daysRemaining)
    };
  };

  const handleGenerateBio = async () => {
    setIsGeneratingBio(true);
    // Mocking AI generation for now, in a real scenario we'd call the Gemini service
    setTimeout(() => {
      setBio("Certified English Language Specialist with over 10 years of experience in conversational coaching and business communication. Dedicated to helping students unlock their full potential through immersive, technology-driven learning experiences.");
      setIsGeneratingBio(false);
    }, 2000);
  };

  const handleGenerateAvatar = () => {
    // This will be handled by the user uploading or me generating image
    console.log("Requesting professional avatar generation...");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <div className="flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-none text-center sm:text-left relative overflow-hidden">
        {isPrivate && (
          <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px] pointer-events-none z-0" />
        )}
        <div className="relative group">
          <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center shrink-0 overflow-hidden border-4 border-white dark:border-slate-900 shadow-none">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <img src={professionalAvatar} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            )}
          </div>
          <button 
            onClick={handleGenerateAvatar}
            className="absolute -bottom-1 -right-1 p-2 bg-indigo-600 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            title="Generate AI Avatar"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 z-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {user?.displayName || 'English Learner'}
            </h2>
            {isPrivate && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-md">
                <EyeOff className="w-3 h-3" /> Private
              </span>
            )}
          </div>
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
            <button 
              onClick={() => onRoleChange(userRole === 'student' ? 'teacher' : 'student')}
              className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-semibold rounded-full border border-indigo-200 dark:border-indigo-500/20 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors"
            >
              <Briefcase className="w-4 h-4" /> Switch to {userRole === 'student' ? 'Teacher' : 'Student'} View
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Professional Profile Generator */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-none md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Professional Bio</h3>
            </div>
            <button 
              disabled={isGeneratingBio}
              onClick={handleGenerateBio}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-purple-500/20"
            >
              {isGeneratingBio ? (
                <Wand2 className="w-4 h-4 animate-spin" />
              ) : (
                <Wand2 className="w-4 h-4" />
              )}
              AI Generate Bio
            </button>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Introduce yourself professionally..."
            className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
          />
        </div>
        {/* Daily Time Spent */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-none md:col-span-2">
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

        {/* Subscription & Purchased Items */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-none">
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
            
            <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
            
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
              <ShoppingBag className="w-3 h-3" /> Purchased Items (3-Day Activation Policy)
            </div>
            <div className="space-y-3">
              {purchasedItems.map((item) => {
                const status = getLockStatus(item.purchaseDate);
                return (
                  <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      {status.locked ? (
                        <div className="flex items-center gap-1.5 text-rose-500 text-[10px] font-black uppercase tracking-widest">
                          <Lock className="w-3 h-3" /> Locked: {status.daysLeft} days left
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                          <CheckCircle className="w-3 h-3" /> Unlocked & Ready
                        </div>
                      )}
                      {!status.locked && (
                        <button className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:underline">
                          Open Content
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                const event = new CustomEvent('navigate', { detail: 'subscription-management' });
                window.dispatchEvent(event);
              }}
              className="w-full mt-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 dark:text-indigo-400 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Manage Subscription
            </button>
            <button
              onClick={() => {
                const event = new CustomEvent('navigate', { detail: 'api-keys' });
                window.dispatchEvent(event);
              }}
              className="w-full mt-2 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800 dark:text-slate-300 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" />
              Credits & API Keys
            </button>
          </div>
        </div>

        {/* Security & Privacy */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-none md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
              <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Security & Privacy</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Private Profile Mode</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Hide your profile from search and restrict visibility. Disables direct settings access if enabled.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isPrivate} 
                  onChange={(e) => setIsPrivate(e.target.checked)} 
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 dark:peer-focus:ring-rose-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-rose-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Login/Logout Notifications</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Receive an email alert whenever your account is accessed.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Data Leak Alerts</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Get notified immediately if any suspicious activity or data breach is detected.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className={`bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-none relative overflow-hidden transition-all ${isPrivate ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
          {isPrivate && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/10 backdrop-blur-[2px] z-20">
              <Lock className="w-8 h-8 text-slate-600 mb-2" />
              <p className="text-xs font-black uppercase tracking-widest text-slate-600">Settings Restricted</p>
              <p className="text-[10px] text-slate-500">Disable Private Mode to access</p>
            </div>
          )}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
              <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('profile.preferences')}</h3>
          </div>
          <div className="space-y-2">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors group">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">App Language</span>
                  </div>
                  <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="bg-transparent border-none text-sm text-slate-500 focus:ring-0 cursor-pointer outline-none text-right"
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
                    <option value="ja">Japanese (日本語)</option>
                    <option value="ko">Korean (한국어)</option>
                    <option value="zh">Chinese (中文)</option>
                    <option value="ar">Arabic (العربية)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors group border-t border-slate-100 dark:border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <Languages className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">Target Language</span>
                  </div>
                  <select 
                    value={targetLanguage} 
                    onChange={(e) => setTargetLanguage(e.target.value as Language)}
                    className="bg-transparent border-none text-sm text-slate-500 focus:ring-0 cursor-pointer outline-none text-right"
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
                    <option value="ja">Japanese (日本語)</option>
                    <option value="ko">Korean (한국어)</option>
                    <option value="zh">Chinese (中文)</option>
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

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-none">
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
