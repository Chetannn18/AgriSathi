import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, MessageSquare, ArrowDown, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Landing Page Modular Storytelling Components
import { HeroFieldCanvas } from '../components/landing/HeroFieldCanvas';
import { ScanningLeafHUD } from '../components/landing/ScanningLeafHUD';
import { MacroLeafScanner } from '../components/landing/MacroLeafScanner';
import { MultimodalIntelligenceOrb } from '../components/landing/MultimodalIntelligenceOrb';
import { DiagnosisCardShowcase } from '../components/landing/DiagnosisCardShowcase';
import { DetectionToDecisionFlow } from '../components/landing/DetectionToDecisionFlow';
import { AgriculturalKnowledgeRAG } from '../components/landing/AgriculturalKnowledgeRAG';
import { VernacularSpeechSection } from '../components/landing/VernacularSpeechSection';
import { WeatherContextSection } from '../components/landing/WeatherContextSection';
import { CropJourneyTimeline } from '../components/landing/CropJourneyTimeline';
import { BentoFeaturesGrid } from '../components/landing/BentoFeaturesGrid';
import { AgriSathiMomentAndClosing } from '../components/landing/AgriSathiMomentAndClosing';

export const LandingPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="relative w-full bg-[#040d0a] text-white selection:bg-emerald-600 selection:text-white overflow-hidden">
      
      {/* ==================================================
          HERO SECTION — 100vh FULL-SCREEN CINEMATIC ATMOSPHERE
          ================================================== */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
      >
        {/* Living Animated Field Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/assets/landing/hero_field_sunrise.jpg"
            alt="Sunrise agricultural field"
            className="w-full h-full object-cover opacity-60 scale-105 animate-wind-drift"
            loading="eager"
            decoding="async"
          />
          {/* Subtle gradient overlay to enhance typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#040d0a]/75 via-[#040d0a]/30 to-[#040d0a]" />
          {/* Floating canvas particles (pollen, sunlight rays, dew shimmer) */}
          <HeroFieldCanvas />
        </div>

        {/* Hero Content Grid: Editorial Headline + Floating Glass HUD */}
        <div className="relative z-20 max-w-7xl mx-auto w-full my-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Large Editorial Typography & CTAs */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium backdrop-blur-md shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-leaf-light animate-pulse" />
                <span>
                  {language === 'hi' 
                    ? 'मल्टीमॉडल भारतीय एग्रीटेक • पत्ती से समाधान तक' 
                    : 'Multimodal Indian AgriTech • From Leaf to Action'}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white leading-[1.08]">
                {language === 'hi' ? (
                  <>
                    आपकी फसल का <br />
                    <span className="font-editorial italic font-normal bg-gradient-to-r from-emerald-300 via-leaf-light to-lime-300 bg-clip-text text-transparent">
                      सच्चा AI साथी।
                    </span>
                  </>
                ) : (
                  <>
                    Your Crop's <br />
                    <span className="font-editorial italic font-normal bg-gradient-to-r from-emerald-300 via-leaf-light to-lime-300 bg-clip-text text-transparent">
                      AI Companion.
                    </span>
                  </>
                )}
              </h1>

              {/* Editorial Subheadline */}
              <p className="text-lg sm:text-xl text-gray-200 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {language === 'hi' ? (
                  <>
                    देखें फसल में क्या हो रहा है। <br className="hidden sm:inline" />
                    समस्या को वैज्ञानिक रूप से समझें। <br className="hidden sm:inline" />
                    <span className="text-white font-medium">आगे क्या कदम उठाना है, सटीक जानें।</span>
                  </>
                ) : (
                  <>
                    See what's happening in your crop. <br className="hidden sm:inline" />
                    Understand the problem. <br className="hidden sm:inline" />
                    <span className="text-white font-medium">Know what to do next.</span>
                  </>
                )}
              </p>

              {/* Primary & Secondary Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                
                {/* Primary CTA -> /scan */}
                <Link
                  to="/scan"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-forest-500 hover:bg-forest-400 text-white font-bold text-base shadow-xl shadow-forest-950/70 hover:shadow-emerald-500/25 active:scale-95 transition-all flex items-center justify-center gap-2.5"
                >
                  <Camera className="w-5 h-5 text-leaf-light" />
                  <span>{language === 'hi' ? 'फसल जांचें' : 'Check My Crop'}</span>
                </Link>

                {/* Secondary CTA -> /assistant */}
                <Link
                  to="/assistant"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-forest-950/70 hover:bg-forest-900/90 border border-emerald-500/40 text-gray-100 font-semibold text-base shadow-lg backdrop-blur-md active:scale-95 transition-all flex items-center justify-center gap-2.5"
                >
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  <span>{language === 'hi' ? 'पूछें एग्रीसाथी' : 'Ask AgriSathi'}</span>
                </Link>

              </div>

              {/* Value Pillar Markers */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2 text-xs font-mono text-emerald-200/80">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {language === 'hi' ? '3 सेकंड में दृश्य रोग निदान' : 'Visual Diagnosis in 3 Seconds'}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {language === 'hi' ? 'हिंदी व अंग्रेजी भाषा समर्थन' : 'Spoken Hindi & English'}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {language === 'hi' ? 'खेत-परीक्षित वैज्ञानिक सलाह' : 'Field Tested Guidance'}
                </span>
              </div>

            </div>

            {/* Right Column: Floating Translucent AI Diagnostic HUD */}
            <div className="lg:col-span-5 flex justify-center">
              <ScanningLeafHUD />
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-20 flex flex-col items-center justify-center space-y-2 text-xs font-mono text-gray-400 pt-6">
          <span className="tracking-widest uppercase text-[10px] text-emerald-300">
            {language === 'hi' ? 'नीचे देखें' : 'Scroll to explore'}
          </span>
          <div className="w-5 h-9 rounded-full border border-emerald-500/40 flex items-start justify-center p-1 bg-black/40 backdrop-blur-xs">
            <div className="w-1.5 h-2.5 rounded-full bg-emerald-400 animate-bounce mt-0.5" />
          </div>
        </div>

      </section>


      {/* ==================================================
          SECTION 01 & 02 — "EVERY LEAF TELLS A STORY" & "AI SEES WHAT YOU SEE"
          ================================================== */}
      <section id="how-it-works" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
        <MacroLeafScanner />
      </section>


      {/* ==================================================
          SECTION 03 — MULTIMODAL AI (IMAGE • VOICE • TEXT)
          ================================================== */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-forest-950/60 border-y border-emerald-500/15 z-10">
        <MultimodalIntelligenceOrb />
      </section>


      {/* ==================================================
          SECTION 04 — THE AI DIAGNOSIS INTERFACE
          ================================================== */}
      <section id="ai-diagnosis" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
        <DiagnosisCardShowcase />
      </section>


      {/* ==================================================
          SECTION 05 — FROM DETECTION TO DECISION (DETECT → UNDERSTAND → ADVISE → ACT)
          ================================================== */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-forest-950/60 border-y border-emerald-500/15 z-10">
        <DetectionToDecisionFlow />
      </section>


      {/* ==================================================
          SECTION 06 — AGRICULTURAL KNOWLEDGE (GROUNDED RAG)
          ================================================== */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
        <AgriculturalKnowledgeRAG />
      </section>


      {/* ==================================================
          SECTION 07 — VERNACULAR AI (ENGLISH ↔ HINDI TRANSFORMATION)
          ================================================== */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-forest-950/60 border-y border-emerald-500/15 z-10">
        <VernacularSpeechSection />
      </section>


      {/* ==================================================
          SECTION 08 — WEATHER CONTEXT & MICROCLIMATE RISK
          ================================================== */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
        <WeatherContextSection />
      </section>


      {/* ==================================================
          SECTION 09 — PERSONAL CROP JOURNEY (DAY 1 TO HARVEST)
          ================================================== */}
      <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-forest-950/60 border-y border-emerald-500/15 z-10">
        <CropJourneyTimeline />
      </section>


      {/* ==================================================
          SECTION 10 — BENTO FEATURES MATRIX
          ================================================== */}
      <section id="features" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
        <BentoFeaturesGrid />
      </section>


      {/* ==================================================
          SECTIONS 11 & 12 — THE AGriSATHI MOMENT, CLOSING CTA & FOOTER
          ================================================== */}
      <div className="relative pt-12 z-10">
        <AgriSathiMomentAndClosing />
      </div>

    </div>
  );
};
