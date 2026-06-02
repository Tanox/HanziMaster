// src/app/practice/page.tsx v2.2.1
'use client';

import { useTranslation } from '@/components/locale-provider';

export default function PracticePage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">{t('practice.title')}</h2>
        <p className="text-slate-500 dark:text-slate-400">{t('practice.subtitle')}</p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 border border-slate-100 dark:border-slate-700 shadow-lg text-center">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{t('practice.comingSoon')}</h3>
        <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md mx-auto">
          {t('practice.description')}
        </p>
      </div>
    </div>
  );
}
