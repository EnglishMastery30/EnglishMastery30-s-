import { motion } from 'motion/react';
import { Shield, FileText, ArrowLeft, Gavel, CheckCircle } from 'lucide-react';

export function TermsOfService({ onBack }: { onBack: () => void }) {
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
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
            <Gavel className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Terms of Service</h1>
            <p className="text-slate-500 dark:text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white mb-4">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              1. Acceptance of Terms
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              By accessing or using SpeakPro 30, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white mb-4">
              <FileText className="w-5 h-5 text-blue-500" />
              2. Use License
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Permission is granted to temporarily use the materials (information or software) on SpeakPro 30 for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white mb-4">
              < Shield className="w-5 h-5 text-blue-500" />
              3. User Conduct
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              You agree not to use the service for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the service in any way that could damage the service or general business of SpeakPro 30.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white mb-4">
              <FileText className="w-5 h-5 text-blue-500" />
              4. Disclaimer
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The materials on SpeakPro 30 are provided on an 'as is' basis. SpeakPro 30 makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
