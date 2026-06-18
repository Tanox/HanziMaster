'use client';

import Link from 'next/link';
import { useTranslation } from '@/components/locale-provider';
import { FeatureCard } from '@/components/feature-card';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="relative">
      {/* Hero Section - Apple Style */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 text-center">
          {/* Eyebrow */}
          <div className="text-lg sm:text-xl font-medium text-[#007aff] mb-4 tracking-wide">
            {t('home.aiBadge')}
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.05]">
            {t('home.heroTitle')}，
            <span className="block mt-2">
              <span className="hanzi-font">{t('home.heroSubtitle')}</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t('home.heroDescription')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              href="/learn"
              className="group bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-pill text-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {t('common.startLearning')}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link
              href="/practice"
              className="group text-[#007aff] text-lg font-medium hover:opacity-70 transition-opacity flex items-center justify-center gap-2"
            >
              {t('common.exploreLibrary')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Visual Card - Hero Showcase */}
          <div className="bg-gradient-to-b from-[#f5f5f7] to-white dark:from-[#1d1d1f] dark:to-black rounded-[32px] p-10 sm:p-12 border border-gray-200/50 dark:border-gray-800/50 max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Large Character */}
              <div className="text-center">
                <div className="text-[160px] sm:text-[200px] font-light hanzi-font bg-gradient-to-b from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-500 bg-clip-text text-transparent">
                  永
                </div>
              </div>

              {/* Info Side */}
              <div className="text-left">
                <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t('home.yongCharacterTitle')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                  {t('home.yongCharacterDesc')}
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-base">
                    <span className="text-gray-600 dark:text-gray-400">{t('home.yongCharacterStrokes')}</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">72%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full w-[72%] bg-gradient-to-r from-[#007aff] to-[#af52de] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - 6 Cards */}
      <section className="py-24 px-6 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              {t('home.featuresTitle')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('home.featuresSubtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              titleKey="home.aiInsightsTitle"
              descKey="home.aiInsightsDesc"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              }
            />
            <FeatureCard
              titleKey="home.etymologyTitle"
              descKey="home.etymologyDesc"
              iconGradient="from-[#af52de]/10 to-[#ff2d55]/10 dark:from-[#af52de]/20 dark:to-[#ff2d55]/20"
              iconColor="text-[#af52de]"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              }
            />
            <FeatureCard
              titleKey="home.adaptiveTitle"
              descKey="home.adaptiveDesc"
              iconGradient="from-[#34c759]/10 to-[#30b0c7]/10 dark:from-[#34c759]/20 dark:to-[#30b0c7]/20"
              iconColor="text-[#34c759]"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              }
            />
            <FeatureCard
              titleKey="home.writingCanvasTitle"
              descKey="home.writingCanvasDesc"
              iconGradient="from-[#ff9500]/10 to-[#ff2d55]/10 dark:from-[#ff9500]/20 dark:to-[#ff2d55]/20"
              iconColor="text-[#ff9500]"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              }
            />
            <FeatureCard
              titleKey="home.memoryCurveTitle"
              descKey="home.memoryCurveDesc"
              iconGradient="from-[#007aff]/10 to-[#af52de]/10 dark:from-[#007aff]/20 dark:to-[#af52de]/20"
              iconColor="text-[#5856d6]"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              }
            />
            <FeatureCard
              titleKey="home.progressReportTitle"
              descKey="home.progressReportDesc"
              iconGradient="from-[#30b0c7]/10 to-[#007aff]/10 dark:from-[#30b0c7]/20 dark:to-[#007aff]/20"
              iconColor="text-[#30b0c7]"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18M7 14l4-4 4 4 5-5"/>
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Stats Strip Section */}
      <section className="py-20 px-6 bg-[#f5f5f7] dark:bg-[#1d1d1f] border-y border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
            <div>
              <div className="text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-b from-gray-800 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-3">
                10,000+
              </div>
              <div className="text-base text-gray-600 dark:text-gray-400">{t('home.activeLearners')}</div>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-b from-gray-800 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-3">
                500+
              </div>
              <div className="text-base text-gray-600 dark:text-gray-400">{t('home.commonCharacters')}</div>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-b from-[#007aff] to-[#af52de] bg-clip-text text-transparent mb-3">
                98%
              </div>
              <div className="text-base text-gray-600 dark:text-gray-400">{t('home.userSatisfaction')}</div>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-b from-[#34c759] to-[#30b0c7] bg-clip-text text-transparent mb-3">
                4.9
              </div>
              <div className="text-base text-gray-600 dark:text-gray-400">{t('home.appStoreRating')}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
