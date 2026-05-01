import { HashRouter, useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { curriculum, DaySession } from './data/curriculum';
import { doc, getDoc, setDoc, onSnapshot, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebase';
import { useLiveAPI } from './hooks/useLiveAPI';
import { AudioVisualizer } from './components/AudioVisualizer';
import { ReportsView } from './components/ReportsView';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { ProfilePage } from './components/ProfilePage';
import { MainDashboard } from './components/MainDashboard';
import { SectionDashboard } from './components/SectionDashboard';
import { DailyTalk } from './components/DailyTalk';
import { Chatbot } from './components/Chatbot';
import { CallsDashboard } from './components/CallsDashboard';
import { NearbyClasses } from './components/NearbyClasses';
import { SearchBar } from './components/SearchBar';
import { QuickTranslate } from './components/QuickTranslate';
import { AudioTranslator } from './components/AudioTranslator';
import { CheckCircle, Circle, Play, Square, ChevronLeft, ChevronRight, Mic, Target, BookOpen, BarChart2, Moon, Sun, Shield, User, Users, LayoutDashboard, ArrowRight, Volume2, Clock, AlertCircle, Star, Award, TrendingUp, Brain, MessageCircle, RefreshCw, Lock, Youtube, Share2, MapPin, Languages, ArrowUp, Home, Menu, X, Loader2, MessageSquare, FileText, Layers, CheckSquare, Headphones, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './contexts/LanguageContext';

import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { LanguageLearningView } from './components/LanguageLearningView';
import { SessionView } from './components/SessionView';
import { PremiumUpgrade } from './components/PremiumUpgrade';
import { VocabularyReview } from './components/VocabularyReview';
import { GrammarDrill } from './components/GrammarDrill';
import { SubscriptionManagement } from './components/SubscriptionManagement';
import { ApiKeysManagement } from './components/ApiKeysManagement';
import { GlobalDictionary } from './components/GlobalDictionary';
import { MyFiles } from './components/MyFiles';
import { FeedbackOverlay } from './components/FeedbackOverlay';

import { TextGenerator } from './components/TextGenerator';
import { TeacherDashboard } from './components/TeacherDashboard';
import { Practice } from './components/Practice';
import { TaskManager } from './components/TaskManager';
import { ShadowingPractice } from './components/ShadowingPractice';
import { TutorsList } from './components/TutorsList';
import { TrialBanner, TrialModal } from './components/TrialBanner';
import { LanguageSwitcher } from './components/LanguageSwitcher';

import { ThematicVocabBuilder } from './components/ThematicVocabBuilder';
import { CulturalNormsPractice } from './components/CulturalNormsPractice';
import { RolePlayScenarios } from './components/RolePlayScenarios';
import { OnboardingFlow } from './components/OnboardingFlow';
import { Leaderboard } from './components/Leaderboard';

type ViewState = 'landing' | 'login' | 'dashboard' | 'daily-talk' | 'journey' | 'language-learning' | 'reports' | 'profile' | 'section' | 'calls' | 'privacy' | 'terms' | 'nearby' | 'translate' | 'upgrade' | 'vocabulary' | 'grammar-drill' | 'subscription-management' | 'api-keys' | 'my-files' | 'practice' | 'tutors' | 'text-generator' | 'roleplay' | 'culture' | 'vocab-builder' | 'tasks' | 'shadowing' | 'leaderboard';

function AppContent() {
  const [selectedDay, setSelectedDay] = useState<DaySession | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  let currentView = location.pathname.substring(1) as ViewState;
  if (!currentView || (currentView as string) === '') currentView = 'landing';

  const setCurrentView = (view: ViewState) => {
    navigate(`/${view}`);
  };

  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'teacher'>(() => (localStorage.getItem('userRole') as 'student' | 'teacher') || 'student');
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
  const [ completedSessions, setCompletedSessions] = useState<number[]>(() => {
    const stored = localStorage.getItem('completedSessions');
    return stored ? JSON.parse(stored) : [];
  });
  
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackSession, setFeedbackSession] = useState('');

  const { t, dir } = useLanguage();

  const handleFeedbackSubmit = async (feedback: { rating: number; text: string; keywords: string[] }) => {
    if (!auth.currentUser) return;
    
    try {
      await addDoc(collection(db, 'feedbacks'), {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        sessionTitle: feedbackSession,
        rating: feedback.rating,
        text: feedback.text,
        keywords: feedback.keywords,
        createdAt: serverTimestamp()
      });
      console.log('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const [isAuthReady, setIsAuthReady] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  useEffect(() => {
    if (lastLessonDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const last = new Date(lastLessonDate);
      last.setHours(0, 0, 0, 0);
      
      const diffTime = today.getTime() - last.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 1) {
        setStreak(0);
        localStorage.setItem('streak', '0');
      }
    }
  }, [lastLessonDate]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setIsAuthReady(true);
      if (user && currentView === 'landing') {
        setCurrentView('dashboard');
      }
    });
    return () => unsubscribe();
  }, [currentView]);

  // Sync with Firestore
  useEffect(() => {
    if (!isAuthenticated || !auth.currentUser) return;

    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    
    // Initial fetch
    getDoc(userDocRef).then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.userRole) setUserRole(data.userRole);
        if (data.streak !== undefined) setStreak(data.streak);
        if (data.isPro !== undefined) setIsPro(data.isPro);
        if (data.completedSessions) setCompletedSessions(data.completedSessions);
        if (data.lastLessonDate) setLastLessonDate(data.lastLessonDate);
        if (data.premiumUntil) setPremiumUntil(data.premiumUntil);
      } else {
        // Initialize Firestore with current localStorage data if new
        setDoc(userDocRef, {
          uid: auth.currentUser!.uid,
          role: 'user',
          userRole,
          streak,
          isPro,
          completedSessions,
          lastLessonDate,
          premiumUntil
        });
      }
    });

    const unsub = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        // Update local state if Firestore changed (from another device)
        if (data.streak !== undefined) setStreak(data.streak);
        if (data.completedSessions) setCompletedSessions(data.completedSessions);
      }
    });

    return () => unsub();
  }, [isAuthenticated]);

  const updateFirestoreProfile = (updates: any) => {
    if (isAuthenticated && auth.currentUser) {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      setDoc(userDocRef, updates, { merge: true });
    }
  };

  const handleLessonComplete = () => {
    const today = new Date().toDateString();
    let newStreak = streak;
    let newLastDate = lastLessonDate;

    if (lastLessonDate !== today) {
      newStreak = streak + 1;
      newLastDate = today;
      setStreak(newStreak);
      setLastLessonDate(today);
      localStorage.setItem('streak', newStreak.toString());
      localStorage.setItem('lastLessonDate', today);
    }
    
    let newCompleted = completedSessions;
    if (selectedDay) {
      if (!completedSessions.includes(selectedDay.day)) {
        newCompleted = [...completedSessions, selectedDay.day];
        setCompletedSessions(newCompleted);
        localStorage.setItem('completedSessions', JSON.stringify(newCompleted));
      }
    }

    updateFirestoreProfile({
      streak: newStreak,
      lastLessonDate: newLastDate,
      completedSessions: newCompleted
    });

    if (selectedDay) {
      setFeedbackSession(`Day ${selectedDay.day}: ${selectedDay.topic}`);
      setShowFeedback(true);
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

    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<ViewState>;
      setCurrentView(customEvent.detail);
    };
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
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
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<ViewState>;
      if (isLocked && customEvent.detail !== 'profile' && customEvent.detail !== 'upgrade') {
        return;
      }
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
  }, [isLocked]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  useEffect(() => {
    if (isTrialExpired && !hasActivePro && isAuthenticated) {
      const modalShown = sessionStorage.getItem('trialModalShown');
      if (!modalShown) {
        setShowTrialModal(true);
        sessionStorage.setItem('trialModalShown', 'true');
      }
    }
  }, [isTrialExpired, hasActivePro, isAuthenticated]);

  useEffect(() => {
    const handleNavigate = (e: any) => {
      const view = e.detail as ViewState;
      setCurrentView(view);
    };
    window.addEventListener('navigate', handleNavigate);
    return () => window.removeEventListener('navigate', handleNavigate);
  }, []);

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
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/privacy" element={<PrivacyPolicy onBack={() => setCurrentView('login')} />} />
          <Route path="/terms" element={<TermsOfService onBack={() => setCurrentView('login')} />} />
          <Route path="/" element={<LandingPage onLogin={() => setCurrentView('login')} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    );
  }

  const navTabs: { id: string, label: string, icon: any, mobileOnly?: boolean }[] = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { id: 'practice', label: 'Practice', icon: BookOpen },
    { id: 'journey', label: t('nav.curriculum'), icon: BookOpen },
    { id: 'shadowing', label: 'Shadowing', icon: Headphones },
    { id: 'calls', label: 'Calls', icon: MessageCircle },
    { id: 'language-learning', label: 'AI Tutor', icon: Brain },
    { id: 'tutors', label: 'Tutors', icon: Users },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'daily-talk', label: 'Daily Talks', icon: MessageSquare },
    { id: 'reports', label: 'Reports', icon: BarChart2 },
    { id: 'translate', label: 'Translate', icon: Languages },
    { id: 'text-generator', label: 'Writer AI', icon: FileText },
    { id: 'vocab-builder', label: 'Themes', icon: Layers },
    { id: 'culture', label: 'Culture', icon: AlertCircle },
    { id: 'roleplay', label: 'Roleplay', icon: Target },
    { id: 'nearby', label: 'Nearby', icon: MapPin },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
  ];

  const handleSwipe = (direction: number) => {
    if (isLocked) return;
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
    <div dir={dir} className={`min-h-[100dvh] flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-all duration-300 ${isMobileMenuOpen ? 'overflow-hidden' : ''}`}>
      {showOnboarding && <OnboardingFlow onComplete={() => setShowOnboarding(false)} />}
      <GlobalDictionary />
      <TrialBanner 
        isLocked={isLocked && isAuthenticated} 
        onUpgrade={() => setCurrentView('upgrade')} 
      />

      <TrialModal 
        isOpen={showTrialModal} 
        onClose={() => setShowTrialModal(false)}
        onUpgrade={() => {
          setShowTrialModal(false);
          setCurrentView('upgrade');
        }}
      />

      <div className="flex flex-col flex-1">
        <header className={`sticky top-0 left-0 right-0 z-50 bg-white/100 dark:bg-slate-900/100 border-b border-slate-200 dark:border-slate-800 transition-all duration-300 shadow-none ${isMobileMenuOpen ? 'blur-sm brightness-95' : ''}`}>
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            {selectedDay ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSelectedDay(null)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-all flex items-center gap-1 font-bold text-xs"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
              </div>
            ) : (
              <button 
                className="lg:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            <div 
              className="flex items-center gap-2 cursor-pointer ml-1 group" 
              onClick={() => { setCurrentView('dashboard'); setSelectedDay(null); }}
            >
              <div className="w-8 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-xl tracking-tighter dark:text-white leading-none">English Master</h1>
                  <span className="font-black text-[10px] px-1.5 py-0.5 rounded bg-amber-500 text-white tracking-widest leading-none mt-0.5">RRR</span>
                </div>
                <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 tracking-widest uppercase mt-0.5">Read, Repeat, Respond.</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <LanguageSwitcher />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setCurrentView('upgrade'); setSelectedDay(null); }}
              className={`flex items-center gap-2 px-3 py-2 md:px-4 ${isPro ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'} text-white text-sm font-bold rounded-lg shadow-none transition-all`}
            >
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">{isPro ? 'Pro Member' : 'Upgrade Plan'}</span>
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

        <div className="flex flex-1 w-full max-w-[1600px] mx-auto relative">
          {/* Persistent Sidebar for Large Screens */}
          <aside className={`hidden lg:flex flex-col transition-[width,min-width] duration-300 ease-in-out border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-[64px] self-start h-[calc(100vh-64px)] z-40 overflow-x-hidden ${isSidebarCollapsed ? 'w-[72px] min-w-[72px]' : 'w-64 min-w-[64px]'}`}>
          <div className="p-4 space-y-1 relative">
            <div className={`flex items-center mb-2 px-1 ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
              {!isSidebarCollapsed && (
                <span className="px-2 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 whitespace-nowrap">Menu</span>
              )}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-colors"
                aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>
            </div>
            {navTabs.slice(0, -2).map((tab) => {
              const isActive = currentView === tab.id && !selectedDay;
              return (
                <button
                  key={tab.id}
                  title={isSidebarCollapsed ? tab.label : undefined}
                  onClick={() => { 
                    if (isLocked) return;
                    setCurrentView(tab.id as ViewState); 
                    setSelectedDay(null); 
                  }}
                  disabled={isLocked}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3 text-sm font-medium rounded-xl transition-all ${
                    isActive 
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                      : isLocked 
                        ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                  {!isSidebarCollapsed && <span className="whitespace-nowrap">{tab.label}</span>}
                  {!isSidebarCollapsed && isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0"></div>}
                </button>
              );
            })}
            
            {/* Separator / Dash */}
            <div className="my-4 px-4">
              <div className="h-px bg-slate-200 dark:bg-slate-800 w-full"></div>
            </div>

            {navTabs.slice(-2).map((tab) => {
              const isActive = currentView === tab.id && !selectedDay;
              return (
                <button
                  key={tab.id}
                  title={isSidebarCollapsed ? tab.label : undefined}
                  onClick={() => { 
                    if (isLocked) return;
                    setCurrentView(tab.id as ViewState); 
                    setSelectedDay(null); 
                  }}
                  disabled={isLocked}
                  className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3 text-sm font-medium rounded-xl transition-all ${
                    isActive 
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                      : isLocked 
                        ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                  {!isSidebarCollapsed && <span className="whitespace-nowrap">{tab.label}</span>}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content Area */}
        <div className={`flex-1 min-w-0 transition-all duration-300`}>

          <main className={`px-4 py-6 pb-24 md:pb-8 transition-all duration-300 ${isMobileMenuOpen ? 'blur-sm brightness-95' : ''}`}>
        {isLocked && (
          <div className="mb-8 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 p-6 rounded-2xl flex items-start gap-4 cursor-pointer" onClick={() => setCurrentView('profile')}>
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
              nextSession={curriculum.find(d => d.day === selectedDay.day + 1)}
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
          ) : (
            <Routes location={location} key={location.pathname}>
              <Route path="/dashboard" element={
                userRole === 'teacher' ? (
                  <TeacherDashboard />
                ) : (
                  <MainDashboard 
                    streak={streak}
                    isPro={hasActivePro}
                    isLocked={isLocked}
                    completedSessions={completedSessions}
                    onSelectDay={setSelectedDay} 
                    onSelectSection={(section) => {
                      setSelectedSection(section);
                      setCurrentView('section');
                    }}
                  />
                )
              } />
              <Route path="/daily-talk" element={
                <div className="max-w-4xl mx-auto py-4">
                  <DailyTalk isLocked={isLocked} />
                </div>
              } />
              <Route path="/section" element={
                selectedSection ? (
                  <SectionDashboard 
                    sectionName={selectedSection}
                    isLocked={isLocked}
                    onBack={() => {
                      setCurrentView('dashboard');
                      setSelectedSection(null);
                    }}
                  />
                ) : <Navigate to="/dashboard" replace />
              } />
              <Route path="/journey" element={
                <JourneyView onSelectDay={setSelectedDay} isLocked={isLocked} completedSessions={completedSessions} />
              } />
              <Route path="/language-learning" element={
                <LanguageLearningView isLocked={isLocked} />
              } />
              <Route path="/text-generator" element={
                <TextGenerator />
              } />
              <Route path="/tutors" element={
                <TutorsList isLocked={isLocked} />
              } />
              <Route path="/calls" element={
                <CallsDashboard 
                  isPro={hasActivePro} 
                  trialStartDate={trialStartDate} 
                  isLocked={isLocked}
                  onCallEnd={(userName) => {
                    setFeedbackSession(`Call with ${userName}`);
                    setShowFeedback(true);
                  }}
                  onSubmitFeedback={handleFeedbackSubmit}
                />
              } />
              <Route path="/shadowing" element={
                <ShadowingPractice />
              } />
              <Route path="/nearby" element={
                <NearbyClasses isLocked={isLocked} />
              } />
              <Route path="/leaderboard" element={
                <div className="max-w-4xl mx-auto py-8 h-[calc(100vh-160px)]">
                  <Leaderboard />
                </div>
              } />
              <Route path="/translate" element={
                <div className="max-w-3xl mx-auto py-8">
                  <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Translate</h2>
                  <div className="space-y-6">
                    <AudioTranslator isLocked={isLocked} />
                    <QuickTranslate isLocked={isLocked} />
                  </div>
                </div>
              } />
              <Route path="/privacy" element={
                <PrivacyPolicy onBack={() => setCurrentView(isAuthenticated ? 'profile' : 'login')} />
              } />
              <Route path="/terms" element={
                <TermsOfService onBack={() => setCurrentView(isAuthenticated ? 'profile' : 'login')} />
              } />
              <Route path="/reports" element={
                <ReportsView isLocked={isLocked} />
              } />
              <Route path="/profile" element={
                <ProfilePage 
                  isDark={isDark} 
                  onToggleDark={() => setIsDark(!isDark)} 
                  onLogout={handleLogout}
                  isPro={hasActivePro}
                  onUpgrade={() => {
                    setIsPro(true);
                    localStorage.setItem('isPro', 'true');
                  }}
                  streak={streak}
                  userRole={userRole}
                  onRoleChange={(role) => {
                    setUserRole(role);
                    localStorage.setItem('userRole', role);
                  }}
                />
              } />
              <Route path="/upgrade" element={
                <div className="max-w-3xl mx-auto py-8">
                  <PremiumUpgrade />
                </div>
              } />
              <Route path="/subscription-management" element={
                <SubscriptionManagement onBack={() => setCurrentView('profile')} />
              } />
              <Route path="/api-keys" element={
                <ApiKeysManagement onBack={() => setCurrentView('profile')} />
              } />
              <Route path="/vocabulary" element={
                <div className="max-w-3xl mx-auto py-8">
                  <VocabularyReview onBack={() => setCurrentView('dashboard')} isLocked={isLocked} />
                </div>
              } />
              <Route path="/practice" element={
                <Practice isLocked={isLocked} completedSessions={completedSessions} />
              } />
              <Route path="/roleplay" element={
                <RolePlayScenarios onBack={() => setCurrentView('dashboard')} />
              } />
              <Route path="/culture" element={
                <CulturalNormsPractice onBack={() => setCurrentView('dashboard')} />
              } />
              <Route path="/vocab-builder" element={
                <ThematicVocabBuilder onBack={() => setCurrentView('dashboard')} />
              } />
              <Route path="/tasks" element={
                <TaskManager />
              } />
              <Route path="/grammar-drill" element={
                <div className="max-w-4xl mx-auto py-8">
                  <GrammarDrill onBack={() => setCurrentView('dashboard')} isLocked={isLocked} />
                </div>
              } />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          )}
        </AnimatePresence>
          </main>
        </div>
      </div>

        {/* Mobile Bottom Navigation Bar - Visible on mobile only */}
        <nav className="lg:hidden sticky bottom-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pt-2 pb-2">
          <div className="flex items-center justify-around px-2 py-2">
            {[
              { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
              { id: 'practice', label: 'Practice', icon: BookOpen },
              { id: 'language-learning', label: 'AI Tutor', icon: Brain },
              { id: 'journey', label: 'Learn', icon: BookOpen },
              { id: 'profile', label: 'Profile', icon: User }
            ].map((tab) => {
              const isActive = currentView === tab.id && !selectedDay;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (isLocked && tab.id !== 'profile') return;
                    setCurrentView(tab.id as ViewState);
                    setSelectedDay(null);
                  }}
                  disabled={isLocked && tab.id !== 'profile'}
                  className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-colors ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : isLocked && tab.id !== 'profile'
                        ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <tab.icon className={`w-6 h-6 mb-1 ${isActive ? 'fill-indigo-100 dark:fill-indigo-900/30' : ''}`} />
                  <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Footer - Replaced with AI Tutorial Banner */}
      <footer className="bg-indigo-900 text-white mt-auto py-16 relative overflow-hidden lg:border-t lg:border-indigo-800 pb-safe pb-24 lg:pb-16">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/tech/1920/1080?blur=4')] mix-blend-overlay opacity-20 bg-cover bg-center"></div>
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Brain className="w-64 h-64 text-white" />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-12">
            <div className="text-center md:text-left max-w-2xl">
              <h3 className="text-4xl font-black tracking-tight mb-4 text-white leading-tight">Experience modern AI Language Training</h3>
              <p className="text-indigo-200 text-lg font-medium opacity-80">
                Join thousands of students mastering spoken English through immersion. Our AI tutors provide a safe, high-quality practice environment available 24/7.
              </p>
            </div>
            <button 
              onClick={() => {
                if (!isLocked) {
                  setCurrentView('language-learning');
                  setSelectedDay(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="px-10 py-5 bg-white text-indigo-900 rounded-[1.5rem] font-black text-lg hover:bg-slate-50 transition-all shadow-none hover:-translate-y-1 active:scale-95 flex items-center gap-3 whitespace-nowrap"
            >
              <Brain className="w-6 h-6" />
              Try AI Tutor Now
            </button>
          </div>

          <div className="pt-12 border-t border-indigo-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                 <Mic className="w-4 h-4 text-white" />
              </div>
              <span className="font-black tracking-tighter text-lg">English Mastery</span>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8">
              <button onClick={() => setCurrentView('terms')} className="text-sm font-bold text-indigo-300 hover:text-white transition-colors">Terms of Service</button>
              <button onClick={() => setCurrentView('privacy')} className="text-sm font-bold text-indigo-300 hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => setCurrentView('tutors')} className="text-sm font-bold text-indigo-300 hover:text-white transition-colors">Our Tutors</button>
            </div>

            <p className="text-xs font-bold text-indigo-400/60 tracking-widest uppercase">
              © 2024 AI Language Lab. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Hamburger Menu Drawer - Visible on mobile only */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              drag="x"
              dragConstraints={{ left: -100, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50 || info.velocity.x < -500) {
                  setIsMobileMenuOpen(false);
                }
              }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-slate-900 z-50 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                <div 
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => {
                    setCurrentView('dashboard');
                    setSelectedDay(null);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="w-10 h-10 bg-indigo-600 dark:bg-indigo-500 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200 dark:shadow-none">
                    <Mic className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="font-bold text-xl tracking-tight dark:text-white">English Mastery</h1>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="p-2.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 ml-2">Menu</div>
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
                      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${
                        isActive 
                          ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold shadow-sm' 
                          : isLocked 
                            ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      <tab.icon className={`w-5 h-5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
                      <span className="text-base">{tab.label}</span>
                      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>}
                    </button>
                  )
                })}
                
                <div className="my-6 border-t border-slate-100 dark:border-slate-800/50"></div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 ml-2">Account</div>
                
                <button
                  onClick={() => {
                    if (isLocked) return;
                    setCurrentView('profile');
                    setSelectedDay(null);
                    setIsMobileMenuOpen(false);
                  }}
                  disabled={isLocked}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${
                    currentView === 'profile' 
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold shadow-sm' 
                      : isLocked 
                        ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <User className={`w-5 h-5 ${currentView === 'profile' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span className="text-base">Profile</span>
                  {currentView === 'profile' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>}
                </button>
              </div>
              <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <button
                  onClick={() => {
                    setIsDark(!isDark);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {isDark ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-500" />}
                    <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                  </div>
                  <div className={`w-10 h-6 shrink-0 rounded-full transition-colors flex items-center px-1 ${isDark ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isDark ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
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
            className="fixed bottom-40 lg:bottom-24 right-4 lg:right-6 z-50 p-2.5 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {currentView === 'dashboard' && !selectedDay && (
        <Chatbot isLocked={isLocked} />
      )}

      <FeedbackOverlay 
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        onSubmit={handleFeedbackSubmit}
        sessionTitle={feedbackSession}
      />

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 px-4 shrink-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-bold text-xl tracking-tighter dark:text-white">English Master</h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Your AI-powered companion for mastering English fluency through real-world scenarios.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Learning</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <button 
                  onClick={() => {
                    setCurrentView('language-learning');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="hover:text-indigo-600 transition-colors flex items-center gap-2"
                >
                  <Brain className="w-4 h-4 text-indigo-500" /> AI Tutor (Up)
                </button>
              </li>
              <li><button onClick={() => setCurrentView('journey')} className="hover:text-indigo-600 transition-colors">Curriculum</button></li>
              <li><button onClick={() => setCurrentView('practice')} className="hover:text-indigo-600 transition-colors">Practice</button></li>
              <li><button onClick={() => setCurrentView('shadowing')} className="hover:text-indigo-600 transition-colors">Shadowing Academy</button></li>
              <li><button onClick={() => setCurrentView('leaderboard')} className="hover:text-indigo-600 transition-colors">Leaderboard</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Tools</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><button onClick={() => setCurrentView('translate')} className="hover:text-indigo-600 transition-colors">Audio Translator</button></li>
              <li><button onClick={() => setCurrentView('text-generator')} className="hover:text-indigo-600 transition-colors">AI Writer</button></li>
              <li><button onClick={() => setCurrentView('nearby')} className="hover:text-indigo-600 transition-colors">Nearby Classes</button></li>
              <li><button onClick={() => setCurrentView('vocabulary')} className="hover:text-indigo-600 transition-colors">Vocab Review</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><button onClick={() => setCurrentView('profile')} className="hover:text-indigo-600 transition-colors">Account Settings</button></li>
              <li><button onClick={() => setCurrentView('privacy')} className="hover:text-indigo-600 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => setCurrentView('terms')} className="hover:text-indigo-600 transition-colors">Terms of Service</button></li>
              <li><button onClick={() => {}} className="hover:text-indigo-600 transition-colors">Contact Us</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © 2026 English Master AI. All rights reserved.
          </p>
          <div className="flex gap-4">
             <button className="text-slate-400 hover:text-indigo-600 transition-colors"><Share2 className="w-4 h-4" /></button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

function JourneyView({ onSelectDay, isLocked = false, completedSessions = [] }: { onSelectDay: (day: DaySession) => void; key?: string; isLocked?: boolean; completedSessions?: number[] }) {
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
          Progress from basic vocabulary to professional negotiations.
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
                    tabIndex={isLocked ? -1 : 0}
                    onClick={() => { if (!isLocked) onSelectDay(day); }}
                    onKeyDown={(e) => { if (!isLocked && (e.key === 'Enter' || e.key === ' ')) onSelectDay(day); }}
                    className={`bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm ${isLocked ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/50 cursor-pointer'} transition-all text-left group flex flex-col h-full`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                        {isLocked ? <Lock className="w-3 h-3" /> : completedSessions.includes(day.day) ? <CheckCircle className="w-3 h-3 text-emerald-500" /> : null} Day {day.day}
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
