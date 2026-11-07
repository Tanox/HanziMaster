// src/components/theme-provider.tsx v5.2.35
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { safeGetItem, safeSetItem } from '@/lib/storage';

export type Theme = 'dark' | 'light' | 'system';
export type ResolvedTheme = 'dark' | 'light';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

// undefined 表示「缺少 Provider」，让 useTheme 能可靠抛错而非静默降级
const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

const resolveTheme = (theme: Theme): ResolvedTheme => {
  if (theme !== 'system') return theme;
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'hanzi-master-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(defaultTheme));

  useEffect(() => {
    const stored = safeGetItem<Theme>(storageKey, defaultTheme);
    if (stored) {
      setThemeState(stored);
      setResolvedTheme(resolveTheme(stored));
    }
  }, [storageKey, defaultTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const resolved = resolveTheme(theme);
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
    setResolvedTheme(resolved);

    if (theme !== 'system' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => {
      root.classList.remove('light', 'dark');
      root.classList.add(event.matches ? 'dark' : 'light');
      setResolvedTheme(event.matches ? 'dark' : 'light');
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [theme]);

  const value: ThemeProviderState = {
    theme,
    resolvedTheme,
    setTheme: (newTheme: Theme) => {
      safeSetItem(storageKey, newTheme);
      setThemeState(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
