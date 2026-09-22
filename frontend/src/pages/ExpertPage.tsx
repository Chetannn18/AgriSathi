import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, Clock, UserCheck, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { ExpertCase } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { SeverityBadge } from '../components/SeverityBadge';

export const ExpertPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [cases, setCases] = useState<ExpertCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<ExpertCase | null>(null);
  const [reviewAction, setReviewAction] = useState<'reviewed' | 'corrected'>('reviewed');
  const [confirmedDisease, setConfirmedDisease] = useState('');
  const [expertNotes, setExpertNotes] = useState('');
  const [prescription, setPrescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const list = await api.getExpertCases();
        setCases(list);
      } catch (e) {
        console.error('Failed to load expert cases:', e);
      }
    };
    fetchCases();
  }, []);

  const openReviewModal = (c: ExpertCase) => {
    setSelectedCase(c);
    setConfirmedDisease(c.ai_prediction);
    setReviewAction('reviewed');
    setExpertNotes('Field symptoms and lesion concentric patterns confirm the AI identification. Recommended bio-fungicidal containment.');
    setPrescription('Apply Trichoderma harzianum @ 5g/L. Keep furrows drained.');
    setStatusMessage(null);
  };

  const handleResolveCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase) return;

    setIsSubmitting(true);
    try {
      await api.resolveExpertCase(
        selectedCase.diagnosis_id,
        reviewAction,
        confirmedDisease,
        expertNotes,
        prescription
      );
      setStatusMessage('Expert review successfully certified and saved.');
      // Refresh list
      setCases((prev) =>
        prev.map((item) =>
          item.diagnosis_id === selectedCase.diagnosis_id
            ? { ...item, expert_status: reviewAction }
            : item
        )
      );
      setTimeout(() => {
        setSelectedCase(null);
      }, 1200);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-24 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-forest-600 block">
            Agronomist & Extension Verification Desk
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900 mt-1">
            {t('expertPortalTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            {t('expertSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
          <UserCheck className="w-4 h-4 text-emerald-700" />
          <span className="text-xs font-bold text-emerald-900">
            Dr. Arvind Sharma (Senior Agronomist, KVK)
          </span>
        </div>
      </div>

      {/* Cases Queue */}
      <div>
        <h3 className="font-display font-bold text-lg text-forest-900 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-forest-600" />
          <span>{t('pendingCases')}</span>
        </h3>

        <div className="space-y-4">
          {cases.map((c) => (
            <div
              key={c.diagnosis_id}
              className="glass-panel p-5 rounded-2xl border border-forest-100 shadow-card-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={c.image_url || '/assets/demo/leaf_rice.jpg'}
                  alt={c.ai_prediction}
                  className="w-16 h-16 rounded-xl object-cover border border-forest-200 shrink-0"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-forest-700 bg-forest-100 px-2 py-0.5 rounded">
                      Case #{c.diagnosis_id}
                    </span>
                    <span className="text-xs font-semibold text-gray-500 uppercase">
                      {c.crop}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-400">
                      {new Date(c.submitted_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base text-forest-900">
                    AI Prediction: {c.ai_prediction}
                  </h4>

                  <div className="flex items-center gap-2">
                    <ConfidenceBadge confidence={c.ai_confidence} />
                    <SeverityBadge severity={c.severity} />
                    {c.expert_status === 'reviewed' && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        ✓ Certified
                      </span>
                    )}
                    {c.expert_status === 'pending' && (
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        Pending Evaluation
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => openReviewModal(c)}
                  className="px-4 py-2 rounded-xl bg-forest-600 text-white text-xs font-bold hover:bg-forest-700 shadow-xs transition-all flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-leaf-light" />
                  <span>Review Case</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs font-bold text-forest-600 uppercase">
                  Reviewing Case #{selectedCase.diagnosis_id}
                </span>
                <h3 className="font-display font-bold text-xl text-forest-900">
                  {selectedCase.crop} — {selectedCase.ai_prediction}
                </h3>
              </div>
              <img
                src={selectedCase.image_url || '/assets/demo/leaf_rice.jpg'}
                alt="Case preview"
                className="w-12 h-12 rounded-xl object-cover border border-forest-200"
              />
            </div>

            {statusMessage ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-center font-bold text-sm">
                {statusMessage}
              </div>
            ) : (
              <form onSubmit={handleResolveCase} className="space-y-4">
                
                {/* Decision Radio */}
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-2">
                    Expert Agronomist Decision
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setReviewAction('reviewed')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2 ${
                        reviewAction === 'reviewed'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{t('confirmCase')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setReviewAction('corrected')}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2 ${
                        reviewAction === 'corrected'
                          ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>{t('correctCase')}</span>
                    </button>
                  </div>
                </div>

                {reviewAction === 'corrected' && (
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      Corrected Disease Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={confirmedDisease}
                      onChange={(e) => setConfirmedDisease(e.target.value)}
                      placeholder="e.g. Brown Spot (Bipolaris oryzae)"
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-forest-500"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Agronomist Verification Notes *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={expertNotes}
                    onChange={(e) => setExpertNotes(e.target.value)}
                    placeholder={t('expertNotePlaceholder')}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-forest-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Certified Treatment Prescription
                  </label>
                  <input
                    type="text"
                    value={prescription}
                    onChange={(e) => setPrescription(e.target.value)}
                    placeholder="e.g. Spray Tricyclazole 75% WP @ 0.6g/L"
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-forest-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setSelectedCase(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-xl bg-forest-600 text-white text-xs font-bold hover:bg-forest-700 shadow-sm"
                  >
                    {isSubmitting ? 'Certifying...' : t('submitReview')}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
