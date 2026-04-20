const fs = require('fs');

function ucFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const subjects = ['I', 'We', 'You', 'They', 'He', 'She', 'It'];

const verbs = [
   { base: 'eat', ing: 'eating', v3: 'eaten', obj: 'rice' },
   { base: 'play', ing: 'playing', v3: 'played', obj: 'soccer' },
   { base: 'watch', ing: 'watching', v3: 'watched', obj: 'movies' },
   { base: 'write', ing: 'writing', v3: 'written', obj: 'letters' }
];

function getNeg(aux) {
    if (aux.toLowerCase() === 'am') return 'am not';
    if (aux.toLowerCase() === 'will') return 'won\'t';
    if (aux.toLowerCase() === 'shall') return 'shan\'t';
    if (aux.toLowerCase() === 'can') return 'can\'t';
    if (aux.toLowerCase() === 'could') return 'couldn\'t';
    if (aux.toLowerCase() === 'must') return 'mustn\'t';
    if (aux.toLowerCase() === 'might') return 'might not';
    if (aux.toLowerCase() === 'may') return 'may not';
    if (aux.toLowerCase() === 'ought') return 'oughtn\'t'; // ought not to
    if (aux.toLowerCase() === 'ought to') return 'ought not to'; 
    if (aux.endsWith('s')) return aux.replace('s', 'sn\'t'); // is -> isn't, has -> hasn't
    if (aux === 'are') return 'aren\'t';
    if (aux === 'were') return 'weren\'t';
    if (aux === 'should') return 'shouldn\'t';
    if (aux === 'would') return 'wouldn\'t';
    if (aux === 'have') return 'haven\'t';
    if (aux === 'had') return 'hadn\'t';
    if (aux === 'do') return 'don\'t';
    if (aux === 'does') return 'doesn\'t';
    if (aux === 'did') return 'didn\'t';
    return aux + ' not';
}

