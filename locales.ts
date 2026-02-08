import { LanguageOption, UILabels } from './locales/types';
import { en } from './locales/en';
import { zhCN } from './locales/zh-CN';
import { zhTW } from './locales/zh-TW';
import { es } from './locales/es';
import { fr } from './locales/fr';
import { de } from './locales/de';
import { ja } from './locales/ja';
import { ko } from './locales/ko';
import { ru } from './locales/ru';
import { pt } from './locales/pt';
import { it } from './locales/it';
import { vi } from './locales/vi';

export { type LanguageOption, type UILabels };

export const LANGUAGES: LanguageOption[] = [
  { code: 'zh-CN', name: 'Simplified Chinese', native: '简体中文' },
  { code: 'zh-TW', name: 'Traditional Chinese', native: '繁體中文' },
  { code: 'en', name: 'English', native: 'English' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
];

export const UI_LABELS: Record<string, UILabels> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en': en,
  'es': es,
  'fr': fr,
  'de': de,
  'ja': ja,
  'ko': ko,
  'ru': ru,
  'pt': pt,
  'it': it,
  'vi': vi,
};
