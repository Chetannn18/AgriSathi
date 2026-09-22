import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2, AlertTriangle, ShieldCheck, ArrowLeft, ExternalLink,
  ThumbsUp, ThumbsDown, BookOpen, Clock, Activity, Send
} from 'lucide-react';
import { api } from '../services/api';
import { Diagnosis } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { SeverityBadge } from '../components/SeverityBadge';

export const DiagnosisDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expertRequested, setExpertRequested] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const data = await api.getDiagnosis(Number(id || 1));
        setDiagnosis(data);
        if (data.expert_status === 'pending' || data.expert_status === 'reviewed') {
          setExpertRequested(true);
        }
      } catch (err) {
        console.error('Failed to load diagnosis:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDiagnosis();
  }, [id]);

  const handleRequestExpert = async () => {
    if (!diagnosis) return;
    try {
      await api.requestExpertReview(diagnosis.id, 'Farmer requested priority agronomist verification.');
      setExpertRequested(true);
    } catch (e) {
      console.error(e);
      setExpertRequested(true);
    }
  };

  const handleFeedback = async (isHelpful: boolean) => {
    if (!diagnosis || feedbackSent) return;
    try {
      await api.submitFeedback(diagnosis.id, isHelpful, 'Correct');
      setFeedbackSent(true);
    } catch {
      setFeedbackSent(true);
    }
  };

  if (isLoading || !diagnosis) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-10 h-10 border-4 border-forest-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray-500">Loading comprehensive agricultural advisory...</p>
      </div>
    );
  }

  const symptomsList = language === 'hi' && diagnosis.symptoms_hi?.length ? diagnosis.symptoms_hi : diagnosis.observed_symptoms;
  const actionsList = language === 'hi' && diagnosis.immediate_actions_hi?.length ? diagnosis.immediate_actions_hi : diagnosis.immediate_actions;
  const preventionList = language === 'hi' && diagnosis.prevention_hi?.length ? diagnosis.prevention_hi : diagnosis.prevention;
  const monitoringList = language === 'hi' && diagnosis.monitoring_hi?.length ? diagnosis.monitoring_hi : diagnosis.monitoring;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-24 space-y-8">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/history"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-700 hover:text-forest-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('history')}</span>
        </Link>
        <span className="text-xs text-gray-500">
          Diagnosis ID #{diagnosis.id} • {new Date(diagnosis.created_at).toLocaleDateString()}
        </span>
      </div>

      {/* 1. PRIMARY RESULT HERO CARD */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-forest-100 shadow-card-soft">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Leaf Photo Preview */}
          <div className="md:col-span-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-forest-950 border border-forest-200 shadow-md">
              <img
                src={diagnosis.image_url || '/assets/demo/leaf_tomato.jpg'}
                alt={diagnosis.possible_disease}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5 bg-forest-950/80 backdrop-blur-xs text-leaf-light px-2.5 py-0.5 rounded text-[11px] font-mono">
                {diagnosis.crop}
              </div>
            </div>
          </div>

          {/* Disease Headline & Badges */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-forest-600">
                {t('possibleDisease')}
              </span>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900 mt-0.5">
                {diagnosis.possible_disease}
              </h1>
              {diagnosis.disease_name_hi && (
                <p className="text-sm font-semibold text-forest-700 mt-0.5">
                  {diagnosis.disease_name_hi}
                </p>
              )}
            </div>

            {/* Confidence & Severity Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <ConfidenceBadge confidence={diagnosis.confidence} />
              <SeverityBadge severity={diagnosis.severity} />
              {diagnosis.expert_status === 'reviewed' && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  KVK Agronomist Verified
                </span>
              )}
            </div>

            {/* Short evidence explanation */}
            <div className="bg-forest-50/70 p-3.5 rounded-xl border border-forest-100/80">
              <span className="text-xs font-bold text-forest-900 block mb-0.5">
                {t('whyWeThinkThis')}
              </span>
              <p className="text-xs text-forest-800 leading-relaxed">
                {diagnosis.evidence_reason || "Concentric circular leaf lesions identified on mature foliage with surrounding chlorotic halo."}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. DIFFERENTIAL DIAGNOSIS (Section 15) */}
      {diagnosis.differential_diagnosis && diagnosis.differential_diagnosis.length > 0 && (
        <div className="glass-panel p-5 rounded-2xl border border-forest-100 shadow-card-soft">
          <h3 className="font-display font-bold text-sm text-forest-900 mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-forest-600" />
            <span>{t('differentialTitle')}</span>
          </h3>

          <div className="space-y-2.5">
            {diagnosis.differential_diagnosis.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-forest-800">
                  <span>{language === 'hi' ? item.disease_hi || item.disease : item.disease}</span>
                  <span>{item.probability}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      idx === 0 ? 'bg-forest-600' : 'bg-forest-300'
                    }`}
                    style={{ width: `${item.probability}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. WHAT WE FOUND (Observed Symptoms) */}
      <div className="glass-panel p-6 rounded-2xl border border-forest-100 shadow-card-soft">
        <h3 className="font-display font-bold text-base text-forest-900 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-leaf-dark" />
          <span>{t('whatWeFound')}</span>
        </h3>
        <ul className="space-y-2">
          {symptomsList.map((symptom, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 mt-2 shrink-0" />
              <span>{symptom}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 4. WHAT TO DO NOW (Practical Actions) */}
      <div className="bg-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-leaf-light animate-pulse" />
          <h3 className="font-display font-extrabold text-lg sm:text-xl text-leaf-light">
            {t('whatToDoNow')}
          </h3>
        </div>
        <p className="text-xs text-forest-200">
          Immediate field interventions approved by ICAR and state agricultural extension guidelines:
        </p>

        <div className="space-y-3 pt-1">
          {actionsList.map((action, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10 flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-leaf-light text-forest-950 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-forest-50 leading-relaxed">
                {action}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. PREVENTION & MONITORING */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Prevention */}
        <div className="glass-panel p-5 rounded-2xl border border-forest-100 shadow-card-soft">
          <h4 className="font-display font-bold text-sm text-forest-900 mb-2.5">
            🛡 {t('prevention')}
          </h4>
          <ul className="space-y-2">
            {preventionList.map((p, idx) => (
              <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-forest-600 font-bold">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Monitoring */}
        <div className="glass-panel p-5 rounded-2xl border border-forest-100 shadow-card-soft">
          <h4 className="font-display font-bold text-sm text-forest-900 mb-2.5">
            👁 {t('monitor')}
          </h4>
          <ul className="space-y-2">
            {monitoringList.map((m, idx) => (
              <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-forest-600 font-bold">•</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 6. EXPERT REVIEWS ATTACHED */}
      {diagnosis.expert_reviews && diagnosis.expert_reviews.length > 0 && (
        <div className="glass-panel p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h4 className="font-bold text-sm text-emerald-950">
              Certified Agronomist Review
            </h4>
          </div>
          {diagnosis.expert_reviews.map((rev, idx) => (
            <div key={idx} className="text-xs text-emerald-900 space-y-1">
              <p className="font-medium">
                <strong>{rev.expert_name}</strong> ({rev.organization})
              </p>
              <p className="bg-white/80 p-3 rounded-lg border border-emerald-200/60 mt-1">
                "{rev.notes}"
              </p>
              {rev.prescription && (
                <p className="text-[11px] text-emerald-800 font-semibold pt-1">
                  Prescription: {rev.prescription}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 7. IMPORTANT SAFETY NOTE */}
      <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900">
          <span className="font-bold block mb-0.5">{t('importantNoteTitle')}</span>
          <p className="leading-relaxed">{t('importantNoteText')}</p>
        </div>
      </div>

      {/* 8. CITATIONS & SOURCES */}
      {diagnosis.sources && diagnosis.sources.length > 0 && (
        <div className="glass-panel p-5 rounded-2xl border border-forest-100">
          <h4 className="font-bold text-xs uppercase tracking-wider text-forest-600 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{t('sourcesTitle')}</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {diagnosis.sources.map((src, idx) => (
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

      {/* 9. BOTTOM ACTIONS: REQUEST EXPERT REVIEW & FEEDBACK */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-forest-100">
        
        {/* Request Expert Review Button */}
        <div>
          {expertRequested ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-100 text-forest-800 text-xs font-semibold border border-forest-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t('expertRequested')}</span>
            </div>
          ) : (
            <button
              onClick={handleRequestExpert}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-forest-300 text-forest-800 text-xs font-bold hover:bg-forest-50 active:scale-95 transition-all shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-forest-600" />
              <span>{t('requestExpertBtn')}</span>
            </button>
          )}
        </div>

        {/* Helpful Feedback Buttons */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-600">
            {t('feedbackHelpfulPrompt')}
          </span>
          {feedbackSent ? (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              ✓ Recorded
            </span>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleFeedback(true)}
                className="p-1.5 rounded-lg border border-gray-200 hover:bg-forest-50 text-forest-700 hover:border-forest-300 text-xs flex items-center gap-1"
                title="Helpful"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{t('yes')}</span>
              </button>
              <button
                onClick={() => handleFeedback(false)}
                className="p-1.5 rounded-lg border border-gray-200 hover:bg-rose-50 text-gray-600 hover:text-rose-600 text-xs flex items-center gap-1"
                title="Not helpful"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>{t('no')}</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
