import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Brain, MessageSquare, BookOpen, ChevronRight, X, Headphones, Target, CheckCircle } from 'lucide-react';

const ONBOARDING_STEPS = [
  {
    title: "Welcome to LingoQuest!",
    description: "Your journey to English mastery starts here. We've crafted a unique path for you.",
    icon: <Sparkles className="w-12 h-12 text-amber-500" />,
    color: "from-amber-500 to-orange-500"
  },
  {
    title: "Expression Cards",
    description: "Learn idioms and common phrases through interactive daily cards. Speak them back to check your cadence.",
    icon: <BookOpen className="w-12 h-12 text-indigo-500" />,
    color: "from-indigo-500 to-purple-500"
  },
  {
    title: "Situation Challenges",
    description: "Practice real-world scenarios like office meetings or coffee shop chats with our AI tutor.",
    icon: <MessageSquare className="w-12 h-12 text-emerald-500" />,
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Shadowing Academy",
    description: "Mimic native speakers at different speeds to improve your rhythm and flow.",
    icon: <Headphones className="w-12 h-12 text-rose-500" />,
    color: "from-rose-500 to-pink-500"
  },
  {
    title: "Sentence Completion",
    description: "Master complex grammar and phrasal verbs with our dynamic AI-powered drills.",
    icon: <Brain className="w-12 h-12 text-blue-500" />,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Confidence Meter",
    description: "Track your progress across multiple dimensions and see your confidence grow daily.",
    icon: <Target className="w-12 h-12 text-purple-500" />,
    color: "from-purple-500 to-fuchsia-500"
  }
];

export function OnboardingFlow({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('onboarding_complete');
    if (!hasSeenOnboarding) {
      setIsVisible(true);
    } else {
      onComplete();
    }
  }, [onComplete]);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      localStorage.setItem('onboarding_complete', 'true');
      setIsVisible(false);
      onComplete();
    }
  };

  if (!isVisible) return null;

  const step = ONBOARDING_STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl"
      >
        <div className={`h-32 bg-gradient-to-br ${step.color} p-8 flex items-end justify-between relative`}>
          <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-white">
            {step.icon}
          </div>
          <button 
            onClick={() => {
              localStorage.setItem('onboarding_complete', 'true');
              setIsVisible(false);
              onComplete();
            }}
            className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-10 pt-12 text-center flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{step.title}</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-2 mt-12 mb-8">
            {ONBOARDING_STEPS.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentStep ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-200 dark:bg-slate-800'
                }`} 
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {currentStep === ONBOARDING_STEPS.length - 1 ? (
              <>Let's Get Started <CheckCircle className="w-6 h-6" /></>
            ) : (
              <>Continue <ChevronRight className="w-6 h-6" /></>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
