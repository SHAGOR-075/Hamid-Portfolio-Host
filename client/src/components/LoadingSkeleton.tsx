import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full space-y-6 text-center z-10 animate-pulse">
        {/* Animated Brand Pulse Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider mx-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>LOADING PORTFOLIO DATA...</span>
        </div>

        {/* Skeleton Card Boxes */}
        <div className="space-y-3 p-6 rounded-2xl bg-[#090D0B] border border-neutral-800/80 shadow-2xl">
          <div className="h-6 bg-neutral-800/80 rounded-lg w-3/4 mx-auto" />
          <div className="h-4 bg-neutral-800/60 rounded-md w-1/2 mx-auto" />
          <div className="pt-4 flex justify-center gap-2">
            <div className="h-8 bg-emerald-500/20 rounded-xl w-24 border border-emerald-500/30" />
            <div className="h-8 bg-neutral-800/60 rounded-xl w-24" />
          </div>
        </div>

        {/* Skeleton Grid Items */}
        <div className="grid grid-cols-3 gap-3">
          <div className="h-16 bg-[#090D0B] border border-neutral-800/80 rounded-xl" />
          <div className="h-16 bg-[#090D0B] border border-neutral-800/80 rounded-xl" />
          <div className="h-16 bg-[#090D0B] border border-neutral-800/80 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
