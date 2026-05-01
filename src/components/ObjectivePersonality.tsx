import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Languages, Star, Shield, AlertTriangle, User, Users, Baby, Shirt, Heart, Mic, Eye, MapPin, Smile, Utensils, Scissors, Laugh, Ear, FileText, Volume2, Scale } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCredits } from '../contexts/CreditsContext';
import { GoogleGenAI } from '@google/genai';
import { generateContentWithFallback } from '../utils/aiFallback';
import { WordCard } from './WordCard';

interface Adjective {
  word: string;
  category: 'positive' | 'neutral' | 'negative';
  definition?: string;
}

interface SectionData {
  id: string;
  title: string;
  definition: string;
  icon: React.ReactNode;
  data: Adjective[];
  accentColor: string;
}

const MAN_PERSONALITY: Adjective[] = [
  { word: 'Handsome', category: 'positive' },
  { word: 'Clean cut', category: 'positive' },
  { word: 'Striking', category: 'positive' },
  { word: 'Arresting', category: 'positive' },
  { word: 'Appealing', category: 'positive' },
  { word: 'Sculptured', category: 'positive' },
  { word: 'Well built', category: 'positive' },
  { word: 'Rugged', category: 'positive' },
  { word: 'Ambitious', category: 'positive' },
  { word: 'Rough', category: 'neutral' },
  { word: 'Excellent', category: 'positive' },
  { word: 'Silent', category: 'neutral' },
  { word: 'Inviting', category: 'positive' },
  { word: 'Engaging', category: 'positive' },
  { word: 'Innocent', category: 'positive' },
  { word: 'Fearless', category: 'positive' },
  { word: 'Likable', category: 'positive' },
  { word: 'Selective', category: 'neutral' },
  { word: 'Brave', category: 'positive' },
  { word: 'Catty', category: 'negative' },
  { word: 'Cheeky', category: 'neutral' },
  { word: 'Bad tempered', category: 'negative' },
  { word: 'Big headed', category: 'negative' },
  { word: 'Arrogant', category: 'negative' },
  { word: 'Bossy', category: 'negative' },
];

const WOMAN_PERSONALITY: Adjective[] = [
  { word: 'Gorgeous', category: 'positive' },
  { word: 'Glamorous', category: 'positive' },
  { word: 'Amazing', category: 'positive' },
  { word: 'Awesome', category: 'positive' },
  { word: 'Effeminate', category: 'neutral' },
  { word: 'Smart-attractive', category: 'positive' },
  { word: 'Homely', category: 'neutral' },
  { word: 'Beautiful', category: 'positive' },
  { word: 'Melting', category: 'positive' },
  { word: 'Alluring', category: 'positive' },
  { word: 'Dazzling', category: 'positive' },
  { word: 'Gracious', category: 'positive' },
  { word: 'Seductive', category: 'neutral' },
  { word: 'Romantic-charming', category: 'positive' },
  { word: 'Cherubic', category: 'positive' },
  { word: 'Haunting', category: 'neutral' },
  { word: 'Irresistible', category: 'positive' },
  { word: 'Staggering', category: 'positive' },
  { word: 'Bewitching', category: 'positive' },
  { word: 'Curvaceous', category: 'positive' },
  { word: 'Mesmerizing', category: 'positive' },
  { word: 'Drop-dead', category: 'positive' },
  { word: 'Angelic', category: 'positive' },
  { word: 'Comely', category: 'positive' },
  { word: 'Radiant', category: 'positive' },
  { word: 'Ravishing', category: 'positive' },
  { word: 'Stunning', category: 'positive' },
  { word: 'Elegant', category: 'positive' },
];

const CHILD_PERSONALITY: Adjective[] = [
  { word: 'Adorable', category: 'positive' },
  { word: 'Lovely', category: 'positive' },
  { word: 'Bubbly', category: 'positive' },
  { word: 'Bonny', category: 'positive' },
  { word: 'Cute', category: 'positive' },
  { word: 'Darling', category: 'positive' },
  { word: 'Pretty', category: 'positive' },
  { word: 'Dainty', category: 'positive' },
  { word: 'Cuddly', category: 'positive' },
  { word: 'Loveable', category: 'positive' },
  { word: 'Sweet', category: 'positive' },
  { word: 'Little', category: 'neutral' },
  { word: 'Precious', category: 'positive' },
  { word: 'Dashing', category: 'positive' },
  { word: 'Teensy', category: 'neutral' },
];

