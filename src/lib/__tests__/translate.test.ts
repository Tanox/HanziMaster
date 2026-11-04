// src/lib/__tests__/translate.test.ts v5.2.27
import { describe, it, expect } from 'vitest';
import { getNestedValue, interpolate } from '@/lib/i18n/translate';
import { locales, translations } from '@/lib/i18n';
import { en } from '@/lib/i18n/translations/en';

describe('getNestedValue', () => {
  it('读取已有点分路径', () => {
    expect(getNestedValue(en, 'home.heroTitle')).toBe('Master Chinese');
  });

  it('键不存在时原样返回路径', () => {
    expect(getNestedValue(en, 'home.notExist')).toBe('home.notExist');
    expect(getNestedValue(en, 'a.b.c')).toBe('a.b.c');
  });

  it('命中对象而非字符串时返回路径，不返回 [object Object]', () => {
    expect(getNestedValue(en, 'home')).toBe('home');
  });

  it('原型链属性不可被解析（安全加固）', () => {
    expect(getNestedValue(en, '__proto__')).toBe('__proto__');
    expect(getNestedValue(en, 'constructor')).toBe('constructor');
    expect(getNestedValue(en, 'home.__proto__')).toBe('home.__proto__');
  });

  it('11 种语言字典均有 home.heroTitle 且为非空字符串', () => {
    expect(locales).toHaveLength(11);
    for (const locale of locales) {
      const value = getNestedValue(translations[locale], 'home.heroTitle');
      expect(value, `${locale} 缺少 home.heroTitle`).not.toBe('home.heroTitle');
      expect(value.length).toBeGreaterThan(0);
    }
  });
});

describe('interpolate', () => {
  it('无参数时原样返回模板', () => {
    expect(interpolate('Hello {{name}}')).toBe('Hello {{name}}');
  });

  it('替换全部同名占位符', () => {
    expect(interpolate('{{n}} / {{n}}', { n: 5 })).toBe('5 / 5');
  });

  it('参数名含正则元字符时不抛异常、不误替换', () => {
    expect(interpolate('{{a.b}} {{(x)}}', { 'a.b': 'ok', '(x)': 'yes' }))
      .toBe('ok yes');
  });

  it('替换值含 $& / $1 等序列时按字面量处理', () => {
    expect(interpolate('{{v}}', { v: '$& $1 $$' })).toBe('$& $1 $$');
  });
});
