import React from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  confidence: number; // 0.0 - 1.0 or 0 - 100
  showLabel?: boolean;
}

export const ConfidenceBadge: React.FC<Props> = ({ confidence, showLabel = true }) => {
  const { t } = useLanguage();
  const percentage = confidence <= 1.0 ? Math.round(confidence * 100) : Math.round(confidence);

  let colorClasses = 'bg-forest-50 text-forest-700 border-forest-200';
  if (percentage >= 85) {
    colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-300';
  } else if (percentage >= 70) {
    colorClasses = 'bg-amber-50 text-amber-800 border-amber-300';
  } else {
    colorClasses = 'bg-rose-50 text-rose-800 border-rose-300';
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${colorClasses}`}>
      {percentage >= 75 ? (
        <ShieldCheck className="w-3.5 h-3.5 text-current" />
      ) : (
        <AlertCircle className="w-3.5 h-3.5 text-current" />
      )}
      <span>
        {showLabel && `${t('confidence')}: `}{percentage}%
      </span>
    </div>
  );
};
