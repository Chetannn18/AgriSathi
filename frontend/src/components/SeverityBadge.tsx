import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Unknown' | string;
}

export const SeverityBadge: React.FC<Props> = ({ severity }) => {
  const { language } = useLanguage();

  const labels: Record<string, { en: string; hi: string; classes: string }> = {
    Mild: {
      en: 'Mild Severity',
      hi: 'हल्का संक्रमण (Mild)',
      classes: 'bg-emerald-50 text-emerald-800 border-emerald-300'
    },
    Moderate: {
      en: 'Moderate Severity',
      hi: 'मध्यम संक्रमण (Moderate)',
      classes: 'bg-amber-50 text-amber-900 border-amber-300'
    },
    Severe: {
      en: 'Severe Infection',
      hi: 'गंभीर संक्रमण (Severe)',
      classes: 'bg-rose-50 text-rose-800 border-rose-300'
    },
    Unknown: {
      en: 'Severity Unknown',
      hi: 'अनिश्चित (Unknown)',
      classes: 'bg-gray-100 text-gray-700 border-gray-300'
    }
  };

  const current = labels[severity] || labels.Unknown;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${current.classes}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {language === 'hi' ? current.hi : current.en}
    </span>
  );
};
