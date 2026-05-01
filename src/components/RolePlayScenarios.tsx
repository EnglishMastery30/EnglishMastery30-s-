import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Play, Save, Loader2, Target, CheckCircle, Activity, SkipForward, Brain, Languages, Volume2, ChevronLeft } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { generateContentWithFallback } from '../utils/aiFallback';
import { useCredits } from '../contexts/CreditsContext';
import { useLanguage, voiceMap, Language } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';

interface Feedback {
  grammar: string;
  pronunciationSuggestions: string;
  naturalness: string;
  overallScore: number;
}

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  translatedText?: string;
  isTranslating?: boolean;
  feedback?: Feedback;
}

const SCENARIOS = [
  // Beginner
  { id: '4', title: 'Ordering Dinner', description: 'Interact with a waiter to order a 3-course meal and handle a dietary restriction.', difficulty: 'Beginner' },
  { id: '5', title: 'Airport Immigration', description: 'Answer questions from an immigration officer at border control.', difficulty: 'Beginner' },
  { id: '10', title: 'Lost in the City', description: 'Ask a stranger for directions and understand their complex response.', difficulty: 'Beginner' },
  { id: '11', title: 'Daily Coffee', description: 'Order your favorite coffee with specific modifications at a busy café.', difficulty: 'Beginner' },
  { id: '12', title: 'Grocery Shopping', description: 'Ask a store clerk where to find specific items and inquire about prices.', difficulty: 'Beginner' },
  { id: '21', title: 'Library Card', description: 'Sign up for a library card and ask about the borrowing rules.', difficulty: 'Beginner' },
  { id: '22', title: 'Taxi Ride', description: 'Give directions to a taxi driver and discuss the best route to the airport.', difficulty: 'Beginner' },
  { id: '23', title: 'Weather Chat', description: 'Engage in small talk about the weather with a neighbor.', difficulty: 'Beginner' },
  { id: '24', title: 'Buying a Ticket', description: 'Buy a train ticket to a neighboring city and ask about seat reservations.', difficulty: 'Beginner' },
  { id: '25', title: 'Post Office', description: 'Mail a package internationally and inquire about shipping insurance.', difficulty: 'Beginner' },
  { id: '26', title: 'Gym Membership', description: 'Ask about gym hours, classes, and monthly membership fees.', difficulty: 'Beginner' },
  { id: '27', title: 'Booking a Table', description: 'Call a popular restaurant to book a table for a large group.', difficulty: 'Beginner' },
  { id: '28', title: 'Asking Time', description: 'Ask a stranger for the time and follow up with a brief conversation.', difficulty: 'Beginner' },
  { id: '29', title: 'Laundry Service', description: 'Drop off clothes at a dry cleaner and explain specific cleaning needs.', difficulty: 'Beginner' },
  { id: '30', title: 'Buying Flowers', description: 'Buy a bouquet for a friend and ask the florist for recommendations.', difficulty: 'Beginner' },
  
  // Intermediate
  { id: '6', title: 'Doctor Appointment', description: 'Describe your symptoms and answer the doctor\'s questions.', difficulty: 'Intermediate' },
  { id: '7', title: 'Hotel Check-in', description: 'Handle a missing reservation and request a room upgrade at a busy hotel.', difficulty: 'Intermediate' },
  { id: '8', title: 'IT Support Ticket', description: 'Call the help desk to report a critical software bug during a release.', difficulty: 'Intermediate' },
  { id: '13', title: 'Asking for a Favor', description: 'Politely ask a neighbor or colleague for a significant favor and explain why you need it.', difficulty: 'Intermediate' },
  { id: '14', title: 'Returning an Item', description: 'Return a defective product to a store and negotiate for a full refund or exchange.', difficulty: 'Intermediate' },
  { id: '15', title: 'Apartment Tour', description: 'Ask a landlord detailed questions about an apartment and discuss the lease terms.', difficulty: 'Intermediate' },
  { id: '31', title: 'Career Advice', description: 'Ask a more experienced colleague for advice on which skills to develop next.', difficulty: 'Intermediate' },
  { id: '32', title: 'Planning a Trip', description: 'Discuss travel itineraries and budget with a friend or travel agent.', difficulty: 'Intermediate' },
  { id: '33', title: 'Fixing a Mistake', description: 'Explain a minor work error to your teammate and propose a fix.', difficulty: 'Intermediate' },
  { id: '34', title: 'Giving Directions', description: 'Help a tourist find several local landmarks using landmarks and orientation.', difficulty: 'Intermediate' },
  { id: '35', title: 'Movie Debate', description: 'Discuss and debate the themes of a recent movie with a friend.', difficulty: 'Intermediate' },
  { id: '36', title: 'Tech Support', description: 'Help an older relative troubleshoot a problem with their tablet or phone.', difficulty: 'Intermediate' },
  { id: '37', title: 'Neighbor Noise', description: 'Politely ask a neighbor to keep the noise down during late hours.', difficulty: 'Intermediate' },
  { id: '38', title: 'Interview prep', description: 'Practice a mock interview for a junior web developer position.', difficulty: 'Intermediate' },
  { id: '39', title: 'Car Rental', description: 'Rent a car in a foreign country and discuss insurance and fuel policies.', difficulty: 'Intermediate' },
  { id: '40', title: 'Restaurant Complaint', description: 'Politely complain about a cold meal or slow service at a restaurant.', difficulty: 'Intermediate' },
  { id: '41', title: 'Pet Adoption', description: 'Ask a shelter worker about a specific pet\'s history and requirements.', difficulty: 'Intermediate' },
  { id: '42', title: 'School Meeting', description: 'Discuss your child\'s progress with their teacher during a parent-teacher conference.', difficulty: 'Intermediate' },
  { id: '43', title: 'Bank Account', description: 'Open a new savings account and ask about interest rates and fees.', difficulty: 'Intermediate' },
  { id: '44', title: 'Work Presentation', description: 'Briefly present your project progress to a small team and take feedback.', difficulty: 'Intermediate' },
  { id: '45', title: 'Social Invitation', description: 'Politely decline a social invitation and suggest an alternative time.', difficulty: 'Intermediate' },

  // Advanced
  { id: '1', title: 'Salary Negotiation', description: 'Negotiate a starting salary for a new software developer role.', difficulty: 'Advanced' },
  { id: '2', title: 'Performance Review', description: 'Discuss your yearly achievements with your manager and ask for a promotion.', difficulty: 'Advanced' },
  { id: '3', title: 'Code Review Disagreement', description: 'Push back politely on a senior engineer\'s requested changes to your PR.', difficulty: 'Advanced' },
  { id: '9', title: 'Job Interview', description: 'Answer common behavioral questions for a Project Manager position.', difficulty: 'Advanced' },
  { id: '16', title: 'Crisis Management', description: 'Update your team on a major project delay and outline the recovery plan.', difficulty: 'Advanced' },
  { id: '17', title: 'Persuading a Client', description: 'Convince a skeptical client to adopt a new strategy or purchase a premium service.', difficulty: 'Advanced' },
  { id: '18', title: 'Ethical Dilemma', description: 'Discuss a complex ethical situation at work with a trusted mentor.', difficulty: 'Advanced' },
  { id: '19', title: 'Conflict Resolution', description: 'Politely disagree with a colleague\'s suggestion and mediate a professional compromise.', difficulty: 'Advanced' },
  { id: '20', title: 'Giving Feedback', description: 'Deliver constructive, professional feedback to a team member about their recent performance.', difficulty: 'Advanced' },
  { id: '46', title: 'Board Meeting', description: 'Argue for a budget increase for your department in front of company leadership.', difficulty: 'Advanced' },
  { id: '47', title: 'Product Pitch', description: 'Pitch your startup idea to a group of potential angel investors.', difficulty: 'Advanced' },
  { id: '48', title: 'Media Interview', description: 'Answer tough questions from a journalist about a controversial company decision.', difficulty: 'Advanced' },
  { id: '49', title: 'Public Speaking', description: 'Deliver a persuasive speech about the importance of mental health in the workplace.', difficulty: 'Advanced' },
  { id: '50', title: 'Negotiating a Lease', description: 'Negotiate favorable terms for a commercial lease for your new office.', difficulty: 'Advanced' },
  { id: '51', title: 'Legal Consultation', description: 'Explain a complex business situation to a lawyer and seek legal advice.', difficulty: 'Advanced' },
  { id: '52', title: 'Strategic Planning', description: 'Lead a strategic planning session for your team for the upcoming fiscal year.', difficulty: 'Advanced' },
  { id: '53', title: 'Diplomatic Talk', description: 'Navigate a sensitive political discussion with a high-profile international contact.', difficulty: 'Advanced' },
  { id: '54', title: 'Handling a Scandal', description: 'Draft and discuss a formal response to a PR crisis affecting your personal brand.', difficulty: 'Advanced' },
  { id: '55', title: 'Keynote Speech', description: 'Summarize the core message of a technology conference in a closing keynote.', difficulty: 'Advanced' }
];

