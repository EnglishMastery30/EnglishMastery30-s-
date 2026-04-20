import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, X, Volume2, Sparkles, Brain, Lock, Layers, Puzzle, Edit3 } from 'lucide-react';
import { useVocabularySRS, VocabProgress } from '../hooks/useVocabularySRS';

export function VocabularyReview({ onBack, isLocked = false }: { onBack: () => void; isLocked?: boolean }) {
  const { getWordsToReview, markReview, vocabList } = useVocabularySRS();
  const [reviewQueue, setReviewQueue] = useState<VocabProgress[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizMode, setQuizMode] = useState<'flashcards' | 'matching' | 'fill-blank'>('flashcards');

  // Fill in the blank state
  const [blankInput, setBlankInput] = useState('');
  const [blankFeedback, setBlankFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  // Matching game state
  const [matchingPairs, setMatchingPairs] = useState<{word: string, meaning: string}[]>([]);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [shuffledMeanings, setShuffledMeanings] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [matchingComplete, setMatchingComplete] = useState(false);

  useEffect(() => {
    const words = getWordsToReview(10);
    setReviewQueue(words);
    
    // Setup matching game
    if (words.length > 0) {
      const pairs = words.slice(0, 5).map(w => ({ word: w.word, meaning: w.meaning }));
      setMatchingPairs(pairs);
      setShuffledWords([...pairs.map(p => p.word)].sort(() => Math.random() - 0.5));
      setShuffledMeanings([...pairs.map(p => p.meaning)].sort(() => Math.random() - 0.5));
    }
  }, []);

  const currentWord = reviewQueue[currentIndex];

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (currentWord) {
      markReview(currentWord.word, isCorrect);
      if (isCorrect) setCorrectCount(prev => prev + 1);
    }
    
    if (currentIndex < reviewQueue.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowMeaning(false);
      setBlankInput('');
      setBlankFeedback('idle');
    } else {
      setSessionComplete(true);
    }
  };

  const handleBlankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWord) return;
    
    if (blankInput.toLowerCase().trim() === currentWord.word.toLowerCase()) {
      setBlankFeedback('correct');
      setTimeout(() => handleAnswer(true), 1000);
    } else {
      setBlankFeedback('incorrect');
    }
  };

  const handleMatch = (word: string | null, meaning: string | null) => {
    if (word && meaning) {
      const isCorrect = matchingPairs.find(p => p.word === word && p.meaning === meaning);
      if (isCorrect) {
        setMatchedPairs(prev => {
          const newSet = new Set(prev);
          newSet.add(word);
          if (newSet.size === matchingPairs.length) {
            setTimeout(() => setMatchingComplete(true), 500);
          }
          return newSet;
        });
      }
      setSelectedWord(null);
      setSelectedMeaning(null);
    }
  };

  useEffect(() => {
    if (selectedWord && selectedMeaning) {
      handleMatch(selectedWord, selectedMeaning);
    }
  }, [selectedWord, selectedMeaning]);

  if (reviewQueue.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <Brain className="w-16 h-16 text-indigo-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">You're all caught up!</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">No words due for review right now. Come back later.</p>
        <button 
          onClick={onBack}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          Back to Practice
        </button>
      </div>
    );
  }

  if (sessionComplete || matchingComplete) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-20"
      >
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          {matchingComplete ? 'Matching Complete!' : 'Review Complete!'}
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          {matchingComplete 
            ? `You successfully matched all ${matchingPairs.length} pairs.`
            : `You remembered ${correctCount} out of ${reviewQueue.length} words correctly.`}
        </p>
        <button 
          onClick={onBack}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
        >
          Continue Learning
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500 dark:text-slate-400"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setQuizMode('flashcards')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${quizMode === 'flashcards' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            <Layers className="w-4 h-4" /> <span className="hidden sm:inline">Flashcards</span>
          </button>
          <button
            onClick={() => setQuizMode('fill-blank')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${quizMode === 'fill-blank' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            <Edit3 className="w-4 h-4" /> <span className="hidden sm:inline">Type Word</span>
          </button>
          <button
            onClick={() => setQuizMode('matching')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${quizMode === 'matching' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            <Puzzle className="w-4 h-4" /> <span className="hidden sm:inline">Matching</span>
          </button>
        </div>
      </div>

      {quizMode !== 'matching' && (
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-12 overflow-hidden max-w-2xl mx-auto">
          <div 
            className="bg-indigo-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex) / reviewQueue.length) * 100}%` }}
          />
        </div>
      )}

      {quizMode === 'matching' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Words</h3>
            {shuffledWords.map(word => {
              const isMatched = matchedPairs.has(word);
              const isSelected = selectedWord === word;
              return (
                <button
                  key={word}
                  onClick={() => !isMatched && setSelectedWord(word)}
                  disabled={isMatched}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    isMatched ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400 opacity-50 cursor-not-allowed' :
                    isSelected ? 'bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-500/20 dark:border-indigo-500 dark:text-indigo-300' :
                    'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">{word}</span>
                    {isMatched && <Check className="w-5 h-5" />}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Meanings</h3>
            {shuffledMeanings.map(meaning => {
              const originalWord = matchingPairs.find(p => p.meaning === meaning)?.word;
              const isMatched = originalWord ? matchedPairs.has(originalWord) : false;
              const isSelected = selectedMeaning === meaning;
              return (
                <button
                  key={meaning}
                  onClick={() => !isMatched && setSelectedMeaning(meaning)}
                  disabled={isMatched}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    isMatched ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400 opacity-50 cursor-not-allowed' :
                    isSelected ? 'bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-500/20 dark:border-indigo-500 dark:text-indigo-300' :
                    'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500/50'
                  }`}
                >
                  <span className="text-sm">{meaning}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : quizMode === 'fill-blank' ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord?.word + 'fill'}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-xl max-w-2xl mx-auto relative"
          >
            <div className="mb-8 text-center">
              <div className="inline-block p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl mb-6">
                <Edit3 className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-xl text-slate-600 dark:text-slate-300 mb-2">What is the word for:</h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">
                "{currentWord?.meaning}"
              </p>
            </div>

            <form onSubmit={handleBlankSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  value={blankInput}
                  onChange={(e) => {
                    setBlankInput(e.target.value);
                    setBlankFeedback('idle');
                  }}
                  disabled={blankFeedback === 'correct'}
                  placeholder="Type the word here..."
                  className={`w-full p-4 text-center text-2xl font-bold rounded-xl border-2 outline-none transition-colors ${
                    blankFeedback === 'correct' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                    blankFeedback === 'incorrect' ? 'bg-rose-50 border-rose-500 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' :
                    'bg-slate-50 border-slate-200 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-700 dark:focus:border-indigo-500 dark:text-white'
                  }`}
                  autoFocus
                />
              </div>

              {blankFeedback === 'incorrect' && (
                <div className="text-center text-rose-500 font-medium animate-pulse">
                  Not quite. Try again!
                </div>
              )}

              {blankFeedback === 'correct' && (
                <div className="text-center text-emerald-500 font-medium flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" /> Correct!
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setBlankInput(currentWord?.word || '');
                    setBlankFeedback('incorrect');
                    setTimeout(() => handleAnswer(false), 2000);
                  }}
                  className="flex-1 py-4 rounded-xl font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  Show Answer
                </button>
                <button
                  type="submit"
                  disabled={!blankInput.trim() || blankFeedback === 'correct'}
                  className="flex-1 py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Check
                </button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord?.word}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-xl text-center relative max-w-2xl mx-auto"
          >
            <button 
              onClick={() => { if (!isLocked) playAudio(currentWord?.word || '') }}
              disabled={isLocked}
              className={`absolute top-6 right-6 p-3 rounded-full transition-colors ${isLocked ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed' : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20'}`}
            >
              {isLocked ? <Lock className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>

            <div className="mb-12 mt-8">
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                {currentWord?.word}
              </h3>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-mono">
                {currentWord?.pronunciation}
              </p>
            </div>

            {!showMeaning ? (
              <button
                onClick={() => setShowMeaning(true)}
                disabled={isLocked}
                className={`w-full py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${isLocked ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
              >
                {isLocked ? <Lock className="w-5 h-5" /> : null} Show Meaning
              </button>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="p-6 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl">
                  <p className="text-xl text-slate-800 dark:text-slate-200">
                    {currentWord?.meaning}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Did you remember it?</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleAnswer(false)}
                      className="flex items-center justify-center gap-2 py-4 bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl font-medium transition-colors"
                    >
                      <X className="w-5 h-5" /> No, forgot
                    </button>
                    <button
                      onClick={() => handleAnswer(true)}
                      className="flex items-center justify-center gap-2 py-4 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl font-medium transition-colors"
                    >
                      <Check className="w-5 h-5" /> Yes, got it
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
