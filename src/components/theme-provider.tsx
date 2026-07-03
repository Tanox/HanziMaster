// src/components/theme-provider.tsx v3.0.0
'use client';

import { createContext, useContext, useCallback, useEffect, useMemo, useState } from 'react';
import { safeGetItem, safeSetItem } from '@/lib/storage';

type Theme = 'dark' | 'light' | 'system';

const VALID_THEMES: Theme[] = ['dark', 'light', 'system'];

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'hanzi-master-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const stored = safeGetItem<Theme>(storageKey, defaultTheme);
    if (stored && VALID_THEMES.includes(stored)) {
      setTheme(stored);
    }
  }, [storageKey, defaultTheme]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const root = document.documentElement;
      const isDark = mql.matches;
      root.classList.remove('light', 'dark');
      root.classList.add(isDark ? 'dark' : 'light');
    };

    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, [theme]);

  const handleSetTheme = useCallback((newTheme: Theme) => {
    if (!VALID_THEMES.includes(newTheme)) return;
    safeSetItem(storageKey, newTheme);
    setTheme(newTheme);
  }, [storageKey]);

  const value = useMemo(() => ({
    theme,
    setTheme: handleSetTheme,
  }), [theme, handleSetTheme]);

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
