import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Medal, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { useData } from '../context/DataContext';
import { EducationItem } from '../types';
import { ThesisModal } from './ThesisModal';

export const Education: React.FC = () => {
  const { education: liveEducation } = useData();
  const educationData = liveEducation;
  const [isThesisModalOpen, setIsThesisModalOpen] = useState<boolean>(false);

  return (
    <section id="education" className="py-20 md:py-28 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-0 w-[420px] h-[420px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-[380px] h-[380px] bg-emerald-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="03"
          badge="ACADEMIC FOUNDATIONS"
          title="Education & Foundations"
          subtitle="Rigorous academic training across Computer Science, Machine Learning systems, and algorithmic theory."
        />

        {/* Education Milestone Cards List */}
        <div className="space-y-6 sm:space-y-8">
          {educationData.map((item: EducationItem, idx: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="p-6 sm:p-8 lg:p-9 rounded-2xl sm:rounded-3xl bg-[#090D0B] dark:bg-[#090D0B] light:bg-white border border-neutral-800/90 dark:border-neutral-800/90 light:border-neutral-200 shadow-xl text-left relative group hover:border-emerald-500/40 transition-all duration-300"
            >
              {/* Top Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Left Title & Institution Info */}
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-3.5 py-1 rounded-full text-xs font-mono font-medium bg-[#111A15] text-[#22C55E] border border-emerald-900/60 dark:bg-[#111A15] dark:text-[#22C55E] dark:border-emerald-900/60 light:bg-emerald-50 light:text-emerald-700 light:border-emerald-200">
                      {item.badgeLabel || 'Degree Completed'}
                    </span>
                    <span className="text-xs font-mono text-neutral-400 dark:text-neutral-400 light:text-neutral-500">
                      {item.period}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-neutral-900 mt-2.5">
                    {item.degree}
                  </h3>

                  <p className="text-xs sm:text-sm font-medium text-emerald-400 dark:text-emerald-400 light:text-emerald-600 mt-1">
                    {item.institution} • {item.major}
                  </p>
                </div>

                {/* Right Floating Result Box */}
                {item.grade && (
                  <div className="px-4 py-2.5 rounded-2xl bg-[#111714] dark:bg-[#111714] light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 flex items-center gap-3 shrink-0 self-start mt-2 sm:mt-0">
                    <div className="text-emerald-400">
                      <Medal size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-400 light:text-neutral-500 uppercase tracking-wider">
                        {item.resultLabel || 'Grade / Result'}
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-white dark:text-white light:text-neutral-900 font-mono tracking-wide">
                        {item.grade}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Thin Divider Line */}
              <div className="border-b border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 my-6 sm:my-7" />

              {/* Bottom 2-Column Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                {/* Left Column: Academic Distinction */}
                <div className="lg:col-span-6 space-y-2.5">
                  <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-400 light:text-neutral-500 uppercase tracking-wider font-semibold">
                    ACADEMIC OVERVIEW
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Thesis Quick Trigger Button if available */}
                  {item.thesis && (
                    <div className="pt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => setIsThesisModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors cursor-pointer"
                      >
                        <Sparkles size={13} />
                        <span>View B.Sc Capstone Thesis & Research Abstract</span>
                        <ArrowUpRight size={13} />
                      </button>
                    </div>
                  )}

                  {/* Coursework Tags Preview */}
                  {item.coursework && item.coursework.length > 0 && (
                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {item.coursework.slice(0, 6).map((courseName) => (
                        <span
                          key={courseName}
                          className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-neutral-950/80 dark:bg-neutral-950/80 light:bg-neutral-100 text-neutral-300 dark:text-neutral-300 light:text-neutral-600 border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200"
                        >
                          {courseName}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Key Honors */}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="lg:col-span-6 space-y-2.5">
                    <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-400 light:text-neutral-500 uppercase tracking-wider font-semibold">
                      KEY HIGHLIGHTS
                    </p>
                    <ul className="space-y-2">
                      {item.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200 dark:text-neutral-200 light:text-neutral-800 leading-normal"
                        >
                          <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Thesis Modal */}
      <ThesisModal
        isOpen={isThesisModalOpen}
        onClose={() => setIsThesisModalOpen(false)}
      />
    </section>
  );
};
