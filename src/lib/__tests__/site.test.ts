// src/lib/__tests__/site.test.ts v5.2.49

import { describe, expect, it } from 'vitest';
import {
  DEFAULT_LOCALE,
  getSiteUrlWarning,
  isRtlLocale,
  isSupportedLocale,
  OG_LOCALES,
  SITE_PATHS,
  SITE_URL,
  SUPPORTED_LOCALES,
} from '../site';
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

  it('warns only when production is missing the site URL', () => {
    expect(getSiteUrlWarning({ NODE_ENV: 'production' })).toContain('NEXT_PUBLIC_SITE_URL');
    expect(
      getSiteUrlWarning({ NODE_ENV: 'production', NEXT_PUBLIC_SITE_URL: 'https://example.com' }),
    ).toBeNull();
    expect(getSiteUrlWarning({ NODE_ENV: 'development' })).toBeNull();
  });

  it('maps every locale to an Open Graph region tag', () => {
    for (const locale of SUPPORTED_LOCALES)
      expect(OG_LOCALES[locale]).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
  });
});
