// src/components/practice/practice-options.tsx v5.1.0
'use client';

import { useTranslation } from '@/components/locale-provider';
import { icons, practiceOptions } from '@/components/practice/practice-assets';

interface PracticeOptionsGridProps {
  selectedOption: string;
  onSelect: (id: string) => void;
}

export function PracticeOptionsGrid({ selectedOption, onSelect }: PracticeOptionsGridProps) {
  const { t } = useTranslation();

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 stagger-children">
      {practiceOptions.map((option) => {
        const isSelected = selectedOption === option.id;
        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`group bg-card/80 dark:bg-ink-900/80 backdrop-blur-sm p-10 rounded-3xl border-2 border-ink-100 dark:border-ink-800 hover:border-vermilion-300 dark:hover:border-vermilion-500 hover:-translate-y-2 hover:shadow-ink-lg transition-[colors,transform] duration-300 text-left ${
              isSelected ? 'border-vermilion-500 shadow-vermilion-glow' : ''
            }`}
          >
            <div className={`relative w-20 h-20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
              isSelected ? 'bg-vermilion-500 text-primary-foreground' : 'bg-gradient-to-br from-vermilion-500/10 to-indigo/10 dark:from-vermilion-500/20 dark:to-indigo/20 text-vermilion-500'
            }`}>
              {icons[option.icon]}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-ink-900 dark:text-ink-50 display-font">
              {t(option.titleKey)}
            </h3>
            <p className="text-base text-ink-600 dark:text-ink-300 leading-relaxed mb-6">
              {t(option.descKey)}
            </p>
            <div className={`flex items-center gap-2 font-semibold ${isSelected ? 'text-primary-foreground' : 'text-vermilion-500'} group`}>
              <span>{t('practice.startNow')}</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l-4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
        );
      })}
    </div>
  );
}
