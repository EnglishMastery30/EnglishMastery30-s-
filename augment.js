const fs = require('fs');

const augmentData = {
  1: {
    vocabExamples: ["Let me introduce my friend to you.", "A warm greeting is important.", "It's a pleasure to meet you."],
    grammar: { natural: "Hi, I'm Sarah. It's nice to meet you.", unnatural: "Hello, my name is Sarah and I am happy.", note: "Using 'I\\'m [Name]' and 'It\\'s nice to meet you' sounds more conversational and relaxed than formal schoolbook phrases." },
    prompts: ["Introduce yourself to a new colleague.", "Greet your friend you haven't seen in a year.", "Roleplay meeting your neighbor for the first time."]
  },
  2: {
    vocabExamples: ["I have a busy schedule today.", "Cut the pie into a quarter.", "I will see you tomorrow."],
    grammar: { natural: "We meet at 3:15 PM.", unnatural: "We meet on 3:15 PM.", note: "Use 'at' for specific times, 'on' for days and dates, and 'in' for months or periods." },
    prompts: ["What time do you usually wake up and go to sleep?", "What is your phone number and birth date?", "Describe your schedule for tomorrow."]
  },
  3: {
    vocabExamples: ["My morning routine is very simple.", "I usually drink coffee with breakfast.", "Breakfast is the most important meal of the day."],
    grammar: { natural: "I usually wake up at 7.", unnatural: "I wake up usually at 7.", note: "Adverbs of frequency like 'usually' and 'always' should come before the main verb." },
    prompts: ["Describe your typical morning routine.", "What do you always do before going to bed?", "Tell me about a habit you are trying to build."]
  },
  4: {
    vocabExamples: ["I have one older sibling.", "Many relatives came to the wedding.", "She has a very outgoing personality."],
    grammar: { natural: "My brother is taller than me.", unnatural: "My brother is more tall than me.", note: "For short adjectives like 'tall', use the '-er' suffix for comparisons instead of adding 'more'." },
    prompts: ["Describe your best friend's personality.", "Who in your family are you closest to and why?", "Compare two of your family members."]
  },
  5: {
    vocabExamples: ["Let's eat at that new restaurant.", "This soup is incredibly delicious.", "Would you like a beverage with your meal?"],
    grammar: { natural: "Could I have a coffee, please?", unnatural: "Give me a coffee.", note: "Using modal verbs like 'Could I have' or 'I would like' softens the request and sounds much more polite." },
    prompts: ["Roleplay ordering your favorite fast food.", "How would you ask the waiter for the bill?", "Describe a delicious meal you recently had."]
  },
  6: {
    vocabExamples: ["Keep the receipt in case you need a refund.", "This jacket was a real bargain.", "This store has great prices."],
    grammar: { natural: "How much is this shirt?", unnatural: "What is the money for this shirt?", note: "'How much is...?' is the standard and most natural way to ask for a price." },
    prompts: ["Ask a store clerk about the price and size of shoes.", "Talk about the last bargain you found.", "Roleplay returning an item to a store."]
  },
  7: {
    vocabExamples: ["Turn left at the next intersection.", "We finally reached our destination."],
    grammar: { natural: "Go straight and turn left.", unnatural: "Go to straight and make left.", note: "Use the base verb for directions ('go', 'turn') without 'to', and 'turn left' rather than 'make left' (though 'make a left' is acceptable regionally)." },
    prompts: ["Give directions from your house to the nearest grocery store.", "How do you ask a stranger for directions to the train station?", "Describe navigating a new city."]
  },
  8: {
    vocabExamples: ["Reading is my favorite leisure activity.", "I find history absolutely fascinating."],
    grammar: { natural: "I enjoy playing tennis.", unnatural: "I enjoy to play tennis.", note: "Verbs like 'enjoy', 'mind', and 'avoid' are followed by a gerund (-ing form), not an infinitive." },
    prompts: ["What do you like doing in your free time?", "Describe a hobby you've always wanted to try.", "Ask me about my weekend activities."]
  },
  9: {
    vocabExamples: ["The temperature dropped below freezing.", "The weather forecast predicts rain tomorrow."],
    grammar: { natural: "It looks like it's going to rain.", unnatural: "It looks like it will rain.", note: "Use 'going to' for predictions based on present evidence (e.g., seeing dark clouds)." },
    prompts: ["What is your favorite season and why?", "Describe the weather today in your city.", "Make small talk about the weather with a cashier."]
  },
  10: {
    vocabExamples: ["He cares too much about his appearance.", "The sunset over the ocean was gorgeous."],
    grammar: { natural: "My hometown is very peaceful.", unnatural: "My hometown is too peaceful.", note: "'Very' means a lot, while 'too' has a negative connotation meaning 'more than acceptable'." },
    prompts: ["Describe the room you are currently in.", "What does your best friend look like?", "Compare your hometown to a big city."]
  },
  11: {
    vocabExamples: ["I have a doctor's appointment at 3 PM.", "Are you available for a quick call tomorrow?"],
    grammar: { natural: "Are you free on Tuesday?", unnatural: "Are you free in Tuesday?", note: "Always use 'on' for days of the week, and 'in' for months or years." },
    prompts: ["Invite a friend to have lunch this weekend.", "Politely decline an invitation to a party.", "Call to reschedule a dentist appointment."]
  },
  12: {
    vocabExamples: ["In my opinion, we should wait.", "My preference is to work from home."],
    grammar: { natural: "I strongly agree with you.", unnatural: "I am agree with you.", note: "'Agree' is a verb, not an adjective. So we say 'I agree', never 'I am agree'." },
    prompts: ["Express your opinion on working from home.", "Politely disagree with someone who says winter is the best season.", "Compare two popular movies and share your preference."]
  },
  13: {
    vocabExamples: ["A fever is a common symptom of the flu.", "Take this medicine twice a day."],
    grammar: { natural: "I have a headache.", unnatural: "I have headache.", note: "Use the indefinite article 'a' with most aches and pains (a headache, a cold, a cough)." },
    prompts: ["Describe your symptoms to a doctor.", "What advice would you give someone with a bad cold?", "Talk about your exercise routine."]
  },
  14: {
    vocabExamples: ["My colleague helped me with the project.", "Managing the budget is my main responsibility."],
    grammar: { natural: "I work as a developer.", unnatural: "I work like a developer.", note: "Use 'as' to talk about a job or role. 'Like' is used for comparisons." },
    prompts: ["Describe your daily responsibilities at work.", "What would be your dream job?", "Talk about a helpful colleague you've worked with."]
  },
  15: {
    vocabExamples: ["Let's plan our travel itinerary.", "We need to book our accommodation early."],
    grammar: { natural: "I went to Paris last year.", unnatural: "I have gone to Paris last year.", note: "Use the simple past, not present perfect, when specifying a finished time in the past ('last year')." },
    prompts: ["Tell a story about a memorable trip you took.", "What do you look for in a good vacation destination?", "Describe a travel problem you faced and how you solved it."]
  },
  16: {
    vocabExamples: ["The algorithm recommends videos I like.", "Privacy is a major concern on social media."],
    grammar: { natural: "I'm looking forward to talking to you.", unnatural: "I'm looking forward to talk to you.", note: "The phrase 'look forward to' is followed by a gerund (-ing form), as 'to' is a preposition here." },
    prompts: ["What are the pros and cons of social media?", "How much time do you spend on your phone daily?", "Debate whether technology makes us more isolated."]
  },
  17: {
    vocabExamples: ["My favorite genre of music is jazz.", "I highly recommend reading this novel."],
    grammar: { natural: "The movie was really boring.", unnatural: "The movie was really bored.", note: "Use '-ing' adjectives (boring) to describe the cause of a feeling, and '-ed' adjectives (bored) to describe the feeling itself." },
    prompts: ["Review a movie you watched recently.", "Recommend your favorite book or artist.", "Discuss how music genres affect your mood."]
  },
  18: {
    vocabExamples: ["Table etiquette varies by culture.", "It's a tradition to gather on holidays."],
    grammar: { natural: "I'm used to eating dinner late.", unnatural: "I used to eating dinner late.", note: "'Be used to' (meaning accustomed to) takes an -ing verb. 'Used to' (past habit) takes a base verb." },
    prompts: ["Describe a cultural festival from your country.", "Talk about a misunderstanding caused by cultural differences.", "Explain dining etiquette in your culture."]
  },
  19: {
    vocabExamples: ["I apologize for the delay.", "We reached a resolution after a long discussion."],
    grammar: { natural: "Could you please help me with this?", unnatural: "You must help me with this.", note: "'Could you please' leaves room for the other person, whereas 'must' is an obligation and sounds demanding." },
    prompts: ["Roleplay complaining about cold food at a restaurant.", "How would you apologize for missing a meeting?", "Propose a solution to a difficult coworker."]
  },
  20: {
    vocabExamples: ["Her main aspiration is to become a doctor.", "You have to work hard to achieve your dreams."],
    grammar: { natural: "I'll help you with that.", unnatural: "I help you with that.", note: "Use 'will' (\\'ll) for spontaneous decisions, offers, and promises made at the moment of speaking." },
    prompts: ["Where do you see yourself in five years?", "What is a major goal you've set for this year?", "Talk about the steps needed to achieve your English goals."]
  },
  21: {
    vocabExamples: ["Communication is one of my strengths.", "My weakness is overthinking decisions."],
    grammar: { natural: "I have been working here for 3 years.", unnatural: "I am working here since 3 years.", note: "Use 'for' with a duration of time (3 years), and 'since' with a starting point (2020)." },
    prompts: ["Answer the question: 'Tell me about yourself.'", "How do you handle high-pressure situations?", "Discuss a time you overcame a professional challenge."]
  },
  22: {
    vocabExamples: ["I met many peers at the medical conference.", "Let's exchange business cards."],
    grammar: { natural: "If I were you, I would reach out to him.", unnatural: "If I am you, I would reach out to him.", note: "Use 'were' instead of 'am/was' for hypothetical or unreal situations in the present (Second Conditional)." },
    prompts: ["Introduce yourself to a stranger at a networking event.", "How do you politely follow up with a contact after a conference?", "Make small talk before a business meeting begins."]
  },
  23: {
    vocabExamples: ["Let's transition to the next topic.", "To conclude, sales have increased."],
    grammar: { natural: "Despite the rain, we went out.", unnatural: "Despite of the rain, we went out.", note: "'Despite' is never followed by 'of'. Use 'despite' or 'in spite of'." },
    prompts: ["Introduce the main topic of a mock presentation.", "Practice concluding a presentation and taking questions.", "How do you handle a question you don't know the answer to?"]
  },
  24: {
    vocabExamples: ["We had to compromise on the budget.", "She managed to persuade the client."],
    grammar: { natural: "Unless we act now, we'll lose out.", unnatural: "If we don't act now, we'll lose out.", note: "'Unless' means 'if not' and can make persuasive arguments sound more direct and professional." },
    prompts: ["Roleplay negotiating a higher salary.", "Persuade someone to invest in your business idea.", "How do you handle a disagreement during a negotiation?"]
  },
  25: {
    vocabExamples: ["The geopolitical situation is very nuanced.", "He brings a unique perspective to the team."],
    grammar: { natural: "The economy has been growing recently.", unnatural: "The economy grows recently.", note: "Use present perfect continuous for actions starting in the past and continuing into the present, especially with 'recently'." },
    prompts: ["Summarize a news story you read this week.", "Share your perspective on artificial intelligence.", "Discuss how a global event impacts the local economy."]
  },
  26: {
    vocabExamples: ["They gave me constructive feedback.", "A good manager knows how to motivate people."],
    grammar: { natural: "You should have told me earlier.", unnatural: "You should tell me earlier.", note: "Use 'should have + past participle' to express regret or criticism about a past action." },
    prompts: ["Roleplay giving constructive feedback to a team member.", "How would you motivate a discouraged team?", "Describe the qualities of a great leader."]
  },
  27: {
    vocabExamples: ["He tried to de-escalate the argument.", "She was brought in to mediate the dispute."],
    grammar: { natural: "Had I known, I would have helped.", unnatural: "If I know, I would help.", note: "Inversion ('Had I known') sounds highly professional and is used for past hypotheticals (Third Conditional)." },
    prompts: ["Mediate a dispute between two coworkers over a missed deadline.", "How do you respond when someone blames you unfairly?", "De-escalate a conversation with an angry client."]
  },
  28: {
    vocabExamples: ["We need to incorporate their feedback.", "She speaks fluent Spanish and French."],
    grammar: { natural: "It's high time we changed our strategy.", unnatural: "It's high time we change our strategy.", note: "The expression 'It\\'s high time' is followed by the past tense to refer to the present or future." },
    prompts: ["Use three business idioms in a short paragraph.", "Describe a time you had to 'think outside the box'.", "Explain what it means to 'get the ball rolling' on a project."]
  },
  29: {
    vocabExamples: ["He asked a rhetorical question to make a point.", "The audience clapped loudly."],
    grammar: { natural: "Not only is he smart, but he's also kind.", unnatural: "He is not only smart but also he is kind.", note: "Inverting the subject and verb after 'Not only' at the beginning of a sentence adds rhetorical emphasis." },
    prompts: ["Deliver a 1-minute persuasive pitch for a product.", "How do you recover if you make a mistake during a speech?", "Practice engaging an audience that seems distracted."]
  },
  30: {
    vocabExamples: ["The final assessment covers all chapters.", "Take a moment to reflect on your progress."],
    grammar: { natural: "I wish I had studied more.", unnatural: "I wish I studied more.", note: "Use 'wish + past perfect' to express regret about the past." },
    prompts: ["Reflect on your English learning journey so far.", "What are your top three priorities for next month?", "Maintain a 2-minute free speech on any topic you choose."]
  }
};

