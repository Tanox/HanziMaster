// src/app/practice/page.tsx v2.3.1 - Apple Design Style
'use client';

import { useState } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { StatsCard } from '@/components/stats-card';

interface PracticeOption {
  id: string;
  titleKey: string;
  descKey: string;
  icon: 'pencil' | 'question' | 'chart';
  color: 'emerald' | 'blue' | 'purple';
}

const practiceOptions: PracticeOption[] = [
  { id: 'writing', titleKey: 'practice.writingTitle', descKey: 'practice.writingDesc', icon: 'pencil', color: 'emerald' },
  { id: 'quiz', titleKey: 'practice.quizTitle', descKey: 'practice.quizDesc', icon: 'question', color: 'blue' },
  { id: 'progress', titleKey: 'practice.progressTitle', descKey: 'practice.progressDesc', icon: 'chart', color: 'purple' },
];

const colorPresets = {
  emerald: {
    bg: (s: boolean) => s ? 'bg-emerald-500' : 'bg-emerald-50 dark:bg-emerald-900/30',
    text: (s: boolean) => s ? 'text-white' : 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-500',
    ring: 'ring-emerald-500',
    border: 'border-emerald-500',
  } as const,
  blue: {
    bg: (s: boolean) => s ? 'bg-blue-500' : 'bg-blue-50 dark:bg-blue-900/30',
    text: (s: boolean) => s ? 'text-white' : 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-500',
    ring: 'ring-blue-500',
    border: 'border-blue-500',
  } as const,
  purple: {
    bg: (s: boolean) => s ? 'bg-purple-500' : 'bg-purple-50 dark:bg-purple-900/30',
    text: (s: boolean) => s ? 'text-white' : 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-500',
    ring: 'ring-purple-500',
    border: 'border-purple-500',
  } as const,
};

function getIcon(iconName: string, className: string) {
  if (iconName === 'pencil') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    );
  }
  if (iconName === 'question') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

export default function PracticePage() {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<string | null>('writing');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 safe-area-bottom" role="main" aria-label={t('practice.pageTitle')}>
      {/* ─── Page Header - Apple Style ─── */}
      <header className="text-center mb-12 md:mb-16" aria-label={t('practice.pageHeader')}>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          <span className="gradient-text">{t('practice.pageTitle')}</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400">
          {t('practice.pageSubtitle')}
        </p>
      </header>

      {/* ─── Practice Options - Apple Style Cards ─── */}
      <section
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16"
        aria-label={t('practice.optionsLabel')}
        role="radiogroup"
      >
        {practiceOptions.map((option, index) => {
          const isSelected = selectedOption === option.id;
          const c = colorPresets[option.color];
          return (
            <button
              key={option.id}
              role="radio"
              aria-checked={isSelected}
              aria-current={isSelected ? 'true' : 'false'}
              aria-label={t(option.titleKey)}
              onClick={() => setSelectedOption(option.id)}
              className={`feature-card text-left cursor-pointer touch-target apple-shadow-xl hover:apple-shadow-2xl ${
                isSelected ? `ring-2 ${c.ring} border-2 ${c.border}` : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 ${c.iconBg} rounded-2xl flex items-center justify-center mb-6 glow-emerald`}>
                {getIcon(option.icon, 'w-7 h-7 text-white')}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {t(option.titleKey)}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                {t(option.descKey)}
              </p>
              {isSelected ? (
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium text-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('practice.selected')}</span>
                </div>
              ) : (
                <span className="apple-link font-medium text-sm">
                  {t('practice.startNow')} →
                </span>
              )}
            </button>
          );
        })}
      </section>

      {/* ─── Weekly Progress - Apple Style ─── */}
      <section
        className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-10 apple-shadow-xl mb-12 md:mb-16"
        aria-label={t('practice.weeklyProgressLabel')}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {t('practice.weeklyProgress')}
          </h2>
          <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-full apple-shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>{t('practice.progressTrend')}</span>
          </div>
        </div>

        {/* Week Days Grid */}
        <div className="grid grid-cols-7 gap-3 md:gap-4 mb-8 md:mb-10" role="list" aria-label={t('practice.weekGrid')}>
          {weekDays.map((day, index) => {
            const isCompleted = index < 5;
            const isToday = index === 4;
            return (
              <div key={day} className="text-center" role="listitem" aria-label={t(`practice.${day}`)}>
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 mx-auto ${
                    isCompleted
                      ? 'bg-emerald-500'
                      : 'bg-gray-200 dark:bg-gray-700'
                  } rounded-xl flex items-center justify-center font-bold mb-2 md:mb-3 touch-target transition-all duration-300 ${
                    isToday ? `ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-gray-900 glow-emerald` : ''
                  } ${isCompleted ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`}
                  aria-current={isToday ? 'true' : 'false'}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-lg md:text-xl">{t('practice.pending')}</span>
                  )}
                </div>
                <span
                  className={`text-xs md:text-sm font-medium ${
                    isToday
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {t(`practice.${day}`)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mb-8 md:mb-10" aria-label={t('practice.progressBarLabel')}>
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <span className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
              {t('practice.weekProgressLabel')}
            </span>
            <span className="text-sm md:text-base font-bold text-emerald-600 dark:text-emerald-400">
              71%
            </span>
          </div>
          <div className="h-3 md:h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden apple-shadow-sm">
            <div
              className="h-full progress-fill progress-animated rounded-full"
              style={{ width: '71%' }}
              role="progressbar"
              aria-valuenow={71}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={t('practice.weekProgressLabel')}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6" role="list" aria-label={t('practice.statsLabel')}>
          <div role="listitem">
            <StatsCard
              label="practice.charactersLearned"
              value="12"
              icon={
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
            />
          </div>
          <div role="listitem">
            <StatsCard
              label="practice.dayStreak"
              value="5"
              icon={
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              }
            />
          </div>
          <div role="listitem">
            <StatsCard
              label="practice.accuracy"
              value="87%"
              icon={
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* ─── Action Buttons - Apple Style ─── */}
      <section
        className="flex flex-col sm:flex-row items-center justify-center gap-4 safe-area-bottom"
        aria-label={t('practice.actionsLabel')}
      >
        <button
          className="btn-apple-primary w-full sm:w-auto touch-target glow-emerald"
          aria-label={t('practice.startPractice')}
        >
          {t('practice.startPractice')}
        </button>
        <button
          className="btn-apple-secondary w-full sm:w-auto touch-target"
          aria-label={t('practice.viewHistory')}
        >
          {t('practice.viewHistory')}
        </button>
      </section>
    </div>
  );
}
