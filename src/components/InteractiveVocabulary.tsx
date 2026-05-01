import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Book, Users, Volume2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const VOCABULARY_WORDS = [
  { word: "Ancestor", ipa: "/ænsɛstər/", definition: "A person from whom one is descended." }, 
  { word: "Ancients", ipa: "/ˈeɪnʃənts/", definition: "People who lived in the very distant past." }, 
  { word: "Aunt", ipa: "/ænt/", definition: "The sister of one's father or mother." }, 
  { word: "Babe", ipa: "/beɪb/", definition: "An infant or very young child." }, 
  { word: "Bachelor", ipa: "/ˈbætʃələr/", definition: "A man who is not and has never been married." }, 
  { word: "Bride", ipa: "/braɪd/", definition: "A woman on her wedding day or just before it." }, 
  { word: "Bride-Groom", ipa: "/ˈbraɪd ɡrum/", definition: "A man on his wedding day or just before it." }, 
  { word: "Bride-Maid", ipa: "/ˈbraɪdˌmeɪd/", definition: "A woman who attends the bride at a wedding." }, 
  { word: "Brother-in-law", ipa: "/ˈbrʌðər ɪn lɔ/", definition: "The brother of one's spouse or the husband of one's sister." }, 
  { word: "Child", ipa: "/tʃaɪld/", definition: "A young human being below the age of puberty." }, 
  { word: "Client", ipa: "/ˈklaɪənt/", definition: "A person or organization using the services of a professional person or company." }, 
  { word: "Coheir", ipa: "/koʊˈɛr/", definition: "A person who is an heir with another person." }, 
  { word: "Confident", ipa: "/ˈkɒnfɪdənt/", definition: "Feeling or showing confidence in oneself." }, 
  { word: "Consort", ipa: "/kənˈsɔrt/", definition: "A wife, husband, or companion, in particular the spouse of a reigning monarch." }, 
  { word: "Cousin", ipa: "/ˈkʌzən/", definition: "A child of one's uncle or aunt." }, 
  { word: "Crony", ipa: "/ˈkroʊni/", definition: "A close friend or companion." }, 
  { word: "Dame", ipa: "/deɪm/", definition: "The title of a woman who has a high social rank." }, 
  { word: "Darling", ipa: "/ˈdɑrlɪŋ/", definition: "A person who is very much loved or liked." }, 
  { word: "Daughter-in-law", ipa: "/ˈdɔtər ɪn lɔ/", definition: "The wife of one's son." }, 
  { word: "Fore father", ipa: "/ˈfɔrˌfɑðər/", definition: "An ancestor." }, 
  { word: "Foster brother", ipa: "/ˈfɔstər ˈbrʌðər/", definition: "A boy brought up as a brother to another child, although not related." }, 
  { word: "Gaffer", ipa: "/ˈɡæfər/", definition: "An elderly man." }, 
  { word: "Grand child", ipa: "/ˈɡrændˌtʃaɪld/", definition: "A child of one's son or daughter." }, 
  { word: "Grand-sire", ipa: "/ˈɡrændˌsaɪər/", definition: "A grandfather." }, 
  { word: "Great-grand son", ipa: "/ɡreɪt ˈɡrænd sʌn/", definition: "The son of one's grandchild." }, 
  { word: "Half-brother", ipa: "/hæf ˈbrʌðər/", definition: "A brother with whom one has only one parent in common." }, 
  { word: "Heir", ipa: "/ɛr/", definition: "A person legally entitled to the property or rank of another on that person's death." }, 
  { word: "Heiress", ipa: "/ˈɛrəs/", definition: "A woman who is an heir." }, 
  { word: "Helpmate", ipa: "/ˈhɛlpˌmeɪt/", definition: "A helpful companion or partner, especially a husband or wife." }, 
  { word: "Host", ipa: "/hoʊst/", definition: "A person who receives or entertains other people as guests." }, 
  { word: "Hostess", ipa: "/ˈhoʊstəs/", definition: "A woman who receives or entertains guests." }, 
  { word: "House-keeper", ipa: "/ˈhaʊsˌkipər/", definition: "A person, typically a woman, employed to manage a household." }, 
  { word: "House-wife", ipa: "/ˈhaʊsˌwaɪf/", definition: "A woman whose main occupation is managing her own family's home." }, 
  { word: "Hubby", ipa: "/ˈhʌbi/", definition: "A husband." }, 
  { word: "Infant", ipa: "/ˈɪnfənt/", definition: "A very young child or baby." }
];

