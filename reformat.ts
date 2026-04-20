import * as fs from 'fs';

let content = fs.readFileSync('src/data/practiceSentences.ts', 'utf8');

function parseData(text: string) {
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
    } else if (line.startsWith('🔸') || line.startsWith('🔹')) {
      if (line.includes('Subject: We')) currentSubject = 'We';
      else if (line.includes('Subject: You')) currentSubject = 'You';
      else if (line.includes('Subject: They')) currentSubject = 'They';
      else if (line.includes('Subject: He')) currentSubject = 'He';
      else if (line.includes('Subject: She')) currentSubject = 'She';
      else if (line.includes('Subject: It')) currentSubject = 'It';
      else if (line.includes('Subject: I') || line.includes('🔸 I ')) currentSubject = 'I';
      
      if (line.startsWith('🔹 Subject:')) {
        currentSection = 'random';
      }
    } else if (currentSubject) {
      if (line !== 'export const presentTenseDayOne = `' && line !== 'export const pastTenseDayTwo = `' && line !== 'export const futureTenseDayThree = `' && line !== '`;' && line !== '`') {
        data[currentSubject][currentSection].push(line);
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

const day1Data = parseData(match1![1]);
const day2Data = parseData(match2![1]);
const day3Data = parseData(match3![1]);

const newContent = `export const presentTenseDayOne = \`
${formatDay(day1Data)}
\`;

export const pastTenseDayTwo = \`
${formatDay(day2Data)}
\`;

export const futureTenseDayThree = \`
${formatDay(day3Data)}
\`;
`;

fs.writeFileSync('src/data/practiceSentences.ts', newContent);
console.log("Reformatted successfully");
