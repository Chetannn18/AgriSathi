import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, ExternalLink, ShieldCheck, CheckCircle2, AlertCircle, Camera } from 'lucide-react';
import { api, formatImageUrl } from '../services/api';
import { Disease } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const DiseaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language, getCropName } = useLanguage();
  const [disease, setDisease] = useState<Disease | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await api.getDiseaseDetail(Number(id || 1));
        setDisease(data);
      } catch (e) {
        console.error('Failed to load disease detail:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (isLoading || !disease) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-sm text-gray-500">
        {language === 'hi' ? 'रोग उपचार विवरण लोड हो रहा है...' : 'Loading disease protocol...'}
      </div>
    );
  }

  const symptoms = language === 'hi' && disease.symptoms_hi?.length ? disease.symptoms_hi : disease.symptoms;
  const prevention = language === 'hi' && disease.prevention_hi?.length ? disease.prevention_hi : disease.prevention;
  const management = language === 'hi' && disease.management_hi?.length ? disease.management_hi : disease.management;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-24 space-y-8">
      
      {/* Back button */}
      <div>
        <Link
          to="/diseases"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-700 hover:text-forest-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('diseaseLibrary')}</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-forest-100 shadow-card-soft">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-5">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-forest-950 border border-forest-200 shadow-md">
              <img
                src={formatImageUrl(disease.image_url) || '/assets/demo/leaf_tomato.jpg'}
                alt={disease.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/demo/leaf_tomato.jpg';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5 bg-forest-950/80 backdrop-blur-xs text-white px-2.5 py-0.5 rounded text-[11px] font-semibold">
                {getCropName ? getCropName(disease.crop) : disease.crop}
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-forest-600">
                {getCropName ? getCropName(disease.crop) : disease.crop} {language === 'hi' ? 'पादप रोग विज्ञान' : 'Pathology'}
              </span>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900 mt-0.5">
                {language === 'hi' && disease.name_hi ? disease.name_hi : disease.name}
              </h1>
              <p className="text-sm font-semibold text-forest-700">
                {language === 'hi' ? disease.name : disease.name_hi}
              </p>
              {disease.scientific_name && (
                <p className="text-xs text-gray-500 italic mt-0.5">
                  {language === 'hi' ? 'रोगजनक (Pathogen): ' : 'Pathogen: '}
                  {disease.scientific_name} ({disease.pathogen_type})
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Link
                to={`/scan?crop=${encodeURIComponent(disease.crop)}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-600 text-white text-xs font-semibold hover:bg-forest-700 shadow-sm transition-all"
              >
                <Camera className="w-4 h-4 text-leaf-light" />
                <span>{language === 'hi' ? 'इस रोग की जांच हेतु फोटो लें' : 'Scan For This Disease'}</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Symptoms */}
      <div className="glass-panel p-6 rounded-2xl border border-forest-100 shadow-card-soft space-y-3">
        <h3 className="font-display font-bold text-base text-forest-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-leaf-dark" />
          <span>{t('whatWeFound')}</span>
        </h3>
        <ul className="space-y-2">
          {symptoms.map((s, idx) => (
            <li key={idx} className="text-xs sm:text-sm text-gray-700 flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 mt-2 shrink-0" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Causes & Environmental Triggers */}
      {disease.possible_causes && disease.possible_causes.length > 0 && (
        <div className="glass-panel p-6 rounded-2xl border border-forest-100 shadow-card-soft space-y-3">
          <h3 className="font-display font-bold text-base text-forest-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <span>{language === 'hi' ? 'अनुकूल मौसमी परिस्थितियां व कारण' : 'Environmental Triggers & Causes'}</span>
          </h3>
          <ul className="space-y-2">
            {disease.possible_causes.map((c, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-gray-700 flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Management & Practical Actions */}
      {management && management.length > 0 && (
        <div className="bg-forest-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
          <h3 className="font-display font-extrabold text-lg text-leaf-light">
            {language === 'hi' ? 'अनुशंसित वैज्ञानिक नियंत्रण उपाय' : 'Recommended Management Protocols'}
          </h3>
          <div className="space-y-2.5">
            {management.map((m, idx) => (
              <div key={idx} className="bg-white/10 p-3.5 rounded-xl border border-white/10 text-xs sm:text-sm text-forest-50 flex items-start gap-3">
                <span className="font-bold text-leaf-light">{idx + 1}.</span>
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prevention & Similar Diseases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Prevention */}
        {prevention && prevention.length > 0 && (
          <div className="glass-panel p-5 rounded-2xl border border-forest-100 shadow-card-soft">
            <h4 className="font-display font-bold text-sm text-forest-900 mb-3">
              🛡 {t('prevention')}
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              {prevention.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-forest-600 font-bold">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Similar Diseases */}
        {disease.similar_diseases && disease.similar_diseases.length > 0 && (
          <div className="glass-panel p-5 rounded-2xl border border-forest-100 shadow-card-soft">
            <h4 className="font-display font-bold text-sm text-forest-900 mb-3">
              {language === 'hi' ? 'समान दिखने वाले अन्य रोग' : 'Differential / Similar Conditions'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {disease.similar_diseases.map((sim, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-forest-50 text-forest-800 text-xs font-semibold border border-forest-200"
                >
                  {sim}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Sources */}
      {disease.sources && disease.sources.length > 0 && (
        <div className="glass-panel p-5 rounded-2xl border border-forest-100">
          <h4 className="font-bold text-xs uppercase tracking-wider text-forest-600 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{t('sourcesTitle')}</span>
          </h4>
          <div className="space-y-2">
            {disease.sources.map((src, idx) => (
              <a
                key={idx}
                href={src.url}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-forest-50/50 hover:bg-forest-100/60 border border-forest-100 flex items-center justify-between text-xs transition-colors group"
              >
                <div>
                  <span className="font-bold text-forest-900 block group-hover:text-forest-700">
                    {src.title}
                  </span>
                  <span className="text-gray-500 text-[11px]">{src.organization}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-forest-600 shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
