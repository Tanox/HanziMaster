// src/lib/__tests__/metadata.test.ts v5.2.49

import { describe, expect, it } from 'vitest';
import { buildMetadata } from '../build-metadata';
import { SITE_URL, SUPPORTED_LOCALES } from '../site';

describe('buildMetadata', () => {
  it('localizes title, description and OG locale', () => {
    const en = buildMetadata('en', '/en/');
    const zh = buildMetadata('zh-CN', '/zh-CN/');
    expect(en.title).not.toEqual(zh.title);
    expect(en.description).not.toEqual(zh.description);
    expect((en.openGraph as { locale?: string })?.locale).toBe('en_US');
    expect((zh.openGraph as { locale?: string })?.locale).toBe('zh_CN');
  });

  it('derives canonical, 11 hreflang entries and x-default from the request path', () => {
    const meta = buildMetadata('zh-CN', '/zh-CN/learn');
    expect(meta.alternates?.canonical).toBe('/zh-CN/learn');
    const languages = meta.alternates?.languages as Record<string, string>;
    expect(Object.keys(languages)).toHaveLength(SUPPORTED_LOCALES.length + 1);
    expect(languages.ja).toBe('/ja/learn');
    expect(languages['x-default']).toBe('/learn');
    expect(meta.metadataBase?.toString()).toBe(`${SITE_URL}/`);
  });
});
