'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type Locale = 'en' | 'zh-CN' | 'zh-TW' | 'es' | 'ar' | 'fr' | 'pt-BR' | 'de' | 'ja' | 'ko' | 'ru';

type LocaleProviderProps = {
  children: React.ReactNode;
  defaultLocale?: Locale;
  storageKey?: string;
};

type LocaleProviderState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  availableLocales: Locale[];
};

const STORAGE_KEY = 'hanzi-master-locale';

const locales: Locale[] = ['en', 'zh-CN', 'zh-TW', 'es', 'ar', 'fr', 'pt-BR', 'de', 'ja', 'ko', 'ru'];

const initialState: LocaleProviderState = {
  locale: 'en',
  setLocale: () => null,
  availableLocales: locales,
};

const LocaleProviderContext = createContext<LocaleProviderState>(initialState);

export function LocaleProvider({
  children,
  defaultLocale = 'en',
  storageKey = STORAGE_KEY,
  ...props
}: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const initLocale = () => {
      try {
        const stored = localStorage.getItem(storageKey) as Locale;
        if (stored && locales.includes(stored)) {
          setLocaleState(stored);
          document.documentElement.lang = stored;
          return;
        }
      } catch (e) {
        console.warn('Failed to read from localStorage:', e);
      }
      
      const browserLocale = getBrowserLocale();
      setLocaleState(browserLocale);
      document.documentElement.lang = browserLocale;
    };

    initLocale();
  }, [storageKey]);

  const getBrowserLocale = (): Locale => {
    const browserLang = navigator.language;
    if (browserLang.startsWith('zh')) {
      return browserLang.includes('TW') || browserLang.includes('HK') ? 'zh-TW' : 'zh-CN';
    }
    const localeMap: Record<string, Locale> = {
      'es': 'es', 'ar': 'ar', 'fr': 'fr',
      'pt': 'pt-BR', 'de': 'de', 'ja': 'ja',
      'ko': 'ko', 'ru': 'ru'
    };
    for (const [lang, locale] of Object.entries(localeMap)) {
      if (browserLang.startsWith(lang)) return locale;
    }
    return 'en';
  };

  const setLocale = (newLocale: Locale) => {
    try {
      localStorage.setItem(storageKey, newLocale);
      setLocaleState(newLocale);
      document.documentElement.lang = newLocale;
    } catch (e) {
      console.warn('Failed to write to localStorage:', e);
    }
  };

  const value = {
    locale,
    setLocale,
    availableLocales: locales,
  };

  return (
    <LocaleProviderContext.Provider {...props} value={value}>
      {children}
    </LocaleProviderContext.Provider>
  );
}

export const useLocale = () => {
  const context = useContext(LocaleProviderContext);

  if (context === undefined)
    throw new Error('useLocale must be used within a LocaleProvider');

  return context;
};
