import React from 'react';
import { motion } from 'motion/react';

interface SectionHeaderProps {
  number: string;
  badge: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  badge,
  title,
  subtitle,
  align = 'left',
  className = ""
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`}>
      {/* Editorial Marker & Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider mb-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ${isCenter ? 'mx-auto' : ''}`}
      >
        <span className="font-bold text-emerald-400">{number}</span>
        <span className="text-emerald-500/40">•</span>
        <span className="uppercase tracking-widest font-semibold">{badge}</span>
        <span className="text-emerald-400">✦</span>
      </motion.div>

      {/* Main Section Title */}
      <motion.h2 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-neutral-900 leading-[1.15]"
      >
        {title}
      </motion.h2>

      {/* Subtitle / Narrative */}
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-neutral-400 dark:text-neutral-400 light:text-neutral-600 leading-relaxed font-normal"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
