const fs = require('fs');

const data = [
  { 
    word: 'What', 
    pairs: [
      ['What is your name?', 'My name is Alex.'],
      ['What are you doing?', 'I am reading a book.'],
      ['What do you want for dinner?', 'I want pizza.'],
      ['What time is it?', 'It is three o\'clock.'],
      ['What is your favorite color?', 'My favorite color is blue.'],
      ['What did you buy at the store?', 'I bought some milk and eggs.'],
      ['What are you looking for?', 'I am looking for my glasses.'],
      ['What happens if it rains?', 'We will stay indoors.'],
      ['What kind of music do you like?', 'I like pop and jazz.'],
      ['What is the capital of France?', 'The capital of France is Paris.']
    ]
  },
  {
    word: 'Why',
    pairs: [
      ['Why are you late?', 'I missed the bus.'],
      ['Why is he crying?', 'Because he lost his toy.'],
      ['Why did you choose this book?', 'Because it looked interesting.'],
      ['Why are they laughing?', 'Someone told a funny joke.'],
      ['Why do we need to sleep?', 'To rest our bodies and minds.'],
      ['Why did you quit your job?', 'I wanted to go back to school.'],
      ['Why is the sky blue?', 'Because of how sunlight scatters.'],
      ['Why did she leave early?', 'She had a doctor\'s appointment.'],
      ['Why are you so tired?', 'I did not sleep well last night.'],
      ['Why did they cancel the meeting?', 'Because the manager was sick.']
    ]
  },
  {
    word: 'Where',
    pairs: [
      ['Where do you live?', 'I live in New York.'],
      ['Where are my keys?', 'They are on the kitchen table.'],
      ['Where did she go?', 'She went to the supermarket.'],
      ['Where is the nearest hospital?', 'It is two blocks away.'],
      ['Where can I find a taxi?', 'There is a taxi stand outside.'],
      ['Where were you born?', 'I was born in London.'],
      ['Where did you park the car?', 'I parked it in the basement.'],
      ['Where are we going for vacation?', 'We are going to Hawaii.'],
      ['Where did you buy those shoes?', 'I bought them online.'],
      ['Where is the bathroom?', 'It is down the hall to the left.']
    ]
  },
  {
    word: 'When',
    pairs: [
      ['When is your birthday?', 'My birthday is in August.'],
      ['When will the train arrive?', 'It will arrive in ten minutes.'],
      ['When did they leave?', 'They left an hour ago.'],
      ['When does the movie start?', 'It starts at eight PM.'],
      ['When will you visit us?', 'We will visit you next week.'],
      ['When do you wake up?', 'I usually wake up at 7 AM.'],
      ['When are you going to finish this?', 'I will finish it tomorrow.'],
      ['When did you start learning English?', 'I started three years ago.'],
      ['When is the best time to call you?', 'You can call me in the evening.'],
      ['When will the package be delivered?', 'It should arrive by Friday.']
    ]
  },
  {
    word: 'Which',
    pairs: [
      ['Which one is yours?', 'The blue one is mine.'],
      ['Which way should we go?', 'We should go to the left.'],
      ['Which dress do you prefer?', 'I prefer the red dress.'],
      ['Which car is faster?', 'The sports car is much faster.'],
      ['Which book did you read?', 'I read the mystery novel.'],
      ['Which flavor of ice cream do you want?', 'I want chocolate.'],
      ['Which team won the championship?', 'The home team won.'],
      ['Which language are you learning?', 'I am learning Spanish.'],
      ['Which movie should we watch?', 'Let\'s watch the new action movie.'],
      ['Which bus goes to the city center?', 'Number 42 goes there.']
    ]
  },
  {
    word: 'Whose',
    pairs: [
      ['Whose shoes are these?', 'They are my brother\'s shoes.'],
      ['Whose idea was this?', 'It was Sarah\'s idea.'],
      ['Whose phone is ringing?', 'I think it is your phone.'],
      ['Whose turn is it?', 'It is my turn to play.'],
      ['Whose dog is that?', 'That is our neighbor\'s dog.'],
      ['Whose jacket are you wearing?', 'I borrowed my friend\'s jacket.'],
      ['Whose house are we visiting?', 'We are visiting my grandparents.'],
      ['Whose car is blocking the driveway?', 'It belongs to the mailman.'],
      ['Whose bag was left on the chair?', 'It might be Jane\'s bag.'],
      ['Whose mistake was it?', 'We both made a mistake.']
    ]
  },
  {
    word: 'Whom',
    pairs: [
      ['With whom are you going?', 'I am going with my sister.'],
      ['To whom did you send the letter?', 'I sent it to the manager.'],
      ['Whom should I contact?', 'You should contact the receptionist.'],
      ['For whom is this gift?', 'It is for my mother.'],
      ['Whom did they elect?', 'They elected the new chairman.'],
      ['About whom are they talking?', 'They are talking about the new teacher.'],
      ['Whom did she invite to the party?', 'She invited all her colleagues.'],
      ['From whom did you hear the news?', 'I heard it from a friend.'],
      ['Whom are you waiting for?', 'I am waiting for my client.'],
      ['Against whom are we playing today?', 'We are playing against the rival team.']
    ]
  },
  {
    word: 'How',
    pairs: [
      ['How are you feeling?', 'I am feeling much better now.'],
      ['How do you cook this?', 'You bake it for thirty minutes.'],
      ['How much does this cost?', 'It costs twenty dollars.'],
      ['How did you fix it?', 'I replaced the broken part.'],
      ['How far is the beach?', 'It is about five miles away.'],
      ['How do I get to the train station?', 'Walk straight and turn right.'],
      ['How was your trip?', 'It was amazing and relaxing.'],
      ['How many apples do we need?', 'We need at least six.'],
      ['How often do you exercise?', 'I exercise three times a week.'],
      ['How old is your sister?', 'She is twenty-five years old.']
    ]
  },
  {
    word: 'Who',
    pairs: [
      ['Who is knocking at the door?', 'It is the delivery person.'],
      ['Who won the game?', 'Our team won the game.'],
      ['Who can answer this question?', 'I can answer it.'],
      ['Who told you that?', 'My friend told me the news.'],
      ['Who is your best friend?', 'My best friend is Emily.'],
      ['Who is coming to dinner tonight?', 'Just our close family.'],
      ['Who baked this delicious cake?', 'My grandmother baked it.'],
      ['Who broke the window?', 'The kids broke it while playing.'],
      ['Who is the author of this book?', 'It was written by Mark Twain.'],
      ['Who wants to go first?', 'I will go first!']
    ]
  }
];

let output = 'export const whQuestionsDayFour = `\n';

for (const group of data) {
  output += '🔸 Subject: ' + group.word + '\n🔹 QUESTIONS AND ANSWERS\n';
  for (const pair of group.pairs) {
    output += 'Q: ' + pair[0] + '\nA: ' + pair[1] + '\n';
  }
  output += '\n';
}

output += '`;\n';

let content = fs.readFileSync('src/data/practiceSentences.ts', 'utf8');

const marker = 'export const whoWhoseWhomDayFour';
const idx = content.indexOf(marker);

if (idx !== -1) {
  content = content.substring(0, idx);
}

content += '\n' + output;

fs.writeFileSync('src/data/practiceSentences.ts', content);
