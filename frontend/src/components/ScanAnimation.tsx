import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  imageUrl: string;
  onComplete: () => void;
}

export const ScanAnimation: React.FC<Props> = ({ imageUrl, onComplete }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: t('stepReading'), duration: 220 },
    { label: t('stepDetecting'), duration: 250 },
    { label: t('stepComparing'), duration: 260 },
    { label: t('stepPreparing'), duration: 200 },
  ];

  useEffect(() => {
    let timer: any;
    if (currentStep < steps.length) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, steps[currentStep].duration);
    } else {
      timer = setTimeout(() => {
        onComplete();
      }, 120);
    }
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl max-w-lg mx-auto text-center shadow-card-soft">
      
      {/* Crop Leaf Preview Container with animated scanline */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-forest-900 border border-forest-500/30 mb-6 shadow-inner">
        <img
          src={imageUrl}
          alt="Scanning crop"
          className="w-full h-full object-cover opacity-85"
        />
        
        {/* Subtle Organic Scan Overlay */}
        <div className="animate-scan-line" />
        
        {/* Scanning Bounding Box Target */}
        <div className="absolute inset-8 border border-leaf-light/50 rounded-lg pointer-events-none flex items-center justify-center">
          <div className="w-12 h-12 border-t-2 border-l-2 border-leaf-light absolute top-0 left-0" />
          <div className="w-12 h-12 border-t-2 border-r-2 border-leaf-light absolute top-0 right-0" />
          <div className="w-12 h-12 border-b-2 border-l-2 border-leaf-light absolute bottom-0 left-0" />
          <div className="w-12 h-12 border-b-2 border-r-2 border-leaf-light absolute bottom-0 right-0" />
        </div>

        <div className="absolute bottom-2 left-3 bg-forest-950/80 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] text-leaf-light font-mono flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Vision AI Engine: Scanning...
        </div>
      </div>

      <h3 className="font-display font-bold text-xl text-forest-900 mb-1">
        {t('analyzingText')}
      </h3>
      <p className="text-xs text-gray-500 mb-6">
        Cross-referencing agricultural pathological datasets & ICAR diagnostic indices
      </p>

      {/* Progress Checklist */}
      <div className="space-y-3 text-left max-w-md mx-auto bg-forest-50/60 p-4 rounded-xl border border-forest-100">
        {steps.map((step, idx) => {
          const isFinished = currentStep > idx;
          const isCurrent = currentStep === idx;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-sm transition-opacity duration-300 ${
                isFinished ? 'text-forest-900 font-medium' : isCurrent ? 'text-forest-700 font-semibold' : 'text-gray-400'
              }`}
            >
              {isFinished ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-5 h-5 text-leaf-dark animate-spin shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300 shrink-0" />
              )}
              <span>{step.label}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
};