const RELATIONSHIP_WORDS = [
  { word: "Inheritor", ipa: "/ɪnˈhɛrətər/", definition: "A person who inherits something." }, 
  { word: "Intimate", ipa: "/ˈɪntəmət/", definition: "Closely acquainted; familiar, close." }, 
  { word: "Junior", ipa: "/ˈdʒunjər/", definition: "Smaller, lower in standing; younger." }, 
  { word: "Juvenile", ipa: "/ˈdʒuvənl/", definition: "For or relating to young people." }, 
  { word: "Kin", ipa: "/kɪn/", definition: "One's family and relations." }, 
  { word: "Kith", ipa: "/kɪθ/", definition: "One's friends, acquaintances, and relations." }, 
  { word: "Lad", ipa: "/læd/", definition: "A boy or young man." }, 
  { word: "Lass", ipa: "/læs/", definition: "A girl or young woman." }, 
  { word: "Lover", ipa: "/ˈlʌvər/", definition: "A partner in a sexual or romantic relationship." }, 
  { word: "Major", ipa: "/ˈmeɪdʒər/", definition: "Important, serious, or significant." }, 
  { word: "Mamma", ipa: "/məˈmɑ/", definition: "Mother." }, 
  { word: "Mate", ipa: "/meɪt/", definition: "A fellow member or joint occupant of a specified thing." }, 
  { word: "Maternal Uncle", ipa: "/məˈtɜrnəl ˈʌŋkəl/", definition: "The brother of one's mother." }, 
  { word: "Matron", ipa: "/ˈmeɪtrən/", definition: "A woman in charge of domestic and medical arrangements at a boarding school or other institution." }, 
  { word: "Minor", ipa: "/ˈmaɪnər/", definition: "Lesser in importance, seriousness, or significance." }, 
  { word: "Mother-in-law", ipa: "/ˈmʌðər ɪn lɔ/", definition: "The mother of one's spouse." }, 
  { word: "Nephew", ipa: "/ˈnɛfju/", definition: "A son of one's brother or sister." }, 
  { word: "Niece", ipa: "/nis/", definition: "A daughter of one's brother or sister." }, 
  { word: "Off spring", ipa: "/ˈɔfˌsprɪŋ/", definition: "A person's child or children." }, 
  { word: "Orphan", ipa: "/ˈɔrfən/", definition: "A child whose parents are dead." }, 
  { word: "Parents", ipa: "/ˈpɛrənts/", definition: "A father or mother." }, 
  { word: "Paternal uncle", ipa: "/pəˈtɜrnəl ˈʌŋkəl/", definition: "The brother of one's father." }, 
  { word: "Patron", ipa: "/ˈpeɪtrən/", definition: "A person who gives financial or other support to a person, organization, cause, or activity." }, 
  { word: "Pet", ipa: "/pɛt/", definition: "A domestic or tamed animal kept for companionship or pleasure." }, 
  { word: "Polygamist", ipa: "/pəˈlɪɡəmɪst/", definition: "A person who has more than one wife or husband at the same time." }, 
  { word: "Progenitor", ipa: "/proʊˈdʒɛnɪtər/", definition: "A person or thing from which a person, animal, or plant is descended or derives; an ancestor or parent." }, 
  { word: "Progeny", ipa: "/ˈprɒdʒəni/", definition: "A descendant or the descendants of a person, animal, or plant; offspring." }, 
  { word: "Protector", ipa: "/prəˈtɛktər/", definition: "A person or thing that protects someone or something." }, 
  { word: "Protégé", ipa: "/ˈproʊtəˌʒeɪ/", definition: "A person who is guided and supported by an older and more experienced or influential person." }, 
  { word: "Redeemer", ipa: "/rɪˈdimər/", definition: "A person who redeems someone or something." }, 
  { word: "Scion", ipa: "/ˈsaɪən/", definition: "A descendant of a notable family." }, 
  { word: "Sire", ipa: "/saɪər/", definition: "The male parent of an animal, especially a stallion or bull." }, 
  { word: "Sister-in-law", ipa: "/ˈsɪstər ɪn lɔ/", definition: "The sister of one's spouse or the wife of one's brother." }, 
  { word: "Spouse", ipa: "/spaʊs/", definition: "A husband or wife, considered in relation to their partner." }, 
  { word: "Uncle", ipa: "/ˈʌŋkəl/", definition: "The brother of one's father or mother or the husband of one's aunt." }, 
  { word: "Well-wisher", ipa: "/wɛl ˈwɪʃər/", definition: "A person who desires success or happiness for another." }, 
  { word: "Widow", ipa: "/ˈwɪdoʊ/", definition: "A woman who has lost her husband by death and has not married again." }, 
  { word: "Widower", ipa: "/ˈwɪdoʊər/", definition: "A man who has lost his wife by death and has not married again." }
];

