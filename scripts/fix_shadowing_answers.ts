
import fs from 'fs';

const filePath = 'src/data/shadowingData.ts';
let content = fs.readFileSync(filePath, 'utf8');

const targetAnswer = '"answer": "I will follow up with the design team by tomorrow."';
const replacements = [
  '"answer": "I will definitely look into that and get back to you."',
  '"answer": "That sounds like a great plan, let\'s proceed."',
  '"answer": "I’ll make sure to update everyone on the progress."',
  '"answer": "That’s a very helpful perspective, thank you."',
  '"answer": "I agree, we should prioritize this task today."',
  '"answer": "Let’s schedule a brief follow-up meeting for next week."',
  '"answer": "I will share the details with the rest of the group."',
  '"answer": "Thanks for bringing that up, it’s an important point."'
];

let index = 0;
while (content.includes(targetAnswer)) {
  content = content.replace(targetAnswer, replacements[index % replacements.length]);
  index++;
}

fs.writeFileSync(filePath, content);
console.log(`Updated ${index} instances of repetitive answers.`);
