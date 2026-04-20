import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info } from 'lucide-react';

interface Definition {
  term: string;
  definition: string;
  type: 'noun' | 'pronoun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'interjection' | 'important';
  extra?: string; // For things like Degrees of Comparison for adjectives
}

const GLOBAL_DEFINITIONS: Record<string, Omit<Definition, 'term'>> = {
  "noun": { definition: "A word that names a person, place, thing, or idea.", type: "noun" },
  "nouns": { definition: "Plural form of noun. Words that name people, places, things, or ideas.", type: "noun" },
  "pronoun": { definition: "A word used in place of a noun.", type: "pronoun" },
  "pronouns": { definition: "Words used in place of nouns.", type: "pronoun" },
  "verb": { definition: "A word that expresses action or a state of being.", type: "verb" },
  "verbs": { definition: "Words that express actions or states of being.", type: "verb" },
  "adjective": { definition: "A word that describes or modifies a noun or pronoun.", type: "adjective", extra: "Adjectives have degrees: Positive (big), Comparative (bigger), Superlative (biggest)." },
  "adjectives": { definition: "Words that describe or modify nouns or pronouns.", type: "adjective", extra: "Adjectives have degrees: Positive (rich), Comparative (richer), Superlative (richest)." },
  "adverb": { definition: "A word that modifies a verb, adjective, or another adverb.", type: "adverb" },
  "adverbs": { definition: "Words that modify verbs, adjectives, or other adverbs.", type: "adverb" },
  "preposition": { definition: "A word that shows the relationship between a noun/pronoun and another part of the sentence.", type: "preposition" },
  "prepositions": { definition: "Words showing relationships of place, time, or direction.", type: "preposition" },
  "conjunction": { definition: "A word that joins words, phrases, or clauses.", type: "conjunction" },
  "conjunctions": { definition: "Connecting words like 'and', 'but', 'or'.", type: "conjunction" },
  "interjection": { definition: "A word or phrase used to express strong emotion or surprise.", type: "interjection" },
  "interjections": { definition: "Exclamations like 'Wow!', 'Ouch!', 'Hey!'.", type: "interjection" },
  "subject": { definition: "The person, place, or thing that is performing the action in a sentence.", type: "important" },
  "predicate": { definition: "The part of a sentence or clause containing a verb and stating something about the subject.", type: "important" },
};

interface SmartHighlightProps {
  text: string;
  highlightedTerms?: string[]; // Custom terms to highlight for this specific context
  topic?: string;
}

const TOPIC_KEYWORDS: Record<string, string[]> = {
  "nouns": ["person", "place", "thing", "idea", "name", "building block"],
  "pronouns": ["replace", "repetition", "he", "she", "it", "they", "we", "you", "i"],
  "verbs": ["action", "state", "occurrence", "being", "run", "eat", "think", "is"],
  "adjectives": ["describe", "modify", "quality", "quantity", "color", "size", "beautiful", "tall"],
  "adverbs": ["modify", "verb", "extent", "how", "when", "where", "quickly", "slowly"],
  "prepositions": ["relationship", "location", "direction", "time", "in", "on", "at", "by"],
  "conjunctions": ["connect", "join", "logic", "and", "but", "or", "because"],
  "interjections": ["emotion", "surprise", "exclamation", "wow", "ouch", "hey"],
};

export function SmartHighlight({ text, highlightedTerms = [], topic }: SmartHighlightProps) {
  const [activeTerm, setActiveTerm] = useState<string | null>(null);

  // Combine global definitions with specific highlighted terms and topic-specific keywords
  const topicLower = topic?.toLowerCase() || '';
  const topicKeywords = Object.entries(TOPIC_KEYWORDS).find(([k]) => topicLower.includes(k))?.[1] || [];

  const allTermsToHighlight = Array.from(new Set([
    ...Object.keys(GLOBAL_DEFINITIONS),
    ...highlightedTerms,
    ...topicKeywords
  ])).map(t => t.toLowerCase());

  // Escape special characters for regex and join
  // Filter out terms that are too short to avoid accidental highlights in the middle of words
  const validTerms = allTermsToHighlight.filter(t => t.length > 2);
  const regex = new RegExp(`\\b(${validTerms.join('|')})\\b`, 'gi');

  const parts = text.split(regex);

  return (
    <span className="relative">
      {parts.map((part, i) => {
        const lowerPart = part.toLowerCase();
        let definition = GLOBAL_DEFINITIONS[lowerPart];
        const isTopicKeyword = topicKeywords.includes(lowerPart);
        const isHighlighted = allTermsToHighlight.includes(lowerPart);

        // Fallback for topic keywords that aren't in global definitions
        if (isTopicKeyword && !definition) {
          definition = { definition: `An important concept related to the current topic of ${topic}.`, type: 'important' };
        }

        if (isHighlighted && part.trim() !== '') {
          const type = definition?.type || (isTopicKeyword ? 'important' : 'noun');
          
          return (
            <span 
              key={i} 
              className="relative inline-block group"
              onMouseEnter={() => setActiveTerm(part + i)}
              onMouseLeave={() => setActiveTerm(null)}
            >
              <span className={`cursor-help font-bold border-b-2 transition-all duration-300 ${
                type === 'adjective' ? 'text-amber-600 border-amber-400 dark:text-amber-400 dark:border-amber-700 decoration-wavy' :
                type === 'verb' ? 'text-emerald-600 border-emerald-400 dark:text-emerald-400 dark:border-emerald-700' :
                type === 'pronoun' ? 'text-purple-600 border-purple-400 dark:text-purple-400 dark:border-purple-700' :
                type === 'important' || isTopicKeyword ? 'text-indigo-600 border-indigo-300 dark:text-indigo-400 dark:border-indigo-700 bg-indigo-50/50 dark:bg-indigo-500/10' :
                'text-indigo-500 border-indigo-200 dark:text-indigo-400 dark:border-indigo-800'
              } hover:bg-slate-100 dark:hover:bg-slate-800 px-0.5 rounded-sm`}>
                {part}
              </span>
              
              <AnimatePresence>
                {activeTerm === (part + i) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 pointer-events-none"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-1.5 rounded-lg shrink-0 ${
                        type === 'adjective' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40' :
                        type === 'verb' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40' :
                        type === 'important' || isTopicKeyword ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40' :
                        'bg-indigo-50 text-indigo-500 dark:bg-indigo-900/20'
                      }`}>
                        <Info className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-slate-900 dark:text-white capitalize mb-1 flex items-center gap-2">
                          {part} 
                          <span className={`text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded-full ${
                            type === 'adjective' ? 'bg-amber-100 text-amber-700' :
                            type === 'verb' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-indigo-100 text-indigo-700'
                          }`}>
                            {type}
                          </span>
                        </h5>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {definition?.definition || "A key grammatical element."}
                        </p>
                        {definition?.extra && (
                          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 italic">
                               💡 PRO TIP: {definition.extra}
                            </p>
                          </div>
                        )}
                        {isTopicKeyword && !definition && (
                          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-[9px] font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wider">
                               RELEVANT TO: {topic}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white dark:border-t-slate-900" />
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
}
