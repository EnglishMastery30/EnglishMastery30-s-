import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, X, Send, CheckCircle2, TrendingUp, Target } from 'lucide-react';

interface FeedbackOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: { rating: number; text: string; keywords: string[] }) => void;
  sessionTitle: string;
}

const KEYWORDS = [
  'Pronunciation', 'Grammar', 'Fluency', 'Vocabulary', 
  'Confidence', 'Speed', 'Clarity', 'Listening'
];

export function FeedbackOverlay({ isOpen, onClose, onSubmit, sessionTitle }: FeedbackOverlayProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, text, keywords: selectedKeywords });
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setRating(0);
      setText('');
      setSelectedKeywords([]);
    }, 2000);
  };

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords(prev => 
      prev.includes(keyword) 
        ? prev.filter(k => k !== keyword) 
        : [...prev, keyword]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden"
          >
            {isSubmitted ? (
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10 }}
                  className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Thank You!</h3>
                <p className="text-slate-500 dark:text-slate-400">Your feedback helps improve our AI tutor.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Session Feedback</h2>
                    <p className="text-sm font-bold text-indigo-500 uppercase tracking-widest">{sessionTitle}</p>
                  </div>
                  <button 
                    type="button"
                    onClick={onClose}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400"
                    aria-label="Close feedback overlay"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-8 space-y-8">
                  {/* Rating */}
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider">Rate Performance</p>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform active:scale-90"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star 
                            className={`w-10 h-10 ${
                              (hoverRating || rating) >= star 
                                ? 'fill-amber-400 text-amber-400' 
                                : 'text-slate-200 dark:text-slate-700'
                            } transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Keywords */}
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4 text-indigo-500" />
                      What did you focus on?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {KEYWORDS.map(keyword => (
                        <button
                          key={keyword}
                          type="button"
                          onClick={() => toggleKeyword(keyword)}
                          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all border ${
                            selectedKeywords.includes(keyword)
                              ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-700'
                          }`}
                        >
                          {keyword}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text Input */}
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-emerald-500" />
                      Any additional comments?
                    </p>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="e.g., The tutor was very patient today..."
                      className="w-full h-32 p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    Skip
                  </button>
                  <button
                    disabled={rating === 0}
                    type="submit"
                    className="flex-1 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
                  >
                    Submit <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
