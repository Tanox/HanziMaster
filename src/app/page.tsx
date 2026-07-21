'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/components/locale-provider';
import { FeatureCard } from '@/components/feature-card';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-vermilion-500/10 rounded-full blur-[120px] animate-float-gentle" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo/10 rounded-full blur-[100px]" style={{ animation: 'floatGentle 8s ease-in-out infinite reverse' }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 text-center">
          <div className="text-lg sm:text-xl font-medium text-vermilion-500 mb-6 tracking-[0.2em] uppercase animate-fade-in-elegant hero-eyebrow opacity-0">
            {t('home.aiBadge')}
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink-900 dark:text-ink-50 mb-6 leading-[1.02] animate-fade-in-elegant hero-title opacity-0">
            <span className="display-font">{t('home.heroTitle')}</span>，
            <span className="block mt-2 serif-font">
              {t('home.heroSubtitle')}
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-ink-600 dark:text-ink-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-elegant hero-subtitle opacity-0">
            {t('home.heroDescription')}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in-elegant hero-cta opacity-0">
            <Button asChild size="lg" className="rounded-full bg-vermilion-500 hover:bg-vermilion-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-[colors,transform,opacity] duration-300">
              <Link href="/learn">
                {t('common.startLearning')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-ink-200 text-ink-700 hover:bg-ink-50 dark:border-ink-700 dark:text-ink-200 dark:hover:bg-ink-900">
              <Link href="/practice">
                {t('common.exploreLibrary')}
              </Link>
            </Button>
          </div>

          <div className="bg-white/80 dark:bg-ink-900/80 backdrop-blur-xl rounded-4xl p-10 sm:p-12 border border-ink-100 dark:border-ink-800 max-w-4xl mx-auto animate-fade-in-elegant hero-visual opacity-0 shadow-ink-lg">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-vermilion-500/20 rounded-full blur-[30px] scale-110" />
                  <div className="relative text-[160px] sm:text-[200px] font-light serif-font text-ink-900 dark:text-ink-50 animate-brush-stroke">
                    永
                  </div>
                </div>
              </div>

              <div className="text-left">
                <h3 className="text-3xl font-semibold text-ink-900 dark:text-ink-50 mb-4 display-font">
                  {t('home.yongCharacterTitle')}
                </h3>
                <p className="text-ink-600 dark:text-ink-300 text-lg mb-8 leading-relaxed">
                  {t('home.yongCharacterDesc')}
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-base">
                    <span className="text-ink-500 dark:text-ink-400">{t('home.yongCharacterStrokes')}</span>
                    <span className="font-semibold text-vermilion-500">72%</span>
                  </div>
                  <div className="h-2 bg-ink-100 dark:bg-ink-800 rounded-full overflow-hidden">
                    <div className="h-full w-[72%] bg-gradient-to-r from-vermilion-500 to-vermilion-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-ink-900 dark:text-ink-50 mb-4 display-font">
              {t('home.featuresTitle')}
            </h2>
            <p className="text-xl text-ink-600 dark:text-ink-300">
              {t('home.featuresSubtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            <FeatureCard
              titleKey="home.aiInsightsTitle"
              descKey="home.aiInsightsDesc"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              }
            />
            <FeatureCard
              titleKey="home.etymologyTitle"
              descKey="home.etymologyDesc"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              }
            />
            <FeatureCard
              titleKey="home.adaptiveTitle"
              descKey="home.adaptiveDesc"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h2a2 2 0 01-2-2z"/>
                </svg>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
