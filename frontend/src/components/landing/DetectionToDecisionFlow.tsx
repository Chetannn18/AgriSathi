import React from 'react';
import { ArrowDown, CheckCircle, Search, Compass, Zap, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DetectionToDecisionFlow: React.FC = () => {
  const steps = [
    {
      num: '01',
      stage: 'DETECT',
      headline: 'Possible Early Blight',
      detail: 'Vision algorithms recognize fungal leaf lesions, chlorotic margins, and basal foliage distress.',
      icon: Search,
      badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/60'
    },
    {
      num: '02',
      stage: 'UNDERSTAND',
      headline: 'Why it may be happening',
      detail: 'Correlating leaf symptoms with continuous 85%+ relative humidity and overhead irrigation patterns.',
      icon: Compass,
      badgeColor: 'border-leaf-light/40 text-leaf-light bg-emerald-900/40'
    },
    {
      num: '03',
      stage: 'ADVISE',
      headline: 'Practical next steps',
      detail: 'Clear, vetted recommendations: pruning affected basal leaves, organic copper fungicide, and drip scheduling.',
      icon: Zap,
      badgeColor: 'border-amber-400/40 text-amber-300 bg-amber-950/40'
    },
    {
      num: '04',
      stage: 'ACT',
      headline: 'Know what to do next',
      detail: 'Confidently execute treatment in the field. Avoid overspending on unnecessary agrochemicals.',
      icon: Check,
      badgeColor: 'border-lime-400/40 text-lime-300 bg-lime-950/40'
    }
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto text-center">
      
      {/* Section Header */}
      <div className="max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block">
          SECTION 05 • THE STORYTELLING TRANSITION
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
          From Leaf to Action.
        </h2>
        <p className="text-base text-gray-300 max-w-xl mx-auto">
          A diagnosis is only as valuable as the clarity it gives you in the field.
        </p>
      </div>

      {/* Vertical Narrative Stepper with Large Editorial Typography */}
      <div className="relative space-y-8 sm:space-y-12">
        
        {/* Continuous Connecting Line */}
        <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-emerald-500 via-leaf-light to-lime-400/60 pointer-events-none hidden sm:block" />

        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.stage}
              className="relative flex flex-col items-center group"
            >
              {/* Stage Card */}
              <div className="glass-hud p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-emerald-400/40 max-w-xl w-full text-center transition-all duration-300 hover:scale-102 hover:shadow-glow-green relative z-10 bg-forest-950/80">
                
                {/* Stage Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono font-bold tracking-widest uppercase mb-3 bg-black/40">
                  <span className="text-gray-400">{step.num}</span>
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  <span className="text-emerald-300">{step.stage}</span>
                </div>

                {/* Large Editorial Headline */}
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2 tracking-tight">
                  "{step.headline}"
                </h3>

                {/* Subtext description */}
                <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  {step.detail}
                </p>

              </div>

              {/* Down Arrow between steps */}
              {idx < steps.length - 1 && (
                <div className="mt-4 sm:mt-6 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-forest-900 border border-emerald-500/40 text-emerald-400 shadow-md">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>
              )}

            </div>
          );
        })}

      </div>

      {/* CTA Anchor to Assistant */}
      <div className="mt-14">
        <Link
          to="/assistant"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-forest-600 hover:bg-forest-500 text-white font-bold text-sm shadow-xl shadow-forest-950/60 active:scale-95 transition-all"
        >
          <span>Consult AgriSathi on Your Crop</span>
        </Link>
      </div>

    </div>
  );
};
