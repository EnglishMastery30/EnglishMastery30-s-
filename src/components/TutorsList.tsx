import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Clock, Video, CheckCircle, Search, Filter, ArrowLeft, ThumbsUp, Share2, Award, BookOpen, Users, FileText, Target, Image as ImageIcon } from 'lucide-react';

export const mockTutors = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300', // Real woman face illustration
    rating: 4.9,
    reviewsCount: 128,
    rank: 'Senior Instructor',
    position: 'Head of Business English',
    hoursTaught: 1450,
    specialty: 'Business English & Pronunciation',
    about: 'Certified TEFL teacher with 8 years of experience helping professionals improve their business communication skills.',
    price: 25,
    classes: [
      { id: 'c1', title: 'Advanced Business English', duration: 60, type: '1-on-1', materials: 5, images: 2 },
      { id: 'c2', title: 'Pronunciation Masterclass', duration: 45, type: 'Group', materials: 3, images: 1 }
    ],
    reviews: [
      { id: 'r1', user: 'Alex M.', rating: 5, text: 'Sarah helped me prepare for my job interview. She was fantastic!', date: '2 days ago', likes: 24, shares: 3 },
      { id: 'r2', user: 'Maria G.', rating: 5, text: 'The best pronunciation teacher. VERY engaging classes.', date: '1 week ago', likes: 12, shares: 1 }
    ]
  },
  {
    id: 't2',
    name: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300',
    rating: 4.8,
    reviewsCount: 95,
    rank: 'IELTS Expert',
    position: 'Test Prep Specialist',
    hoursTaught: 890,
    specialty: 'IELTS Preparation & Grammar',
    about: 'Former IELTS examiner. I know exactly what you need to score a band 8.0+ in your speaking and writing tests.',
    price: 30,
    classes: [
      { id: 'c3', title: 'IELTS Speaking Mock Test', duration: 45, type: '1-on-1', materials: 8, images: 3 },
      { id: 'c4', title: 'Advanced Grammar Drill', duration: 60, type: 'Group', materials: 12, images: 5 }
    ],
    reviews: [
      { id: 'r3', user: 'Chen L.', rating: 5, text: 'Got my band 8.0 thanks to David!', date: '1 month ago', likes: 45, shares: 12 },
      { id: 'r4', user: 'Sophie T.', rating: 4, text: 'Very strict but effective grammar drills.', date: '3 weeks ago', likes: 8, shares: 0 }
    ]
  },
  {
    id: 't3',
    name: 'Emma Thompson',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300',
    rating: 4.9,
    reviewsCount: 210,
    rank: 'Native Speaker Coach',
    position: 'Conversational Specialist',
    hoursTaught: 2100,
    specialty: 'Conversational English & Slang',
    about: 'Learn how native speakers actually talk! We will focus on idioms, phrasal verbs, and natural conversation flow.',
    price: 20,
    classes: [
      { id: 'c5', title: 'Casual Conversation Practice', duration: 30, type: '1-on-1', materials: 2, images: 4 },
      { id: 'c6', title: 'American Slang & Idioms', duration: 45, type: 'Group', materials: 6, images: 8 }
    ],
    reviews: [
      { id: 'r5', user: 'Juan P.', rating: 5, text: 'Emma is super fun and I learned so much slang.', date: '4 days ago', likes: 34, shares: 5 },
      { id: 'r6', user: 'Yuki H.', rating: 5, text: 'My confidence in speaking has doubled. Highly recommended.', date: '2 weeks ago', likes: 18, shares: 2 }
    ]
  }
];

