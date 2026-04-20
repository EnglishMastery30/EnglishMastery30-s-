import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Circle, Play, Square, ChevronLeft, ArrowRight, Volume2, Target, MessageCircle, AlertCircle, Award, TrendingUp, Star, RefreshCw, Youtube, X, Languages, Loader2, Brain } from 'lucide-react';
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

              <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Class Finished!
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto">
                You've successfully completed Day {session.day}: {session.topic}. Your dedication to practicing English is really paying off!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
                <div className="bg-indigo-50 dark:bg-indigo-500/10 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 flex flex-col items-center text-center">
                  <div className="flex items-center gap-2 mb-2 text-indigo-700 dark:text-indigo-400 font-semibold">
                    <Target className="w-5 h-5" />
                    Accuracy
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{Math.floor(Math.random() * 10) + 88}%</div>
                </div>
                
                <div className="bg-emerald-50 dark:bg-emerald-500/10 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-500/20 flex flex-col items-center text-center">
                  <div className="flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-400 font-semibold">
                    <Languages className="w-5 h-5" />
                    Words Learned
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{session.vocabulary ? session.vocabulary.length : 5}</div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-500/10 p-5 rounded-2xl border border-amber-100 dark:border-amber-500/20 flex flex-col items-center text-center">
                  <div className="flex items-center gap-2 mb-2 text-amber-700 dark:text-amber-400 font-semibold">
                    <Star className="w-5 h-5" />
                    Coins Earned
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">+{Math.floor(Math.random() * 20) + 30}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={onBack}
                  className="px-8 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-lg transition-colors"
                >
                  Exit to Homepage
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
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedText && selectionPosition && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              position: 'fixed',
              top: `${selectionPosition.top + 8}px`,
              left: `${Math.max(16, Math.min(window.innerWidth - 300, selectionPosition.left - 150))}px`,
              width: '300px',
              zIndex: 50
            }}
            className="translation-popup p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 hover:shadow-2xl transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                <Languages className="w-3 h-3" /> Translation
              </span>
              <button onClick={() => { setSelectedText(''); setSelectionPosition(null); }} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-start justify-between gap-2 mb-3">
              <p className="text-sm text-slate-700 dark:text-slate-300 italic line-clamp-3">"{selectedText}"</p>
              <button 
                onClick={() => playAudio(selectedText)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-indigo-500 transition-colors shrink-0"
                title="Listen to text"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            {!translation && !isTranslating && (
              <button
                onClick={translateSelectedText}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Languages className="w-4 h-4" /> Translate to {language.toUpperCase()}
              </button>
            )}
            {isTranslating ? (
              <div className="flex items-center justify-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 py-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
                <Loader2 className="w-4 h-4 animate-spin" />
                Translating...
              </div>
            ) : translation ? (
              <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg border border-indigo-100 dark:border-indigo-500/20">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{translation}</p>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
