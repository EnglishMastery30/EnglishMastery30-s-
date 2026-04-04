import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Phone, Users, Video, Clock, Star, PhoneCall, PhoneOff, Mic, MicOff, VideoOff, MessageSquare, Settings, Volume2 } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import Peer from 'simple-peer';

interface User {
  id: string;
  name: string;
  isOnline: boolean;
  inCall?: boolean;
  callReason?: string;
  avatar?: string;
}

interface CallHistory {
  id: string;
  peerName: string;
  date: string;
  duration: string;
  rating: number;
  feedbackWords: string[];
  type: '1-on-1' | 'conference' | 'group';
}

const MOCK_ONLINE_USERS: User[] = [
  { id: '1', name: 'Sarah Jenkins', isOnline: true, callReason: 'Practicing job interview questions', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'David Chen', isOnline: true, callReason: 'Casual conversation practice', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Maria Garcia', isOnline: true, callReason: 'IELTS speaking part 2', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Ahmed Ali', isOnline: true, callReason: 'Discussing technology trends', avatar: 'https://i.pravatar.cc/150?u=4' },
];

const MOCK_HISTORY: CallHistory[] = [
  { id: 'h1', peerName: 'Sarah Jenkins', date: 'Today, 10:30 AM', duration: '15:20', rating: 92, feedbackWords: ['beautiful', 'clear', 'confident'], type: '1-on-1' },
  { id: 'h2', peerName: 'Group Call (3)', date: 'Yesterday, 4:15 PM', duration: '45:00', rating: 85, feedbackWords: ['good', 'nice flow'], type: 'group' },
];

const FEEDBACK_WORDS = ['beautiful', 'nice', 'good', 'clear', 'confident', 'fluent', 'expressive', 'articulate', 'engaging'];

