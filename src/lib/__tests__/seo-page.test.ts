// src/lib/__tests__/seo-page.test.ts v5.2.57
import { describe, expect, it } from 'vitest';
import { clientMetadataPatch, isHomePath, pageTitle } from '../seo-page';
import { SUPPORTED_LOCALES } from '../site';

describe('seo-page', () => {
  it('recognizes home paths in every locale', () => {
    expect(isHomePath('/')).toBe(true);
    expect(isHomePath('/zh-CN/')).toBe(true);
    expect(isHomePath('/zh-CN/learn')).toBe(false);
  });

  it('maps inner pages to localized titles for all 11 languages', () => {
    for (const locale of SUPPORTED_LOCALES) {
      expect(pageTitle(locale, '/learn').length).toBeGreaterThan(0);
      expect(pageTitle(locale, '/zh-TW/practice').length).toBeGreaterThan(0);
    }
    expect(pageTitle('zh-CN', '/learn')).toBe('学习 12 个基础汉字');
    expect(pageTitle('en', '/privacy')).toBe('Privacy Policy');
  });

  it('builds client metadata patch matching the generateMetadata title template', () => {
    const home = clientMetadataPatch('en', '/');
    expect(home.title).toContain('HanziMaster');
    expect(home.title).not.toContain(' | ');

    const inner = clientMetadataPatch('en', '/en/learn');
    expect(inner.title).toBe('Learn 12 Chinese Characters | HanziMaster 汉字大师');
    expect(inner.description.length).toBeGreaterThan(0);
    expect(inner.ogTitle).toBe('HanziMaster 汉字大师');
  });
});
