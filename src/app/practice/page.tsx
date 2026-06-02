// src/app/practice/page.tsx v2.2.0
'use client';

import { useState } from 'react';
import { useTranslation } from '@/components/locale-provider';

interface PracticeOption {
  id: string;
  titleKey: string;
  descKey: string;
  icon: 'pencil' | 'question' | 'chart';
  color: 'emerald' | 'blue' | 'purple';
}

export default function PracticePage() {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const practiceOptions: PracticeOption[] = [
    {
      id: 'writing',
      titleKey: 'practice.writingTitle',
      descKey: 'practice.writingDesc',
      icon: 'pencil',
      color: 'emerald',
    },
    {
      id: 'quiz',
      titleKey: 'practice.quizTitle',
      descKey: 'practice.quizDesc',
      icon: 'question',
      color: 'blue',
    },
    {
      id: 'progress',
      titleKey: 'practice.progressTitle',
      descKey: 'practice.progressDesc',
      icon: 'chart',
      color: 'purple',
    },
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      emerald: {
        bg: isSelected ? 'bg-emerald-500' : 'bg-emerald-50 dark:bg-emerald-900/30',
        text: isSelected ? 'text-white' : 'text-emerald-600 dark:text-emerald-400',
        border: isSelected ? 'border-emerald-500' : 'border-emerald-200 dark:border-emerald-800',
        hover: 'hover:border-emerald-500',
      },
      blue: {
        bg: isSelected ? 'bg-blue-500' : 'bg-blue-50 dark:bg-blue-900/30',
        text: isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400',
        border: isSelected ? 'border-blue-500' : 'border-blue-200 dark:border-blue-800',
        hover: 'hover:border-blue-500',
      },
      purple: {
        bg: isSelected ? 'bg-purple-500' : 'bg-purple-50 dark:bg-purple-900/30',
        text: isSelected ? 'text-white' : 'text-purple-600 dark:text-purple-400',
        border: isSelected ? 'border-purple-500' : 'border-purple-200 dark:border-purple-800',
        hover: 'hover:border-purple-500',
      },
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  const getIcon = (iconName: string, colorClasses: any) => {
    if (iconName === 'pencil') {
      return (
        <svg className={`w-8 h-8 ${colorClasses.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      );
    } else if (iconName === 'question') {
      return (
        <svg className={`w-8 h-8 ${colorClasses.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    } else {
      return (
        <svg className={`w-8 h-8 ${colorClasses.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
          {t('common.practice')} {t('practice.center')}
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {t('practice.subtitle')}
        </p>
      </div>

      {/* Practice Options Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {practiceOptions.map((option) => {
          const colorClasses = getColorClasses(option.color, selectedOption === option.id);
          return (
            <button
              key={option.id}
              onClick={() => setSelectedOption(selectedOption === option.id ? null : option.id)}
              className={`group bg-white dark:bg-slate-800 p-10 rounded-3xl border-2 shadow-sm hover:shadow-xl transition-all duration-300 text-left hover:-translate-y-2 ${colorClasses.border} ${colorClasses.hover}`}
            >
              <div className={`w-16 h-16 ${colorClasses.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {getIcon(option.icon, colorClasses)}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                {t(option.titleKey)}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {t(option.descKey)}
              </p>
              <div className={`flex items-center gap-2 font-semibold ${colorClasses.text} group`}>
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
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 border border-slate-100 dark:border-slate-700 shadow-lg">
        <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
          {t('practice.weeklyProgress')}
        </h3>

        {/* Week Days Grid */}
        <div className="grid grid-cols-7 gap-4 mb-10">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div
              key={day}
              className={`flex flex-col items-center p-4 rounded-2xl ${
                index < 5
                  ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
              } ${index === 4 ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-800' : ''}`}
            >
              <p className="text-xs mb-3 font-medium">{t(`practice.${day.toLowerCase()}`)}</p>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                index < 5 ? 'bg-white/20' : 'bg-white dark:bg-slate-600'
              }`}>
                {index < 5 ? (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{index === 4 ? t('practice.today') : t('practice.pending')}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: 'practice.charactersLearned', value: '12', icon: 'book' },
            { label: 'practice.dayStreak', value: '5', icon: 'fire' },
            { label: 'practice.accuracy', value: '87%', icon: 'check' },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl mb-4">
                {stat.icon === 'book' && (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.7: 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )}
                {stat.icon === 'fire' && (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                )}
                {stat.icon === 'check' && (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">{stat.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{t(stat.label)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
