// src/app/page.tsx v2.3.0 - Apple Design Style
'use client';

import Link from 'next/link';
import { useTranslation } from '@/components/locale-provider';
import { FeatureCard } from '@/components/feature-card';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="relative">
      {/* ─── Hero Section - Apple Style ─── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Apple Style Text */}
            <div className="space-y-8">
              {/* Main Heading - Apple Style */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                <span className="text-gray-900 dark:text-white">汉字学习</span><br/>
                <span className="gradient-text">全新境界</span>
              </h1>
              
              {/* Description - Simple */}
              <p className="text-xl text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
                AI 驱动的智能书写练习，获得实时笔画反馈。
              </p>
              
              {/* Apple Style Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link 
                  href="/learn" 
                  className="btn-apple-primary text-white px-8 py-4 rounded-full text-base font-medium flex items-center justify-center gap-2"
                >
                  {t('common.startLearning')}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/practice" 
                  className="btn-apple-secondary text-gray-900 dark:text-white px-8 py-4 rounded-full text-base font-medium flex items-center justify-center gap-2"
                >
                  {t('common.exploreLibrary')}
                </Link>
              </div>
            </div>

            {/* Right Column - Large Character Display */}
            <div className="relative flex items-center justify-center">
              <div className="relative">
                {/* Background Decoration - Minimal */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-950/30 dark:to-cyan-950/30 rounded-[3rem] -z-10 transform rotate-3"></div>
                
                {/* Main Card - Apple Style */}
                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-12 apple-shadow-xl">
                  <div className="text-center">
                    <span className="text-[10rem] sm:text-[12rem] font-bold hanzi-font text-gray-100 dark:text-gray-800 hero-char select-none">永</span>
                    <div className="mt-6">
                      <p className="text-3xl font-semibold hanzi-font text-gray-900 dark:text-white">永</p>
                      <p className="text-base text-gray-400 mt-1">yǒng · Forever</p>
                    </div>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="mt-10 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">掌握度</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">68%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="progress-fill h-full" style={{width: '68%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Section - Apple Style ─── */}
      <section className="py-32 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              为什么选择我们
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              极简设计，专注核心学习体验
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              titleKey="home.aiInsightsTitle"
              descKey="home.aiInsightsDesc"
              gradient="bg-white dark:bg-gray-900 rounded-3xl p-10 apple-shadow-sm"
              textColor="text-emerald-600 dark:text-emerald-400"
              iconBg="bg-emerald-100 dark:bg-emerald-900/30"
              icon={
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
            />
            <FeatureCard
              titleKey="home.etymologyTitle"
              descKey="home.etymologyDesc"
              gradient="bg-white dark:bg-gray-900 rounded-3xl p-10 apple-shadow-sm"
              textColor="text-blue-600 dark:text-blue-400"
              iconBg="bg-blue-100 dark:bg-blue-900/30"
              icon={
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
            />
            <FeatureCard
              titleKey="home.adaptiveTitle"
              descKey="home.adaptiveDesc"
              gradient="bg-white dark:bg-gray-900 rounded-3xl p-10 apple-shadow-sm"
              textColor="text-purple-600 dark:text-purple-400"
              iconBg="bg-purple-100 dark:bg-purple-900/30"
              icon={
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* ─── Stats Section - Apple Style ─── */}
      <section className="py-24 bg-black dark:bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl sm:text-6xl font-bold text-white dark:text-gray-900 mb-2">10,000+</div>
              <div className="text-lg text-gray-400 dark:text-gray-500">活跃学习者</div>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl font-bold text-white dark:text-gray-900 mb-2">500+</div>
              <div className="text-lg text-gray-400 dark:text-gray-500">常用汉字</div>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl font-bold text-white dark:text-gray-900 mb-2">98%</div>
              <div className="text-lg text-gray-400 dark:text-gray-500">用户满意度</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
