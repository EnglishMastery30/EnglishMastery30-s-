
const emotions = [
  { text: "I'm so happy for you!", answer: "Thank you for sharing my joy!" },
  { text: "He was feeling quite sad today.", answer: "I hope he feels better soon." },
  { text: "She got angry about the delay.", answer: "Delays can be very frustrating." },
  { text: "We were surprised by the news.", answer: "It was certainly unexpected!" },
  { text: "I'm nervous about the interview.", answer: "You'll do great, just be yourself." },
  { text: "They felt relaxed after the yoga.", answer: "Yoga is wonderful for stress." },
  { text: "Are you excited for the trip?", answer: "Yes, I can't wait to go!" },
  { text: "He was bored during the movie.", answer: "That's a shame, I liked it." },
  { text: "I'm confused by these rules.", answer: "Let me help you clarify them." },
  { text: "She's worried about her cat.", answer: "I hope the cat is okay." },
  { text: "I feel lonely tonight.", answer: "We can talk if you'd like." },
  { text: "He is proud of his daughter.", answer: "She definitely worked hard." },
  { text: "They are grateful for your gift.", answer: "I'm glad they liked it." },
  { text: "I feel exhausted after work.", answer: "You should get some rest." },
  { text: "He's curious about your project.", answer: "I'll tell him more about it." },
  { text: "She was embarrassed by the mistake.", answer: "Everyone makes mistakes sometimes." },
  { text: "I'm disgusted by the smell.", answer: "Let's open a window for fresh air." },
  { text: "We're impatient for spring.", answer: "Winter does feel long this year." },
  { text: "He feels guilty about the accident.", answer: "Accidents happen, he shouldn't be so hard on himself." },
  { text: "I'm jealous of her new car.", answer: "It is a very nice model." },
  { text: "She's hopeful for the future.", answer: "Optimism is a great quality." },
  { text: "I feel peaceful in the mountains.", answer: "Nature has that effect on people." },
  { text: "He's terrified of spiders.", answer: "Many people share that fear." },
  { text: "They were disappointed by the result.", answer: "Better luck next time, for sure." },
  { text: "I'm so annoyed by the noise.", answer: "Should we move to a quieter room?" },
  { text: "She's frustrated with her progress.", answer: "Patience is key to learning." },
  { text: "I feel confident about the test.", answer: "That's the spirit! Good luck." },
  { text: "He was shocked by the price.", answer: "Inflation is making things expensive." },
  { text: "They're satisfied with the service.", answer: "That's good to hear, they work hard." },
  { text: "I feel silly in this hat.", answer: "I think it looks charming on you." },
  { text: "She's eager to start the class.", answer: "She always was a good student." },
  { text: "I'm fascinated by ancient history.", answer: "It's a truly endless subject." },
  { text: "He's miserable with the flu.", answer: "A lot of fluids and rest will help." },
  { text: "They are enthusiastic about the plan.", answer: "Their support is very valuable." },
  { text: "I feel nostalgic for my childhood.", answer: "Looking back can be sweet." },
  { text: "She's terrified of deep water.", answer: "Swimming lessons might help her." },
  { text: "I'm suspicious of his motives.", answer: "It's good to be cautious." },
  { text: "He feels lucky to be alive.", answer: "Life is a precious gift." },
  { text: "They're appreciative of the help.", answer: "I was happy to assist them." },
  { text: "I'm so relieved that it's over.", answer: "You can finally breathe easy now." },
  { text: "She's anxious about the results.", answer: "Worrying won't change the outcome." },
  { text: "I feel inspired by the speech.", answer: "It was very powerful, wasn't it?" },
  { text: "He's moody in the mornings.", answer: "Coffee might solve that problem." },
  { text: "They're overwhelmed with work.", answer: "They need to delegate more." },
  { text: "I'm so proud to know you.", answer: "That's very kind of you to say." },
  { text: "She's skeptical of the claims.", answer: "Healthy skepticism is good." },
  { text: "I feel vulnerable when I share.", answer: "Vulnerability is actually a strength." },
  { text: "He's content with his life.", answer: "That's a very rare achievement." },
  { text: "They're devastated by the loss.", answer: "My heart goes out to them." },
  { text: "I'm amused by your jokes.", answer: "I'm glad someone appreciates them!" },
  { text: "She's calm under pressure.", answer: "That's an excellent professional trait." },
  { text: "I feel awkward at parties.", answer: "Just find one person to talk to." },
  { text: "He's depressed lately.", answer: "Maybe he should see a specialist." },
  { text: "They're passionate about art.", answer: "Passion makes life interesting." },
  { text: "I'm worried I'll be late.", answer: "Traffic seems light today, don't worry." },
  { text: "She's curious about your career.", answer: "I'll share my journey with her." },
  { text: "I feel hopeful for a change.", answer: "Positive thinking leads to action." },
  { text: "He's upset that he missed it.", answer: "There will be another one next week." },
  { text: "They're satisfied with the results.", answer: "Hard work pays off in the end." },
  { text: "I'm so tired of this weather.", answer: "The forecast says sun is coming." },
  { text: "She's thrilled with the news.", answer: "It's wonderful news for everyone." },
  { text: "I'm surprised you noticed.", answer: "I pay attention to small details." },
  { text: "He's ashamed of his behavior.", answer: "He should apologize then." },
  { text: "They're excited for the concert.", answer: "The band is amazing live." },
  { text: "I feel lonely in this city.", answer: "Joining a club might help you." },
  { text: "She's passionate about cooking.", answer: "Her dishes are always delicious." },
  { text: "I'm annoyed by the constant calls.", answer: "You can turn on 'Do Not Disturb'." },
  { text: "He's confident in his team.", answer: "Teamwork makes the dream work." },
  { text: "They're disappointed in the movie.", answer: "The trailer looked so good!" },
  { text: "I'm so happy you called.", answer: "It's been too long since we spoke." },
  { text: "She's nervous about her surgery.", answer: "The doctors are very experienced." },
  { text: "I feel relaxed on the beach.", answer: "The sound of waves is soothing." },
  { text: "He's angry about the fine.", answer: "Rules are rules, unfortunately." },
  { text: "They're proud of their heritage.", answer: "Culture is a beautiful thing." },
  { text: "I'm so grateful for your support.", answer: "I'll always be here for you." },
  { text: "She's bored with her routine.", answer: "Maybe she needs a new hobby." },
  { text: "I feel guilty about forgetting.", answer: "It happens to the best of us." },
  { text: "He's jealous of his brother.", answer: "Sibling rivalry is quite common." },
  { text: "They're hopeful for a peace deal.", answer: "Everyone wants an end to conflict." },
  { text: "I'm so relieved you're safe.", answer: "Me too, it was a close call." },
  { text: "She's exhausted from the hike.", answer: "It was a very steep climb." },
  { text: "I feel peaceful in the garden.", answer: "Gardening is great for the soul." },
  { text: "He's skeptical of the results.", answer: "We should re-run the tests." },
  { text: "They're terrified of the dark.", answer: "A nightlight might help them." },
  { text: "I'm so amused by your story.", answer: "It was truly a bizarre day!" },
  { text: "She's overwhelmed by the attention.", answer: "Being famous has its downsides." },
  { text: "I feel silly for asking.", answer: "No question is too small to ask." },
  { text: "He's moodier than yesterday.", answer: "He probably needs more sleep." },
  { text: "They're eager to see the show.", answer: "Tickets are selling out fast." },
  { text: "I'm fascinated by space.", answer: "The universe is truly infinite." },
  { text: "She's miserable in this job.", answer: "She should start looking elsewhere." },
  { text: "I feel enthusiastic about today.", answer: "That's a great way to start!" },
  { text: "He's nostalgic for the 80s.", answer: "The music was definitely unique." },
  { text: "They're frustrated with the speed.", answer: "Fiber internet is much faster." },
  { text: "I'm suspicious of the deal.", answer: "If it's too good to be true, it is." },
  { text: "She's relaying her gratitude.", answer: "It was my pleasure to help her." },
  { text: "I feel lucky to have met you.", answer: "The feeling is entirely mutual." },
  { text: "He's apprehensive about moving.", answer: "Change is always a bit scary." },
  { text: "They're jubilant about the win.", answer: "They deserve to celebrate tonight." },
  { text: "I'm so proud of your progress.", answer: "Thank you for the encouragement!" },
  { text: "She's delighted with the gift.", answer: "I'm happy it brought her a smile." },
  { text: "I'm surprised at the news.", answer: "Nobody saw that one coming." },
  { text: "He's ashamed of the error.", answer: "We can fix it together easily." },
  { text: "They're excited for the party.", answer: "It's going to be the event of the year." },
  { text: "I feel lonely at the airport.", answer: "Traveling alone can be tough." },
  { text: "She's passionate about hiking.", answer: "The view from the top is worth it." },
  { text: "I'm annoyed by the delay.", answer: "Public transport is often late." },
  { text: "He's confident in his speech.", answer: "He practiced a lot for this." }
];

