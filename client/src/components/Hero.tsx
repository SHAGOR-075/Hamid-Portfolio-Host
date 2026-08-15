import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Terminal, Download, Compass, Brain, Code, Cpu } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SocialLinks } from './SocialLinks';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { profile } = useData();
  const profileData = profile;

  const floatingTags = [
    // { label: 'ML', icon: Brain, position: 'top-6 -left-6 sm:-left-8', delay: 0 },
    // { label: 'Python', icon: Code, position: 'top-1/3 -right-6 sm:-right-10', delay: 1 },
    // { label: 'AI', icon: Sparkles, position: 'bottom-20 -left-6 sm:-left-10', delay: 2 },
    { label: 'CSE', icon: Terminal, position: 'bottom-4 -right-4 sm:-right-6', delay: 1.5 },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden bg-grid-pattern"
    >
      {/* Background Ambient Emerald Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[650px] h-[350px] sm:h-[450px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-900/15 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-7 text-left">
            {/* Small Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{profileData.badge}</span>
              <span className="text-emerald-400">✦</span>
            </motion.div>

            {/* Large Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <p className="text-base sm:text-lg font-mono text-neutral-400 dark:text-neutral-400 light:text-neutral-600">
                Hi, I'm <span className="text-white dark:text-white light:text-neutral-900 font-bold">{profileData.fullName}</span>.
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white dark:text-white light:text-neutral-900 tracking-tight leading-[1.08]">
                Turning Ideas Into <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                  Intelligent Digital
                </span> <br className="hidden sm:inline" />
                Experiences.
              </h1>
            </motion.div>

            {/* Professional Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-300 dark:text-neutral-300 light:text-neutral-600 max-w-2xl leading-relaxed"
            >
              A Computer Science & Engineering graduate passionate about <span className="text-emerald-400 font-medium">Machine Learning</span>, modern software development, and exploring the world through technology and travel.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <button
                id="hero-view-work-btn"
                onClick={() => scrollToSection('projects')}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>View My Work</span>
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                id="hero-connect-btn"
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-neutral-900/80 dark:bg-[#0B0F0D] light:bg-white text-white dark:text-white light:text-neutral-900 border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 hover:border-emerald-500/50 hover:text-emerald-400 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Let's Connect</span>
              </button>

              <button
                id="hero-resume-secondary-btn"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-xs font-medium text-neutral-400 hover:text-emerald-400 transition-colors"
                title="View Resume / CV"
              >
                <Download size={15} />
                <span>View Resume</span>
              </button>
            </motion.div>

            {/* Availability Indicator & Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 border-t border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2.5 text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-500">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-medium text-neutral-300 dark:text-neutral-300 light:text-neutral-700">
                  Available for full-time ML & engineering opportunities
                </span>
              </div>

              {/* Social Icons Row */}
              <SocialLinks iconSize={16} />
            </motion.div>
          </div>

          {/* Right Column: Premium Profile Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              {/* Outer Glow Halo */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/30 via-emerald-400/10 to-teal-500/20 rounded-3xl blur-2xl opacity-70 -z-10" />

              {/* Profile Card / Frame */}
              <div className="relative w-64 sm:w-80 md:w-88 aspect-[4/5] rounded-3xl p-3 bg-neutral-900/60 dark:bg-[#0B0F0D] light:bg-neutral-100 border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 shadow-2xl overflow-hidden">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-950">
                  <img
                    src={profileData.profileImage}
                    alt={profileData.fullName}
                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                    loading="eager"
                  />
                  {/* Subtle Bottom Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

                  {/* Profile Card Label */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-neutral-800/80 text-left">
                    <p className="text-xs font-mono text-emerald-400 font-bold">{profileData.fullName.toUpperCase()}</p>
                    <p className="text-[11px] text-neutral-300 truncate">{profileData.badge}</p>
                  </div>
                </div>
              </div>

              {/* Subtle Floating Tech Badges */}
              {floatingTags.map((tag) => {
                const Icon = tag.icon;
                return (
                  <motion.div
                    key={tag.label}
                    initial={{ y: 0 }}
                    animate={{ y: [-4, 4, -4] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: tag.delay,
                    }}
                    className={`absolute ${tag.position} z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900/90 dark:bg-[#0B0F0D]/90 light:bg-white/90 backdrop-blur-md border border-emerald-500/40 text-emerald-300 shadow-lg text-xs font-mono font-bold select-none`}
                  >
                    <Icon size={13} className="text-emerald-400" />
                    <span>{tag.label}</span>
                  </motion.div>
                );
              })}

              {/* Decorative Corner Sparkle */}
              <div className="absolute -top-3 -right-3 text-emerald-400 text-lg animate-pulse select-none">
                ✦
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
