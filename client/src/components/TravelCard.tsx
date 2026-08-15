import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowUpRight, Calendar, Compass } from 'lucide-react';
import { TravelDestination } from '../types';

interface TravelCardProps {
  destination: TravelDestination;
  onClick: () => void;
  className?: string;
}

export const TravelCard: React.FC<TravelCardProps> = ({
  destination,
  onClick,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 transition-all duration-500 shadow-md ${className}`}
    >
      {/* Photo */}
      <img
        src={destination.image}
        alt={destination.location}
        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-100"
        loading="lazy"
      />

      {/* Dark & Emerald Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Floating Action Arrow */}
      <div className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-neutral-700 text-white group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-400 transition-all duration-300 group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </div>

      {/* Category Pill on Top Left */}
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-black/60 backdrop-blur-md text-emerald-400 border border-neutral-700/80">
          {destination.category}
        </span>
      </div>

      {/* Bottom Content Narrative */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 space-y-2 text-left">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
          <Calendar size={13} />
          <span>{destination.date}</span>
          <span>•</span>
          <span>{destination.country}</span>
        </div>

        <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
          {destination.location}
        </h4>

        <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100">
          {destination.description}
        </p>
      </div>
    </div>
  );
};
