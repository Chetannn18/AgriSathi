import React, { useState } from 'react';
import { Camera, Mic, MessageSquare, Cpu, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MultimodalIntelligenceOrb: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'image' | 'voice' | 'text'>('voice');

  const modes = [
    {
      id: 'image',
      icon: Camera,
      title: 'IMAGE',
      query: '"Show me what’s wrong."',
      actionRoute: '/scan',
      btnLabel: 'Scan with Camera',
      detail: 'Mobile photo upload, macro leaf framing, automated blur & exposure calibration',
      color: 'emerald',
      position: 'top'
    },
    {
      id: 'voice',
      icon: Mic,
      title: 'VOICE',
      query: '"My leaves are turning yellow."',
      actionRoute: '/assistant',
      btnLabel: 'Speak Query in Hindi/English',
      detail: 'Dialect-resilient Hindi and English speech recognition with instant vernacular audio answers',
      color: 'leaf',
      position: 'bottom-left'
    },
    {
      id: 'text',
      icon: MessageSquare,
      title: 'TEXT',
      query: '"What should I do next?"',
      actionRoute: '/assistant',
      btnLabel: 'Chat with AI Assistant',
      detail: 'Type questions in simple everyday language; receives ICAR-grounded step-by-step guidance',
      color: 'lime',
      position: 'bottom-right'
    }
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto text-center">
      
      {/* Narrative Section Header */}
      <div className="max-w-2xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block">
          SECTION 03 • MULTIMODAL INTELLIGENCE
        </span>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Three Natural Ways to Ask.
        </h2>
        <p className="text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
          Farmers communicate in different ways in the field. AgriSathi meets you where you are — whether you show a photo, speak aloud, or ask a question.
        </p>
      </div>

      {/* Central Visual Stage: Orbiting Nodes Converging to Agri Intelligence */}
      <div className="relative py-8 px-4 flex flex-col items-center justify-center min-h-[460px]">
        
        {/* Subtle SVG Animated Radial Circuit Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="w-full max-w-xl h-full opacity-35" viewBox="0 0 600 600" fill="none">
            {/* Concentric orbital rings */}
            <circle cx="300" cy="300" r="140" stroke="#52b788" strokeWidth="1" strokeDasharray="4 6" className="animate-spin-slow" />
            <circle cx="300" cy="300" r="220" stroke="#74c69d" strokeWidth="1" strokeDasharray="8 8" opacity="0.6" />
            <circle cx="300" cy="300" r="270" stroke="#a3e635" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.3" />
            
            {/* Animated Connecting vectors converging to center */}
            <line x1="300" y1="90" x2="300" y2="240" stroke="url(#emerald-grad)" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="140" y1="460" x2="250" y2="340" stroke="url(#emerald-grad)" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="460" y1="460" x2="350" y2="340" stroke="url(#emerald-grad)" strokeWidth="2" strokeDasharray="6 4" />
            
            <defs>
              <linearGradient id="emerald-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a3e635" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* The 3 Modality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-10">
          
          {/* Card 1: IMAGE */}
          <div
            onClick={() => setActiveModal('image')}
            className={`cursor-pointer text-left p-5 rounded-2xl transition-all duration-300 ${
              activeModal === 'image'
                ? 'glass-hud border-emerald-400 ring-2 ring-emerald-400/30 scale-102 shadow-glow-green'
                : 'bg-forest-900/40 border border-white/10 hover:border-emerald-500/40 hover:bg-forest-900/60'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600/30 text-leaf-light border border-emerald-500/30">
                <Camera className="w-5 h-5 text-emerald-400" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/20">
                MODE 01
              </span>
            </div>
            <h3 className="text-lg font-display font-bold text-white mb-1">
              IMAGE
            </h3>
            <p className="text-sm font-editorial italic text-emerald-200 mb-3">
              "Show me what’s wrong."
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Upload or snap leaf photographs in sunlight. The model highlights lesions and checks crop stage instantly.
            </p>
          </div>

          {/* Card 2: VOICE */}
          <div
            onClick={() => setActiveModal('voice')}
            className={`cursor-pointer text-left p-5 rounded-2xl transition-all duration-300 ${
              activeModal === 'voice'
                ? 'glass-hud border-emerald-400 ring-2 ring-emerald-400/30 scale-102 shadow-glow-green'
                : 'bg-forest-900/40 border border-white/10 hover:border-emerald-500/40 hover:bg-forest-900/60'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600/30 text-leaf-light border border-emerald-500/30">
                <Mic className="w-5 h-5 text-emerald-400" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/20">
                MODE 02
              </span>
            </div>
            <h3 className="text-lg font-display font-bold text-white mb-1">
              VOICE
            </h3>
            <p className="text-sm font-editorial italic text-emerald-200 mb-3">
              "My leaves are turning yellow."
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Talk directly in Hindi or English without needing complex typing. AgriSathi replies aloud with clear audio advisory.
            </p>
          </div>

          {/* Card 3: TEXT */}
          <div
            onClick={() => setActiveModal('text')}
            className={`cursor-pointer text-left p-5 rounded-2xl transition-all duration-300 ${
              activeModal === 'text'
                ? 'glass-hud border-emerald-400 ring-2 ring-emerald-400/30 scale-102 shadow-glow-green'
                : 'bg-forest-900/40 border border-white/10 hover:border-emerald-500/40 hover:bg-forest-900/60'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600/30 text-leaf-light border border-emerald-500/30">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/20">
                MODE 03
              </span>
            </div>
            <h3 className="text-lg font-display font-bold text-white mb-1">
              TEXT
            </h3>
            <p className="text-sm font-editorial italic text-emerald-200 mb-3">
              "What should I do?"
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Ask detailed questions regarding dosage, fertilizer timing, companion planting, and organic biopesticides.
            </p>
          </div>

        </div>

        {/* Central Convergence Core: "AGRI INTELLIGENCE" */}
        <div className="mt-8 relative z-10 w-full max-w-lg">
          <div className="glass-panel-dark p-6 rounded-3xl border border-emerald-400/40 shadow-2xl text-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold mb-3">
              <Cpu className="w-4 h-4 text-leaf-light animate-pulse" />
              <span>ALL INPUTS MERGE INTO</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-wider">
              AGRI INTELLIGENCE
            </h3>

            <p className="text-xs text-emerald-100/70 mt-2 max-w-md mx-auto">
              Vision tokens + Speech transcripts + ICAR RAG knowledge base are cross-referenced to synthesize high-confidence, actionable diagnosis.
            </p>

            <div className="mt-5 flex items-center justify-center gap-3">
              <Link
                to={activeModal === 'image' ? '/scan' : '/assistant'}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-leaf-light text-forest-950 font-bold text-xs hover:bg-emerald-400 transition-colors shadow-lg active:scale-95"
              >
                <span>
                  {activeModal === 'image' ? 'Try Photo Scanner' : 'Ask in Assistant'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
