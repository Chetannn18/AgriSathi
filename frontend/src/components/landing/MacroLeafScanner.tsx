import React, { useState } from 'react';
import { Scan, AlertTriangle, Eye, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MacroLeafScanner: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(0);
  const [isScanning, setIsScanning] = useState(true);

  const hotspots = [
    {
      id: 0,
      x: '52%',
      y: '48%',
      name: 'Spots (Target Lesions)',
      description: 'Concentric dark rings characteristic of Alternaria fungal mycelium development.',
      severity: 'Active Infection',
      tag: 'Concentric ring necrosis'
    },
    {
      id: 1,
      x: '38%',
      y: '68%',
      name: 'Yellowing (Chlorosis)',
      description: 'Yellow halo surrounding necrosis due to fungal toxin inhibiting chlorophyll synthesis.',
      severity: 'Nutrient/Chlorophyll Loss',
      tag: 'Halo Chlorosis'
    },
    {
      id: 2,
      x: '71%',
      y: '48%',
      name: 'Wilting & Tissue Dryout',
      description: 'Localized desiccation where vascular tissue has been compromised by pathogens.',
      severity: 'Vascular Stress',
      tag: 'Tissue Desiccation'
    },
    {
      id: 3,
      x: '60%',
      y: '28%',
      name: 'Unusual Growth / Stunting',
      description: 'Irregular leaf margin development from repeated sub-lethal stress cycles.',
      severity: 'Structural Distortion',
      tag: 'Margin Distortion'
    }
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      
      {/* Top Transition Narrative Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
          <Eye className="w-3.5 h-3.5 text-leaf-light" />
          <span>SECTION 01 & 02 • THE DIAGNOSTIC VISION</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial italic font-normal text-white tracking-tight leading-tight">
          "Every leaf tells a story."
        </h2>

        <p className="text-base sm:text-lg text-emerald-100/80 max-w-xl mx-auto font-sans leading-relaxed">
          Yellowing. Spots. Wilting. Unusual growth. <br className="hidden sm:inline" />
          <span className="text-white font-medium">But knowing what they mean isn’t always easy.</span>
        </p>
      </div>

      {/* Main Interactive Scanner Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left / Center: Macro Leaf with Live CV Annotations */}
        <div className="lg:col-span-8 relative">
          <div className="relative rounded-3xl overflow-hidden bg-forest-950 border border-emerald-500/30 shadow-2xl group">
            
            {/* Macro Leaf Image */}
            <div className="relative aspect-16/10 sm:aspect-16/9 overflow-hidden">
              <img
                src="/assets/landing/macro_crop_leaf.jpg"
                alt="Agricultural leaf under computer vision inspection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Scanning Laser Beam */}
              {isScanning && <div className="animate-scan-line" />}

              {/* Computer Vision Overlay Matrix */}
              <div className="absolute inset-0 bg-forest-950/20 backdrop-contrast-105 pointer-events-none" />

              {/* CV Bounding Boxes around hotspots */}
              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot.id)}
                  style={{ top: spot.y, left: spot.x }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group/pin z-20 transition-all ${
                    selectedHotspot === spot.id ? 'scale-125' : 'hover:scale-110'
                  }`}
                  aria-label={`Inspect ${spot.name}`}
                >
                  <span className="relative flex h-8 w-8 items-center justify-center">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        selectedHotspot === spot.id ? 'bg-emerald-400' : 'bg-lime-400'
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-4 w-4 border-2 border-white shadow-lg ${
                        selectedHotspot === spot.id
                          ? 'bg-emerald-500 ring-4 ring-emerald-400/40'
                          : 'bg-lime-500'
                      }`}
                    />
                  </span>

                  {/* Floating Target Label */}
                  <span
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap font-bold transition-all ${
                      selectedHotspot === spot.id
                        ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 shadow-md'
                        : 'bg-black/60 text-gray-300 border border-white/10 opacity-80'
                    }`}
                  >
                    {spot.name.split(' ')[0]}
                  </span>
                </button>
              ))}

              {/* CV Status Overlay Tags */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 font-mono text-[10px] pointer-events-none">
                <div className="bg-forest-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CROP DETECTED: <strong>TOMATO</strong></span>
                </div>
                <div className="bg-forest-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-emerald-500/30 text-leaf-light flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-leaf-light" />
                  <span>SYMPTOM DETECTED: <strong>LEAF LESIONS</strong></span>
                </div>
                <div className="bg-forest-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-emerald-500/30 text-amber-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span>ANALYSIS: <strong>IN PROGRESS</strong></span>
                </div>
              </div>

              {/* Scan Toggle button */}
              <button
                onClick={() => setIsScanning(!isScanning)}
                className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white text-xs font-mono flex items-center gap-1.5 backdrop-blur-md transition-colors"
              >
                <Scan className="w-3 h-3 text-leaf-light" />
                <span>{isScanning ? 'Laser: Active' : 'Laser: Paused'}</span>
              </button>

            </div>

            {/* Bottom Caption Ribbon */}
            <div className="p-4 bg-forest-950/95 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-100/70">
              <span className="font-mono text-emerald-400">
                Resolution: 4032 × 3024 • Macro Lens Crop Inspection
              </span>
              <span className="text-gray-300">
                Click any glowing marker to explore symptoms
              </span>
            </div>

          </div>
        </div>

        {/* Right: Selected Symptom Breakdown Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-hud p-6 rounded-3xl border border-emerald-500/30 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Feature Inspection
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-900/40 text-emerald-300 border border-emerald-500/30">
                CV Marked #{selectedHotspot !== null ? selectedHotspot + 1 : 1}
              </span>
            </div>

            {selectedHotspot !== null ? (
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-gray-400 font-mono">Observable Symptom:</span>
                  <h3 className="text-xl font-display font-bold text-white mt-0.5">
                    {hotspots[selectedHotspot].name}
                  </h3>
                </div>

                <div className="p-3 rounded-xl bg-forest-950/80 border border-emerald-500/20">
                  <span className="text-[10px] font-mono text-amber-300 uppercase block font-semibold">
                    Pathological Impact
                  </span>
                  <p className="text-sm text-gray-200 mt-1 leading-relaxed">
                    {hotspots[selectedHotspot].description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-gray-400">Classification:</span>
                  <span className="font-semibold text-leaf-light">
                    {hotspots[selectedHotspot].severity}
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    to="/scan"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all active:scale-95"
                  >
                    <span>Analyze This Symptom Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400">Select a symptom marker on the leaf to read AI diagnostic notes.</p>
            )}

          </div>

          {/* Core Philosophy Callout */}
          <div className="p-4 rounded-2xl bg-forest-900/60 border border-emerald-500/20 text-xs text-emerald-100/80 leading-relaxed">
            <span className="font-bold text-white block mb-1">
              "AgriSathi turns a simple photo into agricultural insight."
            </span>
            Farmers no longer need to guess between fungal blight, bacterial wilt, or micronutrient deficiency in the field.
          </div>
        </div>

      </div>

    </div>
  );
};
