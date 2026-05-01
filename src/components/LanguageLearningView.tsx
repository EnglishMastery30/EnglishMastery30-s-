import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Brain, Sparkles, Zap, X, ChevronRight, ChevronLeft, Check, BookOpen, Target, MessageSquare, ArrowRight, Mic, MicOff, Lock, Volume2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { generateContentWithFallback } from '../utils/aiFallback';
import { useCredits } from '../contexts/CreditsContext';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const SYSTEM_INSTRUCTION = `You are an expert polyglot language tutor powered by AI. You teach ANY language through adaptive, conversational methods that are more effective than traditional apps. You adjust to the learner's level, goals, and preferred learning style.

## Supported Languages
You support EVERY human language.

## Tone Guidelines for AI Feedback
- Always favor natural-sounding, constructive, and specific feedback.
- Prefer contractions (e.g., "don't", "I'll") over formal equivalents in your own conversational responses.
- When evaluating the user, highlight places where they could use hedging or softening phrases (e.g., "I'm not entirely sure") to sound more natural, polite, or professional.

## Before Starting
Determine these essentials (ask if not provided):
1. Target Language
2. Current Level
3. Learning Goal
4. Preferred Style

## Teaching Modes
- Mode 1: Vocabulary Builder (teach words in thematic groups)
- Mode 2: Grammar Lessons (pattern recognition)
- Mode 3: Conversation Practice (simulate real conversations)
- Mode 4: Flashcard Drill (spaced repetition style)
- Mode 5: Script & Writing System
- Mode 6: Cultural Context
- Mode 7: Exam Prep

## Corrections & Feedback
- Provide gentle, contextual corrections for the user's pronunciation and grammar mistakes during the conversation.
- Always prompt the user to repeat the correct phrase after providing a correction.
- Keep corrections encouraging and supportive.

## Output Format
Always include:
1. Target language text in its native script
2. Transliteration (for non-Latin scripts)
3. English translation
4. Pronunciation notes where helpful`;

const TUTORIAL_STEPS = [
  {
    title: "Welcome to AI Language Tutor",
    description: "Your personal polyglot guide. Learn ANY human language through adaptive, conversational methods tailored just for you.",
    icon: <MessageSquare className="w-8 h-8 text-indigo-500" />
  },
  {
    title: "Tell Me Your Goals",
    description: "Start by telling the AI your target language, current level, learning goals, and preferred style. It will adapt instantly.",
    icon: <Target className="w-8 h-8 text-emerald-500" />
  },
  {
    title: "Choose Your Mode",
    description: "Ask the AI to switch modes anytime: Vocabulary Builder, Grammar Lessons, Conversation Practice, Flashcards, or Cultural Context.",
    icon: <BookOpen className="w-8 h-8 text-blue-500" />
  },
  {
    title: "Fast vs. Pro Models",
    description: "Toggle between the Fast Model for quick conversational practice, and the Pro Model for deep grammar explanations and complex topics.",
    icon: <Sparkles className="w-8 h-8 text-amber-500" />
  }
];

