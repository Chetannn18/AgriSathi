import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DiagnosisCardShowcase: React.FC = () => {
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 3;
      if (current >= 91) {
        setConfidence(91);
        clearInterval(interval);
      } else {
        setConfidence(current);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const symptoms = [
    { label: 'Dark leaf lesions', detail: 'Concentric dark-brown rings on mature foliage' },
    { label: 'Yellowing around affected areas', detail: 'Pronounced chlorotic halo signaling toxin production' },
    { label: 'Lower leaf damage', detail: 'Earliest symptoms initiated on basal canopy leaves near soil' },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto text-left">
      
      {/* Narrative Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block">
          SECTION 04 • THE AI DIAGNOSIS
        </span>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Confidence in Every Detail.
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
          Clear, probabilistic intelligence grounded in verified agricultural pathology — not guesswork.
        </p>
      </div>

      {/* Large Centered Diagnosis Glass Interface */}
      <div className="relative glass-hud p-6 sm:p-10 rounded-3xl border border-emerald-400/40 shadow-2xl overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-32 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Crop Header & Big Disease Callout */}
          <div className="md:col-span-7 space-y-5">
            
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                TOMATO • Lycopersicon esculentum
              </span>
              <span className="text-[11px] text-gray-400 font-mono">ID: DG-4091</span>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gray-400 block mb-1">
                POSSIBLE DIAGNOSIS
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
                Early Blight
              </h3>
              <p className="text-sm font-sans italic text-emerald-300/90 mt-1">
                Alternaria solani fungal pathogen
              </p>
            </div>

            {/* Observed Symptoms List */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-gray-300 font-bold block">
                Observed Symptoms:
              </span>
              
              <div className="space-y-2.5">
                {symptoms.map((symptom, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-forest-950/60 border border-emerald-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {symptom.label}
                      </h4>
                      <p className="text-xs text-gray-300 mt-0.5">
                        {symptom.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: AI Confidence Dial & Severity Rating */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-forest-950/80 border border-emerald-500/30 text-center space-y-6">
            
            {/* Animated Confidence Gauge */}
            <div className="relative flex items-center justify-center w-36 h-36">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#52b788"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 50}
                  strokeDashoffset={2 * Math.PI * 50 * (1 - confidence / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-out"
                />
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-mono font-extrabold text-white">
                  {confidence}%
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300">
                  AI Confidence
                </span>
              </div>
            </div>

            {/* Severity Pill */}
            <div className="w-full space-y-1">
              <div className="flex justify-between text-xs text-gray-300 px-1 font-mono">
                <span>Severity Status</span>
                <span className="text-amber-400 font-bold">Moderate (Stage 2)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-forest-900 overflow-hidden border border-white/10">
                <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-500 w-[55%] rounded-full" />
              </div>
            </div>

            {/* Immediate Action Link to existing Scan route */}
            <Link
              to="/scan"
              className="w-full py-3 px-4 rounded-xl bg-forest-500 hover:bg-forest-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <span>Scan Your Crop Leaf</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <span className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Cross-checked against ICAR-IIVR Tomato Compendium
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};
