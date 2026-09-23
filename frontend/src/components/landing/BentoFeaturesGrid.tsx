import React from 'react';
import { Camera, Mic, Globe2, BookOpen, CloudSun, History, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BentoFeaturesGrid: React.FC = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      
      {/* Narrative Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block">
          SECTION 10 • THE CAPABILITY MATRIX
        </span>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
          Engineered for the Field.
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
          Every tool inside AgriSathi is designed to make practical, verified agricultural wisdom effortless to reach.
        </p>
      </div>

      {/* Dynamic Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Card 1: AI Disease Detection (Span 7) */}
        <div className="md:col-span-7 glass-hud p-6 sm:p-8 rounded-3xl border border-emerald-500/30 text-left relative overflow-hidden bg-forest-950/70 hover:border-emerald-400/50 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-emerald-600/30 text-leaf-light border border-emerald-500/30">
              <Camera className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
              Core Engine
            </span>
          </div>

          <h3 className="text-2xl font-display font-bold text-white mb-2">
            AI Disease Detection
          </h3>
          <p className="text-sm text-gray-300 max-w-md leading-relaxed mb-6">
            Instant computer vision analysis of leaf lesions, spotting fungal chlorosis, bacterial wilt, and pest damage in under 3 seconds.
          </p>

          {/* Mini UI Preview */}
          <div className="p-3.5 rounded-xl bg-forest-900/80 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-emerald-400/30">
                <img
                  src="/assets/demo/leaf_tomato.jpg"
                  alt="Mini Leaf Scan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Tomato • Early Blight</span>
                <span className="text-[10px] text-emerald-300 font-mono">91% confidence • Target-board lesion</span>
              </div>
            </div>
            <Link
              to="/scan"
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shrink-0"
            >
              Test Scan
            </Link>
          </div>
        </div>

        {/* Card 2: Voice Assistant (Span 5) */}
        <div className="md:col-span-5 glass-hud p-6 sm:p-8 rounded-3xl border border-emerald-500/30 text-left relative overflow-hidden bg-forest-950/70 hover:border-emerald-400/50 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-emerald-600/30 text-leaf-light border border-emerald-500/30">
              <Mic className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
              Speech AI
            </span>
          </div>

          <h3 className="text-xl font-display font-bold text-white mb-2">
            Hands-Free Voice Assistant
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            Speak your farming questions aloud while your hands are busy in the soil. AgriSathi listens and replies naturally.
          </p>

          {/* Mini Waveform Graphic */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-forest-900/80 border border-emerald-500/30">
            <div className="flex items-center gap-1">
              <span className="wave-bar w-1 bg-emerald-400 rounded-full" />
              <span className="wave-bar w-1 bg-leaf-light rounded-full" />
              <span className="wave-bar w-1 bg-lime-400 rounded-full" />
              <span className="wave-bar w-1 bg-emerald-300 rounded-full" />
              <span className="wave-bar w-1 bg-leaf-light rounded-full" />
            </div>
            <Link
              to="/assistant"
              className="text-xs font-mono text-emerald-300 font-bold hover:text-white flex items-center gap-1"
            >
              <span>Speak to AI</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 3: Hindi & Vernacular Support (Span 4) */}
        <div className="md:col-span-4 glass-hud p-6 rounded-3xl border border-emerald-500/30 text-left relative overflow-hidden bg-forest-950/70 hover:border-emerald-400/50 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600/30 text-leaf-light border border-emerald-500/30">
              <Globe2 className="w-5 h-5 text-emerald-400" />
            </span>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded">
              Bilingual
            </span>
          </div>

          <h3 className="text-lg font-display font-bold text-white mb-1">
            Hindi & Vernacular AI
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Full native Devanagari script support and spoken Hindi recognition. Seamlessly switches between Hindi and English at any time.
          </p>
        </div>

        {/* Card 4: Agricultural Knowledge Base (Span 4) */}
        <div className="md:col-span-4 glass-hud p-6 rounded-3xl border border-emerald-500/30 text-left relative overflow-hidden bg-forest-950/70 hover:border-emerald-400/50 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600/30 text-leaf-light border border-emerald-500/30">
              <BookOpen className="w-5 h-5 text-emerald-400" />
            </span>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded">
              Grounded RAG
            </span>
          </div>

          <h3 className="text-lg font-display font-bold text-white mb-1">
            Agricultural Knowledge
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Synthesized across ICAR and KVK research bulletins covering tomato, rice, cotton, potato, soybean, and wheat crop pathologies.
          </p>
        </div>

        {/* Card 5: Weather Context (Span 4) */}
        <div className="md:col-span-4 glass-hud p-6 rounded-3xl border border-emerald-500/30 text-left relative overflow-hidden bg-forest-950/70 hover:border-emerald-400/50 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600/30 text-leaf-light border border-emerald-500/30">
              <CloudSun className="w-5 h-5 text-emerald-400" />
            </span>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded">
              Microclimate
            </span>
          </div>

          <h3 className="text-lg font-display font-bold text-white mb-1">
            Weather Context Risk
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            Connects rainfall, temperature, and humidity directly with fungal and pest sporulation thresholds for early warnings.
          </p>
        </div>

      </div>

    </div>
  );
};
