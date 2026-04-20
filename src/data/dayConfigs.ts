import { SubConfig, generateSentences } from '../utils/sentenceGenerator';

// A helper for simple scenarios: Helper Verb + Verb
function simpleConfig(
  title: string,
  helper: (s: string) => string,
  helperNot: (s: string) => string,
  helperQ: (s: string) => string,
  helperNotQ: (s: string) => string,
  verbForm: 'base' | 'ing' | 'past' | 'pp' | 's' = 'base',
  secondPart: string = ''
): SubConfig {
  const p2 = secondPart ? ` ${secondPart}` : '';
  return {
    title,
    verbForm,
    pos: (s, v, o) => `${s} ${helper(s)}${p2} ${v} ${o}.`,
    neg: (s, v, o) => `${s} ${helperNot(s)}${p2} ${v} ${o}.`,
    q: (s, v, o) => `${helperQ(s)} ${s}${p2} ${v} ${o}?`,
    nq: (s, v, o) => `${helperNotQ(s)} ${s}${p2} ${v} ${o}?`,
  };
}

// Complex helper for HAVE TO / NEED TO / DARE TO where the helper behaves like a main verb
function verbLikeHelper(
  title: string,
  baseVerb: string, // 'have to', 'need to'
  sVerb: string // 'has to', 'needs to'
): SubConfig {
  const h = (s: string) => ['He', 'She', 'It'].includes(s) ? sVerb : baseVerb;
  const hNot = (s: string) => ['He', 'She', 'It'].includes(s) ? `doesn't ${baseVerb}` : `don't ${baseVerb}`;
  const hQ = (s: string) => ['He', 'She', 'It'].includes(s) ? 'Does' : 'Do';
  const hnQ = (s: string) => ['He', 'She', 'It'].includes(s) ? `Doesn't` : `Don't`;

  return {
    title,
    verbForm: 'base', // The main verb is in base form, e.g. "Do I have to **eat**?"
    pos: (s, v, o) => `${s} ${h(s)} ${v} ${o}.`,
    neg: (s, v, o) => `${s} ${hNot(s)} ${v} ${o}.`,
    q: (s, v, o) => `${hQ(s)} ${s} ${baseVerb} ${v} ${o}?`,
    nq: (s, v, o) => `${hnQ(s)} ${s} ${baseVerb} ${v} ${o}?`,
  };
}

// Past tense pattern for HAD TO etc.
function pastVerbLikeHelper(
  title: string,
  baseVerb: string, // 'have to'
  pastVerb: string // 'had to'
): SubConfig {
  return {
    title,
    verbForm: 'base',
    pos: (s, v, o) => `${s} ${pastVerb} ${v} ${o}.`,
    neg: (s, v, o) => `${s} didn't ${baseVerb} ${v} ${o}.`,
    q: (s, v, o) => `Did ${s} ${baseVerb} ${v} ${o}?`,
    nq: (s, v, o) => `Didn't ${s} ${baseVerb} ${v} ${o}?`,
  };
}

const day01: SubConfig[] = [
  {
    title: 'DO / DOES',
    verbForm: 'base',
    pos: (s, v, o) => ['He', 'She', 'It'].includes(s) ? `${s} [VERB]s ${o}.` : `${s} ${v} ${o}.`,
    neg: (s, v, o) => ['He', 'She', 'It'].includes(s) ? `${s} doesn't ${v} ${o}.` : `${s} don't ${v} ${o}.`,
    q: (s, v, o) => ['He', 'She', 'It'].includes(s) ? `Does ${s} ${v} ${o}?` : `Do ${s} ${v} ${o}?`,
    nq: (s, v, o) => ['He', 'She', 'It'].includes(s) ? `Doesn't ${s} ${v} ${o}?` : `Don't ${s} ${v} ${o}?`
  }
];

const day02: SubConfig[] = [
  {
    title: 'DID',
    verbForm: 'base',
    pos: (s, v, o) => `${s} [VERB]ed ${o}.`,
    neg: (s, v, o) => `${s} didn't ${v} ${o}.`,
    q: (s, v, o) => `Did ${s} ${v} ${o}?`,
    nq: (s, v, o) => `Didn't ${s} ${v} ${o}?`
  }
];

const day03: SubConfig[] = [
  simpleConfig('SHALL / WILL',
    s => ['I', 'We'].includes(s) ? 'shall' : 'will',
    s => ['I', 'We'].includes(s) ? "shan't" : "won't",
    s => ['I', 'We'].includes(s) ? 'Shall' : 'Will',
    s => ['I', 'We'].includes(s) ? "Shan't" : "Won't",
    'base'
  )
];

const day04: SubConfig[] = [simpleConfig('AM / IS / ARE', 
  s => s === 'I' ? 'am' : (['He', 'She', 'It'].includes(s) ? 'is' : 'are'),
  s => s === 'I' ? 'am not' : (['He', 'She', 'It'].includes(s) ? "isn't" : "aren't"),
  s => s === 'I' ? 'Am' : (['He', 'She', 'It'].includes(s) ? 'Is' : 'Are'),
  s => s === 'I' ? "Aren't" : (['He', 'She', 'It'].includes(s) ? "Isn't" : "Aren't"), // Aren't I?
  'ing'
)];