const DRESS_ADJECTIVES: Adjective[] = [
  { word: 'Elegant', category: 'positive' },
  { word: 'Glamorous', category: 'positive' },
  { word: 'Gorgeous', category: 'positive' },
  { word: 'Presentable', category: 'positive' },
  { word: 'Colorful', category: 'positive' },
  { word: 'Casual wear', category: 'neutral' },
  { word: 'Formal wear', category: 'neutral' },
  { word: 'Expensive clothes', category: 'neutral' },
  { word: 'Cheap clothes', category: 'neutral' },
  { word: 'Shabby clothes', category: 'negative' },
  { word: 'Handmade clothes', category: 'positive' },
  { word: 'Designer clothes', category: 'positive' },
  { word: 'Readymade clothes', category: 'neutral' },
  { word: 'Cotton clothes', category: 'neutral' },
  { word: 'Linen clothes', category: 'neutral' },
  { word: 'Silk clothes', category: 'positive' },
  { word: 'Synthetic clothes', category: 'neutral' },
  { word: 'Nylon clothes', category: 'neutral' },
  { word: 'Polyester clothes', category: 'neutral' },
  { word: 'Denim clothes', category: 'neutral' },
  { word: 'Leather clothes', category: 'neutral' },
];

const CHARACTER_ADJECTIVES: Adjective[] = [
  { word: 'Active', category: 'positive' },
  { word: 'Aggressive', category: 'negative' },
  { word: 'Ambitious', category: 'positive' },
  { word: 'Arrogant', category: 'negative' },
  { word: 'Assertive', category: 'positive' },
  { word: 'Creative', category: 'positive' },
  { word: 'Pleasant', category: 'positive' },
  { word: 'Good tempered', category: 'positive' },
  { word: 'Easy going', category: 'positive' },
  { word: 'Friendly', category: 'positive' },
  { word: 'Independent', category: 'positive' },
  { word: 'Matured', category: 'positive' },
  { word: 'Reliable', category: 'positive' },
  { word: 'Honest', category: 'positive' },
  { word: 'Hard-working', category: 'positive' },
  { word: 'Energetic', category: 'positive' },
  { word: 'Lazy', category: 'negative' },
  { word: 'Organized', category: 'positive' },
  { word: 'Self confident', category: 'positive' },
  { word: 'Generous', category: 'positive' },
  { word: 'Humble', category: 'positive' },
  { word: 'Patient', category: 'positive' },
  { word: 'Observant', category: 'positive' },
  { word: 'Optimistic', category: 'positive' },
  { word: 'Resourceful', category: 'positive' },
  { word: 'Persuasive', category: 'positive' },
  { word: 'Witty', category: 'positive' },
  { word: 'Charismatic', category: 'positive' },
  { word: 'Sophisticated', category: 'positive' },
  { word: 'Introverted', category: 'neutral' },
  { word: 'Extroverted', category: 'neutral' },
];

const LIPS_ADJECTIVES: Adjective[] = [
  { word: 'Flat lips', category: 'neutral' },
  { word: 'Uneven lips', category: 'neutral' },
  { word: 'Droopy lips', category: 'positive' },
  { word: 'Thick lips', category: 'neutral' },
  { word: 'Thin lips', category: 'neutral' },
  { word: 'Wide lips', category: 'neutral' },
  { word: 'Full lips', category: 'positive' },
  { word: 'Round lips', category: 'neutral' },
  { word: 'Rosebud lips', category: 'positive' },
  { word: 'Luscious', category: 'positive' },
  { word: 'Crimson', category: 'neutral' },
  { word: 'Chapped', category: 'negative' },
];

const VOICE_ADJECTIVES: Adjective[] = [
  { word: 'Sweet', category: 'positive' },
  { word: 'Husky', category: 'neutral' },
  { word: 'Melodious', category: 'positive' },
  { word: 'Mellifluous', category: 'positive' },
  { word: 'Appealing', category: 'positive' },
  { word: 'Breathy', category: 'neutral' },
  { word: 'Croaky', category: 'neutral' },
  { word: 'Fruity', category: 'neutral' },
  { word: 'Honeyed', category: 'positive' },
  { word: 'Silvery', category: 'positive' },
  { word: 'Sing song', category: 'positive' },
  { word: 'Smoky', category: 'neutral' },
  { word: 'Baritone', category: 'neutral' },
  { word: 'Soft-spoken', category: 'positive' },
  { word: 'Monotonous', category: 'negative' },
  { word: 'Gravelly', category: 'neutral' },
  { word: 'Dulcet', category: 'positive' },
];

