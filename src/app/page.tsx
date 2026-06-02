'use client';

import Link from 'next/link';
import { useTranslation } from '@/components/locale-provider';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 dark:bg-emerald-900/30 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200 dark:bg-cyan-900/30 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
            <div className="absolute inset-0" style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), 
                                linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Floating Characters */}
          <div className="absolute top-20 right-20 text-[200px] font-bold text-slate-100 dark:text-slate-800/50 pointer-events-none select-none hanzi-font opacity-40">
            学
          </div>
          <div className="absolute bottom-20 left-10 text-[150px] font-bold text-slate-100 dark:text-slate-800/50 pointer-events-none select-none hanzi-font opacity-30 rotate-12">
            习
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8 animate-fade-in">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm font-medium animate-bounce-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                AI {t('home.heroTitle')}
              </div>

              {/* Main Heading */}
              <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                {t('home.heroTitle')} <br/>
                <span className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-cyan-500 dark:from-emerald-400 dark:via-emerald-500 dark:to-cyan-400 bg-clip-text text-transparent italic font-black">
                  {t('home.heroSubtitle')}
                </span>
                {t('home.heroSuffix')}
              </h2>

              {/* Description */}
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
                {t('home.heroDescription')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  href="/learn" 
                  className="group bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-1 active:translate-y-0 flex items-center gap-3"
                >
                  {t('common.startLearning')}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/learn" 
                  className="group bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl text-lg font-bold hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all flex items-center gap-3 hover:-translate-y-1 active:translate-y-0"
                >
                  {t('common.exploreLibrary')}
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 pt-8">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 border-2 border-white dark:border-slate-800 flex items-center justify-center text-sm font-bold text-emerald-600 dark:text-emerald-400 hanzi-font">永</div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 border-2 border-white dark:border-slate-800 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400 hanzi-font">山</div>
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 border-2 border-white dark:border-slate-800 flex items-center justify-center text-sm font-bold text-purple-600 dark:text-purple-400 hanzi-font">水</div>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-slate-900 dark:text-white">10,000+</span> {t('common.learners')}
                </div>
              </div>
            </div>

            {/* Right Column - Visual Demo */}
            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-[5rem] rotate-3 -z-10 opacity-60"></div>
              
              <div className="bg-white dark:bg-slate-800 p-10 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-slate-700 w-full max-w-lg transform -rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
                {/* Card Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-5xl font-bold text-slate-900 dark:text-white hanzi-font">永</span>
                    <p className="text-base text-slate-500 dark:text-slate-400 mt-2 font-medium">yǒng • Forever</p>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-2xl">
                    <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                {/* Character Display Area */}
                <div className="aspect-square bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-900 dark:to-emerald-900/20 rounded-3xl border-2 border-dashed border-emerald-200/50 dark:border-emerald-800/50 flex items-center justify-center relative overflow-hidden group">
                  <span className="text-[10rem] text-slate-200/80 dark:text-slate-700/80 hanzi-font transition-all duration-500 group-hover:scale-110">永</span>
                  
                  {/* Animated Dot */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 w-4 h-4 bg-emerald-500 rounded-full opacity-20 animate-ping"></div>
                      <div className="w-4 h-4 bg-emerald-500 rounded-full relative"></div>
                    </div>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="mt-10 space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('common.strokeMastery')}</span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">68%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-1000 ease-out" style={{width: '68%'}}></div>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 text-center italic pt-2">{t('common.foreverQuote')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              {t('home.featuresTitle')}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t('home.featuresSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white dark:bg-slate-800 p-10 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{t('home.aiInsightsTitle')}</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('home.aiInsightsDesc')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white dark:bg-slate-800 p-10 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{t('home.etymologyTitle')}</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('home.etymologyDesc')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white dark:bg-slate-800 p-10 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{t('home.adaptiveTitle')}</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('home.adaptiveDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
