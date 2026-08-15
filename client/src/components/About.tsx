import React from 'react';
import { motion } from 'motion/react';
import { Compass, Quote, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { useData } from '../context/DataContext';

export const About: React.FC = () => {
  const { profile } = useData();
  const profileData = profile;

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="01"
          badge="ABOUT ME"
          title="A Little About Me"
          subtitle="Where rigorous computer science meets machine learning and wanderlust."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Creative Visual & Quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="relative rounded-3xl p-3 bg-neutral-900/60 dark:bg-[#0B0F0D] light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 overflow-hidden shadow-xl group">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-950">
                <img
                  src={profileData.aboutImage}
                  alt={profileData.fullName}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70" />
                
                {/* Floating caption */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/75 backdrop-blur-md border border-neutral-800/80 text-left">
                  <p className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Compass size={14} /> Explorer Mindset
                  </p>
                  <p className="text-xs text-neutral-300 mt-1 italic">
                    "Finding equilibrium between neural networks and mountain trails."
                  </p>
                </div>
              </div>
            </div>

            {/* Quote block */}
            <div className="p-5 rounded-2xl bg-neutral-900/40 dark:bg-[#0B0F0D]/60 light:bg-neutral-100/80 border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 text-left">
              <Quote size={20} className="text-emerald-400 mb-2" />
              <p className="text-sm text-neutral-300 dark:text-neutral-300 light:text-neutral-700 italic leading-relaxed">
                "{profileData.bio.quote}"
              </p>
            </div>
          </motion.div>

          {/* Right Column: Bio Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Narrative text */}
            <div className="space-y-4 text-base sm:text-lg text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed">
              <p className="font-medium text-white dark:text-white light:text-neutral-900">
                {profileData.bio.intro}
              </p>
              <p className="text-neutral-400 dark:text-neutral-400 light:text-neutral-600 text-base">
                {profileData.bio.body1}
              </p>
              <p className="text-neutral-400 dark:text-neutral-400 light:text-neutral-600 text-base">
                {profileData.bio.body2}
              </p>
            </div>

            {/* Core Values / Focus Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-900/50 dark:bg-[#0B0F0D] light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white dark:text-white light:text-neutral-900">Machine Learning Research</h4>
                  <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 mt-0.5">Deep neural architectures, CV, & Explainable AI</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-900/50 dark:bg-[#0B0F0D] light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white dark:text-white light:text-neutral-900">Software Craftsmanship</h4>
                  <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 mt-0.5">Clean TypeScript, scalable backends, & micro-APIs</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
