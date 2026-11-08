// src/components/locale-provider.tsx v5.2.44
'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { Locale, TranslationKey, Translations } from '@/lib/i18n';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, isSupportedLocale, isRtlLocale } from '@/lib/site';
import { getNestedValue, interpolate } from '@/lib/i18n/translate';
import { safeGetItem, safeSetItem } from '@/lib/storage';
import { loadTranslations } from '@/lib/i18n/load-translations';
import { en } from '@/lib/i18n/translations/en';
import { extendTranslations } from '@/lib/i18n/translations/extensions';

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
const FALLBACK_DICTIONARY = extendTranslations(en, DEFAULT_LOCALE) as Translations;

const LocaleProviderContext = createContext<LocaleProviderState | undefined>(undefined);

const getBrowserLocale = (): Locale => {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE;
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
  return DEFAULT_LOCALE;
};

/** 语言来源优先级：/ {locale}/ 前缀 > ?lang= > localStorage > 浏览器语言。 */
const getUrlLocale = (): Locale | null => {
  if (typeof window === 'undefined') return null;
  const fromPath = window.location.pathname.split('/').filter(Boolean)[0];
  if (fromPath && isSupportedLocale(fromPath)) return fromPath;
  const fromQuery = new URLSearchParams(window.location.search).get('lang');
  return fromQuery && isSupportedLocale(fromQuery) ? fromQuery : null;
};

/** 同步 lang / dir（RTL）与 cookie，供 SSR 首屏读取。 */
const applyDocumentLocale = (value: Locale): void => {
  document.documentElement.lang = value;
  document.documentElement.dir = isRtlLocale(value) ? 'rtl' : 'ltr';
  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(value)}; path=/; max-age=31536000; samesite=lax`;
};

/** 语言写入 URL 前缀（P1-9）：保留当前页面段，去掉旧的 ?lang=，URL 可分享可索引。 */
const syncUrlLocale = (value: Locale): void => {
  const url = new URL(window.location.href);
  const segments = url.pathname.split('/').filter(Boolean);
  if (segments[0] && isSupportedLocale(segments[0])) segments[0] = value;
  else segments.unshift(value);
  url.pathname = '/' + segments.join('/');
  url.searchParams.delete('lang');
  window.history.replaceState(null, '', url.toString());
};

export function LocaleProvider({
  children,
  defaultLocale = DEFAULT_LOCALE,
  storageKey = STORAGE_KEY,
  ...props
}: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [dictionary, setDictionary] = useState<Translations>(FALLBACK_DICTIONARY);

  useEffect(() => {
    const stored = safeGetItem<Locale>(storageKey, defaultLocale);
    const initial = getUrlLocale() ?? (stored && isSupportedLocale(stored) ? stored : getBrowserLocale());
    setLocaleState(initial);
    applyDocumentLocale(initial);
  }, [storageKey, defaultLocale]);

  // P1-11：只按需加载当前语言词典；加载完成前保留上一份词典，避免切换时闪烁
  useEffect(() => {
    if (locale === DEFAULT_LOCALE) {
      setDictionary(FALLBACK_DICTIONARY);
      return;
    }
    let active = true;
    loadTranslations(locale).then((next) => {
      if (active) setDictionary(next);
    });
    return () => {
      active = false;
    };
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    safeSetItem(storageKey, newLocale);
    setLocaleState(newLocale);
    applyDocumentLocale(newLocale);
    syncUrlLocale(newLocale);
  }, [storageKey]);

  const t = useCallback((key: TranslationKey, params?: Record<string, string | number>): string =>
    interpolate(getNestedValue(dictionary, key) || key, params), [dictionary]);

  const value = useMemo<LocaleProviderState>(
    () => ({ locale, t, setLocale, availableLocales: [...SUPPORTED_LOCALES] }),
    [locale, t, setLocale]
  );

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
