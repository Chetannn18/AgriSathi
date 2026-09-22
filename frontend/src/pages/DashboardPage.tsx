import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, MessageSquare, Sprout, BookOpen, AlertTriangle, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { Farm, Diagnosis, WeatherData } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { WeatherCard } from '../components/WeatherCard';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { SeverityBadge } from '../components/SeverityBadge';

export const DashboardPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [farmList, diagList, weatherData] = await Promise.all([
          api.getFarms(),
          api.getDiagnoses(),
          api.getWeather()
        ]);
        setFarms(farmList);
        setDiagnoses(diagList);
        setWeather(weatherData);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const activeFarm = farms[0] || {
    name: 'Ramesh Organic Farm',
    current_crop: 'Tomato',
    crop_stage: 'Flowering',
    area_acres: 2.5,
    location: 'Madhya Pradesh'
  };

  const latestDiagnosis = diagnoses[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* 1. GREETING HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900">
              {t('greeting')} 👋
            </h1>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {t('welcomeBack')} • Ramesh Organic Farm (Madhya Pradesh)
          </p>
        </div>

        {/* Quick CTA */}
        <Link
          to="/scan"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-forest-600 text-white font-semibold text-sm shadow-md shadow-forest-600/20 hover:bg-forest-700 transition-all active:scale-95"
        >
          <Camera className="w-4 h-4 text-leaf-light" />
          <span>{t('checkCrop')}</span>
        </Link>
      </div>

      {/* 2. IMPORTANT ALERT BANNER */}
      {weather?.disease_risk_alert && (
        <div className="bg-amber-50 border border-amber-200/90 p-4 rounded-2xl flex items-start gap-3 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              {t('importantAlert')}
            </h4>
            <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
              {language === 'hi' ? weather.disease_risk_alert_hi : weather.disease_risk_alert}
            </p>
          </div>
          <Link
            to="/weather"
            className="text-xs font-bold text-amber-900 hover:underline shrink-0 hidden sm:inline"
          >
            {t('viewDetails')} →
          </Link>
        </div>
      )}

      {/* 3. WEATHER CARD + ACTIVE CROP CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weather Card */}
        <div className="lg:col-span-6">
          {weather && <WeatherCard weather={weather} />}
        </div>

        {/* My Crop Card */}
        <div className="lg:col-span-6 glass-panel p-5 rounded-2xl shadow-card-soft border border-forest-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-forest-600">
                {t('myCropCardTitle')}
              </span>
              <span className="text-xs font-bold bg-forest-100 text-forest-800 px-2.5 py-0.5 rounded-full">
                Active Plot
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-forest-600/10 border border-forest-200 flex items-center justify-center text-3xl">
                🍅
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-forest-900">
                  {activeFarm.current_crop}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  {activeFarm.name} • {activeFarm.area_acres} Acres
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-forest-100">
              <div>
                <span className="text-[11px] text-gray-500 block uppercase font-medium">Growth Stage</span>
                <span className="text-xs font-bold text-forest-900">{activeFarm.crop_stage}</span>
              </div>
              <div>
                <span className="text-[11px] text-gray-500 block uppercase font-medium">Health Status</span>
                <span className="text-xs font-bold text-amber-700">Early Blight (Treated)</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 flex items-center justify-between">
            <Link
              to="/farms"
              className="text-xs font-semibold text-forest-700 hover:text-forest-900 flex items-center gap-1"
            >
              <span>Manage Farm Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to={`/scan?crop=${encodeURIComponent(activeFarm.current_crop)}`}
              className="px-3 py-1.5 rounded-lg bg-forest-50 text-forest-700 hover:bg-forest-100 font-medium text-xs border border-forest-200 transition-colors"
            >
              Scan This Crop
            </Link>
          </div>
        </div>

      </div>

      {/* 4. QUICK ACTIONS GRID */}
      <div>
        <h3 className="font-display font-bold text-lg text-forest-900 mb-3">
          {t('quickActions')}
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <Link
            to="/scan"
            className="glass-panel p-4 rounded-xl border border-forest-100/90 shadow-card-soft hover:border-forest-400 hover:-translate-y-0.5 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-forest-600 text-white flex items-center justify-center mb-3 shadow-sm group-hover:bg-forest-500 transition-colors">
              <Camera className="w-5 h-5 text-leaf-light" />
            </div>
            <h4 className="font-bold text-sm text-forest-900 mb-0.5">
              {t('checkCrop')}
            </h4>
            <p className="text-[11px] text-gray-500">
              Upload leaf photo for disease prediction
            </p>
          </Link>

          <Link
            to="/assistant"
            className="glass-panel p-4 rounded-xl border border-forest-100/90 shadow-card-soft hover:border-forest-400 hover:-translate-y-0.5 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-leaf-dark text-white flex items-center justify-center mb-3 shadow-sm group-hover:bg-leaf-light transition-colors">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-forest-900 mb-0.5">
              {t('assistant')}
            </h4>
            <p className="text-[11px] text-gray-500">
              Voice or text chat in Hindi & English
            </p>
          </Link>

          <Link
            to="/farms"
            className="glass-panel p-4 rounded-xl border border-forest-100/90 shadow-card-soft hover:border-forest-400 hover:-translate-y-0.5 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-earth-400 text-white flex items-center justify-center mb-3 shadow-sm group-hover:bg-earth-300 transition-colors">
              <Sprout className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-forest-900 mb-0.5">
              {t('myFarm')}
            </h4>
            <p className="text-[11px] text-gray-500">
              View acreage, crop stages & irrigation
            </p>
          </Link>

          <Link
            to="/diseases"
            className="glass-panel p-4 rounded-xl border border-forest-100/90 shadow-card-soft hover:border-forest-400 hover:-translate-y-0.5 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-lg bg-forest-700 text-white flex items-center justify-center mb-3 shadow-sm group-hover:bg-forest-600 transition-colors">
              <BookOpen className="w-5 h-5 text-leaf-light" />
            </div>
            <h4 className="font-bold text-sm text-forest-900 mb-0.5">
              {t('diseaseLibrary')}
            </h4>
            <p className="text-[11px] text-gray-500">
              Search 8+ crops and certified solutions
            </p>
          </Link>

        </div>
      </div>

      {/* 5. RECENT DIAGNOSIS FEED */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-lg text-forest-900">
            {t('recentDiagnosis')}
          </h3>
          <Link
            to="/history"
            className="text-xs font-semibold text-forest-700 hover:text-forest-900 flex items-center gap-1"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {latestDiagnosis ? (
          <div className="glass-panel p-5 rounded-2xl border border-forest-100 shadow-card-soft">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              <div className="flex items-center gap-4">
                <img
                  src={latestDiagnosis.image_url || '/assets/demo/leaf_tomato.jpg'}
                  alt={latestDiagnosis.possible_disease}
                  className="w-20 h-20 rounded-xl object-cover border border-forest-200 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-forest-600">
                      {latestDiagnosis.crop}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-500">
                      {new Date(latestDiagnosis.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-lg text-forest-900">
                    {latestDiagnosis.possible_disease}
                  </h4>
                  {latestDiagnosis.disease_name_hi && (
                    <p className="text-xs text-forest-600 font-medium -mt-0.5">
                      {latestDiagnosis.disease_name_hi}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <ConfidenceBadge confidence={latestDiagnosis.confidence} />
                    <SeverityBadge severity={latestDiagnosis.severity} />
                    {latestDiagnosis.expert_status === 'reviewed' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Expert Certified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-auto text-right">
                <Link
                  to={`/diagnosis/${latestDiagnosis.id}`}
                  className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-xl bg-forest-600 text-white text-xs font-semibold hover:bg-forest-700 shadow-sm transition-all"
                >
                  <span>{t('viewDetails')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        ) : (
          <div className="text-center py-8 glass-panel rounded-2xl border border-dashed border-gray-300 text-gray-500 text-sm">
            No previous diagnosis found. Click "Check My Crop" to start your first analysis.
          </div>
        )}
      </div>

    </div>
  );
};
