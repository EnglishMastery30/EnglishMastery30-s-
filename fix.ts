import * as fs from 'fs';

let content = fs.readFileSync('src/data/practiceSentences.ts', 'utf8');

// We will parse the current file, which has the format:
// 🔸 Subject: I
// 🔹 RANDOM VERB SPOKEN ENGLISH SENTENCES
// I eat rice.
// ...
// It saves time.
// ...

function fixData(text: string) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l);
  const data: any = {
    'I': { basic: [], random: [] },
    'We': { basic: [], random: [] },
    'You': { basic: [], random: [] },
    'They': { basic: [], random: [] },
    'He': { basic: [], random: [] },
    'She': { basic: [], random: [] },
    'It': { basic: [], random: [] }
  };
  
  let currentSubject: string | null = null;
  let currentSection = 'basic';
  
  for (const line of lines) {
    if (line.includes('BASIC AFFIRMATIVE')) {
      currentSection = 'basic';
    } else if (line.includes('RANDOM VERB')) {
      currentSection = 'random';
    } else if (line.startsWith('🔸')) {
      if (line === '🔸 Subject: I') currentSubject = 'I';
      else if (line === '🔸 Subject: We') currentSubject = 'We';
      else if (line === '🔸 Subject: You') currentSubject = 'You';
      else if (line === '🔸 Subject: They') currentSubject = 'They';
      else if (line === '🔸 Subject: He') currentSubject = 'He';
      else if (line === '🔸 Subject: She') currentSubject = 'She';
      else if (line === '🔸 Subject: It') currentSubject = 'It';
    } else if (currentSubject) {
      if (line !== 'export const presentTenseDayOne = `' && line !== 'export const pastTenseDayTwo = `' && line !== 'export const futureTenseDayThree = `' && line !== '`;' && line !== '`') {
        
        // Fix the 'It' sentences that got mixed into 'I'
        if (currentSubject === 'I' && line.startsWith('It ')) {
          data['It'][currentSection].push(line);
        } else if (currentSubject === 'I' && line.startsWith('Does it ')) {
          data['It'][currentSection].push(line);
        } else if (currentSubject === 'I' && line.startsWith('Doesn’t it ')) {
          data['It'][currentSection].push(line);
        } else if (currentSubject === 'I' && line.includes(' does it ')) {
          data['It'][currentSection].push(line);
        } else {
          data[currentSubject][currentSection].push(line);
        }
      }
    }
  }
  return data;
}

const match1 = content.match(/export const presentTenseDayOne = `([\s\S]*?)`;/);
const match2 = content.match(/export const pastTenseDayTwo = `([\s\S]*?)`;/);
const match3 = content.match(/export const futureTenseDayThree = `([\s\S]*?)`;/);

function formatDay(data: any) {
  let result = '';
  const subjects = ['I', 'We', 'You', 'They', 'He', 'She', 'It'];
  for (const sub of subjects) {
    result += `🔸 Subject: ${sub}\n`;
    if (data[sub].basic.length > 0) {
      result += `🔹 BASIC AFFIRMATIVE / NEGATIVE / QUESTIONS\n`;
      result += data[sub].basic.join('\n') + '\n';
    }
    if (data[sub].random.length > 0) {
      result += `🔹 RANDOM VERB SPOKEN ENGLISH SENTENCES\n`;
      result += data[sub].random.join('\n') + '\n';
    }
    result += '\n';
  }
  return result.trim();
}

const day1Data = fixData(match1![1]);
const day2Data = fixData(match2![1]);
const day3Data = fixData(match3![1]);

// Let's also generate Day 4: Continuous Tense
const day4Data: any = {
  'I': { basic: [], random: [] },
  'We': { basic: [], random: [] },
  'You': { basic: [], random: [] },
  'They': { basic: [], random: [] },
  'He': { basic: [], random: [] },
  'She': { basic: [], random: [] },
  'It': { basic: [], random: [] }
};

const continuousVerbs = ['working', 'playing', 'eating', 'running', 'sleeping'];
const subjectsMap: any = {
  'I': 'am',
  'We': 'are',
  'You': 'are',
  'They': 'are',
  'He': 'is',
  'She': 'is',
  'It': 'is'
};

for (const sub of Object.keys(subjectsMap)) {
  const aux = subjectsMap[sub];
  const auxNot = aux === 'am' ? 'am not' : (aux === 'are' ? 'aren’t' : 'isn’t');
  
  day4Data[sub].basic.push(`${sub} ${aux} working.`);
  day4Data[sub].basic.push(`${sub} ${aux === 'am' ? 'am not' : aux + ' not'} working.`);
  day4Data[sub].basic.push(`${aux.charAt(0).toUpperCase() + aux.slice(1)} ${sub.toLowerCase()} working?`);
  if (aux !== 'am') {
    day4Data[sub].basic.push(`${auxNot.charAt(0).toUpperCase() + auxNot.slice(1)} ${sub.toLowerCase()} working?`);
  }
  
  day4Data[sub].random.push(`${sub} ${aux} playing games.`);
  day4Data[sub].random.push(`${sub} ${aux} eating food.`);
  day4Data[sub].random.push(`${sub} ${aux} running fast.`);
}

const newContent = `export const presentTenseDayOne = \`
${formatDay(day1Data)}
\`;

export const pastTenseDayTwo = \`
${formatDay(day2Data)}
\`;

export const futureTenseDayThree = \`
${formatDay(day3Data)}
\`;

export const continuousTenseDayFour = \`
${formatDay(day4Data)}
\`;
`;

fs.writeFileSync('src/data/practiceSentences.ts', newContent);
console.log("Fixed and added Day 4 successfully");