const daysConfig = [
  { dayId: 4, name: 'day04AmIsAre', contentSplit: [ { type: 'aux', verbForm: 'ing', mapping: { 'I': 'am', 'We': 'are', 'You': 'are', 'They': 'are', 'He': 'is', 'She': 'is', 'It': 'is' } } ] },
  { dayId: 5, name: 'day05WasWere', contentSplit: [ { type: 'aux', verbForm: 'ing', mapping: { 'I': 'was', 'We': 'were', 'You': 'were', 'They': 'were', 'He': 'was', 'She': 'was', 'It': 'was' } } ] },
  { dayId: 6, name: 'day06ShallWillBe', contentSplit: [ { type: 'aux_multi', verbForm: 'ing', mapping: { 'I': ['shall', 'be'], 'We': ['shall', 'be'], 'You': ['will', 'be'], 'They': ['will', 'be'], 'He': ['will', 'be'], 'She': ['will', 'be'], 'It': ['will', 'be'] } } ] },
  { dayId: 8, name: 'day08CanCould', contentSplit: [ { type: 'aux', verbForm: 'base', mapping: { default: 'can' } }, { type: 'aux', verbForm: 'base', mapping: { default: 'could' } } ] },
  { dayId: 9, name: 'day09MayMight', contentSplit: [ { type: 'aux', verbForm: 'base', mapping: { default: 'may' } }, { type: 'aux', verbForm: 'base', mapping: { default: 'might' } } ] },
  { dayId: 10, name: 'day10ShouldMust', contentSplit: [ { type: 'aux', verbForm: 'base', mapping: { default: 'should' } }, { type: 'aux', verbForm: 'base', mapping: { default: 'must' } } ] },
  { dayId: 11, name: 'day11Would', contentSplit: [ { type: 'aux', verbForm: 'base', mapping: { default: 'would' } } ] },
  { dayId: 12, name: 'day12HaveTo', contentSplit: [ { type: 'do_does', verbForm: 'base', mainVerbBase: 'have to', mapping: { 'I': 'have to', 'We': 'have to', 'You': 'have to', 'They': 'have to', 'He': 'has to', 'She': 'has to', 'It': 'has to'} } ] },
  { dayId: 13, name: 'day13NeedTo', contentSplit: [ { type: 'do_does', verbForm: 'base', mainVerbBase: 'need to', mapping: { 'I': 'need to', 'We': 'need to', 'You': 'need to', 'They': 'need to', 'He': 'needs to', 'She': 'needs to', 'It': 'needs to'} } ] },
  { dayId: 14, name: 'day14WantTo', contentSplit: [ { type: 'do_does', verbForm: 'base', mainVerbBase: 'want to', mapping: { 'I': 'want to', 'We': 'want to', 'You': 'want to', 'They': 'want to', 'He': 'wants to', 'She': 'wants to', 'It': 'wants to'} } ] },
  { dayId: 15, name: 'day15DareTo', contentSplit: [ { type: 'do_does', verbForm: 'base', mainVerbBase: 'dare to', mapping: { 'I': 'dare to', 'We': 'dare to', 'You': 'dare to', 'They': 'dare to', 'He': 'dares to', 'She': 'dares to', 'It': 'dares to'} } ] },
  { dayId: 16, name: 'day16WishTo', contentSplit: [ { type: 'do_does', verbForm: 'base', mainVerbBase: 'wish to', mapping: { 'I': 'wish to', 'We': 'wish to', 'You': 'wish to', 'They': 'wish to', 'He': 'wishes to', 'She': 'wishes to', 'It': 'wishes to'} } ] },
  { dayId: 17, name: 'day17WouldLikeTo', contentSplit: [ { type: 'aux_multi', verbForm: 'base', mapping: { default: ['would', 'like to'] } } ] },
  { dayId: 18, name: 'day18OughtTo', contentSplit: [ { type: 'aux_multi', verbForm: 'base', mapping: { default: ['ought', 'to'] } } ] },
  { dayId: 19, name: 'day19GoingTo', contentSplit: [ { type: 'aux_multi', verbForm: 'base', mapping: { 'I': ['am', 'going to'], 'We': ['are', 'going to'], 'You': ['are', 'going to'], 'They': ['are', 'going to'], 'He': ['is', 'going to'], 'She': ['is', 'going to'], 'It': ['is', 'going to'] } } ] },
  { dayId: 20, name: 'day20AbleTo', contentSplit: [ { type: 'aux_multi', verbForm: 'base', mapping: { 'I': ['am', 'able to'], 'We': ['are', 'able to'], 'You': ['are', 'able to'], 'They': ['are', 'able to'], 'He': ['is', 'able to'], 'She': ['is', 'able to'], 'It': ['is', 'able to'] } } ] },
  { dayId: 21, name: 'day21HadTo', contentSplit: [ { type: 'did', verbForm: 'base', mainVerbBase: 'have to', mapping: { default: 'had to' } } ] },
  { dayId: 22, name: 'day22WillingTo', contentSplit: [ { type: 'aux_multi', verbForm: 'base', mapping: { 'I': ['am', 'willing to'], 'We': ['are', 'willing to'], 'You': ['are', 'willing to'], 'They': ['are', 'willing to'], 'He': ['is', 'willing to'], 'She': ['is', 'willing to'], 'It': ['is', 'willing to'] } } ] },
  { dayId: 23, name: 'day23UsedTo', contentSplit: [ { type: 'did', verbForm: 'base', mainVerbBase: 'use to', mapping: { default: 'used to' } } ] },
  { dayId: 24, name: 'day24HaveHas', contentSplit: [ { type: 'aux', verbForm: 'v3', mapping: { 'I': 'have', 'We': 'have', 'You': 'have', 'They': 'have', 'He': 'has', 'She': 'has', 'It': 'has' } } ] },
  { dayId: 25, name: 'day25Had', contentSplit: [ { type: 'aux', verbForm: 'v3', mapping: { default: 'had' } } ] },
  { dayId: 26, name: 'day26ShallWillHave', contentSplit: [ { type: 'aux_multi', verbForm: 'v3', mapping: { 'I': ['shall', 'have'], 'We': ['shall', 'have'], 'You': ['will', 'have'], 'They': ['will', 'have'], 'He': ['will', 'have'], 'She': ['will', 'have'], 'It': ['will', 'have'] } } ] },
  { dayId: 27, name: 'day27ShouldMustHave', contentSplit: [ { type: 'aux_multi', verbForm: 'v3', mapping: { default: ['should', 'have'] } }, { type: 'aux_multi', verbForm: 'v3', mapping: { default: ['must', 'have'] } } ] },
  { dayId: 28, name: 'day28MayMightHave', contentSplit: [ { type: 'aux_multi', verbForm: 'v3', mapping: { default: ['may', 'have'] } }, { type: 'aux_multi', verbForm: 'v3', mapping: { default: ['might', 'have'] } } ] },
  { dayId: 29, name: 'day29WouldCouldHave', contentSplit: [ { type: 'aux_multi', verbForm: 'v3', mapping: { default: ['would', 'have'] } }, { type: 'aux_multi', verbForm: 'v3', mapping: { default: ['could', 'have'] } } ] },
  { dayId: 30, name: 'day30HaveHasBeen', contentSplit: [ { type: 'aux_multi', verbForm: 'ing', mapping: { 'I': ['have', 'been'], 'We': ['have', 'been'], 'You': ['have', 'been'], 'They': ['have', 'been'], 'He': ['has', 'been'], 'She': ['has', 'been'], 'It': ['has', 'been'] } } ] },
  { dayId: 31, name: 'day31HadBeen', contentSplit: [ { type: 'aux_multi', verbForm: 'ing', mapping: { default: ['had', 'been'] } } ] },
  { dayId: 32, name: 'day32ShallWillHaveBeen', contentSplit: [ { type: 'aux_multi', verbForm: 'ing', mapping: { 'I': ['shall', 'have been'], 'We': ['shall', 'have been'], 'You': ['will', 'have been'], 'They': ['will', 'have been'], 'He': ['will', 'have been'], 'She': ['will', 'have been'], 'It': ['will', 'have been'] } } ] },
  { dayId: 33, name: 'day33ShouldMustHaveBeen', contentSplit: [ { type: 'aux_multi', verbForm: 'ing', mapping: { default: ['should', 'have been'] } }, { type: 'aux_multi', verbForm: 'ing', mapping: { default: ['must', 'have been'] } } ] },
  { dayId: 34, name: 'day34MayMightHaveBeen', contentSplit: [ { type: 'aux_multi', verbForm: 'ing', mapping: { default: ['may', 'have been'] } }, { type: 'aux_multi', verbForm: 'ing', mapping: { default: ['might', 'have been'] } } ] },
  { dayId: 35, name: 'day35WouldCouldHaveBeen', contentSplit: [ { type: 'aux_multi', verbForm: 'ing', mapping: { default: ['would', 'have been'] } }, { type: 'aux_multi', verbForm: 'ing', mapping: { default: ['could', 'have been'] } } ] },
];

