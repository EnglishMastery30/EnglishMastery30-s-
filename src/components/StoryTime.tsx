import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, Clock, Play, CheckCircle, ChevronLeft, Calendar, Bell, Star, Sparkles, BookOpen, Quote, Pause, X, Trash2, Tag, Filter } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  duration: number;
  content: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  image: string;
  grammarFocus: string;
  alphabet: string;
}

const STORIES: Story[] = [
  {
    id: 'a1',
    title: 'The Active Artist',
    duration: 5,
    category: 'Art',
    level: 'Beginner',
    alphabet: 'A',
    grammarFocus: 'Am / Is / Are',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Alice is a talented artist who lives in a bright studio.",
      "She is always busy. She is painting a new mural on the wall right now.",
      "She says, 'I am very happy when I create something beautiful.'",
      "Next week, she will be at the grand opening. She will show her work.",
      "Last year, she was just a student. She was quiet and shy.",
      "Alice and her friends are a great team. They are always helpful."
    ]
  },
  {
    id: 'a2',
    title: 'Ample Ambition',
    duration: 5,
    category: 'Success',
    level: 'Intermediate',
    alphabet: 'A',
    grammarFocus: 'Able to (Am / Is / Are)',
    image: 'https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Alan is an athlete. He is able to run ten miles every morning.",
      "His coaches are very proud. They are able to see his progress daily.",
      "Next year, he will be able to join the national team.",
      "Two years ago, he was able to win the local race. He was very fast then.",
      "We are able to achieve big goals if we practice every day.",
      "Alan says, 'I am able to push myself because I have big dreams.'"
    ]
  },
  {
    id: 'b1',
    title: 'The Busy Builder',
    duration: 5,
    category: 'Work',
    level: 'Beginner',
    alphabet: 'B',
    grammarFocus: 'Be / Being / Been',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f4a81d1?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Bob is a builder. He wants to be the best in the city.",
      "Today, he is being very careful with the heavy bricks.",
      "He has been a builder since he was twenty years old.",
      "He will be finished with this house by next Friday.",
      "Yesterday, he was being guided by his father. It was a good lesson.",
      "Being a builder is hard work, but Bob loves it."
    ]
  },
  {
    id: 'b2',
    title: 'Beginnings of Bravery',
    duration: 5,
    category: 'Growth',
    level: 'Advanced',
    alphabet: 'B',
    grammarFocus: 'To be',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Ben wants to be a pilot. He loves to fly in his dreams.",
      "To be successful, he studies hard every night. He is determined.",
      "Next year, he will be ready to start his training. He will be flying soon.",
      "In the past, he was afraid to be alone in the dark.",
      "His parents want him to be happy and to be safe.",
      "To be a hero is to be kind and helpful to others."
    ]
  },
  {
    id: 'c1',
    title: 'The Clever Chef',
    duration: 5,
    category: 'Cooking',
    level: 'Intermediate',
    alphabet: 'C',
    grammarFocus: 'Can / Could',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Chef Carlos can cook delicious meals for everyone.",
      "He can make fresh pasta from scratch in just ten minutes.",
      "When he was young, he could only make simple soup.",
      "He could have won the prize last month, but he was too busy.",
      "Next year, he will be able to open his own restaurant.",
      "If we visit him, we can learn his secret recipes."
    ]
  },
  {
    id: 'd1',
    title: 'Dancing Dudes',
    duration: 5,
    category: 'Social',
    level: 'Beginner',
    alphabet: 'D',
    grammarFocus: 'Do / Does / Did',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "The Dudes are dancers. They perform every weekend.",
      "David does a great job leading the group. He does amazing flips.",
      "Does he practice every day? Yes, he does. He works hard.",
      "Last night, they did a show on TV. They did a fantastic job.",
      "They will do another show tomorrow. It will be even better.",
      "Everyone did their best, and the crowd was very happy."
    ]
  },
  {
    id: 'd2',
    title: 'Daring Dreams',
    duration: 5,
    category: 'Bravery',
    level: 'Intermediate',
    alphabet: 'D',
    grammarFocus: 'Dare to',
    image: 'https://images.unsplash.com/photo-1533558701576-23c65e42cddf?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Dan is a brave boy. He dares to climb the tallest trees.",
      "Does he dare to swim in the cold river? Yes, he does.",
      "Last summer, he dared to explore the dark cave alone.",
      "He will dare to speak in front of the whole school tomorrow.",
      "He was a quiet child, but he grew up to be very daring.",
      "We should all dare to try new things and be brave."
    ]
  },
  {
    id: 'g1',
    title: 'Going to the Galaxy',
    duration: 10,
    category: 'Sci-Fi',
    level: 'Intermediate',
    alphabet: 'G',
    grammarFocus: 'Going to (Am / Is / Are)',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Captain Gaby is an astronaut. She is going to fly to Mars.",
      "She is going to take her robot assistant with her.",
      "Yesterday, she was going to check the engines, but it rained.",
      "They are going to explore the red planet next month.",
      "It was going to be a long journey, but they were prepared.",
      "I am going to watch the launch on my computer."
    ]
  },
  {
    id: 'h1',
    title: 'Hidden Houses',
    duration: 5,
    category: 'Mystery',
    level: 'Beginner',
    alphabet: 'H',
    grammarFocus: 'Have / Has / Had',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Henry is a collector. He has many old and rare maps.",
      "I have a secret key. We have a goal to find the treasure.",
      "Last year, he had only three maps. He had a small collection.",
      "He will have a museum of his own one day. It will be famous.",
      "They had a great time searching the attic yesterday.",
      "Everyone has a talent. Henry has a talent for discovery."
    ]
  },
  {
    id: 'h2',
    title: 'Helpful Hands',
    duration: 5,
    category: 'Kindness',
    level: 'Intermediate',
    alphabet: 'H',
    grammarFocus: 'Have to / Has to',
    image: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Harry is a doctor. He has to work early in the morning.",
      "His nurse has to help him with the patients every day.",
      "Last night, he had to stay late at the hospital.",
      "Tomorrow, I have to visit the clinic for my checkup.",
      "They have to be very careful with the medicine.",
      "Harry was tired, but he knew he had to keep going."
    ]
  },
  {
    id: 'h3',
    title: 'History of Hope',
    duration: 10,
    category: 'History',
    level: 'Advanced',
    alphabet: 'H',
    grammarFocus: 'Have been / Has been / Had been',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "The villagers are strong. They have been through many trials.",
      "Years ago, they had to rebuild their homes after the flood.",
      "The leader has been working for the village for ten years.",
      "Before the peace, there had been a long season of war.",
      "Next year, they will have been in this valley for a century.",
      "They were brave people. They have been heroes to us."
    ]
  },
  {
    id: 'm1',
    title: 'Mountain Might',
    duration: 10,
    category: 'Adventure',
    level: 'Intermediate',
    alphabet: 'M',
    grammarFocus: 'May / Might / Must',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Mark is a climber. He must check his gear before he starts.",
      "He may reach the top by noon if the weather stays clear.",
      "It might snow later, so he must be very careful.",
      "Last night, he must have been tired after the long climb.",
      "He might have seen a rare eagle at the summit.",
      "If we go tomorrow, we must follow the safe path."
    ]
  },
  {
    id: 'n1',
    title: 'Needed Notes',
    duration: 5,
    category: 'Education',
    level: 'Beginner',
    alphabet: 'N',
    grammarFocus: 'Need to / Needs to',
    image: 'https://images.unsplash.com/photo-1454165833767-027eeea15c3e?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Nancy is a student. She needs to finish her homework tonight.",
      "I need to help her with the math problems.",
      "They need to be quiet in the library. Everyone needs to focus.",
      "Last week, she needed to buy a new notebook.",
      "Tomorrow, she will need to present her ideas to the class.",
      "She was always a good student. She needed to be to succeed."
    ]
  },
  {
    id: 'o1',
    title: 'Oceans of Old',
    duration: 10,
    category: 'History',
    level: 'Advanced',
    alphabet: 'O',
    grammarFocus: 'Ought to',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Oliver is a sailor. He ought to respect the powerful ocean.",
      "When he was young, he was able to sail his boat alone.",
      "We ought to protect the sea animals. They are beautiful.",
      "Last winter, he was able to survive a big storm at sea.",
      "Next year, he will be able to teach others how to sail.",
      "He was a brave man. He ought to be remembered for his courage."
    ]
  },
  {
    id: 's1',
    title: 'Stars and Science',
    duration: 10,
    category: 'Discovery',
    level: 'Intermediate',
    alphabet: 'S',
    grammarFocus: 'Shall / Should',
    image: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Sam is a scientist. He shall find the answer to the puzzle.",
      "We should listen to his ideas. He shall explain them clearly.",
      "Last year, he should have finished the report, but he was ill.",
      "Next month, we shall be at the conference together.",
      "He should be very proud of his hard work.",
      "Shall we start the experiment? Yes, we should start now."
    ]
  },
  {
    id: 'u1',
    title: 'The Used Umbrella',
    duration: 5,
    category: 'Life',
    level: 'Beginner',
    alphabet: 'U',
    grammarFocus: 'Used to',
    image: 'https://images.unsplash.com/photo-1520699918507-3c3e01c766a1?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Uncle Umar used to walk to work every single morning.",
      "He did not use to have a car. He used to be very fit.",
      "Now, he uses a bicycle. He will use his car only for long trips.",
      "Did you use to play outside? Yes, we used to play all day.",
      "The umbrella used to be red, but now it is quite faded.",
      "He was a strong man because he used to exercise every day."
    ]
  },
  {
    id: 'w1',
    title: 'Wants and Wishes',
    duration: 10,
    category: 'Philosophy',
    level: 'Intermediate',
    alphabet: 'W',
    grammarFocus: 'Want to / Wish to / Would like to',
    image: 'https://images.unsplash.com/photo-1490730141103-6ca27d9f461f?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Wendy is a dreamer. She wants to visit the stars.",
      "She wishes to be an astronaut. She would like to fly high.",
      "Last Christmas, she wanted to have a telescope.",
      "She wishes that she could see the moon up close.",
      "I would like to help her achieve her big dreams.",
      "She was always curious. She wanted to know everything."
    ]
  },
  {
    id: 'w2',
    title: 'Willing Winners',
    duration: 5,
    category: 'Success',
    level: 'Advanced',
    alphabet: 'W',
    grammarFocus: 'Willing to (Am / Is / Are)',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Will is a volunteer. He is willing to help anyone in need.",
      "His friends are willing to join him. They will work together.",
      "Next year, more people will be willing to join the cause.",
      "Last month, they were willing to work in the rain.",
      "Are you willing to be a leader? Yes, I am willing.",
      "He was a kind man. He was always willing to share his bread."
    ]
  },
  {
    id: 'w3',
    title: 'The Future Promise',
    duration: 5,
    category: 'Life',
    level: 'Beginner',
    alphabet: 'W',
    grammarFocus: 'Will',
    image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "We will succeed if we try our best. I will help you.",
      "Wally will be a great teacher one day. He will study hard.",
      "Tomorrow, it will be sunny. We will go to the park.",
      "Last night, it was dark, but today the sun will shine.",
      "Will you join our team? Yes, I will join tomorrow.",
      "They will be very happy when they finish their journey."
    ]
  },
  {
    id: 'w4',
    title: 'The Wise Woodcutter',
    duration: 5,
    category: 'Work',
    level: 'Intermediate',
    alphabet: 'W',
    grammarFocus: 'Would',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Walter is a woodcutter. He would work even when it was cold.",
      "If he had a sharper axe, he would finish his work faster.",
      "Last year, he would often sit by the fire and tell stories.",
      "He says, 'I would like to live in the forest forever.'",
      "I would help him if I were stronger and if I had the time.",
      "They would be lost without his guidance in the woods."
    ]
  },
  {
    id: 'p1',
    title: 'Past Perfection',
    duration: 10,
    category: 'History',
    level: 'Advanced',
    alphabet: 'P',
    grammarFocus: 'Could have / Should have / Would have',
    image: 'https://images.unsplash.com/photo-1466096115517-bceecbfb6fde?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Paul is a writer. He should have finished his book last month.",
      "He could have gone to the city, but he stayed in the cabin.",
      "If he had more ink, he would have written more pages.",
      "He thinks, 'I should have started my work earlier today.'",
      "We could have helped him if he had asked us for help.",
      "The story would have been shorter without his long dreams."
    ]
  },
  {
    id: 's2',
    title: 'Success of the Scholar',
    duration: 10,
    category: 'Education',
    level: 'Advanced',
    alphabet: 'S',
    grammarFocus: 'Shall have / Will have',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Sara is a persistent student. She will have finished her degree by next year.",
      "By the end of the term, she will have read fifty books.",
      "We shall have completed the project by the time she arrives.",
      "Next December, she will have been studying for four years.",
      "They will have achieved their goals because they work with zeal.",
      "She shall have earned her reward after all this hard work."
    ]
  },
  {
    id: 't1',
    title: 'Traveling Time',
    duration: 10,
    category: 'Adventure',
    level: 'Intermediate',
    alphabet: 'T',
    grammarFocus: 'Was able to / Were able to',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "The travelers were able to cross the bridge safely.",
      "Tom was able to find the map in the old drawer.",
      "Last week, they were able to reach the hidden valley.",
      "Next year, they will be able to travel to the moon.",
      "The group was able to share their food with everyone.",
      "They were tired, but they were able to continue their walk."
    ]
  },
  {
    id: 'v1',
    title: 'Voices of Value',
    duration: 5,
    category: 'Community',
    level: 'Advanced',
    alphabet: 'V',
    grammarFocus: 'Was going to / Were going to',
    image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Victor is a singer. He was going to perform at the festival.",
      "The villagers were going to listen to his beautiful songs.",
      "Then it rained, and they were going to cancel the show.",
      "Victor says, 'I am going to sing even if it is raining.'",
      "They were going to be sad, but his voice made them happy.",
      "Yesterday was going to be regular, but it became special."
    ]
  },
  {
    id: 'f1',
    title: 'Future Flowers',
    duration: 5,
    category: 'Nature',
    level: 'Beginner',
    alphabet: 'F',
    grammarFocus: 'Shall be / Will be',
    image: 'https://images.unsplash.com/photo-1582213706488-75c60b540131?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Flora is a gardener. She shall be planting roses tomorrow.",
      "The garden will be full of color in the spring time.",
      "Last month, the field was brown. It was dry and empty.",
      "We shall be very careful with the tiny green sprouts.",
      "The bees will be happy when the flowers are blooming.",
      "Flora says, 'I shall be here every day to water them.'"
    ]
  },
  {
    id: 'h4',
    title: 'The Hardened Hiker',
    duration: 5,
    category: 'Adventure',
    level: 'Intermediate',
    alphabet: 'H',
    grammarFocus: 'Had to',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Hunter is a hiker who loves the high mountains.",
      "Yesterday, he had to cross a deep river. He was very careful.",
      "Because of the fog, he had to use his compass to find the way.",
      "He had to climb for six hours to reach the summit camp.",
      "Next time, he will take a map so he won't have to guess.",
      "He was exhausted, but he knew he had to finish the trek."
    ]
  },
  {
    id: 'w5',
    title: 'Willing Workers of the West',
    duration: 5,
    category: 'Community',
    level: 'Intermediate',
    alphabet: 'W',
    grammarFocus: 'Was willing to / Were willing to',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "The West Family were farmers. They were willing to help their neighbors.",
      "Last winter, Mr. West was willing to share his extra grain.",
      "The children were willing to carry water to the dry fields.",
      "They were always kind, so everyone was willing to help them too.",
      "Next season, they will be willing to try new types of seeds.",
      "They were happy people because they were willing to work together."
    ]
  },
  {
    id: 'a3',
    title: 'Ability of the Astronaut',
    duration: 10,
    category: 'Sci-Fi',
    level: 'Advanced',
    alphabet: 'A',
    grammarFocus: 'Will be able to',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Commander Ada is a scientist. She will be able to fly to Jupiter soon.",
      "With the new engines, the ship will be able to travel faster than light.",
      "In five years, we will be able to build a city on the moon.",
      "Last year, she was not able to leave the Earth, but now she is ready.",
      "Soon, children will be able to study stars from a space station.",
      "She will be able to say, 'I have touched the stars' very soon."
    ]
  },
  {
    id: 'g2',
    title: 'The Great Gathering',
    duration: 5,
    category: 'Social',
    level: 'Intermediate',
    alphabet: 'G',
    grammarFocus: 'Will be going to',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "The Grand Family is big. They will be going to a reunion next month.",
      "I will be going to the village to meet all my cousins.",
      "We will be going to the lake to have a giant picnic.",
      "Last year, we were going to meet, but we were too busy.",
      "They will be going to the old house to share stories and songs.",
      "Everyone will be going to be happy at the great gathering."
    ]
  },
  {
    id: 'c2',
    title: 'The Courageous Captain',
    duration: 10,
    category: 'History',
    level: 'Advanced',
    alphabet: 'C',
    grammarFocus: 'Must have been',
    image: 'https://images.unsplash.com/photo-1544413647-15cc96da60f1?auto=format&fit=crop&q=80&w=400&h=300',
    content: [
      "Captain Cook must have been very brave to sail so far.",
      "The journey must have been difficult during the storms.",
      "He must have been a great leader to his large crew.",
      "They must have been excited to see the new land finally.",
      "The stars must have been their only map at night.",
      "It must have been a very cold winter in the open sea."
    ]
  }
];

