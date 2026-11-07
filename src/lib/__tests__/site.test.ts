// src/lib/__tests__/site.test.ts v5.2.35

import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, isRtlLocale, isSupportedLocale, SITE_PATHS, SITE_URL, SUPPORTED_LOCALES } from '../site';
import { locales } from '../i18n';

describe('site constants', () => {
  it('keeps the site locale list in sync with the i18n locale list', () => {
    expect([...SUPPORTED_LOCALES]).toEqual(locales);
    expect(DEFAULT_LOCALE).toBe('en');
  });

  it('recognises supported locales and RTL', () => {
    expect(isSupportedLocale('zh-CN')).toBe(true);
    expect(isSupportedLocale('xx-XX')).toBe(false);
    expect(isRtlLocale('ar')).toBe(true);
    expect(isRtlLocale('en')).toBe(false);
  });

  it('provides a usable base url and all public routes', () => {
    expect(SITE_URL.startsWith('http')).toBe(true);
    expect(SITE_PATHS).toContain('/privacy');
    expect(SITE_PATHS).toContain('/terms');
  });
});
