import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, ArrowRight, RefreshCw, Loader2, ChevronLeft, Target, Mic, MicOff, Languages, X, Volume2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { generateContentWithFallback } from '../utils/aiFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { useCredits } from '../contexts/CreditsContext';

interface GrammarDrillProps {
  onBack?: () => void;
  isLocked?: boolean;
}

type DrillType = 'rearrangement' | 'fill-in-the-blank' | 'sentence-completion';

interface DrillState {
  type: DrillType;
  originalSentence: string;
  
  // For rearrangement
  jumbledWords: { id: string; word: string }[];
  selectedWords: { id: string; word: string }[];
  
  // For fill-in-the-blank
  sentenceParts?: { before: string; after: string };
  options?: string[];
  selectedOption?: string | null;
  correctAnswer?: string;

  feedback: string | null;
  explanation: string | null;
  alternatives?: string[];
  pronunciationFeedback?: string | null;
  isCorrect: boolean | null;
  isLoading: boolean;
  isGenerating: boolean;
}

export function GrammarDrill({ onBack, isLocked = false }: GrammarDrillProps) {
  const { language } = useLanguage();
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [hasStarted, setHasStarted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { consumeCredits, apiKeys, useCustomKeys } = useCredits();
  
  // Translation states
  const [selectedText, setSelectedText] = useState('');
  const [translation, setTranslation] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectionPosition, setSelectionPosition] = useState<{ top: number, left: number } | null>(null);

  const [state, setState] = useState<DrillState>({
    type: 'rearrangement',
    originalSentence: '',
    jumbledWords: [],
    selectedWords: [],
    feedback: null,
    explanation: null,
    isCorrect: null,
    isLoading: false,
    isGenerating: false,
  });

  const generateDrill = async () => {
    if (!consumeCredits(1, 'Grammar Drill AI')) {
      alert('Insufficient credits. Please buy more credits or use your own API key.');
      return;
    }

    setState(prev => ({ 
      ...prev, 
      isGenerating: true, 
      feedback: null, 
      explanation: null,
      isCorrect: null, 
      selectedWords: [],
      selectedOption: null
    }));
    
    const drillTypes: DrillType[] = ['rearrangement', 'fill-in-the-blank', 'sentence-completion'];
    const drillType: DrillType = drillTypes[Math.floor(Math.random() * drillTypes.length)];
    
    try {
      const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key is missing.");
      const ai = new GoogleGenAI({ apiKey });
      
      if (drillType === 'rearrangement') {
        const response = await generateContentWithFallback(ai, {
          model: 'gemini-1.5-flash',
          contents: `Generate a single, grammatically correct English sentence for a language learner (${difficulty} level). The sentence should be 5-10 words long. Return ONLY the sentence, nothing else. Do not include quotes.`,
        });
        
        const sentence = response.text?.trim().replace(/^["']|["']$/g, '') || "The quick brown fox jumps over the lazy dog";
        const cleanSentence = sentence.replace(/[.,!?]/g, '');
        const words = cleanSentence.split(' ').filter(w => w.length > 0);
        
        const shuffled = [...words]
          .map((word, index) => ({ id: `word-${index}-${Math.random()}`, word: word.toLowerCase() }))
          .sort(() => Math.random() - 0.5);
        
        setState({
          type: 'rearrangement',
          originalSentence: sentence,
          jumbledWords: shuffled,
          selectedWords: [],
          feedback: null,
          explanation: null,
          isCorrect: null,
          isLoading: false,
          isGenerating: false,
        });
      } else if (drillType === 'fill-in-the-blank') {
        const prompt = `
          Generate a fill-in-the-blank English grammar drill for a ${difficulty} learner.
          Focus on prepositions or articles.
          Return a JSON object with this exact structure:
          {
            "sentenceBeforeBlank": "The part of the sentence before the blank",
            "sentenceAfterBlank": "The part of the sentence after the blank",
            "correctAnswer": "the correct word",
            "incorrectOptions": ["wrong word 1", "wrong word 2", "wrong word 3"]
          }
        `;
        
        const response = await generateContentWithFallback(ai, {
          model: 'gemini-1.5-flash',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          }
        });
        
        const result = JSON.parse(response.text || '{}');
        const options = [result.correctAnswer, ...(result.incorrectOptions || [])].sort(() => Math.random() - 0.5);
        
        setState({
          type: 'fill-in-the-blank',
          originalSentence: `${result.sentenceBeforeBlank} ${result.correctAnswer} ${result.sentenceAfterBlank}`,
          jumbledWords: [],
          selectedWords: [],
          sentenceParts: {
            before: result.sentenceBeforeBlank || '',
            after: result.sentenceAfterBlank || ''
          },
          options,
          correctAnswer: result.correctAnswer,
          selectedOption: null,
          feedback: null,
          explanation: null,
          isCorrect: null,
          isLoading: false,
          isGenerating: false,
        });
      } else {
        const prompt = `
          Generate a sentence completion English grammar drill for a ${difficulty} learner.
          Focus on conjunctions, conditionals, or complex sentence structures. The blank should be a phrase or a clause.
          Return a JSON object with this exact structure:
          {
            "sentenceBeforeBlank": "The part of the sentence before the blank",
            "sentenceAfterBlank": "The part of the sentence after the blank (can be empty)",
            "correctAnswer": "the correct phrase",
            "incorrectOptions": ["wrong phrase 1", "wrong phrase 2", "wrong phrase 3"]
          }
        `;
        
        const response = await generateContentWithFallback(ai, {
          model: 'gemini-1.5-flash',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          }
        });
        
        const result = JSON.parse(response.text || '{}');
        const options = [result.correctAnswer, ...(result.incorrectOptions || [])].sort(() => Math.random() - 0.5);
        
        setState({
          type: 'sentence-completion',
          originalSentence: `${result.sentenceBeforeBlank} ${result.correctAnswer} ${result.sentenceAfterBlank}`,
          jumbledWords: [],
          selectedWords: [],
          sentenceParts: {
            before: result.sentenceBeforeBlank || '',
            after: result.sentenceAfterBlank || ''
          },
          options,
          correctAnswer: result.correctAnswer,
          selectedOption: null,
          feedback: null,
          explanation: null,
          isCorrect: null,
          isLoading: false,
          isGenerating: false,
        });
      }
    } catch (error) {
      console.error("Failed to generate drill:", error);
      // Fallback
      if (drillType === 'rearrangement') {
        const fallback = "She is reading a book in the library";
        const words = fallback.split(' ');
        const shuffled = [...words]
          .map((word, index) => ({ id: `word-${index}-${Math.random()}`, word: word.toLowerCase() }))
          .sort(() => Math.random() - 0.5);
          
        setState({
          type: 'rearrangement',
          originalSentence: fallback,
          jumbledWords: shuffled,
          selectedWords: [],
          feedback: null,
          explanation: null,
          isCorrect: null,
          isLoading: false,
          isGenerating: false,
        });
      } else if (drillType === 'fill-in-the-blank') {
        setState({
          type: 'fill-in-the-blank',
          originalSentence: "I am going to the store.",
          jumbledWords: [],
          selectedWords: [],
          sentenceParts: { before: "I am going", after: "the store." },
          options: ["to", "at", "in", "on"].sort(() => Math.random() - 0.5),
          correctAnswer: "to",
          selectedOption: null,
          feedback: null,
          explanation: null,
          isCorrect: null,
          isLoading: false,
          isGenerating: false,
        });
      } else {
        setState({
          type: 'sentence-completion',
          originalSentence: "If it rains tomorrow, we will stay inside.",
          jumbledWords: [],
          selectedWords: [],
          sentenceParts: { before: "If it rains tomorrow,", after: "" },
          options: ["we will stay inside.", "we stay inside.", "we stayed inside.", "we staying inside."].sort(() => Math.random() - 0.5),
          correctAnswer: "we will stay inside.",
          selectedOption: null,
          feedback: null,
          explanation: null,
          isCorrect: null,
          isLoading: false,
          isGenerating: false,
        });
      }
    }
  };

  useEffect(() => {
    // Drill is generated when the user clicks Start
  }, []);

  const handleWordSelect = (wordObj: { id: string; word: string }, from: 'jumbled' | 'selected') => {
    if (state.isCorrect || isLocked || state.type !== 'rearrangement') return;

    if (from === 'jumbled') {
      setState(prev => ({
        ...prev,
        jumbledWords: prev.jumbledWords.filter(w => w.id !== wordObj.id),
        selectedWords: [...prev.selectedWords, wordObj],
        feedback: null,
        explanation: null,
        isCorrect: null
      }));
    } else {
      setState(prev => ({
        ...prev,
        selectedWords: prev.selectedWords.filter(w => w.id !== wordObj.id),
        jumbledWords: [...prev.jumbledWords, wordObj],
        feedback: null,
        explanation: null,
        isCorrect: null
      }));
    }
  };

  const handleOptionSelect = (option: string) => {
    if (state.isCorrect || isLocked || (state.type !== 'fill-in-the-blank' && state.type !== 'sentence-completion')) return;
    setState(prev => ({
      ...prev,
      selectedOption: option,
      feedback: null,
      explanation: null,
      isCorrect: null
    }));
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelection = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e && (e.target as Element).closest('.translation-popup')) return;
    setTimeout(() => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();
      if (text && text.length > 0 && selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
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
        setTranslation(data[0].map((item: any) => item[0]).join('') || 'Translation failed.');
      } else {
        setTranslation('Translation failed.');
      }
    } catch (error) {
      setTranslation('Translation failed.');
    } finally {
      setIsTranslating(false);
    }
  };

  const toggleListening = async () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    try {
      // Request microphone permission explicitly first
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      console.error("Microphone permission denied:", err);
      alert("Microphone permission is required to use speech recognition. Please allow microphone access in your browser settings.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      checkAnswer(transcript);
    };
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error !== 'no-speech') {
        alert(`Microphone error: ${event.error}. Please try again.`);
      }
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    
    try {
      recognition.start();
    } catch (err) {
      console.error("Failed to start recognition:", err);
      setIsListening(false);
    }
  };

  const checkAnswer = async (spokenTranscript?: string) => {
    if (isLocked) return;
    
    if (state.type === 'rearrangement') {
      const constructedSentence = spokenTranscript || state.selectedWords.map(w => w.word).join(' ');
      if (!constructedSentence) return;
      
      setState(prev => ({ ...prev, isLoading: true }));
      
      const allWords = [...state.selectedWords, ...state.jumbledWords].map(w => w.word);
      
      try {
        const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("API key is missing.");
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `
          The user is practicing English grammar (Level: ${difficulty}).
          They were given these words: [${allWords.join(', ')}]
          They ${spokenTranscript ? 'spoke' : 'constructed'} this sentence: "${constructedSentence}"
          
          Evaluate if the constructed sentence is grammatically correct and makes sense.
          If they spoke it, also evaluate if it sounds like a valid pronunciation/interpretation of the target words, and provide specific pronunciation feedback.
          If it is incorrect, provide specific feedback focusing on word order and verb conjugation.
          Suggest alternative valid sentences if the user's answer is close but not perfect.
          Also, provide a clear explanation of the grammar rules involved in this sentence structure. As part of the explanation, include a side-by-side comparison of an unnatural (but technically correct) sentence versus a natural-sounding version related to this grammar point. Add a short note explaining why the natural version works better. Use decimal points to format this comparison (e.g., 1.1 Unnatural: [sentence], 1.2 Natural: [sentence], 1.3 Note: [explanation]).
          
          Return a JSON object with this exact structure:
          {
            "isCorrect": boolean,
            "feedback": "string explaining why it's correct or incorrect, focusing on word order and conjugation",
            "explanation": "string providing a clear explanation of the grammar rules (e.g., sentence structure, verb conjugation) used in this sentence",
            "alternatives": ["alternative 1", "alternative 2"],
            "pronunciationFeedback": "string providing feedback on pronunciation if they spoke it, otherwise null"
          }
        `;
        
        const response = await generateContentWithFallback(ai, {
          model: 'gemini-1.5-flash',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          }
        });
        
        const result = JSON.parse(response.text || '{}');
        
        setState(prev => ({
          ...prev,
          isLoading: false,
          isCorrect: result.isCorrect || false,
          feedback: result.feedback || "Could not evaluate the sentence.",
          explanation: result.explanation || null,
          alternatives: result.alternatives || [],
          pronunciationFeedback: result.pronunciationFeedback || null
        }));
        
      } catch (error) {
        console.error("Failed to check answer:", error);
        setState(prev => ({
          ...prev,
          isLoading: false,
          feedback: "Error checking your answer. Please try again.",
          explanation: null
        }));
      }
    } else {
      const answer = spokenTranscript || state.selectedOption;
      if (!answer) return;
      
      setState(prev => ({ ...prev, isLoading: true }));
      
      try {
        const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("API key is missing.");
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `
          The user is practicing English grammar with a ${state.type === 'sentence-completion' ? 'sentence completion' : 'fill-in-the-blank'} drill (Level: ${difficulty}).
          The sentence is: "${state.sentenceParts?.before} ___ ${state.sentenceParts?.after}"
          The correct answer is: "${state.correctAnswer}"
          The user ${spokenTranscript ? 'spoke' : 'selected'}: "${answer}"
          
          Evaluate if the user's answer is correct or acceptable in this context.
          If they spoke it, also evaluate if it sounds like a valid pronunciation/interpretation of the target words, and provide specific pronunciation feedback.
          Provide a clear explanation of the grammar rule that applies here. As part of the explanation, include a side-by-side comparison of an unnatural (but technically correct) sentence versus a natural-sounding version related to this grammar point. Add a short note explaining why the natural version works better. Use decimal points to format this comparison (e.g., 1.1 Unnatural: [sentence], 1.2 Natural: [sentence], 1.3 Note: [explanation]).
          Explain why "${state.correctAnswer}" is correct, and if the user was wrong, briefly explain why "${answer}" doesn't fit.
          
          Return a JSON object with this exact structure:
          {
            "isCorrect": boolean,
            "feedback": "short encouraging message or correction",
            "explanation": "string explaining the grammar rule clearly",
            "pronunciationFeedback": "string providing feedback on pronunciation if they spoke it, otherwise null"
          }
        `;
        
        const response = await generateContentWithFallback(ai, {
          model: 'gemini-1.5-flash',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          }
        });
        
        const result = JSON.parse(response.text || '{}');
        const isCorrect = result.isCorrect !== undefined ? result.isCorrect : (answer.toLowerCase() === state.correctAnswer?.toLowerCase());
        
        setState(prev => ({
          ...prev,
          isLoading: false,
          isCorrect,
          feedback: result.feedback || (isCorrect ? "Great job!" : `Not quite right. The correct word is "${state.correctAnswer}".`),
          explanation: result.explanation || "No explanation available.",
          pronunciationFeedback: result.pronunciationFeedback || null
        }));
      } catch (error) {
        console.error("Failed to check answer:", error);
        const isCorrect = answer.toLowerCase() === state.correctAnswer?.toLowerCase();
        setState(prev => ({
          ...prev,
          isLoading: false,
          isCorrect,
          feedback: isCorrect 
            ? "Great job! That's the correct word." 
            : `Not quite right. The correct word is "${state.correctAnswer}".`,
          explanation: "Could not load grammar explanation."
        }));
      }
    }
  };

  if (!hasStarted) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-4 mb-8">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500 dark:text-slate-400"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Target className="w-8 h-8 text-indigo-500" />
            Grammar Drill
          </h2>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 sm:p-12 text-center max-w-2xl mx-auto">
          <Target className="w-16 h-16 text-indigo-500 mx-auto mb-6" />
          <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">Select Difficulty</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Choose your level before starting the drill. The AI will adapt the grammar rules and vocabulary to match your proficiency.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level as any)}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  difficulty === level
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="block font-bold text-lg mb-1">{level}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setHasStarted(true);
              generateDrill();
            }}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-colors inline-flex items-center justify-center gap-2"
          >
            Start Drill <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 relative"
      onMouseUp={handleSelection}
      onTouchEnd={handleSelection}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500 dark:text-slate-400"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Target className="w-8 h-8 text-indigo-500" />
              Grammar Drill
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              {state.type === 'rearrangement' 
                ? 'Construct a grammatically correct sentence.' 
                : state.type === 'sentence-completion'
                  ? 'Complete the sentence with the correct phrase.'
                  : 'Fill in the blank with the correct word.'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto">
          {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
            <button
              key={level}
              onClick={() => {
                setDifficulty(level as any);
                generateDrill();
              }}
              disabled={state.isLoading || state.isGenerating}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                difficulty === level
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              } disabled:opacity-50`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
        {state.isGenerating ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-500 dark:text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
            <p className="text-lg font-medium">Generating a new grammar drill...</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col p-6 sm:p-10">
            {state.type === 'rearrangement' ? (
              <>
                {/* Sentence Construction Area */}
                <div className="mb-10">
                  <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Your Sentence</h3>
                  <div className="min-h-[80px] p-4 bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl flex flex-wrap gap-2 items-start content-start">
                    <AnimatePresence>
                      {state.selectedWords.length === 0 && (
                        <motion.p 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          exit={{ opacity: 0 }}
                          className="text-slate-400 dark:text-slate-500 italic w-full text-center mt-3"
                        >
                          Tap words below to build your sentence
                        </motion.p>
                      )}
                      {state.selectedWords.map((wordObj) => (
                        <motion.button
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          key={wordObj.id}
                          onClick={() => handleWordSelect(wordObj, 'selected')}
                          disabled={state.isCorrect === true || isLocked}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-90 disabled:cursor-default"
                        >
                          {wordObj.word}
                        </motion.button>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Word Bank Area */}
                <div className="mb-10 flex-1">
                  <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Word Bank</h3>
                  <div className="flex flex-wrap gap-3">
                    <AnimatePresence>
                      {state.jumbledWords.map((wordObj) => (
                        <motion.button
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          key={wordObj.id}
                          onClick={() => handleWordSelect(wordObj, 'jumbled')}
                          disabled={state.isCorrect === true || isLocked}
                          className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium shadow-sm hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {wordObj.word}
                        </motion.button>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Fill in the blank area */}
                <div className="mb-12 flex-1 flex flex-col items-center justify-center">
                  <div className="text-2xl sm:text-3xl font-medium text-slate-800 dark:text-slate-200 text-center leading-relaxed">
                    {state.sentenceParts?.before}{' '}
                    <span className={`inline-block min-w-[100px] border-b-2 px-2 pb-1 text-center transition-colors ${
                      state.selectedOption 
                        ? state.isCorrect === true
                          ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                          : state.isCorrect === false
                            ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                            : 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                        : 'border-slate-400 dark:border-slate-600 text-transparent'
                    }`}>
                      {state.selectedOption || '___'}
                    </span>
                    {' '}{state.sentenceParts?.after}
                  </div>
                  
                  <div className={`mt-12 w-full max-w-lg grid gap-4 ${state.type === 'sentence-completion' ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {state.options?.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(option)}
                        disabled={state.isCorrect === true || isLocked}
                        className={`py-4 px-6 rounded-2xl text-lg font-medium transition-all ${
                          state.selectedOption === option
                            ? state.isCorrect === true
                              ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-2 border-emerald-500'
                              : state.isCorrect === false
                                ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border-2 border-rose-500'
                                : 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-2 border-indigo-500'
                            : 'bg-slate-50 dark:bg-slate-800 border-2 border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        } disabled:opacity-80`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Feedback Area */}
            <AnimatePresence>
              {state.feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-5 rounded-2xl mb-8 flex items-start gap-4 ${
                    state.isCorrect 
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20' 
                      : 'bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20'
                  }`}
                >
                  {state.isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-bold ${state.isCorrect ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'}`}>
                        {state.isCorrect ? 'Correct!' : 'Not quite right'}
                      </h4>
                      <button 
                        onClick={() => playAudio(state.feedback || '')}
                        className={`p-1 rounded-full transition-colors ${
                          state.isCorrect 
                            ? 'hover:bg-emerald-200 dark:hover:bg-emerald-500/30 text-emerald-600 dark:text-emerald-400' 
                            : 'hover:bg-rose-200 dark:hover:bg-rose-500/30 text-rose-600 dark:text-rose-400'
                        }`}
                        title="Listen to feedback"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className={`text-sm ${state.isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                      {state.feedback}
                    </p>
                    {state.pronunciationFeedback && (
                      <div className={`mt-3 pt-3 border-t ${state.isCorrect ? 'border-emerald-200 dark:border-emerald-500/20' : 'border-rose-200 dark:border-rose-500/20'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className={`text-xs font-bold uppercase tracking-wider ${state.isCorrect ? 'text-emerald-800/70 dark:text-emerald-300/70' : 'text-rose-800/70 dark:text-rose-300/70'}`}>
                            Pronunciation Feedback
                          </h5>
                          <button 
                            onClick={() => playAudio(state.pronunciationFeedback || '')}
                            className={`p-1 rounded-full transition-colors ${
                              state.isCorrect 
                                ? 'hover:bg-emerald-200 dark:hover:bg-emerald-500/30 text-emerald-600 dark:text-emerald-400' 
                                : 'hover:bg-rose-200 dark:hover:bg-rose-500/30 text-rose-600 dark:text-rose-400'
                            }`}
                            title="Listen to pronunciation feedback"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className={`text-sm ${state.isCorrect ? 'text-emerald-800 dark:text-emerald-200' : 'text-rose-800 dark:text-rose-200'}`}>
                          {state.pronunciationFeedback}
                        </p>
                      </div>
                    )}
                    {state.alternatives && state.alternatives.length > 0 && (
                      <div className={`mt-3 pt-3 border-t ${state.isCorrect ? 'border-emerald-200 dark:border-emerald-500/20' : 'border-rose-200 dark:border-rose-500/20'}`}>
                        <h5 className={`text-xs font-bold uppercase tracking-wider mb-1 ${state.isCorrect ? 'text-emerald-800/70 dark:text-emerald-300/70' : 'text-rose-800/70 dark:text-rose-300/70'}`}>
                          Alternative Valid Sentences
                        </h5>
                        <ul className={`text-sm list-disc list-inside ${state.isCorrect ? 'text-emerald-800 dark:text-emerald-200' : 'text-rose-800 dark:text-rose-200'}`}>
                          {state.alternatives.map((alt, i) => (
                            <li key={i}>{alt}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {state.explanation && (
                      <div className={`mt-3 pt-3 border-t ${state.isCorrect ? 'border-emerald-200 dark:border-emerald-500/20' : 'border-rose-200 dark:border-rose-500/20'}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className={`text-xs font-bold uppercase tracking-wider ${state.isCorrect ? 'text-emerald-800/70 dark:text-emerald-300/70' : 'text-rose-800/70 dark:text-rose-300/70'}`}>
                            Grammar Rule
                          </h5>
                          <button 
                            onClick={() => playAudio(state.explanation || '')}
                            className={`p-1 rounded-full transition-colors ${
                              state.isCorrect 
                                ? 'hover:bg-emerald-200 dark:hover:bg-emerald-500/30 text-emerald-600 dark:text-emerald-400' 
                                : 'hover:bg-rose-200 dark:hover:bg-rose-500/30 text-rose-600 dark:text-rose-400'
                            }`}
                            title="Listen to explanation"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className={`text-sm ${state.isCorrect ? 'text-emerald-800 dark:text-emerald-200' : 'text-rose-800 dark:text-rose-200'}`}>
                          {state.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="mt-auto flex gap-4">
              {state.isCorrect ? (
                <button
                  onClick={generateDrill}
                  className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <RefreshCw className="w-5 h-5" /> Next Drill
                </button>
              ) : (
                <>
                  <button
                    onClick={toggleListening}
                    disabled={state.isLoading || isLocked}
                    className={`p-4 rounded-xl font-bold transition-colors flex items-center justify-center shadow-sm shrink-0 ${
                      isListening 
                        ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse' 
                        : 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-500/30'
                    }`}
                    title={isListening ? "Stop listening" : "Speak your answer"}
                  >
                    {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                  </button>
                  <button
                    onClick={() => checkAnswer()}
                    disabled={
                      (state.type === 'rearrangement' && state.selectedWords.length === 0) || 
                      ((state.type === 'fill-in-the-blank' || state.type === 'sentence-completion') && !state.selectedOption) || 
                      state.isLoading || 
                      isLocked
                    }
                    className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    {state.isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Checking...
                      </>
                    ) : (
                      <>
                        Check Answer <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Translation Popup */}
      <AnimatePresence>
        {selectionPosition && selectedText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="translation-popup absolute z-50 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 w-72"
            style={{
              top: `${selectionPosition.top + 10}px`,
              left: `${Math.max(10, Math.min(window.innerWidth - 300, selectionPosition.left - 144))}px`
            }}
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
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-indigo-500 transition-colors shrink-0 flex items-center gap-1 border border-slate-200 dark:border-slate-700"
                title="Listen to text"
              >
                <Volume2 className="w-4 h-4" />
                <span className="text-xs font-semibold">Listen</span>
              </button>
            </div>
            {!translation && !isTranslating && (
              <button
                onClick={translateSelectedText}
                className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-medium transition-colors"
              >
                Translate to {language === 'es' ? 'Spanish' : language === 'fr' ? 'French' : language === 'ar' ? 'Arabic' : language === 'hi' ? 'Hindi' : 'your language'}
              </button>
            )}
            {isTranslating && (
              <div className="flex items-center justify-center py-2">
                <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
              </div>
            )}
            {translation && (
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{translation}</p>
                <div className="mt-2 flex">
                  <button
                    onClick={() => {
                      if ('speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                        const utterance = new SpeechSynthesisUtterance(translation);
                        utterance.lang = language === 'ja' ? 'ja-JP' : language === 'ko' ? 'ko-KR' : language === 'zh' ? 'zh-CN' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : language === 'kn' ? 'kn-IN' : language === 'ml' ? 'ml-IN' : language === 'ar' ? 'ar-SA' : 'en-US';
                        window.speechSynthesis.speak(utterance);
                      }
                    }}
                    className="p-1 rounded text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors flex items-center justify-center"
                    title="Listen to Translation"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
