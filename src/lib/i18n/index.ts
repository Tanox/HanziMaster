// src/lib/i18n/index.ts v2.3.1
import { en } from './translations/en';
import { zhCN } from './translations/zh-CN';
import { zhTW } from './translations/zh-TW';
import { es } from './translations/es';
import { ar } from './translations/ar';
import { fr } from './translations/fr';
import { ptBR } from './translations/pt-BR';
import { de } from './translations/de';
import { ja } from './translations/ja';
import { ko } from './translations/ko';
import { ru } from './translations/ru';

export type Locale = 'en' | 'zh-CN' | 'zh-TW' | 'es' | 'ar' | 'fr' | 'pt-BR' | 'de' | 'ja' | 'ko' | 'ru';

export type Translations = typeof en;

export const translations: Record<Locale, Translations> = {
  'en': en,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'es': es,
  'ar': ar,
  'fr': fr,
  'pt-BR': ptBR,
  'de': de,
  'ja': ja,
  'ko': ko,
  'ru': ru,
};

export const locales: Locale[] = Object.keys(translations) as Locale[];

export const DEFAULT_LOCALE: Locale = 'en';

export function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  let result: any = obj;
  for (const key of keys) {
    if (result === undefined || result === null) return path;
    result = result[key];
  }
  return result === undefined || result === null ? path : String(result);
}

export function interpolate(template: string, variables: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key] !== undefined ? String(variables[key]) : match;
  });
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE;
  const nav = navigator as Navigator & { userLanguage?: string; browserLanguage?: string };
  const languages: string[] = [];
  if (nav.languages && nav.languages.length > 0) {
    languages.push(...nav.languages);
  }
  if (nav.language) languages.push(nav.language);
  if (nav.userLanguage) languages.push(nav.userLanguage);
  if (nav.browserLanguage) languages.push(nav.browserLanguage);
  for (const lang of languages) {
    const normalized = lang.toLowerCase();
    if (normalized.startsWith('zh')) {
      if (normalized === 'zh-cn' || normalized === 'zh-hans' || normalized.startsWith('zh_cn') || normalized.startsWith('zh-hans')) {
        return 'zh-CN';
      }
      if (normalized === 'zh-tw' || normalized === 'zh-hant' || normalized.startsWith('zh_tw') || normalized.startsWith('zh-hant') || normalized === 'zh-hk' || normalized.startsWith('zh_hk')) {
        return 'zh-TW';
      }
      return 'zh-CN';
    }
    const primary = normalized.split('-')[0];
    const exactMatch = locales.find(l => l.toLowerCase() === normalized);
    if (exactMatch) return exactMatch;
    const primaryMatch = locales.find(l => l.toLowerCase().startsWith(primary));
    if (primaryMatch) return primaryMatch;
  }
  return DEFAULT_LOCALE;
}
