const fs = require('fs');

const shallLines = `
🔸 Subject: I
🔹 RANDOM VERB SPOKEN ENGLISH SENTENCES (SHALL)
I shall return tomorrow.
I shall not return tomorrow.
Shall I return tomorrow?
Shan't I return tomorrow?
When shall I return?
I shall write the letter.
I shall not write the letter.
Shall I write the letter?
Shan't I write the letter?
What shall I write?
I shall assist you.
I shall not assist you.
Shall I assist you?
Shan't I assist you?
How shall I assist you?

🔸 Subject: We
🔹 RANDOM VERB SPOKEN ENGLISH SENTENCES (SHALL)
We shall overcome this.
We shall not overcome this.
Shall we overcome this?
Shan't we overcome this?
How shall we overcome this?
We shall leave early.
We shall not leave early.
Shall we leave early?
Shan't we leave early?
Why shall we leave early?
We shall wait for you.
We shall not wait for you.
Shall we wait for you?
Shan't we wait for you?
Where shall we wait?
`;

const path = './src/data/practiceSentences.ts';
let content = fs.readFileSync(path, 'utf8');

// Replace futureTenseDayThree content
// The replace regex will find the end of futureTenseDayThree and insert shallLines before it reaches ` ;
// Let's use simple string manipulation.
const parts = content.split('export const whQuestionsDayFour = `');
const futureTensePart = parts[0];
const whQuestionsPart = parts[1];

let newFutureTensePart = futureTensePart.replace(/`;\s*$/, '');
newFutureTensePart += '\n' + shallLines + '\n`;\n\n';

const newContent = newFutureTensePart + 'export const whQuestionsDayFour = `' + whQuestionsPart;

fs.writeFileSync(path, newContent, 'utf8');
