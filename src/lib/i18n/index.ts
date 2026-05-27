// src/lib/i18n/index.ts v2.2.0
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
