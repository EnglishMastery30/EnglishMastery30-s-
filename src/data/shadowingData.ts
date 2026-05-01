export interface ShadowingItem {
  id: string;
  text: string;
  caption: string;
  answer?: string;
}

export const DASHBOARD_DAYS = [
  { "id": 1, "title": "Day 1: Real Life" },
  { "id": 2, "title": "Day 2: Office" },
  { "id": 3, "title": "Day 3: Restaurant" },
  { "id": 4, "title": "Day 4: Party" },
  { "id": 5, "title": "Day 5: Events" },
  { "id": 6, "title": "Day 6: Emotions" }
];

export const SHADOWING_DATA: Record<number, ShadowingItem[]> = {
  "1": [
    {
      "id": "d1-0",
      "text": "How are you doing today?",
      "caption": "Sentence 1"
    },
    {
      "id": "d1-1",
      "text": "I'm feeling great, thanks for asking.",
      "caption": "Sentence 2"
    },
    {
      "id": "d1-2",
      "text": "Did you sleep well last night?",
      "caption": "Sentence 3"
    },
    {
      "id": "d1-3",
      "text": "Yes, I slept for eight hours.",
      "caption": "Sentence 4"
    },
    {
      "id": "d1-4",
      "text": "What time did you wake up today?",
      "caption": "Sentence 5"
    },
    {
      "id": "d1-5",
      "text": "I woke up at seven in the morning.",
      "caption": "Sentence 6"
    },
    {
      "id": "d1-6",
      "text": "Have you had breakfast yet?",
      "caption": "Sentence 7"
    },
    {
      "id": "d1-7",
      "text": "Yes, I had some toast and coffee.",
      "caption": "Sentence 8"
    },
    {
      "id": "d1-8",
      "text": "What are your plans for today?",
      "caption": "Sentence 9"
    },
    {
      "id": "d1-9",
      "text": "I need to go to the grocery store.",
      "caption": "Sentence 10"
    },
    {
      "id": "d1-10",
      "text": "Are you working today?",
      "caption": "Sentence 11"
    },
    {
      "id": "d1-11",
      "text": "No, it is my day off.",
      "caption": "Sentence 12"
    },
    {
      "id": "d1-12",
      "text": "Do you want to grab lunch later?",
      "caption": "Sentence 13"
    },
    {
      "id": "d1-13",
      "text": "That sounds like a great idea.",
      "caption": "Sentence 14"
    },
    {
      "id": "d1-14",
      "text": "Where should we go for lunch?",
      "caption": "Sentence 15"
    },
    {
      "id": "d1-15",
      "text": "Let's try that new Italian place.",
      "caption": "Sentence 16"
    },
    {
      "id": "d1-16",
      "text": "Okay, I will meet you there at noon.",
      "caption": "Sentence 17"
    },
    {
      "id": "d1-17",
      "text": "How is the weather outside?",
      "caption": "Sentence 18"
    },
    {
      "id": "d1-18",
      "text": "It is sunny and quite warm.",
      "caption": "Sentence 19"
    },
    {
      "id": "d1-19",
      "text": "Did you bring a jacket?",
      "caption": "Sentence 20"
    },
    {
      "id": "d1-20",
      "text": "No, I didn't think I would need one.",
      "caption": "Sentence 21"
    },
    {
      "id": "d1-21",
      "text": "Are you enjoying the nice weather?",
      "caption": "Sentence 22"
    },
    {
      "id": "d1-22",
      "text": "Yes, I love this time of year.",
      "caption": "Sentence 23"
    },
    {
      "id": "d1-23",
      "text": "What have you been up to lately?",
      "caption": "Sentence 24"
    },
    {
      "id": "d1-24",
      "text": "Just working and spending time with family.",
      "caption": "Sentence 25"
    },
    {
      "id": "d1-25",
      "text": "Have you seen any good movies recently?",
      "caption": "Sentence 26"
    },
    {
      "id": "d1-26",
      "text": "I watched a great comedy last night.",
      "caption": "Sentence 27"
    },
    {
      "id": "d1-27",
      "text": "Do you like going to the cinema?",
      "caption": "Sentence 28"
    },
    {
      "id": "d1-28",
      "text": "Yes, I try to go once a month.",
      "caption": "Sentence 29"
    },
    {
      "id": "d1-29",
      "text": "What is your favorite kind of movie?",
      "caption": "Sentence 30"
    },
    {
      "id": "d1-30",
      "text": "I really enjoy action movies.",
      "caption": "Sentence 31"
    },
    {
      "id": "d1-31",
      "text": "Are you reading any good books?",
      "caption": "Sentence 32"
    },
    {
      "id": "d1-32",
      "text": "Yes, I am reading a novel right now.",
      "caption": "Sentence 33"
    },
    {
      "id": "d1-33",
      "text": "Do you prefer reading or watching TV?",
      "caption": "Sentence 34"
    },
    {
      "id": "d1-34",
      "text": "I like both, depending on my mood.",
      "caption": "Sentence 35"
    },
    {
      "id": "d1-35",
      "text": "Did you do anything fun this weekend?",
      "caption": "Sentence 36"
    },
    {
      "id": "d1-36",
      "text": "I went hiking with some friends.",
      "caption": "Sentence 37"
    },
    {
      "id": "d1-37",
      "text": "Where did you go hiking?",
      "caption": "Sentence 38"
    },
    {
      "id": "d1-38",
      "text": "We went to the mountains nearby.",
      "caption": "Sentence 39"
    },
    {
      "id": "d1-39",
      "text": "Was it a difficult trail?",
      "caption": "Sentence 40"
    },
    {
      "id": "d1-40",
      "text": "It was a bit steep, but fun.",
      "caption": "Sentence 41"
    },
    {
      "id": "d1-41",
      "text": "Did you take any pictures?",
      "caption": "Sentence 42"
    },
    {
      "id": "d1-42",
      "text": "Yes, the views were beautiful.",
      "caption": "Sentence 43"
    },
    {
      "id": "d1-43",
      "text": "Do you exercise regularly?",
      "caption": "Sentence 44"
    },
    {
      "id": "d1-44",
      "text": "I try to go to the gym three times a week.",
      "caption": "Sentence 45"
    },
    {
      "id": "d1-45",
      "text": "What kind of exercise do you do?",
      "caption": "Sentence 46"
    },
    {
      "id": "d1-46",
      "text": "I mostly do weightlifting and running.",
      "caption": "Sentence 47"
    },
    {
      "id": "d1-47",
      "text": "Are you training for something specific?",
      "caption": "Sentence 48"
    },
    {
      "id": "d1-48",
      "text": "No, just trying to stay healthy.",
      "caption": "Sentence 49"
    },
    {
      "id": "d1-49",
      "text": "What is your favorite food?",
      "caption": "Sentence 50"
    },
    {
      "id": "d1-50",
      "text": "I really love pizza.",
      "caption": "Sentence 51"
    },
    {
      "id": "d1-51",
      "text": "Do you know how to cook?",
      "caption": "Sentence 52"
    },
    {
      "id": "d1-52",
      "text": "Yes, I cook dinner almost every night.",
      "caption": "Sentence 53"
    },
    {
      "id": "d1-53",
      "text": "What is your best dish?",
      "caption": "Sentence 54"
    },
    {
      "id": "d1-54",
      "text": "I make a really good pasta.",
      "caption": "Sentence 55"
    },
    {
      "id": "d1-55",
      "text": "Can you share the recipe with me?",
      "caption": "Sentence 56"
    },
    {
      "id": "d1-56",
      "text": "Of course, I will send it to you.",
      "caption": "Sentence 57"
    },
    {
      "id": "d1-57",
      "text": "Are you going to the party tonight?",
      "caption": "Sentence 58"
    },
    {
      "id": "d1-58",
      "text": "Yes, I am planning to be there.",
      "caption": "Sentence 59"
    },
    {
      "id": "d1-59",
      "text": "What time does it start?",
      "caption": "Sentence 60"
    },
    {
      "id": "d1-60",
      "text": "It starts around eight o'clock.",
      "caption": "Sentence 61"
    },
    {
      "id": "d1-61",
      "text": "Who else is going to be there?",
      "caption": "Sentence 62"
    },
    {
      "id": "d1-62",
      "text": "Most of our friends should be there.",
      "caption": "Sentence 63"
    },
    {
      "id": "d1-63",
      "text": "Do you need a ride to the party?",
      "caption": "Sentence 64"
    },
    {
      "id": "d1-64",
      "text": "No thanks, I will drive myself.",
      "caption": "Sentence 65"
    },
    {
      "id": "d1-65",
      "text": "Where is the party happening?",
      "caption": "Sentence 66"
    },
    {
      "id": "d1-66",
      "text": "It is at Sarah's house.",
      "caption": "Sentence 67"
    },
    {
      "id": "d1-67",
      "text": "Did you buy her a gift?",
      "caption": "Sentence 68"
    },
    {
      "id": "d1-68",
      "text": "Yes, I got her a book she wanted.",
      "caption": "Sentence 69"
    },
    {
      "id": "d1-69",
      "text": "That is very thoughtful of you.",
      "caption": "Sentence 70"
    },
    {
      "id": "d1-70",
      "text": "I hope she likes it.",
      "caption": "Sentence 71"
    },
    {
      "id": "d1-71",
      "text": "Have you finished your homework?",
      "caption": "Sentence 72"
    },
    {
      "id": "d1-72",
      "text": "Almost, I just have one more assignment.",
      "caption": "Sentence 73"
    },
    {
      "id": "d1-73",
      "text": "What subject are you studying?",
      "caption": "Sentence 74"
    },
    {
      "id": "d1-74",
      "text": "I am studying mathematics.",
      "caption": "Sentence 75"
    },
    {
      "id": "d1-75",
      "text": "Is it difficult to learn?",
      "caption": "Sentence 76"
    },
    {
      "id": "d1-76",
      "text": "It can be challenging sometimes.",
      "caption": "Sentence 77"
    },
    {
      "id": "d1-77",
      "text": "Do you need any help with it?",
      "caption": "Sentence 78"
    },
    {
      "id": "d1-78",
      "text": "No, I think I understand it now.",
      "caption": "Sentence 79"
    },
    {
      "id": "d1-79",
      "text": "What do you do for work?",
      "caption": "Sentence 80"
    },
    {
      "id": "d1-80",
      "text": "I work as a software developer.",
      "caption": "Sentence 81"
    },
    {
      "id": "d1-81",
      "text": "Do you enjoy your job?",
      "caption": "Sentence 82"
    },
    {
      "id": "d1-82",
      "text": "Yes, it is very interesting work.",
      "caption": "Sentence 83"
    },
    {
      "id": "d1-83",
      "text": "How long have you worked there?",
      "caption": "Sentence 84"
    },
    {
      "id": "d1-84",
      "text": "I have been there for three years.",
      "caption": "Sentence 85"
    },
    {
      "id": "d1-85",
      "text": "Do you work from home or in an office?",
      "caption": "Sentence 86"
    },
    {
      "id": "d1-86",
      "text": "I work from home most days.",
      "caption": "Sentence 87"
    },
    {
      "id": "d1-87",
      "text": "Do you like working from home?",
      "caption": "Sentence 88"
    },
    {
      "id": "d1-88",
      "text": "Yes, it saves me a lot of time.",
      "caption": "Sentence 89"
    },
    {
      "id": "d1-89",
      "text": "What do you do in your free time?",
      "caption": "Sentence 90"
    },
    {
      "id": "d1-90",
      "text": "I like to play basketball and read.",
      "caption": "Sentence 91"
    },
    {
      "id": "d1-91",
      "text": "Are you on a basketball team?",
      "caption": "Sentence 92"
    },
    {
      "id": "d1-92",
      "text": "Just a local recreational team.",
      "caption": "Sentence 93"
    },
    {
      "id": "d1-93",
      "text": "How often do you practice?",
      "caption": "Sentence 94"
    },
    {
      "id": "d1-94",
      "text": "We practice every Tuesday evening.",
      "caption": "Sentence 95"
    },
    {
      "id": "d1-95",
      "text": "Do you ever go to live games?",
      "caption": "Sentence 96"
    },
    {
      "id": "d1-96",
      "text": "Yes, I try to go once a season.",
      "caption": "Sentence 97"
    },
    {
      "id": "d1-97",
      "text": "Do you play any musical instruments?",
      "caption": "Sentence 98"
    },
    {
      "id": "d1-98",
      "text": "I know how to play the guitar.",
      "caption": "Sentence 99"
    },
    {
      "id": "d1-99",
      "text": "How long have you been playing?",
      "caption": "Sentence 100"
    },
    {
      "id": "d1-100",
      "text": "I started playing when I was younger.",
      "caption": "Sentence 101"
    },
    {
      "id": "d1-101",
      "text": "Can you play my favorite song?",
      "caption": "Sentence 102"
    },
    {
      "id": "d1-102",
      "text": "If you tell me what it is, I can try.",
      "caption": "Sentence 103"
    },
    {
      "id": "d1-103",
      "text": "Have you ever performed on stage?",
      "caption": "Sentence 104"
    },
    {
      "id": "d1-104",
      "text": "Only a few times at school.",
      "caption": "Sentence 105"
    },
    {
      "id": "d1-105",
      "text": "Do you have a pet?",
      "caption": "Sentence 106"
    },
    {
      "id": "d1-106",
      "text": "Yes, I have a large dog.",
      "caption": "Sentence 107"
    },
    {
      "id": "d1-107",
      "text": "What is your dog's name?",
      "caption": "Sentence 108"
    }
  ],
  "2": [
    {
      "id": "d2-0",
      "text": "Good morning, everyone.",
      "caption": "Sentence 1"
    },
    {
      "id": "d2-1",
      "text": "Let's start the meeting now.",
      "caption": "Sentence 2"
    },
    {
      "id": "d2-2",
      "text": "Can you hear me clearly?",
      "caption": "Sentence 3"
    },
    {
      "id": "d2-3",
      "text": "Yes, your audio is fine.",
      "caption": "Sentence 4"
    },
    {
      "id": "d2-4",
      "text": "Is everyone present today?",
      "caption": "Sentence 5"
    },
    {
      "id": "d2-5",
      "text": "I think we are waiting for John.",
      "caption": "Sentence 6"
    },
    {
      "id": "d2-6",
      "text": "He mentioned he would be late.",
      "caption": "Sentence 7"
    },
    {
      "id": "d2-7",
      "text": "Okay, we will proceed without him for now.",
      "caption": "Sentence 8"
    },
    {
      "id": "d2-8",
      "text": "Did everyone receive the agenda?",
      "caption": "Sentence 9"
    },
    {
      "id": "d2-9",
      "text": "Yes, I reviewed it this morning.",
      "caption": "Sentence 10"
    },
    {
      "id": "d2-10",
      "text": "What is the first item on the list?",
      "caption": "Sentence 11"
    },
    {
      "id": "d2-11",
      "text": "We need to discuss the new project.",
      "caption": "Sentence 12"
    },
    {
      "id": "d2-12",
      "text": "What is the current status of the project?",
      "caption": "Sentence 13"
    },
    {
      "id": "d2-13",
      "text": "We are currently in the planning phase.",
      "caption": "Sentence 14"
    },
    {
      "id": "d2-14",
      "text": "When is the deadline for this?",
      "caption": "Sentence 15"
    },
    {
      "id": "d2-15",
      "text": "The deadline is at the end of the month.",
      "caption": "Sentence 16"
    },
    {
      "id": "d2-16",
      "text": "Do we have enough resources?",
      "caption": "Sentence 17"
    },
    {
      "id": "d2-17",
      "text": "We might need additional budget.",
      "caption": "Sentence 18"
    },
    {
      "id": "d2-18",
      "text": "Who is leading the design team?",
      "caption": "Sentence 19"
    },
    {
      "id": "d2-19",
      "text": "Sarah is the lead designer.",
      "caption": "Sentence 20"
    },
    {
      "id": "d2-20",
      "text": "Has she submitted the initial drafts?",
      "caption": "Sentence 21"
    },
    {
      "id": "d2-21",
      "text": "Yes, they were uploaded yesterday.",
      "caption": "Sentence 22"
    },
    {
      "id": "d2-22",
      "text": "Could you share your screen?",
      "caption": "Sentence 23"
    },
    {
      "id": "d2-23",
      "text": "Sure, let me present the document.",
      "caption": "Sentence 24"
    },
    {
      "id": "d2-24",
      "text": "Can everyone see my screen?",
      "caption": "Sentence 25"
    },
    {
      "id": "d2-25",
      "text": "Yes, it is visible.",
      "caption": "Sentence 26"
    },
    {
      "id": "d2-26",
      "text": "Please go to the second slide.",
      "caption": "Sentence 27"
    },
    {
      "id": "d2-27",
      "text": "Here are the quarterly sales figures.",
      "caption": "Sentence 28"
    },
    {
      "id": "d2-28",
      "text": "Our revenue has increased this quarter.",
      "caption": "Sentence 29"
    },
    {
      "id": "d2-29",
      "text": "That is excellent news.",
      "caption": "Sentence 30"
    },
    {
      "id": "d2-30",
      "text": "What contributed to this growth?",
      "caption": "Sentence 31"
    },
    {
      "id": "d2-31",
      "text": "Our marketing campaign was highly effective.",
      "caption": "Sentence 32"
    },
    {
      "id": "d2-32",
      "text": "We should continue with that strategy.",
      "caption": "Sentence 33"
    },
    {
      "id": "d2-33",
      "text": "I agree, we should allocate more funds to marketing.",
      "caption": "Sentence 34"
    },
    {
      "id": "d2-34",
      "text": "Let's move on to the next topic.",
      "caption": "Sentence 35"
    },
    {
      "id": "d2-35",
      "text": "We have some client feedback to review.",
      "caption": "Sentence 36"
    },
    {
      "id": "d2-36",
      "text": "What are the main concerns?",
      "caption": "Sentence 37"
    },
    {
      "id": "d2-37",
      "text": "Several clients requested faster shipping.",
      "caption": "Sentence 38"
    },
    {
      "id": "d2-38",
      "text": "Can we expedite the delivery process?",
      "caption": "Sentence 39"
    },
    {
      "id": "d2-39",
      "text": "We are looking into new logistics partners.",
      "caption": "Sentence 40"
    },
    {
      "id": "d2-40",
      "text": "How long will that take to resolve?",
      "caption": "Sentence 41"
    },
    {
      "id": "d2-41",
      "text": "We expect a solution by next week.",
      "caption": "Sentence 42"
    },
    {
      "id": "d2-42",
      "text": "Please keep me updated on the progress.",
      "caption": "Sentence 43"
    },
    {
      "id": "d2-43",
      "text": "I will send you a daily report.",
      "caption": "Sentence 44"
    },
    {
      "id": "d2-44",
      "text": "Does anyone have any questions?",
      "caption": "Sentence 45"
    },
    {
      "id": "d2-45",
      "text": "I have a question about the budget.",
      "caption": "Sentence 46"
    },
    {
      "id": "d2-46",
      "text": "Go ahead, what is your question?",
      "caption": "Sentence 47"
    },
    {
      "id": "d2-47",
      "text": "Are we approved for the software upgrade?",
      "caption": "Sentence 48"
    },
    {
      "id": "d2-48",
      "text": "Yes, the request was approved yesterday.",
      "caption": "Sentence 49"
    },
    {
      "id": "d2-49",
      "text": "When will the installation begin?",
      "caption": "Sentence 50"
    },
    {
      "id": "d2-50",
      "text": "IT will start the rollout on Friday.",
      "caption": "Sentence 51"
    },
    {
      "id": "d2-51",
      "text": "Will there be any downtime?",
      "caption": "Sentence 52"
    },
    {
      "id": "d2-52",
      "text": "Expect the servers to be offline for an hour.",
      "caption": "Sentence 53"
    },
    {
      "id": "d2-53",
      "text": "Please notify the entire staff beforehand.",
      "caption": "Sentence 54"
    },
    {
      "id": "d2-54",
      "text": "I will send an email by the end of the day.",
      "caption": "Sentence 55"
    },
    {
      "id": "d2-55",
      "text": "Are there any other issues to discuss?",
      "caption": "Sentence 56"
    },
    {
      "id": "d2-56",
      "text": "We need to plan the company retreat.",
      "caption": "Sentence 57"
    },
    {
      "id": "d2-57",
      "text": "Do we have a location in mind?",
      "caption": "Sentence 58"
    },
    {
      "id": "d2-58",
      "text": "We are thinking about a mountain resort.",
      "caption": "Sentence 59"
    },
    {
      "id": "d2-59",
      "text": "That sounds like a great idea.",
      "caption": "Sentence 60"
    },
    {
      "id": "d2-60",
      "text": "We need a committee to organize it.",
      "caption": "Sentence 61"
    },
    {
      "id": "d2-61",
      "text": "I volunteer to lead the committee.",
      "caption": "Sentence 62"
    },
    {
      "id": "d2-62",
      "text": "Thank you, I appreciate your help.",
      "caption": "Sentence 63"
    },
    {
      "id": "d2-63",
      "text": "We will need a budget estimate soon.",
      "caption": "Sentence 64"
    },
    {
      "id": "d2-64",
      "text": "I will have it ready by next Monday.",
      "caption": "Sentence 65"
    },
    {
      "id": "d2-65",
      "text": "Let's schedule a follow-up meeting.",
      "caption": "Sentence 66"
    },
    {
      "id": "d2-66",
      "text": "Does Thursday at two o'clock work?",
      "caption": "Sentence 67"
    },
    {
      "id": "d2-67",
      "text": "Thursday afternoon is clear for me.",
      "caption": "Sentence 68"
    },
    {
      "id": "d2-68",
      "text": "I am also available at that time.",
      "caption": "Sentence 69"
    },
    {
      "id": "d2-69",
      "text": "I have a conflict on Thursday.",
      "caption": "Sentence 70"
    },
    {
      "id": "d2-70",
      "text": "Can we move it to Friday instead?",
      "caption": "Sentence 71"
    },
    {
      "id": "d2-71",
      "text": "Friday at ten in the morning is fine.",
      "caption": "Sentence 72"
    },
    {
      "id": "d2-72",
      "text": "I will send the calendar invite shortly.",
      "caption": "Sentence 73"
    },
    {
      "id": "d2-73",
      "text": "Before we conclude, I have an announcement.",
      "caption": "Sentence 74"
    },
    {
      "id": "d2-74",
      "text": "We have a new team member joining us.",
      "caption": "Sentence 75"
    },
    {
      "id": "d2-75",
      "text": "Please welcome Alex to the marketing team.",
      "caption": "Sentence 76"
    },
    {
      "id": "d2-76",
      "text": "Welcome to the company, Alex.",
      "caption": "Sentence 77"
    },
    {
      "id": "d2-77",
      "text": "Thank you, I am excited to be here.",
      "caption": "Sentence 78"
    },
    {
      "id": "d2-78",
      "text": "Alex will be working on the social media campaigns.",
      "caption": "Sentence 79"
    },
    {
      "id": "d2-79",
      "text": "We look forward to your contributions.",
      "caption": "Sentence 80"
    },
    {
      "id": "d2-80",
      "text": "I think that covers everything for today.",
      "caption": "Sentence 81"
    },
    {
      "id": "d2-81",
      "text": "Are there any final comments?",
      "caption": "Sentence 82"
    },
    {
      "id": "d2-82",
      "text": "Nothing further from my end.",
      "caption": "Sentence 83"
    },
    {
      "id": "d2-83",
      "text": "Please remember to fill out your timesheets.",
      "caption": "Sentence 84"
    },
    {
      "id": "d2-84",
      "text": "The HR department needs them by tomorrow.",
      "caption": "Sentence 85"
    },
    {
      "id": "d2-85",
      "text": "If there is nothing else, we will adjourn.",
      "caption": "Sentence 86"
    },
    {
      "id": "d2-86",
      "text": "Thank you all for your participation.",
      "caption": "Sentence 87"
    },
    {
      "id": "d2-87",
      "text": "Have a productive day, everyone.",
      "caption": "Sentence 88"
    },
    {
      "id": "d2-88",
      "text": "I will forward the meeting minutes later.",
      "caption": "Sentence 89"
    },
    {
      "id": "d2-89",
      "text": "Make sure to read through the client notes.",
      "caption": "Sentence 90"
    },
    {
      "id": "d2-90",
      "text": "I will review them before making changes.",
      "caption": "Sentence 91"
    },
    {
      "id": "d2-91",
      "text": "Can you send me the link to that file?",
      "caption": "Sentence 92"
    },
    {
      "id": "d2-92",
      "text": "I just sent it to you on the chat.",
      "caption": "Sentence 93"
    },
    {
      "id": "d2-93",
      "text": "I received it, thank you.",
      "caption": "Sentence 94"
    },
    {
      "id": "d2-94",
      "text": "Let me know if you need access permissions.",
      "caption": "Sentence 95"
    },
    {
      "id": "d2-95",
      "text": "I think I already have edit access.",
      "caption": "Sentence 96"
    },
    {
      "id": "d2-96",
      "text": "Perfect, we are good to go.",
      "caption": "Sentence 97"
    },
    {
      "id": "d2-97",
      "text": "I need to leave now for another call.",
      "caption": "Sentence 98"
    },
    {
      "id": "d2-98",
      "text": "Goodbye, talk to you later.",
      "caption": "Sentence 99"
    },
    {
      "id": "d2-99",
      "text": "Take care, bye.",
      "caption": "Sentence 100"
    },
    {
      "id": "d2-100",
      "text": "Have a great weekend.",
      "caption": "Sentence 101"
    },
    {
      "id": "d2-101",
      "text": "Good morning, everyone.",
      "caption": "Sentence 102"
    },
    {
      "id": "d2-102",
      "text": "Let's start the meeting now.",
      "caption": "Sentence 103"
    },
    {
      "id": "d2-103",
      "text": "Can you hear me clearly?",
      "caption": "Sentence 104"
    },
    {
      "id": "d2-104",
      "text": "Yes, your audio is fine.",
      "caption": "Sentence 105"
    },
    {
      "id": "d2-105",
      "text": "Is everyone present today?",
      "caption": "Sentence 106"
    },
    {
      "id": "d2-106",
      "text": "I think we are waiting for John.",
      "caption": "Sentence 107"
    },
    {
      "id": "d2-107",
      "text": "He mentioned he would be late.",
      "caption": "Sentence 108"
    }
  ],
  "3": [
    {
      "id": "d3-0",
      "text": "Good evening, welcome to the restaurant.",
      "caption": "Sentence 1"
    },
    {
      "id": "d3-1",
      "text": "Do you have a reservation?",
      "caption": "Sentence 2"
    },
    {
      "id": "d3-2",
      "text": "Yes, under the name Smith.",
      "caption": "Sentence 3"
    },
    {
      "id": "d3-3",
      "text": "For a party of four?",
      "caption": "Sentence 4"
    },
    {
      "id": "d3-4",
      "text": "Yes, that is correct.",
      "caption": "Sentence 5"
    },
    {
      "id": "d3-5",
      "text": "Right this way, please.",
      "caption": "Sentence 6"
    },
    {
      "id": "d3-6",
      "text": "Here is your table.",
      "caption": "Sentence 7"
    },
    {
      "id": "d3-7",
      "text": "Could we have a table by the window?",
      "caption": "Sentence 8"
    },
    {
      "id": "d3-8",
      "text": "Let me check if one is available.",
      "caption": "Sentence 9"
    },
    {
      "id": "d3-9",
      "text": "Yes, we can move you over there.",
      "caption": "Sentence 10"
    },
    {
      "id": "d3-10",
      "text": "Thank you very much.",
      "caption": "Sentence 11"
    },
    {
      "id": "d3-11",
      "text": "Here are your menus.",
      "caption": "Sentence 12"
    },
    {
      "id": "d3-12",
      "text": "Can I start you off with something to drink?",
      "caption": "Sentence 13"
    },
    {
      "id": "d3-13",
      "text": "Yes, I will have a glass of water.",
      "caption": "Sentence 14"
    },
    {
      "id": "d3-14",
      "text": "Sparkling or still water?",
      "caption": "Sentence 15"
    },
    {
      "id": "d3-15",
      "text": "Just tap water is fine, please.",
      "caption": "Sentence 16"
    },
    {
      "id": "d3-16",
      "text": "I would like a glass of red wine.",
      "caption": "Sentence 17"
    },
    {
      "id": "d3-17",
      "text": "Which wine would you recommend?",
      "caption": "Sentence 18"
    },
    {
      "id": "d3-18",
      "text": "The house pinot noir is very good.",
      "caption": "Sentence 19"
    },
    {
      "id": "d3-19",
      "text": "I will take a glass of that, then.",
      "caption": "Sentence 20"
    },
    {
      "id": "d3-20",
      "text": "Could I get a soda with ice?",
      "caption": "Sentence 21"
    },
    {
      "id": "d3-21",
      "text": "Certainly, I will be right back with your drinks.",
      "caption": "Sentence 22"
    },
    {
      "id": "d3-22",
      "text": "Are you ready to order appetizers?",
      "caption": "Sentence 23"
    },
    {
      "id": "d3-23",
      "text": "Yes, we would like the garlic bread.",
      "caption": "Sentence 24"
    },
    {
      "id": "d3-24",
      "text": "And also the spinach dip, please.",
      "caption": "Sentence 25"
    },
    {
      "id": "d3-25",
      "text": "Excellent choices. Are you ready for the main course?",
      "caption": "Sentence 26"
    },
    {
      "id": "d3-26",
      "text": "We need a few more minutes.",
      "caption": "Sentence 27"
    },
    {
      "id": "d3-27",
      "text": "Take your time, I will check back soon.",
      "caption": "Sentence 28"
    },
    {
      "id": "d3-28",
      "text": "What are today's specials?",
      "caption": "Sentence 29"
    },
    {
      "id": "d3-29",
      "text": "We have a grilled salmon and a mushroom risotto.",
      "caption": "Sentence 30"
    },
    {
      "id": "d3-30",
      "text": "How is the salmon prepared?",
      "caption": "Sentence 31"
    },
    {
      "id": "d3-31",
      "text": "It is pan-seared with a lemon butter sauce.",
      "caption": "Sentence 32"
    },
    {
      "id": "d3-32",
      "text": "That sounds delicious, I will have that.",
      "caption": "Sentence 33"
    },
    {
      "id": "d3-33",
      "text": "Does the steak come with sides?",
      "caption": "Sentence 34"
    },
    {
      "id": "d3-34",
      "text": "It comes with mashed potatoes and asparagus.",
      "caption": "Sentence 35"
    },
    {
      "id": "d3-35",
      "text": "How would you like your steak cooked?",
      "caption": "Sentence 36"
    },
    {
      "id": "d3-36",
      "text": "Medium rare, please.",
      "caption": "Sentence 37"
    },
    {
      "id": "d3-37",
      "text": "I will have the chicken alfredo pasta.",
      "caption": "Sentence 38"
    },
    {
      "id": "d3-38",
      "text": "Can I get that without onions?",
      "caption": "Sentence 39"
    },
    {
      "id": "d3-39",
      "text": "Yes, we can make it without onions.",
      "caption": "Sentence 40"
    },
    {
      "id": "d3-40",
      "text": "I am allergic to peanuts.",
      "caption": "Sentence 41"
    },
    {
      "id": "d3-41",
      "text": "I will make sure the kitchen is aware.",
      "caption": "Sentence 42"
    },
    {
      "id": "d3-42",
      "text": "Is the soup of the day vegetarian?",
      "caption": "Sentence 43"
    },
    {
      "id": "d3-43",
      "text": "Yes, it is a tomato basil soup.",
      "caption": "Sentence 44"
    },
    {
      "id": "d3-44",
      "text": "I will have a bowl of the soup as well.",
      "caption": "Sentence 45"
    },
    {
      "id": "d3-45",
      "text": "Would you like a side salad with your meal?",
      "caption": "Sentence 46"
    },
    {
      "id": "d3-46",
      "text": "Yes, with vinaigrette dressing.",
      "caption": "Sentence 47"
    },
    {
      "id": "d3-47",
      "text": "Could I have the dressing on the side?",
      "caption": "Sentence 48"
    },
    {
      "id": "d3-48",
      "text": "Of course, no problem.",
      "caption": "Sentence 49"
    },
    {
      "id": "d3-49",
      "text": "Your food will be out shortly.",
      "caption": "Sentence 50"
    },
    {
      "id": "d3-50",
      "text": "Here are your appetizers.",
      "caption": "Sentence 51"
    },
    {
      "id": "d3-51",
      "text": "Enjoy your meal.",
      "caption": "Sentence 52"
    },
    {
      "id": "d3-52",
      "text": "Everything looks wonderful.",
      "caption": "Sentence 53"
    },
    {
      "id": "d3-53",
      "text": "Could we get some extra napkins?",
      "caption": "Sentence 54"
    },
    {
      "id": "d3-54",
      "text": "Right away, let me grab those for you.",
      "caption": "Sentence 55"
    },
    {
      "id": "d3-55",
      "text": "How is everything tasting so far?",
      "caption": "Sentence 56"
    },
    {
      "id": "d3-56",
      "text": "The food is absolutely excellent.",
      "caption": "Sentence 57"
    },
    {
      "id": "d3-57",
      "text": "My steak is perfectly cooked.",
      "caption": "Sentence 58"
    },
    {
      "id": "d3-58",
      "text": "Is there anything else I can get you?",
      "caption": "Sentence 59"
    },
    {
      "id": "d3-59",
      "text": "Could I have a refill on my soda?",
      "caption": "Sentence 60"
    },
    {
      "id": "d3-60",
      "text": "Certainly, I will bring it right out.",
      "caption": "Sentence 61"
    },
    {
      "id": "d3-61",
      "text": "Excuse me, we dropped a fork.",
      "caption": "Sentence 62"
    },
    {
      "id": "d3-62",
      "text": "I will bring you a clean one immediately.",
      "caption": "Sentence 63"
    },
    {
      "id": "d3-63",
      "text": "We are ready for our plates to be cleared.",
      "caption": "Sentence 64"
    },
    {
      "id": "d3-64",
      "text": "Did you save room for dessert?",
      "caption": "Sentence 65"
    },
    {
      "id": "d3-65",
      "text": "Yes, what do you have for dessert?",
      "caption": "Sentence 66"
    },
    {
      "id": "d3-66",
      "text": "We have chocolate cake and cheesecake.",
      "caption": "Sentence 67"
    },
    {
      "id": "d3-67",
      "text": "I will have a slice of the chocolate cake.",
      "caption": "Sentence 68"
    },
    {
      "id": "d3-68",
      "text": "Could we get two spoons to share it?",
      "caption": "Sentence 69"
    },
    {
      "id": "d3-69",
      "text": "Yes, I will bring extra utensils.",
      "caption": "Sentence 70"
    },
    {
      "id": "d3-70",
      "text": "Would anyone care for coffee or tea?",
      "caption": "Sentence 71"
    },
    {
      "id": "d3-71",
      "text": "I would love a cup of black coffee.",
      "caption": "Sentence 72"
    },
    {
      "id": "d3-72",
      "text": "Do you have decaffeinated coffee?",
      "caption": "Sentence 73"
    },
    {
      "id": "d3-73",
      "text": "Yes, we can definitely do decaf.",
      "caption": "Sentence 74"
    },
    {
      "id": "d3-74",
      "text": "Could I get some cream and sugar?",
      "caption": "Sentence 75"
    },
    {
      "id": "d3-75",
      "text": "I will bring some right to the table.",
      "caption": "Sentence 76"
    },
    {
      "id": "d3-76",
      "text": "Could we get the check, please?",
      "caption": "Sentence 77"
    },
    {
      "id": "d3-77",
      "text": "Are we splitting the bill or paying together?",
      "caption": "Sentence 78"
    },
    {
      "id": "d3-78",
      "text": "We would like to split it down the middle.",
      "caption": "Sentence 79"
    },
    {
      "id": "d3-79",
      "text": "We will put it all on one card.",
      "caption": "Sentence 80"
    },
    {
      "id": "d3-80",
      "text": "No problem, I will take care of that.",
      "caption": "Sentence 81"
    },
    {
      "id": "d3-81",
      "text": "Does the bill include a service charge?",
      "caption": "Sentence 82"
    },
    {
      "id": "d3-82",
      "text": "Gratuity is automatically included for large parties.",
      "caption": "Sentence 83"
    },
    {
      "id": "d3-83",
      "text": "Can I pay with contactless?",
      "caption": "Sentence 84"
    },
    {
      "id": "d3-84",
      "text": "Yes, our machine takes Apple Pay.",
      "caption": "Sentence 85"
    },
    {
      "id": "d3-85",
      "text": "Here is your receipt.",
      "caption": "Sentence 86"
    },
    {
      "id": "d3-86",
      "text": "Thank you for your excellent service.",
      "caption": "Sentence 87"
    },
    {
      "id": "d3-87",
      "text": "You are very welcome, have a great evening.",
      "caption": "Sentence 88"
    },
    {
      "id": "d3-88",
      "text": "We hope to see you again soon.",
      "caption": "Sentence 89"
    },
    {
      "id": "d3-89",
      "text": "Could you call us a taxi?",
      "caption": "Sentence 90"
    },
    {
      "id": "d3-90",
      "text": "Certainly, it should be here in five minutes.",
      "caption": "Sentence 91"
    },
    {
      "id": "d3-91",
      "text": "Where is the restroom located?",
      "caption": "Sentence 92"
    },
    {
      "id": "d3-92",
      "text": "It is down the hallway and to the left.",
      "caption": "Sentence 93"
    },
    {
      "id": "d3-93",
      "text": "Do you have a coat check?",
      "caption": "Sentence 94"
    },
    {
      "id": "d3-94",
      "text": "Yes, right at the front entrance.",
      "caption": "Sentence 95"
    },
    {
      "id": "d3-95",
      "text": "I left my umbrella under the table.",
      "caption": "Sentence 96"
    },
    {
      "id": "d3-96",
      "text": "Let me go retrieve that for you.",
      "caption": "Sentence 97"
    },
    {
      "id": "d3-97",
      "text": "Thank you, you have been very helpful.",
      "caption": "Sentence 98"
    },
    {
      "id": "d3-98",
      "text": "Goodnight, and safe travels home.",
      "caption": "Sentence 99"
    },
    {
      "id": "d3-99",
      "text": "Good evening, welcome to the restaurant.",
      "caption": "Sentence 100"
    },
    {
      "id": "d3-100",
      "text": "Do you have a reservation?",
      "caption": "Sentence 101"
    },
    {
      "id": "d3-101",
      "text": "Yes, under the name Smith.",
      "caption": "Sentence 102"
    },
    {
      "id": "d3-102",
      "text": "For a party of four?",
      "caption": "Sentence 103"
    },
    {
      "id": "d3-103",
      "text": "Yes, that is correct.",
      "caption": "Sentence 104"
    },
    {
      "id": "d3-104",
      "text": "Right this way, please.",
      "caption": "Sentence 105"
    },
    {
      "id": "d3-105",
      "text": "Here is your table.",
      "caption": "Sentence 106"
    },
    {
      "id": "d3-106",
      "text": "Could we have a table by the window?",
      "caption": "Sentence 107"
    },
    {
      "id": "d3-107",
      "text": "Let me check if one is available.",
      "caption": "Sentence 108"
    }
  ],
  "4": [
    {
      "id": "d4-0",
      "text": "Thank you so much for coming tonight.",
      "caption": "Sentence 1"
    },
    {
      "id": "d4-1",
      "text": "It is so nice to see you.",
      "caption": "Sentence 2"
    },
    {
      "id": "d4-2",
      "text": "I haven't seen you in such a long time.",
      "caption": "Sentence 3"
    },
    {
      "id": "d4-3",
      "text": "How have things been?",
      "caption": "Sentence 4"
    },
    {
      "id": "d4-4",
      "text": "Everything has been going really well.",
      "caption": "Sentence 5"
    },
    {
      "id": "d4-5",
      "text": "You look fantastic.",
      "caption": "Sentence 6"
    },
    {
      "id": "d4-6",
      "text": "I love your dress, where did you get it?",
      "caption": "Sentence 7"
    },
    {
      "id": "d4-7",
      "text": "Thank you, I bought it last week.",
      "caption": "Sentence 8"
    },
    {
      "id": "d4-8",
      "text": "Let me introduce you to my friend.",
      "caption": "Sentence 9"
    },
    {
      "id": "d4-9",
      "text": "This is Daniel, we work together.",
      "caption": "Sentence 10"
    },
    {
      "id": "d4-10",
      "text": "Nice to meet you, Daniel.",
      "caption": "Sentence 11"
    },
    {
      "id": "d4-11",
      "text": "It is a pleasure to meet you too.",
      "caption": "Sentence 12"
    },
    {
      "id": "d4-12",
      "text": "Can I get you something to drink?",
      "caption": "Sentence 13"
    },
    {
      "id": "d4-13",
      "text": "Yes, what do you have?",
      "caption": "Sentence 14"
    },
    {
      "id": "d4-14",
      "text": "We have wine, beer, and some soda.",
      "caption": "Sentence 15"
    },
    {
      "id": "d4-15",
      "text": "I will just have a soda for now.",
      "caption": "Sentence 16"
    },
    {
      "id": "d4-16",
      "text": "Where is the food located?",
      "caption": "Sentence 17"
    },
    {
      "id": "d4-17",
      "text": "The snacks are in the kitchen.",
      "caption": "Sentence 18"
    },
    {
      "id": "d4-18",
      "text": "Please help yourself to anything.",
      "caption": "Sentence 19"
    },
    {
      "id": "d4-19",
      "text": "The music here is great.",
      "caption": "Sentence 20"
    },
    {
      "id": "d4-20",
      "text": "Did you choose the playlist?",
      "caption": "Sentence 21"
    },
    {
      "id": "d4-21",
      "text": "Yes, I spent a lot of time on it.",
      "caption": "Sentence 22"
    },
    {
      "id": "d4-22",
      "text": "Who is the host of this party?",
      "caption": "Sentence 23"
    },
    {
      "id": "d4-23",
      "text": "Our friend Michael is hosting.",
      "caption": "Sentence 24"
    },
    {
      "id": "d4-24",
      "text": "Did you bring anything for the party?",
      "caption": "Sentence 25"
    },
    {
      "id": "d4-25",
      "text": "I brought some chips and dip.",
      "caption": "Sentence 26"
    },
    {
      "id": "d4-26",
      "text": "Where should I put my coat?",
      "caption": "Sentence 27"
    },
    {
      "id": "d4-27",
      "text": "You can throw it on the bed upstairs.",
      "caption": "Sentence 28"
    },
    {
      "id": "d4-28",
      "text": "Do you know many people here?",
      "caption": "Sentence 29"
    },
    {
      "id": "d4-29",
      "text": "Only a few, it's mostly new faces.",
      "caption": "Sentence 30"
    },
    {
      "id": "d4-30",
      "text": "What do you do for fun?",
      "caption": "Sentence 31"
    },
    {
      "id": "d4-31",
      "text": "I usually play video games on weekends.",
      "caption": "Sentence 32"
    },
    {
      "id": "d4-32",
      "text": "Are you enjoying the party so far?",
      "caption": "Sentence 33"
    },
    {
      "id": "d4-33",
      "text": "Yes, it is really fun.",
      "caption": "Sentence 34"
    },
    {
      "id": "d4-34",
      "text": "The decorations look amazing.",
      "caption": "Sentence 35"
    },
    {
      "id": "d4-35",
      "text": "I think they did a great job setting up.",
      "caption": "Sentence 36"
    },
    {
      "id": "d4-36",
      "text": "Excuse me, I am going to grab another drink.",
      "caption": "Sentence 37"
    },
    {
      "id": "d4-37",
      "text": "I will come with you.",
      "caption": "Sentence 38"
    },
    {
      "id": "d4-38",
      "text": "Do you mind if I sit here?",
      "caption": "Sentence 39"
    },
    {
      "id": "d4-39",
      "text": "Not at all, have a seat.",
      "caption": "Sentence 40"
    },
    {
      "id": "d4-40",
      "text": "Is this your first time at Michael's house?",
      "caption": "Sentence 41"
    },
    {
      "id": "d4-41",
      "text": "Yes, he has a really nice place.",
      "caption": "Sentence 42"
    },
    {
      "id": "d4-42",
      "text": "I love his living room.",
      "caption": "Sentence 43"
    },
    {
      "id": "d4-43",
      "text": "Did you hear the latest news?",
      "caption": "Sentence 44"
    },
    {
      "id": "d4-44",
      "text": "No, what happened?",
      "caption": "Sentence 45"
    },
    {
      "id": "d4-45",
      "text": "Sarah finally got that promotion.",
      "caption": "Sentence 46"
    },
    {
      "id": "d4-46",
      "text": "That is wonderful news.",
      "caption": "Sentence 47"
    },
    {
      "id": "d4-47",
      "text": "We should congratulate her later.",
      "caption": "Sentence 48"
    },
    {
      "id": "d4-48",
      "text": "I need to use the restroom.",
      "caption": "Sentence 49"
    },
    {
      "id": "d4-49",
      "text": "It is just down the hall on the right.",
      "caption": "Sentence 50"
    },
    {
      "id": "d4-50",
      "text": "Who is that person talking to John?",
      "caption": "Sentence 51"
    },
    {
      "id": "d4-51",
      "text": "That is his sister, Emily.",
      "caption": "Sentence 52"
    },
    {
      "id": "d4-52",
      "text": "I didn't know he had a sister.",
      "caption": "Sentence 53"
    },
    {
      "id": "d4-53",
      "text": "Yes, she is visiting from out of town.",
      "caption": "Sentence 54"
    },
    {
      "id": "d4-54",
      "text": "Let's go say hello to them.",
      "caption": "Sentence 55"
    },
    {
      "id": "d4-55",
      "text": "Hey John, how are you doing?",
      "caption": "Sentence 56"
    },
    {
      "id": "d4-56",
      "text": "Hi guys, it is great to see you.",
      "caption": "Sentence 57"
    },
    {
      "id": "d4-57",
      "text": "Is it okay if we join your conversation?",
      "caption": "Sentence 58"
    },
    {
      "id": "d4-58",
      "text": "Of course, please jump right in.",
      "caption": "Sentence 59"
    },
    {
      "id": "d4-59",
      "text": "What were you talking about?",
      "caption": "Sentence 60"
    },
    {
      "id": "d4-60",
      "text": "We were discussing the new movie.",
      "caption": "Sentence 61"
    },
    {
      "id": "d4-61",
      "text": "Oh, I really want to see that.",
      "caption": "Sentence 62"
    },
    {
      "id": "d4-62",
      "text": "We should all go see it together.",
      "caption": "Sentence 63"
    },
    {
      "id": "d4-63",
      "text": "That sounds like a fun idea.",
      "caption": "Sentence 64"
    },
    {
      "id": "d4-64",
      "text": "The party is getting really crowded.",
      "caption": "Sentence 65"
    },
    {
      "id": "d4-65",
      "text": "It is getting a bit loud too.",
      "caption": "Sentence 66"
    },
    {
      "id": "d4-66",
      "text": "Do you want to step outside for some fresh air?",
      "caption": "Sentence 67"
    },
    {
      "id": "d4-67",
      "text": "Yes, let's go to the balcony.",
      "caption": "Sentence 68"
    },
    {
      "id": "d4-68",
      "text": "It is much quieter out here.",
      "caption": "Sentence 69"
    },
    {
      "id": "d4-69",
      "text": "The view of the city is beautiful.",
      "caption": "Sentence 70"
    },
    {
      "id": "d4-70",
      "text": "How late do you plan on staying?",
      "caption": "Sentence 71"
    },
    {
      "id": "d4-71",
      "text": "Probably until around midnight.",
      "caption": "Sentence 72"
    },
    {
      "id": "d4-72",
      "text": "I have to leave a bit early.",
      "caption": "Sentence 73"
    },
    {
      "id": "d4-73",
      "text": "I have to work early tomorrow morning.",
      "caption": "Sentence 74"
    },
    {
      "id": "d4-74",
      "text": "That is a shame, you will miss the cake.",
      "caption": "Sentence 75"
    },
    {
      "id": "d4-75",
      "text": "I know, but I really need to sleep.",
      "caption": "Sentence 76"
    },
    {
      "id": "d4-76",
      "text": "Well, it was great talking to you.",
      "caption": "Sentence 77"
    },
    {
      "id": "d4-77",
      "text": "Let's make sure we hang out soon.",
      "caption": "Sentence 78"
    },
    {
      "id": "d4-78",
      "text": "Yes, give me a call next week.",
      "caption": "Sentence 79"
    },
    {
      "id": "d4-79",
      "text": "I will definitely do that.",
      "caption": "Sentence 80"
    },
    {
      "id": "d4-80",
      "text": "Before you leave, say goodbye to Michael.",
      "caption": "Sentence 81"
    },
    {
      "id": "d4-81",
      "text": "I am going to look for him now.",
      "caption": "Sentence 82"
    },
    {
      "id": "d4-82",
      "text": "Hey Michael, thanks for having me.",
      "caption": "Sentence 83"
    },
    {
      "id": "d4-83",
      "text": "Thanks for coming, drive safe.",
      "caption": "Sentence 84"
    },
    {
      "id": "d4-84",
      "text": "Did someone park blocking the driveway?",
      "caption": "Sentence 85"
    },
    {
      "id": "d4-85",
      "text": "Oh, that might be my car.",
      "caption": "Sentence 86"
    },
    {
      "id": "d4-86",
      "text": "Can you move it so they can leave?",
      "caption": "Sentence 87"
    },
    {
      "id": "d4-87",
      "text": "Sure, I will do it right now.",
      "caption": "Sentence 88"
    },
    {
      "id": "d4-88",
      "text": "Has anyone seen my phone?",
      "caption": "Sentence 89"
    },
    {
      "id": "d4-89",
      "text": "I think I saw it on the kitchen counter.",
      "caption": "Sentence 90"
    },
    {
      "id": "d4-90",
      "text": "Thank you, I found it.",
      "caption": "Sentence 91"
    },
    {
      "id": "d4-91",
      "text": "Are we ordering pizza for late night?",
      "caption": "Sentence 92"
    },
    {
      "id": "d4-92",
      "text": "Yes, what toppings does everyone want?",
      "caption": "Sentence 93"
    },
    {
      "id": "d4-93",
      "text": "Just cheese and pepperoni is fine.",
      "caption": "Sentence 94"
    },
    {
      "id": "d4-94",
      "text": "This was a really great party.",
      "caption": "Sentence 95"
    },
    {
      "id": "d4-95",
      "text": "I had a fantastic time tonight.",
      "caption": "Sentence 96"
    },
    {
      "id": "d4-96",
      "text": "Thank you so much for coming tonight.",
      "caption": "Sentence 97"
    },
    {
      "id": "d4-97",
      "text": "It is so nice to see you.",
      "caption": "Sentence 98"
    },
    {
      "id": "d4-98",
      "text": "I haven't seen you in such a long time.",
      "caption": "Sentence 99"
    },
    {
      "id": "d4-99",
      "text": "How have things been?",
      "caption": "Sentence 100"
    },
    {
      "id": "d4-100",
      "text": "Everything has been going really well.",
      "caption": "Sentence 101"
    },
    {
      "id": "d4-101",
      "text": "You look fantastic.",
      "caption": "Sentence 102"
    },
    {
      "id": "d4-102",
      "text": "I love your dress, where did you get it?",
      "caption": "Sentence 103"
    },
    {
      "id": "d4-103",
      "text": "Thank you, I bought it last week.",
      "caption": "Sentence 104"
    },
    {
      "id": "d4-104",
      "text": "Let me introduce you to my friend.",
      "caption": "Sentence 105"
    },
    {
      "id": "d4-105",
      "text": "This is Daniel, we work together.",
      "caption": "Sentence 106"
    },
    {
      "id": "d4-106",
      "text": "Nice to meet you, Daniel.",
      "caption": "Sentence 107"
    },
    {
      "id": "d4-107",
      "text": "It is a pleasure to meet you too.",
      "caption": "Sentence 108"
    }
  ],
  "5": [
    {
      "id": "d5-0",
      "text": "Welcome to the annual tech conference.",
      "caption": "Sentence 1"
    },
    {
      "id": "d5-1",
      "text": "Please register at the front desk.",
      "caption": "Sentence 2"
    },
    {
      "id": "d5-2",
      "text": "Do you have your QR code ready?",
      "caption": "Sentence 3"
    },
    {
      "id": "d5-3",
      "text": "Yes, I have it on my phone.",
      "caption": "Sentence 4"
    },
    {
      "id": "d5-4",
      "text": "Here is your badge and schedule.",
      "caption": "Sentence 5"
    },
    {
      "id": "d5-5",
      "text": "Where is the main auditorium?",
      "caption": "Sentence 6"
    },
    {
      "id": "d5-6",
      "text": "It is straight down the hall and to the right.",
      "caption": "Sentence 7"
    },
    {
      "id": "d5-7",
      "text": "What time does the keynote speech begin?",
      "caption": "Sentence 8"
    },
    {
      "id": "d5-8",
      "text": "It starts promptly at nine o'clock.",
      "caption": "Sentence 9"
    },
    {
      "id": "d5-9",
      "text": "Are there any empty seats near the front?",
      "caption": "Sentence 10"
    },
    {
      "id": "d5-10",
      "text": "I think the first few rows are reserved.",
      "caption": "Sentence 11"
    },
    {
      "id": "d5-11",
      "text": "I will just sit here in the back.",
      "caption": "Sentence 12"
    },
    {
      "id": "d5-12",
      "text": "The speaker is very knowledgeable.",
      "caption": "Sentence 13"
    },
    {
      "id": "d5-13",
      "text": "I learned a lot from that presentation.",
      "caption": "Sentence 14"
    },
    {
      "id": "d5-14",
      "text": "Did you take any notes?",
      "caption": "Sentence 15"
    },
    {
      "id": "d5-15",
      "text": "Yes, I wrote down the main points.",
      "caption": "Sentence 16"
    },
    {
      "id": "d5-16",
      "text": "Will they share the slides later?",
      "caption": "Sentence 17"
    },
    {
      "id": "d5-17",
      "text": "They usually email them to attendees.",
      "caption": "Sentence 18"
    },
    {
      "id": "d5-18",
      "text": "Which workshop are you attending next?",
      "caption": "Sentence 19"
    },
    {
      "id": "d5-19",
      "text": "I am going to the session on artificial intelligence.",
      "caption": "Sentence 20"
    },
    {
      "id": "d5-20",
      "text": "That sounds very interesting.",
      "caption": "Sentence 21"
    },
    {
      "id": "d5-21",
      "text": "I think I might go to that one too.",
      "caption": "Sentence 22"
    },
    {
      "id": "d5-22",
      "text": "Have you been to the exhibition hall yet?",
      "caption": "Sentence 23"
    },
    {
      "id": "d5-23",
      "text": "No, I plan to check it out after lunch.",
      "caption": "Sentence 24"
    },
    {
      "id": "d5-24",
      "text": "There are a lot of interesting booths.",
      "caption": "Sentence 25"
    },
    {
      "id": "d5-25",
      "text": "I collected several business cards already.",
      "caption": "Sentence 26"
    },
    {
      "id": "d5-26",
      "text": "Are you going to the networking event tonight?",
      "caption": "Sentence 27"
    },
    {
      "id": "d5-27",
      "text": "Yes, I think it will be a good opportunity.",
      "caption": "Sentence 28"
    },
    {
      "id": "d5-28",
      "text": "We should try to meet the panel speakers.",
      "caption": "Sentence 29"
    },
    {
      "id": "d5-29",
      "text": "I have a few questions I would like to ask them.",
      "caption": "Sentence 30"
    },
    {
      "id": "d5-30",
      "text": "The catering for lunch is quite good.",
      "caption": "Sentence 31"
    },
    {
      "id": "d5-31",
      "text": "I was surprised by the variety of food.",
      "caption": "Sentence 32"
    },
    {
      "id": "d5-32",
      "text": "The lines for coffee are very long.",
      "caption": "Sentence 33"
    },
    {
      "id": "d5-33",
      "text": "I might just skip coffee for now.",
      "caption": "Sentence 34"
    },
    {
      "id": "d5-34",
      "text": "Excuse me, is this seat taken?",
      "caption": "Sentence 35"
    },
    {
      "id": "d5-35",
      "text": "No, please feel free to sit down.",
      "caption": "Sentence 36"
    },
    {
      "id": "d5-36",
      "text": "What company do you work for?",
      "caption": "Sentence 37"
    },
    {
      "id": "d5-37",
      "text": "I work for a startup in London.",
      "caption": "Sentence 38"
    },
    {
      "id": "d5-38",
      "text": "What kind of product does your company build?",
      "caption": "Sentence 39"
    },
    {
      "id": "d5-39",
      "text": "We focus on renewable energy tech.",
      "caption": "Sentence 40"
    },
    {
      "id": "d5-40",
      "text": "That is a rapidly growing industry.",
      "caption": "Sentence 41"
    },
    {
      "id": "d5-41",
      "text": "Do you have a business card?",
      "caption": "Sentence 42"
    },
    {
      "id": "d5-42",
      "text": "Yes, let's exchange contact information.",
      "caption": "Sentence 43"
    },
    {
      "id": "d5-43",
      "text": "It was great chatting with you.",
      "caption": "Sentence 44"
    },
    {
      "id": "d5-44",
      "text": "We should connect on LinkedIn.",
      "caption": "Sentence 45"
    },
    {
      "id": "d5-45",
      "text": "What was the highlight of the event for you?",
      "caption": "Sentence 46"
    },
    {
      "id": "d5-46",
      "text": "The panel discussion on future trends was excellent.",
      "caption": "Sentence 47"
    },
    {
      "id": "d5-47",
      "text": "I completely agree, it was very insightful.",
      "caption": "Sentence 48"
    },
    {
      "id": "d5-48",
      "text": "The schedule is very tightly packed.",
      "caption": "Sentence 49"
    },
    {
      "id": "d5-49",
      "text": "I am feeling a little exhausted.",
      "caption": "Sentence 50"
    },
    {
      "id": "d5-50",
      "text": "There is a short break coming up.",
      "caption": "Sentence 51"
    },
    {
      "id": "d5-51",
      "text": "Let's grab some water during the break.",
      "caption": "Sentence 52"
    },
    {
      "id": "d5-52",
      "text": "Did you get the wifi password?",
      "caption": "Sentence 53"
    },
    {
      "id": "d5-53",
      "text": "Yes, the network name is Guest, password is Event2024.",
      "caption": "Sentence 54"
    },
    {
      "id": "d5-54",
      "text": "My phone battery is running low.",
      "caption": "Sentence 55"
    },
    {
      "id": "d5-55",
      "text": "There are charging stations near the entrance.",
      "caption": "Sentence 56"
    },
    {
      "id": "d5-56",
      "text": "Thank you, I will go plug in my phone.",
      "caption": "Sentence 57"
    },
    {
      "id": "d5-57",
      "text": "Is recording the presentation allowed?",
      "caption": "Sentence 58"
    },
    {
      "id": "d5-58",
      "text": "Yes, but they asked us to silence our phones.",
      "caption": "Sentence 59"
    },
    {
      "id": "d5-59",
      "text": "Where is the Q&A microphone located?",
      "caption": "Sentence 60"
    },
    {
      "id": "d5-60",
      "text": "There are microphones in the center aisles.",
      "caption": "Sentence 61"
    },
    {
      "id": "d5-61",
      "text": "I hope they pick my question.",
      "caption": "Sentence 62"
    },
    {
      "id": "d5-62",
      "text": "The event app is very helpful.",
      "caption": "Sentence 63"
    },
    {
      "id": "d5-63",
      "text": "Yes, it sends notifications before sessions start.",
      "caption": "Sentence 64"
    },
    {
      "id": "d5-64",
      "text": "Are they doing a giveaway at the end?",
      "caption": "Sentence 65"
    },
    {
      "id": "d5-65",
      "text": "I believe there is a raffle during the closing ceremony.",
      "caption": "Sentence 66"
    },
    {
      "id": "d5-66",
      "text": "I never win anything in raffles.",
      "caption": "Sentence 67"
    },
    {
      "id": "d5-67",
      "text": "You never know, you might get lucky today.",
      "caption": "Sentence 68"
    },
    {
      "id": "d5-68",
      "text": "I need to step out to take a phone call.",
      "caption": "Sentence 69"
    },
    {
      "id": "d5-69",
      "text": "I will save your seat for you.",
      "caption": "Sentence 70"
    },
    {
      "id": "d5-70",
      "text": "How many attendees are here today?",
      "caption": "Sentence 71"
    },
    {
      "id": "d5-71",
      "text": "They said there are over a thousand people.",
      "caption": "Sentence 72"
    },
    {
      "id": "d5-72",
      "text": "That is a massive turnout.",
      "caption": "Sentence 73"
    },
    {
      "id": "d5-73",
      "text": "The organizers did a fantastic job.",
      "caption": "Sentence 74"
    },
    {
      "id": "d5-74",
      "text": "Everything is running perfectly on schedule.",
      "caption": "Sentence 75"
    },
    {
      "id": "d5-75",
      "text": "Have you been to this city before?",
      "caption": "Sentence 76"
    },
    {
      "id": "d5-76",
      "text": "No, this is my first time visiting.",
      "caption": "Sentence 77"
    },
    {
      "id": "d5-77",
      "text": "You should explore downtown if you have time.",
      "caption": "Sentence 78"
    },
    {
      "id": "d5-78",
      "text": "I hope to do some sightseeing tomorrow.",
      "caption": "Sentence 79"
    },
    {
      "id": "d5-79",
      "text": "The convention center is huge.",
      "caption": "Sentence 80"
    },
    {
      "id": "d5-80",
      "text": "I got lost trying to find the restroom earlier.",
      "caption": "Sentence 81"
    },
    {
      "id": "d5-81",
      "text": "They could use a few more signs.",
      "caption": "Sentence 82"
    },
    {
      "id": "d5-82",
      "text": "The closing remarks are starting soon.",
      "caption": "Sentence 83"
    },
    {
      "id": "d5-83",
      "text": "We should head back to the main hall.",
      "caption": "Sentence 84"
    },
    {
      "id": "d5-84",
      "text": "It was a very valuable experience.",
      "caption": "Sentence 85"
    },
    {
      "id": "d5-85",
      "text": "I am glad my manager sent me here.",
      "caption": "Sentence 86"
    },
    {
      "id": "d5-86",
      "text": "Are you going to attend again next year?",
      "caption": "Sentence 87"
    },
    {
      "id": "d5-87",
      "text": "I definitely hope to come back.",
      "caption": "Sentence 88"
    },
    {
      "id": "d5-88",
      "text": "I have to catch a flight in a few hours.",
      "caption": "Sentence 89"
    },
    {
      "id": "d5-89",
      "text": "Have a safe trip back home.",
      "caption": "Sentence 90"
    },
    {
      "id": "d5-90",
      "text": "Thank you, it was wonderful meeting you.",
      "caption": "Sentence 91"
    },
    {
      "id": "d5-91",
      "text": "Welcome to the annual tech conference.",
      "caption": "Sentence 92"
    },
    {
      "id": "d5-92",
      "text": "Please register at the front desk.",
      "caption": "Sentence 93"
    },
    {
      "id": "d5-93",
      "text": "Do you have your QR code ready?",
      "caption": "Sentence 94"
    },
    {
      "id": "d5-94",
      "text": "Yes, I have it on my phone.",
      "caption": "Sentence 95"
    },
    {
      "id": "d5-95",
      "text": "Here is your badge and schedule.",
      "caption": "Sentence 96"
    },
    {
      "id": "d5-96",
      "text": "Where is the main auditorium?",
      "caption": "Sentence 97"
    },
    {
      "id": "d5-97",
      "text": "It is straight down the hall and to the right.",
      "caption": "Sentence 98"
    },
    {
      "id": "d5-98",
      "text": "What time does the keynote speech begin?",
      "caption": "Sentence 99"
    },
    {
      "id": "d5-99",
      "text": "It starts promptly at nine o'clock.",
      "caption": "Sentence 100"
    },
    {
      "id": "d5-100",
      "text": "Are there any empty seats near the front?",
      "caption": "Sentence 101"
    },
    {
      "id": "d5-101",
      "text": "I think the first few rows are reserved.",
      "caption": "Sentence 102"
    },
    {
      "id": "d5-102",
      "text": "I will just sit here in the back.",
      "caption": "Sentence 103"
    },
    {
      "id": "d5-103",
      "text": "The speaker is very knowledgeable.",
      "caption": "Sentence 104"
    },
    {
      "id": "d5-104",
      "text": "I learned a lot from that presentation.",
      "caption": "Sentence 105"
    },
    {
      "id": "d5-105",
      "text": "Did you take any notes?",
      "caption": "Sentence 106"
    },
    {
      "id": "d5-106",
      "text": "Yes, I wrote down the main points.",
      "caption": "Sentence 107"
    },
    {
      "id": "d5-107",
      "text": "Will they share the slides later?",
      "caption": "Sentence 108"
    }
  ],
  "6": [
    {
      "id": "d6-0",
      "text": "I am feeling really happy today.",
      "caption": "Sentence 1"
    },
    {
      "id": "d6-1",
      "text": "That is wonderful to hear.",
      "caption": "Sentence 2"
    },
    {
      "id": "d6-2",
      "text": "I just received some amazing news.",
      "caption": "Sentence 3"
    },
    {
      "id": "d6-3",
      "text": "You look absolutely ecstatic.",
      "caption": "Sentence 4"
    },
    {
      "id": "d6-4",
      "text": "I couldn't be more excited right now.",
      "caption": "Sentence 5"
    },
    {
      "id": "d6-5",
      "text": "I have never seen you smile so much.",
      "caption": "Sentence 6"
    },
    {
      "id": "d6-6",
      "text": "My heart is full of joy.",
      "caption": "Sentence 7"
    },
    {
      "id": "d6-7",
      "text": "It is hard to contain my excitement.",
      "caption": "Sentence 8"
    },
    {
      "id": "d6-8",
      "text": "I feel incredibly grateful for everything.",
      "caption": "Sentence 9"
    },
    {
      "id": "d6-9",
      "text": "I am so proud of your accomplishments.",
      "caption": "Sentence 10"
    },
    {
      "id": "d6-10",
      "text": "I am feeling a bit sad today.",
      "caption": "Sentence 11"
    },
    {
      "id": "d6-11",
      "text": "Is there anything I can do to help?",
      "caption": "Sentence 12"
    },
    {
      "id": "d6-12",
      "text": "I just feel really down and upset.",
      "caption": "Sentence 13"
    },
    {
      "id": "d6-13",
      "text": "It is okay to feel that way sometimes.",
      "caption": "Sentence 14"
    },
    {
      "id": "d6-14",
      "text": "I have been feeling lonely lately.",
      "caption": "Sentence 15"
    },
    {
      "id": "d6-15",
      "text": "You can always reach out if you need to talk.",
      "caption": "Sentence 16"
    },
    {
      "id": "d6-16",
      "text": "I feel completely heartbroken.",
      "caption": "Sentence 17"
    },
    {
      "id": "d6-17",
      "text": "I am so sorry you have to go through this.",
      "caption": "Sentence 18"
    },
    {
      "id": "d6-18",
      "text": "Tears just keep falling down my face.",
      "caption": "Sentence 19"
    },
    {
      "id": "d6-19",
      "text": "This situation is causing me a lot of pain.",
      "caption": "Sentence 20"
    },
    {
      "id": "d6-20",
      "text": "I am feeling very anxious about tomorrow.",
      "caption": "Sentence 21"
    },
    {
      "id": "d6-21",
      "text": "Take a deep breath and try to relax.",
      "caption": "Sentence 22"
    },
    {
      "id": "d6-22",
      "text": "My stomach is tied in knots.",
      "caption": "Sentence 23"
    },
    {
      "id": "d6-23",
      "text": "Don't worry too much, you will be fine.",
      "caption": "Sentence 24"
    },
    {
      "id": "d6-24",
      "text": "I am terrified of making a mistake.",
      "caption": "Sentence 25"
    },
    {
      "id": "d6-25",
      "text": "It is normal to feel nervous.",
      "caption": "Sentence 26"
    },
    {
      "id": "d6-26",
      "text": "I just feel a sudden rush of panic.",
      "caption": "Sentence 27"
    },
    {
      "id": "d6-27",
      "text": "There is nothing to be afraid of.",
      "caption": "Sentence 28"
    },
    {
      "id": "d6-28",
      "text": "This stress is really starting to overwhelm me.",
      "caption": "Sentence 29"
    },
    {
      "id": "d6-29",
      "text": "Please try to stay calm and focused.",
      "caption": "Sentence 30"
    },
    {
      "id": "d6-30",
      "text": "I am extremely angry about what happened.",
      "caption": "Sentence 31"
    },
    {
      "id": "d6-31",
      "text": "I understand why you are so infuriated.",
      "caption": "Sentence 32"
    },
    {
      "id": "d6-32",
      "text": "That behavior is completely unacceptable.",
      "caption": "Sentence 33"
    },
    {
      "id": "d6-33",
      "text": "It makes my blood boil just thinking about it.",
      "caption": "Sentence 34"
    },
    {
      "id": "d6-34",
      "text": "I cannot believe they would do something like that.",
      "caption": "Sentence 35"
    },
    {
      "id": "d6-35",
      "text": "Try not to let it ruin your entire day.",
      "caption": "Sentence 36"
    },
    {
      "id": "d6-36",
      "text": "I am feeling so frustrated with this project.",
      "caption": "Sentence 37"
    },
    {
      "id": "d6-37",
      "text": "Sometimes things don't go according to plan.",
      "caption": "Sentence 38"
    },
    {
      "id": "d6-38",
      "text": "I feel like I am losing my patience.",
      "caption": "Sentence 39"
    },
    {
      "id": "d6-39",
      "text": "Losing your temper won't solve the problem.",
      "caption": "Sentence 40"
    },
    {
      "id": "d6-40",
      "text": "I am completely shocked by the news.",
      "caption": "Sentence 41"
    },
    {
      "id": "d6-41",
      "text": "I was genuinely surprised when I found out.",
      "caption": "Sentence 42"
    },
    {
      "id": "d6-42",
      "text": "I never expected that to happen.",
      "caption": "Sentence 43"
    },
    {
      "id": "d6-43",
      "text": "I am still trying to process the information.",
      "caption": "Sentence 44"
    },
    {
      "id": "d6-44",
      "text": "It left me totally speechless.",
      "caption": "Sentence 45"
    },
    {
      "id": "d6-45",
      "text": "I am feeling quite confused right now.",
      "caption": "Sentence 46"
    },
    {
      "id": "d6-46",
      "text": "Can you please explain that to me again?",
      "caption": "Sentence 47"
    },
    {
      "id": "d6-47",
      "text": "I don't understand what is going on.",
      "caption": "Sentence 48"
    },
    {
      "id": "d6-48",
      "text": "I am feeling a little bit lost.",
      "caption": "Sentence 49"
    },
    {
      "id": "d6-49",
      "text": "Let me help you figure this out.",
      "caption": "Sentence 50"
    },
    {
      "id": "d6-50",
      "text": "I am feeling so exhausted today.",
      "caption": "Sentence 51"
    },
    {
      "id": "d6-51",
      "text": "You look completely drained of energy.",
      "caption": "Sentence 52"
    },
    {
      "id": "d6-52",
      "text": "I am feeling overwhelmed with work.",
      "caption": "Sentence 53"
    },
    {
      "id": "d6-53",
      "text": "You need to take a break and rest.",
      "caption": "Sentence 54"
    },
    {
      "id": "d6-54",
      "text": "I just feel entirely burnt out.",
      "caption": "Sentence 55"
    },
    {
      "id": "d6-55",
      "text": "I am feeling very optimistic about the future.",
      "caption": "Sentence 56"
    },
    {
      "id": "d6-56",
      "text": "It is great to have a positive attitude.",
      "caption": "Sentence 57"
    },
    {
      "id": "d6-57",
      "text": "I feel deeply inspired after reading that book.",
      "caption": "Sentence 58"
    },
    {
      "id": "d6-58",
      "text": "I am feeling very motivated to start working.",
      "caption": "Sentence 59"
    },
    {
      "id": "d6-59",
      "text": "I have a strong sense of determination.",
      "caption": "Sentence 60"
    },
    {
      "id": "d6-60",
      "text": "I feel extremely relieved that it is over.",
      "caption": "Sentence 61"
    },
    {
      "id": "d6-61",
      "text": "A huge weight has been lifted off my shoulders.",
      "caption": "Sentence 62"
    },
    {
      "id": "d6-62",
      "text": "I am so thankful that everyone is safe.",
      "caption": "Sentence 63"
    },
    {
      "id": "d6-63",
      "text": "I am feeling really nostalgic today.",
      "caption": "Sentence 64"
    },
    {
      "id": "d6-64",
      "text": "I miss the days when things were simpler.",
      "caption": "Sentence 65"
    },
    {
      "id": "d6-65",
      "text": "Thinking about the past brings back fond memories.",
      "caption": "Sentence 66"
    },
    {
      "id": "d6-66",
      "text": "I feel embarrassed about what I said earlier.",
      "caption": "Sentence 67"
    },
    {
      "id": "d6-67",
      "text": "Don't worry, nobody even noticed.",
      "caption": "Sentence 68"
    },
    {
      "id": "d6-68",
      "text": "I feel guilty for not helping out more.",
      "caption": "Sentence 69"
    },
    {
      "id": "d6-69",
      "text": "You did the best that you could.",
      "caption": "Sentence 70"
    },
    {
      "id": "d6-70",
      "text": "My face is turning red from humiliation.",
      "caption": "Sentence 71"
    },
    {
      "id": "d6-71",
      "text": "I am feeling very confident in my abilities.",
      "caption": "Sentence 72"
    },
    {
      "id": "d6-72",
      "text": "You should be, you are very talented.",
      "caption": "Sentence 73"
    },
    {
      "id": "d6-73",
      "text": "I feel secure and safe here.",
      "caption": "Sentence 74"
    },
    {
      "id": "d6-74",
      "text": "I am feeling quite comfortable with this decision.",
      "caption": "Sentence 75"
    },
    {
      "id": "d6-75",
      "text": "I feel an intense surge of adrenaline.",
      "caption": "Sentence 76"
    },
    {
      "id": "d6-76",
      "text": "I am totally fascinated by this subject.",
      "caption": "Sentence 77"
    },
    {
      "id": "d6-77",
      "text": "I feel completely bored with this task.",
      "caption": "Sentence 78"
    },
    {
      "id": "d6-78",
      "text": "I am disappointed with the final result.",
      "caption": "Sentence 79"
    },
    {
      "id": "d6-79",
      "text": "I really had much higher expectations.",
      "caption": "Sentence 80"
    },
    {
      "id": "d6-80",
      "text": "I feel deeply sympathetic towards their situation.",
      "caption": "Sentence 81"
    },
    {
      "id": "d6-81",
      "text": "My heart goes out to them.",
      "caption": "Sentence 82"
    },
    {
      "id": "d6-82",
      "text": "I am feeling very affectionate towards you.",
      "caption": "Sentence 83"
    },
    {
      "id": "d6-83",
      "text": "I sincerely appreciate everything you do.",
      "caption": "Sentence 84"
    },
    {
      "id": "d6-84",
      "text": "I feel a strong sense of belonging here.",
      "caption": "Sentence 85"
    },
    {
      "id": "d6-85",
      "text": "I am feeling quite defensive right now.",
      "caption": "Sentence 86"
    },
    {
      "id": "d6-86",
      "text": "Please don't take it personally.",
      "caption": "Sentence 87"
    },
    {
      "id": "d6-87",
      "text": "I am feeling very peaceful and calm.",
      "caption": "Sentence 88"
    },
    {
      "id": "d6-88",
      "text": "This music is very soothing.",
      "caption": "Sentence 89"
    },
    {
      "id": "d6-89",
      "text": "I feel a deep sense of serenity.",
      "caption": "Sentence 90"
    },
    {
      "id": "d6-90",
      "text": "I am feeling incredibly lucky today.",
      "caption": "Sentence 91"
    },
    {
      "id": "d6-91",
      "text": "I am feeling highly suspicious of their motives.",
      "caption": "Sentence 92"
    },
    {
      "id": "d6-92",
      "text": "Something about this doesn't feel right to me.",
      "caption": "Sentence 93"
    },
    {
      "id": "d6-93",
      "text": "I feel completely devastated by the loss.",
      "caption": "Sentence 94"
    },
    {
      "id": "d6-94",
      "text": "I am feeling a spark of curiosity.",
      "caption": "Sentence 95"
    },
    {
      "id": "d6-95",
      "text": "I am feeling content with where my life is right now.",
      "caption": "Sentence 96"
    },
    {
      "id": "d6-96",
      "text": "I am feeling really happy today.",
      "caption": "Sentence 97"
    },
    {
      "id": "d6-97",
      "text": "That is wonderful to hear.",
      "caption": "Sentence 98"
    },
    {
      "id": "d6-98",
      "text": "I just received some amazing news.",
      "caption": "Sentence 99"
    },
    {
      "id": "d6-99",
      "text": "You look absolutely ecstatic.",
      "caption": "Sentence 100"
    },
    {
      "id": "d6-100",
      "text": "I couldn't be more excited right now.",
      "caption": "Sentence 101"
    },
    {
      "id": "d6-101",
      "text": "I have never seen you smile so much.",
      "caption": "Sentence 102"
    },
    {
      "id": "d6-102",
      "text": "My heart is full of joy.",
      "caption": "Sentence 103"
    },
    {
      "id": "d6-103",
      "text": "It is hard to contain my excitement.",
      "caption": "Sentence 104"
    },
    {
      "id": "d6-104",
      "text": "I feel incredibly grateful for everything.",
      "caption": "Sentence 105"
    },
    {
      "id": "d6-105",
      "text": "I am so proud of your accomplishments.",
      "caption": "Sentence 106"
    },
    {
      "id": "d6-106",
      "text": "I am feeling a bit sad today.",
      "caption": "Sentence 107"
    },
    {
      "id": "d6-107",
      "text": "Is there anything I can do to help?",
      "caption": "Sentence 108"
    }
  ]
};
