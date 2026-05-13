import React, { useState, useEffect } from 'react';
import { WifiOff, X } from 'lucide-react';

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isVisible, setIsVisible] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      // Wait a moment before hiding to show "back online" state if desired, 
      // or just hide immediately.
      setTimeout(() => setIsVisible(false), 2000);
    };
    
    const handleOffline = () => {
      setIsOffline(true);
      setIsVisible(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isVisible && !isOffline) return null;

  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${isOffline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      <div className="bg-slate-900/95 backdrop-blur-sm dark:bg-black/95 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-800 pointer-events-auto min-w-[280px]">
        {isOffline ? (
          <>
            <div className="bg-rose-500/20 p-2 rounded-xl text-rose-400 shrink-0 animate-pulse">
              <WifiOff className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">You are offline</p>
              <p className="text-xs text-slate-400 font-medium">Please check your connection.</p>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="p-2 hover:bg-slate-800 rounded-xl transition-colors shrink-0 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="w-full text-center py-1">
             <p className="text-sm font-semibold text-emerald-400">Back online</p>
          </div>
        )}
      </div>
    </div>
  );
}
