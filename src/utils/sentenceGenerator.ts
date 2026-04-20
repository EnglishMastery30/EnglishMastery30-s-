export const VERB_LIST = [
  { base: 'eat', ing: 'eating', past: 'ate', pp: 'eaten', s: 'eats', obj: 'rice' },
  { base: 'play', ing: 'playing', past: 'played', pp: 'played', s: 'plays', obj: 'soccer' },
  { base: 'watch', ing: 'watching', past: 'watched', pp: 'watched', s: 'watches', obj: 'movies' },
  { base: 'write', ing: 'writing', past: 'wrote', pp: 'written', s: 'writes', obj: 'letters' }
];

export const SUBJ_LIST = ['I', 'We', 'You', 'They', 'He', 'She', 'It'];

export interface SubConfig {
  title?: string;
  verbForm: 'base' | 'ing' | 'past' | 'pp' | 's';
  pos: (sub: string, verb: string, obj: string) => string;
  neg: (sub: string, verb: string, obj: string) => string;
  q: (sub: string, verb: string, obj: string) => string;
  nq: (sub: string, verb: string, obj: string) => string;
}

export function generateSentences(configs: SubConfig[]): string {
  let text = '';
  for (const config of configs) {
    if (config.title) {
       text += `\n🌟 ${config.title}\n`;
    }
    for (const sub of SUBJ_LIST) {
      text += `\n🔸 Subject: ${sub}\n🔹 RANDOM VERB SPOKEN ENGLISH SENTENCES\n`;
      for (const v of VERB_LIST) {
        const mainVerb = v[config.verbForm];
        const obj = v.obj;

        text += `${config.pos(sub, mainVerb, obj)}\n`;
        text += `${config.neg(sub, mainVerb, obj)}\n`;
        text += `${config.q(sub, mainVerb, obj)}\n`;
        text += `${config.nq(sub, mainVerb, obj)}\n`;
        
        // Wh- Questions
        const qBase = config.q(sub, mainVerb, obj).replace('?', '');
        const qBaseNoObj = config.q(sub, mainVerb, '').trim().replace('?', '');
        
        text += `What ${qBaseNoObj.charAt(0).toLowerCase() + qBaseNoObj.slice(1)}?\n`;
        text += `Why ${qBase.charAt(0).toLowerCase() + qBase.slice(1)}?\n`;
        text += `Where ${qBase.charAt(0).toLowerCase() + qBase.slice(1)}?\n`;
        text += `When ${qBase.charAt(0).toLowerCase() + qBase.slice(1)}?\n`;
        text += `How ${qBase.charAt(0).toLowerCase() + qBase.slice(1)}?\n`;
      }
    }
  }
  return text.trim();
}