const EYES_ADJECTIVES: Adjective[] = [
  { word: 'Dancing eyes', category: 'positive' },
  { word: 'Flashing eyes', category: 'positive' },
  { word: 'Glittering eyes', category: 'positive' },
  { word: 'Sparkling eyes', category: 'positive' },
  { word: 'Twinkling eyes', category: 'positive' },
  { word: 'Dark eyes', category: 'neutral' },
  { word: 'Brown eyes', category: 'neutral' },
  { word: 'Blue eyes', category: 'neutral' },
  { word: 'Light blue eyes', category: 'neutral' },
  { word: 'Bright eyes', category: 'positive' },
  { word: 'Expressive eyes', category: 'positive' },
  { word: 'Long lashed eyes', category: 'positive' },
  { word: 'Piercing eyes', category: 'neutral' },
  { word: 'Soulful', category: 'positive' },
  { word: 'Misty', category: 'neutral' },
  { word: 'Keen vision', category: 'positive' },
  { word: 'Blurred vision', category: 'negative' },
  { word: 'Sharp-eyed', category: 'positive' },
];

const PLACE_ADJECTIVES: Adjective[] = [
  { word: 'Lovely', category: 'positive' },
  { word: 'Magnificent', category: 'positive' },
  { word: 'Endearing', category: 'positive' },
  { word: 'Enchanting', category: 'positive' },
  { word: 'Eye catching', category: 'positive' },
  { word: 'Picturesque', category: 'positive' },
  { word: 'Amazing', category: 'positive' },
  { word: 'Beautiful', category: 'positive' },
  { word: 'Modern', category: 'neutral' },
  { word: 'Natural', category: 'positive' },
  { word: 'Tranquil', category: 'positive' },
  { word: 'Romantic', category: 'positive' },
  { word: 'Panoramic', category: 'positive' },
];

const EXPRESSION_ADJECTIVES: Adjective[] = [
  { word: 'Absent', category: 'neutral' },
  { word: 'Appealing', category: 'positive' },
  { word: 'Beatific', category: 'positive' },
  { word: 'Curious', category: 'positive' },
  { word: 'Dreamy', category: 'positive' },
  { word: 'Meaningful', category: 'positive' },
  { word: 'Mischievous', category: 'neutral' },
  { word: 'Radiant', category: 'positive' },
  { word: 'Smiley', category: 'positive' },
  { word: 'Thoughtful', category: 'positive' },
  { word: 'Worried', category: 'negative' },
];

const FOOD_ADJECTIVES: Adjective[] = [
  { word: 'Deep fried', category: 'neutral' },
  { word: 'Juicy', category: 'positive' },
  { word: 'Bitter', category: 'neutral' },
  { word: 'Salty', category: 'neutral' },
  { word: 'Tasteless', category: 'negative' },
  { word: 'Tempting', category: 'positive' },
  { word: 'Tasty', category: 'positive' },
  { word: 'Delicious', category: 'positive' },
  { word: 'Yummy', category: 'positive' },
];

const HAIR_ADJECTIVES: Adjective[] = [
  { word: 'Short hair', category: 'neutral' },
  { word: 'Straight hair', category: 'neutral' },
  { word: 'Wavy hair', category: 'neutral' },
  { word: 'Long hair', category: 'neutral' },
  { word: 'Silky hair', category: 'positive' },
  { word: 'Curly hair', category: 'neutral' },
  { word: 'Smooth hair', category: 'positive' },
  { word: 'Shiny hair', category: 'positive' },
  { word: 'Neatly combed hair', category: 'positive' },
];

const SMILE_ADJECTIVES: Adjective[] = [
  { word: 'Sincere', category: 'positive' },
  { word: 'Sweet', category: 'positive' },
  { word: 'Welcoming', category: 'positive' },
  { word: 'Gracious', category: 'positive' },
  { word: 'Dazzling', category: 'positive' },
  { word: 'Lovely', category: 'positive' },
  { word: 'Loving', category: 'positive' },
  { word: 'Beautiful', category: 'positive' },
  { word: 'Beaming', category: 'positive' },
  { word: 'Glowing', category: 'positive' },
];

const EARS_NOSE_ADJECTIVES: Adjective[] = [
  { word: 'Nice nose', category: 'positive' },
  { word: 'Small nose', category: 'neutral' },
  { word: 'Big nose', category: 'neutral' },
  { word: 'Flat nose', category: 'neutral' },
  { word: 'Thin nose', category: 'neutral' },
  { word: 'Thick nose', category: 'neutral' },
  { word: 'Roman nose', category: 'neutral' },
  { word: 'Delicate nose', category: 'positive' },
];

