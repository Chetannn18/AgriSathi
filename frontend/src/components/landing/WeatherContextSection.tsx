import React from 'react';
import { CloudRain, Droplets, Thermometer, Wind, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WeatherContextSection: React.FC = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto text-center">
      
      {/* Narrative Section Header */}
      <div className="max-w-3xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block">
          SECTION 08 • MICROCLIMATE RISK CONTEXT
        </span>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Crop Health in Weather Context.
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
          Pathogens do not act in isolation. AgriSathi considers local temperature, humidity, and rainfall patterns to understand environmental susceptibility.
        </p>
      </div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        
        <div className="glass-hud p-4 sm:p-5 rounded-2xl border border-emerald-500/20 text-left bg-forest-950/60">
          <div className="flex items-center justify-between mb-2">
            <Droplets className="w-5 h-5 text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-300 font-bold bg-cyan-950/60 px-1.5 py-0.5 rounded">
              ELEVATED
            </span>
          </div>
          <span className="text-xs text-gray-400 block">Relative Humidity</span>
          <span className="text-2xl font-mono font-bold text-white">88%</span>
          <p className="text-[10px] text-gray-400 mt-1">Leaves remain wet &gt; 8 hours</p>
        </div>

        <div className="glass-hud p-4 sm:p-5 rounded-2xl border border-emerald-500/20 text-left bg-forest-950/60">
          <div className="flex items-center justify-between mb-2">
            <CloudRain className="w-5 h-5 text-blue-400" />
            <span className="text-[10px] font-mono text-blue-300 font-bold bg-blue-950/60 px-1.5 py-0.5 rounded">
              RECENT
            </span>
          </div>
          <span className="text-xs text-gray-400 block">24h Rainfall</span>
          <span className="text-2xl font-mono font-bold text-white">42 mm</span>
          <p className="text-[10px] text-gray-400 mt-1">Rain-splash spore dispersal</p>
        </div>

        <div className="glass-hud p-4 sm:p-5 rounded-2xl border border-emerald-500/20 text-left bg-forest-950/60">
          <div className="flex items-center justify-between mb-2">
            <Thermometer className="w-5 h-5 text-amber-400" />
            <span className="text-[10px] font-mono text-amber-300 font-bold bg-amber-950/60 px-1.5 py-0.5 rounded">
              FAVORABLE
            </span>
          </div>
          <span className="text-xs text-gray-400 block">Ambient Temp</span>
          <span className="text-2xl font-mono font-bold text-white">24°C</span>
          <p className="text-[10px] text-gray-400 mt-1">Optimal germination range</p>
        </div>

        <div className="glass-hud p-4 sm:p-5 rounded-2xl border border-emerald-500/20 text-left bg-forest-950/60">
          <div className="flex items-center justify-between mb-2">
            <Wind className="w-5 h-5 text-leaf-light" />
            <span className="text-[10px] font-mono text-emerald-300 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded">
              MODERATE
            </span>
          </div>
          <span className="text-xs text-gray-400 block">Canopy Airflow</span>
          <span className="text-2xl font-mono font-bold text-white">11 km/h</span>
          <p className="text-[10px] text-gray-400 mt-1">Low drying rate in dense rows</p>
        </div>

      </div>

      {/* Synthesis Equation Card */}
      <div className="glass-hud p-6 sm:p-8 rounded-3xl border border-amber-500/30 max-w-3xl mx-auto text-left relative overflow-hidden bg-forest-950/90 shadow-2xl">
        
        {/* Risk Formula visual */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs font-mono font-bold text-white mb-4">
          <span className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
            HIGH HUMIDITY (88%)
          </span>
          <span className="text-gray-400">+</span>
          <span className="px-2.5 py-1 rounded-lg bg-blue-950/80 border border-blue-500/30 text-blue-300">
            RECENT RAINFALL (42mm)
          </span>
          <span className="text-gray-400">+</span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
            LEAF CONCENTRIC LESIONS
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-amber-200">
              "Conditions may increase fungal disease risk."
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Warm damp nights combined with free surface water on tomato leaves accelerate Alternaria fungal sporulation. Weather gives critical early context so you can take preventative steps before full-field spread occurs.
            </p>
          </div>
        </div>

        {/* Responsible Caution Callout */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-gray-400 font-mono">
          <span className="flex items-center gap-1.5 text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-leaf-light" />
            Weather provides risk context, not solitary diagnosis.
          </span>
          <Link
            to="/weather"
            className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
          >
            <span>Open Weather Advisory Page</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

      </div>

    </div>
  );
};