const getRandomWords = (array: {word: string, ipa: string, definition: string}[], count: number) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export function InteractiveVocabulary() {
  const { t, targetLanguage } = useLanguage();
  const [vocabWords, setVocabWords] = useState<{word: string, ipa: string, definition: string}[]>([]);
  const [relWords, setRelWords] = useState<{word: string, ipa: string, definition: string}[]>([]);
  
  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleGenerateVocab = () => {
    setVocabWords(getRandomWords(VOCABULARY_WORDS, 5));
  };

  const handleGenerateRels = () => {
    setRelWords(getRandomWords(RELATIONSHIP_WORDS, 5));
  };

  return (
    <div className="mt-8 space-y-8 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
      <div className="text-center">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">{t('mastery.knownToUnknown')}</h3>
        <p className="text-slate-600 dark:text-slate-400">{t('mastery.vocabSubtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Vocabulary Section */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm flex flex-col items-center">
          <Book className="w-8 h-8 text-indigo-500 mb-4" />
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('mastery.vocabulary')}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 text-center">{t('mastery.vocabDesc')}</p>
          <button 
            onClick={handleGenerateVocab}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-500/30 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            {t('mastery.showRandom')}
          </button>
          
          <AnimatePresence mode="popLayout">
            <div className="mt-6 w-full space-y-3">
              {vocabWords.map((item, i) => (
                <motion.div
                  key={item.word + i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm flex items-center justify-between group hover:border-indigo-300 dark:hover:border-indigo-500 transition-all"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 dark:text-white">{item.word}</span>
                    <span className="text-xs font-mono text-slate-400 group-hover:text-indigo-400 transition-colors uppercase tracking-widest">{item.ipa}</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 max-w-[200px] italic">
                      {item.definition}
                    </p>
                  </div>
                  <button 
                    onClick={() => playAudio(item.word)}
                    className="p-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-lg transition-all active:scale-90 shadow-sm"
                    title="Listen to Pronunciation"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>

        {/* Relationships Section */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-emerald-100 dark:border-emerald-900/50 shadow-sm flex flex-col items-center">
          <Users className="w-8 h-8 text-emerald-500 mb-4" />
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('mastery.relationships')}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 text-center">{t('mastery.relDesc')}</p>
          <button 
            onClick={handleGenerateRels}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold rounded-xl hover:bg-emerald-200 dark:hover:bg-emerald-500/30 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            {t('mastery.showRandom')}
          </button>
          
          <AnimatePresence mode="popLayout">
            <div className="mt-6 w-full space-y-3">
              {relWords.map((item, i) => (
                <motion.div
                  key={item.word + i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/50 shadow-sm flex items-center justify-between group hover:border-emerald-300 dark:hover:border-emerald-500 transition-all"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 dark:text-white">{item.word}</span>
                    <span className="text-xs font-mono text-slate-400 group-hover:text-emerald-400 transition-colors uppercase tracking-widest">{item.ipa}</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 max-w-[200px] italic">
                      {item.definition}
                    </p>
                  </div>
                  <button 
                    onClick={() => playAudio(item.word)}
                    className="p-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg transition-all active:scale-90 shadow-sm"
                    title="Listen to Pronunciation"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
