// src/components/locale-provider.tsx v5.2.49
'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { Locale, TranslationKey, Translations } from '@/lib/i18n';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, OG_LOCALES, isSupportedLocale, isRtlLocale } from '@/lib/site';
import { getNestedValue, interpolate } from '@/lib/i18n/translate';
import { safeGetItem, safeSetItem } from '@/lib/storage';
import { loadTranslations } from '@/lib/i18n/load-translations';
import { en } from '@/lib/i18n/translations/en';
import { extendTranslations } from '@/lib/i18n/translations/extensions';

type LocaleProviderProps = {
  children: React.ReactNode;
  defaultLocale?: Locale;
  /** RSC 首屏预载的词典；传入后首屏不再异步加载，避免语言闪烁。 */
  initialDictionary?: Translations;
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
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('zh')) {
    return /tw|hk|mo|hant/.test(browserLang) ? 'zh-TW' : 'zh-CN';
  }
  const localeMap: Record<string, Locale> = {
    es: 'es',
    ar: 'ar',
    fr: 'fr',
    pt: 'pt-BR',
    de: 'de',
    ja: 'ja',
    ko: 'ko',
    ru: 'ru',
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

/** 替换 URL 中的语言前缀，保留 origin 与尾斜杠（首页 /{locale}/ 是规范形式）。 */
const withLocale = (href: string, value: string): string => {
  try {
    const url = new URL(href, window.location.origin);
    const parts = url.pathname.split('/').filter(Boolean);
    const rest = parts[0] && isSupportedLocale(parts[0]) ? parts.slice(1) : parts;
    url.pathname = `/${value}${rest.length ? '/' + rest.join('/') : '/'}`;
    return url.toString();
  } catch {
    return href;
  }
};

/** 客户端切语言只改 history，不重跑 generateMetadata；同步 head 中的 canonical/hreflang/og:locale。 */
const syncMetadataLocale = (value: Locale): void => {
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const href = canonical?.getAttribute('href');
  if (href) canonical?.setAttribute('href', withLocale(href, value));
  document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]').forEach((link) => {
    const hreflang = link.getAttribute('hreflang');
    const target = link.getAttribute('href');
    if (hreflang && isSupportedLocale(hreflang) && target) {
      link.setAttribute('href', withLocale(target, hreflang));
    }
  });
  document.querySelector('meta[property="og:locale"]')?.setAttribute('content', OG_LOCALES[value]);
};

/** 同步 lang / dir（RTL）、cookie 与 SEO 元数据，供 SSR 首屏读取。 */
const applyDocumentLocale = (value: Locale): void => {
  document.documentElement.lang = value;
  document.documentElement.dir = isRtlLocale(value) ? 'rtl' : 'ltr';
  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(value)}; path=/; max-age=31536000; samesite=lax`;
  syncMetadataLocale(value);
};

/** 语言写入 URL 前缀（P1-9）：保留当前页面段，去掉旧的 ?lang=，URL 可分享可索引。 */
const syncUrlLocale = (value: Locale): void => {
  const url = new URL(window.location.href);
  url.href = withLocale(url.toString(), value);
  url.searchParams.delete('lang');
  window.history.replaceState(null, '', url.toString());
};

export function LocaleProvider({
  children,
  defaultLocale = DEFAULT_LOCALE,
  initialDictionary,
  storageKey = STORAGE_KEY,
  ...props
}: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [dictionary, setDictionary] = useState<Translations>(
    initialDictionary ?? FALLBACK_DICTIONARY,
  );

  useEffect(() => {
    const stored = safeGetItem<Locale>(storageKey, defaultLocale);
    const initial =
      getUrlLocale() ?? (stored && isSupportedLocale(stored) ? stored : getBrowserLocale());
    setLocaleState(initial);
    applyDocumentLocale(initial);
    // URL / cookie 胜出时同步回写存储，避免三处状态分叉导致后续页面语言跳变
    safeSetItem(storageKey, initial);
  }, [storageKey, defaultLocale]);

  // P1-11：只按需加载当前语言词典；SSR 预载时直接复用，切回默认语言也恢复预载词典。
  useEffect(() => {
    if (locale === defaultLocale && initialDictionary) {
      setDictionary(initialDictionary);
      return;
    }
    if (locale === DEFAULT_LOCALE) {
      setDictionary(FALLBACK_DICTIONARY);
      return;
    }
    let active = true;
    loadTranslations(locale)
      .then((next) => {
        if (active) setDictionary(next);
      })
      .catch(() => {
        // 词典 chunk 加载失败时保留上一份词典，避免 unhandled rejection 界面空白
      });
    return () => {
      active = false;
    };
  }, [locale, defaultLocale, initialDictionary]);

  const setLocale = useCallback(
    (newLocale: Locale) => {
      safeSetItem(storageKey, newLocale);
      setLocaleState(newLocale);
      applyDocumentLocale(newLocale);
      syncUrlLocale(newLocale);
    },
    [storageKey],
  );

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>): string =>
      interpolate(getNestedValue(dictionary, key) || key, params),
    [dictionary],
  );

  const value = useMemo<LocaleProviderState>(
    () => ({ locale, t, setLocale, availableLocales: [...SUPPORTED_LOCALES] }),
    [locale, t, setLocale],
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
