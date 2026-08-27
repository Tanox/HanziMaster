// src/lib/__tests__/characters.test.ts v5.2.25
import { describe, it, expect } from 'vitest';
import { characters } from '@/lib/characters';
import { en } from '@/lib/i18n/translations/en';
import type { Translations } from '@/lib/i18n';

// 递归收集所有叶子点分键，用于校验 translationKey 是否合法
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

const validKeys = leafKeys(en as Translations);

describe('characters data', () => {
  it('合并后包含 12 个汉字', () => {
    expect(characters).toHaveLength(12);
  });

  it('每个汉字均含必填字段', () => {
    for (const c of characters) {
      expect(c.id).toBeGreaterThan(0);
      expect(c.hanzi).toBeTruthy();
      expect(c.pinyin).toBeTruthy();
      expect(c.strokes).toBeGreaterThan(0);
      expect(c.radical).toBeTruthy();
      expect(Array.isArray(c.words) && c.words.length).toBeTruthy();
      expect(c.example.sentence).toBeTruthy();
    }
  });

  it('translationKey / structureKey / words / example 的翻译键均存在于 en 中', () => {
    for (const c of characters) {
      expect(validKeys.has(c.translationKey)).toBe(true);
      expect(validKeys.has(c.structureKey)).toBe(true);
      for (const w of c.words) expect(validKeys.has(w.translationKey)).toBe(true);
      expect(validKeys.has(c.example.translationKey)).toBe(true);
    }
  });

  it('hanzi 唯一且无重复', () => {
    const set = new Set(characters.map((c) => c.hanzi));
    expect(set.size).toBe(characters.length);
  });
});
