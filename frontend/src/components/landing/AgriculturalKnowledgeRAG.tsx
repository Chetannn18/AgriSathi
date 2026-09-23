import React, { useState } from 'react';
import { BookOpen, FileCheck, Layers, Sparkles, Database, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AgriculturalKnowledgeRAG: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);

  const knowledgeCards = [
    {
      title: 'Crop Advisory',
      subtitle: 'Seasonal Solanaceous Protocols',
      excerpt: 'Staggered pruning guidelines and optimal spacing to reduce damp canopy stagnation during pre-monsoon humid cycles.',
      citation: 'Tomato Field Advisory Series #18'
    },
    {
      title: 'Disease Guide',
      subtitle: 'Pathology & Visual Symptom Matrix',
      excerpt: 'Differentiating Early Blight target patterns from Septoria leaf spots and bacterial speck under natural daylight.',
      citation: 'Indian Phytopathology Reference Handbook'
    },
    {
      title: 'Agricultural Research',
      subtitle: 'Bio-Fungicide & Biological Efficacy Trials',
      excerpt: 'Comparative assessment of Trichoderma viride and Pseudomonas fluorescens applications in managing foliar blight.',
      citation: 'Horticultural Sciences Research Compilation'
    },
    {
      title: 'Field Recommendations',
      subtitle: 'Dosage & Weather-Adjusted Timing',
      excerpt: 'Calibrated application rates for copper oxychloride avoiding spray before high rainfall wash-off events.',
      citation: 'Agronomy Best Practice Compendium'
    }
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto text-center">
      
      {/* Section Header */}
      <div className="max-w-3xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block">
          SECTION 06 • GROUNDED INTELLIGENCE
        </span>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
          AI that doesn't just answer.<br />
          <span className="font-editorial italic font-normal text-leaf-light">
            It checks what it knows.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
          Instead of guessing or hallucinating generic advice, AgriSathi cross-references every answer with verified agricultural agronomy compendiums.
        </p>
      </div>

      {/* 4 Floating Knowledge Cards Converging into Center Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {knowledgeCards.map((card, idx) => (
          <div
            key={card.title}
            onClick={() => setActiveCard(idx)}
            className={`cursor-pointer text-left p-5 rounded-2xl transition-all duration-300 relative group overflow-hidden ${
              activeCard === idx
                ? 'glass-hud border-emerald-400 ring-2 ring-emerald-400/30 scale-102 shadow-glow-green bg-forest-950/90'
                : 'bg-forest-950/60 border border-white/10 hover:border-emerald-500/40 hover:bg-forest-950/80'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-900/50 text-leaf-light border border-emerald-500/30">
                <BookOpen className="w-4 h-4 text-emerald-400" />
              </span>
              <span className="text-[10px] font-mono text-emerald-300">
                SOURCE 0{idx + 1}
              </span>
            </div>

            <h3 className="text-base font-display font-bold text-white mb-1">
              {card.title}
            </h3>
            <span className="text-[11px] font-mono text-leaf-light block mb-2">
              {card.subtitle}
            </span>
            <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">
              {card.excerpt}
            </p>

            <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-gray-400 font-mono">
              Ref: {card.citation}
            </div>
          </div>
        ))}
      </div>

      {/* Convergence Banner: "Grounded Agricultural Guidance" */}
      <div className="relative glass-panel-dark p-6 sm:p-8 rounded-3xl border border-emerald-400/40 max-w-2xl mx-auto shadow-2xl">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-5 h-5 text-leaf-light" />
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
            EVIDENCE-SYNTHESIZED GUIDANCE
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
          Grounded Agricultural Guidance
        </h3>

        <p className="text-xs sm:text-sm text-gray-200 mt-2 max-w-lg mx-auto leading-relaxed">
          When you receive advice for your farm, it is backed by empirical research, field-tested agronomy, and practical application standards.
        </p>

        <div className="mt-5 flex items-center justify-center gap-4">
          <Link
            to="/diseases"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-500 text-white font-semibold text-xs transition-colors"
          >
            <span>Explore Disease Library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
};
