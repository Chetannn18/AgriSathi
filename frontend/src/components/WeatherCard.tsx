import React from 'react';
import { CloudRain, Droplets, Wind, Thermometer, AlertTriangle, ShieldCheck } from 'lucide-react';
import { WeatherData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  weather: WeatherData;
  compact?: boolean;
}

export const WeatherCard: React.FC<Props> = ({ weather, compact = false }) => {
  const { language, t } = useLanguage();

  return (
    <div className="glass-panel p-5 rounded-2xl shadow-card-soft border border-forest-100">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-forest-600 block">
            {t('weatherCardTitle')}
          </span>
          <h4 className="font-display font-bold text-lg text-forest-900">
            {weather.location}
          </h4>
        </div>
        <div className="text-right">
          <span className="text-2xl font-extrabold text-forest-900 font-display">
            {weather.temperature}°C
          </span>
          <span className="text-xs text-gray-500 block">
            {weather.condition}
          </span>
        </div>
      </div>

      {/* Atmospheric Metrics Grid */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        <div className="bg-forest-50/70 p-2.5 rounded-xl border border-forest-100/60 flex items-center gap-2">
          <Droplets className="w-5 h-5 text-sky-600 shrink-0" />
          <div>
            <span className="text-[10px] text-gray-500 block uppercase font-medium">
              {language === 'hi' ? 'नमी (आर्द्रता)' : 'Humidity'}
            </span>
            <span className="text-xs font-bold text-forest-900">{weather.humidity}%</span>
          </div>
        </div>

        <div className="bg-forest-50/70 p-2.5 rounded-xl border border-forest-100/60 flex items-center gap-2">
          <CloudRain className="w-5 h-5 text-indigo-600 shrink-0" />
          <div>
            <span className="text-[10px] text-gray-500 block uppercase font-medium">
              {language === 'hi' ? 'बारिश की संभावना' : 'Rain Risk'}
            </span>
            <span className="text-xs font-bold text-forest-900">{weather.rain_probability}%</span>
          </div>
        </div>

        <div className="bg-forest-50/70 p-2.5 rounded-xl border border-forest-100/60 flex items-center gap-2">
          <Wind className="w-5 h-5 text-teal-600 shrink-0" />
          <div>
            <span className="text-[10px] text-gray-500 block uppercase font-medium">
              {language === 'hi' ? 'हवा की गति' : 'Wind'}
            </span>
            <span className="text-xs font-bold text-forest-900">{weather.wind_speed} km/h</span>
          </div>
        </div>
      </div>

      {/* Agricultural Disease Risk Correlation Banner */}
      {(weather.disease_risk_alert || weather.disease_risk_alert_hi) && (
        <div className="bg-amber-50/90 border border-amber-200/80 p-3 rounded-xl flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-amber-900 block">
              {language === 'hi' ? 'मौसम आधारित रोग चेतावनी' : 'Microclimate Disease Advisory'}
            </span>
            <p className="text-xs text-amber-800 leading-relaxed mt-0.5">
              {language === 'hi'
                ? weather.disease_risk_alert_hi || weather.disease_risk_alert
                : weather.disease_risk_alert}
            </p>
          </div>
        </div>
      )}

      {/* 5-Day Forecast Strip (when not in compact mode) */}
      {!compact && weather.forecast_data && weather.forecast_data.length > 0 && (
        <div className="mt-4 pt-4 border-t border-forest-100">
          <span className="text-xs font-semibold text-forest-700 block mb-2.5">
            {language === 'hi' ? '5 दिवसीय कृषि मौसम पूर्वानुमान' : '5-Day Agromet Forecast'}
          </span>
          <div className="grid grid-cols-5 gap-1.5 text-center">
            {weather.forecast_data.map((f, i) => (
              <div key={i} className="bg-white/60 p-2 rounded-lg border border-forest-100/60">
                <span className="text-[11px] font-semibold text-gray-600 block">{f.day}</span>
                <span className="text-xs font-bold text-forest-900 block my-1">{f.temp}°</span>
                <span className="text-[10px] text-indigo-600 font-medium">{f.rain_prob}% 🌧</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