const fs = require('fs');
const content = fs.readFileSync('src/data/shadowingData.ts', 'utf8');

const day6Id = "6";
const day6Data = emotions.map((e, index) => ({
  id: `d6-${index}`,
  text: e.text,
  caption: `Expressing emotion sentence #${index + 1}`,
  answer: e.answer
}));

const day6Regex = /"6":\s*\[[\s\S]*?\],/;
const newDay6 = `"6": ${JSON.stringify(day6Data, null, 2)},`;

const updatedContent = content.replace(day6Regex, newDay6);

// Also update DASHBOARD_DAYS titles
const updatedContent2 = updatedContent.replace(
  /export const DASHBOARD_DAYS = \[([\s\S]*?)\];/,
  (match, p1) => {
    const days = [
      { id: '1', title: 'Real Life' },
      { id: '2', title: 'Office' },
      { id: '3', title: 'Restaurant' },
      { id: '4', title: 'Party' },
      { id: '5', title: 'Events' },
      { id: '6', title: 'Emotions' }
    ];
    const newDays = days.map(d => `  { id: '${d.id}', title: 'Day ${d.id}: ${d.title}' }`).join(',\n');
    return `export const DASHBOARD_DAYS = [\n${newDays}\n];`;
  }
);

fs.writeFileSync('src/data/shadowingData.ts', updatedContent2);
