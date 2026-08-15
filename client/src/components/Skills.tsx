import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  BrainCircuit, 
  Cpu, 
  Table, 
  Layers, 
  BarChart3, 
  Terminal, 
  FileCode2, 
  FileCode, 
  Atom, 
  Server, 
  Palette, 
  Network, 
  GitBranch, 
  BookOpen, 
  SquareTerminal, 
  Monitor,
  Sparkles,
  Zap
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { skillCategories } from '../data/skills';
import { useData } from '../context/DataContext';
import { SkillItem } from '../types';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code2,
  BrainCircuit,
  Cpu,
  Table,
  Layers,
  BarChart3,
  Terminal,
  FileCode2,
  FileCode,
  Atom,
  Server,
  Palette,
  Network,
  GitBranch,
  BookOpen,
  SquareTerminal,
  Monitor,
};

export const Skills: React.FC = () => {
  const { skills: liveSkills } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredSkills = activeCategory === 'all'
    ? liveSkills
    : liveSkills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="02"
          badge="TECHNICAL TOOLKIT"
          title="My Technical Toolkit"
          subtitle="Technologies I use to build, experiment, train models, and solve computational problems."
        />

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {skillCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`skill-filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                    : 'bg-neutral-900/60 dark:bg-[#0B0F0D] light:bg-neutral-100 text-neutral-400 dark:text-neutral-400 light:text-neutral-600 hover:text-white dark:hover:text-white light:hover:text-black border border-neutral-800 dark:border-neutral-800 light:border-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills Card Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill: SkillItem) => {
              const Icon = iconMap[skill.iconName] || Code2;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.25 }}
                  key={skill.name}
                  id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className="group relative p-5 rounded-2xl bg-neutral-900/50 dark:bg-[#0B0F0D] light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Icon & Category Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors duration-300">
                        <Icon size={20} />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-neutral-800 dark:bg-neutral-800/90 light:bg-neutral-100 text-neutral-300 dark:text-neutral-300 light:text-neutral-600 border border-neutral-700/50 dark:border-neutral-700/50 light:border-neutral-200">
                        {skill.categoryLabel}
                      </span>
                    </div>

                    {/* Skill Name & Description */}
                    <h3 className="text-base font-bold text-white dark:text-white light:text-neutral-900 group-hover:text-emerald-400 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 mt-1.5 leading-relaxed line-clamp-2">
                      {skill.description}
                    </p>
                  </div>

                  {/* Level & Experience Footer */}
                  <div className="mt-5 pt-3.5 border-t border-neutral-800/60 dark:border-neutral-800/60 light:border-neutral-100 space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-neutral-400 dark:text-neutral-400 light:text-neutral-500">Proficiency</span>
                      <span className="text-emerald-400 font-bold">{skill.level}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-neutral-800 dark:bg-neutral-800 light:bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
