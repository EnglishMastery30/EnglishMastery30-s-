import { useState } from 'react';
import { BookOpen, RefreshCw, Layers, CheckCircle2, Volume2, ArrowRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VocabWord {
  word: string;
  pronunciation: string;
  context: string;
  example: string;
}

interface ThematicSet {
  id: string;
  theme: string;
  description: string;
  words: VocabWord[];
}

const THEMATIC_SETS: ThematicSet[] = [
  {
    id: 'startup_launch',
    theme: 'Startup & Product Launch',
    description: 'Words commonly used when launching a new app or service.',
    words: [
      { word: 'MVP (Minimum Viable Product)', pronunciation: '/ˌɛm viː ˈpiː/', context: 'Product Management', example: 'We need to define the MVP before we start coding.' },
      { word: 'Traction', pronunciation: '/ˈtrækʃən/', context: 'Marketing / Growth', example: 'Our marketing campaign is finally gaining traction.' },
      { word: 'Pivot', pronunciation: '/ˈpɪvət/', context: 'Strategy', example: 'The founders decided to pivot the company toward enterprise clients.' },
      { word: 'Scalability', pronunciation: '/ˌskeɪləˈbɪlɪti/', context: 'Engineering', example: 'Scalability is a major concern with our current database architecture.' },
      { word: 'Churn Rate', pronunciation: '/tʃɜːrn reɪt/', context: 'Business Metrics', example: 'We need to decrease our churn rate to ensure long-term growth.' },
      { word: 'Runway', pronunciation: '/ˈrʌnˌweɪ/', context: 'Finance', example: 'With our current burn rate, we have about six months of runway left.' },
      { word: 'Disruptive', pronunciation: '/dɪsˈrʌptɪv/', context: 'Innovation', example: 'They are working on a disruptive technology that could change the industry.' }
    ]
  },
  {
    id: 'agile_dev',
    theme: 'Agile & Software Development',
    description: 'Terminology used in daily stand-ups and sprint planning.',
    words: [
      { word: 'Bandwidth', pronunciation: '/ˈbændwɪdθ/', context: 'Capacity Planning', example: 'Do you have the bandwidth to take on another ticket this sprint?' },
      { word: 'Blocker', pronunciation: '/ˈblɒkər/', context: 'Stand-up Meeting', example: 'My only blocker right now is waiting for the design assets.' },
      { word: 'Deprecate', pronunciation: '/ˈdɛprɪkeɪt/', context: 'Code Maintenance', example: 'We plan to deprecate the old v1 API next month.' },
      { word: 'Tech Debt', pronunciation: '/tɛk dɛt/', context: 'Architecture', example: 'We must allocate time this sprint to address our growing tech debt.' },
      { word: 'Refactor', pronunciation: '/ˌriːˈfæktər/', context: 'Development', example: 'We need to refactor this module to make it more maintainable.' },
      { word: 'Backlog', pronunciation: '/ˈbækˌlɔːɡ/', context: 'Planning', example: 'Let\'s go through the product backlog to prioritize the next set of features.' },
      { word: 'Stakeholder', pronunciation: '/ˈsteɪkˌhoʊldər/', context: 'Management', example: 'We need to gather feedback from all key stakeholders before moving forward.' }
    ]
  },
  {
    id: 'ux_design',
    theme: 'UX/UI & Product Design',
    description: 'Words for designing intuitive and beautiful digital experiences.',
    words: [
      { word: 'Friction', pronunciation: '/ˈfrɪkʃən/', context: 'User Flow', example: 'We need to remove friction from the signup process.' },
      { word: 'Heuristics', pronunciation: '/hjʊˈrɪstɪks/', context: 'Evaluation', example: 'The design team conducted a heuristic evaluation of the app.' },
      { word: 'Prototype', pronunciation: '/ˈproʊtəˌtaɪp/', context: 'Design Process', example: 'I built a high-fidelity prototype to test the new navigation.' },
      { word: 'Affordance', pronunciation: '/əˈfɔːrdəns/', context: 'Interaction Design', example: 'The button\'s drop shadow provides a clear affordance for clicking.' },
      { word: 'Accessibility', pronunciation: '/əkˌsɛsəˈbɪlɪti/', context: 'Inclusivity', example: 'We must ensure our website meets WCAG accessibility standards.' },
      { word: 'Wireframe', pronunciation: '/ˈwaɪərˌfreɪm/', context: 'Ideation', example: 'Let\'s start with low-fidelity wireframes to map out the structure.' },
      { word: 'Micro-interaction', pronunciation: '/ˌmaɪkroʊˌɪntərˈækʃən/', context: 'Polishing', example: 'The subtle animation when liking a post is a great micro-interaction.' }
    ]
  },
  {
    id: 'networking',
    theme: 'Professional Networking',
    description: 'Making connections at conferences and industry events.',
    words: [
      { word: 'Elevator Pitch', pronunciation: '/ˈɛləˌveɪtər pɪtʃ/', context: 'Introduction', example: 'Can you give me your 30-second elevator pitch?' },
      { word: 'Follow-up', pronunciation: '/ˈfɑːloʊ ʌp/', context: 'Post-event', example: 'I\'ll send a follow-up email to the recruiter I met yesterday.' },
      { word: 'Referral', pronunciation: '/rɪˈfɜːrəl/', context: 'Job Search', example: 'I got this interview through a referral from a former colleague.' },
      { word: 'Pain Point', pronunciation: '/peɪn pɔɪnt/', context: 'Sales / Networking', example: 'The best way to network is to identify a prospect\'s pain points.' },
      { word: 'Value Prop', pronunciation: '/ˈvæljuː prɒp/', context: 'Pitching', example: 'What\'s the core value prop of your new startup?' },
      { word: 'Synergy', pronunciation: '/ˈsɪnərdʒi/', context: 'Collaboration', example: 'There\'s great synergy between our two departments.' },
      { word: 'Outreach', pronunciation: '/ˈaʊtˌriːtʃ/', context: 'Growth', example: 'Our LinkedIn outreach program has been very successful.' }
    ]
  },
  {
    id: 'remote_work',
    theme: 'Remote Work & Collaboration',
    description: 'Working effectively in distributed teams.',
    words: [
      { word: 'Asynchronous', pronunciation: '/eɪˈsɪŋkrənəs/', context: 'Communication', example: 'We prefer asynchronous communication to avoid constant interruptions.' },
      { word: 'Deep Work', pronunciation: '/diːp wɜːrk/', context: 'Productivity', example: 'I block off four hours every morning for deep work.' },
      { word: 'Focus Time', pronunciation: '/ˈfoʊkəs taɪm/', context: 'Scheduling', example: 'Please do not schedule meetings during my afternoon focus time.' },
      { word: 'Digital Nomad', pronunciation: '/ˈdɪdʒɪtəl ˈnoʊmæd/', context: 'Lifestyle', example: 'She\'s been living as a digital nomad in Bali for six months.' },
      { word: 'Onboarding', pronunciation: '/ˈɑːnˌbɔːrdɪŋ/', context: 'New Hires', example: 'Our remote onboarding process includes several video introductions.' },
      { word: 'Time Zone', pronunciation: '/taɪm zoʊn/', context: 'Coordination', example: 'We have teammates in five different time zones.' },
      { word: 'Burnout', pronunciation: '/ˈbɜːrnˌaʊt/', context: 'Mental Health', example: 'Setting boundaries is essential to avoid remote work burnout.' }
    ]
  },
  {
    id: 'data_science',
    theme: 'Data & Analytics',
    description: 'Measuring success and making data-driven decisions.',
    words: [
      { word: 'Conversion', pronunciation: '/kənˈvɜːrʒən/', context: 'Marketing', example: 'We need to optimize our landing page for better conversion.' },
      { word: 'KPI (Key Performance Indicator)', pronunciation: '/ˌkeɪ piː ˈaɪ/', context: 'Management', example: 'Customer retention is one of our most important KPIs.' },
      { word: 'A/B Testing', pronunciation: '/ˌeɪ ˈbiː ˈtɛstɪŋ/', context: 'Optimization', example: 'We are running an A/B test on the checkout button color.' },
      { word: 'Granularity', pronunciation: '/ˌɡrænjʊˈlærɪti/', context: 'Data Detail', example: 'We need more granularity in our user engagement reports.' },
      { word: 'Outlier', pronunciation: '/ˈaʊtˌlaɪər/', context: 'Statistics', example: 'This data point is an outlier and should be excluded from the average.' },
      { word: 'Actionable', pronunciation: '/ˈækʃənəbl/', context: 'Insights', example: 'We need actionable insights, not just more charts.' },
      { word: 'Anomaly', pronunciation: '/əˈnɒməl i/', context: 'Security / Ops', example: 'The system detected an anomaly in the traffic patterns.' }
    ]
  },
  {
    id: 'finance',
    theme: 'Business & Finance',
    description: 'Managing budgets and understanding the bottom line.',
    words: [
      { word: 'ROI (Return on Investment)', pronunciation: '/ˌɑːr oʊ ˈaɪ/', context: 'Investment', example: 'We expect a high ROI from this new software acquisition.' },
      { word: 'EBITDA', pronunciation: '/ˈiːbɪtdɑː/', context: 'Accounting', example: 'Our EBITDA has grown significantly over the last three quarters.' },
      { word: 'Equity', pronunciation: '/ˈɛkwɪti/', context: 'Compensation', example: 'The startup offered me a competitive salary plus 0.5% equity.' },
      { word: 'Vesting', pronunciation: '/ˈvɛstɪŋ/', context: 'Benefits', example: 'My shares follow a standard four-year vesting schedule.' },
      { word: 'Overhead', pronunciation: '/ˈoʊvərˌhɛd/', context: 'Expenses', example: 'Renting a large office adds a lot to our monthly overhead.' },
      { word: 'Fiscal', pronunciation: '/ˈfɪskəl/', context: 'Timing', example: 'Our fiscal year ends in December.' },
      { word: 'Diversification', pronunciation: '/daɪˌvɜːrsɪfɪˈkeɪʃən/', context: 'Strategy', example: 'Diversification of our product line will reduce market risk.' }
    ]
  },
  {
    id: 'security',
    theme: 'Cybersecurity & Privacy',
    description: 'Keeping data safe and systems secure.',
    words: [
      { word: 'Encryption', pronunciation: '/ɪnˈkrɪpʃən/', context: 'Security', example: 'End-to-end encryption is standard for all our messaging.' },
      { word: 'Phishing', pronunciation: '/ˈfɪʃɪŋ/', context: 'Threats', example: 'Be careful of phishing emails that ask for your password.' },
      { word: 'Vulnerability', pronunciation: '/ˌvʌlnərəˈbɪlɪti/', context: 'Testing', example: 'The security audit identified a critical vulnerability in the login flow.' },
      { word: 'Compliance', pronunciation: '/kəmˈplaɪəns/', context: 'Legal', example: 'We are fully GDPR compliant.' },
      { word: 'Firewall', pronunciation: '/ˈfaɪərˌwɔːl/', context: 'Infrastructure', example: 'A strong firewall is our first line of defense.' },
      { word: 'Authentication', pronunciation: '/ɔːˌθɛntɪˈkeɪʃən/', context: 'Access', example: 'Two-factor authentication adds an extra layer of security.' },
      { word: 'Credentials', pronunciation: '/krəˈdɛnʃəlz/', context: 'Identity', example: 'Never share your login credentials with anyone.' }
    ]
  }
];

interface ThematicVocabBuilderProps {
  onBack?: () => void;
}

export function ThematicVocabBuilder({ onBack }: ThematicVocabBuilderProps) {
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [drillMode, setDrillMode] = useState(false);
  const [showDefinition, setShowDefinition] = useState(false);

  const selectedSet = THEMATIC_SETS.find(s => s.id === selectedSetId);
  const currentWord = selectedSet?.words[currentWordIndex];

  const handlePlayAudio = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNextWord = (remembered: boolean) => {
    // In a real app, 'remembered' would update a spaced repetition algorithm (e.g. SuperMemo-2) via Firebase.
    setShowDefinition(false);
    if (selectedSet && currentWordIndex < selectedSet.words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      setDrillMode(false);
      setSelectedSetId(null);
      setCurrentWordIndex(0);
    }
  };

  if (!selectedSetId) {
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
          <div className="p-2.5 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Thematic Vocabulary Builder</h2>
        </div>

        <div className="mb-8 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-slate-600 dark:text-slate-400">
            Learn specialized vocabulary grouped by real-world contexts. Master the jargon of specific industries and situations, then drill them using spaced repetition techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {THEMATIC_SETS.map(set => (
            <div key={set.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-amber-300 dark:hover:border-amber-500 transition-all flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{set.theme}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">{set.description}</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{set.words.length} words</span>
                <button 
                  onClick={() => { setSelectedSetId(set.id); setDrillMode(true); }}
                  className="px-5 py-2.5 bg-amber-100/50 hover:bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 dark:text-amber-400 font-bold rounded-xl transition-colors flex items-center gap-2"
                >
                  Start Drill <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (drillMode && currentWord && selectedSet) {
    return (
      <div className="max-w-2xl mx-auto py-8 text-center">
        <div className="mb-6 flex items-center justify-between text-sm font-bold text-slate-400 uppercase tracking-widest">
           <span>{selectedSet.theme}</span>
           <span>Word {currentWordIndex + 1} of {selectedSet.words.length}</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-200 dark:border-slate-800 shadow-lg min-h-[400px] flex flex-col items-center justify-center relative">
          
          <button onClick={(e) => handlePlayAudio(currentWord.word, e)} className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-amber-50 text-slate-400 hover:text-amber-500 dark:bg-slate-800 dark:hover:bg-amber-900/40 transition-colors rounded-2xl">
            <Volume2 className="w-6 h-6" />
          </button>

          <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">{currentWord.word}</h2>
          <span className="text-xl font-mono text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10 px-4 py-1.5 rounded-xl">{currentWord.pronunciation}</span>

          <AnimatePresence>
            {showDefinition ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 space-y-6 w-full text-left">
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <div className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Context</div>
                  <p className="text-lg text-slate-800 dark:text-slate-200 font-medium">{currentWord.context}</p>
                </div>
                <div className="p-6 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
                  <div className="text-xs uppercase tracking-widest font-bold text-indigo-400 mb-2">Example Use</div>
                  <p className="text-lg text-indigo-900 dark:text-indigo-100 capitalize italic">&quot;{currentWord.example}&quot;</p>
                </div>
              </motion.div>
            ) : (
               <div className="mt-10">
                 <button onClick={() => setShowDefinition(true)} className="px-8 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-2xl transition-colors">
                   Reveal Context & Example
                 </button>
               </div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showDefinition && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid grid-cols-2 gap-4">
              <button onClick={() => handleNextWord(false)} className="py-5 bg-rose-100 hover:bg-rose-200 text-rose-700 dark:bg-rose-900/30 dark:hover:bg-rose-900/50 dark:text-rose-400 font-bold text-lg rounded-2xl transition-colors flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5" /> Need Review
              </button>
              <button onClick={() => handleNextWord(true)} className="py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-2xl transition-colors flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Got It
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={() => { setDrillMode(false); setSelectedSetId(null); }} className="mt-8 text-slate-400 font-medium hover:text-slate-600">
           Exit Drill
        </button>
      </div>
    );
  }

  return null;
}
