// src/app/page.tsx v2.4.0 - shadcn/ui
'use client';

import * as React from "react"
import { useEffect, useState } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const HERO_CHARS = [
  { char: '永', pinyin: 'yǒng · Forever', strokes: 5, progress: 68, days: 12 },
  { char: '学', pinyin: 'xué · Learn', strokes: 8, progress: 82, days: 18 },
  { char: '爱', pinyin: 'ài · Love', strokes: 10, progress: 55, days: 7 },
  { char: '明', pinyin: 'míng · Bright', strokes: 8, progress: 91, days: 25 },
];

export default function HomePage() {
  const { t } = useTranslation();
  const [charIdx, setCharIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCharIdx((prev) => (prev + 1) % HERO_CHARS.length);
        setAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_CHARS[charIdx];

  const handleCharSelect = (idx: number) => {
    if (idx === charIdx) return;
    setAnimating(true);
    setTimeout(() => {
      setCharIdx(idx);
      setAnimating(false);
    }, 300);
  };

  return (
    <div className="relative">
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden py-20">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-8 order-2 lg:order-1">
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
                {t('home.learningExperience')}
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                <span className="text-slate-900 dark:text-white">{t('home.heroTitle1')}</span>
                <br />
                <span className="gradient-text">{t('home.heroTitle2')}</span>
              </h1>

              <p className="text-xl text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                {t('home.heroDesc')}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 rounded-full text-base font-medium">
                  {t('common.startLearning')}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
                <Button variant="outline" className="px-8 py-6 rounded-full text-base font-medium">
                  {t('common.exploreLibrary')}
                </Button>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 border-2 border-white dark:border-slate-900"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-900 dark:text-white">10,000+</span> {t('home.activeLearners')}
                </p>
              </div>
            </div>

            {/* Right Column - Character Card */}
            <div className="relative flex items-center justify-center order-1 lg:order-2">
              <div className="relative w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-950/30 dark:to-cyan-950/30 rounded-[3rem] -z-10 transform rotate-3" aria-hidden="true" />

                <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-12" aria-live="polite" aria-atomic="true">
                  <CardContent className="text-center space-y-8">
                    <div>
                      <span
                        className={cn(
                          "text-[10rem] sm:text-[12rem] font-bold hanzi-font text-slate-100 dark:text-slate-800 select-none block transition-all duration-300",
                          animating ? "opacity-30 scale-95" : "opacity-100 scale-100"
                        )}
                        aria-hidden="true"
                      >
                        {current.char}
                      </span>
                      <div className="mt-6">
                        <p className="text-3xl font-semibold hanzi-font text-slate-900 dark:text-white">{current.char}</p>
                        <p className="text-base text-slate-400 mt-1">{current.pinyin}</p>
                      </div>
                    </div>

                    {/* Char selector dots */}
                    <div className="flex justify-center items-center gap-2" role="tablist" aria-label={t('home.selectChar')}>
                      {HERO_CHARS.map((c, i) => (
                        <button
                          key={i}
                          onClick={() => handleCharSelect(i)}
                          aria-label={`${t('home.char')} ${c.char}`}
                          role="tab"
                          aria-selected={i === charIdx}
                          className={cn(
                            "h-2 rounded-full transition-all touch-target",
                            i === charIdx ? "w-6 bg-emerald-500" : "w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300"
                          )}
                        />
                      ))}
                    </div>

                    {/* Progress */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">{t('home.mastery')}</span>
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">
                          {current.progress}%
                        </span>
                      </div>
                      <Progress 
                        value={current.progress} 
                        className="h-1.5"
                        aria-label={t('home.mastery')}
                      />
                    </div>

                    {/* Mini stats */}
                    <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                      <div className="text-center">
                        <div className="text-xl font-bold text-slate-900 dark:text-white">{current.strokes}</div>
                        <div className="text-xs text-slate-400 mt-1">{t('home.strokes')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-slate-900 dark:text-white">{t('home.common')}</div>
                        <div className="text-xs text-slate-400 mt-1">{t('home.level')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-slate-900 dark:text-white">{current.days}</div>
                        <div className="text-xs text-slate-400 mt-1">{t('home.days')}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section className="py-32 px-6 bg-slate-50 dark:bg-slate-900/50" aria-labelledby="features-title">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-3">
              {t('home.coreFeature')}
            </p>
            <h2 id="features-title" className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              {t('home.whyChooseUs')}
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              {t('home.whyChooseUsDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8" role="list">
            {[
              {
                titleKey: 'home.aiInsightsTitle',
                descKey: 'home.aiInsightsDesc',
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                color: 'emerald',
              },
              {
                titleKey: 'home.etymologyTitle',
                descKey: 'home.etymologyDesc',
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                color: 'cyan',
              },
              {
                titleKey: 'home.adaptiveTitle',
                descKey: 'home.adaptiveDesc',
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                color: 'purple',
              },
            ].map((feature, i) => (
              <Card 
                key={i} 
                className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl hover:shadow-lg transition-all duration-300 rounded-3xl"
                role="listitem"
              >
                <CardContent className="p-10">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-5",
                    feature.color === 'emerald' && "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
                    feature.color === 'cyan' && "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
                    feature.color === 'purple' && "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
                  )}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{t(feature.titleKey)}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t(feature.descKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Learning Flow Section ─── */}
      <section className="py-28 px-6" aria-labelledby="flow-title">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-3">
              {t('home.fromKnowToMaster')}
            </p>
            <h2 id="flow-title" className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              {t('home.flowMainTitle')}
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              {t('home.fourStepsDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6" role="list">
            {[
              { num: '01', color: 'emerald', titleKey: 'home.step1Title', descKey: 'home.step1Desc', done: false },
              { num: '02', color: 'cyan', titleKey: 'home.step2Title', descKey: 'home.step2Desc', done: false },
              { num: '03', color: 'blue', titleKey: 'home.step3Title', descKey: 'home.step3Desc', done: false },
              { num: '04', color: 'purple', titleKey: 'home.step4Title', descKey: 'home.step4Desc', done: true },
            ].map((step, i) => (
              <Card 
                key={i}
                className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl"
                role="listitem"
              >
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-5">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm",
                      step.color === 'emerald' && "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
                      step.color === 'cyan' && "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
                      step.color === 'blue' && "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
                      step.color === 'purple' && "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
                    )}>
                      {step.num}
                    </div>
                    {step.done ? (
                      <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-slate-300 dark:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{t(step.titleKey)}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t(step.descKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Writing Canvas Preview Section ─── */}
      <section className="py-28 px-6 bg-slate-50 dark:bg-slate-900/50" aria-labelledby="canvas-title">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div>
              <p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-3">
                {t('home.writingCanvas')}
              </p>
              <h2 id="canvas-title" className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                {t('home.canvasTitle')}
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-md">
                {t('home.canvasDesc')}
              </p>

              <ul className="space-y-4 mb-8" role="list">
                {[
                  { title: t('home.canvasF1Title'), desc: t('home.canvasF1Desc') },
                  { title: t('home.canvasF2Title'), desc: t('home.canvasF2Desc') },
                  { title: t('home.canvasF3Title'), desc: t('home.canvasF3Desc') },
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3" role="listitem">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 dark:bg-emerald-400 flex-shrink-0 mt-1 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">{f.title}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{f.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full text-sm font-medium">
                {t('home.tryNow')}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </div>

            {/* Right - Canvas mockup */}
            <div className="relative">
              <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-2xl hanzi-font text-emerald-600 dark:text-emerald-400" aria-hidden="true">
                        永
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white text-sm">
                          {t('home.practiceProgress')}
                        </div>
                        <div className="text-xs text-slate-400">{t('home.strokeOf', { cur: 3, total: 5 })}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        92<span className="text-sm text-slate-400">{t('home.score')}</span>
                      </div>
                      <div className="text-xs text-emerald-500">{t('home.structureExcellent')}</div>
                    </div>
                  </div>

                  {/* Mock writing grid */}
                  <div className="relative aspect-square rounded-3xl bg-slate-50 dark:bg-slate-950 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                      <div className="w-[85%] h-[85%] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl relative">
                        <div className="absolute inset-0 overflow-hidden rounded-2xl">
                          <div className="absolute top-1/2 left-0 right-0 border-t border-slate-200 dark:border-slate-800" />
                          <div className="absolute left-1/2 top-0 bottom-0 border-l border-slate-200 dark:border-slate-800" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[12rem] font-bold hanzi-font text-slate-200 dark:text-slate-800/50 select-none">
                            永
                          </span>
                        </div>
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" aria-hidden="true">
                          <path d="M 100 40 L 100 160" stroke="#10b981" strokeWidth={6} strokeLinecap="round" fill="none" opacity={0.9} />
                          <path d="M 60 70 L 140 70" stroke="#10b981" strokeWidth={5} strokeLinecap="round" fill="none" opacity={0.7} />
                          <path d="M 50 110 L 150 110" stroke="#10b981" strokeWidth={5} strokeLinecap="round" fill="none" opacity={0.5} />
                          <path d="M 65 135 Q 100 155 135 135" stroke="#94a3b8" strokeWidth={3} strokeDasharray="6 6" fill="none" opacity={0.4} />
                        </svg>
                        <div className="absolute" style={{ top: '55%', left: '32%' }} aria-hidden="true">
                          <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Toolbar */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={t('home.undo')}
                        className="w-9 h-9 rounded-xl"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={t('home.clear')}
                        className="w-9 h-9 rounded-xl"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22" />
                        </svg>
                      </Button>
                    </div>
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-medium">
                      {t('home.done')}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Section ─── */}
      <section className="py-24 bg-black dark:bg-white" aria-labelledby="stats-title">
        <h2 id="stats-title" className="sr-only">{t('home.platformStats')}</h2>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-12 text-center" role="list">
            <div role="listitem">
              <div className="text-5xl sm:text-6xl font-bold text-white dark:text-slate-900 mb-2" aria-label={t('home.over10k')}>10,000+</div>
              <div className="text-lg text-gray-400 dark:text-gray-500">{t('home.activeLearners')}</div>
            </div>
            <div role="listitem">
              <div className="text-5xl sm:text-6xl font-bold text-white dark:text-slate-900 mb-2" aria-label={t('home.over500')}>500+</div>
              <div className="text-lg text-gray-400 dark:text-gray-500">{t('home.commonChars')}</div>
            </div>
            <div role="listitem">
              <div className="text-5xl sm:text-6xl font-bold text-white dark:text-slate-900 mb-2" aria-label={t('home.98percent')}>98%</div>
              <div className="text-lg text-gray-400 dark:text-gray-500">{t('home.userSatisfaction')}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