export function StoryTime() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showTimerSetup, setShowTimerSetup] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [filterAlphabet, setFilterAlphabet] = useState('');
  const [filterGrammar, setFilterGrammar] = useState('');

  const alphabets = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  const grammarFocuses = Array.from(new Set(STORIES.map(s => s.grammarFocus)));

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && !isTimerPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      const eligibleStories = STORIES.filter(s => s.duration <= timerMinutes);
      const randomStory = eligibleStories[Math.floor(Math.random() * eligibleStories.length)] || STORIES[0];
      setSelectedStory(randomStory);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isTimerPaused, timeLeft, timerMinutes]);

  const startTimer = () => {
    setTimeLeft(timerMinutes * 60);
    setIsTimerRunning(true);
    setIsTimerPaused(false);
    setShowTimerSetup(false);
  };

  const deleteTimer = () => {
    setIsTimerRunning(false);
    setIsTimerPaused(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredStories = STORIES.filter(s => {
    const matchesAlpha = !filterAlphabet || s.alphabet === filterAlphabet;
    const matchesGrammar = !filterGrammar || s.grammarFocus === filterGrammar;
    return matchesAlpha && matchesGrammar;
  });

  if (selectedStory) {
    return (
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => {
            setSelectedStory(null);
            setCurrentPage(0);
          }}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6 font-bold uppercase tracking-wider text-xs"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Library
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-none overflow-hidden">
          <div className="relative h-64 sm:h-80">
            <img 
              src={selectedStory.image} 
              alt={selectedStory.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex gap-2 mb-3">
                <span className="px-2 py-0.5 bg-indigo-500 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">{selectedStory.grammarFocus}</span>
                <span className="px-2 py-0.5 bg-white/20 text-white text-[10px] font-black rounded-lg uppercase tracking-widest backdrop-blur-md">Section {selectedStory.alphabet}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">{selectedStory.title}</h2>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/20">{selectedStory.duration} Min</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black text-white uppercase tracking-widest">{selectedStory.level}</span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/20">{selectedStory.category}</span>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            <motion.div 
              key={currentPage}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <div className="flex items-start gap-6">
                 <Quote className="w-12 h-12 text-indigo-100 dark:text-indigo-900 shrink-0" />
                 <p className="text-xl sm:text-2xl font-serif leading-relaxed text-slate-800 dark:text-slate-200">
                   {selectedStory.content[currentPage]}
                 </p>
              </div>
            </motion.div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-100 dark:border-slate-800 pt-8">
              <div className="flex items-center gap-1">
                {selectedStory.content.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all ${i === currentPage ? 'w-8 bg-indigo-600' : 'w-1.5 bg-slate-200 dark:bg-slate-800'}`} 
                  />
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  className="px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                  Previous
                </button>
                {currentPage === selectedStory.content.length - 1 ? (
                  <button 
                    onClick={() => {
                      setSelectedStory(null);
                      setCurrentPage(0);
                    }}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    Complete Story
                  </button>
                ) : (
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(selectedStory.content.length - 1, prev + 1))}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
                  >
                    Next Page
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight flex items-center gap-3">
            Story Time <BookOpen className="w-8 h-8 text-indigo-600" />
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium italic">Improve grammar and vocabulary through A-Z curated adventure stories.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {isTimerRunning ? (
            <div className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-xl shadow-indigo-500/30">
               <div className="flex flex-col">
                 <span className="text-[8px] font-black uppercase tracking-widest opacity-80">Story Timer</span>
                 <span className="text-xl font-black font-mono leading-none">{formatTime(timeLeft)}</span>
               </div>
               <div className="flex gap-1 ml-4 items-center">
                  <button 
                    onClick={() => setIsTimerPaused(!isTimerPaused)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title={isTimerPaused ? "Resume" : "Pause"}
                  >
                    {isTimerPaused ? <Play className="w-5 h-5 fill-current" /> : <Pause className="w-5 h-5 fill-current" />}
                  </button>
                  <button 
                    onClick={deleteTimer}
                    className="p-2 hover:bg-rose-500 rounded-lg transition-colors"
                    title="Delete Timer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
               </div>
            </div>
          ) : (
            <button 
              onClick={() => setShowTimerSetup(true)}
              className="px-6 py-3 bg-white dark:bg-slate-900 border-2 border-indigo-100 dark:border-indigo-900 shadow-sm rounded-2xl flex items-center gap-3 hover:-translate-y-1 transition-all group"
            >
              <Calendar className="w-5 h-5 text-indigo-600" />
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Schedule Story</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Start Reading Timer</p>
              </div>
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
            <Filter className="w-3 h-3" /> Filter by Focus:
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilterGrammar('')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${!filterGrammar ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}`}
            >
              All Focuses
            </button>
            {grammarFocuses.map(focus => (
              <button 
                key={focus}
                onClick={() => setFilterGrammar(focus)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filterGrammar === focus ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}`}
              >
                {focus}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-2">
            <button 
              onClick={() => setFilterAlphabet('')}
              className={`min-w-[40px] h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all border-2 ${!filterAlphabet ? 'bg-indigo-600 text-white border-transparent shadow-md shadow-indigo-500/20' : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-100 dark:border-slate-800 hover:border-indigo-600 hover:text-indigo-600'}`}
            >
              #
            </button>
            {alphabets.map(char => (
              <button 
                key={char}
                onClick={() => setFilterAlphabet(char)}
                className={`min-w-[40px] h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all border-2 ${filterAlphabet === char ? 'bg-indigo-600 text-white border-transparent shadow-md shadow-indigo-500/20' : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-100 dark:border-slate-800 hover:border-indigo-600 hover:text-indigo-600'}`}
              >
                {char}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredStories.map(story => (
            <motion.div 
              layout
              key={story.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden group hover:shadow-2xl hover:shadow-indigo-500/10 transition-all flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4 h-10 w-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center font-black text-indigo-600 shadow-lg">
                  {story.alphabet}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-[8px] font-black text-white/70 uppercase tracking-widest">Grammar Focus</span>
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">{story.grammarFocus}</span>
                   </div>
                   <div className="flex items-center gap-1 text-white/90">
                    <Clock className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{story.duration}m</span>
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-3 h-3 text-indigo-500" />
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{story.category}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors tracking-tight">{story.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6 line-clamp-2">A story focusing on "{story.grammarFocus}" to help you master common English structures naturally.</p>
                <div className="mt-auto">
                  <button 
                    onClick={() => setSelectedStory(story)}
                    className="w-full py-3.5 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-900 dark:text-white font-black rounded-2xl transition-all border border-slate-100 dark:border-slate-700 hover:border-transparent active:scale-95 text-sm"
                  >
                    Read Story
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredStories.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Book className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No stories found</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Try choosing a different letter or focus.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showTimerSetup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 max-w-sm w-full shadow-2xl text-center relative"
            >
              <button 
                onClick={() => setShowTimerSetup(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-indigo-600">
                <Bell className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Set Reading Session</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">We'll notify you when it's time to dive into a new story.</p>
              
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[5, 10, 15, 20, 30, 45].map(mins => (
                  <button 
                    key={mins}
                    onClick={() => setTimerMinutes(mins)}
                    className={`h-20 rounded-2xl flex flex-col items-center justify-center transition-all ${timerMinutes === mins ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                  >
                    <span className="text-xl font-black">{mins}</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest mt-1 opacity-80">Min</span>
                  </button>
                ))}
              </div>

              <button 
                onClick={startTimer}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-500/20 hover:-translate-y-1 transition-all active:scale-[0.98]"
              >
                Set Study Timer
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
