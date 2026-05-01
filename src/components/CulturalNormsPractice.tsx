import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, MessageCircle, AlertCircle, ArrowRight, Check, X, BookOpen, User, ChevronLeft } from 'lucide-react';
import Markdown from 'react-markdown';

interface Scenario {
  id: string;
  context: string;
  unnatural: string;
  natural: string;
  explanation: string;
  type: 'comparison' | 'challenge' | 'expression';
  options?: { text: string; isCorrect: boolean; feedback: string }[];
}

const CULTURAL_SCENARIOS: Scenario[] = [
  {
    id: 'hedging_1',
    context: 'tech work context - expressing uncertainty when a system is down',
    type: 'comparison',
    unnatural: "I don't know why the server crashed.",
    natural: "I'm currently investigating what might have caused the server to crash.",
    explanation: "In tech environments, saying 'I don't know' can sound dismissive. Using 'I'm currently investigating' or 'Let me look into that' shows ownership and proactive problem-solving without admitting fault prematurely."
  },
  {
    id: 'disagree_1',
    context: 'tech work context - disagreeing with a senior architect\'s design',
    type: 'comparison',
    unnatural: "That design is wrong and will scale poorly.",
    natural: "I have some concerns about how that design will scale. Could we explore an alternative approach?",
    explanation: "Blunt disagreement ('is wrong') can cause defensiveness. Hedging with 'I have some concerns' or framing it as a question ('Could we explore...') keeps the conversation constructive and polite."
  },
  {
    id: 'challenge_1',
    context: 'You need an update from a colleague who is late on delivering an API endpoint.',
    type: 'challenge',
    unnatural: "",
    natural: "",
    explanation: "",
    options: [
      { text: "Where is the API you promised?", isCorrect: false, feedback: "Too direct and aggressive. This can cause friction." },
      { text: "Any updates on the API endpoint?", isCorrect: true, feedback: "Perfect. It's concise, polite, and standard in Slack/Teams communication." },
      { text: "Can you please give me the API now because I am waiting for a long time.", isCorrect: false, feedback: "Unnatural phrasing ('waiting for a long time' instead of 'I've been waiting') and sounds demanding." }
    ]
  },
  {
    id: 'expression_1',
    context: 'tech work context - avoiding overly casual language in client emails',
    type: 'expression',
    unnatural: 'Hey guys, here is the stuff you asked for.',
    natural: 'Hello team, Please find attached the requested documents.',
    explanation: "While 'Hey guys' is common internally, client-facing communication should be more polished. 'Team' or specific names are better, and 'stuff' should be replaced with the specific item."
  },
  {
    id: 'interrupt_1',
    context: 'Interrupting in a meeting to ask a question.',
    type: 'comparison',
    unnatural: "Wait, stop talking. I have a question.",
    natural: "Sorry to interrupt, but could I just ask a quick clarifying question?",
    explanation: "Directly telling someone to stop is rude. Softening the interruption with 'Sorry to interrupt' or 'If I could just jump in here' is much more professional."
  },
  {
    id: 'request_1',
    context: 'Asking a coworker for help with a bug.',
    type: 'comparison',
    unnatural: "Help me with this bug. It's not working.",
    natural: "Would you happen to have a few minutes to help me debug this issue? I'm a bit stuck.",
    explanation: "Commanding someone to help is aggressive. Turning it into a polite request with 'Would you happen to have...' or 'Do you have any cycles to...' is preferred."
  },
  {
    id: 'feedback_1',
    context: 'Giving negative feedback on a code review.',
    type: 'comparison',
    unnatural: "Your code is messy and hard to read.",
    natural: "This section is a bit complex. Perhaps we could simplify it to improve readability?",
    explanation: "Personal attacks ('Your code is messy') are unprofessional. Focusing on the code and suggesting improvements ('Perhaps we could simplify') is more constructive."
  },
  {
    id: 'meeting_1',
    context: 'Opening a meeting that you are hosting.',
    type: 'expression',
    unnatural: "Okay, let's start now.",
    natural: "Thanks everyone for joining. Let's dive into the agenda for today.",
    explanation: "Starting abruptly can feel robotic. Acknowledging people's presence and stating the purpose clearly ('dive into the agenda') sets a professional tone."
  },
  {
    id: 'late_1',
    context: 'Arriving late to a Zoom call.',
    type: 'expression',
    unnatural: "I was in another meeting. What did I miss?",
    natural: "Apologies for being late, I was tied up in a previous call. Please continue, I'll catch up.",
    explanation: "Briefly apologizing and explaining ('tied up') is polite. Encouraging others to continue shows you don't want to disrupt the flow."
  },
  {
    id: 'clarify_1',
    context: 'You didn\'t understand a complex technical explanation.',
    type: 'challenge',
    unnatural: "",
    natural: "",
    explanation: "",
    options: [
      { text: "What? Say that again.", isCorrect: false, feedback: "Too blunt and can sound rude." },
      { text: "I didn't quite catch that. Could you explain the last part again?", isCorrect: true, feedback: "Polite and specific. 'Didn't quite catch that' is a common idiomatic expression." },
      { text: "Your explanation is too hard. Make it simple.", isCorrect: false, feedback: "Blames the speaker for being unclear, which is unprofessional." }
    ]
  },
  {
    id: 'ownership_1',
    context: 'Admitting you made a mistake that broke the build.',
    type: 'comparison',
    unnatural: "The build broke because of my commit, sorry.",
    natural: "I've realized my recent commit caused an issue with the build. I'm working on a fix right now.",
    explanation: "While 'sorry' is fine, combining it with a clear statement of ownership and a plan ('working on a fix') is more reassuring in a professional setting."
  },
  {
    id: 'deadline_1',
    context: 'Informing your manager you won\'t meet a deadline.',
    type: 'comparison',
    unnatural: "I can't finish the task by Friday.",
    natural: "It looks like the task might take a bit longer than expected. Can we push the deadline to Monday?",
    explanation: "Simply saying 'I can't' sounds defeatist. Providing a revised timeline ('Can we push the deadline...') shows you are still committed to the outcome."
  },
  {
    id: 'suggestion_1',
    context: 'Suggesting a new tool to the team.',
    type: 'expression',
    unnatural: "We must use this new framework. It's better.",
    natural: "I've been looking into this new framework and I think it could really benefit our workflow. What do you guys think?",
    explanation: "Using 'must' can sound dictatorial. Framing it as a suggestion ('I think it could really benefit') and asking for input makes it a team discussion."
  },
  {
    id: 'intro_1',
    context: 'Introducing yourself to a new team member.',
    type: 'expression',
    unnatural: "I am John. I work on the backend.",
    natural: "Hi, I'm John! I'm one of the backend engineers here. Great to have you on the team.",
    explanation: "Adding a welcoming phrase ('Great to have you on the team') makes the introduction much warmer and more professional."
  },
  {
    id: 'exit_1',
    context: 'Leaving a meeting early.',
    type: 'expression',
    unnatural: "I have to go now. Bye.",
    natural: "Sorry everyone, I have a hard stop now for another meeting. I'll catch up on the notes later.",
    explanation: "A 'hard stop' is a common professional term for a fixed ending time. Mentioning you'll 'catch up on the notes' shows you still care about the meeting's content."
  },
  {
    id: 'vacation_1',
    context: 'Informing your team about upcoming time off.',
    type: 'expression',
    unnatural: "I will be on vacation next week. Don't call me.",
    natural: "Just a heads up that I'll be OOO (Out Of Office) next week. I've updated the shared calendar.",
    explanation: "'Heads up' is a great way to give a polite warning. 'OOO' is the standard acronym in tech for being away."
  },
  {
    id: 'appreciation_1',
    context: 'Thanking a coworker for their help.',
    type: 'expression',
    unnatural: "Thanks for the help.",
    natural: "Really appreciate you taking the time to help me earlier. That saved me a lot of time!",
    explanation: "Being specific about *why* you appreciate the help ('Really appreciate you taking the time') makes the gratitude feel more sincere."
  },
  {
    id: 'clarification_2',
    context: 'Asking for the "why" behind a decision.',
    type: 'comparison',
    unnatural: "Why did you choose this library?",
    natural: "Could you help me understand the rationale behind choosing this specific library?",
    explanation: "'Why' can sometimes sound accusatory. 'Help me understand the rationale' sounds more like an inquiry into the decision-making process."
  },
  {
    id: 'slack_1',
    context: 'Messaging someone on Slack for the first time that day.',
    type: 'challenge',
    unnatural: "",
    natural: "",
    explanation: "",
    options: [
      { text: "Hey.", isCorrect: false, feedback: "Avoid 'naked' hellos. It forces the other person to wait for your actual request." },
      { text: "Hi! Hope you're having a good morning. Quick question about the API documentation when you have a moment...", isCorrect: true, feedback: "Perfect Slack etiquette. A brief greeting followed immediately by context." },
      { text: "I need the docs.", isCorrect: false, feedback: "Too abrupt and demanding for a chat interface." }
    ]
  },
  {
    id: 'softening_1',
    context: 'Asking for a small change in a design.',
    type: 'comparison',
    unnatural: "Change the font size here.",
    natural: "Would it be possible to slightly increase the font size in this section?",
    explanation: "Using 'Would it be possible to...' or 'Could we try...' softens the request and makes it feel more collaborative."
  },
  {
    id: 'uncertainty_1',
    context: 'Responding when you aren\'t sure about an answer in a meeting.',
    type: 'expression',
    unnatural: "I have no idea.",
    natural: "That's a great question. I don't have the data on hand, let me double-check and get back to you.",
    explanation: "Admitting you don't have the info is fine, provided you promise to find it ('let me double-check and get back to you')."
  },
  {
    id: 'rejection_1',
    context: 'Declining a meeting invite because you are too busy.',
    type: 'comparison',
    unnatural: "I'm too busy for this meeting.",
    natural: "I'd love to join, but I'm currently at capacity with the sprint tasks. Could we record the session?",
    explanation: "'At capacity' is a polite way to say you're busy. Suggesting a recording shows you still value the meeting."
  },
  {
    id: 'input_1',
    context: 'Ending a presentation and asking for questions.',
    type: 'expression',
    unnatural: "That's it. Any questions?",
    natural: "Thank you for listening! I'd love to hear your thoughts or answer any questions you might have.",
    explanation: "'I'd love to hear your thoughts' is more inviting than a simple 'Any questions?'."
  },
  {
    id: 'brainstorming_1',
    context: 'Building on someone else\'s idea in a brainstorm.',
    type: 'expression',
    unnatural: "Yes, and we can also do this.",
    natural: "I really like that idea! Building on that, we could also consider...",
    explanation: "Starting with 'I really like that idea!' validates the previous speaker before you add your own thoughts."
  },
  {
    id: 'rephrasing_1',
    context: 'Explaining something in a different way.',
    type: 'expression',
    unnatural: "You didn't understand. Let me say it again.",
    natural: "Let me try rephrasing that. What I mean is...",
    explanation: "Avoid telling the other person they 'didn't understand'. Instead, take responsibility for the explanation ('Let me try rephrasing')."
  },
  {
    id: 'polite_ask_1',
    context: 'Asking for permission to record a meeting.',
    type: 'expression',
    unnatural: "I am recording this meeting.",
    natural: "Do you mind if I record this session for the team members who couldn't make it?",
    explanation: "Always ask for permission before recording. Mentioning the benefit ('for the team members who couldn't make it') makes it more likely they'll agree."
  },
  {
    id: 'constructive_1',
    context: 'Pointing out a bug in a demo.',
    type: 'comparison',
    unnatural: "The app crashed when I did this. It's broken.",
    natural: "I noticed a small edge case where the app seems to hang. Should we log a ticket for that?",
    explanation: "Using 'edge case' and 'seems to hang' is less aggressive than 'it's broken'. Suggesting a ticket is a constructive next step."
  },
  {
    id: 'opening_1',
    context: 'Small talk at the beginning of a 1-on-1.',
    type: 'challenge',
    unnatural: "",
    natural: "",
    explanation: "",
    options: [
      { text: "Tell me your status.", isCorrect: false, feedback: "Way too direct for a 1-on-1 start." },
      { text: "How's your week going so far?", isCorrect: true, feedback: "Perfect. A standard, friendly opening for professional small talk." },
      { text: "Is the weather good?", isCorrect: false, feedback: "A bit too cliché/random unless the weather is actually notable." }
    ]
  },
  {
    id: 'refining_1',
    context: 'Refining a task description.',
    type: 'expression',
    unnatural: "This task is not clear.",
    natural: "Could we add a bit more detail to the acceptance criteria for this ticket?",
    explanation: "'Acceptance criteria' is a specific Agile term. Asking to 'add a bit more detail' is more constructive than just saying it's 'not clear'."
  },
  {
    id: 'prioritizing_1',
    context: 'Asking which task is most important.',
    type: 'comparison',
    unnatural: "Which task should I do first?",
    natural: "Could you help me prioritize these tasks? I want to make sure I'm focusing on the highest-impact items.",
    explanation: "'Focusing on highest-impact items' shows you care about the business value, not just checking boxes."
  },
  {
    id: 'acknowledging_1',
    context: 'Acknowledging receipt of a message you can\'t answer yet.',
    type: 'expression',
    unnatural: "I can't answer now.",
    natural: "Acknowledging! I'm in the middle of something right now, but I'll get back to you by EOD.",
    explanation: "'Acknowledging' or 'Ack' is common in tech to show you saw the message. 'EOD' (End Of Day) provides a clear timeframe."
  },
  {
    id: 'closing_1',
    context: 'Concluding an email to a potential partner.',
    type: 'expression',
    unnatural: "Write back to me soon.",
    natural: "Looking forward to hearing your thoughts. We can hop on a call next week if that works for you.",
    explanation: "'Looking forward to hearing your thoughts' is a classic professional closing. 'Hop on a call' is a common casual-professional idiom."
  },
  {
    id: 'soft_no_1',
    context: 'Saying "no" to an unreasonable feature request.',
    type: 'comparison',
    unnatural: "No, we won't build that. It's too much work.",
    natural: "That's an interesting idea, but it might be out of scope for the current version. Let's add it to the backlog for later.",
    explanation: "'Out of scope' is the standard way to decline a feature while staying professional. Suggesting the 'backlog' keeps the door open."
  },
  {
    id: 'sharing_1',
    context: 'Asking someone to share their screen.',
    type: 'expression',
    unnatural: "Show me your screen.",
    natural: "Would you mind sharing your screen so we can take a closer look at the code together?",
    explanation: "'Sharing your screen' is the standard phrase. Adding 'together' emphasizes collaboration."
  },
  {
    id: 'mute_1',
    context: 'Informing someone they are on mute.',
    type: 'expression',
    unnatural: "I can't hear you. Turn on your mic.",
    natural: "I think you might be on mute!",
    explanation: "A simple, friendly 'I think you might be on mute' is the universal way to handle this on video calls."
  },
  {
    id: 'asking_1',
    context: 'Asking for feedback after a presentation.',
    type: 'challenge',
    unnatural: "",
    natural: "",
    explanation: "",
    options: [
      { text: "Did you like it?", isCorrect: false, feedback: "Too personal and doesn't invite specific feedback." },
      { text: "I'd really value any feedback you have on the technical architecture I proposed.", isCorrect: true, feedback: "Specific and professional. Shows you are open to critique." },
      { text: "Tell me my mistakes.", isCorrect: false, feedback: "Sounds a bit unnatural and overly focused on the negative." }
    ]
  },
  {
    id: 'update_1',
    context: 'Giving a status update.',
    type: 'expression',
    unnatural: "I did the things on the list.",
    natural: "I've made good progress on the authentication flow. It should be ready for review by tomorrow.",
    explanation: "Being specific ('authentication flow') and giving a timeline ('ready for review by tomorrow') makes the update more useful."
  },
  {
    id: 'warning_1',
    context: 'Warning about a potential delay.',
    type: 'expression',
    unnatural: "We might be late because the API is down.",
    natural: "Just a heads up that there might be a slight delay due to some unexpected issues with the upstream API.",
    explanation: "'Slight delay' and 'unexpected issues' sound more controlled and professional than 'we might be late'."
  },
  {
    id: 'polishing_1',
    context: 'Asking for a final review before shipping.',
    type: 'expression',
    unnatural: "Check this before I send it.",
    natural: "Could I get a second pair of eyes on this before we go live?",
    explanation: "'A second pair of eyes' is a common idiom meaning a final check. 'Go live' is the standard term for releasing software."
  },
  {
    id: 'culture_1',
    context: 'Explaining a cultural nuance politely.',
    type: 'expression',
    unnatural: "In my country we do it differently.",
    natural: "Actually, from my perspective, we typically handle these situations by...",
    explanation: "Focusing on 'my perspective' or 'typically' is softer than making it about 'my country' vs 'your country'."
  },
  {
    id: 'request_2',
    context: 'Asking for a raise.',
    type: 'comparison',
    unnatural: "I want more money because I work hard.",
    natural: "Given my contributions over the last year, I'd like to discuss the possibility of a salary adjustment.",
    explanation: "'Salary adjustment' is more formal and professional than 'more money'. Tying it to 'contributions' makes the request evidence-based."
  },
  {
    id: 'interview_1',
    context: 'Asking the interviewer a question.',
    type: 'challenge',
    unnatural: "",
    natural: "",
    explanation: "",
    options: [
      { text: "How much is the pay?", isCorrect: false, feedback: "Avoid asking about money in the first conversation unless the interviewer brings it up." },
      { text: "What does success look like for someone in this role after the first six months?", isCorrect: true, feedback: "A fantastic, high-impact question that shows you are thinking about performance and long-term value." },
      { text: "Is the job hard?", isCorrect: false, feedback: "Sounds a bit immature and doesn't provide much insight." }
    ]
  },
  {
    id: 'meeting_closing_1',
    context: 'Closing a meeting effectively.',
    type: 'expression',
    unnatural: "Okay, we are done. Goodbye.",
    natural: "Great session everyone. Let's wrap up here. I'll send out the action items by end of day.",
    explanation: "Mentioning 'action items' ensures that the meeting leads to actual work and isn't just a waste of time."
  },
  {
    id: 'clarifying_3',
    context: 'Checking if everyone is clear on a point.',
    type: 'expression',
    unnatural: "Do you understand?",
    natural: "Does that make sense to everyone, or should I go over anything again?",
    explanation: "'Do you understand?' can sound condescending. 'Does that make sense?' is much more polite."
  },
  {
    id: 'mentoring_1',
    context: 'Giving praise to a junior developer.',
    type: 'expression',
    unnatural: "Good job on the task.",
    natural: "I was really impressed with how you handled that complex logic in the last PR. Great work!",
    explanation: "Specific praise ('how you handled that complex logic') is more motivating and valuable than generic praise."
  },
  {
    id: 'networking_2',
    context: 'Asking for an informational interview.',
    type: 'expression',
    unnatural: "I want to talk to you about your job.",
    natural: "I've been following your work and would love to pick your brain for 15 minutes about your experience in the industry if you have the bandwidth.",
    explanation: "'Pick your brain' is a common idiom for asking for advice. Limiting it to '15 minutes' and mentioning 'bandwidth' shows respect for their time."
  },
  {
    id: 'disagreement_2',
    context: 'Disagreeing with a project timeline.',
    type: 'comparison',
    unnatural: "This timeline is impossible.",
    natural: "I'm concerned that this timeline might be a bit ambitious given our current resources. Can we look at the scope again?",
    explanation: "'Ambitious' is a professional euphemism for 'impossible' or 'too fast'. Asking to 'look at the scope' suggest a solution."
  },
  {
    id: 'onboarding_1',
    context: 'A new hire asking where to find documentation.',
    type: 'expression',
    unnatural: "Where is the documentation?",
    natural: "Is there a central wiki or a Notion page where I can find the onboarding docs?",
    explanation: "Mentioning specific tools ('wiki', 'Notion') shows you've done some thinking already."
  },
  {
    id: 'bug_report_1',
    context: 'Reporting a bug to a non-technical stakeholder.',
    type: 'expression',
    unnatural: "The database query is failing with a timeout.",
    natural: "We're experiencing a slight delay in loading some user data. We're on it and should have it resolved soon.",
    explanation: "Avoid overly technical jargon ('database query', 'timeout') with non-technical people. Focus on the *impact* and the *resolution*."
  },
  {
    id: 'celebrating_1',
    context: 'Celebrating a successful launch.',
    type: 'expression',
    unnatural: "We launched. Good.",
    natural: "Huge shoutout to the whole team for getting the product out the door! It's been a massive effort and I'm so proud of what we've built.",
    explanation: "'Out the door' is a common idiom for releasing/shipping. 'Shoutout' is a great casual-professional way to give recognition."
  }
];

