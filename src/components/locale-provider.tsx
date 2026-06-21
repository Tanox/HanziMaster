// src/components/locale-provider.tsx v2.3.0
'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Locale, translations, locales, Translations } from '@/lib/i18n';
import { safeGetItem, safeSetItem } from '@/lib/storage';

type LocaleProviderProps = {
  children: React.ReactNode;
  defaultLocale?: Locale;
  storageKey?: string;
};

type LocaleProviderState = {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
  availableLocales: Locale[];
};

const STORAGE_KEY = 'hanzi-master-locale';

const getNestedValue = (obj: Translations, path: string): string => {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === 'string' ? current : path;
};

const initialState: LocaleProviderState = {
  locale: 'en',
  t: (key: string) => key,
  setLocale: () => null,
  availableLocales: locales,
};

const LocaleProviderContext = createContext<LocaleProviderState>(initialState);

const getBrowserLocale = (): Locale => {
  if (typeof navigator === 'undefined') return 'en';
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

// Client-safe translation lookup (cache() is server-only)
const translate = (locale: Locale, key: string): string => {
  return getNestedValue(translations[locale], key);
};

export function LocaleProvider({
  children,
  defaultLocale = 'en',
  storageKey = STORAGE_KEY,
  ...props
}: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const initLocale = () => {
      // Use versioned storage
      const stored = safeGetItem<Locale>(storageKey, defaultLocale);
      if (stored && locales.includes(stored)) {
        setLocaleState(stored);
        document.documentElement.lang = stored;
        return;
      }

      const browserLocale = getBrowserLocale();
      setLocaleState(browserLocale);
      document.documentElement.lang = browserLocale;
    };

    initLocale();
  }, [storageKey, defaultLocale]);

  const setLocale = useCallback((newLocale: Locale) => {
    safeSetItem(storageKey, newLocale);
    setLocaleState(newLocale);
    document.documentElement.lang = newLocale;
  }, [storageKey]);

  // Use direct translation lookup
  const t = useCallback((key: string): string => {
    return translate(locale, key);
  }, [locale]);

  const value = {
    locale,
    t,
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

export const useTranslation = () => {
  const { t } = useLocale();
  return { t };
};