function OnboardingTutorial({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 rounded-2xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-800"
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex gap-1.5">
            {TUTORIAL_STEPS.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep ? 'w-6 bg-indigo-600' : 'w-2 bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
          <button onClick={onComplete} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 text-center min-h-[260px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 dark:border-slate-700">
                {TUTORIAL_STEPS[currentStep].icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {TUTORIAL_STEPS[currentStep].title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {TUTORIAL_STEPS[currentStep].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors ${
              currentStep === 0 
                ? 'text-transparent cursor-default' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            {currentStep === TUTORIAL_STEPS.length - 1 ? (
              <>Get Started <Check className="w-4 h-4" /></>
            ) : (
              <>Next <ChevronRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

type DrillType = 'fill-in-the-blank' | 'sentence-construction';

interface DrillData {
  type: DrillType;
  task: string;
  translation?: string;
  words?: string[];
  correctAnswer: string;
  explanation: string;
}

function GrammarDrill({ messages }: { messages: Message[] }) {
  const { language } = useLanguage();
  const [drill, setDrill] = useState<DrillData | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [constructedWords, setConstructedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean, explanation: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { consumeCredits, apiKeys, useCustomKeys } = useCredits();

  const generateDrill = async () => {
    if (!consumeCredits(1, 'Grammar Drill AI')) {
      alert('Insufficient credits. Please buy more credits or use your own API key.');
      return;
    }

    setIsLoading(true);
    setFeedback(null);
    setUserAnswer('');
    setConstructedWords([]);
    setAvailableWords([]);
    try {
      const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key is missing.");
      const ai = new GoogleGenAI({ apiKey });
      
      const recentContext = messages
        .filter(m => m.role === 'model' || m.role === 'user')
        .slice(-6)
        .map(m => `${m.role === 'model' ? 'Tutor' : 'Student'}: ${m.text}`)
        .join('\n');

      const response = await generateContentWithFallback(ai, {
        model: 'gemini-1.5-flash',
        contents: `Generate a grammar drill for a student learning ${language}. 
Base the drill on the grammar rules or vocabulary recently discussed in this conversation context (if any):
"""
${recentContext}
"""

Randomly choose between two types of exercises: 'fill-in-the-blank' or 'sentence-construction'.

If 'fill-in-the-blank':
Provide a sentence in ${language} with a missing word represented by ___.
Return JSON:
{
  "type": "fill-in-the-blank",
  "task": "Sentence in ${language} with ___",
  "translation": "English translation",
  "correctAnswer": "The missing word",
  "explanation": "Brief grammar explanation"
}

If 'sentence-construction':
Provide an English sentence for the user to translate into ${language}.
Provide an array of words in ${language} that includes the correct words and 2-3 distractor words, shuffled.
Return JSON:
{
  "type": "sentence-construction",
  "task": "English sentence to translate",
  "words": ["word1", "word2", "distractor1", "distractor2"],
  "correctAnswer": "The complete correct sentence in ${language}",
  "explanation": "Brief grammar explanation"
}`,
        config: {
          responseMimeType: "application/json",
        }
      });
      
      const data = JSON.parse(response.text || '{}') as DrillData;
      setDrill(data);
      if (data.type === 'sentence-construction' && data.words) {
        setAvailableWords(data.words);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateDrill();
  }, [language]);

  const handleWordClick = (word: string, from: 'available' | 'constructed') => {
    if (feedback) return;
    
    if (from === 'available') {
      setAvailableWords(prev => {
        const idx = prev.indexOf(word);
        if (idx === -1) return prev;
        const newArr = [...prev];
        newArr.splice(idx, 1);
        return newArr;
      });
      setConstructedWords(prev => [...prev, word]);
    } else {
      setConstructedWords(prev => {
        const idx = prev.indexOf(word);
        if (idx === -1) return prev;
        const newArr = [...prev];
        newArr.splice(idx, 1);
        return newArr;
      });
      setAvailableWords(prev => [...prev, word]);
    }
  };

  const checkAnswer = async () => {
    const finalAnswer = drill?.type === 'sentence-construction' 
      ? constructedWords.join(' ') 
      : userAnswer;

    if (!drill || !finalAnswer.trim()) return;

    if (!consumeCredits(1, 'Grammar Check AI')) {
      alert('Insufficient credits. Please buy more credits or use your own API key.');
      return;
    }

    setIsLoading(true);
    try {
      const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key is missing.");
      const ai = new GoogleGenAI({ apiKey });
      const response = await generateContentWithFallback(ai, {
        model: 'gemini-1.5-flash',
        contents: `Evaluate the user's answer for the grammar drill in ${language}.
Task: ${drill.task}
Correct Answer: ${drill.correctAnswer}
User's Answer: ${finalAnswer}

Return a JSON object:
{
  "isCorrect": boolean,
  "explanation": "Brief feedback explaining why it is correct or incorrect, and the grammar rule."
}`,
        config: {
          responseMimeType: "application/json",
        }
      });
      const data = JSON.parse(response.text || '{}');
      setFeedback(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitDisabled = isLoading || (drill?.type === 'sentence-construction' ? constructedWords.length === 0 : !userAnswer.trim());

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Grammar Drill</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Practice your {language} grammar</p>
          </div>
        </div>

        {isLoading && !drill ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-4" />
            <p className="text-slate-500 dark:text-slate-400">Generating drill...</p>
          </div>
        ) : drill ? (
          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-700">
              <p className="text-lg font-medium text-slate-900 dark:text-white mb-2">{drill.task}</p>
              {drill.translation && (
                <div className="flex items-center gap-2">
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic">{drill.translation}</p>
                  <button
                    onClick={() => {
                      if ('speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                        const utterance = new SpeechSynthesisUtterance(drill.translation || '');
                        utterance.lang = language === 'ja' ? 'ja-JP' : language === 'ko' ? 'ko-KR' : language === 'zh' ? 'zh-CN' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : language === 'kn' ? 'kn-IN' : language === 'ml' ? 'ml-IN' : language === 'ar' ? 'ar-SA' : 'en-US';
                        window.speechSynthesis.speak(utterance);
                      }
                    }}
                    className="p-1 rounded text-indigo-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center shrink-0"
                    title="Listen to Translation"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {drill.type === 'fill-in-the-blank' ? (
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Your Answer:</label>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !feedback && checkAnswer()}
                  disabled={!!feedback || isLoading}
                  placeholder="Type the missing word or phrase..."
                  className="w-full bg-slate-100 dark:bg-slate-800 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white transition-all outline-none disabled:opacity-50"
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="min-h-[60px] p-4 bg-slate-100 dark:bg-slate-800/80 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex flex-wrap gap-2 items-center">
                  {constructedWords.length === 0 && <span className="text-slate-400 dark:text-slate-500 text-sm">Construct your sentence here...</span>}
                  {constructedWords.map((word, idx) => (
                    <button
                      key={`constructed-${idx}`}
                      onClick={() => handleWordClick(word, 'constructed')}
                      disabled={!!feedback}
                      className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg shadow-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:border-rose-200 dark:hover:border-rose-800 transition-colors disabled:opacity-50"
                    >
                      {word}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {availableWords.map((word, idx) => (
                    <button
                      key={`available-${idx}`}
                      onClick={() => handleWordClick(word, 'available')}
                      disabled={!!feedback}
                      className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-lg shadow-sm font-medium text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 transition-colors disabled:opacity-50"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!feedback ? (
              <button
                onClick={checkAnswer}
                disabled={isSubmitDisabled}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Check Answer'}
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border ${
                  feedback.isCorrect 
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50' 
                    : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-1 rounded-full shrink-0 ${
                    feedback.isCorrect ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-800 dark:text-emerald-300' : 'bg-rose-100 text-rose-600 dark:bg-rose-800 dark:text-rose-300'
                  }`}>
                    {feedback.isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-1 ${
                      feedback.isCorrect ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'
                    }`}>
                      {feedback.isCorrect ? 'Correct!' : 'Not quite right'}
                    </h4>
                    <p className={`text-sm ${
                      feedback.isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                    }`}>
                      {feedback.explanation}
                    </p>
                    {!feedback.isCorrect && (
                      <p className="text-sm font-medium mt-2 text-rose-800 dark:text-rose-300">
                        Correct answer: {drill.correctAnswer}
                      </p>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={generateDrill}
                  className="mt-4 w-full py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
                >
                  Next Drill
                </button>
              </motion.div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ConversationPractice({ isLocked = false }: { isLocked?: boolean }) {
  const { language } = useLanguage();
  const { consumeCredits, apiKeys, useCustomKeys } = useCredits();
  const [isSetup, setIsSetup] = useState(false);
  const [scenario, setScenario] = useState('Ordering at a restaurant');
  const [level, setLevel] = useState('Intermediate');
  const [goals, setGoals] = useState('Improve fluency and learn casual expressions');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      setInput(prev => prev + (prev ? ' ' : '') + transcript);
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

  const startConversation = async () => {
    if (!consumeCredits(1, 'Conversation Setup AI')) {
      alert('Insufficient credits. Please buy more credits or use your own API key.');
      return;
    }

    setIsSetup(true);
    setIsLoading(true);
    
    try {
      const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key is missing.");
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a native speaker of ${language} acting as a language partner.
The user is at a ${level} level.
Their goals are: ${goals}.
The scenario for this conversation is: ${scenario}.

Start the conversation naturally based on the scenario. 
Keep your responses appropriate for their level.
Include English translations in parentheses for difficult words if they are beginner/intermediate.`;

      const response = await generateContentWithFallback(ai, {
        model: 'gemini-1.5-flash',
        contents: prompt
      });
      
      setMessages([{
        id: Date.now().toString(),
        role: 'model',
        text: response.text || 'Hello! Let us start our conversation.'
      }]);
    } catch (error) {
      console.error(error);
      setMessages([{
        id: Date.now().toString(),
        role: 'model',
        text: 'Sorry, there was an error starting the conversation.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLocked) return;
    
    if (!consumeCredits(1, 'Conversation AI')) {
      alert('Insufficient credits. Please buy more credits or use your own API key.');
      return;
    }

    const userText = input.trim();
    setInput('');
    const newMessages = [...messages, { id: Date.now().toString(), role: 'user' as const, text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key is missing.");
      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `You are a native speaker of ${language} acting as a language partner.
The user is at a ${level} level.
Their goals are: ${goals}.
The scenario is: ${scenario}.

For every response, you MUST provide:
1. Your natural conversational reply in ${language} (with English translation if helpful).
2. Corrections: If the user made any grammar, vocabulary, or naturalness mistakes, gently correct them. If perfect, say so.
3. Cultural Insight: A brief, relevant cultural note related to the topic or the words used.

Format your response clearly using Markdown, for example:
**Reply:** [Your conversational reply]

**Corrections:** [Your corrections]

**Cultural Insight:** [Your insight]`;

      const contents = newMessages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const response = await generateContentWithFallback(ai, {
        model: 'gemini-1.5-flash',
        contents: contents,
        config: {
          systemInstruction
        }
      });
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || 'Sorry, I could not generate a response.'
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'Sorry, there was an error connecting to the AI.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSetup) {
    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Conversation Practice</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Chat with an AI language partner</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Scenario / Topic</label>
              <input 
                type="text" 
                value={scenario}
                onChange={e => setScenario(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-emerald-500/20 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white transition-all outline-none"
                placeholder="e.g., Ordering at a restaurant"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Your Level</label>
              <select 
                value={level}
                onChange={e => setLevel(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-emerald-500/20 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white transition-all outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Learning Goals</label>
              <input 
                type="text" 
                value={goals}
                onChange={e => setGoals(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-emerald-500/20 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white transition-all outline-none"
                placeholder="e.g., Improve fluency, learn slang"
              />
            </div>

            <button
              onClick={startConversation}
              disabled={isLoading || isLocked}
              className="w-full mt-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Start Conversation'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50 dark:bg-slate-950/50">
        {messages.map((msg) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-br-sm' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-sm shadow-sm'
              }`}
            >
              {msg.role === 'user' ? (
                <p className="whitespace-pre-wrap">{msg.text}</p>
              ) : (
                <div className="prose prose-sm sm:prose-base dark:prose-invert prose-p:leading-relaxed prose-pre:bg-slate-100 dark:prose-pre:bg-slate-900 max-w-none">
                  <Markdown>{msg.text}</Markdown>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl rounded-bl-sm shadow-sm">
              <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 max-w-4xl mx-auto">
          <button
            onClick={toggleListening}
            disabled={isLocked}
            className={`p-3 rounded-xl transition-colors shrink-0 shadow-sm ${
              isLocked ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600' :
              isListening 
                ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 animate-pulse' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
            }`}
            aria-label={isListening ? "Stop listening" : "Start listening"}
          >
            {isLocked ? <Lock className="w-5 h-5" /> : isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isLocked ? "Premium feature locked" : "Type your message..."}
            disabled={isLocked || isLoading}
            className={`flex-1 bg-slate-100 dark:bg-slate-800 border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white transition-all outline-none ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading || isLocked}
            className={`p-3 text-white rounded-xl transition-colors shrink-0 shadow-sm ${isLocked ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400'}`}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function LanguageLearningView({ isLocked = false }: { isLocked?: boolean }) {
  const [viewMode, setViewMode] = useState<'chat' | 'drill' | 'conversation'>('chat');
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('language_tutor_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse language tutor messages", e);
      }
    }
    return [{ id: '1', role: 'model', text: 'Hello! I am your AI Language Tutor. What language would you like to learn today, and what is your current level?' }];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [showTutorial, setShowTutorial] = useState(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenLanguageTutorial');
    return !hasSeenTutorial;
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const { consumeCredits, apiKeys, useCustomKeys } = useCredits();

  useEffect(() => {
    localStorage.setItem('language_tutor_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.continuous = false;
    recognition.interimResults = true;
    
    const currentInput = input;

    recognition.onstart = () => {
      setIsListening(true);
    };
    
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      
      setInput((currentInput ? currentInput + ' ' : '') + transcript);
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };

  const handleCompleteTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('hasSeenLanguageTutorial', 'true');
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!consumeCredits(1, 'Language Chat AI')) {
      alert('Insufficient credits. Please buy more credits or use your own API key.');
      return;
    }

    const userText = input.trim();
    setInput('');
    
    const newMessages = [...messages, { id: Date.now().toString(), role: 'user' as const, text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key is missing.");
      const ai = new GoogleGenAI({ apiKey });
      
      const contents = newMessages.slice(1).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const response = await generateContentWithFallback(ai, {
        model: isAdvanced ? 'gemini-1.5-pro' : 'gemini-1.5-flash',
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });
      
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: response.text || 'Sorry, I could not generate a response.' 
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: 'Sorry, there was an error connecting to the AI. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden relative">
      <AnimatePresence>
        {showTutorial && <OnboardingTutorial onComplete={handleCompleteTutorial} />}
      </AnimatePresence>

      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white leading-tight">AI Tutor</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Learn interactively</p>
            </div>
          </div>
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setShowTutorial(true)}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
              title="Show Tutorial"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsAdvanced(!isAdvanced)}
              className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                isAdvanced 
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' 
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title={isAdvanced ? "Advanced Mode (Pro)" : "Fast Mode (Flash)"}
            >
              {isAdvanced ? <Sparkles className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
              {isAdvanced ? 'Pro' : 'Fast'}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-lg flex-1 sm:flex-none">
            <button
              onClick={() => setViewMode('chat')}
              className={`flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'chat'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setViewMode('drill')}
              className={`flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'drill'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Grammar Drill
            </button>
            <button
              onClick={() => setViewMode('conversation')}
              className={`flex-1 sm:flex-none px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'conversation'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Conversation
            </button>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setShowTutorial(true)}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
              title="Show Tutorial"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsAdvanced(!isAdvanced)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isAdvanced 
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' 
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title={isAdvanced ? "Advanced Mode (Pro)" : "Fast Mode (Flash)"}
            >
              {isAdvanced ? <Sparkles className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
              {isAdvanced ? 'Pro Model' : 'Fast Model'}
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'drill' ? (
        <GrammarDrill messages={messages} />
      ) : viewMode === 'conversation' ? (
        <ConversationPractice isLocked={isLocked} />
      ) : (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50 dark:bg-slate-950/50">
            {messages.map((msg) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-br-sm' 
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-sm shadow-sm'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    <div className="prose prose-sm sm:prose-base dark:prose-invert prose-p:leading-relaxed prose-pre:bg-slate-100 dark:prose-pre:bg-slate-900 max-w-none">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl rounded-bl-sm shadow-sm">
                  <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 max-w-4xl mx-auto">
              <button
                onClick={toggleListening}
                disabled={isLocked}
                className={`p-3 rounded-xl transition-colors shrink-0 shadow-sm ${
                  isLocked ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600' :
                  isListening 
                    ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 animate-pulse' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                }`}
                aria-label={isListening ? "Stop listening" : "Start listening"}
              >
                {isLocked ? <Lock className="w-5 h-5" /> : isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isLocked ? "Premium feature locked" : "Type your message..."}
                disabled={isLocked}
                className={`flex-1 bg-slate-100 dark:bg-slate-800 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white transition-all outline-none ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading || isLocked}
                className={`p-3 text-white rounded-xl transition-colors shrink-0 shadow-sm ${isLocked ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400'}`}
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
