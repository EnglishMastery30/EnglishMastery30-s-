import fs from 'fs';

const content = fs.readFileSync('src/data/practiceSentences.ts', 'utf-8');
const cleaned = content.replace(/ \([0-9]+–[0-9]+\)/g, '');
fs.writeFileSync('src/data/practiceSentences.ts', cleaned);
