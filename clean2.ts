import fs from 'fs';

const content = fs.readFileSync('src/data/practiceSentences.ts', 'utf-8');
const cleaned = content.replace(/ \(1 – 1000\)/g, '');
fs.writeFileSync('src/data/practiceSentences.ts', cleaned);
