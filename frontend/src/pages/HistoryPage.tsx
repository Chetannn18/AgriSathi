import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Filter, ArrowRight, ShieldCheck, Search, Image as ImageIcon } from 'lucide-react';
import { api } from '../services/api';
import { Diagnosis } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { SeverityBadge } from '../components/SeverityBadge';
import { ComparisonSlider } from '../components/ComparisonSlider';

export const HistoryPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const list = await api.getDiagnoses();
        setDiagnoses(list);
      } catch (e) {
        console.error('Failed to load history:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const crops = ['all', 'Tomato', 'Potato', 'Rice', 'Cotton'];

  const filteredDiagnoses = diagnoses.filter((d) => {
    const matchesCrop = selectedCrop === 'all' || d.crop.toLowerCase() === selectedCrop.toLowerCase();
    const matchesSearch =
      d.possible_disease.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.disease_name_hi && d.disease_name_hi.includes(searchQuery));
    return matchesCrop && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-24 space-y-8">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-forest-600 block">
          Longitudinal Health Records
        </span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900 mt-1">
          {t('historyTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
          Review past crop diagnoses, certified agronomist reviews, and foliar recovery timelines
        </p>
      </div>

      {/* 1. VISUAL RECOVERY COMPARISON (Day 1 vs Day 7) */}
      <div>
        <ComparisonSlider
          beforeImage="/assets/demo/leaf_tomato.jpg"
          afterImage="/assets/demo/leaf_tomato_healed.jpg"
          beforeDate="23 Sep 2026"
          afterDate="30 Sep 2026"
        />
      </div>

      {/* 2. FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-forest-100">
        
        {/* Crop Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-forest-600 shrink-0 mr-1" />
          {crops.map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCrop === crop
                  ? 'bg-forest-600 text-white shadow-xs'
                  : 'bg-forest-50/80 text-forest-800 hover:bg-forest-100'
              }`}
            >
              {crop === 'all' ? t('allCrops') : crop}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search disease or crop..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-forest-500"
          />
        </div>

      </div>

      {/* 3. DIAGNOSES FEED LIST */}
      <div className="space-y-4">
        {filteredDiagnoses.length > 0 ? (
          filteredDiagnoses.map((diag) => (
            <div
              key={diag.id}
              className="glass-panel p-5 rounded-2xl border border-forest-100 shadow-card-soft hover:border-forest-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={diag.image_url || '/assets/demo/leaf_tomato.jpg'}
                  alt={diag.possible_disease}
                  className="w-20 h-20 rounded-xl object-cover border border-forest-200 shrink-0"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-forest-600">
                      {diag.crop}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-500">
                      {new Date(diag.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-forest-900">
                    {diag.possible_disease}
                  </h3>
                  {diag.disease_name_hi && (
                    <p className="text-xs text-forest-600 font-medium">
                      {diag.disease_name_hi}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <ConfidenceBadge confidence={diag.confidence} />
                    <SeverityBadge severity={diag.severity} />
                    {diag.expert_status === 'reviewed' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Expert Certified
                      </span>
                    )}
                    {diag.expert_status === 'pending' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <Clock className="w-3.5 h-3.5" />
                        Pending Review
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-auto text-right">
                <Link
                  to={`/diagnosis/${diag.id}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-forest-600 text-white text-xs font-semibold hover:bg-forest-700 shadow-sm transition-all"
                >
                  <span>{t('viewDetails')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="glass-panel p-10 rounded-2xl border border-dashed border-gray-300 text-center text-gray-500 text-sm">
            No diagnoses found matching your filter criteria.
          </div>
        )}
      </div>

    </div>
  );
};
