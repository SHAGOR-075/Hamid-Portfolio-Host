import React from 'react';
import { motion } from 'motion/react';
import { 
  Brain, 
  Github, 
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { useData } from '../context/DataContext';
import { mlProjectsData as fallbackProjects } from '../data/portfolioData';

export const MLProject: React.FC = () => {
  const { projects: liveProjects } = useData();
  const projectsList = liveProjects.length > 0 ? liveProjects : fallbackProjects;
  const featured = projectsList[0];
  const secondaryProjects = projectsList.slice(1);

  return (
    <section id="projects" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="04"
          badge="MACHINE LEARNING SHOWCASE"
          title="Featured ML Project"
          subtitle="Real-world machine learning architectures engineered for clinical precision and high-throughput inference."
        />

        {/* Flagship Large Project Card */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl bg-neutral-900/60 dark:bg-[#0B0F0D] light:bg-white border border-emerald-500/30 shadow-2xl overflow-hidden p-6 sm:p-8 lg:p-10 mb-12"
          >
            {/* Top Banner Tag */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Brain size={18} />
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  FLAGSHIP AI CAPSTONE RESEARCH
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-800 dark:bg-neutral-800 light:bg-neutral-100 text-neutral-300 dark:text-neutral-300 light:text-neutral-700 border border-neutral-700/60">
                {featured.category}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left: Project Visual Image & Metrics Grid */}
              <div className="lg:col-span-6 space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 group aspect-[16/10]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </div>

                {/* Metrics Grid */}
                {featured.metrics && featured.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {featured.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="p-3 rounded-xl bg-neutral-950/60 dark:bg-neutral-950/80 light:bg-neutral-50 border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 text-center"
                      >
                        <p className="text-lg sm:text-xl font-extrabold font-mono text-emerald-400">
                          {metric.value}
                        </p>
                        <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider mt-0.5">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Narrative text, Tech Stack & Action GitHub */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-neutral-900 leading-tight">
                    {featured.title}
                  </h3>
                  {featured.tagline && (
                    <p className="text-sm text-emerald-400 font-medium mt-1">
                      {featured.tagline}
                    </p>
                  )}
                </div>

                {/* Narrative text (without bold labels) */}
                <div className="space-y-3 text-sm text-neutral-300 dark:text-neutral-300 light:text-neutral-600 leading-relaxed">
                  {featured.problem && <p>{featured.problem}</p>}
                  {featured.solution && <p>{featured.solution}</p>}
                  {featured.results && <p className="text-emerald-400 font-medium">{featured.results}</p>}
                </div>

                {/* Frameworks & Tooling Chips */}
                {featured.tags && featured.tags.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-mono text-neutral-400 font-semibold uppercase tracking-wider">
                      Frameworks & Tooling
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {featured.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* GitHub Action Link */}
                {featured.githubUrl && (
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      id="ml-flagship-github-btn"
                      href={featured.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-neutral-800 dark:bg-neutral-800 light:bg-neutral-100 text-white dark:text-white light:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-700 light:hover:bg-neutral-200 border border-neutral-700/80 transition-colors"
                    >
                      <Github size={16} />
                      <span>GitHub Repository</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Secondary ML Projects Grid */}
        {secondaryProjects.length > 0 && (
          <div className="mt-16 space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white dark:text-white light:text-neutral-900">
                  Additional Machine Learning & Data Projects
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">Applied NLP, tabular prediction pipelines, and ensemble modeling.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {secondaryProjects.map((proj) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5 }}
                  className="group p-6 rounded-3xl bg-neutral-900/50 dark:bg-[#0B0F0D] light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Category & Links */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {proj.category}
                      </span>
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-neutral-800/60 hover:bg-emerald-500 hover:text-black text-neutral-300 transition-colors"
                          aria-label="View on GitHub"
                        >
                          <Github size={15} />
                        </a>
                      )}
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h4 className="text-lg font-bold text-white dark:text-white light:text-neutral-900 group-hover:text-emerald-400 transition-colors">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 mt-1 leading-relaxed">
                        {proj.solution}
                      </p>
                    </div>

                    {/* Metrics bar */}
                    {proj.metrics && proj.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-neutral-950/60 dark:bg-neutral-950/80 light:bg-neutral-50 border border-neutral-800/60 text-center">
                        {proj.metrics.map((m) => (
                          <div key={m.label}>
                            <p className="text-sm font-mono font-bold text-emerald-400">{m.value}</p>
                            <p className="text-[9px] text-neutral-400 uppercase">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tech Chips */}
                  {proj.tags && proj.tags.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-neutral-800/60 flex flex-wrap gap-1.5">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-800 dark:bg-neutral-800 light:bg-neutral-100 text-neutral-300 dark:text-neutral-300 light:text-neutral-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