const SKIN_ADJECTIVES: Adjective[] = [
  { word: 'Blooming', category: 'positive' },
  { word: 'Clear', category: 'positive' },
  { word: 'Glowing', category: 'positive' },
  { word: 'Fair', category: 'positive' },
  { word: 'Rosy', category: 'positive' },
  { word: 'Ruddy', category: 'neutral' },
  { word: 'Tanned', category: 'neutral' },
];

const COMPARATIVE_ADJECTIVES: Adjective[] = [
  { word: 'Taller than', category: 'neutral' },
  { word: 'Shorter than', category: 'neutral' },
  { word: 'More beautiful than', category: 'positive' },
  { word: 'More handsome than', category: 'positive' },
  { word: 'Prettier than', category: 'positive' },
  { word: 'Stronger than', category: 'positive' },
  { word: 'Faster than', category: 'positive' },
  { word: 'Smaller than', category: 'neutral' },
  { word: 'Bigger than', category: 'neutral' },
  { word: 'More intelligent than', category: 'positive' },
  { word: 'More creative than', category: 'positive' },
  { word: 'Kindlier than', category: 'positive' },
  { word: 'Friendlier than', category: 'positive' },
  { word: 'More elegant than', category: 'positive' },
];

const FACE_ADJECTIVES: Adjective[] = [
  { word: 'Round face', category: 'neutral' },
  { word: 'Oval face', category: 'neutral' },
  { word: 'Square face', category: 'neutral' },
  { word: 'Thin face', category: 'neutral' },
  { word: 'Chubby face', category: 'neutral' },
  { word: 'Chiseled face', category: 'positive' },
  { word: 'Masked face', category: 'neutral' },
  { word: 'Bearded face', category: 'neutral' },
  { word: 'Clean-shaven', category: 'positive' },
  { word: 'Battered face', category: 'negative' },
  { word: 'Angelic face', category: 'positive' },
  { word: 'Radiant face', category: 'positive' },
  { word: 'Weather-beaten', category: 'neutral' },
  { word: 'Dimpled', category: 'positive' },
  { word: 'Freckled', category: 'neutral' },
  { word: 'Palid', category: 'negative' },
  { word: 'Sallow', category: 'negative' },
];

