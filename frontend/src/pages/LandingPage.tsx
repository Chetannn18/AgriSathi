import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, MessageSquare, ShieldCheck, ArrowRight, Globe2, CloudSun, Leaf, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LandingPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 overflow-hidden">
        {/* Organic background aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-leaf-light/20 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100/80 border border-forest-200 text-forest-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-forest-600" />
                <span>Multimodal AI for Indian Agriculture • ICAR Grounded</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-forest-900 leading-[1.15]">
                {t('heroHeadline')}
              </h1>

              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t('heroSubtitle')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/scan"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-forest-600 text-white font-semibold text-base shadow-lg shadow-forest-600/30 hover:bg-forest-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5 text-leaf-light" />
                  <span>{t('checkCrop')}</span>
                </Link>

                <Link
                  to="/assistant"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white border border-forest-200 text-forest-800 font-semibold text-base shadow-sm hover:bg-forest-50 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5 text-forest-600" />
                  <span>{t('assistant')}</span>
                </Link>

                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-forest-100/70 text-forest-800 font-medium text-sm hover:bg-forest-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{t('tryDemo')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 text-xs font-semibold text-forest-800">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Vision Quality Check</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Voice & Vernacular Hindi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Human Expert Escalation</span>
                </div>
              </div>

            </div>

            {/* Right Visual: Glass Card with Crop Scanning Demonstration */}
            <div className="lg:col-span-5 relative">
              <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-white/60 shadow-2xl relative overflow-hidden">
                
                {/* Crop Image Mockup */}
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-forest-950 border border-forest-700/50 shadow-inner">
                  <img
                    src="/assets/demo/leaf_tomato.jpg"
                    alt="Tomato Early Blight Diagnosis"
                    className="w-full h-full object-cover opacity-90"
                  />
                  
                  {/* Subtle Scanning Line */}
                  <div className="animate-scan-line" />

                  {/* Diagnostic Bounding Box */}
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-leaf-light rounded-xl border-dashed flex items-center justify-center">
                    <span className="bg-forest-900/90 text-leaf-light px-2.5 py-1 rounded text-xs font-mono font-bold tracking-wide">
                      AI Scanning...
                    </span>
                  </div>

                  {/* Floating AI Diagnostic Tag */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-forest-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-forest-600 block">
                        Tomato • Lycopersicon
                      </span>
                      <h4 className="font-display font-bold text-sm text-forest-900">
                        Possible Early Blight
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
                        Confidence: 91%
                      </span>
                      <span className="text-[10px] text-amber-700 font-semibold block mt-0.5">
                        Severity: Moderate
                      </span>
                    </div>
                  </div>

                </div>

                <div className="mt-3.5 px-2 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Leaf className="w-3.5 h-3.5 text-forest-600" />
                    ICAR Knowledge Verified
                  </span>
                  <span>Zero Cloud Setup Needed</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (Capture → Understand → Act) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-forest-600 block">
            Three Simple Steps
          </span>
          <h2 className="font-display font-bold text-3xl text-forest-900 mt-1">
            {t('howItWorks')}
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            A frictionless workflow built specifically for field farmers and agricultural learners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-panel p-6 rounded-2xl border border-forest-100/80 shadow-card-soft text-left hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-forest-600 text-white flex items-center justify-center mb-4 shadow-md shadow-forest-600/20 font-bold text-lg">
              📷
            </div>
            <h3 className="font-display font-bold text-lg text-forest-900 mb-2">
              {t('step1Title')}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('step1Desc')}
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-forest-100/80 shadow-card-soft text-left hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-leaf-dark text-white flex items-center justify-center mb-4 shadow-md shadow-leaf-dark/20 font-bold text-lg">
              🔍
            </div>
            <h3 className="font-display font-bold text-lg text-forest-900 mb-2">
              {t('step2Title')}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('step2Desc')}
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-forest-100/80 shadow-card-soft text-left hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-earth-400 text-white flex items-center justify-center mb-4 shadow-md shadow-earth-400/20 font-bold text-lg">
              🌱
            </div>
            <h3 className="font-display font-bold text-lg text-forest-900 mb-2">
              {t('step3Title')}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('step3Desc')}
            </p>
          </div>

        </div>
      </section>

      {/* 3. MULTIMODAL AI & CORE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          
          <div className="max-w-3xl relative z-10 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-leaf-light">
              End-to-End Multimodal Intelligence
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Computer Vision + Speech AI + RAG + Weather Context
            </h2>
            <p className="text-forest-100 text-base leading-relaxed">
              AgriSathi does not produce generic chatbot hallucination. Every response is synthesized by crossing leaf symptom metrics with verified research bulletins from ICAR, KVK, and IMD Agromet advisories.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10">
                <h4 className="font-bold text-leaf-light text-sm mb-1">🖼 Computer Vision & Quality Assurance</h4>
                <p className="text-xs text-forest-100">Evaluates blur, brightness, and resolution before scanning leaf lesions.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10">
                <h4 className="font-bold text-leaf-light text-sm mb-1">🎙 Vernacular Speech & Audio</h4>
                <p className="text-xs text-forest-100">Supports spoken Hindi and English queries with immediate audio readout.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10">
                <h4 className="font-bold text-leaf-light text-sm mb-1">📚 Grounded Agricultural RAG</h4>
                <p className="text-xs text-forest-100">Embeds institutional bulletins from CPRI, IIVR, NRRI, and CICR.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10">
                <h4 className="font-bold text-leaf-light text-sm mb-1">⛅ Microclimate Disease Alerts</h4>
                <p className="text-xs text-forest-100">Calculates humidity thresholds and rain probability to flag fungal outbreaks.</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/scan"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-leaf-light text-forest-950 font-bold hover:bg-emerald-400 transition-colors"
              >
                <span>Start Checking Your Crop</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