export function TutorsList({ isLocked = false }: { isLocked?: boolean }) {
  const [purchasedClasses, setPurchasedClasses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTutor, setSelectedTutor] = useState<any | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('purchased_classes');
    if (stored) {
      setPurchasedClasses(JSON.parse(stored));
    }
  }, []);

  const handlePurchase = (tutor: any, cls: any) => {
    if (isLocked) {
      alert('Please upgrade to Premium to book classes.');
      return;
    }

    const newPurchase = {
      id: Math.random().toString(36).substr(2, 9),
      tutorId: tutor.id,
      tutorName: tutor.name,
      classId: cls.id,
      classTitle: cls.title,
      price: tutor.price,
      date: new Date().toISOString(),
      studentName: 'Current Student',
      status: 'upcoming'
    };

    const updated = [...purchasedClasses, newPurchase];
    setPurchasedClasses(updated);
    localStorage.setItem('purchased_classes', JSON.stringify(updated));
    alert(`Successfully booked ${cls.title} with ${tutor.name}!`);
  };

  const filteredTutors = mockTutors.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedTutor) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4 animate-in fade-in zoom-in-95 duration-300">
        <button 
          onClick={() => setSelectedTutor(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white mb-6 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Tutors
        </button>

        {/* Profile Hero */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col md:flex-row gap-8 items-start mb-8 transition-all">

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2">{selectedTutor.name}</h1>
                <p className="text-xl text-indigo-600 dark:text-indigo-400 font-bold mb-4">{selectedTutor.position}</p>
                <div className="flex flex-wrap gap-4 text-sm font-medium">
                  <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 dark:bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-100 dark:border-amber-500/20"><Star className="w-4 h-4 fill-current" /> {selectedTutor.rating} ({selectedTutor.reviewsCount} reviews)</span>
                  <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-500/20"><Award className="w-4 h-4" /> {selectedTutor.rank}</span>
                  <span className="flex items-center gap-1.5 text-sky-600 bg-sky-50 dark:bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-100 dark:border-sky-500/20"><Users className="w-4 h-4" /> {selectedTutor.hoursTaught} hrs taught</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-slate-900 dark:text-white">${selectedTutor.price}<span className="text-lg text-slate-500 font-medium">/hr</span></div>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mt-6 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
              {selectedTutor.about}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Classes & Materials */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Video className="w-6 h-6 text-indigo-500" /> Classes & Materials
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {selectedTutor.classes.map((cls: any) => {
                const isPurchased = purchasedClasses.some(p => p.classId === cls.id);
                return (
                  <div key={cls.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{cls.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded flex items-center gap-1"><Clock className="w-3 h-3" /> {cls.duration}m</span>
                      <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded flex items-center gap-1"><FileText className="w-3 h-3" /> {cls.materials} PDFs</span>
                      <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded flex items-center gap-1"><ImageIcon className="w-3 h-3" /> {cls.images} Visuals</span>
                    </div>
                    {isPurchased ? (
                        <div className="flex flex-col gap-2">
                          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-bold rounded-xl text-sm border border-emerald-200 dark:border-emerald-800/30 transition-colors">
                            <Video className="w-4 h-4" /> Watch Recording
                          </button>
                          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-sm transition-colors">
                            <FileText className="w-4 h-4" /> Review Materials
                          </button>
                          <p className="text-[10px] text-center text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-widest mt-1">
                            <CheckCircle className="w-3 h-3 inline mr-1" /> Purchased
                          </p>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handlePurchase(selectedTutor, cls)}
                          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
                        >
                          Book Class
                        </button>
                      )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Star className="w-6 h-6 text-amber-500 fill-current" /> Reviews Score
            </h2>
            <div className="space-y-4">
              {selectedTutor.reviews.map((rev: any) => (
                <div key={rev.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{rev.user}</div>
                      <div className="text-xs text-slate-400">{rev.date}</div>
                    </div>
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-slate-300 dark:text-slate-700'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">"{rev.text}"</p>
                  <div className="flex items-center justify-end gap-3 text-xs font-medium text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                    <button className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><ThumbsUp className="w-3.5 h-3.5" /> {rev.likes}</button>
                    <button className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"><Share2 className="w-3.5 h-3.5" /> {rev.shares}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-8 px-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Tutors & Live Classes</h1>
        <p className="text-slate-600 dark:text-slate-400">Select a teacher to view their full profile, materials, and available classes.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or specialty..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white transition-shadow shadow-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium shadow-sm">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* AI Roleplay Integration */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'roleplay' }))}
        className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white cursor-pointer hover:shadow-xl hover:shadow-indigo-500/20 transition-all flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl">
            <Target className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Try AI Roleplay Scenarios</h3>
            <p className="text-indigo-100 text-sm">Practice real-world situations with our advanced AI tutor anytime.</p>
          </div>
        </div>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold shadow-lg whitespace-nowrap hover:bg-indigo-50 transition-colors">
          Start Roleplay
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTutors.map((tutor, index) => (
          <motion.div 
            key={tutor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-100 dark:hover:shadow-none transition-all cursor-pointer"
            onClick={() => setSelectedTutor(tutor)}
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex gap-6">

              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">{tutor.name}</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-bold text-sm tracking-wide">{tutor.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-lg text-sm font-bold shadow-sm">
                    <Star className="w-4 h-4 fill-current" />
                    {tutor.rating}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" /> {tutor.rank}
                  </div>
                  <div className="font-black text-xl text-slate-900 dark:text-white">
                    ${tutor.price}<span className="text-xs font-medium text-slate-500">/hr</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
               <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:underline">
                 View Teacher Profile <ArrowLeft className="w-4 h-4 rotate-180" />
               </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
