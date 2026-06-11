// src/lib/i18n/index.test.ts v2.4.0
import { getNestedValue, interpolate, detectBrowserLocale } from './index';

describe('getNestedValue', () => {
  const obj = {
    common: {
      home: 'Home',
      learn: 'Learn',
    },
    home: {
      heroTitle: 'Welcome',
    },
  };

  it('should return value for valid path', () => {
    expect(getNestedValue(obj, 'common.home')).toBe('Home');
    expect(getNestedValue(obj, 'home.heroTitle')).toBe('Welcome');
  });

  it('should return path for invalid path', () => {
    expect(getNestedValue(obj, 'common.nonexistent')).toBe('common.nonexistent');
    expect(getNestedValue(obj, 'nonexistent.key')).toBe('nonexistent.key');
  });

  it('should handle null/undefined values', () => {
    const objWithNull = { test: null, nested: { val: undefined } };
    expect(getNestedValue(objWithNull, 'test')).toBe('test');
    expect(getNestedValue(objWithNull, 'nested.val')).toBe('nested.val');
  });
});

describe('interpolate', () => {
  it('should replace single variable', () => {
    expect(interpolate('Hello {name}', { name: 'World' })).toBe('Hello World');
  });

  it('should replace multiple variables', () => {
    expect(interpolate('{cur}/{total} items', { cur: 5, total: 10 })).toBe('5/10 items');
  });

  it('should handle missing variables', () => {
    expect(interpolate('Hello {name}', {})).toBe('Hello {name}');
    expect(interpolate('{missing} test', { other: 'value' })).toBe('{missing} test');
  });

  it('should handle numbers as variables', () => {
    expect(interpolate('Score: {score}', { score: 95 })).toBe('Score: 95');
  });
});

describe('detectBrowserLocale', () => {
  beforeEach(() => {
    delete (global as any).navigator;
  });

  it('should return default locale when navigator is undefined', () => {
    (global as any).navigator = undefined;
    expect(detectBrowserLocale()).toBe('en');
  });

  it('should detect zh-CN locale', () => {
    (global as any).navigator = {
      languages: ['zh-CN', 'en-US'],
      language: 'zh-CN',
    };
    expect(detectBrowserLocale()).toBe('zh-CN');
  });

  it('should detect zh-TW locale', () => {
    (global as any).navigator = {
      languages: ['zh-TW'],
      language: 'zh-TW',
    };
    expect(detectBrowserLocale()).toBe('zh-TW');
  });

  it('should fallback to default for unsupported locale', () => {
    (global as any).navigator = {
      languages: ['xx-XX'],
      language: 'xx-XX',
    };
    expect(detectBrowserLocale()).toBe('en');
  });
});