export function CallsDashboard({ isPro, trialStartDate }: { isPro: boolean, trialStartDate: number | null }) {
  const [activeTab, setActiveTab] = useState<'online' | 'history'>('online');
  const [activeCall, setActiveCall] = useState<User | null>(null);
  const [callRating, setCallRating] = useState<number>(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [micVolume, setMicVolume] = useState(100);
  const [audioVolume, setAudioVolume] = useState(100);
  const [echoCancellation, setEchoCancellation] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  
  const [onlineUsers, setOnlineUsers] = useState<User[]>(MOCK_ONLINE_USERS);
  const [incomingCall, setIncomingCall] = useState<{from: string, name: string, signal: any, avatar?: string} | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const peerRef = useRef<Peer.Instance | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const isTrialActive = trialStartDate ? (Date.now() - trialStartDate < 24 * 60 * 60 * 1000) : false;
  const canRecord = isPro || isTrialActive;

  useEffect(() => {
    // Connect to Socket.IO server
    socketRef.current = io(window.location.origin);

    socketRef.current.on('connect', () => {
      // Register user
      socketRef.current?.emit('register', {
        name: 'Alex Johnson', // Current user
        isOnline: true,
        callReason: 'Practicing general conversation',
        avatar: 'https://i.pravatar.cc/150?u=current'
      });
    });

    socketRef.current.on('users_update', (users: User[]) => {
      // Filter out self and merge with mock users
      const realUsers = users.filter(u => u.id !== socketRef.current?.id);
      setOnlineUsers([...MOCK_ONLINE_USERS, ...realUsers]);
    });

    socketRef.current.on('incoming_call', (data) => {
      setIncomingCall(data);
    });

    socketRef.current.on('call_accepted', (signal) => {
      console.log('Call accepted', signal);
      if (peerRef.current) {
        peerRef.current.signal(signal);
      }
    });

    return () => {
      socketRef.current?.disconnect();
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream, activeCall, isVideoOn]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream, activeCall, isVideoOn]);

  useEffect(() => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = isVideoOn;
      });
    }
  }, [isVideoOn, localStream]);

  useEffect(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !isMuted;
      });
    }
  }, [isMuted, localStream]);

  const getMediaStream = async () => {
    try {
      return await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    } catch (err) {
      console.warn("No camera found, trying audio only", err);
      return await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
    }
  };

  const startCall = async (user: User) => {
    setActiveCall(user);
    
    try {
      const stream = await getMediaStream();
      setLocalStream(stream);

      if (socketRef.current && !MOCK_ONLINE_USERS.find(m => m.id === user.id)) {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: stream
        });

        peer.on('signal', data => {
          socketRef.current?.emit('call_user', {
            userToCall: user.id,
            signalData: data,
            from: socketRef.current?.id,
            name: 'Alex Johnson'
          });
        });

        peer.on('stream', remoteStream => {
          setRemoteStream(remoteStream);
        });

        peerRef.current = peer;
      } else {
        // Mock call
        setRemoteStream(stream);
      }
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  };

  const acceptCall = async () => {
    if (incomingCall) {
      setActiveCall({
        id: incomingCall.from,
        name: incomingCall.name,
        isOnline: true,
        avatar: incomingCall.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(incomingCall.name)}&background=6366f1&color=fff`
      });
      
      try {
        const stream = await getMediaStream();
        setLocalStream(stream);

        if (socketRef.current) {
          const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
          });

          peer.on('signal', data => {
            socketRef.current?.emit('answer_call', {
              to: incomingCall.from,
              signal: data
            });
          });

          peer.on('stream', remoteStream => {
            setRemoteStream(remoteStream);
          });

          peer.signal(incomingCall.signal);
          peerRef.current = peer;
        }
        setIncomingCall(null);
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    }
  };

  const rejectCall = () => {
    setIncomingCall(null);
  };

  const endCall = () => {
    setActiveCall(null);
    setShowRatingModal(true);
    if (socketRef.current) {
      socketRef.current.emit('end_call');
    }
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    setRemoteStream(null);
  };

  const submitRating = () => {
    setShowRatingModal(false);
    setCallRating(0);
    setSelectedWords([]);
    alert('Rating submitted successfully!');
  };

  const toggleWord = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  if (activeCall) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] bg-slate-900 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-slate-900" />
        
        {isVideoOn && remoteStream ? (
          <div className="absolute inset-0 z-0">
            <video 
              ref={remoteVideoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        ) : null}

        <div className="relative z-10 flex flex-col items-center w-full h-full justify-between">
          <div className="flex flex-col items-center mt-8">
            {!isVideoOn && (
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 mb-6 relative">
                <img 
                  src={activeCall.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(activeCall.name)}&background=6366f1&color=fff`} 
                  alt={activeCall.name} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeCall.name)}&background=6366f1&color=fff`;
                  }}
                />
                <div className="absolute inset-0 bg-indigo-500/20 animate-pulse" />
              </div>
            )}
            
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-md">{activeCall.name}</h2>
            <p className="text-indigo-300 mb-8 drop-shadow-md">{activeCall.callReason}</p>
          </div>
          
          {isVideoOn && localStream && (
            <div className="absolute bottom-32 right-8 w-48 h-64 bg-slate-800 rounded-2xl overflow-hidden border-2 border-indigo-500 shadow-xl z-20">
              <video 
                ref={localVideoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-col items-center w-full max-w-md">
            <div className="flex items-center gap-6 mb-8">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-colors ${isMuted ? 'bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/20' : 'bg-slate-800 hover:bg-slate-700'}`}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              <button 
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-colors ${!isVideoOn ? 'bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/20' : 'bg-slate-800 hover:bg-slate-700'}`}
              >
                {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
              </button>
              <button onClick={endCall} className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30">
                <PhoneOff className="w-8 h-8" />
              </button>
            </div>

            {!isVideoOn && (
              <div className="flex flex-col gap-4 w-64 bg-slate-800/50 p-4 rounded-2xl backdrop-blur-sm border border-slate-700">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <Volume2 className="w-4 h-4" /> Audio Volume
                    </label>
                    <span className="text-sm font-bold text-indigo-400">{audioVolume}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={audioVolume}
                    onChange={(e) => setAudioVolume(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <Mic className="w-4 h-4" /> Mic Volume
                    </label>
                    <span className="text-sm font-bold text-indigo-400">{micVolume}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={micVolume}
                    onChange={(e) => setMicVolume(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>
            )}

            {canRecord && (
              <div className="mt-6 flex items-center gap-2 text-rose-400 bg-rose-500/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-sm font-medium">Recording Call (Premium/Trial Feature)</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Community Calls</h1>
            <p className="text-slate-600 dark:text-slate-400">Practice speaking with real people in the app.</p>
          </div>
          <button 
            onClick={() => setShowSettingsModal(true)}
            className="md:hidden p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-full transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('online')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'online' 
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Online Now
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'history' 
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Call History
            </button>
          </div>
          <button 
            onClick={() => setShowSettingsModal(true)}
            className="hidden md:flex p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-full transition-colors"
            title="Audio Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'online' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Call Options Card */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Start a Practice Call</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button onClick={() => alert('Select a user from the list below to start a 1-on-1 call.')} className="bg-white/10 hover:bg-white/20 border border-white/20 p-6 rounded-2xl flex flex-col items-center text-center transition-all">
                <Phone className="w-8 h-8 mb-3 text-indigo-200" />
                <h3 className="font-bold text-lg mb-1">1-on-1 Call</h3>
                <p className="text-indigo-200 text-sm">Practice with one partner</p>
              </button>
              <button onClick={() => alert('Conference call feature coming soon! You will be able to invite up to 3 people.')} className="bg-white/10 hover:bg-white/20 border border-white/20 p-6 rounded-2xl flex flex-col items-center text-center transition-all">
                <Users className="w-8 h-8 mb-3 text-indigo-200" />
                <h3 className="font-bold text-lg mb-1">Conference</h3>
                <p className="text-indigo-200 text-sm">2-3 people discussion</p>
              </button>
              <button onClick={() => alert('Group call feature coming soon! Join a larger practice group.')} className="bg-white/10 hover:bg-white/20 border border-white/20 p-6 rounded-2xl flex flex-col items-center text-center transition-all">
                <MessageSquare className="w-8 h-8 mb-3 text-indigo-200" />
                <h3 className="font-bold text-lg mb-1">Group Call</h3>
                <p className="text-indigo-200 text-sm">Join a larger practice group</p>
              </button>
            </div>
          </div>

          {/* Online Users List */}
          {onlineUsers.length === 0 ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No users online right now</h3>
              <p className="text-slate-500 dark:text-slate-400">Check back later or invite friends to practice together.</p>
            </div>
          ) : (
            onlineUsers.map(user => (
              <div key={user.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`} 
                        alt={user.name} 
                        className="w-12 h-12 rounded-full object-cover bg-slate-100 dark:bg-slate-800"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`;
                        }}
                      />
                      <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white dark:border-slate-900 rounded-full ${user.inCall ? 'bg-amber-500' : 'bg-green-500'}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{user.name}</h3>
                      {user.inCall ? (
                        <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-full">In a call</span>
                      ) : (
                        <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full">Online</span>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => startCall(user)}
                    disabled={user.inCall}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      user.inCall 
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
                        : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20'
                    }`}
                  >
                    <PhoneCall className="w-5 h-5" />
                  </button>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-1">Call Reason:</p>
                  <p className="text-sm text-slate-900 dark:text-slate-300">"{user.callReason}"</p>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {MOCK_HISTORY.map(history => (
            <div key={history.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  {history.type === '1-on-1' ? <Phone className="w-6 h-6" /> : <Users className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">{history.peerName}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {history.date}</span>
                    <span>•</span>
                    <span>{history.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{history.rating}%</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Rating</div>
                </div>
                <div className="flex flex-wrap gap-1 justify-end">
                  {history.feedbackWords.map(word => (
                    <span key={word} className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Incoming Call Modal */}
      {incomingCall && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-indigo-500/30 text-center"
          >
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-indigo-500 mb-4 relative">
              <img 
                src={incomingCall.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(incomingCall.name)}&background=6366f1&color=fff`} 
                alt={incomingCall.name} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(incomingCall.name)}&background=6366f1&color=fff`;
                }}
              />
              <div className="absolute inset-0 bg-indigo-500/20 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{incomingCall.name}</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 animate-pulse">Incoming video call...</p>
            
            <div className="flex justify-center gap-6">
              <button 
                onClick={rejectCall}
                className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30"
              >
                <PhoneOff className="w-8 h-8" />
              </button>
              <button 
                onClick={acceptCall}
                className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30 animate-bounce"
              >
                <PhoneCall className="w-8 h-8" />
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">Rate Your Call</h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-8">How was your speaking practice?</p>

            <div className="mb-8">
              <div className="flex justify-between text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                <span>0%</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">{callRating}%</span>
                <span>100%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={callRating}
                onChange={(e) => setCallRating(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div className="mb-8">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Select descriptive words:</p>
              <div className="flex flex-wrap gap-2">
                {FEEDBACK_WORDS.map(word => (
                  <button
                    key={word}
                    onClick={() => toggleWord(word)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedWords.includes(word)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={submitRating}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-colors"
            >
              Submit Feedback
            </button>
          </motion.div>
        </div>
      )}
      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Settings className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Audio Settings</h2>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Volume2 className="w-4 h-4" /> Audio Volume
                  </label>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{audioVolume}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={audioVolume}
                  onChange={(e) => setAudioVolume(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Mic className="w-4 h-4" /> Microphone Volume
                  </label>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{micVolume}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={micVolume}
                  onChange={(e) => setMicVolume(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white mb-1">Echo Cancellation</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Reduces feedback from speakers</p>
                </div>
                <button 
                  onClick={() => setEchoCancellation(!echoCancellation)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${echoCancellation ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${echoCancellation ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            <button 
              onClick={() => setShowSettingsModal(false)}
              className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white py-3 rounded-xl font-bold transition-colors"
            >
              Done
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