function processSplit(subject, split, verb) {
   let mapping = split.mapping;
   let auxPhrase = mapping.default || mapping[subject];
   
   let aux1 = '';
   let auxRest = '';
   let mainVerbText = verb[split.verbForm];

   if (split.type === 'aux') {
      aux1 = auxPhrase;
   } else if (split.type === 'aux_multi') {
      aux1 = auxPhrase[0];
      auxRest = auxPhrase[1] + ' ';
   } else if (split.type === 'do_does') {
      aux1 = (subject === 'He' || subject === 'She' || subject === 'It') ? 'does' : 'do';
      auxRest = split.mainVerbBase + ' '; 
      let affAux = auxPhrase; 
      
      let aff = `${subject} ${affAux} ${mainVerbText} ${verb.obj}.`;
      let neg = `${subject} ${getNeg(aux1)} ${auxRest}${mainVerbText} ${verb.obj}.`;
      let q = `${ucFirst(aux1)} ${subject} ${auxRest}${mainVerbText} ${verb.obj}?`;
      let nq = `${ucFirst(getNeg(aux1))} ${subject} ${auxRest}${mainVerbText} ${verb.obj}?`;
      let wh = `What ${aux1} ${subject} ${auxRest}${mainVerbText}?`;
      
      return [aff, neg, q, nq, wh, `Why ${aux1} ${subject} ${auxRest}${mainVerbText} ${verb.obj}?`, `Where ${aux1} ${subject} ${auxRest}${mainVerbText} ${verb.obj}?`, `When ${aux1} ${subject} ${auxRest}${mainVerbText} ${verb.obj}?`, `How ${aux1} ${subject} ${auxRest}${mainVerbText} ${verb.obj}?`];
   } else if (split.type === 'did') {
      aux1 = 'did';
      auxRest = split.mainVerbBase + ' '; 
      let affAux = auxPhrase; 
      
      let aff = `${subject} ${affAux} ${mainVerbText} ${verb.obj}.`;
      let neg = `${subject} ${getNeg(aux1)} ${auxRest}${mainVerbText} ${verb.obj}.`;
      let q = `${ucFirst(aux1)} ${subject} ${auxRest}${mainVerbText} ${verb.obj}?`;
      let nq = `${ucFirst(getNeg(aux1))} ${subject} ${auxRest}${mainVerbText} ${verb.obj}?`;
      let wh = `What ${aux1} ${subject} ${auxRest}${mainVerbText}?`;
      return [aff, neg, q, nq, wh, `Why ${aux1} ${subject} ${auxRest}${mainVerbText} ${verb.obj}?`, `Where ${aux1} ${subject} ${auxRest}${mainVerbText} ${verb.obj}?`, `When ${aux1} ${subject} ${auxRest}${mainVerbText} ${verb.obj}?`, `How ${aux1} ${subject} ${auxRest}${mainVerbText} ${verb.obj}?`];
   }
   
   let negAux = getNeg(aux1);
   if (aux1 === 'am') negAux = 'am not';
   
   let affAuxStr = auxPhrase;
   if (Array.isArray(auxPhrase)) affAuxStr = auxPhrase.join(' ');
   
   let aff = `${subject} ${affAuxStr} ${mainVerbText} ${verb.obj}.`;
   let neg = `${subject} ${negAux} ${auxRest}${mainVerbText} ${verb.obj}.`;
   
   let qAuxStr = ucFirst(aux1);
   let q = `${qAuxStr} ${subject} ${auxRest}${mainVerbText} ${verb.obj}?`;
   
   let nq = `${ucFirst(negAux)} ${subject} ${auxRest}${mainVerbText} ${verb.obj}?`;
   if (aux1 === 'am') {
       nq = `Am I not ${auxRest}${mainVerbText} ${verb.obj}?`;
   } else if (aux1 === 'may') {
       nq = `May ${subject} not ${auxRest}${mainVerbText} ${verb.obj}?`;
   } else if (aux1 === 'might') {
       nq = `Might ${subject} not ${auxRest}${mainVerbText} ${verb.obj}?`;
   }
   
   let whAuxStr = aux1;
   let wh = `What ${whAuxStr} ${subject} ${auxRest}${mainVerbText}?`;
   
   return [
     aff, neg, q, nq, wh,
     `Why ${whAuxStr} ${subject} ${auxRest}${mainVerbText} ${verb.obj}?`,
     `Where ${whAuxStr} ${subject} ${auxRest}${mainVerbText} ${verb.obj}?`,
     `When ${whAuxStr} ${subject} ${auxRest}${mainVerbText} ${verb.obj}?`,
     `How ${whAuxStr} ${subject} ${auxRest}${mainVerbText} ${verb.obj}?`
   ];
}

let code = '';

for (const day of daysConfig) {
  let dayContent = '\\n';
  
  for (const subject of subjects) {
     dayContent += "🔸 Subject: " + subject + "\\n";
     dayContent += "🔹 RANDOM VERB SPOKEN ENGLISH SENTENCES\\n";
     
     for (const verb of verbs) {
         for (const split of day.contentSplit) {
             const sentences = processSplit(subject, split, verb);
             for (const s of sentences) {
                dayContent += s + '\\n';
             }
         }
     }
  }
  
  code += "export const " + day.name + " = `" + dayContent + "`;\\n\\n";
}

fs.writeFileSync('src/data/generatedSentences.ts', code);
console.log('Successfully generated src/data/generatedSentences.ts');
