import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, ChevronRight, ShieldAlert, Sparkles, Filter } from 'lucide-react';
import { api } from '../services/api';
import { Disease } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const DiseasesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const crops = [
    'all',
    'Tomato',
    'Potato',
    'Rice',
    'Cotton',
    'Chilli',
    'Wheat',
    'Maize',
    'Soybean'
  ];

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const list = await api.getDiseases();
        setDiseases(list);
      } catch (e) {
        console.error('Failed to load diseases:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDiseases();
  }, []);

  const filtered = diseases.filter((d) => {
    const matchesCrop = selectedCrop === 'all' || d.crop.toLowerCase() === selectedCrop.toLowerCase();
    const matchesQuery =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.name_hi.includes(searchQuery) ||
      d.crop.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCrop && matchesQuery;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-24 space-y-8">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-forest-600 block">
          Verified Field Encyclopedia
        </span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900 mt-1">
          {t('diseaseLibrary')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
          Comprehensive pathological catalog across 8 major Indian crops with ICAR prevention protocols
        </p>
      </div>

      {/* Filter and Search */}
      <div className="space-y-4">
        
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crop or disease (e.g. Blight, Blast, Rust)..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-forest-500 shadow-xs"
          />
        </div>

        {/* Horizontal Crop Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {crops.map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCrop === crop
                  ? 'bg-forest-600 text-white shadow-xs'
                  : 'bg-forest-50 text-forest-800 hover:bg-forest-100 border border-forest-100'
              }`}
            >
              {crop === 'all' ? t('allCrops') : crop}
            </button>
          ))}
        </div>

      </div>

      {/* Disease Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((d) => (
          <Link
            key={d.id}
            to={`/diseases/${d.id}`}
            className="glass-panel rounded-3xl border border-forest-100/90 shadow-card-soft overflow-hidden hover:border-forest-400 hover:-translate-y-1 transition-all group flex flex-col justify-between"
          >
            <div>
              {/* Image Preview Banner */}
              <div className="relative aspect-video w-full bg-forest-950 overflow-hidden">
                <img
                  src={d.image_url || '/assets/demo/leaf_tomato.jpg'}
                  alt={d.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 bg-forest-950/80 backdrop-blur-xs text-white px-2.5 py-0.5 rounded text-[11px] font-semibold">
                  {d.crop}
                </div>
                <div className="absolute top-2.5 right-2.5 bg-forest-950/80 backdrop-blur-xs text-leaf-light px-2 py-0.5 rounded text-[10px] font-mono">
                  {d.pathogen_type}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-display font-bold text-lg text-forest-900 group-hover:text-forest-700 transition-colors">
                    {d.name}
                  </h3>
                  <p className="text-xs text-forest-600 font-semibold mt-0.5">
                    {d.name_hi}
                  </p>
                  {d.scientific_name && (
                    <p className="text-[11px] text-gray-500 italic mt-0.5">
                      {d.scientific_name}
                    </p>
                  )}
                </div>

                <div className="space-y-1 text-xs text-gray-600">
                  <span className="font-bold text-[10px] uppercase text-forest-700 block">
                    Key Symptom:
                  </span>
                  <p className="line-clamp-2">
                    {language === 'hi' && d.symptoms_hi?.length ? d.symptoms_hi[0] : d.symptoms[0]}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-5 pt-2 border-t border-forest-100 flex items-center justify-between text-xs text-forest-700 font-semibold group-hover:text-forest-900">
              <span>View ICAR Protocol</span>
              <ChevronRight className="w-4 h-4 text-forest-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};