export function ObjectivePersonality({ section }: { section?: string }) {
  const { language } = useLanguage();
  const { consumeCredits, useCustomKeys, apiKeys } = useCredits();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'positive': return <Star className="w-4 h-4 text-emerald-500" />;
      case 'negative': return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      default: return <Shield className="w-4 h-4 text-slate-400" />;
    }
  };

  const Section = ({ title, definition, icon, data, accentColor, categoryId }: { 
    title: string, 
    definition?: string,
    icon: React.ReactNode, 
    data: Adjective[], 
    accentColor: string,
    categoryId: string
  }) => {
    const accentConfig: Record<string, any> = {
      sky: { border: 'border-sky-100', darkBorder: 'dark:border-sky-800', hoverBorder: 'hover:border-sky-300 dark:hover:border-sky-500/50', text: 'group-hover:text-sky-600 dark:group-hover:text-sky-400', bg: 'group-hover:bg-sky-50 dark:group-hover:bg-sky-500/10', button: 'bg-gradient-to-br from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700' },
      rose: { border: 'border-rose-100', darkBorder: 'dark:border-rose-800', hoverBorder: 'hover:border-rose-300 dark:hover:border-rose-500/50', text: 'group-hover:text-rose-600 dark:group-hover:text-rose-400', bg: 'group-hover:bg-rose-50 dark:group-hover:bg-rose-500/10', button: 'bg-gradient-to-br from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700' },
      emerald: { border: 'border-emerald-100', darkBorder: 'dark:border-emerald-800', hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-500/50', text: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400', bg: 'group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10', button: 'bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700' },
      orange: { border: 'border-orange-100', darkBorder: 'dark:border-orange-800', hoverBorder: 'hover:border-orange-300 dark:hover:border-orange-500/50', text: 'group-hover:text-orange-600 dark:group-hover:text-orange-400', bg: 'group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10', button: 'bg-gradient-to-br from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700' },
      violet: { border: 'border-violet-100', darkBorder: 'dark:border-violet-800', hoverBorder: 'hover:border-violet-300 dark:hover:border-violet-500/50', text: 'group-hover:text-violet-600 dark:group-hover:text-violet-400', bg: 'group-hover:bg-violet-50 dark:group-hover:bg-violet-500/10', button: 'bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700' },
      cyan: { border: 'border-cyan-100', darkBorder: 'dark:border-cyan-800', hoverBorder: 'hover:border-cyan-300 dark:hover:border-cyan-500/50', text: 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400', bg: 'group-hover:bg-cyan-50 dark:group-hover:bg-cyan-500/10', button: 'bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700' },
      lime: { border: 'border-lime-100', darkBorder: 'dark:border-lime-800', hoverBorder: 'hover:border-lime-300 dark:hover:border-lime-500/50', text: 'group-hover:text-lime-600 dark:group-hover:text-lime-400', bg: 'group-hover:bg-lime-50 dark:group-hover:bg-lime-500/10', button: 'bg-gradient-to-br from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700' },
      amber: { border: 'border-amber-100', darkBorder: 'dark:border-amber-800', hoverBorder: 'hover:border-amber-300 dark:hover:border-amber-500/50', text: 'group-hover:text-amber-600 dark:group-hover:text-amber-400', bg: 'group-hover:bg-amber-50 dark:group-hover:bg-amber-500/10', button: 'bg-gradient-to-br from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700' },
      red: { border: 'border-red-100', darkBorder: 'dark:border-red-800', hoverBorder: 'hover:border-red-300 dark:hover:border-red-500/50', text: 'group-hover:text-red-600 dark:group-hover:text-red-400', bg: 'group-hover:bg-red-50 dark:group-hover:bg-red-500/10', button: 'bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700' },
      zinc: { border: 'border-zinc-100', darkBorder: 'dark:border-zinc-800', hoverBorder: 'hover:border-zinc-300 dark:hover:border-zinc-500/50', text: 'group-hover:text-zinc-600 dark:group-hover:text-zinc-400', bg: 'group-hover:bg-zinc-50 dark:group-hover:bg-zinc-500/10', button: 'bg-gradient-to-br from-zinc-500 to-slate-600 hover:from-zinc-600 hover:to-slate-700' },
      yellow: { border: 'border-yellow-100', darkBorder: 'dark:border-yellow-800', hoverBorder: 'hover:border-yellow-300 dark:hover:border-yellow-500/50', text: 'group-hover:text-yellow-600 dark:group-hover:text-yellow-400', bg: 'group-hover:bg-yellow-50 dark:group-hover:bg-yellow-500/10', button: 'bg-gradient-to-br from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600' },
      slate: { border: 'border-slate-100', darkBorder: 'dark:border-slate-800', hoverBorder: 'hover:border-slate-300 dark:hover:border-slate-500/50', text: 'group-hover:text-slate-600 dark:group-hover:text-slate-400', bg: 'group-hover:bg-slate-50 dark:group-hover:bg-slate-500/10', button: 'bg-gradient-to-br from-slate-500 to-zinc-600 hover:from-slate-600 hover:to-zinc-700' },
      teal: { border: 'border-teal-100', darkBorder: 'dark:border-teal-800', hoverBorder: 'hover:border-teal-300 dark:hover:border-teal-500/50', text: 'group-hover:text-teal-600 dark:group-hover:text-teal-400', bg: 'group-hover:bg-teal-50 dark:group-hover:bg-teal-500/10', button: 'bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700' },
      indigo: { border: 'border-indigo-100', darkBorder: 'dark:border-indigo-800', hoverBorder: 'hover:border-indigo-300 dark:hover:border-indigo-500/50', text: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400', bg: 'group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10', button: 'bg-gradient-to-br from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700' },
    };

    const config = accentConfig[accentColor] || accentConfig.slate;

    return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-8 py-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none sticky top-16 z-30 -mt-4 transition-all">
        <div className={`p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border ${config.border} ${config.darkBorder}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">{definition}</p>
        </div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map((item, idx) => {
            return (
              <WordCard 
                key={idx} 
                word={item.word} 
                category={categoryId === 'trait' ? 'Personality' : title} 
                config={config} 
                idx={idx} 
                autoFetch={false}
                showDefine={true}
              />
            );
          })}
        </div>
      </div>
    </div>
    );
  };

  const renderContent = () => {
    const allSections: SectionData[] = [
      { id: 'man', title: "Male Traits", definition: "Adjectives used to describe the appearance and qualities of men.", icon: <User className="w-8 h-8 text-sky-500" />, data: MAN_PERSONALITY, accentColor: "sky" },
      { id: 'woman', title: "Female Traits", definition: "Adjectives used to describe the appearance and qualities of women.", icon: <User className="w-8 h-8 text-rose-500" />, data: WOMAN_PERSONALITY, accentColor: "rose" },
      { id: 'child', title: "Child Traits", definition: "Sweet and adorable adjectives for describing children.", icon: <Baby className="w-8 h-8 text-violet-500" />, data: CHILD_PERSONALITY, accentColor: "violet" },
      { id: 'trait', title: "Character Trait", definition: "Internal qualities that define a person's behavior and personality.", icon: <Heart className="w-8 h-8 text-teal-500" />, data: CHARACTER_ADJECTIVES, accentColor: "teal" },
      { id: 'voice', title: "Voice", definition: "Descriptive words for the sound and tone of someone's speech.", icon: <Mic className="w-8 h-8 text-indigo-500" />, data: VOICE_ADJECTIVES, accentColor: "indigo" },
      { id: 'lips', title: "Lips", definition: "Terms for the shape, texture, and appearance of lips.", icon: <Mic className="w-8 h-8 text-violet-500" />, data: LIPS_ADJECTIVES, accentColor: "violet" },
      { id: 'eyes', title: "Vision & Eyes", definition: "Adjectives describing the color, expression, and clarity of eyes.", icon: <Eye className="w-8 h-8 text-cyan-500" />, data: EYES_ADJECTIVES, accentColor: "cyan" },
      { id: 'place', title: "Pleasant Atmosphere", definition: "Words to describe the mood and aesthetic of a location or setting.", icon: <MapPin className="w-8 h-8 text-lime-500" />, data: PLACE_ADJECTIVES, accentColor: "lime" },
      { id: 'expressions', title: "Expressions", definition: "Terms used to describe the feelings shown on someone's face.", icon: <Smile className="w-8 h-8 text-amber-500" />, data: EXPRESSION_ADJECTIVES, accentColor: "amber" },
      { id: 'food', title: "Food and Taste", definition: "Words that describe the flavor, texture, and preparation of food.", icon: <Utensils className="w-8 h-8 text-red-500" />, data: FOOD_ADJECTIVES, accentColor: "red" },
      { id: 'hair', title: "Hairstyle", definition: "Descriptions for hair length, color, texture, and style.", icon: <Scissors className="w-8 h-8 text-zinc-500" />, data: HAIR_ADJECTIVES, accentColor: "zinc" },
      { id: 'smile', title: "Smile and Joy", definition: "Positive words describing various types of smiles and happy expressions.", icon: <Laugh className="w-8 h-8 text-yellow-500" />, data: SMILE_ADJECTIVES, accentColor: "yellow" },
      { id: 'ears_nose', title: "Ears and Nose", definition: "Physical descriptions for the shape and size of ears and noses.", icon: <Ear className="w-8 h-8 text-slate-500" />, data: EARS_NOSE_ADJECTIVES, accentColor: "slate" },
      { id: 'skin', title: "Skin and Glow", definition: "Adjectives for the complexion, texture, and health of skin.", icon: <Users className="w-8 h-8 text-emerald-500" />, data: SKIN_ADJECTIVES, accentColor: "emerald" },
      { id: 'comparative', title: "Comparative Adjectives", definition: "Phrases used to compare qualities between two or more people or things.", icon: <Scale className="w-8 h-8 text-indigo-500" />, data: COMPARATIVE_ADJECTIVES, accentColor: "indigo" },
      { id: 'dress', title: "Dress and Style", definition: "Terms for describing clothing types, quality, and fashion sense.", icon: <Shirt className="w-8 h-8 text-indigo-500" />, data: DRESS_ADJECTIVES, accentColor: "indigo" },
      { id: 'face', title: "Face Features", definition: "General physical characteristics and shapes of the human face.", icon: <User className="w-8 h-8 text-sky-500" />, data: FACE_ADJECTIVES, accentColor: "sky" },
    ];

    const filteredSections = section ? allSections.filter(s => s.id === section) : allSections;

    return (
      <div className="space-y-12">
        {filteredSections.map((s, i) => (
          <Section key={i} title={s.title} definition={s.definition} icon={s.icon} data={s.data} accentColor={s.accentColor} categoryId={s.id} />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-8 mb-12 max-w-7xl mx-auto px-4">
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
}
