import React, { useState, useEffect } from 'react';
import { Sparkles, Scan, CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react';

interface ScanningLeafHUDProps {
  onCheckCropClick?: () => void;
}

export const ScanningLeafHUD: React.FC<ScanningLeafHUDProps> = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const symptoms = [
    { label: 'Leaf Pattern Analysis', status: 'Concentric rings identified', active: activeStep >= 0 },
    { label: 'Color Variation (Chlorosis)', status: 'Halo chlorosis 14.2%', active: activeStep >= 1 },
    { label: 'Lesion Detection & Depth', status: 'Target spot pattern', active: activeStep >= 2 },
  ];

  return (
    <div className="relative group max-w-sm sm:max-w-md w-full mx-auto select-none">
      
      {/* Soft ambient back-glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-leaf-light/30 to-lime-500/20 rounded-3xl blur-xl group-hover:blur-2xl opacity-75 transition-all duration-700 pointer-events-none" />

      {/* Main Glass HUD Container */}
      <div className="relative glass-hud p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-leaf-light/35 shadow-2xl backdrop-blur-xl">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono font-bold tracking-wider text-emerald-300 uppercase">
              CROP SCAN ACTIVE
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400/80 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
            <Scan className="w-3 h-3 text-leaf-light" />
            <span>42ms • CV-04</span>
          </div>
        </div>

        {/* Leaf Target Graphic Window */}
        <div className="relative rounded-xl overflow-hidden bg-forest-950/80 border border-emerald-500/30 aspect-16/10 mb-4 flex items-center justify-center group/leaf">
          <img
            src="/assets/landing/macro_crop_leaf.jpg"
            alt="Leaf diagnostic target"
            className="w-full h-full object-cover opacity-85 group-hover/leaf:scale-105 transition-transform duration-700"
          />

          {/* Elegant Laser Scan Beam */}
          <div className="animate-scan-line" />

          {/* Agricultural Computer Vision Target Markers */}
          <div className="absolute inset-4 border border-dashed border-emerald-400/50 rounded-lg pointer-events-none flex flex-col justify-between p-2">
            <div className="flex justify-between items-start text-[9px] font-mono text-emerald-300">
              <span className="bg-black/60 px-1 rounded backdrop-blur-xs">TARGET: SOLANUM</span>
              <span className="bg-black/60 px-1 rounded backdrop-blur-xs">INDEX: 0.94</span>
            </div>
            
            {/* Target Box on Center Lesion */}
            <div className="self-center w-20 h-20 border-2 border-emerald-400 rounded-md bg-emerald-500/10 flex items-center justify-center">
              <span className="text-[9px] font-mono font-bold text-leaf-light bg-black/75 px-1.5 py-0.5 rounded shadow">
                LESION #1
              </span>
            </div>

            <div className="flex justify-between items-end text-[9px] font-mono text-emerald-300/80">
              <span className="bg-black/60 px-1 rounded">LEAF AREA: 92%</span>
              <span className="bg-black/60 px-1 rounded">ICAR REF: MATCH</span>
            </div>
          </div>
        </div>

        {/* Detecting Symptoms Status */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs text-gray-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-leaf-light" />
              Detecting symptoms...
            </span>
            <span className="text-[10px] font-mono text-emerald-300">
              {activeStep === 3 ? 'Completed' : 'Processing'}
            </span>
          </div>

          <div className="space-y-1.5">
            {symptoms.map((symptom, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-1.5 px-2.5 rounded-lg text-xs transition-all duration-300 ${
                  symptom.active
                    ? 'bg-emerald-900/30 border border-emerald-500/30 text-emerald-100'
                    : 'bg-black/20 text-gray-400 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      symptom.active ? 'bg-emerald-400 shadow-sm shadow-emerald-400' : 'bg-gray-500'
                    }`}
                  />
                  <span className="text-[11px] sm:text-xs">{symptom.label}</span>
                </div>
                {symptom.active ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <span className="text-[10px] text-gray-400">waiting</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Diagnosis Highlight Card */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/90 to-forest-900/90 border border-emerald-500/40 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-400/90 block">
              POSSIBLE ISSUE
            </span>
            <h4 className="text-base font-display font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>Early Blight</span>
              <span className="text-[10px] font-normal text-emerald-300 font-sans italic">
                (Alternaria solani)
              </span>
            </h4>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-300 block">
              Confidence
            </span>
            <span className="text-lg font-mono font-extrabold text-leaf-light">
              91%
            </span>
          </div>
        </div>

        {/* Institutional Verification Footer */}
        <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400 font-mono px-1">
          <span className="flex items-center gap-1 text-emerald-400/80">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            ICAR Grounded Intelligence
          </span>
          <span className="text-gray-400">Model: Vision-Agri-v2</span>
        </div>

      </div>
    </div>
  );
};