const curriculumPath = 'src/data/curriculum.ts';
let code = fs.readFileSync(curriculumPath, 'utf8');

const arrayMatch = code.match(/export const curriculum:\s*DaySession\[\]\s*=\s*(\[[\s\S]*\]);/m);

if (arrayMatch) {
  let arrayStr = arrayMatch[1];
  
  const vm = require('vm');
  const sandbox = {};
  vm.createContext(sandbox);
  try {
    vm.runInContext('var curr = ' + arrayStr, sandbox);
    let curr = sandbox.curr;
    
    for (let i=0; i<curr.length; i++) {
        let item = curr[i];
        let d = item.day;
        if (augmentData[d]) {
            let aug = augmentData[d];
            
            // Vocab
            if (item.vocabulary && item.vocabulary.length > 0) {
                for (let j=0; j<item.vocabulary.length; j++) {
                    if (aug.vocabExamples[j]) {
                        item.vocabulary[j].exampleSentence = aug.vocabExamples[j];
                    } else {
                        item.vocabulary[j].exampleSentence = aug.vocabExamples[0]; 
                    }
                }
            }
            
            // Grammar
            item.grammarExample = aug.grammar;
            
            // Prompts
            item.speakingPrompts = aug.prompts;
        }
    }
    
    let newArrayStr = JSON.stringify(curr, null, 2);
    
    // Removing property quotes for cleaner JS/TS look
    newArrayStr = newArrayStr.replace(/"([^"]+)":/g, '$1:');
    
    let interfaceStr = `export interface DaySession {
  day: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  topic: string;
  description: string;
  goals: string[];
  example?: string;
  youtubeLink?: string;
  vocabulary?: { word: string; pronunciation: string; meaning: string; exampleSentence?: string; }[];
  pronunciationNotes?: string;
  grammarExample?: { natural: string; unnatural: string; note: string; };
  speakingPrompts?: string[];
}

export const curriculum: DaySession[] = ${newArrayStr};
`;
    
    fs.writeFileSync(curriculumPath, interfaceStr);
    console.log("Successfully augmented curriculum.ts");
    
  } catch(e) {
      console.error(e);
  }
} else {
  console.log("Could not find curriculum array");
}