const DIFFICULTY_COLORS = {
  Beginner: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Advanced: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
};

interface RolePlayScenariosProps {
  onBack?: () => void;
}

export function RolePlayScenarios({ onBack }: RolePlayScenariosProps) {
  const [selectedScenario, setSelectedScenario] = useState<{ id: string, title: string, description: string } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<Message[][]>([]);
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const MAX_INPUT_LENGTH = 1000;
  const [isLoading, setIsLoading] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { consumeCredits, apiKeys, useCustomKeys } = useCredits();
  const { targetLanguage } = useLanguage();

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
      alert("Microphone permission is required.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript) {
         setInputText(prev => prev + (prev ? ' ' : '') + finalTranscript);
      }
    };
    
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
  };

  const rollback = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setMessages(previousState);
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const startScenario = async (scenario: any) => {
    setSelectedScenario(scenario);
    setMessages([]);
    setHistory([]);
    setIsLoading(true);

    if (!consumeCredits(1, 'Roleplay Init AI')) {
      alert("Insufficient credits");
      setIsLoading(false);
      return;
    }

    try {
      const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key is missing.");
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `You are playing the counterpart in a roleplay scenario to help an English learner.
Scenario: ${scenario.title}. ${scenario.description}.
Start the conversation naturally, playing your role exactly. Speak completely in English. Keep the first message to 2-3 sentences.`;

      const response = await generateContentWithFallback(ai, {
        model: 'gemini-1.5-flash',
        contents: prompt
      });

      setMessages([{ id: Date.now().toString(), role: 'model', text: response.text || 'Let\'s begin.' }]);
    } catch (error) {
      console.error(error);
      setMessages([{ id: Date.now().toString(), role: 'model', text: 'Failed to start scenario.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const translateMessage = async (msgId: string, textToTranslate: string) => {
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isTranslating: true } : m));
    
    if (!consumeCredits(1, 'Roleplay Translation')) {
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isTranslating: false } : m));
      return;
    }

    try {
      const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key is missing.");
      const ai = new GoogleGenAI({ apiKey });

      const response = await generateContentWithFallback(ai, {
        model: 'gemini-1.5-flash',
        contents: `Translate the following English text to ${targetLanguage}. Provide ONLY the translation, nothing else. Text: "${textToTranslate}"`
      });

      setMessages(prev => prev.map(m => 
        m.id === msgId ? { ...m, translatedText: response.text, isTranslating: false } : m
      ));
    } catch (error) {
      console.error(error);
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isTranslating: false } : m));
    }
  };

  const handlePlayAudio = (text: string, e: React.MouseEvent, lang: string = 'en-US') => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = playSpeed;
      
      const voices = window.speechSynthesis.getVoices();
      const targetVoice = voices.find(v => v.lang.startsWith(lang));
      if (targetVoice) utterance.voice = targetVoice;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || !selectedScenario) return;

    if (!consumeCredits(2, 'Roleplay Turn AI')) {
      alert("Insufficient credits");
      return;
    }

    const userText = inputText.trim();
    setInputText('');
    if (isListening) toggleListening();

    // Save history for rollback
    setHistory(prev => [...prev, messages]);

    const newMessages: Message[] = [...messages, { id: Date.now().toString(), role: 'user', text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key is missing.");
      const ai = new GoogleGenAI({ apiKey });

      // Build history for conversational context
      const chatHistory = newMessages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // 1. Get the AI's response to continue the conversation
      const replySystemPrompt = `You are a strict but fair language evaluator and roleplay counterpart.
Scenario: ${selectedScenario.title}.
Play your role naturally. Keep your response to 2-4 sentences max. Ensure your feedback and conversational replies follow natural tone guidelines: prefer contractions over formal equivalents (e.g. use "I'm" not "I am"), and use hedging or softening phrases where appropriate to sound professional but polite.`;

      const replyPromise = generateContentWithFallback(ai, {
        model: 'gemini-1.5-flash',
        contents: chatHistory,
        config: { systemInstruction: replySystemPrompt }
      });

      // 2. Get the evaluation of the user's latest message
      const evalSystemPrompt = `Evaluate the following English message sent by an ESL learner in a professional roleplay scenario.
Always favor natural-sounding, constructive, and specific feedback. Focus intensely on FLUENY and NATURALNESS.

Return a JSON object with this exact structure:
{
  "grammar": "A brief sentence correcting any grammar mistakes, or 'Perfect' if none.",
  "pronunciationSuggestions": "Identify word transitions or specific sounds they might struggle with. Suggest ways to improve pronunciation.",
  "naturalness": "Deep feedback on how natural the phrasing is. Does it sound like a native speaker? Is the tone appropriate?",
  "overallScore": number between 1 to 10
}`;

      const evalPromise = generateContentWithFallback(ai, {
        model: 'gemini-1.5-flash',
        contents: `User message to evaluate: "${userText}"`,
        config: { systemInstruction: evalSystemPrompt, responseMimeType: 'application/json' }
      });

      const [replyRes, evalRes] = await Promise.all([replyPromise, evalPromise]);
      const feedbackData: Feedback = JSON.parse(evalRes.text || '{}');

      // Update the user's message with the fetched feedback
      setMessages(prev => {
        const next = [...prev];
        const lastUserIdx = next.findLastIndex(m => m.role === 'user');
        if (lastUserIdx !== -1) {
          next[lastUserIdx].feedback = feedbackData;
        }
        next.push({ id: (Date.now() + 1).toString(), role: 'model', text: replyRes.text || 'Mhm.' });
        return next;
      });

    } catch (error: any) {
      console.error('Roleplay error:', error);
      let errorMessage = 'Let\'s pause the roleplay. There was a connection error.';
      
      if (error.message?.includes('API key')) {
        errorMessage = 'Your Gemini API key is missing or invalid. Please check your settings.';
      } else if (error.message?.includes('safety')) {
        errorMessage = 'I cannot respond due to safety filters. Please try rephrasing your message.';
      } else if (error.message?.includes('quota') || error.message?.includes('429')) {
        errorMessage = 'AI quota exceeded. Please wait a moment or switch to your own API key.';
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: errorMessage }]);
    } finally {
        setIsLoading(false);
    }
  };

  if (!selectedScenario) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center gap-4 mb-6">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500 hover:text-slate-900 dark:hover:text-white"
              title="Go Back"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <div className="p-2.5 bg-fuchsia-100 dark:bg-fuchsia-900/50 text-fuchsia-600 dark:text-fuchsia-400 rounded-xl">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Speak & Respond Roleplay</h2>
        </div>

        <div className="mb-8 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-slate-600 dark:text-slate-400">
            Practice speaking English out loud. Engage in challenging professional scenarios and receive deep, AI-driven feedback on your fluency, word choices, and naturalness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCENARIOS.map(s => (
            <div key={s.id} onClick={() => startScenario(s)} className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-none hover:border-fuchsia-400 hover:shadow-md cursor-pointer transition-all group group-hover:-translate-y-1 relative h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${DIFFICULTY_COLORS[s.difficulty as keyof typeof DIFFICULTY_COLORS]}`}>
                  {s.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400">{s.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm flex-1">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-4 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex items-center justify-between mb-4 bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSelectedScenario(null)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl mr-1 text-slate-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 bg-fuchsia-100 dark:bg-fuchsia-900/40 rounded-xl flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 -mb-0.5">Scenario</div>
            <h2 className="font-bold text-slate-900 dark:text-white">{selectedScenario.title}</h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={rollback}
            disabled={history.length === 0}
            className={`px-3 py-1 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${
              history.length === 0 
                ? 'opacity-30 cursor-not-allowed text-slate-400' 
                : 'text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10'
            }`}
          >
            Undo Last
          </button>
          
          <div className="hidden md:flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-1 rounded-xl">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Speed</span>
          {[0.5, 1, 1.5, 2].map((speed) => (
            <button
              key={speed}
              onClick={() => setPlaySpeed(speed)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                playSpeed === speed 
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>

        <button onClick={() => setSelectedScenario(null)} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 font-medium text-sm">
          End Scenario
        </button>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] rounded-2xl overflow-hidden ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm rounded-bl-sm'}`}>
              <div className="p-4">
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                {msg.translatedText && (
                  <div className="mt-3 pt-3 border-t border-slate-200/20 dark:border-slate-700/50">
                    <p className={`text-sm ${msg.role === 'user' ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}>{msg.translatedText}</p>
                  </div>
                )}
              </div>
              
              {/* Action Bar */}
              <div className={`flex items-center gap-1 px-3 py-2 bg-black/5 dark:bg-black/20 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <button
                  onClick={(e) => handlePlayAudio(msg.text, e, 'en-US')}
                  className={`p-1.5 rounded-lg hover:bg-black/10 transition-colors ${msg.role === 'user' ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}
                  title="Listen in English"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                
                {msg.translatedText && (
                  <button
                    onClick={(e) => handlePlayAudio(msg.translatedText!, e, voiceMap[targetLanguage as Language] || targetLanguage)}
                    className={`p-1.5 rounded-lg hover:bg-black/10 transition-colors ${msg.role === 'user' ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}
                    title="Listen to translation"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                )}

                {!msg.translatedText && (
                  <button
                    onClick={() => translateMessage(msg.id, msg.text)}
                    disabled={msg.isTranslating}
                    className={`p-1.5 rounded-lg hover:bg-black/10 transition-colors flex items-center gap-1 text-xs font-medium ${msg.role === 'user' ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}
                  >
                    {msg.isTranslating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Languages className="w-4 h-4" />
                        Translate
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
            
            {msg.role === 'user' && msg.feedback && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="w-full max-w-[85%] mt-3 p-4 bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl shadow-sm text-left">
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider">
                    <Activity className="w-4 h-4" /> AI Feedback
                  </div>
                  <div className="font-black text-indigo-600 dark:text-indigo-400">{msg.feedback.overallScore}/10 Score</div>
                </div>

                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">✍️ Grammar & Corrections:</span>
                    <span className="text-slate-600 dark:text-slate-400">{msg.feedback.grammar}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">🗣️ Pronunciation Tips:</span>
                    <span className="text-slate-600 dark:text-slate-400">{msg.feedback.pronunciationSuggestions}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">🤝 Naturalness & Tone:</span>
                    <span className="text-slate-600 dark:text-slate-400">{msg.feedback.naturalness}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" /> Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-3 shrink-0">
        <button
          onClick={toggleListening}
          className={`p-4 rounded-xl transition-colors shadow-sm shrink-0 ${isListening ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
        <div className="flex-1 flex flex-col relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value.slice(0, MAX_INPUT_LENGTH))}
            placeholder="Speak into your microphone or type here..."
            className="w-full bg-slate-50 dark:bg-slate-800 border-transparent focus:border-indigo-500 rounded-xl px-4 py-3 text-slate-900 dark:text-white resize-none min-h-[60px] outline-none"
            rows={2}
          />
          {inputText.length > MAX_INPUT_LENGTH * 0.8 && (
            <span className={`absolute -top-6 right-0 text-[10px] font-bold ${inputText.length >= MAX_INPUT_LENGTH ? 'text-rose-500' : 'text-slate-400'}`}>
              {inputText.length}/{MAX_INPUT_LENGTH}
            </span>
          )}
        </div>
        <button
          onClick={handleSend}
          disabled={!inputText.trim() || isLoading}
          className="px-6 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl shadow-sm shrink-0 font-bold"
        >
          Send
        </button>
      </div>
    </div>
  );
}
