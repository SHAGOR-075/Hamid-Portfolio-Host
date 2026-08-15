import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  GraduationCap,
  Briefcase,
  Award,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  Mail,
  FileText,
} from 'lucide-react';
import { useData } from '../context/DataContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { profile: profileData, education: educationData, projects: mlProjectsData } = useData();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  // WhatsApp Link generator
  const rawPhone = profileData.phone || '+8801700000000';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const whatsappMsg = encodeURIComponent(`Hi ${profileData.fullName}, I would like to request your official Resume / CV.`);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMsg}`;

  const handleGoToContact = () => {
    onClose();
    setTimeout(() => {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-[#0A0E0C] text-white rounded-2xl border border-emerald-500/30 shadow-2xl overflow-hidden flex flex-col z-10 my-4"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-neutral-800 bg-[#063B2A]/50 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <FileText size={18} />
              </div>
              <div className="text-left">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Curriculum Vitae</h3>
                <p className="text-xs text-emerald-400 font-mono">Official Profile & Portfolio</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 print:p-0 print:text-black">
            {/* Top Prompt Banner: Contact Admin for Resume */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-emerald-900/40 to-emerald-950/80 border border-emerald-500/40 text-center space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/10 to-transparent pointer-events-none" />

              <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto">
                <Sparkles size={22} />
              </div>

              <div className="space-y-1.5 relative z-10">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Contact Admin for Resume
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  To receive the official PDF Resume / CV file, please reach out directly via WhatsApp or submit a quick message in the Contact section below.
                </p>
              </div>

              {/* Action Buttons: WhatsApp & Contact Section */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 relative z-10">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp Admin</span>
                </a>

                <button
                  onClick={handleGoToContact}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-emerald-500/50 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Mail size={16} />
                  <span>Contact Section</span>
                </button>
              </div>
            </div>

            {/* Profile Overview Header info */}
            <div className="border-b border-neutral-800 pb-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{profileData.fullName}</h1>
                  <p className="text-emerald-400 font-medium text-sm mt-0.5">{profileData.title}</p>
                </div>
                <div className="text-xs text-neutral-400 space-y-1 sm:text-right font-mono">
                  <p>{profileData.email}</p>
                  <p>{profileData.location}</p>
                  <p className="text-emerald-400/90">{profileData.availability}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-neutral-300 leading-relaxed max-w-3xl">
                {profileData.bio.intro} {profileData.bio.body1}
              </p>
            </div>

            {/* Education */}
            <div className="text-left">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-wider mb-4">
                <GraduationCap size={16} />
                <span>Education</span>
              </div>
              <div className="space-y-4">
                {educationData.map((edu) => (
                  <div key={edu.id} className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h4 className="font-bold text-white text-base">{edu.degree}</h4>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-sm text-emerald-300/90 font-medium">{edu.institution} — {edu.location}</p>
                    {edu.grade && <p className="text-xs text-neutral-400 font-mono mt-0.5">{edu.grade}</p>}
                    {edu.thesis && (
                      <div className="mt-3 p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs">
                        <span className="font-semibold text-emerald-300">Undergraduate Thesis: </span>
                        <span className="text-neutral-300">{edu.thesis.title}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Selected ML Projects */}
            <div className="text-left">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-wider mb-4">
                <Briefcase size={16} />
                <span>Selected Machine Learning Projects</span>
              </div>
              <div className="space-y-4">
                {mlProjectsData.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h4 className="font-bold text-white text-base">{proj.title}</h4>
                      <span className="text-xs text-emerald-400 font-mono">{proj.category}</span>
                    </div>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">{proj.solution}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-800 text-neutral-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Technical Competencies */}
            <div className="text-left">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-wider mb-4">
                <Award size={16} />
                <span>Key Technical Competencies</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Machine Learning & Math</p>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    PyTorch, Scikit-Learn, NumPy, Pandas, OpenCV, CNNs, Attention Mechanisms, Feature Engineering, Grad-CAM, EDA, Matrix Algebra.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Software Engineering & Tools</p>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Python, C/C++, JavaScript (ES6+), TypeScript, React, Node.js, Express, Tailwind CSS, Git/GitHub, Linux, Docker, Jupyter.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 size={14} /> Available immediately for ML Engineer / Software Engineer roles
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors w-full sm:w-auto"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
