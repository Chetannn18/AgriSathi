import React, { useState } from 'react';
import { Calendar, ArrowRight, CheckCircle2, TrendingUp, Sparkles, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CropJourneyTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(2);

  const timelineSteps = [
    {
      day: 'Day 01',
      title: 'Image Uploaded & Diagnosed',
      summary: 'Initial photo taken after spotting leaf lesions. AI identified early-stage Alternaria with 91% confidence.',
      status: 'Action Initiated',
      image: '/assets/demo/leaf_tomato.jpg',
      badge: '91% Early Blight'
    },
    {
      day: 'Day 04',
      title: 'Symptoms Monitored & Managed',
      summary: 'Lower canopy thinned to improve airflow; bio-fungicide foliar spray applied in late afternoon.',
      status: 'Treatment Applied',
      image: '/assets/landing/macro_crop_leaf.jpg',
      badge: 'Lesion Spread Arrested'
    },
    {
      day: 'Day 07',
      title: 'Follow-up Verification',
      summary: 'Follow-up leaf photo verified dried margins without necrotic expansion. New shoots growing green.',
      status: 'Tissue Recovery',
      image: '/assets/demo/leaf_tomato_healed.jpg',
      badge: 'Active Healing Confirmed'
    },
    {
      day: 'Current',
      title: 'Thriving Crop Status',
      summary: 'Crop reaches flowering and fruit set on schedule. Yield potential protected from premature defoliation.',
      status: 'Healthy & Productive',
      image: '/assets/landing/hero_field_sunrise.jpg',
      badge: 'Optimal Health'
    }
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto text-center">
      
      {/* Narrative Section Header */}
      <div className="max-w-3xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block">
          SECTION 09 • CONTINUOUS HEALTH TRACKING
        </span>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
          Your crop's story doesn't end<br />
          <span className="font-editorial italic font-normal text-leaf-light">
            after one diagnosis.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
          Farming is a journey across weeks of growth. AgriSathi helps you track healing progress, compare follow-up photos, and celebrate recovery.
        </p>
      </div>

      {/* Interactive Timeline Navigation Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {timelineSteps.map((step, idx) => (
          <button
            key={step.day}
            onClick={() => setActiveStep(idx)}
            className={`p-4 rounded-2xl text-left transition-all duration-300 ${
              activeStep === idx
                ? 'glass-hud border-emerald-400 ring-2 ring-emerald-400/30 scale-102 bg-forest-950/90 shadow-glow-green'
                : 'bg-forest-950/50 border border-white/10 hover:border-emerald-500/40 text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-emerald-400">
                {step.day}
              </span>
              <span className={`w-2 h-2 rounded-full ${activeStep === idx ? 'bg-emerald-400 animate-ping' : 'bg-gray-600'}`} />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
              {step.title}
            </h4>
            <span className="text-[10px] text-gray-400 font-mono mt-1 block">
              {step.status}
            </span>
          </button>
        ))}
      </div>

      {/* Active Step Feature Display Card */}
      <div className="glass-hud p-6 sm:p-8 rounded-3xl border border-emerald-400/30 max-w-4xl mx-auto text-left relative overflow-hidden bg-forest-950/80 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left: Thumbnail with Status Tag */}
          <div className="md:col-span-6 relative rounded-2xl overflow-hidden aspect-4/3 border border-emerald-500/30 bg-black">
            <img
              src={timelineSteps[activeStep].image}
              alt={timelineSteps[activeStep].title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            
            <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-mono text-emerald-300 font-bold">
              {timelineSteps[activeStep].day}
            </div>

            <div className="absolute bottom-3 left-3 right-3 bg-forest-950/90 backdrop-blur-md p-2.5 rounded-xl border border-emerald-500/30 flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-200">
                {timelineSteps[activeStep].badge}
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* Right: Narrative Details & Progression */}
          <div className="md:col-span-6 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                STAGE {activeStep + 1} OF 4 • {timelineSteps[activeStep].status}
              </span>
              <h3 className="text-2xl font-display font-bold text-white">
                {timelineSteps[activeStep].title}
              </h3>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              {timelineSteps[activeStep].summary}
            </p>

            <div className="p-3.5 rounded-xl bg-forest-900/60 border border-emerald-500/20 text-xs space-y-1.5">
              <span className="text-emerald-300 font-mono font-bold block">
                AgriSathi Longitudinal Tracker:
              </span>
              <p className="text-gray-300">
                Farmers can store before-and-after comparison scans to verify that treatment dosage is working as expected.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Link
                to="/history"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all active:scale-95"
              >
                <span>View Diagnosis History In App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
