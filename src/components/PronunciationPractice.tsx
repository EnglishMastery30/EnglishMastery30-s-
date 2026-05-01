import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Volume2, CheckCircle, Brain, RefreshCw } from 'lucide-react';

const PRONUNCIATION_WORDS = [
  { word: "Thorough", ipa: "/ˈθʌrə/", tips: "The 'th' is soft, like 'think'." },
  { word: "Schedule", ipa: "/ˈskɛdʒul/", tips: "In US English, it starts with 'sk'." },
  { word: "Colonel", ipa: "/ˈkɜːrnl/", tips: "Sounds exactly like 'kernel'." },
  { word: "Queue", ipa: "/kjuː/", tips: "Sounds exactly like the letter 'Q'." },
  { word: "Recipe", ipa: "/ˈrɛsəpi/", tips: "Three syllables: RE-SI-PEE." },
  { word: "Subtle", ipa: "/ˈsʌtəl/", tips: "The 'b' is silent." },
  { word: "Entrepreneur", ipa: "/ˌɒntrəprəˈnɜːr/", tips: "Starts with an 'on' sound." },
  { word: "Wednesday", ipa: "/ˈwɛnzdeɪ/", tips: "The first 'd' is silent." },
];

export function PronunciationPractice() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentItem = PRONUNCIATION_WORDS[currentIndex];

  const playReference = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(currentItem.word);
      msg.lang = 'en-US';
      window.speechSynthesis.speak(msg);
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    
    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const target = currentItem.word.toLowerCase();
      
      if (transcript.includes(target)) {
        setFeedback("Perfect! Your pronunciation is clear.");
      } else {
        setFeedback(`You said "${transcript}". Try to focus on the phonetic tips!`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 shadow-sm">
          <Mic className="w-7 h-7" />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.word}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-8"
          >
            <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">{currentItem.word}</h3>
            <div className="flex items-center justify-center gap-3">
              <span className="text-lg font-mono text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-100 dark:border-indigo-500/20">{currentItem.ipa}</span>
              <button 
                onClick={playReference}
                className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full transition-all"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-sm bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-dashed border-slate-200 dark:border-slate-700 mb-8">
           <div className="flex items-start gap-3">
             <Brain className="w-4 h-4 text-indigo-500 mt-1 shrink-0" />
             <p className="text-sm text-slate-600 dark:text-slate-400 text-left italic">"{currentItem.tips}"</p>
           </div>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          <button
            onClick={startListening}
            disabled={isListening}
            className={`w-full max-w-xs py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
              isListening 
                ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 animate-pulse' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/30'
            }`}
          >
            {isListening ? <Mic className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            {isListening ? 'Listening...' : 'Click to Speak'}
          </button>

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm font-bold mt-2 ${feedback.includes('Perfect') ? 'text-emerald-600' : 'text-slate-500'}`}
            >
              {feedback}
            </motion.div>
          )}

          <div className="flex items-center gap-4 mt-4">
            <button 
              onClick={() => { setFeedback(null); setCurrentIndex((prev) => (prev + 1) % PRONUNCIATION_WORDS.length); }}
              className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              Next Word
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
