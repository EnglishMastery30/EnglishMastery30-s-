import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Play, RotateCcw, Headphones, Volume2, Info, ChevronRight, Star, Activity, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

import { DASHBOARD_DAYS, SHADOWING_DATA, ShadowingItem } from '../data/shadowingData';

export function ShadowingPractice() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1);
  const [score, setScore] = useState<number | null>(null);
  const recognitionRef = useRef<any>(null);

  const currentDayContent = (selectedDay !== null && SHADOWING_DATA[selectedDay]) ? SHADOWING_DATA[selectedDay] : [];
  const currentItem = currentDayContent[currentIndex] || { id: 'error', text: 'Select a day to begin practice.', caption: '' };

  const handlePlayAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentItem.text);
      utterance.lang = 'en-US';
      utterance.rate = playSpeed;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = async () => {
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      alert("Microphone permission is required.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
        setScore(null);
    };
    
    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setTranscript(prev => prev + (prev ? ' ' : '') + finalTranscript);
      }
    };
    
    recognition.onend = () => {
      setIsListening(false);
      setTimeout(calculateScore, 100);
    };
    
    recognition.start();
  };

  const calculateScore = () => {
    if (!transcript) return;
    const originalWords = currentItem.text.toLowerCase().replace(/[.,!?;:]/g, '').split(' ').filter(w => w.length > 0);
    const userWords = transcript.toLowerCase().replace(/[.,!?;:]/g, '').split(' ').filter(w => w.length > 0);
    let matches = 0;
    const tempUserWords = [...userWords];
    originalWords.forEach(word => {
      const index = tempUserWords.indexOf(word);
      if (index !== -1) {
        matches++;
        tempUserWords.splice(index, 1);
      }
    });
    setScore(Math.min(Math.round((matches / originalWords.length) * 100), 100));
  };

  return (
    <div className="max-w-4xl mx-auto py-4 md:py-8 px-4 pb-24 md:pb-8">
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">Shadowing Academy</h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">Master the rhythm of native speakers day by day.</p>
        </div>
        <button 
          onClick={() => {
            if (selectedDay !== null) setSelectedDay(null);
            else window.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }));
          }}
          className="w-full md:w-auto p-3 px-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 font-bold hover:bg-slate-50 flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> 
          {selectedDay ? "Back to Academy" : "Exit"}
        </button>
      </div>

      {selectedDay === null ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {DASHBOARD_DAYS.map((day) => (
            <button
              key={day.id}
              onClick={() => { setSelectedDay(day.id); setCurrentIndex(0); setTranscript(''); setScore(null); }}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-400 hover:shadow-md transition-all text-left flex flex-col items-start justify-center gap-1 group h-full"
            >
              <div className="font-bold text-lg text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 transition-colors line-clamp-2">{day.title}</div>
            </button>
          ))}
        </div>
      ) : (
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1.5 bg-indigo-500 transition-all duration-700" style={{ width: `${currentDayContent.length > 0 ? ((currentIndex + 1) / currentDayContent.length) * 100 : 0}%` }}></div>

        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
            {DASHBOARD_DAYS.find(d => d.id === selectedDay)?.title || `Day ${selectedDay}`}
          </h2>
          <div className="h-1 w-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full mt-2" />
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-black uppercase tracking-tighter">
            {currentItem.caption}
          </span>
          <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest shrink-0">
            {currentIndex + 1} / {currentDayContent.length}
          </span>
        </div>

        <div className="mb-12">
          <motion.h3 
            key={`${selectedDay}-${currentIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-[1.2]"
          >
            {currentItem.text}
          </motion.h3>
        </div>

        {currentItem.answer && (
          <div className="mb-12 p-6 bg-amber-50 dark:bg-amber-500/5 rounded-[2rem] border border-amber-100 dark:border-amber-900/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Sample Reply</span>
              </div>
              <button 
                onClick={() => {
                  if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(currentItem.answer!);
                    utterance.lang = 'en-US';
                    window.speechSynthesis.speak(utterance);
                  }
                }}
                className="w-min p-1.5 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-600 dark:text-amber-400 hover:text-amber-700 hover:bg-amber-200 transition-all flex items-center gap-1"
                title="Listen to Reply"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Play</span>
              </button>
            </div>
            <p className="text-slate-800 dark:text-slate-200 font-bold text-lg">{currentItem.answer}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex flex-col items-center">
            <div className={`p-4 rounded-2xl mb-4 ${isPlaying ? 'bg-indigo-500 text-white scale-110 shadow-lg animate-pulse' : 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600'}`}>
              <Headphones className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Focus & Listen</h4>
            <div className="flex gap-1.5 md:gap-2 mb-6 bg-slate-200 dark:bg-slate-800 p-1.5 rounded-2xl flex-wrap justify-center">
              {[0.5, 1, 1.5, 2].map(speed => (
                <button 
                  key={speed} 
                  onClick={() => setPlaySpeed(speed)}
                  className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all ${playSpeed === speed ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {speed}x
                </button>
              ))}
            </div>
            <button 
              onClick={handlePlayAudio}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Play className="w-5 h-5 fill-current" /> Hear Native
            </button>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex flex-col items-center">
            <div className={`p-4 rounded-2xl mb-4 ${isListening ? 'bg-rose-500 text-white scale-110 shadow-lg animate-pulse' : 'bg-rose-100 dark:bg-rose-500/20 text-rose-600'}`}>
              <Mic className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Mimic the Sound</h4>
            <button 
              onClick={toggleListening}
              className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
                isListening ? 'bg-rose-600 text-white' : 'bg-white dark:bg-slate-900 text-rose-600 border-2 border-rose-600 hover:bg-rose-50'
              }`}
            >
              {isListening ? <RotateCcw className="w-5 h-5 animate-spin" /> : <Mic className="w-5 h-5" />}
              {isListening ? 'Recording...' : 'Start Capturing'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {transcript && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 md:p-8 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-3xl border border-indigo-100 dark:border-indigo-500/20 mb-8 md:mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-indigo-500" />
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Transcription</span>
              </div>
              <p className="text-xl font-bold text-slate-800 dark:text-slate-200 italic leading-relaxed">"{transcript}"</p>
            </motion.div>
          )}
        </AnimatePresence>

        {score !== null && (
          <div className="flex flex-col items-center p-8 md:p-12 bg-indigo-600 rounded-[3rem] text-white mb-8 md:mb-12 shadow-2xl shadow-indigo-200 dark:shadow-none">
            <div className="text-6xl md:text-7xl font-black mb-2">{score}%</div>
            <div className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] mb-8 opacity-70 text-center">Pronunciation Accuracy</div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full max-w-sm">
              <button 
                onClick={() => { setTranscript(''); setScore(null); }}
                className="flex-1 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black transition-all border border-white/20"
              >
                Retry
              </button>
              <button 
                onClick={() => { setCurrentIndex((prev) => (prev + 1) % currentDayContent.length); setTranscript(''); setScore(null); }}
                className="flex-1 py-4 bg-white text-indigo-600 rounded-2xl font-black hover:bg-indigo-50 transition-all"
              >
                Next Word
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <button 
            onClick={() => { setCurrentIndex((prev) => (prev - 1 + currentDayContent.length) % currentDayContent.length); setTranscript(''); setScore(null); }}
            className="flex items-center gap-1 md:gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800/50 dark:hover:bg-indigo-900/20 px-3 py-2 md:px-4 md:py-3 rounded-xl shrink-0"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          
          <div className="flex gap-1 md:gap-2 justify-center flex-1 max-w-[40vw] overflow-hidden">
            {currentDayContent.length <= 15 ? (
              currentDayContent.map((_, idx) => (
                <div key={idx} className={`h-1.5 md:h-2 rounded-full transition-all shrink-0 ${idx === currentIndex ? 'w-4 md:w-8 bg-indigo-500' : 'w-1.5 md:w-2 bg-slate-200 dark:bg-slate-800'}`} />
              ))
            ) : (
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                 {Math.round(((currentIndex + 1) / currentDayContent.length) * 100)}% Complete
              </span>
            )}
          </div>

          <button 
            onClick={() => { setCurrentIndex((prev) => (prev + 1) % currentDayContent.length); setTranscript(''); setScore(null); }}
            className="flex items-center gap-1 md:gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800/50 dark:hover:bg-indigo-900/20 px-3 py-2 md:px-4 md:py-3 rounded-xl shrink-0"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-start gap-4">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm">
            <Info className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h5 className="font-black text-slate-900 dark:text-white mb-1">PRO TIP: Native Cadence</h5>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Don't just repeat the words; repeat the **breath**. Notice where the speaker pauses and where they push words together. That is the secret to sounding natural.
            </p>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
