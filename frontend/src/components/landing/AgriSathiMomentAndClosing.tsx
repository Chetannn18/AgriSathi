import React from 'react';
import { Sprout, Activity, ArrowRight, ShieldCheck, Camera, Compass, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export const AgriSathiMomentAndClosing: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full space-y-24">
      
      {/* SECTION 11 — THE AGriSATHI MOMENT */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden border border-emerald-500/30 shadow-2xl">
          
          {/* Background image of sunrise field */}
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/landing/hero_field_sunrise.jpg"
              alt="Agricultural crop field at sunrise"
              className="w-full h-full object-cover filter brightness-[0.4] saturate-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />
          </div>

          {/* Centered Glass Interface */}
          <div className="relative z-10 py-16 sm:py-24 px-6 sm:px-12 text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium backdrop-blur-md">
              <Sprout className="w-3.5 h-3.5 text-leaf-light" />
              <span>THE AGriSATHI PHILOSOPHY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              From a question<br />
              <span className="font-editorial italic font-normal text-leaf-light">
                to a clearer decision.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-sans max-w-xl mx-auto">
              Technology should make agricultural knowledge easier to access — not harder. AgriSathi puts the clarity of an agronomist right into your pocket.
            </p>

            <div className="pt-2">
              <Link
                to="/scan"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-forest-500 hover:bg-forest-400 text-white font-bold text-sm shadow-xl shadow-forest-950/60 active:scale-95 transition-all"
              >
                <Camera className="w-4 h-4 text-leaf-light" />
                <span>Try AgriSathi</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 12 — FINAL CTA (Full-Screen Atmosphere with Twilight Crop Canopy) */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-forest-950 text-white py-20 px-4 sm:px-6">
        
        {/* Background Twilight Silhouette Image with Fireflies */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/landing/twilight_crop_canopy.jpg"
            alt="Twilight agricultural crops and fireflies"
            className="w-full h-full object-cover filter brightness-[0.55] opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/90 via-forest-950/60 to-forest-950" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          
          {/* Subtle Animated Leaf / AI Emblem */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-forest-800/80 border border-emerald-400/40 text-leaf-light shadow-2xl backdrop-blur-md">
            <Sprout className="w-8 h-8 text-leaf-light animate-pulse" />
            <Activity className="w-4 h-4 text-emerald-400 absolute -bottom-1 -right-1" />
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Your crop is already<br />
              <span className="font-editorial italic font-normal text-leaf-light">
                telling you something.
              </span>
            </h2>

            <p className="text-lg sm:text-2xl text-emerald-100/90 font-light max-w-xl mx-auto">
              AgriSathi helps you understand it.
            </p>
          </div>

          {/* Action CTAs leading to existing application routes */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/scan"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-leaf-light text-forest-950 font-bold text-sm shadow-xl shadow-leaf-light/20 hover:bg-emerald-400 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4 text-forest-950" />
              <span>Check My Crop</span>
            </Link>

            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-forest-900/80 hover:bg-forest-800/90 border border-white/20 text-white font-semibold text-sm shadow-lg backdrop-blur-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-leaf-light" />
              <span>Explore AgriSathi</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-8 flex items-center justify-center gap-6 text-xs text-emerald-200/70 font-mono">
            <span>Free for Field Farmers</span>
            <span>•</span>
            <span>Works in Low Bandwidth</span>
            <span>•</span>
            <span>Zero Setup Required</span>
          </div>

        </div>

      </section>

      {/* REFINED FOOTER */}
      <footer className="border-t border-forest-800/80 bg-forest-950 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start space-y-2 text-center md:text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-forest-700/80 border border-emerald-500/30 flex items-center justify-center text-leaf-light">
                <Sprout className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                AgriSathi
              </span>
              <span className="text-[10px] font-mono uppercase bg-emerald-900/50 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">
                AI
              </span>
            </div>
            <p className="text-xs text-gray-400 max-w-sm">
              Multimodal AI Agricultural Companion for leaf disease detection, vernacular voice guidance, and ICAR-grounded field agronomy.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <button onClick={scrollToTop} className="hover:text-white transition-colors">
              Home
            </button>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#ai-diagnosis" className="hover:text-white transition-colors">
              AI Diagnosis
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <Link to="/diseases" className="hover:text-white transition-colors">
              Disease Library
            </Link>
            <Link to="/dashboard" className="text-leaf-light hover:text-white transition-colors font-semibold">
              Open Dashboard
            </Link>
          </div>

          {/* Language Selector & Copyright */}
          <div className="flex flex-col items-center md:items-end space-y-2 text-xs">
            <div className="flex items-center bg-black/40 border border-white/10 p-0.5 rounded-lg">
              <Globe className="w-3.5 h-3.5 text-gray-400 ml-1.5 mr-1" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded ${
                  language === 'en' ? 'bg-forest-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded ${
                  language === 'hi' ? 'bg-forest-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
            </div>
            <p className="text-[11px] text-gray-500">
              © 2026 AgriSathi. Crafted for Indian Agriculture.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
};
