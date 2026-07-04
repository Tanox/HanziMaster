// src/app/page.tsx v3.0.0
'use client';

import Link from 'next/link';
import { useTranslation } from '@/components/locale-provider';
import { FeatureCard } from '@/components/feature-card';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="relative">
      {/* Hero Section - Apple Style */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10 text-center">
          {/* Eyebrow */}
          <div className="text-lg sm:text-xl font-medium text-primary mb-4 tracking-wide">
            {t('home.aiBadge')}
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.05]">
            {t('home.heroTitle')}{t('home.heroSuffix')}
            <span className="block mt-2">
              <span className="hanzi-font">{t('home.heroSubtitle')}</span>
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            {t('home.heroDescription')}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/learn">
                {t('common.startLearning')}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full text-primary">
              <Link href="/practice">
                {t('common.exploreLibrary')}
              </Link>
            </Button>
          </div>
          
          {/* Visual Card */}
          <div className="bg-gradient-to-b from-muted to-background rounded-[32px] p-10 sm:p-12 border border-border max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Large Character */}
              <div className="text-center">
                <div className="text-[160px] sm:text-[200px] font-light hanzi-font bg-gradient-to-b from-foreground/60 to-foreground bg-clip-text text-transparent">
                  永
                </div>
              </div>
              
              {/* Info Side */}
              <div className="text-left">
                <h2 className="text-3xl font-semibold text-foreground mb-4">
                  {t('home.yongCharacterTitle')}
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  {t('home.yongCharacterDesc')}
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-base">
                    <span className="text-muted-foreground">{t('home.yongCharacterStrokes')}</span>
                    <span className="font-semibold">72%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[72%] bg-gradient-to-r from-primary to-primary-dark rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Apple Style */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              {t('home.featuresTitle')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('home.featuresSubtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              titleKey="home.aiInsightsTitle"
              descKey="home.aiInsightsDesc"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              }
            />
            <FeatureCard
              titleKey="home.etymologyTitle"
              descKey="home.etymologyDesc"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              }
            />
            <FeatureCard
              titleKey="home.adaptiveTitle"
              descKey="home.adaptiveDesc"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h2a2 2 0 01-2-2z"/>
                </svg>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
