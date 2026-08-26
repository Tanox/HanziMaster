// src/lib/__tests__/i18n.test.ts v5.2.19
import { describe, it, expect } from 'vitest';
import { translations } from '@/lib/i18n';
import type { Locale, Translations } from '@/lib/i18n';

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
});
