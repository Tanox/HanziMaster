// src/components/pages/home-page.tsx v5.2.52
'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useLocale, useTranslation } from '@/components/locale-provider';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { FeatureCard } from '@/components/feature-card';
import { Button } from '@/components/ui/button';
import { HomeGeo } from '@/components/pages/home-geo';
import { localizedHref } from '@/lib/urls';

// 首屏唯一记忆点：真实可播放的笔顺演示；加载前用田字格字帖占位，避免空白。
const StrokeOrderDemo = dynamic(
  () => import('@/components/learn/stroke-order-demo').then((m) => m.StrokeOrderDemo),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-square w-full max-w-[280px] items-center justify-center border border-vermilion-200/80 text-[120px] font-light serif-font text-ink-900/80 dark:border-vermilion-800/70 dark:text-ink-50/80">
        大
      </div>
    ),
  }
);

export default function HomePage() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  useScrollReveal();

  return (
    <div id="home-page" className="relative">
      <section id="hero-section" className="min-h-[70vh] border-b border-ink-200 dark:border-ink-800">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:py-16">
          <div className="text-start">
            <p className="mb-3 text-sm font-medium text-vermilion-600 dark:text-vermilion-400">
              {t('home.aiBadge')}
            </p>
            <h1 className="serif-font text-4xl leading-tight text-ink-900 dark:text-ink-50 sm:text-5xl lg:text-6xl">
              {t('home.heroTitle')}
              <span className="mt-2 block text-vermilion-600 dark:text-vermilion-400">
                {t('home.heroSubtitle')}{t('home.heroSuffix')}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-600 dark:text-ink-300 sm:text-lg">
              {t('home.heroDescription')}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-xl bg-vermilion-500 text-primary-foreground hover:bg-vermilion-600">
                <Link href={localizedHref(locale, '/learn')}>{t('common.startLearning')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl border-ink-200 dark:border-ink-700">
                <Link href={localizedHref(locale, '/practice')}>{t('common.practice')}</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-ink-500 dark:text-ink-400">{t('home.heroTrust')}</p>
          </div>

          <div className="w-full rounded-2xl border border-ink-200 bg-card/60 p-4 dark:border-ink-800 dark:bg-ink-900/40">
            <p className="mb-3 text-sm font-semibold text-ink-700 dark:text-ink-200">{t('learn.strokeOrder')}</p>
            <StrokeOrderDemo character="大" strokeCount={3} />
          </div>
        </div>
      </section>

      <section id="features-section" className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-10 text-center">
            <h2 className="serif-font text-3xl font-semibold text-ink-900 dark:text-ink-50 sm:text-4xl">
              {t('home.featuresTitle')}
            </h2>
            <p className="mt-3 text-ink-600 dark:text-ink-300">{t('home.featuresSubtitle')}</p>
          </div>
          <div className="stagger-children grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard titleKey="home.aiInsightsTitle" descKey="home.aiInsightsDesc" icon={<StrokeIcon />} />
            <FeatureCard titleKey="home.featureLibraryTitle" descKey="home.featureLibraryDesc" icon={<GridIcon />} />
            <FeatureCard titleKey="home.featureLocalTitle" descKey="home.featureLocalDesc" icon={<LockIcon />} />
          </div>
        </div>
      </section>

      <HomeGeo />
    </div>
  );
}

function StrokeIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" d="M4 7h16M12 3v18M5 20c4-2 7-6 8-13" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path strokeLinecap="round" d="M8 10V7a4 4 0 018 0v3" />
    </svg>
  );
}
