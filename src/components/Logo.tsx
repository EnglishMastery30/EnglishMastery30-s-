import React from 'react';

export function Logo({ className = "", showText = true, layout = "horizontal", forceDark = false }: { className?: string, showText?: boolean, layout?: "horizontal" | "vertical", forceDark?: boolean }) {
  const Icon = () => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="swooshGrad" x1="0%" y1="50%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0B209A" />
          <stop offset="50%" stopColor="#8A2BE2" />
          <stop offset="100%" stopColor="#FF6B00" />
        </linearGradient>
        <linearGradient id="bookLeftDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A1172" />
          <stop offset="100%" stopColor="#03045E" />
        </linearGradient>
        <linearGradient id="bookLeftLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
        <linearGradient id="bookRightDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C1121F" />
          <stop offset="100%" stopColor="#780000" />
        </linearGradient>
        <linearGradient id="bookRightLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF7A00" />
          <stop offset="100%" stopColor="#E63946" />
        </linearGradient>
        <linearGradient id="barsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8A2BE2" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
      </defs>

      {/* Swoosh arrow starting from bottom-left wrapping to top-right */}
      <path d="M 28 68 C 10 50 15 25 40 15 C 55 10 70 15 80 25 L 80 32 L 94 18 L 78 4 L 78 12 C 60 2 30 5 15 25 C 2 45 10 65 24 75 Z" fill="url(#swooshGrad)" />
      
      {/* Audio Bars (Center) */}
      <rect x="42" y="24" width="6" height="14" rx="3" fill="url(#barsGrad)" />
      <rect x="52" y="19" width="6" height="24" rx="3" fill="url(#barsGrad)" />
      <rect x="62" y="27" width="6" height="14" rx="3" fill="url(#barsGrad)" />

      {/* Bottom base shadow/pages */}
      <path d="M 24 55 Q 50 65 52 75 L 52 82 Q 40 75 22 75 L 18 80 L 16 80 L 24 55 Z" fill="#0A0B3F" />
      <path d="M 76 55 Q 50 65 48 75 L 48 82 Q 60 75 78 75 L 82 80 L 84 80 L 76 55 Z" fill="#630000" />

      {/* Book Left Spread */}
      <path d="M 28 35 L 28 60 Q 40 60 50 70 L 50 45 Q 40 38 28 35 Z" fill="url(#bookLeftLightGrad)" />
      <path d="M 24 40 L 24 64 Q 40 64 50 73 L 50 49 Q 40 43 24 40 Z" fill="#03045E" />
      <path d="M 20 46 L 20 68 Q 40 68 50 76 L 50 52 Q 40 47 20 46 Z" fill="url(#bookLeftDarkGrad)" />

      {/* Book Right Spread */}
      <path d="M 72 35 L 72 60 Q 60 60 50 70 L 50 45 Q 60 38 72 35 Z" fill="url(#bookRightLightGrad)" />
      <path d="M 76 40 L 76 64 Q 60 64 50 73 L 50 49 Q 60 43 76 40 Z" fill="#C1121F" />
      <path d="M 80 46 L 80 68 Q 60 68 50 76 L 50 52 Q 60 47 80 46 Z" fill="url(#bookRightDarkGrad)" />
      
      {/* Front glowing pages */}
      <path d="M 28 32 L 28 58 Q 40 58 50 68 L 50 43 Q 40 35 28 32 Z" fill="url(#bookLeftLightGrad)" />
      <path d="M 72 32 L 72 58 Q 60 58 50 68 L 50 43 Q 60 35 72 32 Z" fill="url(#bookRightLightGrad)" />
    </svg>
  );

  if (!showText) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="w-10 h-10">
          <Icon />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${layout === 'vertical' ? 'flex-col items-center text-center gap-2' : 'flex-row items-center gap-3'} select-none ${className}`}>
      {/* Logo Icon */}
      <div className={`${layout === 'vertical' ? 'w-32 h-32 sm:w-40 sm:h-40' : 'w-12 h-12'} shrink-0 relative flex items-center justify-center`}>
        <div className="w-full h-full">
          <Icon />
        </div>
        {layout === 'horizontal' && (
          <div className="absolute -top-1 -right-4 bg-gradient-to-r from-[#FF7A00] to-[#E60049] text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm z-10">
            RRR
          </div>
        )}
      </div>
      
      <div className={`flex flex-col justify-center ${layout === 'vertical' ? 'items-center' : 'items-start'}`}>
        
        {/* Main Title Row */}
        <div className={`relative flex items-center gap-1.5 leading-none ${layout === 'vertical' ? 'mt-4' : ''}`}>
          <span className={`${layout === 'vertical' ? 'text-5xl sm:text-6xl' : 'text-xl sm:text-2xl'} font-[900] tracking-tight ${forceDark ? 'text-white' : 'text-[#06084C] dark:text-white'}`}>
            English
          </span>
          <span className={`${layout === 'vertical' ? 'text-5xl sm:text-6xl' : 'text-xl sm:text-2xl'} font-[900] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF2B44] to-[#E5005A]`}>
            Master
          </span>
          
          {layout === 'vertical' && (
             <div className="absolute -top-3 sm:-top-5 -right-8 sm:-right-12 text-[10px] sm:text-xs px-2.5 py-1 bg-gradient-to-r from-[#FF7A00] to-[#E60049] text-white font-black rounded-lg shadow-sm tracking-wide">
              RRR
            </div>
          )}
        </div>
        
        {/* Tagline "READ. REPEAT. RESPOND." */}
        <div className={`flex items-center justify-center w-full gap-2 ${layout === 'vertical' ? 'mt-6 sm:mt-8' : 'mt-1'}`}>
          <div className={`h-[1px] ${layout === 'vertical' ? 'w-8 sm:w-16' : 'w-6'} bg-gradient-to-r from-[#0E4CB5] to-transparent rounded-full`} style={{ direction: 'rtl' }} />
          <div className={`flex items-center gap-2 ${layout === 'vertical' ? 'text-[11px] sm:text-[13px]' : 'text-[7px]'} font-black outline-none tracking-[0.25em] uppercase whitespace-nowrap`}>
            <span className="text-[#0E4CB5]">
              READ.
            </span>
            <span className="text-[#551AA9]">
              REPEAT.
            </span>
            <span className="text-[#E73111]">
              RESPOND.
            </span>
          </div>
          <div className={`h-[1px] ${layout === 'vertical' ? 'w-8 sm:w-16' : 'w-6'} bg-gradient-to-r from-[#E73111] to-transparent rounded-full`} />
        </div>
        
      </div>
    </div>
  );
}



