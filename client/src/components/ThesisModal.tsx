import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  Activity, 
  Cpu, 
  Layers, 
  FileText, 
  Award,
  Zap
} from 'lucide-react';
import { educationData } from '../data/portfolioData';

interface ThesisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThesisModal: React.FC<ThesisModalProps> = ({ isOpen, onClose }) => {
  const undergradEdu = educationData.find(e => e.id === 'undergrad');
  const thesis = undergradEdu?.thesis;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !thesis) return null;

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
          transition={{ duration: 0.25 }}
          className="relative max-w-3xl w-full bg-[#070B09] dark:bg-[#070B09] light:bg-white rounded-3xl border border-emerald-500/30 shadow-2xl overflow-hidden z-10 my-8 text-left"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-neutral-800 dark:border-neutral-800 light:border-neutral-200 bg-neutral-950/60 dark:bg-neutral-950/60 light:bg-neutral-50 flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <GraduationCap size={14} />
                <span>B.Sc Capstone Research & Thesis</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-neutral-900 leading-snug">
                {thesis.title}
              </h2>
              <p className="text-xs font-mono text-emerald-400">
                Domain: {thesis.area}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-200 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors shrink-0"
              aria-label="Close Thesis modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Abstract */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <FileText size={14} className="text-emerald-400" />
                <span>Abstract & Problem Context</span>
              </h3>
              <p className="text-sm text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed bg-neutral-900/50 dark:bg-neutral-900/50 light:bg-neutral-100 p-4 rounded-2xl border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200">
                {thesis.description}
              </p>
            </div>

            {/* Architecture & Methodology */}
            {thesis.methodology && (
              <div className="space-y-2">
                <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Cpu size={14} className="text-emerald-400" />
                  <span>Proposed Deep Learning Pipeline</span>
                </h3>
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-neutral-200 dark:text-neutral-200 light:text-neutral-800 leading-relaxed font-mono">
                  {thesis.methodology}
                </div>
              </div>
            )}

            {/* Research Outcomes & Metrics */}
            {thesis.outcomes && thesis.outcomes.length > 0 && (
              <div className="space-y-2.5">
                <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Zap size={14} className="text-emerald-400" />
                  <span>Validated Research Outcomes</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {thesis.outcomes.map((item, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-neutral-900/70 dark:bg-neutral-900/70 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 flex items-start gap-2.5 text-xs text-neutral-200 dark:text-neutral-200 light:text-neutral-800"
                    >
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Advisor Note */}
            {thesis.advisor && (
              <div className="p-4 rounded-xl bg-neutral-900/40 dark:bg-neutral-900/40 light:bg-neutral-100 border border-neutral-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-neutral-400">Academic Supervision:</span>
                <span className="text-emerald-300 font-semibold">{thesis.advisor}</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-6 border-t border-neutral-800 dark:border-neutral-800 light:border-neutral-200 bg-neutral-950/80 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400">
              Department of Computer Science & Engineering
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition-colors"
            >
              Done Reading
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
