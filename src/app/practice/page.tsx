// src/app/practice/page.tsx v2.3.0 - Apple Design Style
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
  } as const,
  blue: {
    bg: (s: boolean) => s ? 'bg-blue-500' : 'bg-blue-50 dark:bg-blue-900/30',
    text: (s: boolean) => s ? 'text-white' : 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-500',
  } as const,
  purple: {
    bg: (s: boolean) => s ? 'bg-purple-500' : 'bg-purple-50 dark:bg-purple-900/30',
    text: (s: boolean) => s ? 'text-white' : 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-500',
  } as const,
};

function getIcon(iconName: string, className: string) {
  if (iconName === 'pencil') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    );
  }
  if (iconName === 'question') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

export default function PracticePage() {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 pb-24 md:pb-16">
      {/* ─── Page Header - Apple Style ─── */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">练习中心</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">全方位提升汉字掌握程度</p>
      </div>

      {/* ─── Practice Options - Apple Style Cards ─── */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {practiceOptions.map((option) => {
          const isSelected = selectedOption === option.id;
          const c = colorPresets[option.color];
          return (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`feature-card text-left cursor-pointer ${isSelected ? 'ring-2 ring-' + option.color + '-500' : ''}`}
            >
              <div className={`w-14 h-14 ${c.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                {getIcon(option.icon, `w-7 h-7 text-white`)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {t(option.titleKey)}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {t(option.descKey)}
              </p>
              <span className={`apple-link font-medium text-sm ${c.text(isSelected)}`}>
                {t('practice.startNow')} →
              </span>
            </button>
          );
        })}
      </div>

      {/* ─── Weekly Progress - Apple Style ─── */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-10">本周学习进度</h2>
        
        {/* Week Days Grid */}
        <div className="grid grid-cols-7 gap-4 mb-10">
          {weekDays.map((day, index) => (
            <div key={day} className="text-center">
              <div className={`w-12 h-12 mx-auto ${index < 5 ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'} rounded-xl flex items-center justify-center text-white font-bold mb-2 ${
                index === 4 ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-gray-900' : ''
              } ${index >= 5 ? 'text-gray-400 dark:text-gray-500' : ''}`}>
                {index < 5 ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-xs">{index === 4 ? t('practice.today') : ''}</span>
                )}
              </div>
              <span className={`text-xs ${index === 4 ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                {t(`practice.${day}`)}
              </span>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6">
          <StatsCard
            label="practice.charactersLearned"
            value="12"
            icon={
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          />
          <StatsCard
            label="practice.dayStreak"
            value="5"
            icon={
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            }
          />
          <StatsCard
            label="practice.accuracy"
            value="87%"
            icon={
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}
