import React from 'react';
import { motion } from 'motion/react';
import { Search, HelpCircle, BookOpen, MessageCircle, ArrowLeft } from 'lucide-react';

export function Support({ onBack }: { onBack: () => void }) {
  const faqs = [
    { q: "How do I start a conversation with the AI Tutor?", a: "Navigate to the 'AI Tutor' tab and select a scenario. Click the microphone button to start speaking, and the AI will respond in real-time." },
    { q: "Can I use English Master across multiple devices?", a: "Yes, your progress is synced automatically to your account so you can learn on your phone, tablet, or computer." },
    { q: "How is my speaking score calculated?", a: "Your score is based on a combination of fluency, pronunciation accuracy, and grammatical correctness during your sessions." },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-slate-500 dark:text-slate-400" />
        </button>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Help & Support</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-8 border border-slate-800 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">How can we help you?</h3>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for articles, guides, or questions..." 
              className="w-full bg-slate-800 border-none text-white px-12 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Knowledge Base</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Detailed guides & tutorials.</p>
              <button className="px-4 py-2 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-black hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors w-full">Read guides</button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl text-emerald-500">
               <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 7.454c-1.895 0-3.744-.509-5.35-1.47l-.384-.228-3.978 1.043 1.062-3.877-.25-.398a10.428 10.428 0 0 1-1.594-5.597c0-5.767 4.693-10.46 10.46-10.46 2.793 0 5.42 1.087 7.401 3.04a10.4 10.4 0 0 1 3.037 7.42c0 5.768-4.693 10.46-10.461 10.46m8.873-19.332A11.94 11.94 0 0 0 12.652 0C5.652 0 .012 5.666 0 12.67c0 2.23.593 4.407 1.71 6.347L0 24l5.12-1.343a11.9 11.9 0 0 0 5.617 1.417h.005c6.994 0 12.65-5.667 12.657-12.67a11.9 11.9 0 0 0-3.376-8.535z"/></svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">WhatsApp Help</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Chat with our support team.</p>
              <a href="https://wa.me/#" target="_blank" rel="noreferrer" className="block px-4 py-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-black hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors w-full">Ask on WhatsApp</a>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-4 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl">
              <MessageCircle className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Live Chat</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Real-time support 24/7.</p>
              <button className="px-4 py-2 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-black hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors w-full">Start chat</button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h3>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-100 dark:border-slate-800 pb-6 last:border-0 last:pb-0">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
}
