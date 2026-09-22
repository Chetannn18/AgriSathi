import React, { useState } from 'react';
import { Calendar, ArrowRight, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  beforeImage: string;
  afterImage: string;
  beforeDate?: string;
  afterDate?: string;
}

export const ComparisonSlider: React.FC<Props> = ({
  beforeImage,
  afterImage,
  beforeDate = '23 Sep 2026',
  afterDate = '30 Sep 2026'
}) => {
  const { t } = useLanguage();
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="glass-panel p-5 rounded-2xl border border-forest-100 shadow-card-soft">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-display font-bold text-base text-forest-900">
            {t('imageComparisonTitle')}
          </h4>
          <p className="text-xs text-gray-500">
            Slide horizontal handle to evaluate foliar lesion progress over time
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-forest-700 bg-forest-50 px-2.5 py-1 rounded-full border border-forest-200">
          <Calendar className="w-3.5 h-3.5" />
          <span>7-Day Progression</span>
        </div>
      </div>

      {/* Interactive Visual Split View Container */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden select-none bg-forest-950 border border-forest-200">
        
        {/* Right / After Image (Underneath) */}
        <img
          src={afterImage}
          alt="Day 7 leaf status"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-forest-950/80 backdrop-blur-xs text-white px-2.5 py-1 rounded text-xs font-semibold z-10">
          {t('afterTreatment')} ({afterDate})
        </div>

        {/* Left / Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={beforeImage}
            alt="Day 1 initial diagnosis"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: '100%', height: '100%' }}
          />
          <div className="absolute top-3 left-3 bg-forest-950/80 backdrop-blur-xs text-white px-2.5 py-1 rounded text-xs font-semibold z-10">
            {t('beforeTreatment')} ({beforeDate})
          </div>
        </div>

        {/* Split Divider Bar */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-forest-600 text-white shadow-lg flex items-center justify-center text-xs font-bold border-2 border-white pointer-events-auto">
            ↔
          </div>
        </div>

        {/* Native Range Slider Overlay */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
          aria-label="Image comparison slider"
        />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 mt-3 px-1">
        <span>← {t('beforeTreatment')}</span>
        <span className="font-medium text-forest-700">Drag center slider to inspect tissue recovery</span>
        <span>{t('afterTreatment')} →</span>
      </div>
    </div>
  );
};