interface CulturalNormsPracticeProps {
  onBack?: () => void;
}

export function CulturalNormsPractice({ onBack }: CulturalNormsPracticeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const scenario = CULTURAL_SCENARIOS[currentIndex];

  const handleNext = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    if (currentIndex < CULTURAL_SCENARIOS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

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
        <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
          <Briefcase className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Tech Workplace & Cultural Norms</h2>
      </div>

      <div className="mb-8 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <p className="text-slate-600 dark:text-slate-400">
          Learn the unwritten rules of English communication in professional tech environments. Practice expressing uncertainty politely, avoiding overly casual language, and delivering constructive feedback.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10 min-h-[400px] flex flex-col justify-between">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex-grow space-y-6"
          >
            <div className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-semibold rounded-lg capitalize">
              {scenario.type.replace('-', ' ')}
            </div>

            <h3 className="text-xl font-medium text-slate-800 dark:text-slate-200">
              Context: <span className="font-bold text-indigo-600 dark:text-indigo-400">{scenario.context}</span>
            </h3>

            {scenario.type === 'challenge' && scenario.options && (
              <div className="space-y-4 mt-6">
                <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">Choose the most appropriate response:</p>
                {scenario.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectAnswer = showAnswer && opt.isCorrect;
                  const isWrongAnswer = showAnswer && isSelected && !opt.isCorrect;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => !showAnswer && setSelectedOption(idx)}
                      disabled={showAnswer}
                      className={`w-full text-left p-4 rounded-2xl border transition-all ${
                        isSelected && !showAnswer ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : ''
                      } ${
                        isCorrectAnswer ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : ''
                      } ${
                        isWrongAnswer ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20' : ''
                      } ${!showAnswer && !isSelected ? 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-800/50' : ''}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-slate-800 dark:text-slate-200 font-medium">{opt.text}</span>
                        {isCorrectAnswer && <Check className="text-emerald-600" />}
                        {isWrongAnswer && <X className="text-rose-600" />}
                      </div>
                      <AnimatePresence>
                        {showAnswer && isSelected && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-3 text-sm text-slate-600 dark:text-slate-400 overflow-hidden">
                            {opt.feedback}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  )
                })}

                {!showAnswer && selectedOption !== null && (
                  <button 
                    onClick={() => setShowAnswer(true)}
                    className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors"
                  >
                    Check Answer
                  </button>
                )}
              </div>
            )}

            {(scenario.type === 'comparison' || scenario.type === 'expression') && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800/50 rounded-2xl relative">
                    <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400 p-1.5 rounded-lg shadow-sm">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <span className="text-xs uppercase tracking-wider font-bold text-rose-500 mb-2 block">Unnatural / Too Direct</span>
                    <p className="text-slate-800 dark:text-slate-200 font-medium text-lg">&quot;{scenario.unnatural}&quot;</p>
                  </div>

                  <div className="p-5 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl relative">
                    <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 p-1.5 rounded-lg shadow-sm">
                      <Check className="w-5 h-5" />
                    </div>
                    <span className="text-xs uppercase tracking-wider font-bold text-emerald-600 mb-2 block">Professional / Natural</span>
                    <p className="text-slate-800 dark:text-slate-200 font-medium text-lg">&quot;{scenario.natural}&quot;</p>
                  </div>
                </div>

                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                  <div className="flex gap-2 text-indigo-800 dark:text-indigo-300 font-medium text-sm">
                    <MessageCircle className="w-5 h-5 shrink-0" />
                    <p>{scenario.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={handlePrevious} 
            disabled={currentIndex === 0}
            className="px-4 py-2 font-medium text-slate-600 dark:text-slate-400 disabled:opacity-30 transition-opacity"
          >
            Previous
          </button>
          
          <div className="text-sm font-medium text-slate-400">
            {currentIndex + 1} of {CULTURAL_SCENARIOS.length}
          </div>

          <button 
            onClick={handleNext} 
            disabled={currentIndex === CULTURAL_SCENARIOS.length - 1}
            className="px-4 py-2 font-medium text-indigo-600 dark:text-indigo-400 disabled:opacity-30 transition-opacity flex items-center gap-2"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
