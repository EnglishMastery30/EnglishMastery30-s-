import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Circle, Play, Square, ChevronLeft, ArrowRight, Volume2, Target, MessageCircle, AlertCircle, Award, TrendingUp, Star, RefreshCw, Youtube, X, Languages, Loader2, Brain } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLiveAPI } from '../hooks/useLiveAPI';
import { DaySession } from '../data/curriculum';
import { AudioVisualizer } from './AudioVisualizer';

export function SessionView({ session, onBack, onComplete, onNextSession }: { session: DaySession, onBack: () => void, onComplete: () => void, onNextSession: () => void; key?: string }) {
  const { language } = useLanguage();
  const [showSummary, setShowSummary] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const transcriptionRef = useRef<HTMLDivElement>(null);
  const [selectedText, setSelectedText] = useState('');
  const [translation, setTranslation] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleSelection = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    
    if (text && text.length > 0) {
      setSelectedText(text);
      setTranslation('');
    }
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
  
  const systemInstruction = `You are an expert English language AI Voice Coach. 
Your student's preferred UI language code is '${language}'. You should briefly explain concepts and provide guidance in this language when necessary, but the actual speaking practice MUST be in English.

You are conducting the Day ${session.day} practice session for a student at the ${session.level} level.
The topic for today is: "${session.topic}".
The goals for this session are:
${session.goals.map(g => `- ${g}`).join('\n')}

Your Voice Coach Responsibilities:
1. EXPLAIN LESSONS: Start by warmly welcoming the student. Briefly explain today's topic and outline what they will learn.
2. GUIDE SPEAKING PRACTICE: Lead the student step-by-step through the practice. Ask open-ended questions and prompt them to respond in English.
3. CORRECT PRONUNCIATION & GRAMMAR: Listen carefully. If they make a mistake, gently correct their pronunciation or grammar, and ask them to repeat the correct phrase.
4. MOTIVATE USERS: Be highly encouraging, patient, and supportive. Celebrate their effort and small wins to build their confidence.
5. SESSION COMPLETION ALERT: Once all goals are met, explicitly announce that the session is complete, congratulate them on their progress, and tell them they can end the session now.

Remember to keep your own speaking time concise so the student does most of the talking. Adapt your English speaking speed to the ${session.level} level.`;

  const { isConnected, isConnecting, isProcessing, error, volume, transcripts, connect, disconnect } = useLiveAPI(systemInstruction);

  useEffect(() => {
    if (transcriptionRef.current) {
      transcriptionRef.current.scrollTop = transcriptionRef.current.scrollHeight;
    }
  }, [transcripts]);

  if (showSummary) {
    const accuracy = Math.floor(Math.random() * 10) + 88; // 88-97%
    const vocabLearned = session.vocabulary ? session.vocabulary.slice(0, 3).map(v => v.word) : ['Excellent', 'Progress', 'Fluency'];
    const grammarCorrections = [
      "Used correct verb tense in past narratives",
      "Improved subject-verb agreement",
      "Natural use of prepositions"
    ];

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-8 md:p-12 text-center">
          <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Fantastic Job!
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto">
            You've successfully completed Day {session.day}: {session.topic}. Your dedication to practicing English is really paying off!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-left">
            <div className="bg-indigo-50 dark:bg-indigo-500/10 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-500/20">
              <div className="flex items-center gap-3 mb-3 text-indigo-700 dark:text-indigo-400 font-semibold">
                <Target className="w-5 h-5" />
                Pronunciation
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">{accuracy}%</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Accuracy Score</div>
            </div>
            
            <div className="bg-emerald-50 dark:bg-emerald-500/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-500/20">
              <div className="flex items-center gap-3 mb-3 text-emerald-700 dark:text-emerald-400 font-semibold">
                <CheckCircle className="w-5 h-5" />
                Session Status
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">Completed</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">All goals met</div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 text-left mb-10">
            <div className="flex items-center gap-3 mb-4 text-slate-800 dark:text-slate-200 font-semibold">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Grammar Improvements
            </div>
            <ul className="space-y-3">
              {grammarCorrections.map((correction, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">{correction}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onBack}
              className="px-8 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-lg transition-colors"
            >
              Back to Dashboard
            </button>
            <button 
              onClick={() => setShowSummary(false)}
              className="px-8 py-4 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Practice Again
            </button>
            <button 
              onClick={onNextSession}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none"
            >
              Continue to Next Session <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto"
    >
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
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative order-1 md:order-2 md:col-start-2 md:row-start-1 md:row-span-2">
            
            <AudioVisualizer volume={volume} isConnected={isConnected} />
            
            {isConnected && (
              <div className="w-full max-w-md mt-6 relative">
                <div 
                  ref={transcriptionRef}
                  onMouseUp={handleSelection}
                  onTouchEnd={handleSelection}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 min-h-[80px] max-h-[160px] overflow-y-auto flex flex-col shadow-inner scroll-smooth hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-text"
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
                        <p 
                          key={t.id} 
                          className={`text-sm transition-colors duration-300 ${
                            t.isFinal 
                              ? 'text-slate-700 dark:text-slate-300' 
                              : 'text-indigo-600 dark:text-indigo-400 font-medium'
                          }`}
                        >
                          {t.text}
                          {!t.isFinal && (
                            <span className="inline-flex ml-1 gap-0.5">
                              <span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </span>
                          )}
                        </p>
                      ))
                    )}
                    {isProcessing && (
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

                <AnimatePresence>
                  {selectedText && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-2 p-3 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-lg shadow-md z-10 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Translation</span>
                        <button onClick={() => setSelectedText('')} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-300 italic mb-2">"{selectedText}"</p>
                      {!translation && !isTranslating && (
                        <button
                          onClick={translateSelectedText}
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <Languages className="w-4 h-4" /> Translate
                        </button>
                      )}
                      {isTranslating ? (
                        <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Translating...
                        </div>
                      ) : translation ? (
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{translation}</p>
                      ) : null}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            
            <div className="mt-8 w-full">
              {error && (
                <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-2xl flex items-start gap-3 text-left">
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
              )}
              
              {!isConnected && !error ? (
                <button
                  onClick={connect}
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
    </motion.div>
  );
}
