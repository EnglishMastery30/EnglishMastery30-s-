import React, { useState, useEffect } from 'react';
import { Users, BookOpen, DollarSign, Settings, Plus, Calendar, Clock, Video, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'classes' | 'students' | 'settings'>('overview');
  const [isScheduling, setIsScheduling] = useState(false);
  const [purchasedClasses, setPurchasedClasses] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('purchased_classes');
    if (stored) {
      setPurchasedClasses(JSON.parse(stored));
    }
  }, []);

  // Mock data for calendar
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const scheduledClasses = [
    { day: 15, title: 'Business English', time: '10:00 AM' },
    { day: 18, title: 'Conversation Practice', time: '14:00 PM' },
    { day: 22, title: 'Grammar Basics', time: '09:00 AM' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Teacher Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your classes, students, and earnings.</p>
        </div>
        <button 
          onClick={() => setIsScheduling(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Schedule Class
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2" role="tablist">
        {(['overview', 'classes', 'students', 'settings'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-800/50 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-slate-900 dark:text-white">Total Students</h3>
                </div>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{purchasedClasses.length > 0 ? purchasedClasses.length : 124}</p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-800/50 rounded-lg text-emerald-600 dark:text-emerald-400">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-slate-900 dark:text-white">Total Earnings</h3>
                </div>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  ${purchasedClasses.length > 0 ? purchasedClasses.reduce((acc, curr) => acc + curr.price, 0) : 3450}
                </p>
              </div>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-100 dark:bg-amber-800/50 rounded-lg text-amber-600 dark:text-amber-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-slate-900 dark:text-white">Active Classes</h3>
                </div>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">8</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Upcoming Live Classes</h3>
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <Video className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white">Advanced English Conversation</h4>
                        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-1">
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Today</span>
                          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 18:00 PM</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
                      Start Class
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Class Calendar</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">View your availability and manage class timings.</p>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-7 gap-2 mb-2 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {daysInMonth.map(day => {
                  const hasClass = scheduledClasses.find(c => c.day === day);
                  return (
                    <div 
                      key={day} 
                      className={`min-h-[80px] p-2 rounded-lg border ${hasClass ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800/50' : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}
                    >
                      <span className={`text-sm font-medium ${hasClass ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'}`}>{day}</span>
                      {hasClass && (
                        <div className="mt-1 p-1 bg-indigo-100 dark:bg-indigo-800/50 rounded text-xs text-indigo-700 dark:text-indigo-300 truncate" title={hasClass.title}>
                          {hasClass.time}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Student Roster & Payments</h3>
            <p className="text-slate-600 dark:text-slate-400">View registration details, history, and payment status of your students.</p>
            <div className="overflow-x-auto">
              {purchasedClasses.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Student Name</th>
                      <th className="py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Enrolled Class</th>
                      <th className="py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Registration Date</th>
                      <th className="py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchasedClasses.map((purchase) => (
                      <tr key={purchase.id} className="border-b border-slate-100 dark:border-slate-800">
                        <td className="py-3 px-4 text-slate-900 dark:text-white">{purchase.studentName}</td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{purchase.classTitle}</td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{new Date(purchase.date).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-xs font-medium">Paid (${purchase.price})</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Students Yet</h4>
                  <p className="text-slate-600 dark:text-slate-400">When students purchase your classes, they will appear here.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">API & Payment Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Payment Gateway API Key</label>
                <input type="password" placeholder="Enter your Razorpay/Stripe API Key" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                <p className="text-xs text-slate-500 mt-1">This allows you to receive payments directly from students.</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Webhook URL</label>
                <input type="text" placeholder="https://..." className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>

              <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Schedule Class Modal */}
      <AnimatePresence>
        {isScheduling && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Schedule New Class</h3>
                <button onClick={() => setIsScheduling(false)} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Class Topic</label>
                  <input type="text" placeholder="e.g. Advanced Business English" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                    <input type="date" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Time</label>
                    <input type="time" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Duration (mins)</label>
                    <input type="number" placeholder="60" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Max Students</label>
                    <input type="number" placeholder="10" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Price ($)</label>
                  <input type="number" placeholder="25" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Select Specific Students (Optional)</label>
                  <select multiple className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none h-24">
                    <option value="1">Student 1</option>
                    <option value="2">Student 2</option>
                    <option value="3">Student 3</option>
                  </select>
                </div>
                <button 
                  onClick={() => setIsScheduling(false)}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors mt-4"
                >
                  Schedule Class
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
