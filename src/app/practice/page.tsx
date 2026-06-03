// src/app/practice/page.tsx v2.2.1
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
    border: (s: boolean) => s ? 'border-emerald-500' : 'border-emerald-200 dark:border-emerald-800',
    hover: 'hover:border-emerald-500',
    card: (s: boolean) => s ? 'bg-emerald-50 dark:bg-emerald-900/20 ring-2 ring-emerald-500/30' : 'bg-white dark:bg-slate-800',
  } as const,
  blue: {
    bg: (s: boolean) => s ? 'bg-blue-500' : 'bg-blue-50 dark:bg-blue-900/30',
    text: (s: boolean) => s ? 'text-white' : 'text-blue-600 dark:text-blue-400',
    border: (s: boolean) => s ? 'border-blue-500' : 'border-blue-200 dark:border-blue-800',
    hover: 'hover:border-blue-500',
    card: (s: boolean) => s ? 'bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500/30' : 'bg-white dark:bg-slate-800',
  } as const,
  purple: {
    bg: (s: boolean) => s ? 'bg-purple-500' : 'bg-purple-50 dark:bg-purple-900/30',
    text: (s: boolean) => s ? 'text-white' : 'text-purple-600 dark:text-purple-400',
    border: (s: boolean) => s ? 'border-purple-500' : 'border-purple-200 dark:border-purple-800',
    hover: 'hover:border-purple-500',
    card: (s: boolean) => s ? 'bg-purple-50 dark:bg-purple-900/20 ring-2 ring-purple-500/30' : 'bg-white dark:bg-slate-800',
  } as const,
};

function getIcon(iconName: string, className: string) {
  if (iconName === 'pencil') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    );
  }
  if (iconName === 'question') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

export default function PracticePage() {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 safe-bottom">
      {/* Header Section */}
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4 text-slate-900 dark:text-white">
          {t('common.practice')} {t('practice.center')}
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {t('practice.subtitle')}
        </p>
      </div>

      {/* Practice Options Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
        {practiceOptions.map((option) => {
          const isSelected = selectedOption === option.id;
          const c = colorPresets[option.color];
          return (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`group p-6 sm:p-10 rounded-2xl sm:rounded-3xl border-2 shadow-sm hover:shadow-xl transition-all duration-300 text-left sm:hover:-translate-y-2 active:scale-[0.98] ${c.card(isSelected)} ${c.border(isSelected)} ${c.hover}`}
            >
              <div className={`w-12 h-12 sm:w-16 sm:h-16 ${c.bg(isSelected)} rounded-2xl flex items-center justify-center mb-5 sm:mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {getIcon(option.icon, `w-8 h-8 ${c.text(isSelected)}`)}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white">
                {t(option.titleKey)}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6">
                {t(option.descKey)}
              </p>
              <div className={`flex items-center gap-2 font-semibold ${c.text(isSelected)} group`}>
                <span>{t('practice.startNow')}</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l-4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>

      {/* Weekly Progress Section */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-700 shadow-lg">
        <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-slate-900 dark:text-white">
          {t('practice.weeklyProgress')}
        </h3>

        {/* Week Days Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-3 lg:gap-4 mb-8 sm:mb-10">
          {weekDays.map((day, index) => (
            <div
              key={day}
              className={`flex flex-col items-center p-2 sm:p-4 rounded-xl sm:rounded-2xl ${
                index < 5
                  ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
              } ${index === 4 ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-800' : ''}`}
              style={{ minHeight: 72 }}
            >
              <p className="text-[10px] sm:text-xs mb-2 sm:mb-3 font-medium">{t(`practice.${day}`)}</p>
              <div className={`w-8 h-8 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center ${
                index < 5 ? 'bg-white/20' : 'bg-white dark:bg-slate-600'
              }`}>
                {index < 5 ? (
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-[10px] sm:text-sm font-medium">{index === 4 ? t('practice.today') : t('practice.pending')}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatsCard
            label="practice.charactersLearned"
            value="12"
            icon={
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          />
          <StatsCard
            label="practice.dayStreak"
            value="5"
            icon={
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            }
          />
          <StatsCard
            label="practice.accuracy"
            value="87%"
            icon={
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}
