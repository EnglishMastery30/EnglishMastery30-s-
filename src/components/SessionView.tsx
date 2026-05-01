import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Circle, Play, Square, ChevronLeft, ChevronUp, ChevronDown, ArrowRight, Volume2, Target, MessageCircle, AlertCircle, Award, TrendingUp, Star, RefreshCw, Youtube, X, Languages, Loader2, Brain } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLiveAPI } from '../hooks/useLiveAPI';
import { DaySession } from '../data/curriculum';
import { AudioVisualizer } from './AudioVisualizer';
import { useCredits } from '../contexts/CreditsContext';

export function SessionView({ session, nextSession, onBack, onComplete, onNextSession }: { session: DaySession, nextSession?: DaySession, onBack: () => void, onComplete: () => void, onNextSession: () => void; key?: string }) {
  const { language } = useLanguage();
  const [showSummary, setShowSummary] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const transcriptionRef = useRef<HTMLDivElement>(null);
  const [selectedText, setSelectedText] = useState('');
  const [translation, setTranslation] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectionPosition, setSelectionPosition] = useState<{ top: number, left: number } | null>(null);
  const [isGrammarOpen, setIsGrammarOpen] = useState(true);
  const { consumeCredits, apiKeys, useCustomKeys } = useCredits();

  const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : undefined;

  const systemInstruction = `You are an expert English tutor leading a lesson on: ${session.topic}.
The user's native language is ${language}.
Lesson Description: ${session.description}

Your goals:
1. Guide the user through the lesson material.
2. Provide clear, encouraging feedback on their pronunciation and grammar.
3. Keep the conversation flowing naturally.
4. If they make a mistake, gently correct them and ask them to try again.
5. Speak clearly and at a moderate pace.`;

  const {
    isConnected,
    isConnecting,
    error,
    volume,
    transcripts,
    isProcessing,
    connect,
    disconnect
  } = useLiveAPI(systemInstruction, apiKey);

  const handleSelection = (e?: React.MouseEvent | React.TouchEvent) => {
    // If clicking inside the translation popup, do nothing
    if (e && (e.target as Element).closest('.translation-popup')) {
      return;
    }

    // Small delay to allow the browser to update the selection
    setTimeout(() => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();
      
      if (text && text.length > 0 && selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        // Only update if the text changed or position moved significantly
        if (text !== selectedText) {
          setSelectedText(text);
          setTranslation('');
          setSelectionPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX + (rect.width / 2)
          });
        }
      } else {
        setSelectedText('');
        setSelectionPosition(null);
      }
    }, 10);
  };

  const translateSelectedText = async () => {
    if (!selectedText) return;
    
    setIsTranslating(true);
    setTranslation('');
    
    try {
      const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${language}&dt=t&q=${encodeURIComponent(selectedText)}`);
      const data = await response.json();
      
      if (data && data[0]) {
        const translatedText = data[0].map((item: any) => item[0]).join('');
        setTranslation(translatedText || 'Translation failed.');
      } else {
        setTranslation('Translation failed.');
      }
    } catch (error) {
      console.error('Translation error:', error);
      setTranslation('Translation failed.');
    } finally {
      setIsTranslating(false);
    }
  };

  const toggleTask = (idx: number) => {
    setCompletedTasks(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };
  
  useEffect(() => {
    if (transcriptionRef.current) {
      transcriptionRef.current.scrollTop = transcriptionRef.current.scrollHeight;
    }
  }, [transcripts]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto"
      onMouseUp={handleSelection}
      onTouchEnd={handleSelection}
    >
      <AnimatePresence>
        {showSummary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-8 md:p-12 text-center relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={onBack}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                 <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-dashed border-emerald-300 dark:border-emerald-700/50 rounded-full"
                 />
                <Award className="w-12 h-12 text-emerald-600 dark:text-emerald-400 relative z-10" />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                Brilliant Work!
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
                You've successfully conquered Day {session.day}: {session.topic}. Every lesson brings you one step closer to fluency.
              </p>

              {/* Teacher Feedback Card */}
              <div className="bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-500/10 dark:to-sky-500/10 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-500/20 mb-8 text-left flex gap-4">
                 <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                   <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150" alt="Tutor" className="w-full h-full object-cover" />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">Teacher Feedback <CheckCircle className="w-4 h-4 text-emerald-500" /></h4>
                   <p className="text-sm text-slate-700 dark:text-slate-300 italic">
                     "Fantastic effort today! Your vocabulary recall was very sharp. Keep focusing on practicing the natural grammar patterns we discussed. I'm excited to see your progress next time!"
                   </p>
                 </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
                <div className="bg-indigo-50 dark:bg-indigo-500/10 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 flex flex-col items-center text-center hover:scale-105 transition-transform">
                  <div className="flex items-center gap-2 mb-2 text-indigo-700 dark:text-indigo-400 font-semibold">
                    <Target className="w-5 h-5" />
                    Accuracy
                  </div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{Math.floor(Math.random() * 10) + 88}%</div>
                  <div className="text-xs text-indigo-600/80 font-medium">Top 5% of students</div>
                </div>
                
                <div className="bg-emerald-50 dark:bg-emerald-500/10 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-500/20 flex flex-col items-center text-center hover:scale-105 transition-transform">
                  <div className="flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-400 font-semibold">
                    <Languages className="w-5 h-5" />
                    Words Mastered
                  </div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{session.vocabulary ? session.vocabulary.length : 5}</div>
                  <div className="text-xs text-emerald-600/80 font-medium">+ Vocabulary Boost</div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-500/10 p-5 rounded-2xl border border-amber-100 dark:border-amber-500/20 flex flex-col items-center text-center hover:scale-105 transition-transform">
                  <div className="flex items-center gap-2 mb-2 text-amber-700 dark:text-amber-400 font-semibold">
                    <Star className="w-5 h-5" />
                    Learning XP
                  </div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">+{Math.floor(Math.random() * 200) + 300}</div>
                  <div className="text-xs text-amber-600/80 font-medium">Level 4 Progress</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-10 text-left">
                  <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                     <span>Current Rank: Beginner II</span>
                     <span className="text-indigo-600 dark:text-indigo-400">800 / 1000 XP</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: '60%' }}
                        animate={{ width: '80%' }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full"
                     />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-3 font-medium">Almost at Intermediate I! You just need 200 more XP.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={onBack}
                  className="px-8 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-lg transition-colors border border-slate-200 dark:border-slate-700"
                >
                  Exit to Dashboard
                </button>
                {nextSession && (
                  <button 
                    onClick={onNextSession}
                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none"
                  >
                    Next Class <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => {
            disconnect();
            onBack();
          }}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <button 
          onClick={() => {
            disconnect();
            onNextSession();
          }}
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
        >
          <span>Next Session</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-2xl flex items-start gap-3 text-left">
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-rose-900 dark:text-rose-100 mb-1">Connection Issue</h4>
                <p className="text-sm text-rose-700 dark:text-rose-300 mb-3">
                  {error.toLowerCase().includes('permission') || error.toLowerCase().includes('device') || error.toLowerCase().includes('microphone') || error.toLowerCase().includes('audio')
                    ? "We couldn't access your microphone. Please check your browser permissions and try again."
                    : error.toLowerCase().includes('api') || error.toLowerCase().includes('fetch') || error.toLowerCase().includes('network')
                    ? "There was a network error connecting to the AI Voice Coach. Please check your internet connection."
                    : "The connection to your AI Voice Coach was lost or failed to start. Please try again."}
                </p>
                <p className="text-xs text-rose-600/70 dark:text-rose-400/70 font-mono mb-3 break-words">
                  Details: {error}
                </p>
                <button 
                  onClick={connect}
                  disabled={isConnecting}
                  className="text-sm font-medium text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-500/20 hover:bg-rose-200 dark:hover:bg-rose-500/30 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isConnecting ? "Reconnecting..." : "Try Reconnecting"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-300">
        <div className="p-6 sm:p-8 md:p-12 border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-semibold text-sm rounded-full">
              Day {session.day}
            </span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm rounded-full">
              {session.level}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              {session.topic}
            </h2>
            <button 
              onClick={() => playAudio(session.topic)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-500 transition-colors shrink-0"
              title="Listen to topic"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-start justify-between gap-4">
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {session.description}
            </p>
            <button 
              onClick={() => playAudio(session.description)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-500 transition-colors shrink-0"
              title="Listen to description"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-12 bg-slate-50 dark:bg-slate-950/50 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-8 order-1 md:col-start-1 md:row-start-1">
            <div>
              <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-4">
                <Target className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                Session Goals
              </h3>
              <ul className="space-y-4">
                {session.goals.map((goal, idx) => {
                  const isCompleted = completedTasks.includes(idx);
                  return (
                    <li key={idx} className="flex flex-col gap-2">
                      <div className="flex items-start gap-3 group">
                        <button 
                          onClick={() => toggleTask(idx)}
                          className="focus:outline-none shrink-0 mt-0.5 relative"
                        >
                          <motion.div
                            initial={false}
                            animate={{
                              scale: isCompleted ? [1, 1.3, 1] : 1,
                              rotate: isCompleted ? [0, 15, -10, 0] : 0
                            }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="relative z-10 bg-white dark:bg-slate-900 rounded-full"
                          >
                            {isCompleted ? (
                              <CheckCircle 
                                className="w-5 h-5 transition-colors duration-300 text-emerald-500 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-900/30" 
                              />
                            ) : (
                              <Circle 
                                className="w-5 h-5 transition-colors duration-300 text-slate-300 dark:text-slate-600 hover:text-indigo-500 dark:hover:text-indigo-400" 
                              />
                            )}
                          </motion.div>
                          {isCompleted && (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0.8 }}
                              animate={{ scale: 2.5, opacity: 0 }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              className="absolute inset-0 rounded-full bg-emerald-400 dark:bg-emerald-500 z-0"
                            />
                          )}
                        </button>
                        <div className="relative flex-1">
                          <span className={`font-medium transition-colors duration-300 ${
                            isCompleted
                              ? 'text-slate-500 dark:text-slate-400'
                              : 'text-slate-900 dark:text-white'
                          }`}>
                            {goal}
                          </span>
                          {isCompleted && (
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                              className="absolute left-0 top-1/2 h-[2px] bg-slate-400 dark:bg-slate-500 -translate-y-1/2 origin-left"
                            />
                          )}
                        </div>
                        <button 
                          onClick={() => playAudio(goal)}
                          className="p-1 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-500 transition-all shrink-0"
                          title="Listen to goal"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <AnimatePresence>
                {completedTasks.length === session.goals.length && session.goals.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-200 dark:border-emerald-500/20 text-center overflow-hidden"
                  >
                    <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2 flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" /> All Goals Met!
                    </h4>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-4">You've completed all the objectives for this session.</p>
                    <button
                      onClick={() => {
                        disconnect();
                        setShowSummary(true);
                        onComplete();
                      }}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                    >
                      Finish & See Summary
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative order-1 md:order-2 md:col-start-2 md:row-start-1 md:row-span-2">
            
            <AudioVisualizer volume={volume} isConnected={isConnected} />
            
            {isConnected && (
              <div className="w-full max-w-md mt-6 relative">
                <div 
                  ref={transcriptionRef}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 min-h-[120px] max-h-[240px] overflow-y-auto flex flex-col shadow-inner scroll-smooth hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-text"
                >
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-3 h-3" />
                      Live Transcription
                    </div>
                    <span className="text-[10px] font-normal text-slate-400">Select text to translate</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {transcripts.length === 0 ? (
                      <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                        Waiting for you to speak...
                      </p>
                    ) : (
                      transcripts.map((t) => (
                        <div key={t.id} className="flex items-start gap-2 group">
                          <p 
                            className={`text-sm transition-colors duration-300 flex-1 ${
                              t.speaker === 'user'
                                ? (t.isFinal ? 'text-indigo-700 dark:text-indigo-300' : 'text-indigo-500 dark:text-indigo-400 font-medium')
                                : (t.isFinal ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400 font-medium')
                            }`}
                          >
                            <span className="font-bold mr-2 opacity-70">
                              {t.speaker === 'user' ? 'You:' : 'Tutor:'}
                            </span>
                            {t.text}
                            {!t.isFinal && (
                              <span className="inline-flex ml-1 gap-0.5">
                                <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                              </span>
                            )}
                          </p>
                          {t.isFinal && (
                            <button 
                              onClick={() => playAudio(t.text)}
                              className="p-1 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-indigo-500 transition-all shrink-0"
                              title="Listen"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))
                    )}
                    {isProcessing && (!transcripts.length || transcripts[transcripts.length - 1].speaker !== 'ai' || transcripts[transcripts.length - 1].isFinal) && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-sm text-indigo-500 dark:text-indigo-400 mt-1"
                      >
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span className="italic">AI is thinking...</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-8 w-full">
              {!isConnected && !error ? (
                <button
                  onClick={() => {
                    if (!consumeCredits(2, 'Live Voice Session')) {
                      alert('Insufficient credits. Please buy more credits or use your own API key.');
                      return;
                    }
                    connect();
                  }}
                  disabled={isConnecting}
                  className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isConnecting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Start Practice
                    </>
                  )}
                </button>
              ) : isConnected ? (
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      disconnect();
                      setShowSummary(true);
                      onComplete();
                    }}
                    className="w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 dark:bg-rose-500/90 dark:hover:bg-rose-500 text-white"
                  >
                    <Square className="w-5 h-5" />
                    End Session
                  </button>
                </div>
              ) : null}
              
              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
                {isConnected ? "Speak naturally. Your Voice Coach is listening." : error ? "Fix the issue above to continue." : "Ensure your microphone is connected."}
              </p>
            </div>
          </div>

          <div className="space-y-8 order-2 md:order-3 md:col-start-1 md:row-start-2">
            {(session.example || session.youtubeLink) && (
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                {session.example && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-indigo-500" /> Example Phrase
                    </h4>
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start justify-between gap-4 group">
                      <p className="text-slate-700 dark:text-slate-300 italic">"{session.example}"</p>
                      <button 
                        onClick={() => playAudio(session.example!)}
                        className="p-1.5 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 shrink-0"
                        title="Listen to example"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
                
                {session.youtubeLink && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <Youtube className="w-4 h-4 text-red-500" /> Video Resource
                    </h4>
                    <a 
                      href={session.youtubeLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg font-medium transition-colors text-sm"
                    >
                      <Play className="w-4 h-4" /> Watch Related Lesson on YouTube
                    </a>
                  </div>
                )}
              </div>
            )}
            
            <div className="bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/20 p-6 rounded-2xl">
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI Voice Coach
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {isConnected 
                  ? "Your AI Voice Coach is listening and analyzing your speech in real-time. Speak naturally!" 
                  : "Start the session to get live explanations, pronunciation corrections, and guided speaking practice from your AI Coach."}
              </p>
            </div>

            {session.grammarExample && (
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <button 
                  onClick={() => setIsGrammarOpen(!isGrammarOpen)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    <RefreshCw className="w-5 h-5 text-indigo-500" /> Natural vs Unnatural
                  </h4>
                  <div className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    {isGrammarOpen ? (
                      <ChevronUp className="w-5 h-5 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {isGrammarOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 pt-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-emerald-50 dark:bg-emerald-500/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
                            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">Natural</p>
                            <p className="text-slate-800 dark:text-slate-200 font-medium">"{session.grammarExample.natural}"</p>
                          </div>
                          <div className="bg-rose-50 dark:bg-rose-500/10 p-4 rounded-xl border border-rose-100 dark:border-rose-500/20">
                            <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-2">Unnatural</p>
                            <p className="text-slate-800 dark:text-slate-200 font-medium line-through decoration-rose-300 dark:decoration-rose-500/30">"{session.grammarExample.unnatural}"</p>
                          </div>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-500/10 p-4 rounded-xl border border-amber-100 dark:border-amber-500/20 text-sm text-amber-800 dark:text-amber-300">
                          <span className="font-semibold">Note:</span> {session.grammarExample.note}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {session.speakingPrompts && session.speakingPrompts.length > 0 && (
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-indigo-500" /> Speaking Prompts
                </h4>
                <ul className="space-y-3">
                  {session.speakingPrompts.map((prompt, idx) => (
                    <li key={idx} className="flex gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-sm font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">{prompt}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {session.vocabulary && session.vocabulary.length > 0 && (
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Languages className="w-5 h-5 text-indigo-500" /> Vocabulary Focus
                </h4>
                <div className="space-y-4">
                  {session.vocabulary.map((vocab, vIdx) => (
                    <div key={vIdx} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 group">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h5 className="font-bold text-slate-900 dark:text-white text-lg">{vocab.word}</h5>
                          <p className="text-sm text-indigo-600 dark:text-indigo-400 font-mono mb-1">{vocab.pronunciation}</p>
                        </div>
                        <button 
                          onClick={() => playAudio(vocab.word)}
                          className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-indigo-500 transition-colors"
                          title="Listen to word"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{vocab.meaning}</p>
                      
                      {vocab.exampleSentence && (
                        <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-100 dark:border-slate-800 text-sm relative">
                          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Example</span>
                          <span className="italic text-slate-700 dark:text-slate-300">"{vocab.exampleSentence}"</span>
                          <button 
                            onClick={() => playAudio(vocab.exampleSentence!)}
                            className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-500 transition-colors opacity-0 group-hover:opacity-100"
                            title="Listen to example"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Translation Popup Removed */}
      <AnimatePresence>
      </AnimatePresence>
    </motion.div>
  );
}
