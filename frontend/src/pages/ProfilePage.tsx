import React from 'react';
import { User, Globe, Sprout, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ProfilePage: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-24 space-y-8">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-forest-600 block">
          Account & Preferences
        </span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900 mt-1">
          {t('profile')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
          User identity, vernacular language settings, and active farm bindings
        </p>
      </div>

      {/* User Identity Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-forest-100 shadow-card-soft">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-forest-600 text-white flex items-center justify-center font-bold text-2xl shadow-md shadow-forest-600/20">
            R
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-bold text-xl text-forest-900">
                Ramesh Kumar
              </h2>
              <span className="bg-forest-100 text-forest-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Farmer & Plot Lead
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              ramesh.farmer@agrisathi.org • Madhya Pradesh, India
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Demo Account Authenticated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vernacular Language Settings */}
      <div className="glass-panel p-6 rounded-3xl border border-forest-100 shadow-card-soft space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-forest-600" />
          <h3 className="font-display font-bold text-base text-forest-900">
            Vernacular Language Preference
          </h3>
        </div>
        <p className="text-xs text-gray-500">
          Switch the primary language for UI labels, speech audio, and AI diagnostic answers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div
            onClick={() => setLanguage('en')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
              language === 'en'
                ? 'border-forest-600 bg-forest-50/80 shadow-xs'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div>
              <span className="font-bold text-sm text-forest-900 block">English</span>
              <span className="text-xs text-gray-500">Standard English terms & advisory</span>
            </div>
            {language === 'en' && <CheckCircle2 className="w-5 h-5 text-forest-600" />}
          </div>

          <div
            onClick={() => setLanguage('hi')}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
              language === 'hi'
                ? 'border-forest-600 bg-forest-50/80 shadow-xs'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div>
              <span className="font-bold text-sm text-forest-900 block">हिन्दी (Hindi)</span>
              <span className="text-xs text-gray-500">भारतीय कृषि शब्दावली एवं बोलचाल भाषा</span>
            </div>
            {language === 'hi' && <CheckCircle2 className="w-5 h-5 text-forest-600" />}
          </div>
        </div>
      </div>

      {/* Demo Mode Status Card */}
      <div className="bg-forest-900 text-white p-6 rounded-3xl shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-leaf-light font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Zero-Setup Offline / Local Demo Architecture</span>
          </div>
          <h4 className="font-display font-bold text-base text-white">
            AgriSathi 1.0 High-Fidelity Standalone Mode
          </h4>
          <p className="text-xs text-forest-200 max-w-lg">
            Configured with offline agricultural RAG embeddings, synthetic Vision heuristics, and Web Speech voice synthesis.
          </p>
        </div>
        <span className="text-xs font-bold bg-leaf-light text-forest-950 px-3 py-1.5 rounded-full shrink-0">
          Active
        </span>
      </div>

    </div>
  );
};
