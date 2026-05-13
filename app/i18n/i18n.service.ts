// app/i18n/i18n.service.ts v2.2.0

import { Injectable, signal, computed } from '@angular/core';
import {
  en,
  zhCN,
  zhTW,
  es,
  ar,
  fr,
  ptBR,
  de,
  ja,
  ko,
  ru
} from './index';

type Locale = 'en' | 'zh-CN' | 'zh-TW' | 'es' | 'ar' | 'fr' | 'pt-BR' | 'de' | 'ja' | 'ko' | 'ru';

const locales = {
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
  'ru': ru
};

const STORAGE_KEY = 'hanzi-master-locale';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private currentLocale = signal<Locale>('en');
  public t = computed(() => locales[this.currentLocale()]);

  constructor() {
    this.initLocale();
  }

  private initLocale() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved in locales) {
      this.currentLocale.set(saved as Locale);
    } else {
      const browserLocale = this.getBrowserLocale();
      this.currentLocale.set(browserLocale);
    }
  }

  private getBrowserLocale(): Locale {
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
  }

  setLocale(locale: Locale) {
    this.currentLocale.set(locale);
    localStorage.setItem(STORAGE_KEY, locale);
  }

  getLocale() {
    return this.currentLocale();
  }

  getAvailableLocales(): Locale[] {
    return Object.keys(locales) as Locale[];
  }
}