const day05: SubConfig[] = [simpleConfig('WAS / WERE',
  s => ['I', 'He', 'She', 'It'].includes(s) ? 'was' : 'were',
  s => ['I', 'He', 'She', 'It'].includes(s) ? "wasn't" : "weren't",
  s => ['I', 'He', 'She', 'It'].includes(s) ? 'Was' : 'Were',
  s => ['I', 'He', 'She', 'It'].includes(s) ? "Wasn't" : "Weren't",
  'ing'
)];

const day06: SubConfig[] = [simpleConfig('SHALL BE / WILL BE',
  s => ['I', 'We'].includes(s) ? 'shall' : 'will',
  s => ['I', 'We'].includes(s) ? "shan't" : "won't",
  s => ['I', 'We'].includes(s) ? 'Shall' : 'Will',
  s => ['I', 'We'].includes(s) ? "Shan't" : "Won't",
  'ing',
  'be'
)];

const day08: SubConfig[] = [
  simpleConfig('CAN', () => 'can', () => "can't", () => 'Can', () => "Can't", 'base'),
  simpleConfig('COULD', () => 'could', () => "couldn't", () => 'Could', () => "Couldn't", 'base')
];

const day09: SubConfig[] = [
  simpleConfig('MAY', () => 'may', () => "may not", () => 'May', () => "May not", 'base'),
  simpleConfig('MIGHT', () => 'might', () => "might not", () => 'Might', () => "Might not", 'base')
];

const day10: SubConfig[] = [
  simpleConfig('SHOULD', () => 'should', () => "shouldn't", () => 'Should', () => "Shouldn't", 'base'),
  simpleConfig('MUST', () => 'must', () => "mustn't", () => 'Must', () => "Mustn't", 'base')
];

const day11: SubConfig[] = [
  simpleConfig('WOULD', () => 'would', () => "wouldn't", () => 'Would', () => "Wouldn't", 'base')
];

const day12: SubConfig[] = [verbLikeHelper('HAVE TO / HAS TO', 'have to', 'has to')];
const day13: SubConfig[] = [verbLikeHelper('NEED TO / NEEDS TO', 'need to', 'needs to')];
const day14: SubConfig[] = [verbLikeHelper('WANT TO / WANTS TO', 'want to', 'wants to')];
const day15: SubConfig[] = [verbLikeHelper('DARE TO / DARES TO', 'dare to', 'dares to')];
const day16: SubConfig[] = [verbLikeHelper('WISH TO / WISHES TO', 'wish to', 'wishes to')];

const day17: SubConfig[] = [simpleConfig('WOULD LIKE TO', () => 'would', () => 'would not', () => 'Would', () => "Wouldn't", 'base', 'like to')]; // Wait: Would I like to? -> hQ=Would, s=I, secondPart=like to. Yes!
const day18: SubConfig[] = [simpleConfig('OUGHT TO', () => 'ought', () => 'ought not', () => 'Ought', () => "Oughtn't", 'base', 'to')]; // Ought I to?

const day19: SubConfig[] = [simpleConfig('GOING TO (AM/IS/ARE + GOING TO)',
  s => s === 'I' ? 'am' : (['He', 'She', 'It'].includes(s) ? 'is' : 'are'),
  s => s === 'I' ? 'am not' : (['He', 'She', 'It'].includes(s) ? "isn't" : "aren't"),
  s => s === 'I' ? 'Am' : (['He', 'She', 'It'].includes(s) ? 'Is' : 'Are'),
  s => s === 'I' ? "Aren't" : (['He', 'She', 'It'].includes(s) ? "Isn't" : "Aren't"),
  'base',
  'going to'
)];

const day20: SubConfig[] = [simpleConfig('ABLE TO (AM/IS/ARE + ABLE TO)',
  s => s === 'I' ? 'am' : (['He', 'She', 'It'].includes(s) ? 'is' : 'are'),
  s => s === 'I' ? 'am not' : (['He', 'She', 'It'].includes(s) ? "isn't" : "aren't"),
  s => s === 'I' ? 'Am' : (['He', 'She', 'It'].includes(s) ? 'Is' : 'Are'),
  s => s === 'I' ? "Aren't" : (['He', 'She', 'It'].includes(s) ? "Isn't" : "Aren't"),
  'base',
  'able to'
)];

const day21: SubConfig[] = [pastVerbLikeHelper('HAD TO', 'have to', 'had to')]; // Did I have to?

const day22: SubConfig[] = [simpleConfig('WILLING TO (AM/IS/ARE + WILLING TO)',
  s => s === 'I' ? 'am' : (['He', 'She', 'It'].includes(s) ? 'is' : 'are'),
  s => s === 'I' ? 'am not' : (['He', 'She', 'It'].includes(s) ? "isn't" : "aren't"),
  s => s === 'I' ? 'Am' : (['He', 'She', 'It'].includes(s) ? 'Is' : 'Are'),
  s => s === 'I' ? "Aren't" : (['He', 'She', 'It'].includes(s) ? "Isn't" : "Aren't"),
  'base',
  'willing to'
)];

