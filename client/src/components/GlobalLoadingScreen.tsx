import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal } from 'lucide-react';

interface GlobalLoadingScreenProps {
  progress?: number;
}

export const GlobalLoadingScreen: React.FC<GlobalLoadingScreenProps> = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] bg-[#050505] text-white flex flex-col items-center justify-center p-6 select-none overflow-hidden"
    >
      {/* Radial ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Center Brand Visual */}
      <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
        {/* Animated Brand Emblem Hexagon Ring */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
          {/* Glowing rotating outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-3xl border-2 border-dashed border-emerald-500/40 shadow-lg shadow-emerald-500/10"
          />
          {/* Reverse counter ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-2xl border border-emerald-400/20"
          />
          {/* Center Monogram */}
          <div className="relative w-12 h-12 rounded-2xl bg-[#081711] border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-inner">
            <span className="font-mono text-lg font-black tracking-tighter">AHK</span>
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-mono"
          >
            ABDUL HAMID KHOKON
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest"
          >
            <Terminal size={13} className="animate-pulse text-emerald-400" />
            <span>CSE GRADUATE & ML ENTHUSIAST</span>
          </motion.div>
        </div>

        {/* Dynamic Glowing Progress Bar & Status Text */}
        <div className="w-56 sm:w-64 space-y-2.5 pt-2">
          <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden border border-neutral-800 p-0.5">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-300 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)]"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 px-1">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Sparkles size={11} className="text-emerald-400" /> System Initialization
            </span>
            <span className="text-emerald-400 font-bold">READY</span>
          </div>
        </div>
      </div>

      {/* Subtle Footer Tag */}
      <div className="absolute bottom-6 text-center font-mono text-[10px] text-neutral-400 tracking-wider">
        INTELLIGENT SYSTEMS & APPLIED AI • PORTFOLIO 2026
      </div>
    </motion.div>
  );
};
