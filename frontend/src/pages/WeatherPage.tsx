import React, { useState, useEffect } from 'react';
import { CloudSun, Droplets, Wind, Thermometer, CloudRain, AlertTriangle, ShieldCheck, Calendar } from 'lucide-react';
import { api } from '../services/api';
import { WeatherData } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { WeatherCard } from '../components/WeatherCard';

export const WeatherPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await api.getWeather();
        setWeather(data);
      } catch (e) {
        console.error('Failed to load weather:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (isLoading || !weather) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-sm text-gray-500">
        Loading agricultural meteorology data...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24 space-y-8">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-forest-600 block">
          Agromet Climate & Pathogen Correlation
        </span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900 mt-1">
          {t('weather')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
          Real-time agricultural weather context from IMD Agromet indices to anticipate fungal and pest outbreaks
        </p>
      </div>

      {/* Main Weather Overview */}
      <WeatherCard weather={weather} compact={false} />

      {/* Agromet Impact Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-panel p-5 rounded-2xl border border-forest-100 shadow-card-soft">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3 font-bold text-base">
            💧
          </div>
          <h4 className="font-display font-bold text-base text-forest-900 mb-1">
            Humidity & Spore Germination
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            At {weather.humidity}% relative humidity, fungal spores like *Alternaria* and *Phytophthora* require merely 4 to 6 hours of surface leaf moisture to penetrate leaf stomata.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-forest-100 shadow-card-soft">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3 font-bold text-base">
            🌡
          </div>
          <h4 className="font-display font-bold text-base text-forest-900 mb-1">
            Temperature Windows
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Current {weather.temperature}°C average is optimal for vegetable blight expansion. Cooler nights coupled with morning dew create secondary infection windows.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-forest-100 shadow-card-soft">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 font-bold text-base">
            🛡
          </div>
          <h4 className="font-display font-bold text-base text-forest-900 mb-1">
            Farmer Action Checklist
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            1. Open field drain furrows.<br />
            2. Suspend overhead sprinkler watering.<br />
            3. Apply bio-protective Trichoderma if rain breaks for 3+ hours.
          </p>
        </div>

      </div>

    </div>
  );
};
