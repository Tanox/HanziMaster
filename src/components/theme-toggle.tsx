// src/components/theme-toggle.tsx v2.3.1 - Apple Design Style
'use client';

import React from 'react';
import { useTheme } from './theme-provider';
import { useTranslation } from './locale-provider';

type Theme = 'light' | 'dark' | 'system';

const themeIcons: Record<Theme, React.ReactNode> = {
  light: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.653l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  ),
  dark: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  ),
  system: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
};

const themeCycle: Record<Theme, Theme> = {
  light: 'dark',
  dark: 'system',
  system: 'light',
};

const themeLabelKeys: Record<Theme, string> = {
  light: 'common.theme.light',
  dark: 'common.theme.dark',
  system: 'common.theme.system',
};

export function ThemeToggleClient() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const nextTheme = themeCycle[theme] || 'system';
  const currentThemeName = t(themeLabelKeys[theme]);
  const nextThemeName = t(themeLabelKeys[nextTheme]);

  const cycleTheme = () => {
    setTheme(nextTheme);
  };

  return (
    <button
      onClick={cycleTheme}
      type="button"
      aria-label={`${t('common.theme.toggle') || 'Toggle theme'}: ${currentThemeName} → ${nextThemeName}`}
      aria-pressed={theme === 'dark'}
      title={currentThemeName}
      className="touch-target p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all duration-200 ease-out relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
    >
      {themeIcons[theme] || themeIcons.system}

      <span
        role="tooltip"
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 text-xs font-medium px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden sm:block shadow-lg"
      >
        {currentThemeName}
      </span>
    </button>
  );
}
