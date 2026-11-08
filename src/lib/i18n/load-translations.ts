// src/lib/i18n/load-translations.ts v5.2.44
// P1-11：按语言拆 chunk，首屏只加载当前语言词典（英文兜底随主包）。
import type { Locale, Translations } from '@/lib/i18n';
import { extendTranslations } from './translations/extensions';

type BaseTranslations = typeof import('./translations/en').en;

const loaders: Record<Locale, () => Promise<BaseTranslations>> = {
  en: () => import('./translations/en').then((m) => m.en as BaseTranslations),
  'zh-CN': () => import('./translations/zh-CN').then((m) => m.zhCN as BaseTranslations),
  'zh-TW': () => import('./translations/zh-TW').then((m) => m.zhTW as BaseTranslations),
  es: () => import('./translations/es').then((m) => m.es as BaseTranslations),
  ar: () => import('./translations/ar').then((m) => m.ar as BaseTranslations),
  fr: () => import('./translations/fr').then((m) => m.fr as BaseTranslations),
  'pt-BR': () => import('./translations/pt-BR').then((m) => m.ptBR as BaseTranslations),
  de: () => import('./translations/de').then((m) => m.de as BaseTranslations),
  ja: () => import('./translations/ja').then((m) => m.ja as BaseTranslations),
  ko: () => import('./translations/ko').then((m) => m.ko as BaseTranslations),
  ru: () => import('./translations/ru').then((m) => m.ru as BaseTranslations),
};

/** 动态加载单个语言包并合并扩展（键集合由同一函数保证一致）。 */
export async function loadTranslations(locale: Locale): Promise<Translations> {
  const base = await loaders[locale]();
  return extendTranslations(base, locale);
}
