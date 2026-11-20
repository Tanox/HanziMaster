// src/lib/__tests__/urls.test.ts v5.2.49

import { describe, expect, it } from 'vitest';
import { localizedHref, localizePath, stripLocalePrefix } from '../urls';

describe('localized URLs', () => {
  it('adds the locale prefix to paths and the home URL', () => {
    expect(localizedHref('zh-CN', '/learn')).toBe('/zh-CN/learn');
    expect(localizedHref('ar', '/privacy')).toBe('/ar/privacy');
    expect(localizedHref('en', '/')).toBe('/en/');
  });

  it('strips the locale prefix for active-link checks', () => {
    expect(stripLocalePrefix('/zh-CN/learn')).toBe('/learn');
    expect(stripLocalePrefix('/zh-CN/')).toBe('/');
    expect(stripLocalePrefix('/')).toBe('/');
    expect(stripLocalePrefix('/practice')).toBe('/practice');
  });

  it('switches the language portion of a canonical path', () => {
    expect(localizePath('ja', '/zh-CN/learn')).toBe('/ja/learn');
    expect(localizePath('fr', '/en/')).toBe('/fr/');
    expect(localizePath('de', '/practice')).toBe('/de/practice');
  });
});
