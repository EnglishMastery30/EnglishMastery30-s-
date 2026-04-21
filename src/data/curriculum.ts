export interface DaySession {
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

export const curriculum: DaySession[] = [
  {
    day: 1,
    level: "Beginner",
    topic: "Introductions & Greetings",
    description: "Learn to introduce yourself and greet others naturally.",
    example: "Hello, how are you today?",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Learn%20to%20introduce",
    goals: [
      "Say hello and goodbye",
      "Share your name and where you are from",
      "Ask basic \"How are you?\" questions",
      "Use formal and informal greetings appropriately"
    ],
    pronunciationNotes: "Focus on clear vowel sounds in \"Hello\" and \"How\". Pay attention to the rising intonation in questions.",
    vocabulary: [
      {
        word: "Introduce",
        pronunciation: "/ˌɪntrəˈdjuːs/",
        meaning: "To tell someone another person's name",
        exampleSentence: "Let me introduce my friend to you."
      },
      {
        word: "Greeting",
        pronunciation: "/ˈɡriːtɪŋ/",
        meaning: "A polite word or sign of welcome",
        exampleSentence: "A warm greeting is important."
      },
      {
        word: "Pleasure",
        pronunciation: "/ˈplɛʒər/",
        meaning: "A feeling of happy satisfaction and enjoyment",
        exampleSentence: "It's a pleasure to meet you."
      }
    ],
    grammarExample: {
      natural: "Hi, I'm Sarah. It's nice to meet you.",
      unnatural: "Hello, my name is Sarah and I am happy.",
      note: "Using 'I\\'m [Name]' and 'It\\'s nice to meet you' sounds more conversational and relaxed than formal schoolbook phrases."
    },
    speakingPrompts: [
      "Introduce yourself to a new colleague.",
      "Greet your friend you haven't seen in a year.",
      "Roleplay meeting your neighbor for the first time."
    ]
  },
  {
    day: 2,
    level: "Beginner",
    topic: "Numbers, Time & Dates",
    description: "Practice using numbers in everyday contexts.",
    example: "It is 3:15 PM right now.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Practice%20using%20numbers",
    goals: [
      "Tell the time accurately",
      "Say your phone number clearly",
      "Discuss dates and birthdays",
      "Understand prices and basic math terms"
    ],
    pronunciationNotes: "Distinguish between \"teen\" and \"ty\" numbers (e.g., thirteen vs. thirty) by emphasizing the correct syllable.",
    vocabulary: [
      {
        word: "Schedule",
        pronunciation: "/ˈʃɛdjuːl/ or /ˈskɛdʒuːl/",
        meaning: "A plan for carrying out a process or procedure",
        exampleSentence: "I have a busy schedule today."
      },
      {
        word: "Quarter",
        pronunciation: "/ˈkwɔːrtər/",
        meaning: "One of four equal parts (e.g., 15 minutes)",
        exampleSentence: "Cut the pie into a quarter."
      },
      {
        word: "Tomorrow",
        pronunciation: "/təˈmɒroʊ/",
        meaning: "The day after today",
        exampleSentence: "I will see you tomorrow."
      }
    ],
    grammarExample: {
      natural: "We meet at 3:15 PM.",
      unnatural: "We meet on 3:15 PM.",
      note: "Use 'at' for specific times, 'on' for days and dates, and 'in' for months or periods."
    },
    speakingPrompts: [
      "What time do you usually wake up and go to sleep?",
      "What is your phone number and birth date?",
      "Describe your schedule for tomorrow."
    ]
  },
  {
    day: 3,
    level: "Beginner",
    topic: "Daily Routine",
    description: "Talk about what you do every day.",
    example: "I usually wake up at 7 AM.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Talk%20about%20what",
    goals: [
      "Use simple present tense correctly",
      "Describe morning to evening activities",
      "Use frequency adverbs (always, sometimes, never)",
      "Sequence events using first, then, next"
    ],
    pronunciationNotes: "Practice the /s/ and /z/ sounds at the end of third-person singular verbs (e.g., he wakes, she goes).",
    vocabulary: [
      {
        word: "Routine",
        pronunciation: "/ruːˈtiːn/",
        meaning: "A sequence of actions regularly followed",
        exampleSentence: "My morning routine is very simple."
      },
      {
        word: "Usually",
        pronunciation: "/ˈjuːʒʊəli/",
        meaning: "Under normal conditions; generally",
        exampleSentence: "I usually drink coffee with breakfast."
      },
      {
        word: "Breakfast",
        pronunciation: "/ˈbrɛkfəst/",
        meaning: "The first meal of the day",
        exampleSentence: "Breakfast is the most important meal of the day."
      }
    ],
    grammarExample: {
      natural: "I usually wake up at 7.",
      unnatural: "I wake up usually at 7.",
      note: "Adverbs of frequency like 'usually' and 'always' should come before the main verb."
    },
    speakingPrompts: [
      "Describe your typical morning routine.",
      "What do you always do before going to bed?",
      "Tell me about a habit you are trying to build."
    ]
  },
  {
    day: 4,
    level: "Beginner",
    topic: "Family & Friends",
    description: "Describe the people close to you.",
    example: "My brother is taller than me.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Describe%20the%20people",
    goals: [
      "Name family members",
      "Describe relationships and marital status",
      "Talk about a friend's personality",
      "Use possessive adjectives (my, his, her)"
    ],
    pronunciationNotes: "Ensure the \"th\" sound in words like \"brother\" and \"mother\" is voiced (/ð/).",
    vocabulary: [
      {
        word: "Sibling",
        pronunciation: "/ˈsɪblɪŋ/",
        meaning: "A brother or sister",
        exampleSentence: "I have one older sibling."
      },
      {
        word: "Relative",
        pronunciation: "/ˈrɛlətɪv/",
        meaning: "A person connected by blood or marriage",
        exampleSentence: "Many relatives came to the wedding."
      },
      {
        word: "Personality",
        pronunciation: "/ˌpɜːrsəˈnæləti/",
        meaning: "The combination of characteristics or qualities that form an individual's distinctive character",
        exampleSentence: "She has a very outgoing personality."
      }
    ],
    grammarExample: {
      natural: "My brother is taller than me.",
      unnatural: "My brother is more tall than me.",
      note: "For short adjectives like 'tall', use the '-er' suffix for comparisons instead of adding 'more'."
    },
    speakingPrompts: [
      "Describe your best friend's personality.",
      "Who in your family are you closest to and why?",
      "Compare two of your family members."
    ]
  },
  {
    day: 5,
    level: "Beginner",
    topic: "Food & Dining",
    description: "Order food and talk about your favorite meals.",
    example: "I would like to order a coffee, please.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Order%20food%20and",
    goals: [
      "Read and understand a menu",
      "Order politely at a restaurant",
      "Express likes and dislikes about food",
      "Ask for the bill"
    ],
    pronunciationNotes: "Practice polite intonation when making requests. Avoid sounding flat or demanding.",
    vocabulary: [
      {
        word: "Restaurant",
        pronunciation: "/ˈrɛstrɒnt/",
        meaning: "A place where people pay to sit and eat meals",
        exampleSentence: "Let's eat at that new restaurant."
      },
      {
        word: "Delicious",
        pronunciation: "/dɪˈlɪʃəs/",
        meaning: "Highly pleasant to the taste",
        exampleSentence: "This soup is incredibly delicious."
      },
      {
        word: "Beverage",
        pronunciation: "/ˈbɛvərɪdʒ/",
        meaning: "A drink, especially one other than water",
        exampleSentence: "Would you like a beverage with your meal?"
      }
    ],
    grammarExample: {
      natural: "Could I have a coffee, please?",
      unnatural: "Give me a coffee.",
      note: "Using modal verbs like 'Could I have' or 'I would like' softens the request and sounds much more polite."
    },
    speakingPrompts: [
      "Roleplay ordering your favorite fast food.",
      "How would you ask the waiter for the bill?",
      "Describe a delicious meal you recently had."
    ]
  },
  {
    day: 6,
    level: "Beginner",
    topic: "Shopping & Prices",
    description: "Navigate a store and ask about items.",
    example: "How much does this shirt cost?",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Navigate%20a%20store",
    goals: [
      "Ask for prices and sizes",
      "Discuss clothing items",
      "Complete a simple transaction",
      "Understand return policies"
    ],
    pronunciationNotes: "Focus on linking words naturally, like \"How much is it?\" -> \"How much_is_it?\"",
    vocabulary: [
      {
        word: "Receipt",
        pronunciation: "/rɪˈsiːt/",
        meaning: "A printed statement acknowledging that something has been paid for",
        exampleSentence: "Keep the receipt in case you need a refund."
      },
      {
        word: "Bargain",
        pronunciation: "/ˈbɑːrɡɪn/",
        meaning: "An agreement between two or more parties as to what each party will do for the other",
        exampleSentence: "This jacket was a real bargain."
      }
    ],
    grammarExample: {
      natural: "How much is this shirt?",
      unnatural: "What is the money for this shirt?",
      note: "'How much is...?' is the standard and most natural way to ask for a price."
    },
    speakingPrompts: [
      "Ask a store clerk about the price and size of shoes.",
      "Talk about the last bargain you found.",
      "Roleplay returning an item to a store."
    ]
  },
  {
    day: 7,
    level: "Beginner",
    topic: "Directions & Travel",
    description: "Ask for and give simple directions.",
    example: "Excuse me, where is the nearest train station?",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Ask%20for%20and",
    goals: [
      "Understand left/right/straight",
      "Ask \"Where is the...?\"",
      "Describe how to get to a landmark",
      "Use prepositions of place (next to, across from)"
    ],
    pronunciationNotes: "Emphasize the key direction words (LEFT, RIGHT, STRAIGHT) for clarity.",
    vocabulary: [
      {
        word: "Intersection",
        pronunciation: "/ˌɪntərˈsɛkʃən/",
        meaning: "A point or line common to lines or surfaces that intersect",
        exampleSentence: "Turn left at the next intersection."
      },
      {
        word: "Destination",
        pronunciation: "/ˌdɛstɪˈneɪʃən/",
        meaning: "The place to which someone or something is going or being sent",
        exampleSentence: "We finally reached our destination."
      }
    ],
    grammarExample: {
      natural: "Go straight and turn left.",
      unnatural: "Go to straight and make left.",
      note: "Use the base verb for directions ('go', 'turn') without 'to', and 'turn left' rather than 'make left'."
    },
    speakingPrompts: [
      "Give directions from your house to the nearest grocery store.",
      "How do you ask a stranger for directions to the train station?",
      "Describe navigating a new city."
    ]
  },
  {
    day: 8,
    level: "Beginner",
    topic: "Hobbies & Interests",
    description: "Share what you like to do in your free time.",
    example: "I enjoy playing tennis on weekends.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Share%20what%20you",
    goals: [
      "Talk about sports and games",
      "Discuss weekend activities",
      "Ask others about their hobbies",
      "Use gerunds after \"like\" and \"enjoy\""
    ],
    pronunciationNotes: "Practice the \"-ing\" ending in gerunds, making sure not to drop the final sound completely.",
    vocabulary: [
      {
        word: "Leisure",
        pronunciation: "/ˈliːʒər/",
        meaning: "Free time",
        exampleSentence: "Reading is my favorite leisure activity."
      },
      {
        word: "Fascinating",
        pronunciation: "/ˈfæsɪneɪtɪŋ/",
        meaning: "Extremely interesting",
        exampleSentence: "I find history absolutely fascinating."
      }
    ],
    grammarExample: {
      natural: "I enjoy playing tennis.",
      unnatural: "I enjoy to play tennis.",
      note: "Verbs like 'enjoy', 'mind', and 'avoid' are followed by a gerund (-ing form), not an infinitive."
    },
    speakingPrompts: [
      "What do you like doing in your free time?",
      "Describe a hobby you've always wanted to try.",
      "Ask me about my weekend activities."
    ]
  },
  {
    day: 9,
    level: "Beginner",
    topic: "Weather & Seasons",
    description: "Make small talk about the weather.",
    example: "It looks like it might rain later.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Make%20small%20talk",
    goals: [
      "Describe current weather conditions",
      "Talk about favorite seasons",
      "Discuss weather forecasts",
      "Make small talk using weather"
    ],
    pronunciationNotes: "Pay attention to the \"th\" sound in \"weather\" (/ð/) and the vowel sounds in season names.",
    vocabulary: [
      {
        word: "Temperature",
        pronunciation: "/ˈtɛmprətʃər/",
        meaning: "The degree or intensity of heat present in a substance or object",
        exampleSentence: "The temperature dropped below freezing."
      },
      {
        word: "Forecast",
        pronunciation: "/ˈfɔːrkæst/",
        meaning: "Predict or estimate a future event or trend",
        exampleSentence: "The weather forecast predicts rain tomorrow."
      }
    ],
    grammarExample: {
      natural: "It looks like it's going to rain.",
      unnatural: "It looks like it will rain.",
      note: "Use 'going to' for predictions based on present evidence (e.g., seeing dark clouds)."
    },
    speakingPrompts: [
      "What is your favorite season and why?",
      "Describe the weather today in your city.",
      "Make small talk about the weather with a cashier."
    ]
  },
  {
    day: 10,
    level: "Beginner",
    topic: "Describing People & Places",
    description: "Use adjectives to describe the world around you.",
    example: "My hometown is very quiet and peaceful.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Use%20adjectives%20to",
    goals: [
      "Describe physical appearance",
      "Describe a room or house",
      "Talk about your hometown",
      "Use comparative adjectives"
    ],
    pronunciationNotes: "Practice word stress in multi-syllable adjectives (e.g., BEAU-ti-ful, ex-PEN-sive).",
    vocabulary: [
      {
        word: "Appearance",
        pronunciation: "/əˈpɪərəns/",
        meaning: "The way that someone or something looks",
        exampleSentence: "He cares too much about his appearance."
      },
      {
        word: "Gorgeous",
        pronunciation: "/ˈɡɔːrdʒəs/",
        meaning: "Beautiful, very attractive",
        exampleSentence: "The sunset over the ocean was gorgeous."
      }
    ],
    grammarExample: {
      natural: "My hometown is very peaceful.",
      unnatural: "My hometown is too peaceful.",
      note: "'Very' means a lot, while 'too' has a negative connotation meaning 'more than acceptable'."
    },
    speakingPrompts: [
      "Describe the room you are currently in.",
      "What does your best friend look like?",
      "Compare your hometown to a big city."
    ]
  },
  {
    day: 11,
    level: "Intermediate",
    topic: "Making Plans & Appointments",
    description: "Schedule meetings and social events.",
    example: "Are you free to meet next Tuesday?",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Schedule%20meetings%20and",
    goals: [
      "Suggest a time and place",
      "Accept or decline an invitation politely",
      "Reschedule an appointment",
      "Confirm details of a meeting"
    ],
    pronunciationNotes: "Use rising intonation when suggesting a time to sound polite and open to alternatives.",
    vocabulary: [
      {
        word: "Appointment",
        pronunciation: "/əˈpɔɪntmənt/",
        meaning: "An arrangement to meet someone at a particular time and place",
        exampleSentence: "I have a doctor's appointment at 3 PM."
      },
      {
        word: "Available",
        pronunciation: "/əˈveɪləbl/",
        meaning: "Able to be used or obtained",
        exampleSentence: "Are you available for a quick call tomorrow?"
      }
    ],
    grammarExample: {
      natural: "Are you free on Tuesday?",
      unnatural: "Are you free in Tuesday?",
      note: "Always use 'on' for days of the week, and 'in' for months or years."
    },
    speakingPrompts: [
      "Invite a friend to have lunch this weekend.",
      "Politely decline an invitation to a party.",
      "Call to reschedule a dentist appointment."
    ]
  },
  {
    day: 12,
    level: "Intermediate",
    topic: "Opinions & Preferences",
    description: "Express what you think and why.",
    example: "In my opinion, this is the best option.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Express%20what%20you",
    goals: [
      "Say \"I think...\" or \"In my opinion...\"",
      "Agree and disagree politely",
      "Compare two different options",
      "Provide reasons for your opinions"
    ],
    pronunciationNotes: "Practice emphasizing the key word that carries your opinion (e.g., \"I STRONGLY disagree\").",
    vocabulary: [
      {
        word: "Opinion",
        pronunciation: "/əˈpɪnjən/",
        meaning: "A view or judgment formed about something",
        exampleSentence: "In my opinion, we should wait."
      },
      {
        word: "Preference",
        pronunciation: "/ˈprɛfərəns/",
        meaning: "A greater liking for one alternative over another or others",
        exampleSentence: "My preference is to work from home."
      }
    ],
    grammarExample: {
      natural: "I strongly agree with you.",
      unnatural: "I am agree with you.",
      note: "'Agree' is a verb, not an adjective. So we say 'I agree', never 'I am agree'."
    },
    speakingPrompts: [
      "Express your opinion on working from home.",
      "Politely disagree with someone who says winter is the best season.",
      "Compare two popular movies and share your preference."
    ]
  },
  {
    day: 13,
    level: "Intermediate",
    topic: "Health & Wellness",
    description: "Talk about feeling sick or staying healthy.",
    example: "It's important to maintain a balanced diet.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Talk%20about%20feeling",
    goals: [
      "Describe symptoms to a doctor",
      "Give advice for a cold or minor illness",
      "Discuss exercise and diet",
      "Understand basic medical instructions"
    ],
    pronunciationNotes: "Ensure clear pronunciation of common ailments (e.g., ache sounds like \"ake\").",
    vocabulary: [
      {
        word: "Symptom",
        pronunciation: "/ˈsɪmptəm/",
        meaning: "A physical or mental feature which is regarded as indicating a condition of disease",
        exampleSentence: "A fever is a common symptom of the flu."
      },
      {
        word: "Medicine",
        pronunciation: "/ˈmɛdɪsn/",
        meaning: "A compound or preparation used for the treatment or prevention of disease",
        exampleSentence: "Take this medicine twice a day."
      }
    ],
    grammarExample: {
      natural: "I have a headache.",
      unnatural: "I have headache.",
      note: "Use the indefinite article 'a' with most aches and pains (a headache, a cold, a cough)."
    },
    speakingPrompts: [
      "Describe your symptoms to a doctor.",
      "What advice would you give someone with a bad cold?",
      "Talk about your exercise routine."
    ]
  },
  {
    day: 14,
    level: "Intermediate",
    topic: "Work & Professions",
    description: "Discuss jobs and career paths.",
    example: "I am responsible for managing the sales team.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Discuss%20jobs%20and",
    goals: [
      "Describe your job responsibilities",
      "Talk about dream jobs",
      "Discuss workplace environment",
      "Explain career progression"
    ],
    pronunciationNotes: "Practice the pronunciation of specific industry terms relevant to your field.",
    vocabulary: [
      {
        word: "Colleague",
        pronunciation: "/ˈkɒliːɡ/",
        meaning: "A person with whom one works in a profession or business",
        exampleSentence: "My colleague helped me with the project."
      },
      {
        word: "Responsibility",
        pronunciation: "/rɪˌspɒnsɪˈbɪlɪti/",
        meaning: "The state or fact of having a duty to deal with something",
        exampleSentence: "Managing the budget is my main responsibility."
      }
    ],
    grammarExample: {
      natural: "I work as a developer.",
      unnatural: "I work like a developer.",
      note: "Use 'as' to talk about a job or role. 'Like' is used for comparisons."
    },
    speakingPrompts: [
      "Describe your daily responsibilities at work.",
      "What would be your dream job?",
      "Talk about a helpful colleague you've worked with."
    ]
  },
  {
    day: 15,
    level: "Intermediate",
    topic: "Travel & Vacations",
    description: "Share stories from past trips.",
    example: "Last weekend, I went to the park.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Share%20stories%20from",
    goals: [
      "Use past tense to describe a trip",
      "Talk about travel problems and solutions",
      "Recommend a destination",
      "Describe cultural experiences"
    ],
    pronunciationNotes: "Focus on the correct pronunciation of regular past tense \"-ed\" endings (/t/, /d/, or /ɪd/).",
    vocabulary: [
      {
        word: "Itinerary",
        pronunciation: "/aɪˈtɪnərəri/",
        meaning: "A planned route or journey",
        exampleSentence: "Let's plan our travel itinerary."
      },
      {
        word: "Accommodation",
        pronunciation: "/əˌkɒməˈdeɪʃən/",
        meaning: "A room, group of rooms, or building in which someone may live or stay",
        exampleSentence: "We need to book our accommodation early."
      }
    ],
    grammarExample: {
      natural: "I went to Paris last year.",
      unnatural: "I have gone to Paris last year.",
      note: "Use the simple past, not present perfect, when specifying a finished time in the past ('last year')."
    },
    speakingPrompts: [
      "Tell a story about a memorable trip you took.",
      "What do you look for in a good vacation destination?",
      "Describe a travel problem you faced and how you solved it."
    ]
  },
  {
    day: 16,
    level: "Intermediate",
    topic: "Technology & Social Media",
    description: "Discuss the digital world.",
    example: "I spend too much time scrolling through social media.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Discuss%20the%20digital",
    goals: [
      "Talk about smartphone usage",
      "Discuss pros and cons of social media",
      "Explain how to use an app",
      "Debate technology's impact on society"
    ],
    pronunciationNotes: "Practice common tech acronyms and ensure they are pronounced as individual letters (e.g., A-I, U-I).",
    vocabulary: [
      {
        word: "Algorithm",
        pronunciation: "/ˈælɡərɪðəm/",
        meaning: "A process or set of rules to be followed in calculations or other problem-solving operations",
        exampleSentence: "The algorithm recommends videos I like."
      },
      {
        word: "Privacy",
        pronunciation: "/ˈprɪvəsi/",
        meaning: "The state or condition of being free from being observed or disturbed by other people",
        exampleSentence: "Privacy is a major concern on social media."
      }
    ],
    grammarExample: {
      natural: "I'm looking forward to talking to you.",
      unnatural: "I'm looking forward to talk to you.",
      note: "The phrase 'look forward to' is followed by a gerund (-ing form), as 'to' is a preposition here."
    },
    speakingPrompts: [
      "What are the pros and cons of social media?",
      "How much time do you spend on your phone daily?",
      "Debate whether technology makes us more isolated."
    ]
  },
  {
    day: 17,
    level: "Intermediate",
    topic: "Entertainment & Media",
    description: "Review movies, books, and music.",
    example: "Listening to classical music helps me concentrate.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Review%20movies%2C%20books%2C",
    goals: [
      "Summarize a movie plot",
      "Recommend a book",
      "Discuss music genres",
      "Critique a piece of media"
    ],
    pronunciationNotes: "Use expressive intonation to convey enthusiasm or disappointment when reviewing media.",
    vocabulary: [
      {
        word: "Genre",
        pronunciation: "/ˈʒɒnrə/",
        meaning: "A category of artistic composition",
        exampleSentence: "My favorite genre of music is jazz."
      },
      {
        word: "Recommend",
        pronunciation: "/ˌrɛkəˈmɛnd/",
        meaning: "Put forward (someone or something) with approval as being suitable for a particular purpose or role",
        exampleSentence: "I highly recommend reading this novel."
      }
    ],
    grammarExample: {
      natural: "The movie was really boring.",
      unnatural: "The movie was really bored.",
      note: "Use '-ing' adjectives (boring) to describe the cause of a feeling, and '-ed' adjectives (bored) to describe the feeling itself."
    },
    speakingPrompts: [
      "Review a movie you watched recently.",
      "Recommend your favorite book or artist.",
      "Discuss how music genres affect your mood."
    ]
  },
  {
    day: 18,
    level: "Intermediate",
    topic: "Cultural Differences",
    description: "Talk about customs and traditions.",
    example: "In my country, it is customary to bow when greeting.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Talk%20about%20customs",
    goals: [
      "Describe a local festival",
      "Compare customs between countries",
      "Discuss food etiquette",
      "Explain a cultural misunderstanding"
    ],
    pronunciationNotes: "Speak clearly and at a moderate pace when explaining unfamiliar cultural concepts.",
    vocabulary: [
      {
        word: "Etiquette",
        pronunciation: "/ˈɛtɪkɛt/",
        meaning: "The customary code of polite behavior in society or among members of a particular profession or group",
        exampleSentence: "Table etiquette varies by culture."
      },
      {
        word: "Tradition",
        pronunciation: "/trəˈdɪʃən/",
        meaning: "The transmission of customs or beliefs from generation to generation",
        exampleSentence: "It's a tradition to gather on holidays."
      }
    ],
    grammarExample: {
      natural: "I'm used to eating dinner late.",
      unnatural: "I used to eating dinner late.",
      note: "'Be used to' (meaning accustomed to) takes an -ing verb. 'Used to' (past habit) takes a base verb."
    },
    speakingPrompts: [
      "Describe a cultural festival from your country.",
      "Talk about a misunderstanding caused by cultural differences.",
      "Explain dining etiquette in your culture."
    ]
  },
  {
    day: 19,
    level: "Intermediate",
    topic: "Handling Problems & Complaints",
    description: "Resolve issues politely but firmly.",
    example: "I'm afraid there is a problem with my order.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Resolve%20issues%20politely",
    goals: [
      "Return an item to a store",
      "Complain about a hotel room",
      "Apologize for a mistake",
      "Propose a solution to a problem"
    ],
    pronunciationNotes: "Maintain a calm and polite tone, even when expressing dissatisfaction.",
    vocabulary: [
      {
        word: "Apologize",
        pronunciation: "/əˈpɒlədʒaɪz/",
        meaning: "Express regret for something that one has done wrong",
        exampleSentence: "I apologize for the delay."
      },
      {
        word: "Resolution",
        pronunciation: "/ˌrɛzəˈluːʃən/",
        meaning: "A firm decision to do or not to do something",
        exampleSentence: "We reached a resolution after a long discussion."
      }
    ],
    grammarExample: {
      natural: "Could you please help me with this?",
      unnatural: "You must help me with this.",
      note: "'Could you please' leaves room for the other person, whereas 'must' is an obligation and sounds demanding."
    },
    speakingPrompts: [
      "Roleplay complaining about cold food at a restaurant.",
      "How would you apologize for missing a meeting?",
      "Propose a solution to a difficult coworker."
    ]
  },
  {
    day: 20,
    level: "Intermediate",
    topic: "Future Goals & Aspirations",
    description: "Talk about what you want to achieve.",
    example: "I hope to start my own business in the next five years.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Talk%20about%20what",
    goals: [
      "Use future tense (will/going to)",
      "Discuss 5-year plans",
      "Talk about learning goals",
      "Express hopes and ambitions"
    ],
    pronunciationNotes: "Practice the reduced form of \"going to\" (\"gonna\") for more natural, informal speech.",
    vocabulary: [
      {
        word: "Aspiration",
        pronunciation: "/ˌæspɪˈreɪʃən/",
        meaning: "A hope or ambition of achieving something",
        exampleSentence: "Her main aspiration is to become a doctor."
      },
      {
        word: "Achieve",
        pronunciation: "/əˈtʃiːv/",
        meaning: "Successfully bring about or reach (a desired objective or result) by effort, skill, or courage",
        exampleSentence: "You have to work hard to achieve your dreams."
      }
    ],
    grammarExample: {
      natural: "I'll help you with that.",
      unnatural: "I help you with that.",
      note: "Use 'will' (\\'ll) for spontaneous decisions, offers, and promises made at the moment of speaking."
    },
    speakingPrompts: [
      "Where do you see yourself in five years?",
      "What is a major goal you've set for this year?",
      "Talk about the steps needed to achieve your English goals."
    ]
  },
  {
    day: 21,
    level: "Advanced",
    topic: "Job Interviews",
    description: "Practice answering common interview questions.",
    example: "My greatest strength is my attention to detail.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Practice%20answering%20common",
    goals: [
      "Answer \"Tell me about yourself\"",
      "Discuss strengths and weaknesses",
      "Explain why you want the job",
      "Ask appropriate questions to the interviewer"
    ],
    pronunciationNotes: "Speak confidently and avoid filler words (um, ah) to sound more professional.",
    vocabulary: [
      {
        word: "Strengths",
        pronunciation: "/strɛŋθs/",
        meaning: "A good or beneficial quality or attribute of a person or thing",
        exampleSentence: "Communication is one of my strengths."
      },
      {
        word: "Weakness",
        pronunciation: "/ˈwiːknəs/",
        meaning: "A quality or feature regarded as a disadvantage or fault",
        exampleSentence: "My weakness is overthinking decisions."
      }
    ],
    grammarExample: {
      natural: "I have been working here for 3 years.",
      unnatural: "I am working here since 3 years.",
      note: "Use 'for' with a duration of time (3 years), and 'since' with a starting point (2020)."
    },
    speakingPrompts: [
      "Answer the question: 'Tell me about yourself.'",
      "How do you handle high-pressure situations?",
      "Discuss a time you overcame a professional challenge."
    ]
  },
  {
    day: 22,
    level: "Advanced",
    topic: "Professional Networking",
    description: "Make connections in a business setting.",
    example: "Our company is expanding into new international markets.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Make%20connections%20in",
    goals: [
      "Introduce yourself professionally",
      "Exchange contact information",
      "Make small talk at a conference",
      "Follow up after a networking event"
    ],
    pronunciationNotes: "Ensure your name and company name are pronounced clearly and distinctly.",
    vocabulary: [
      {
        word: "Conference",
        pronunciation: "/ˈkɒnfərəns/",
        meaning: "A formal meeting for discussion",
        exampleSentence: "I met many peers at the medical conference."
      },
      {
        word: "Exchange",
        pronunciation: "/ɪksˈtʃeɪndʒ/",
        meaning: "An act of giving one thing and receiving another (especially of the same type or value) in return",
        exampleSentence: "Let's exchange business cards."
      }
    ],
    grammarExample: {
      natural: "If I were you, I would reach out to him.",
      unnatural: "If I am you, I would reach out to him.",
      note: "Use 'were' instead of 'am/was' for hypothetical or unreal situations in the present (Second Conditional)."
    },
    speakingPrompts: [
      "Introduce yourself to a stranger at a networking event.",
      "How do you politely follow up with a contact after a conference?",
      "Make small talk before a business meeting begins."
    ]
  },
  {
    day: 23,
    level: "Advanced",
    topic: "Giving Presentations",
    description: "Structure and deliver a short talk.",
    example: "Today, I'd like to discuss our new marketing strategy.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Structure%20and%20deliver",
    goals: [
      "Introduce a topic clearly",
      "Transition smoothly between points",
      "Conclude effectively",
      "Handle Q&A sessions"
    ],
    pronunciationNotes: "Use pauses effectively to emphasize key points and give the audience time to absorb information.",
    vocabulary: [
      {
        word: "Transition",
        pronunciation: "/trænˈzɪʃən/",
        meaning: "The process or a period of changing from one state or condition to another",
        exampleSentence: "Let's transition to the next topic."
      },
      {
        word: "Conclude",
        pronunciation: "/kənˈkluːd/",
        meaning: "Bring (something) to an end",
        exampleSentence: "To conclude, sales have increased."
      }
    ],
    grammarExample: {
      natural: "Despite the rain, we went out.",
      unnatural: "Despite of the rain, we went out.",
      note: "'Despite' is never followed by 'of'. Use 'despite' or 'in spite of'."
    },
    speakingPrompts: [
      "Introduce the main topic of a mock presentation.",
      "Practice concluding a presentation and taking questions.",
      "How do you handle a question you don't know the answer to?"
    ]
  },
  {
    day: 24,
    level: "Advanced",
    topic: "Negotiating & Persuading",
    description: "Reach an agreement or convince someone.",
    example: "I completely agree with your point, however...",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Reach%20an%20agreement",
    goals: [
      "Make a formal proposal",
      "Compromise on a difficult point",
      "Use persuasive language techniques",
      "Close a deal or agreement"
    ],
    pronunciationNotes: "Use a firm but collaborative tone. Avoid sounding aggressive.",
    vocabulary: [
      {
        word: "Compromise",
        pronunciation: "/ˈkɒmprəmaɪz/",
        meaning: "An agreement or a settlement of a dispute that is reached by each side making concessions",
        exampleSentence: "We had to compromise on the budget."
      },
      {
        word: "Persuade",
        pronunciation: "/pərˈsweɪd/",
        meaning: "Cause (someone) to do something through reasoning or argument",
        exampleSentence: "She managed to persuade the client."
      }
    ],
    grammarExample: {
      natural: "Unless we act now, we'll lose out.",
      unnatural: "If we don't act now, we'll lose out.",
      note: "'Unless' means 'if not' and can make persuasive arguments sound more direct and professional."
    },
    speakingPrompts: [
      "Roleplay negotiating a higher salary.",
      "Persuade someone to invest in your business idea.",
      "How do you handle a disagreement during a negotiation?"
    ]
  },
  {
    day: 25,
    level: "Advanced",
    topic: "Discussing Current Events",
    description: "Talk about the news and global issues.",
    example: "Did you hear about the recent changes in the economy?",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Talk%20about%20the",
    goals: [
      "Summarize a complex news story",
      "Discuss the impact of a global event",
      "Share a nuanced perspective",
      "Debate a controversial topic respectfully"
    ],
    pronunciationNotes: "Practice pronouncing names of countries, leaders, and international organizations correctly.",
    vocabulary: [
      {
        word: "Nuanced",
        pronunciation: "/ˈnjuːɑːnst/",
        meaning: "Characterized by subtle shades of meaning or expression",
        exampleSentence: "The geopolitical situation is very nuanced."
      },
      {
        word: "Perspective",
        pronunciation: "/pərˈspɛktɪv/",
        meaning: "A particular attitude toward or way of regarding something; a point of view",
        exampleSentence: "He brings a unique perspective to the team."
      }
    ],
    grammarExample: {
      natural: "The economy has been growing recently.",
      unnatural: "The economy grows recently.",
      note: "Use present perfect continuous for actions starting in the past and continuing into the present, especially with 'recently'."
    },
    speakingPrompts: [
      "Summarize a news story you read this week.",
      "Share your perspective on artificial intelligence.",
      "Discuss how a global event impacts the local economy."
    ]
  },
  {
    day: 26,
    level: "Professional",
    topic: "Leadership & Management",
    description: "Discuss team dynamics and leadership.",
    example: "A good leader inspires and motivates their team.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Discuss%20team%20dynamics",
    goals: [
      "Give constructive feedback",
      "Motivate a team during a crisis",
      "Discuss different leadership styles",
      "Delegate tasks effectively"
    ],
    pronunciationNotes: "Use an encouraging and authoritative tone when roleplaying leadership scenarios.",
    vocabulary: [
      {
        word: "Constructive",
        pronunciation: "/kənˈstrʌktɪv/",
        meaning: "Serving a useful purpose; tending to build up",
        exampleSentence: "They gave me constructive feedback."
      },
      {
        word: "Motivate",
        pronunciation: "/ˈmoʊtɪveɪt/",
        meaning: "Provide (someone) with a motive for doing something",
        exampleSentence: "A good manager knows how to motivate people."
      }
    ],
    grammarExample: {
      natural: "You should have told me earlier.",
      unnatural: "You should tell me earlier.",
      note: "Use 'should have + past participle' to express regret or criticism about a past action."
    },
    speakingPrompts: [
      "Roleplay giving constructive feedback to a team member.",
      "How would you motivate a discouraged team?",
      "Describe the qualities of a great leader."
    ]
  },
  {
    day: 27,
    level: "Professional",
    topic: "Conflict Resolution",
    description: "Handle difficult conversations at work.",
    example: "Let's find a solution that works for everyone.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Handle%20difficult%20conversations",
    goals: [
      "De-escalate a tense situation",
      "Mediate a dispute between colleagues",
      "Find a win-win solution",
      "Address performance issues"
    ],
    pronunciationNotes: "Keep your voice steady and calm to help de-escalate tension.",
    vocabulary: [
      {
        word: "De-escalate",
        pronunciation: "/diːˈɛskəleɪt/",
        meaning: "Reduce the intensity of (a conflict or potentially violent situation)",
        exampleSentence: "He tried to de-escalate the argument."
      },
      {
        word: "Mediate",
        pronunciation: "/ˈmiːdieɪt/",
        meaning: "Intervene between people in a dispute in order to bring about an agreement or reconciliation",
        exampleSentence: "She was brought in to mediate the dispute."
      }
    ],
    grammarExample: {
      natural: "Had I known, I would have helped.",
      unnatural: "If I know, I would help.",
      note: "Inversion ('Had I known') sounds highly professional and is used for past hypotheticals (Third Conditional)."
    },
    speakingPrompts: [
      "Mediate a dispute between two coworkers over a missed deadline.",
      "How do you respond when someone blames you unfairly?",
      "De-escalate a conversation with an angry client."
    ]
  },
  {
    day: 28,
    level: "Professional",
    topic: "Advanced Vocabulary & Idioms",
    description: "Incorporate native-like expressions.",
    example: "We need to think outside the box on this project.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Incorporate%20native-like%20expressions.",
    goals: [
      "Use common business idioms naturally",
      "Understand phrasal verbs in context",
      "Sound more natural and fluent",
      "Avoid common translation errors"
    ],
    pronunciationNotes: "Focus on the rhythm and stress patterns of idioms, as they often differ from literal phrases.",
    vocabulary: [
      {
        word: "Incorporate",
        pronunciation: "/ɪnˈkɔːrpəreɪt/",
        meaning: "Take in or contain (something) as part of a whole; include",
        exampleSentence: "We need to incorporate their feedback."
      },
      {
        word: "Fluent",
        pronunciation: "/ˈfluːənt/",
        meaning: "(of a person) able to express oneself easily and articulately",
        exampleSentence: "She speaks fluent Spanish and French."
      }
    ],
    grammarExample: {
      natural: "It's high time we changed our strategy.",
      unnatural: "It's high time we change our strategy.",
      note: "The expression 'It\\'s high time' is followed by the past tense to refer to the present or future."
    },
    speakingPrompts: [
      "Use three business idioms in a short paragraph.",
      "Describe a time you had to 'think outside the box'.",
      "Explain what it means to 'get the ball rolling' on a project."
    ]
  },
  {
    day: 29,
    level: "Professional",
    topic: "Public Speaking Practice",
    description: "Deliver a longer, persuasive speech.",
    example: "I urge you to consider the long-term benefits.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Deliver%20a%20longer%2C",
    goals: [
      "Use rhetorical devices effectively",
      "Control pacing and tone for impact",
      "Engage and hold the audience's attention",
      "Handle unexpected interruptions"
    ],
    pronunciationNotes: "Practice varying your volume and pitch to keep the speech dynamic and engaging.",
    vocabulary: [
      {
        word: "Rhetorical",
        pronunciation: "/rɪˈtɒrɪkəl/",
        meaning: "Expressed in terms intended to persuade or impress",
        exampleSentence: "He asked a rhetorical question to make a point."
      },
      {
        word: "Audience",
        pronunciation: "/ˈɔːdiəns/",
        meaning: "The assembled spectators or listeners at a public event",
        exampleSentence: "The audience clapped loudly."
      }
    ],
    grammarExample: {
      natural: "Not only is he smart, but he's also kind.",
      unnatural: "He is not only smart but also he is kind.",
      note: "Inverting the subject and verb after 'Not only' at the beginning of a sentence adds rhetorical emphasis."
    },
    speakingPrompts: [
      "Deliver a 1-minute persuasive pitch for a product.",
      "How do you recover if you make a mistake during a speech?",
      "Practice engaging an audience that seems distracted."
    ]
  },
  {
    day: 30,
    level: "Professional",
    topic: "Final Assessment & Open Conversation",
    description: "Test your skills across various topics.",
    example: "It has been a great journey improving my English.",
    youtubeLink: "https://www.youtube.com/results?search_query=learn+english+Test%20your%20skills",
    goals: [
      "Maintain a long, complex conversation",
      "Switch topics smoothly and naturally",
      "Reflect on your progress and set new goals",
      "Demonstrate mastery of previous vocabulary"
    ],
    pronunciationNotes: "Focus on overall fluency and natural rhythm rather than over-correcting minor errors.",
    vocabulary: [
      {
        word: "Assessment",
        pronunciation: "/əˈsɛsmənt/",
        meaning: "The evaluation or estimation of the nature, quality, or ability of someone or something",
        exampleSentence: "The final assessment covers all chapters."
      },
      {
        word: "Reflect",
        pronunciation: "/rɪˈflɛkt/",
        meaning: "Think deeply or carefully about",
        exampleSentence: "Take a moment to reflect on your progress."
      }
    ],
    grammarExample: {
      natural: "I wish I had studied more.",
      unnatural: "I wish I studied more.",
      note: "Use 'wish + past perfect' to express regret about the past."
    },
    speakingPrompts: [
      "Reflect on your English learning journey so far.",
      "What are your top three priorities for next month?",
      "Maintain a 2-minute free speech on any topic you choose."
    ]
  }
];
