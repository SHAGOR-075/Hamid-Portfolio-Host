import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, RefreshCw, Activity, CheckCircle, Brain, Cpu, Sparkles, Sliders } from 'lucide-react';
import { mlProjectsData } from '../data/portfolioData';

interface MLModelDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MLModelDemoModal: React.FC<MLModelDemoModalProps> = ({ isOpen, onClose }) => {
  const project = mlProjectsData[0]; // NeuroVision

  const presetCases = [
    {
      id: 'case-1',
      name: 'Case #084 — Glioma Lesion',
      contrast: 0.88,
      density: 920,
      symmetry: 0.22,
      edge: 78,
      groundTruth: 'Glioma (High Grade)',
      expectedLatency: '31ms'
    },
    {
      id: 'case-2',
      name: 'Case #119 — Meningioma',
      contrast: 0.72,
      density: 640,
      symmetry: 0.48,
      edge: 84,
      groundTruth: 'Meningioma',
      expectedLatency: '29ms'
    },
    {
      id: 'case-3',
      name: 'Case #205 — Normal Control Scan',
      contrast: 0.35,
      density: 210,
      symmetry: 0.94,
      edge: 25,
      groundTruth: 'Healthy Brain (No Lesion)',
      expectedLatency: '28ms'
    }
  ];

  const [activeCase, setActiveCase] = useState(presetCases[0]);
  const [contrast, setContrast] = useState(presetCases[0].contrast);
  const [density, setDensity] = useState(presetCases[0].density);
  const [symmetry, setSymmetry] = useState(presetCases[0].symmetry);
  const [edge, setEdge] = useState(presetCases[0].edge);
  const [isInferencing, setIsInferencing] = useState(false);

  const selectPreset = (preset: typeof presetCases[0]) => {
    setActiveCase(preset);
    setContrast(preset.contrast);
    setDensity(preset.density);
    setSymmetry(preset.symmetry);
    setEdge(preset.edge);
    runInference();
  };

  const runInference = () => {
    setIsInferencing(true);
    setTimeout(() => {
      setIsInferencing(false);
    }, 450);
  };

