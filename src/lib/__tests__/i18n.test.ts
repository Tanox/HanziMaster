// src/lib/__tests__/i18n.test.ts v5.2.25
import { describe, it, expect } from 'vitest';
import { translations } from '@/lib/i18n';
import type { Locale, Translations } from '@/lib/i18n';
import { a11yByLocale } from '@/lib/i18n/translations/extensions/a11y';
import { cloudByLocale } from '@/lib/i18n/translations/extensions/cloud';
import { geoByLocale } from '@/lib/i18n/translations/extensions/geo';
import { legalByLocale } from '@/lib/i18n/translations/extensions/legal';
import { meaningsByLocale } from '@/lib/i18n/translations/extensions/meanings';
import { progressByLocale } from '@/lib/i18n/translations/extensions/progress';
import { pwaByLocale } from '@/lib/i18n/translations/extensions/pwa';
import { seoByLocale } from '@/lib/i18n/translations/extensions/seo';
import { settingsByLocale } from '@/lib/i18n/translations/extensions/settings';

function leafKeys(obj: unknown, prefix = ''): Set<string> {
  let out = new Set<string>();
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      const path = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === 'object') out = new Set([...out, ...leafKeys(v, path)]);
      else out.add(path);
    }
  }
  return out;
}

const locales = Object.keys(translations) as Locale[];
const enKeys = leafKeys(translations.en as Translations);

describe('i18n key integrity', () => {
  it('支持 11 种语言', () => {
    expect(locales).toHaveLength(11);
  });

  it('每种语言的叶子键集合与 en 完全一致（无缺失、无多余）', () => {
    for (const locale of locales) {
      const keys = leafKeys(translations[locale] as Translations);
      // 与 en 键集合相等
      expect([...keys].sort()).toEqual([...enKeys].sort());
    }
  });

  it('en 基准键数量合理（>30 个叶子键）', () => {
    expect(enKeys.size).toBeGreaterThan(30);
  });

  it('扩展模块每种语言都有与 en 相同的键（不被英文回退掩盖）', () => {
    const modules: Record<string, Record<string, object>> = {
      a11y: a11yByLocale,
      cloud: cloudByLocale,
      geo: geoByLocale,
      legal: legalByLocale,
      meanings: meaningsByLocale,
      progress: progressByLocale,
      pwa: pwaByLocale,
      seo: seoByLocale,
      settings: settingsByLocale,
    };
    for (const [name, byLocale] of Object.entries(modules)) {
      const expectedKeys = Object.keys(byLocale.en).sort();
      for (const locale of locales) {
        expect(Object.keys(byLocale[locale] ?? {}).sort(), `${name}.${locale}`).toEqual(expectedKeys);
      }
    }
  });
});
