// src/components/theme-toggle.tsx v3.0.0
'use client';

import { useTheme } from './theme-provider';
import { useTranslation } from './locale-provider';
import { cn } from '@/lib/utils';

const themeIcons = {
  light: (
    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  dark: (
    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  system: (
    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

const themeCycle: Record<string, 'dark' | 'light' | 'system'> = {
  light: 'dark',
  dark: 'system',
  system: 'light',
};

export function ThemeToggleClient() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const cycleTheme = () => {
    setTheme(themeCycle[theme] || 'system');
  };

  return (
    <button
      onClick={cycleTheme}
      className={cn('p-2 rounded-lg hover:bg-accent transition-colors relative group')}
      aria-label={t(`common.theme.${theme}`)}
      title={t(`common.theme.${theme}`)}
      style={{ minWidth: 44, minHeight: 44 }}
    >
      {themeIcons[theme] || themeIcons.system}

      {/* Tooltip on hover */}
      <span className={cn('absolute -bottom-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden sm:block')}>
        {t(`common.theme.${theme}`)}
      </span>
    </button>
  );
}
