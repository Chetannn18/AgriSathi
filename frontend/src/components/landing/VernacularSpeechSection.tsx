import React, { useState, useEffect } from 'react';
import { Mic, Volume2, Globe, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const VernacularSpeechSection: React.FC = () => {
  const [langMode, setLangMode] = useState<'en' | 'hi'>('hi');
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);

  // Toggle demonstration back and forth periodically if user doesn't interact
  useEffect(() => {
    const timer = setInterval(() => {
      setLangMode((prev) => (prev === 'en' ? 'hi' : 'en'));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto text-center">
      
      {/* Narrative Section Header */}
      <div className="max-w-2xl mx-auto mb-12 space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block">
          SECTION 07 • VERNACULAR SPEECH & NATIVE DIALECTS
        </span>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Ask naturally.<br />
          <span className="font-editorial italic font-normal text-leaf-light">
            In your own language.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
          Technology shouldn't require learning complex English terms. Speak directly to AgriSathi in your mother tongue.
        </p>
      </div>

      {/* Main Interactive Vernacular Glass Card */}
      <div className="glass-hud p-6 sm:p-10 rounded-3xl border border-emerald-400/40 max-w-2xl mx-auto relative overflow-hidden shadow-2xl">
        
        {/* Top Control Bar: English / Hindi Switcher */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono text-gray-300 font-semibold">
              Live Language Transformation
            </span>
          </div>

          <div className="flex items-center bg-forest-950/90 p-1 rounded-xl border border-emerald-500/30">
            <button
              onClick={() => setLangMode('en')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                langMode === 'en'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLangMode('hi')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                langMode === 'hi'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>

        {/* Dynamic Transforming Query Display */}
        <div className="py-6 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
            {langMode === 'en' ? 'Farmer Spoken Query (English)' : 'किसान की मौखिक बोली (हिन्दी)'}
          </span>

          <div className="min-h-[72px] flex items-center justify-center">
            <p
              key={langMode}
              className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight animate-in fade-in zoom-in-95 duration-500"
            >
              {langMode === 'en' ? (
                <span>"What is wrong with my crop?"</span>
              ) : (
                <span className="font-['Noto_Sans_Devanagari']">
                  "मेरी फसल को क्या हुआ है?"
                </span>
              )}
            </p>
          </div>

          {/* Voice Waveform Animation */}
          <div className="flex items-center justify-center gap-1.5 py-4">
            <span className="wave-bar w-1 bg-emerald-400 rounded-full" />
            <span className="wave-bar w-1 bg-leaf-light rounded-full" />
            <span className="wave-bar w-1 bg-emerald-300 rounded-full" />
            <span className="wave-bar w-1 bg-lime-400 rounded-full" />
            <span className="wave-bar w-1 bg-emerald-500 rounded-full" />
            <span className="wave-bar w-1 bg-leaf-light rounded-full" />
            <span className="wave-bar w-1 bg-emerald-400 rounded-full" />
            <span className="wave-bar w-1 bg-lime-300 rounded-full" />
          </div>

          <div className="p-3.5 rounded-xl bg-forest-950/70 border border-emerald-500/20 max-w-lg mx-auto text-left">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 mb-1">
              <Volume2 className="w-4 h-4 text-leaf-light" />
              <span>AgriSathi Audio Response</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-200">
              {langMode === 'en' ? (
                "Your tomato leaf exhibits early signs of Early Blight (Alternaria solani). Humidity is high today — avoid overhead irrigation and spray organic bio-fungicide on the lower canopy."
              ) : (
                "आपकी टमाटर की पत्ती में अगेती झुलसा (Early Blight) के लक्षण हैं। आज हवा में नमी अधिक है — पत्तियों पर पानी छिड़कने से बचें और निचले पत्तों पर जैविक फफूंदनाशक का छिड़काव करें।"
              )}
            </p>
          </div>
        </div>

        {/* CTA to Voice Assistant */}
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center">
          <Link
            to="/assistant"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all active:scale-95"
          >
            <Mic className="w-4 h-4 text-leaf-light" />
            <span>Try Voice Assistant in AgriSathi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
};
