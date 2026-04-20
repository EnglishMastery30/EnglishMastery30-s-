import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Clock, Video, Calendar, CheckCircle, Search, Filter } from 'lucide-react';

export const mockTutors = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    rating: 4.9,
    reviews: 128,
    specialty: 'Business English & Pronunciation',
    about: 'Certified TEFL teacher with 8 years of experience helping professionals improve their business communication skills.',
    price: 25,
    classes: [
      { id: 'c1', title: 'Advanced Business English', duration: 60, type: '1-on-1' },
      { id: 'c2', title: 'Pronunciation Masterclass', duration: 45, type: 'Group' }
    ]
  },
  {
    id: 't2',
    name: 'David Chen',
    avatar: 'https://i.pravatar.cc/150?u=david',
    rating: 4.8,
    reviews: 95,
    specialty: 'IELTS Preparation & Grammar',
    about: 'Former IELTS examiner. I know exactly what you need to score a band 8.0+ in your speaking and writing tests.',
    price: 30,
    classes: [
      { id: 'c3', title: 'IELTS Speaking Mock Test', duration: 45, type: '1-on-1' },
      { id: 'c4', title: 'Advanced Grammar Drill', duration: 60, type: 'Group' }
    ]
  },
  {
    id: 't3',
    name: 'Emma Thompson',
    avatar: 'https://i.pravatar.cc/150?u=emma',
    rating: 4.9,
    reviews: 210,
    specialty: 'Conversational English & Slang',
    about: 'Learn how native speakers actually talk! We will focus on idioms, phrasal verbs, and natural conversation flow.',
    price: 20,
    classes: [
      { id: 'c5', title: 'Casual Conversation Practice', duration: 30, type: '1-on-1' },
      { id: 'c6', title: 'American Slang & Idioms', duration: 45, type: 'Group' }
    ]
  }
];

export function TutorsList({ isLocked = false }: { isLocked?: boolean }) {
  const [purchasedClasses, setPurchasedClasses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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
      studentName: 'Current Student', // Mock student name
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

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Find a Tutor</h1>
        <p className="text-slate-600 dark:text-slate-400">Book 1-on-1 or group classes with expert English teachers.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or specialty..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTutors.map(tutor => (
          <motion.div 
            key={tutor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex gap-6">
              <img src={tutor.avatar} alt={tutor.name} className="w-24 h-24 rounded-2xl object-cover" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tutor.name}</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">{tutor.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-lg text-sm font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    {tutor.rating}
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 line-clamp-2">{tutor.about}</p>
                <div className="mt-3 font-bold text-slate-900 dark:text-white">
                  ${tutor.price} <span className="text-sm font-normal text-slate-500">/ hour</span>
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex-1">
              <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Available Classes</h4>
              <div className="space-y-3">
                {tutor.classes.map(cls => {
                  const isPurchased = purchasedClasses.some(p => p.classId === cls.id);
                  return (
                    <div key={cls.id} className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div>
                        <h5 className="font-bold text-slate-900 dark:text-white">{cls.title}</h5>
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {cls.duration} min</span>
                          <span className="flex items-center gap-1"><Video className="w-3 h-3" /> {cls.type}</span>
                        </div>
                      </div>
                      {isPurchased ? (
                        <button disabled className="flex items-center gap-1 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-medium rounded-lg text-sm">
                          <CheckCircle className="w-4 h-4" /> Booked
                        </button>
                      ) : (
                        <button 
                          onClick={() => handlePurchase(tutor, cls)}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition-colors"
                        >
                          Book Now
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
