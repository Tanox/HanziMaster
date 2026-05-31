'use client';

import Link from 'next/link';
import { useTranslation } from '@/components/locale-provider';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in">
          <h2 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            {t('home.heroTitle')} <br/>
            <span className="text-emerald-600 italic">{t('home.heroSubtitle')}</span>{t('home.heroSuffix')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
            {t('home.heroDescription')}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/learn" className="bg-emerald-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 hover:scale-105 active:scale-95 flex items-center gap-2">
              {t('common.startLearning')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/learn" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2">
              {t('common.exploreLibrary')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="relative lg:h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/20 rounded-[4rem] rotate-3 -z-10 opacity-50"></div>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-700 w-full max-w-md transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-4xl font-bold text-slate-900 dark:text-white hanzi-font">永</span>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">yǒng • Forever</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-2 rounded-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
            </div>
            
            <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-600 flex items-center justify-center relative overflow-hidden group">
              <span className="text-9xl text-slate-200 dark:text-slate-700 group-hover:text-emerald-100 dark:group-hover:text-emerald-900/50 transition-colors duration-500 hanzi-font">永</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400">{t('common.strokeCount')}</span>
                <span className="font-semibold text-slate-900 dark:text-white">5 {t('common.strokes')}</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-3/5"></div>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 text-center italic">{t('common.foreverQuote')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 grid md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{t('home.aiInsightsTitle')}</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            {t('home.aiInsightsDesc')}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{t('home.etymologyTitle')}</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            {t('home.etymologyDesc')}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{t('home.adaptiveTitle')}</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            {t('home.adaptiveDesc')}
          </p>
        </div>
      </div>
    </div>
  );
}
