import { useState, useEffect, useRef } from 'react';
import { curriculum, DaySession } from './data/curriculum';
import { useLiveAPI } from './hooks/useLiveAPI';
import { AudioVisualizer } from './components/AudioVisualizer';
import { ReportsView } from './components/ReportsView';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { ProfilePage } from './components/ProfilePage';
import { MainDashboard } from './components/MainDashboard';
import { SectionDashboard } from './components/SectionDashboard';
import { Chatbot } from './components/Chatbot';
import { CallsDashboard } from './components/CallsDashboard';
import { NearbyClasses } from './components/NearbyClasses';
import { SearchBar } from './components/SearchBar';
import { QuickTranslate } from './components/QuickTranslate';
import { CheckCircle, Circle, Play, Square, ChevronLeft, ChevronRight, Mic, Target, BookOpen, BarChart2, Moon, Sun, Shield, User, LayoutDashboard, ArrowRight, Volume2, Clock, AlertCircle, Star, Award, TrendingUp, Brain, MessageCircle, RefreshCw, Lock, Youtube, Share2, MapPin, Languages, ArrowUp, Home, Menu, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './contexts/LanguageContext';
import { GoogleGenAI } from '@google/genai';

import { PrivacyPolicy } from './components/PrivacyPolicy';
import { LanguageLearningView } from './components/LanguageLearningView';
import { SessionView } from './components/SessionView';
import { PremiumUpgrade } from './components/PremiumUpgrade';

type ViewState = 'landing' | 'login' | 'dashboard' | 'journey' | 'language-learning' | 'reports' | 'profile' | 'section' | 'calls' | 'privacy' | 'nearby' | 'translate' | 'upgrade';

export default function App() {
  const [selectedDay, setSelectedDay] = useState<DaySession | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPro, setIsPro] = useState(() => localStorage.getItem('isPro') === 'true');
  const [premiumUntil, setPremiumUntil] = useState<number | null>(() => {
    const stored = localStorage.getItem('premiumUntil');
    return stored ? parseInt(stored, 10) : null;
  });
  const [trialStartDate, setTrialStartDate] = useState<number | null>(() => {
    const stored = localStorage.getItem('trialStartDate');
    return stored ? parseInt(stored, 10) : null;
  });
  const [isTrialExpired, setIsTrialExpired] = useState(false);
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('streak') || '0', 10));
  const [lastLessonDate, setLastLessonDate] = useState(() => localStorage.getItem('lastLessonDate') || '');
  const { t, dir } = useLanguage();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  useEffect(() => {
    import('./firebase').then(({ auth }) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setIsAuthenticated(!!user);
        setIsAuthReady(true);
        if (user && currentView === 'landing') {
          setCurrentView('dashboard');
        }
      });
      return () => unsubscribe();
    });
  }, [currentView]);

  const handleLessonComplete = () => {
    const today = new Date().toDateString();
    if (lastLessonDate !== today) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setLastLessonDate(today);
      localStorage.setItem('streak', newStreak.toString());
      localStorage.setItem('lastLessonDate', today);
    }
  };

  const hasActivePro = isPro || (premiumUntil !== null && Date.now() < premiumUntil);
  const isLocked = isTrialExpired && !hasActivePro;

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    // Check for invite link parameter
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get('invite');
    
    if (inviteCode) {
      const inviteClaimed = localStorage.getItem('inviteClaimed');
      if (!inviteClaimed) {
        // Grant 3 days free premium
        const expiry = Date.now() + 3 * 24 * 60 * 60 * 1000;
        localStorage.setItem('premiumUntil', expiry.toString());
        localStorage.setItem('inviteClaimed', 'true');
        setPremiumUntil(expiry);
        alert('Welcome! You have received 3 Days of Free Premium via the invite link!');
      }
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Scroll to top when navigating between views, sections, or days
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [currentView, selectedDay, selectedSection]);

  useEffect(() => {
    if (isAuthenticated && !trialStartDate) {
      const now = Date.now();
      localStorage.setItem('trialStartDate', now.toString());
      setTrialStartDate(now);
    }
  }, [isAuthenticated, trialStartDate]);

  useEffect(() => {
    const checkTrial = () => {
      if (!trialStartDate) return;
      const ONE_DAY = 24 * 60 * 60 * 1000;
      if (Date.now() - trialStartDate > ONE_DAY) {
        setIsTrialExpired(true);
      } else {
        setIsTrialExpired(false);
      }
    };
    
    checkTrial();
    const interval = setInterval(checkTrial, 60000);
    return () => clearInterval(interval);
  }, [trialStartDate]);

  useEffect(() => {
    if (isLocked && currentView !== 'profile') {
      setCurrentView('profile');
      setSelectedDay(null);
    }
  }, [isLocked, currentView]);

  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<ViewState>;
      setCurrentView(customEvent.detail);
      setSelectedDay(null);
    };
    const handlePremiumUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      setPremiumUntil(customEvent.detail);
    };
    window.addEventListener('navigate', handleNavigate);
    window.addEventListener('premiumUpdated', handlePremiumUpdate);
    return () => {
      window.removeEventListener('navigate', handleNavigate);
      window.removeEventListener('premiumUpdated', handlePremiumUpdate);
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = async () => {
    try {
      const { auth } = await import('./firebase');
      await auth.signOut();
      setIsAuthenticated(false);
      setCurrentView('landing');
      setSelectedDay(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };
  
  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not authenticated, only show landing or login
  if (!isAuthenticated) {
    return (
      <AnimatePresence mode="wait">
        {currentView === 'login' ? (
          <LoginPage key="login" onLoginSuccess={handleLoginSuccess} />
        ) : (
          <LandingPage key="landing" onLogin={() => setCurrentView('login')} />
        )}
      </AnimatePresence>
    );
  }

  const navTabs: { id: string, label: string, icon: any, mobileOnly?: boolean }[] = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { id: 'journey', label: t('nav.curriculum'), icon: BookOpen },
    { id: 'language-learning', label: 'Tutor', icon: Brain },
    { id: 'calls', label: 'Calls', icon: MessageCircle },
    { id: 'nearby', label: 'Nearby', icon: MapPin },
    { id: 'reports', label: t('nav.reports'), icon: BarChart2 },
    { id: 'translate', label: 'Translate', icon: Languages }
  ];

  const handleSwipe = (direction: number) => {
    const currentIndex = navTabs.findIndex(t => t.id === currentView);
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= navTabs.length) newIndex = navTabs.length - 1;
    
    if (newIndex !== currentIndex) {
      setSwipeDirection(direction);
      setCurrentView(navTabs[newIndex].id as ViewState);
      setSelectedDay(null);
    }
  };

  return (
    <div dir={dir} className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-all duration-300 ${isMobileMenuOpen ? 'overflow-hidden' : ''}`}>
      <header className={`bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 transition-all duration-300 ${isMobileMenuOpen ? 'blur-sm brightness-95' : ''}`}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <button 
              className="md:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => { setCurrentView('dashboard'); setSelectedDay(null); }}
            >
              <div className="w-8 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-lg flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-bold text-xl tracking-tight dark:text-white hidden sm:block">English Mastery 30</h1>
            </div>
          </div>
          
          <div className="flex-1 max-w-md hidden md:block">
            <SearchBar 
              onNavigate={(view) => { setCurrentView(view as ViewState); setSelectedDay(null); }} 
              onSelectDay={setSelectedDay} 
            />
          </div>
          
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setCurrentView('upgrade'); setSelectedDay(null); }}
              className={`flex items-center gap-2 px-3 py-2 md:px-4 ${isPro ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600' : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'} text-white text-sm font-bold rounded-lg shadow-sm transition-all hover:shadow-md`}
            >
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">{isPro ? 'Pro Member' : 'Upgrade Plan'}</span>
              <span className="sm:hidden">{isPro ? 'Pro' : 'Upgrade'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={async () => {
                const inviteLink = `${window.location.origin}?invite=true`;
                
                const handleShareReward = () => {
                  const hasShared = localStorage.getItem('hasSharedInvite');
                  if (!hasShared) {
                    const currentExpiry = premiumUntil && premiumUntil > Date.now() ? premiumUntil : Date.now();
                    const newExpiry = currentExpiry + 3 * 24 * 60 * 60 * 1000;
                    localStorage.setItem('premiumUntil', newExpiry.toString());
                    localStorage.setItem('hasSharedInvite', 'true');
                    setPremiumUntil(newExpiry);
                    alert('Thanks for sharing! You have been rewarded with 3 days of free Premium!');
                  }
                };

                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: 'English Mastery 30',
                      text: 'Join me and get 3 days of free Premium!',
                      url: inviteLink
                    });
                    handleShareReward();
                    return;
                  } catch (err) {
                    console.log('Share canceled or failed', err);
                  }
                }
                
                try {
                  await navigator.clipboard.writeText(inviteLink);
                  alert('Invite link copied! Share it with friends to give them 3 days of free Premium.');
                  handleShareReward();
                } catch (err) {
                  const textArea = document.createElement("textarea");
                  textArea.value = inviteLink;
                  document.body.appendChild(textArea);
                  textArea.select();
                  try {
                    document.execCommand('copy');
                    alert('Invite link copied! Share it with friends to give them 3 days of free Premium.');
                    handleShareReward();
                  } catch (e) {
                    prompt("Copy this link to invite friends:", inviteLink);
                    handleShareReward();
                  }
                  document.body.removeChild(textArea);
                }
              }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 text-sm font-bold rounded-lg shadow-sm transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Invite Friends</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDark(!isDark)}
              className="hidden md:flex p-2 rounded-lg transition-colors text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            
            <button
              onClick={() => { setCurrentView('profile'); setSelectedDay(null); }}
              className={`p-2 rounded-lg transition-colors ${
                currentView === 'profile'
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              aria-label="Profile"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Top Navigation Carousel */}
      <nav className={`md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden sticky top-16 z-10 transition-all duration-300 ${isMobileMenuOpen ? 'blur-sm brightness-95' : ''}`}>
        <div className="flex flex-col items-center py-3">
          <div className="w-full flex items-center justify-between px-4 mb-2">
            <button 
              onClick={() => handleSwipe(-1)} 
              disabled={navTabs.findIndex(t => t.id === currentView) <= 0}
              className="p-2 text-slate-400 disabled:opacity-30"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="relative w-48 h-8 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="popLayout" custom={swipeDirection}>
                <motion.div
                  key={currentView}
                  custom={swipeDirection}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 50 : -50 }),
                    center: { opacity: 1, x: 0 },
                    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -50 : 50 })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset }) => {
                    const swipe = offset.x;
                    if (swipe < -50) {
                      handleSwipe(1);
                    } else if (swipe > 50) {
                      handleSwipe(-1);
                    }
                  }}
                  className="absolute flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400 cursor-grab active:cursor-grabbing"
                >
                  {(() => {
                    const tab = navTabs.find(t => t.id === currentView) || navTabs[0];
                    return (
                      <>
                        <tab.icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>

            <button 
              onClick={() => handleSwipe(1)} 
              disabled={navTabs.findIndex(t => t.id === currentView) >= navTabs.length - 1 || navTabs.findIndex(t => t.id === currentView) === -1}
              className="p-2 text-slate-400 disabled:opacity-30"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex gap-1.5">
            {navTabs.map((tab, i) => (
              <div 
                key={tab.id} 
                className={`w-2 h-2 rounded-full transition-colors ${
                  navTabs.findIndex(t => t.id === currentView) === i 
                    ? 'bg-indigo-600 dark:bg-indigo-400' 
                    : 'bg-slate-200 dark:bg-slate-700'
                }`} 
              />
            ))}
          </div>
        </div>
      </nav>

      <nav className={`hidden md:block bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-all duration-300 ${isMobileMenuOpen ? 'blur-sm brightness-95' : ''}`}>
        <div className="max-w-6xl mx-auto px-4 py-3">
          {/* Desktop Navigation */}
          <div className="flex items-center justify-center gap-4">
            {navTabs.map((tab) => {
              const isActive = currentView === tab.id && !selectedDay;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { 
                    if (isLocked) return;
                    setCurrentView(tab.id as ViewState); 
                    setSelectedDay(null); 
                  }}
                  disabled={isLocked}
                  className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors whitespace-nowrap ${
                    isActive 
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' 
                      : isLocked 
                        ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className={`max-w-6xl mx-auto px-4 py-8 transition-all duration-300 ${isMobileMenuOpen ? 'blur-sm brightness-95' : ''}`}>
        {isLocked && currentView === 'profile' && (
          <div className="mb-8 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 p-6 rounded-2xl flex items-start gap-4">
            <div className="p-3 bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-rose-900 dark:text-rose-100 mb-1">Free Trial Expired</h3>
              <p className="text-rose-700 dark:text-rose-300">
                Your 1-day free trial has ended. Please upgrade to Premium to unlock all features and continue your English mastery journey.
              </p>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {selectedDay ? (
            <SessionView 
              key="session" 
              session={selectedDay} 
              onBack={() => setSelectedDay(null)}
              onComplete={handleLessonComplete}
              onNextSession={() => {
                const currentIndex = curriculum.findIndex(d => d.day === selectedDay.day);
                if (currentIndex < curriculum.length - 1) {
                  setSelectedDay(curriculum[currentIndex + 1]);
                } else {
                  setSelectedDay(null);
                  setCurrentView('dashboard');
                }
              }}
            />
          ) : currentView === 'dashboard' ? (
            <MainDashboard 
              key="dashboard" 
              streak={streak}
              isPro={hasActivePro}
              onSelectDay={setSelectedDay} 
              onSelectSection={(section) => {
                setSelectedSection(section);
                setCurrentView('section');
              }}
            />
          ) : currentView === 'section' && selectedSection ? (
            <SectionDashboard 
              key="section"
              sectionName={selectedSection}
              onBack={() => {
                setCurrentView('dashboard');
                setSelectedSection(null);
              }}
            />
          ) : currentView === 'journey' ? (
            <JourneyView key="journey" onSelectDay={setSelectedDay} />
          ) : currentView === 'language-learning' ? (
            <LanguageLearningView key="language-learning" />
          ) : currentView === 'calls' ? (
            <CallsDashboard key="calls" isPro={hasActivePro} trialStartDate={trialStartDate} />
          ) : currentView === 'nearby' ? (
            <NearbyClasses key="nearby" />
          ) : currentView === 'translate' ? (
            <div key="translate" className="max-w-3xl mx-auto py-8">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Translate</h2>
              <QuickTranslate />
            </div>
          ) : currentView === 'privacy' ? (
            <PrivacyPolicy key="privacy" onBack={() => setCurrentView('profile')} />
          ) : currentView === 'reports' ? (
            <ReportsView key="reports" />
          ) : currentView === 'profile' ? (
            <ProfilePage 
              key="profile" 
              isDark={isDark} 
              onToggleDark={() => setIsDark(!isDark)} 
              onLogout={handleLogout}
              isPro={hasActivePro}
              onUpgrade={() => {
                setIsPro(true);
                localStorage.setItem('isPro', 'true');
              }}
              streak={streak}
            />
          ) : currentView === 'upgrade' ? (
            <div key="upgrade" className="max-w-3xl mx-auto py-8">
              <PremiumUpgrade />
            </div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Mobile Hamburger Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-3/4 max-w-sm bg-white dark:bg-slate-900 z-50 shadow-2xl md:hidden flex flex-col"
            >
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    setCurrentView('dashboard');
                    setSelectedDay(null);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="w-8 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-lg flex items-center justify-center">
                    <Mic className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="font-bold text-lg tracking-tight dark:text-white">Menu</h1>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {navTabs.map(tab => {
                  const isActive = currentView === tab.id && !selectedDay;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        if (isLocked) return;
                        setCurrentView(tab.id as ViewState);
                        setSelectedDay(null);
                        setIsMobileMenuOpen(false);
                      }}
                      disabled={isLocked}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        isActive 
                          ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium' 
                          : isLocked 
                            ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
                <button
                  onClick={() => {
                    if (isLocked) return;
                    setCurrentView('profile');
                    setSelectedDay(null);
                    setIsMobileMenuOpen(false);
                  }}
                  disabled={isLocked}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    currentView === 'profile' 
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium' 
                      : isLocked 
                        ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </button>
              </div>
              <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => {
                    setIsDark(!isDark);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-50 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <Chatbot />
    </div>
  );
}

function JourneyView({ onSelectDay }: { onSelectDay: (day: DaySession) => void; key?: string }) {
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];
  
  const playAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12 relative"
    >
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Full Curriculum</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Master spoken English through daily interactive AI conversations. 
          Progress from basic greetings to professional negotiations.
        </p>
      </div>

      <div className="space-y-12">
        {levels.map((level, idx) => {
          const days = curriculum.filter(d => d.level === level);
          if (days.length === 0) return null;
          
          return (
            <div key={level} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Phase {idx + 1}: {level}
                </h3>
                <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {days.map(day => (
                  <div
                    key={day.day}
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectDay(day)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectDay(day); }}
                    className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all text-left group flex flex-col h-full cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-full">
                        Day {day.day}
                      </span>
                      <button 
                        onClick={(e) => playAudio(e, `${day.topic}. ${day.description}`)}
                        className="p-1.5 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Listen to overview"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {day.topic}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-auto">
                      {day.description}
                    </p>
                    {(day.example || day.youtubeLink) && (
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                        {day.example && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 italic line-clamp-2">
                            "{day.example}"
                          </p>
                        )}
                        {day.youtubeLink && (
                          <a 
                            href={day.youtubeLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1.5 hover:underline font-medium" 
                            onClick={e => e.stopPropagation()}
                          >
                            <Youtube className="w-3.5 h-3.5" /> Watch Lesson
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
