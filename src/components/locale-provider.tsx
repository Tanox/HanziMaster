// src/components/locale-provider.tsx v5.2.35
'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Locale, translations, locales, type TranslationKey } from '@/lib/i18n';
import { getNestedValue, interpolate } from '@/lib/i18n/translate';
import { safeGetItem, safeSetItem } from '@/lib/storage';
import { isRtlLocale } from '@/lib/site';

type LocaleProviderProps = {
  children: React.ReactNode;
  defaultLocale?: Locale;
  storageKey?: string;
};

type LocaleProviderState = {
  locale: Locale;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  setLocale: (locale: Locale) => void;
  availableLocales: Locale[];
};

const STORAGE_KEY = 'hanzi-master-locale';
const COOKIE_KEY = 'hanzi-master-locale';

const LocaleProviderContext = createContext<LocaleProviderState | undefined>(undefined);

const getBrowserLocale = (): Locale => {
  if (typeof navigator === 'undefined') return 'en';
  const browserLang = navigator.language;
  if (browserLang.startsWith('zh')) {
    return browserLang.includes('TW') || browserLang.includes('HK') ? 'zh-TW' : 'zh-CN';
  }
  const localeMap: Record<string, Locale> = {
    'es': 'es', 'ar': 'ar', 'fr': 'fr',
    'pt': 'pt-BR', 'de': 'de', 'ja': 'ja',
    'ko': 'ko', 'ru': 'ru',
  };
  for (const [lang, locale] of Object.entries(localeMap)) {
    if (browserLang.startsWith(lang)) return locale;
  }
  return 'en';
};

/** URL ?lang= 是可分享的语言入口，优先级最高。 */
const getUrlLocale = (): Locale | null => {
  if (typeof window === 'undefined') return null;
  const value = new URLSearchParams(window.location.search).get('lang');
  return value && locales.includes(value as Locale) ? (value as Locale) : null;
};

/** 同步 lang / dir（RTL）与 cookie，供 SSR 首屏读取。 */
const applyDocumentLocale = (value: Locale): void => {
  document.documentElement.lang = value;
  document.documentElement.dir = isRtlLocale(value) ? 'rtl' : 'ltr';
  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(value)}; path=/; max-age=31536000; samesite=lax`;
};

const syncUrlLocale = (value: Locale): void => {
  const url = new URL(window.location.href);
  if (url.searchParams.has('lang')) {
    url.searchParams.set('lang', value);
    window.history.replaceState(null, '', url.toString());
  }
};

const translate = (locale: Locale, key: string): string =>
  getNestedValue(translations[locale], key);

export function LocaleProvider({
  children,
  defaultLocale = 'en',
  storageKey = STORAGE_KEY,
  ...props
}: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = safeGetItem<Locale>(storageKey, defaultLocale);
    const initial =
      getUrlLocale() ??
      (stored && locales.includes(stored) ? stored : getBrowserLocale());
    setLocaleState(initial);
    applyDocumentLocale(initial);
  }, [storageKey, defaultLocale]);

  const setLocale = useCallback((newLocale: Locale) => {
    safeSetItem(storageKey, newLocale);
    setLocaleState(newLocale);
    applyDocumentLocale(newLocale);
    syncUrlLocale(newLocale);
  }, [storageKey]);

  const t = useCallback((key: TranslationKey, params?: Record<string, string | number>): string =>
    interpolate(translate(locale, key), params), [locale]);

  const value = { locale, t, setLocale, availableLocales: locales };

  return (
    <LocaleProviderContext.Provider {...props} value={value}>
      {children}
    </LocaleProviderContext.Provider>
  );
}

export const useLocale = () => {
  const context = useContext(LocaleProviderContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

export const useTranslation = () => {
  const { t } = useLocale();
  return { t };
};
