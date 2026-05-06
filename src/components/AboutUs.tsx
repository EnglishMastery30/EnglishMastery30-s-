import React from 'react';
import { motion } from 'motion/react';
import { Building2, Users, Target, ArrowLeft } from 'lucide-react';

export function AboutUs({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-slate-500 dark:text-slate-400" />
        </button>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">About Us</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-12"
      >
        <section className="text-center">
          <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We are dedicated to democratizing language learning through advanced AI technology. 
            Our goal is to provide accessible, high-quality English education to everyone, everywhere.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h4 className="font-bold text-slate-900 dark:text-white">Who We Are</h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Founded by a team of linguists and AI engineers, we blend educational best practices 
              with cutting-edge technology. We believe that practice and confidence are the keys 
              to mastering spoken English.
            </p>
          </div>
          
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h4 className="font-bold text-slate-900 dark:text-white">Our Vision</h4>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              We envision a world where language barriers don't exist. By creating an immersive, 
              judgment-free learning environment, we empower our users to speak English naturally 
              and fluently.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