  // Compute realistic synthetic probabilities based on inputs
  const prediction = useMemo(() => {
    // Normal score: high symmetry, low contrast, low density
    const normalRaw = Math.max(0.01, (symmetry * 2.5) - (contrast * 1.2) - (density / 1000));
    // Glioma: high contrast, high density, low symmetry, high edge
    const gliomaRaw = Math.max(0.01, (contrast * 2.2) + (density / 700) + (edge / 120) - (symmetry * 1.5));
    // Meningioma: medium contrast, medium density, high edge
    const meningiomaRaw = Math.max(0.01, (contrast * 1.2) + (edge / 90) + (density / 950));
    // Pituitary: medium-low density, medium contrast
    const pituitaryRaw = Math.max(0.01, (contrast * 1.1) + ((1200 - density) / 1200) * 0.8);

    const total = normalRaw + gliomaRaw + meningiomaRaw + pituitaryRaw;
    const pGlioma = Math.round((gliomaRaw / total) * 1000) / 10;
    const pMeningioma = Math.round((meningiomaRaw / total) * 1000) / 10;
    const pNormal = Math.round((normalRaw / total) * 1000) / 10;
    const pPituitary = Math.max(0.5, Math.round((100 - pGlioma - pMeningioma - pNormal) * 10) / 10);

    const classes = [
      { label: 'Glioma (High/Low Grade)', prob: pGlioma, color: 'bg-rose-500', barColor: 'from-rose-500 to-amber-500' },
      { label: 'Meningioma Lesion', prob: pMeningioma, color: 'bg-amber-500', barColor: 'from-amber-500 to-yellow-400' },
      { label: 'Pituitary Adenoma', prob: pPituitary, color: 'bg-sky-500', barColor: 'from-sky-500 to-indigo-500' },
      { label: 'Healthy Control (No Anomaly)', prob: pNormal, color: 'bg-emerald-500', barColor: 'from-emerald-500 to-teal-400' }
    ];

    classes.sort((a, b) => b.prob - a.prob);
    const topClass = classes[0];

    return {
      classes,
      topClass,
      confidence: topClass.prob,
      isNormal: topClass.label.includes('Healthy'),
      attentionIntensity: Math.min(100, Math.round((contrast * 45) + (density / 25)))
    };
  }, [contrast, density, symmetry, edge]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-[#070B09] text-white rounded-2xl border border-emerald-500/30 shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#063B2A]/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Brain size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">NeuroVision Interactive Inference</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Model Simulator
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-mono">Attention-Gated ResNet-50 • 98.4% Benchmark Accuracy</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Preset Selector & Parameter Sliders */}
            <div className="lg:col-span-6 space-y-5">
              {/* Presets */}
              <div>
                <label className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-2 font-semibold">
                  1. Select Clinical Benchmark Case
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {presetCases.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => selectPreset(c)}
                      className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                        activeCase.id === c.id
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                          : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                      }`}
                    >
                      <p className="font-semibold text-white truncate">{c.name}</p>
                      <p className="text-[11px] text-neutral-400 font-mono mt-0.5">{c.groundTruth}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider Controls */}
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase">
                    <Sliders size={14} />
                    <span>2. Tune Feature Vector Signals</span>
                  </div>
                  <button
                    onClick={runInference}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-500 hover:bg-emerald-400 text-black transition-colors"
                  >
                    <RefreshCw size={12} className={isInferencing ? 'animate-spin' : ''} />
                    <span>Run Forward Pass</span>
                  </button>
                </div>

                {/* Contrast Ratio */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-300 font-medium">Tissue Contrast Index</span>
                    <span className="text-emerald-400 font-mono">{contrast.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.02"
                    value={contrast}
                    onChange={(e) => setContrast(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 bg-neutral-800 cursor-pointer h-1.5 rounded-lg"
                  />
                  <p className="text-[10px] text-neutral-500 mt-0.5">T1-to-T2 intensity ratio across ROI</p>
                </div>

                {/* Voxel Density */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-300 font-medium">Mean Lesion Voxel Density</span>
                    <span className="text-emerald-400 font-mono">{density} HU</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1200"
                    step="10"
                    value={density}
                    onChange={(e) => setDensity(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 bg-neutral-800 cursor-pointer h-1.5 rounded-lg"
                  />
                  <p className="text-[10px] text-neutral-500 mt-0.5">Attenuation density in Hounsfield units</p>
                </div>

                {/* Symmetry */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-300 font-medium">Hemispheric Symmetry Score</span>
                    <span className="text-emerald-400 font-mono">{symmetry.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.02"
                    value={symmetry}
                    onChange={(e) => setSymmetry(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 bg-neutral-800 cursor-pointer h-1.5 rounded-lg"
                  />
                  <p className="text-[10px] text-neutral-500 mt-0.5">Bilateral anatomical congruence</p>
                </div>

                {/* Boundary Gradient */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-300 font-medium">Edge Gradient Sharpness</span>
                    <span className="text-emerald-400 font-mono">{edge}/100</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    step="1"
                    value={edge}
                    onChange={(e) => setEdge(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 bg-neutral-800 cursor-pointer h-1.5 rounded-lg"
                  />
                  <p className="text-[10px] text-neutral-500 mt-0.5">Sobel boundary edge sharpness score</p>
                </div>
              </div>
            </div>

            {/* Right Column: Model Output & Probability Distributions */}
            <div className="lg:col-span-6 space-y-5 flex flex-col">
              {/* Prediction Banner */}
              <div className={`p-4 rounded-xl border relative overflow-hidden transition-all duration-300 ${
                prediction.isNormal 
                  ? 'bg-emerald-950/40 border-emerald-500/40' 
                  : 'bg-rose-950/30 border-rose-500/40'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity size={16} className={prediction.isNormal ? 'text-emerald-400' : 'text-rose-400'} />
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300">
                      Neural Diagnostic Output
                    </span>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/40 text-emerald-400 border border-emerald-500/30">
                    Latency: 32ms
                  </span>
                </div>

                <div className="mt-1">
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    {prediction.topClass.label}
                  </h4>
                  <p className="text-xs text-neutral-300 mt-1">
                    Calculated Posterior Confidence: <span className="font-bold text-emerald-400">{prediction.confidence}%</span>
                  </p>
                </div>
              </div>

              {/* Class Probability Distribution */}
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex-1 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>Softmax Class Probabilities</span>
                  <span>Probability %</span>
                </div>

                <div className="space-y-3">
                  {prediction.classes.map((cls) => (
                    <div key={cls.label} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-200 font-medium">{cls.label}</span>
                        <span className="font-mono text-emerald-400 font-bold">{cls.prob.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${cls.barColor} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${cls.prob}%` }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Spatial Attention Preview */}
                <div className="mt-4 pt-4 border-t border-neutral-800">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={13} className="text-emerald-400" />
                      Grad-CAM Heatmap Activation
                    </span>
                    <span className="text-emerald-400">{prediction.attentionIntensity}% intensity</span>
                  </div>
                  <div className="relative h-16 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-radial from-emerald-500/40 via-amber-500/20 to-transparent blur-md transition-all duration-500"
                      style={{
                        opacity: prediction.attentionIntensity / 100,
                        transform: `scale(${0.7 + (prediction.attentionIntensity / 200)})`
                      }}
                    />
                    <span className="relative z-10 text-[11px] font-mono text-neutral-300">
                      Layer4.AttentionGating (256 channels activation)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3.5 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs">
            <span className="text-neutral-400 font-mono hidden sm:inline">
              PyTorch v2.1 • ResNet-50 Backbone • Saliency Grad-CAM
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-colors ml-auto"
            >
              Done Testing
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
