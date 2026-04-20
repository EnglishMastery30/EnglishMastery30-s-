import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function AudioVisualizer({ volume, isConnected }: { volume: number, isConnected: boolean }) {
  const [bars, setBars] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    if (!isConnected) {
      setBars(Array(12).fill(0));
      return;
    }

    const interval = setInterval(() => {
      setBars(prev => prev.map((_, i) => {
        // Create a more sophisticated wave effect
        // Base height from volume, scaled appropriately
        const baseHeight = volume * 150;
        
        // Use sine wave based on index and time for a flowing movement
        const time = Date.now() / 200;
        const wave = Math.sin(time + i * 0.5) * 15 * (volume + 0.1);
        
        // Distribution factor - middle bars are more reactive
        const distIndex = i - 5.5; // shift to center at index 5.5
        const positionFactor = Math.exp(-(distIndex * distIndex) / 20); 
        
        let height = (baseHeight * positionFactor * (0.8 + Math.random() * 0.4)) + wave;
        
        // Add a secondary random jitter for organic feel
        height += (Math.random() - 0.5) * 10 * volume;
        
        // Add a minimum movement when connected
        if (height < 6) height = 6 + Math.sin(time * 2 + i) * 3;
        
        // Cap maximum height
        if (height > 100) height = 100;
        
        return height;
      }));
    }, 40);

    return () => clearInterval(interval);
  }, [volume, isConnected]);

  // Determine color based on volume (clarity/loudness feedback)
  // Low volume: gray/blue (too quiet)
  // Medium volume: emerald (good clarity)
  // High volume: amber/rose (too loud/distorted)
  let colorClass = "bg-indigo-500 dark:bg-indigo-400";
  let glowClass = "bg-indigo-500/30 dark:bg-indigo-400/20";
  let statusText = "Ready";

  if (isConnected) {
    if (volume < 0.01) {
      colorClass = "bg-slate-400 dark:bg-slate-500";
      glowClass = "bg-slate-400/20 dark:bg-slate-500/20";
      statusText = "Listening...";
    } else if (volume < 0.05) {
      colorClass = "bg-indigo-400 dark:bg-indigo-500";
      glowClass = "bg-indigo-400/30 dark:bg-indigo-500/30";
      statusText = "Too quiet";
    } else if (volume < 0.15) {
      colorClass = "bg-emerald-500 dark:bg-emerald-400";
      glowClass = "bg-emerald-500/40 dark:bg-emerald-400/30";
      statusText = "Clear & Good Volume";
    } else {
      colorClass = "bg-amber-500 dark:bg-amber-400";
      glowClass = "bg-amber-500/40 dark:bg-amber-400/30";
      statusText = "Too loud!";
    }
  } else {
    statusText = "Disconnected";
  }

  return (
    <div className="flex flex-col items-center justify-center w-full relative py-8">
      <div className="flex items-end justify-center gap-1.5 h-32 w-full mb-6 relative z-10">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            animate={{ height: `${Math.max(4, height)}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
            className={`w-3 sm:w-4 rounded-full ${colorClass} transition-colors duration-300`}
            style={{ minHeight: '4px' }}
          />
        ))}
      </div>
      
      {/* Background glow that pulses with overall volume */}
      <motion.div 
        animate={{ 
          scale: isConnected ? 1 + volume * 3 : 1, 
          opacity: isConnected ? 0.6 : 0.2 
        }}
        transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl ${glowClass} transition-colors duration-500 pointer-events-none`}
      />

      <div className="relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className={`w-2 h-2 rounded-full ${isConnected ? (volume > 0.01 ? 'animate-pulse ' + colorClass : colorClass) : 'bg-slate-400'}`} />
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
          {statusText}
        </span>
      </div>
    </div>
  );
}
