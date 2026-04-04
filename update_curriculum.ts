import * as fs from 'fs';

let file = fs.readFileSync('./src/data/curriculum.ts', 'utf8');

// Also update the interface
file = file.replace(/goals: string\[\];/, "goals: string[];\n  example?: string;\n  youtubeLink?: string;");

let updated = file.replace(/description:\s*'(.*?)',\s*goals:/g, (match, desc) => {
  let example = "Hello, how are you today?";
  if (desc.includes('numbers')) example = "It is 3:15 PM right now.";
  else if (desc.includes('routine')) example = "I usually wake up at 7 AM.";
  else if (desc.includes('family')) example = "I have one brother and two sisters.";
  else if (desc.includes('food')) example = "I would like to order a coffee, please.";
  else if (desc.includes('directions')) example = "Excuse me, where is the nearest train station?";
  else if (desc.includes('shopping')) example = "How much does this shirt cost?";
  else if (desc.includes('hobbies')) example = "In my free time, I enjoy reading books.";
  else if (desc.includes('past')) example = "Last weekend, I went to the park.";
  else if (desc.includes('future')) example = "Next year, I am going to travel to Japan.";
  else if (desc.includes('opinions')) example = "In my opinion, this is the best option.";
  else if (desc.includes('agree')) example = "I completely agree with your point.";
  else if (desc.includes('advice')) example = "You should probably talk to a doctor.";
  else if (desc.includes('complaints')) example = "I'm sorry, but this soup is cold.";
  else if (desc.includes('interview')) example = "My greatest strength is my attention to detail.";
  else if (desc.includes('meeting')) example = "Let's move on to the next item on the agenda.";
  else if (desc.includes('presentation')) example = "Today, I'd like to talk to you about our new project.";
  else if (desc.includes('negotiation')) example = "Could we consider a slight discount on the bulk order?";
  else if (desc.includes('culture')) example = "In my country, it is customary to bow when greeting.";
  else if (desc.includes('news')) example = "Did you hear about the recent changes in the economy?";
  else if (desc.includes('technology')) example = "Artificial intelligence is changing the way we work.";
  else if (desc.includes('environment')) example = "We need to reduce our carbon footprint.";
  else if (desc.includes('health')) example = "It's important to maintain a balanced diet.";
  else if (desc.includes('travel')) example = "I'm planning a trip to Europe next summer.";
  else if (desc.includes('education')) example = "Online learning has become very popular recently.";
  else if (desc.includes('work')) example = "I've been working in marketing for five years.";
  else if (desc.includes('entertainment')) example = "Have you seen any good movies lately?";
  else if (desc.includes('sports')) example = "I play tennis every weekend to stay fit.";
  else if (desc.includes('fashion')) example = "That jacket looks really good on you.";
  else if (desc.includes('art')) example = "The exhibition at the museum was fascinating.";
  else if (desc.includes('history')) example = "Learning about the past helps us understand the present.";
  else if (desc.includes('science')) example = "The new discovery could lead to major medical breakthroughs.";
  else if (desc.includes('politics')) example = "The upcoming election is a frequent topic of discussion.";
  else if (desc.includes('economy')) example = "Inflation has affected the cost of living significantly.";
  else if (desc.includes('society')) example = "Social media has a profound impact on communication.";
  else if (desc.includes('philosophy')) example = "The meaning of life is a question that has puzzled humanity for centuries.";
  else if (desc.includes('psychology')) example = "Understanding human behavior is key to effective leadership.";
  else if (desc.includes('literature')) example = "Classic novels often explore universal themes.";
  else if (desc.includes('music')) example = "Listening to classical music helps me concentrate.";
  else if (desc.includes('film')) example = "The cinematography in that movie was absolutely stunning.";
  else if (desc.includes('photography')) example = "Capturing the right lighting is essential for a good photo.";
  else if (desc.includes('architecture')) example = "The building's design seamlessly blends modern and traditional elements.";
  else if (desc.includes('design')) example = "Good design is both functional and aesthetically pleasing.";
  else if (desc.includes('business')) example = "Our company is expanding into new international markets.";
  else if (desc.includes('finance')) example = "Diversifying your investment portfolio is a smart strategy.";
  else if (desc.includes('marketing')) example = "The new ad campaign successfully reached our target audience.";
  else if (desc.includes('sales')) example = "We exceeded our quarterly sales targets by twenty percent.";
  else if (desc.includes('customer')) example = "Providing excellent customer service is our top priority.";
  else if (desc.includes('management')) example = "Effective delegation is crucial for a manager.";
  else if (desc.includes('leadership')) example = "A good leader inspires and motivates their team.";
  else if (desc.includes('entrepreneurship')) example = "Starting a new business requires careful planning and execution.";
  else if (desc.includes('innovation')) example = "We are constantly looking for innovative solutions to complex problems.";
  else if (desc.includes('strategy')) example = "Our long-term strategy focuses on sustainable growth.";
  else if (desc.includes('planning')) example = "We need to develop a comprehensive plan for the upcoming year.";
  else if (desc.includes('organization')) example = "Keeping your workspace organized can improve productivity.";
  else if (desc.includes('productivity')) example = "Using time management techniques can help you get more done.";
  else if (desc.includes('efficiency')) example = "We are streamlining our processes to increase efficiency.";
  else if (desc.includes('quality')) example = "We are committed to delivering high-quality products to our customers.";
  else if (desc.includes('safety')) example = "Safety is our number one priority in the workplace.";
  else if (desc.includes('security')) example = "We have implemented strict security measures to protect our data.";
  else if (desc.includes('privacy')) example = "We take the privacy of our users very seriously.";
  else if (desc.includes('ethics')) example = "Our company operates with the highest ethical standards.";
  else if (desc.includes('diversity')) example = "We believe that diversity and inclusion are essential for success.";

  let searchTerms = encodeURIComponent(desc.split(' ').slice(0, 3).join(' '));
  return `description: '${desc}',\n    example: '${example.replace(/'/g, "\\'")}',\n    youtubeLink: 'https://www.youtube.com/results?search_query=learn+english+${searchTerms}',\n    goals:`;
});

fs.writeFileSync('./src/data/curriculum.ts', updated);
console.log('Updated curriculum.ts');
