import React, { useState, useEffect } from 'react';
import { Users, BookOpen, DollarSign, Settings, Plus, Calendar, Clock, Video, X, TrendingUp, CheckCircle, Play, MoreVertical, ShieldOff, MicOff, Lock, EyeOff, Trash2, MessageSquare, ExternalLink, ShieldCheck, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Student {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'muted' | 'blocked';
  lastSeen: string;
}

interface Resource {
  id: string;
  title: string;
  type: string;
  size: string;
  date: string;
  isHidden: boolean;
  isLocked: boolean;
}

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'classes' | 'students' | 'resources' | 'settings' | 'live' | 'recordings' | 'tests'>('overview');
  const [isScheduling, setIsScheduling] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  
  // Advanced States
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Alex Johnson', email: 'alex@example.com', status: 'active', lastSeen: '2h ago' },
    { id: '2', name: 'Sarah Miller', email: 'sarah@example.com', status: 'muted', lastSeen: '10m ago' },
    { id: '3', name: 'Mike Ross', email: 'mike@example.com', status: 'blocked', lastSeen: '2 days ago' },
  ]);

  const [recordings, setRecordings] = useState([
    { id: '1', title: 'Session: Present Tense Mastery', date: '2023-12-01', duration: '45:20', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop' },
    { id: '2', title: 'Business Email Etiquette', date: '2023-11-28', duration: '52:10', thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop' },
  ]);

  const [testMaterials, setTestMaterials] = useState([
    { id: '1', title: 'Mid-term Language Assessment', status: 'In Review', submissions: 18, total: 24, deadline: 'Tomorrow' },
    { id: '2', title: 'Vocabulary Quiz: Workplace', status: 'Live', submissions: 12, total: 24, deadline: 'Ended' },
  ]);

  const [resources, setResources] = useState<Resource[]>([
    { id: '1', title: 'English Grammar Guide.pdf', type: 'PDF', size: '2.4 MB', date: '2023-11-01', isHidden: false, isLocked: false },
    { id: '2', title: 'Business Idioms.docx', type: 'DOCX', size: '1.1 MB', date: '2023-10-25', isHidden: true, isLocked: false },
    { id: '3', title: 'Listening Exercise 1.mp3', type: 'MP3', size: '12.8 MB', date: '2023-10-20', isHidden: false, isLocked: true },
  ]);

  const [liveSessions, setLiveSessions] = useState([
    { id: '1', topic: 'Advanced Grammar', zoomId: '845-212-3344', status: 'live', attendees: 12 },
    { id: '2', topic: 'IELTS Prep', zoomId: '221-556-9900', status: 'scheduled', attendees: 0 },
  ]);

  const [sessionForm, setSessionForm] = useState({ topic: '', zoomId: '', date: '', time: '' });

  useEffect(() => {
    // Component initialization
  }, []);

  // Action Handlers
  const toggleStudentStatus = (id: string, newStatus: Student['status']) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const deleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id));
  };

  const toggleResourceVisibility = (id: string) => {
    setResources(prev => prev.map(r => r.id === id ? { ...r, isHidden: !r.isHidden } : r));
  };

  const toggleResourceLock = (id: string) => {
    setResources(prev => prev.map(r => r.id === id ? { ...r, isLocked: !r.isLocked } : r));
  };

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const scheduledClasses = [
    { day: 15, title: 'Business English', time: '10:00 AM' },
    { day: 18, title: 'Conversation Practice', time: '14:00 PM' },
    { day: 22, title: 'Grammar Basics', time: '09:00 AM' },
  ];

  const handleCreateSession = () => {
    if (sessionForm.topic && sessionForm.zoomId) {
      setLiveSessions(prev => [...prev, {
        id: Date.now().toString(),
        topic: sessionForm.topic,
        zoomId: sessionForm.zoomId,
        status: 'scheduled',
        attendees: 0
      }]);
      setIsScheduling(false);
      setSessionForm({ topic: '', zoomId: '', date: '', time: '' });
    }
  };

  const handleUploadResource = () => {
    if (uploadTitle && uploadFile) {
        setResources(prev => [...prev, {
            id: Date.now().toString(),
            title: uploadTitle,
            type: uploadFile.name.split('.').pop()?.toUpperCase() || 'FILE',
            size: (uploadFile.size / (1024 * 1024)).toFixed(1) + ' MB',
            date: new Date().toISOString().split('T')[0],
            isHidden: false,
            isLocked: false,
        }]);
        setIsUploading(false);
        setUploadTitle('');
        setUploadFile(null);
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Teacher Console</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Control center for your digital classroom.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('live')}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl transition-all font-bold shadow-lg shadow-rose-500/20 active:scale-95"
          >
            <Video className="w-5 h-5" />
            Go Live
          </button>
          <button 
            onClick={() => setIsScheduling(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all font-bold shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Schedule
          </button>
        </div>
      </div>

      {/* Modern Navigation Tabs */}
      <div className="flex gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl w-fit overflow-x-auto max-w-full">
        {(['overview', 'classes', 'students', 'resources', 'recordings', 'tests', 'live', 'settings'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard icon={<Users />} title="Live Students" value={students.length} color="indigo" />
              <StatCard icon={<Video />} title="Monthly Classes" value="24" color="rose" />
              <StatCard icon={<ShieldCheck />} title="Safety Status" value="Secure" color="emerald" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-6">Upcoming Live Sessions</h3>
                <div className="space-y-4">
                  {liveSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${session.status === 'live' ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-slate-100 text-slate-600'}`}>
                          <Video className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white">{session.topic}</h4>
                          <p className="text-xs text-slate-400 font-medium tracking-tight">Zoom ID: {session.zoomId}</p>
                        </div>
                      </div>
                      <button className={`px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${session.status === 'live' ? 'bg-rose-600 text-white hover:bg-rose-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                        {session.status === 'live' ? 'Join Now' : 'Start'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-6">Student Activity</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">AJ</div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Alex Johnson</p>
                        <p className="text-[10px] text-slate-400 font-medium">Joined the live session</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-tighter">2m ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recordings' && (
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Class Recordings</h3>
              <p className="text-sm text-slate-500">Stored on cloud for 90 days.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recordings.map((rec) => (
                <div key={rec.id} className="group bg-slate-50 dark:bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all">
                  <div className="relative aspect-video">
                    <img src={rec.thumbnail} alt={rec.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white">
                        <Play className="w-6 h-6 fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold rounded-lg">
                      {rec.duration}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 transition-colors uppercase text-xs tracking-tight">{rec.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{rec.date}</p>
                    <div className="mt-4 flex gap-2">
                       <button className="flex-1 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-all">Download</button>
                       <button className="flex-1 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all">Share</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tests' && (
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Test Platform & Material Review</h3>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20 active:scale-95">
                Create New Test
              </button>
            </div>
            <div className="space-y-4">
              {testMaterials.map((test) => (
                <div key={test.id} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 dark:border-slate-800">
                      <Target className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight mb-0.5">{test.title}</h4>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${test.status === 'Live' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                          {test.status}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Deadline: {test.deadline}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Submissions</p>
                      <p className="text-xl font-black text-slate-900 dark:text-white">{test.submissions}<span className="text-slate-400">/{test.total}</span></p>
                    </div>
                    <div className="w-px h-10 bg-slate-200 dark:bg-slate-800 hidden md:block" />
                    <button className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 hover:shadow-xl transition-all">Review Submissions</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Student Management</h3>
              <div className="flex gap-2">
                <button title="Add Student" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20">
                  <Plus className="w-4 h-4" /> Add Student
                </button>
                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><MessageSquare className="w-5 h-5" /></button>
                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Settings className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Activity</th>
                    <th className="pb-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                  {students.map((student) => (
                    <tr key={student.id} className="group">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-[14px] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 font-black text-sm">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">{student.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          student.status === 'active' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10' :
                          student.status === 'muted' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/10' :
                          'bg-rose-100 text-rose-600 dark:bg-rose-500/10'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="py-4 text-xs font-medium text-slate-500">{student.lastSeen}</td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <AdminButton icon={<MicOff />} title="Mute" onClick={() => toggleStudentStatus(student.id, 'muted')} active={student.status === 'muted'} />
                          <AdminButton icon={<ShieldOff />} title="Block" onClick={() => toggleStudentStatus(student.id, 'blocked')} active={student.status === 'blocked'} color="rose" />
                          <AdminButton icon={<CheckCircle />} title="Activate" onClick={() => toggleStudentStatus(student.id, 'active')} color="emerald" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Vault Resources</h3>
              <button 
                onClick={() => setIsUploading(true)} 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" /> Add Asset
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {resources.map((res) => (
                <div key={res.id} className={`group p-6 rounded-[2rem] border transition-all relative overflow-hidden ${res.isHidden ? 'bg-slate-50 opacity-60 dark:bg-slate-800/50' : 'bg-white dark:bg-slate-900 hover:shadow-2xl hover:-translate-y-1'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl text-indigo-600">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="flex gap-1">
                      <ResourceAction icon={res.isLocked ? <Lock /> : <ShieldCheck />} onClick={() => toggleResourceLock(res.id)} active={res.isLocked} />
                      <ResourceAction icon={res.isHidden ? <EyeOff /> : <Play />} onClick={() => toggleResourceVisibility(res.id)} active={res.isHidden} />
                      <ResourceAction icon={<Trash2 />} onClick={() => deleteResource(res.id)} color="rose" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors uppercase text-sm tracking-tight">{res.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{res.type} • {res.size}</p>
                  </div>
                  {res.isLocked && <div className="absolute top-2 right-2"><Lock className="w-3 h-3 text-amber-500" /></div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'live' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[80vh]">
            <div className="lg:col-span-3 bg-slate-950 rounded-[2rem] border-8 border-slate-900 flex flex-col relative overflow-hidden shadow-2xl">
              <div className="flex-1 flex flex-col items-center justify-center relative z-10 p-12 text-center bg-gradient-to-b from-indigo-900/20 to-slate-950">
                <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-3xl animate-pulse -z-10"></div>
                <div className="w-24 h-24 bg-rose-600 rounded-full flex items-center justify-center text-white mb-6 shadow-[0_0_60px_rgba(225,29,72,0.6)] relative transition-transform hover:scale-105 cursor-pointer">
                  <Video className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-black text-white tracking-tight relative mb-3 uppercase">Classroom Broadcast</h2>
                <p className="text-slate-400 font-medium max-w-md relative mb-8">
                  Connect via Zoom or start internal WebRTC broadcast. Your students are waiting in the lobby.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 relative">
                  <button onClick={() => window.open('https://zoom.us/start/videomeeting', '_blank')} className="px-8 py-4 bg-blue-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all shadow-xl active:scale-95 flex items-center gap-2">
                    <Video className="w-5 h-5" /> Launch Zoom
                  </button>
                  <button onClick={() => { /* Start WebRTC */}} className="px-8 py-4 bg-emerald-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-emerald-700 transition-all shadow-xl border border-emerald-500 active:scale-95 flex items-center gap-2">
                    <Play className="w-5 h-5" /> Start Internal Stream
                  </button>
                </div>
              </div>
              <div className="bg-slate-900 p-4 border-t border-slate-800 flex items-center justify-between z-20">
                <div className="flex items-center gap-3">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </span>
                  <span className="text-white font-bold text-sm tracking-widest uppercase">Waiting for host</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"><MicOff className="w-5 h-5" /></button>
                  <button className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"><ShieldOff className="w-5 h-5" /></button>
                  <button className="p-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors font-bold text-sm">End Class</button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden shadow-xl">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex gap-2">
                <button className="flex-1 py-2 text-xs font-black uppercase tracking-widest bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">Q&A / Chat</button>
                <button className="flex-1 py-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                  Participants <span className="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white px-2 py-0.5 rounded-full ml-1">24</span>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Embedded Quick Quiz View */}
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Live Quick Quiz</span>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">18/24 Answered</span>
                  </div>
                  <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-100 mb-3">Which tense is used for an action completed before another action in the past?</h4>
                  <div className="space-y-2">
                    <div className="relative h-6 bg-white dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-emerald-400 dark:bg-emerald-600 w-[75%] rounded-full"></div>
                      <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-bold text-slate-800 dark:text-white mix-blend-difference">
                        <span>Past Perfect</span><span>75%</span>
                      </div>
                    </div>
                    <div className="relative h-6 bg-white dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-slate-300 dark:bg-slate-600 w-[15%] rounded-full"></div>
                      <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-bold text-slate-800 dark:text-white mix-blend-difference">
                        <span>Simple Past</span><span>15%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl rounded-tl-sm border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold text-slate-400 mb-1">Alex Johnson</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Teacher, could you explain the past perfect tense again?</p>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-500/10 p-3 rounded-2xl rounded-tr-sm border border-indigo-100 dark:border-indigo-500/20 ml-8">
                  <p className="text-[10px] font-bold text-indigo-400 mb-1">You</p>
                  <p className="text-sm font-medium text-indigo-900 dark:text-indigo-100">Yes! I'll cover that in the next 5 minutes.</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-500/10 p-3 rounded-2xl rounded-tl-sm border border-amber-100 dark:border-amber-500/20 relative">
                  <div className="absolute top-2 right-2 bg-amber-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full">New Question</div>
                  <p className="text-[10px] font-bold text-slate-400 mb-1">Sarah Miller</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">How do we join the breakout rooms?</p>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20">
                <div className="relative flex items-center">
                  <input type="text" placeholder="Type a message or answer..." className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-4 pr-12 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm" />
                  <button className="absolute right-2 p-2 text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Admin & Platform Settings</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-4">Classroom Global Controls</h4>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl cursor-pointer">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">Allow Student Chat</span>
                        <p className="text-xs text-slate-500">Students can message each other directly.</p>
                      </div>
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600 rounded bg-white border-slate-300" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl cursor-pointer">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">Auto-Mute on Join</span>
                        <p className="text-xs text-slate-500">Microphones are muted by default in live classes.</p>
                      </div>
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600 rounded bg-white border-slate-300" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl cursor-pointer">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">Require Registration</span>
                        <p className="text-xs text-slate-500">Only verified students can access the classes.</p>
                      </div>
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600 rounded bg-white border-slate-300" defaultChecked />
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-4">Content & Resources</h4>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl cursor-pointer">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">Watermark Materials</span>
                        <p className="text-xs text-slate-500">Add overlay to downloaded PDFs for protection.</p>
                      </div>
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600 rounded bg-white border-slate-300" />
                    </label>
                    <label className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl cursor-pointer">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">Auto-Archive Old Classes</span>
                        <p className="text-xs text-slate-500">Move sessions past 30 days to archive.</p>
                      </div>
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600 rounded bg-white border-slate-300" defaultChecked />
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-4">Danger Zone</h4>
                  <div className="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-2xl">
                    <p className="text-sm font-bold text-rose-700 dark:text-rose-400 mb-2">Reset Entire Classroom</p>
                    <p className="text-xs text-rose-600/80 dark:text-rose-400/80 mb-4">This will delete all messages, activity logs, and reset student statuses.</p>
                    <button className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all">Factory Reset</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ScheduleModal isOpen={isScheduling} onClose={() => setIsScheduling(false)} form={sessionForm} updateForm={setSessionForm} onSave={handleCreateSession} />
      <UploadModal isOpen={isUploading} onClose={() => setIsUploading(false)} title={uploadTitle} setTitle={setUploadTitle} setFile={setUploadFile} onSave={handleUploadResource} />
    </div>
  );
}

// Sub-components
function StatCard({ icon, title, value, color }: { icon: any, title: string, value: any, color: string }) {
  const colors: any = {
    indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10',
    rose: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10',
  };
  return (
    <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none hover:-translate-y-1 transition-all">
      <div className={`w-12 h-12 ${colors[color]} rounded-2xl flex items-center justify-center mb-6`}>
        {React.cloneElement(icon, { className: 'w-6 h-6' })}
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{title}</p>
      <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</p>
    </div>
  );
}

function AdminButton({ icon, title, onClick, active, color = 'indigo' }: { icon: any, title: string, onClick: () => void, active?: boolean, color?: string }) {
  const activeStyles: any = {
    rose: 'bg-rose-600 text-white hover:bg-rose-700',
    indigo: 'bg-indigo-600 text-white hover:bg-indigo-700',
    emerald: 'bg-emerald-600 text-white hover:bg-emerald-700',
  };
  return (
    <button 
      onClick={onClick}
      title={title}
      className={`p-2.5 rounded-xl transition-all ${active ? activeStyles[color] : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
    >
      {React.cloneElement(icon, { className: 'w-4 h-4' })}
    </button>
  );
}

function ResourceAction({ icon, onClick, active, color = 'indigo' }: { icon: any, onClick: () => void, active?: boolean, color?: string }) {
  const activeStyles: any = {
    rose: 'text-rose-600 bg-rose-50 dark:bg-rose-500/10',
    indigo: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10',
  };
  return (
    <button 
      onClick={onClick}
      className={`p-2 rounded-lg transition-all ${active ? activeStyles[color] : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
    >
      {React.cloneElement(icon, { className: 'w-4 h-4' })}
    </button>
  );
}

function ScheduleModal({ isOpen, onClose, form, updateForm, onSave }: { isOpen: boolean, onClose: () => void, form: any, updateForm: any, onSave: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden border border-white/5"
          >
            <div className="px-10 py-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Plan New Session</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Live Class Integration</p>
              </div>
              <button onClick={onClose} className="p-3 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-10 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Session Topic</label>
                  <input type="text" value={form.topic} onChange={(e) => updateForm({...form, topic: e.target.value})} placeholder="Advanced IELTS" className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/20 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Zoom Meeting ID</label>
                  <input type="text" value={form.zoomId} onChange={(e) => updateForm({...form, zoomId: e.target.value})} placeholder="XXX-XXX-XXXX" className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/20 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Meeting Date</label>
                  <input type="date" value={form.date} onChange={(e) => updateForm({...form, date: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/20 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Start Time</label>
                  <input type="time" value={form.time} onChange={(e) => updateForm({...form, time: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/20 outline-none" />
                </div>
              </div>
              <button 
                onClick={onSave}
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm uppercase tracking-widest rounded-3xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-3"
              >
                <Video className="w-5 h-5" />
                Deploy Live Class
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function UploadModal({ isOpen, onClose, title, setTitle, setFile, onSave }: { isOpen: boolean, onClose: () => void, title: string, setTitle: any, setFile: any, onSave: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden border border-white/5"
          >
            <div className="px-10 py-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Upload Resource</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Add to Vault</p>
              </div>
              <button onClick={onClose} className="p-3 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-10 space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Resource Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Vocabulary List" className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/20 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Select File</label>
                  <input type="file" onChange={(e) => { if(e.target.files) setFile(e.target.files[0]) }} className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/20 outline-none" />
                </div>
              <button 
                onClick={onSave}
                className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm uppercase tracking-widest rounded-3xl transition-all shadow-xl shadow-emerald-600/20 active:scale-95 flex items-center justify-center gap-3"
              >
                <Play className="w-5 h-5" />
                Upload Resource
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
