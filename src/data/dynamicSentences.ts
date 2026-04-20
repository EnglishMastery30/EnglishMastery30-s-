export const VERBS = [
  { base: 'eat', ing: 'eating', past: 'ate', pp: 'eaten', s: 'eats', obj: 'rice' },
  { base: 'play', ing: 'playing', past: 'played', pp: 'played', s: 'plays', obj: 'soccer' },
  { base: 'watch', ing: 'watching', past: 'watched', pp: 'watched', s: 'watches', obj: 'movies' },
  { base: 'write', ing: 'writing', past: 'wrote', pp: 'written', s: 'writes', obj: 'letters' }
];

const SUBJECTS = ['I', 'We', 'You', 'They', 'He', 'She', 'It'];

interface DayConfig {
  helper: (sub: string) => string;
  helperNot: (sub: string) => string;
  helperQ: (sub: string) => string;
  helperNotQ: (sub: string) => string;
  verbForm: 'base' | 'ing' | 'past' | 'pp' | 's' | 'to_base';
  isTwoPartHelper?: boolean;
}

function generate(config: DayConfig): string {
  let text = '';
  // Random verb SPOKEN ENGLISH SENTENCES
  for (const sub of SUBJECTS) {
    text += `\n🔸 Subject: ${sub}\n🔹 RANDOM VERB SPOKEN ENGLISH SENTENCES\n`;
    for (const v of VERBS) {
      let verbStr = v[config.verbForm] + ' ' + v.obj;
      let verbStrNoObj = v[config.verbForm];

      const h = config.helper(sub);
      const hNot = config.helperNot(sub);
      const hQ = config.helperQ(sub);
      const hnQ = config.helperNotQ(sub);

      // Handle two-part helpers like "shall be" / "will be" for questions
      // E.g., Shall I be playing?
      let qVerbStr = verbStr;
      let qVerbStrNoObj = verbStrNoObj;
      if (config.isTwoPartHelper) {
        // Assume the second part is always "be", "have", "have been", etc.
        // Wait, for standard simplicity in the prompt, let's treat it correctly:
        // Actually it's easier to explicitly pass the second part.
      }

      // We'll adjust `isTwoPartHelper` explicitly
      let finalVerbStr = verbStr;
      let finalVerbStrNoObj = verbStrNoObj;
      if (config.isTwoPartHelper) {
         const isBe = h.includes('be');
         const isHave = h.includes('have');
         const isHaveBeen = h.includes('have been');
         // We construct it dynamically inside the generate loop more carefully.
      }

    }
  }
  return text.trim();
}
