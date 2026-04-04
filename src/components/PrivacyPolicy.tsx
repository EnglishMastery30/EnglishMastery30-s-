import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText, ArrowLeft, User } from 'lucide-react';

export function PrivacyPolicy({ onBack }: { onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto space-y-8 pb-12"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
            <p className="text-slate-500 dark:text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white mb-4">
              <FileText className="w-5 h-5 text-indigo-500" />
              1. Information We Collect
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              When you use SpeakPro 30, we collect information that you provide directly to us, including your name, email address, and profile information. When using our calling features, we temporarily process audio data to facilitate real-time communication.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white mb-4">
              <Lock className="w-5 h-5 text-indigo-500" />
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
              <li>To provide, maintain, and improve our services.</li>
              <li>To facilitate peer-to-peer calling and AI voice conversations.</li>
              <li>To process transactions and send related information.</li>
              <li>To send technical notices, updates, security alerts, and support messages.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white mb-4">
              <Eye className="w-5 h-5 text-indigo-500" />
              3. Call Recording and Privacy
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Call recordings are available for Premium subscribers and users on a free trial. These recordings are stored securely and are only accessible by the participants of the call. We do not use your call recordings for marketing purposes. Your phone number is never shared with other users; all calls are routed securely through our app infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white mb-4">
              <Shield className="w-5 h-5 text-indigo-500" />
              4. Data Security
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white mb-4">
              <User className="w-5 h-5 text-indigo-500" />
              5. Your Rights
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              You have the right to access, update, or delete your personal information. You can manage your account settings within the app or contact our support team for assistance.
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
