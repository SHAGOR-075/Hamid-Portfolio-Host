import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Compass, Sparkles } from 'lucide-react';
import { TravelDestination } from '../types';

interface TravelLightboxProps {
  destinations: TravelDestination[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const TravelLightbox: React.FC<TravelLightboxProps> = ({
  destinations,
  currentIndex,
  onClose,
  onSelectIndex,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelectIndex((currentIndex + 1) % destinations.length);
      if (e.key === 'ArrowLeft') onSelectIndex((currentIndex - 1 + destinations.length) % destinations.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, destinations.length, onClose, onSelectIndex]);

  if (currentIndex === null) return null;
  const current = destinations[currentIndex];

  const handleNext = () => {
    onSelectIndex((currentIndex + 1) % destinations.length);
  };

  const handlePrev = () => {
    onSelectIndex((currentIndex - 1 + destinations.length) % destinations.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-6 select-none">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/92 backdrop-blur-lg"
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-5 right-5 z-20 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors"
          aria-label="Close fullscreen lightbox"
        >
          <X size={22} />
        </button>

        {/* Prev / Next Arrows */}
        <button
          onClick={handlePrev}
          className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-900/80 hover:bg-emerald-500 hover:text-black text-white border border-neutral-700 transition-all active:scale-95 shadow-xl"
          aria-label="Previous destination"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-900/80 hover:bg-emerald-500 hover:text-black text-white border border-neutral-700 transition-all active:scale-95 shadow-xl"
          aria-label="Next destination"
        >
          <ChevronRight size={24} />
        </button>

        {/* Content Card */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-5xl w-full max-h-[90vh] bg-[#070B09] rounded-3xl border border-emerald-500/30 overflow-hidden flex flex-col md:flex-row shadow-2xl z-10"
        >
          {/* Main Image */}
          <div className="relative md:w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[500px]">
            <img
              src={current.image}
              alt={current.location}
              className="w-full h-full object-cover max-h-[70vh] md:max-h-[85vh]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
          </div>

          {/* Details Sidebar */}
          <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto bg-neutral-950/80">
            <div className="space-y-4">
              {/* Header Info */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {current.category}
                </span>
                <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                  <Calendar size={13} className="text-emerald-400" /> {current.date}
                </span>
              </div>

              {/* Title & Location */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {current.location}
                </h3>
                <p className="text-sm font-semibold text-emerald-400 mt-0.5 flex items-center gap-1.5">
                  <MapPin size={15} /> {current.country}
                </p>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  {current.coordinates}
                </p>
              </div>

              {/* Highlight */}
              <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                <p className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  Key Landmark
                </p>
                <p className="text-xs text-neutral-200 font-semibold mt-0.5">
                  {current.highlight}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-300 leading-relaxed">
                {current.description}
              </p>

              {/* Personal Story Quote */}
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 italic text-xs text-emerald-200/90 leading-relaxed">
                "{current.storyQuote}"
              </div>
            </div>

            {/* Counter Footer */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>{currentIndex + 1} of {destinations.length} Places</span>
              <span className="text-emerald-400">Use ← → keys to navigate</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