const day23: SubConfig[] = [pastVerbLikeHelper('USED TO', 'use to', 'used to')]; // Did I use to?

const day24: SubConfig[] = [simpleConfig('HAVE / HAS (Perfect Tense)', 
  s => ['He', 'She', 'It'].includes(s) ? 'has' : 'have',
  s => ['He', 'She', 'It'].includes(s) ? "hasn't" : "haven't",
  s => ['He', 'She', 'It'].includes(s) ? 'Has' : 'Have',
  s => ['He', 'She', 'It'].includes(s) ? "Hasn't" : "Haven't",
  'pp'
)];

const day25: SubConfig[] = [simpleConfig('HAD (Past Perfect)',
  () => 'had', () => "hadn't", () => 'Had', () => "Hadn't", 'pp'
)];

const day26: SubConfig[] = [simpleConfig('SHALL HAVE / WILL HAVE',
  s => ['I', 'We'].includes(s) ? 'shall' : 'will',
  s => ['I', 'We'].includes(s) ? "shan't" : "won't",
  s => ['I', 'We'].includes(s) ? 'Shall' : 'Will',
  s => ['I', 'We'].includes(s) ? "Shan't" : "Won't",
  'pp', 'have' // Shall I have played?
)];

const day27: SubConfig[] = [
  simpleConfig('SHOULD HAVE', () => 'should', () => "shouldn't", () => 'Should', () => "Shouldn't", 'pp', 'have'),
  simpleConfig('MUST HAVE', () => 'must', () => "mustn't", () => 'Must', () => "Mustn't", 'pp', 'have')
];

const day28: SubConfig[] = [
  simpleConfig('MAY HAVE', () => 'may', () => 'may not', () => 'May', () => 'May not', 'pp', 'have'),
  simpleConfig('MIGHT HAVE', () => 'might', () => 'might not', () => 'Might', () => 'Might not', 'pp', 'have')
];

const day29: SubConfig[] = [
  simpleConfig('WOULD HAVE', () => 'would', () => "wouldn't", () => 'Would', () => "Wouldn't", 'pp', 'have'),
  simpleConfig('COULD HAVE', () => 'could', () => "couldn't", () => 'Could', () => "Couldn't", 'pp', 'have')
];

const day30: SubConfig[] = [simpleConfig('HAVE BEEN / HAS BEEN (Perfect Continuous)',
  s => ['He', 'She', 'It'].includes(s) ? 'has' : 'have',
  s => ['He', 'She', 'It'].includes(s) ? "hasn't" : "haven't",
  s => ['He', 'She', 'It'].includes(s) ? 'Has' : 'Have',
  s => ['He', 'She', 'It'].includes(s) ? "Hasn't" : "Haven't",
  'ing', 'been' // Has he been playing?
)];

const day31: SubConfig[] = [simpleConfig('HAD BEEN',
  () => 'had', () => "hadn't", () => 'Had', () => "Hadn't", 'ing', 'been'
)];

const day32: SubConfig[] = [simpleConfig('SHALL HAVE BEEN / WILL HAVE BEEN',
  s => ['I', 'We'].includes(s) ? 'shall' : 'will',
  s => ['I', 'We'].includes(s) ? "shan't" : "won't",
  s => ['I', 'We'].includes(s) ? 'Shall' : 'Will',
  s => ['I', 'We'].includes(s) ? "Shan't" : "Won't",
  'ing', 'have been'
)];

const day33: SubConfig[] = [
  simpleConfig('SHOULD HAVE BEEN', () => 'should', () => "shouldn't", () => 'Should', () => "Shouldn't", 'ing', 'have been'),
  simpleConfig('MUST HAVE BEEN', () => 'must', () => "mustn't", () => 'Must', () => "Mustn't", 'ing', 'have been')
];

const day34: SubConfig[] = [
  simpleConfig('MAY HAVE BEEN', () => 'may', () => 'may not', () => 'May', () => 'May not', 'ing', 'have been'),
  simpleConfig('MIGHT HAVE BEEN', () => 'might', () => 'might not', () => 'Might', () => 'Might not', 'ing', 'have been')
];

const day35: SubConfig[] = [
  simpleConfig('WOULD HAVE BEEN', () => 'would', () => "wouldn't", () => 'Would', () => "Wouldn't", 'ing', 'have been'),
  simpleConfig('COULD HAVE BEEN', () => 'could', () => "couldn't", () => 'Could', () => "Couldn't", 'ing', 'have been')
];

export const dayConfigs: Record<string, SubConfig[]> = {
  day1: day01, day2: day02, day3: day03, day4: day04, day5: day05, day6: day06,
  day8: day08, day9: day09, day10: day10, day11: day11,
  day12: day12, day13: day13, day14: day14, day15: day15, day16: day16, day17: day17, day18: day18, day19: day19,
  day20: day20, day21: day21, day22: day22, day23: day23, day24: day24, day25: day25, day26: day26, day27: day27,
  day28: day28, day29: day29, day30: day30, day31: day31, day32: day32, day33: day33, day34: day34, day35: day35
};
