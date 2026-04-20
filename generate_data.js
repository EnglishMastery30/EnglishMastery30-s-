const pastTenseData = [
  { sub: 'I', verbs: [
    ['built a house', 'build a house', 'What did I build?'],
    ['wrote a letter', 'write a letter', 'What did I write?'],
    ['forgot my keys', 'forget my keys', 'Why did I forget my keys?'],
    ['understood the problem', 'understand the problem', 'How did I understand the problem?'],
    ['bought a car', 'buy a car', 'When did I buy a car?']
  ]},
  { sub: 'We', verbs: [
    ['drove to the city', 'drive to the city', 'Where did we drive?'],
    ['found the solution', 'find the solution', 'How did we find the solution?'],
    ['won the match', 'win the match', 'When did we win the match?'],
    ['saw the movie', 'see the movie', 'Where did we see the movie?'],
    ['ate lunch', 'eat lunch', 'When did we eat lunch?']
  ]},
  { sub: 'You', verbs: [
    ['sent the email', 'send the email', 'Why did you send the email?'],
    ['paid the bill', 'pay the bill', 'How did you pay the bill?'],
    ['caught the train', 'catch the train', 'When did you catch the train?'],
    ['lost your wallet', 'lose your wallet', 'Where did you lose your wallet?'],
    ['met your friend', 'meet your friend', 'Where did you meet your friend?']
  ]},
  { sub: 'They', verbs: [
    ['sold their house', 'sell their house', 'Why did they sell their house?'],
    ['left early', 'leave early', 'Why did they leave early?'],
    ['brought snacks', 'bring snacks', 'What did they bring?'],
    ['kept the secret', 'keep the secret', 'Why did they keep the secret?'],
    ['heard the news', 'hear the news', 'Where did they hear the news?']
  ]},
  { sub: 'He', verbs: [
    ['cut the paper', 'cut the paper', 'How did he cut the paper?'],
    ['told a story', 'tell a story', 'What did he tell?'],
    ['flew to Paris', 'fly to Paris', 'When did he fly to Paris?'],
    ['gave a gift', 'give a gift', 'Why did he give a gift?'],
    ['ran a marathon', 'run a marathon', 'Where did he run a marathon?']
  ]},
  { sub: 'She', verbs: [
    ['taught English', 'teach English', 'Where did she teach English?'],
    ['sang a song', 'sing a song', 'What did she sing?'],
    ['drew a picture', 'draw a picture', 'What did she draw?'],
    ['read a book', 'read a book', 'Which book did she read?'],
    ['wore a dress', 'wear a dress', 'When did she wear a dress?']
  ]},
  { sub: 'It', verbs: [
    ['cost a lot', 'cost a lot', 'Why did it cost a lot?'],
    ['grew fast', 'grow fast', 'How did it grow fast?'],
    ['blew away', 'blow away', 'Where did it blow away?'],
    ['rang loudly', 'ring loudly', 'Why did it ring loudly?'],
    ['broke down', 'break down', 'Why did it break down?']
  ]}
];

const futureTenseData = [
  { sub: 'I', verbs: [
    ['learn Spanish', 'What will I learn?'],
    ['start a business', 'When will I start a business?'],
    ['travel to Japan', 'Where will I travel?'],
    ['finish the project', 'How will I finish the project?'],
    ['cook dinner', 'What will I cook?']
  ]},
  { sub: 'We', verbs: [
    ['celebrate the victory', 'How will we celebrate?'],
    ['attend the meeting', 'Where will we attend the meeting?'],
    ['upload the video', 'When will we upload the video?'],
    ['launch the product', 'When will we launch the product?'],
    ['plant trees', 'Where will we plant trees?']
  ]},
  { sub: 'You', verbs: [
    ['pass the exam', 'How will you pass the exam?'],
    ['receive an award', 'Why will you receive an award?'],
    ['try a new recipe', 'What will you try?'],
    ['paint the wall', 'When will you paint the wall?'],
    ['organize the event', 'How will you organize the event?']
  ]},
  { sub: 'They', verbs: [
    ['build a robot', 'How will they build a robot?'],
    ['discover a new species', 'Where will they discover a new species?'],
    ['perform on stage', 'When will they perform on stage?'],
    ['publish a book', 'Why will they publish a book?'],
    ['invest in stocks', 'How will they invest in stocks?']
  ]},
  { sub: 'He', verbs: [
    ['repair the car', 'How will he repair the car?'],
    ['edit the video', 'When will he edit the video?'],
    ['compose a song', 'Why will he compose a song?'],
    ['design a logo', 'How will he design a logo?'],
    ['lead the team', 'Where will he lead the team?']
  ]},
  { sub: 'She', verbs: [
    ['interview the candidate', 'When will she interview the candidate?'],
    ['present the report', 'How will she present the report?'],
    ['decorate the room', 'Why will she decorate the room?'],
    ['bake a cake', 'What will she bake?'],
    ['analyze the data', 'How will she analyze the data?']
  ]},
  { sub: 'It', verbs: [
    ['rain tomorrow', 'When will it rain?'],
    ['work perfectly', 'How will it work?'],
    ['melt soon', 'Why will it melt soon?'],
    ['sound great', 'Why will it sound great?'],
    ['dry quickly', 'How will it dry quickly?']
  ]}
];

let pastText = 'export const pastTenseDayTwo = `\\n';
pastTenseData.forEach(d => {
pastText += '🔸 Subject: ' + d.sub + '\\n🔹 RANDOM VERB SPOKEN ENGLISH SENTENCES\\n';
  d.verbs.forEach(v => {
    const s = d.sub.toLowerCase();
    const isI = s === 'i';
    let subStr = isI ? 'I' : s;
    let didSub = isI ? 'I' : s;
    pastText += d.sub + ' ' + v[0] + '.\\n';
    pastText += d.sub + ' did not ' + v[1] + '.\\n';
    pastText += 'Did ' + didSub + ' ' + v[1] + '?\\n';
    pastText += 'Didn’t ' + didSub + ' ' + v[1] + '?\\n';
    pastText += v[2] + '\\n';
  });
  pastText += '\\n';
});
pastText += '`;\\n';

let futureText = 'export const futureTenseDayThree = `\\n';
futureTenseData.forEach(d => {
futureText += '🔸 Subject: ' + d.sub + '\\n🔹 RANDOM VERB SPOKEN ENGLISH SENTENCES\\n';
  d.verbs.forEach(v => {
    const s = d.sub.toLowerCase();
    const isI = s === 'i';
    let subStr = isI ? 'I' : s;
    let willSub = isI ? 'I' : s;
    futureText += d.sub + ' will ' + v[0] + '.\\n';
    futureText += d.sub + ' will not ' + v[0] + '.\\n';
    futureText += 'Will ' + willSub + ' ' + v[0] + '?\\n';
    futureText += 'Won’t ' + willSub + ' ' + v[0] + '?\\n';
    futureText += v[1] + '\\n';
  });
  futureText += '\\n';
});
futureText += '`;\\n';

import * as fs from 'fs';
fs.writeFileSync('generated_data.txt', pastText + '\n' + futureText);
