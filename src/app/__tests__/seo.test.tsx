// src/app/__tests__/seo.test.tsx v5.2.49

import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import sitemap from '../sitemap';
import robots from '../robots';
import { StructuredData } from '@/components/structured-data';
import { SITE_URL, SUPPORTED_LOCALES } from '@/lib/site';

describe('SEO / GEO routes', () => {
  it('sitemap only lists canonical localized URLs with full hreflang alternates', () => {
    const entries = sitemap();
    expect(entries).toHaveLength(SUPPORTED_LOCALES.length * 5);
    for (const entry of entries) {
      expect(entry.url.startsWith(`${SITE_URL}/`)).toBe(true);
      const first = new URL(entry.url).pathname.split('/').filter(Boolean)[0];
      expect(SUPPORTED_LOCALES).toContain(first);
      expect(Object.keys(entry.alternates?.languages ?? {})).toHaveLength(SUPPORTED_LOCALES.length);
    }
    expect(entries.some((entry) => entry.url === `${SITE_URL}/learn`)).toBe(false);
  });

  it('robots explicitly allows generative-engine crawlers', () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const agents = rules.map((rule) => rule.userAgent).filter(Boolean);
    for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) {
      expect(agents).toContain(bot);
    }
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(result.host).toBe(SITE_URL);
  });

  it('renders a localized JSON-LD @graph with a FAQPage', () => {
    const html = renderToStaticMarkup(<StructuredData locale="zh-CN" />);
    const json = html.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? '{}';
    const data = JSON.parse(json) as {
      '@graph': { '@type': string; inLanguage?: string; mainEntity?: unknown[] }[];
    };
    const types = data['@graph'].map((node) => node['@type']);
    expect(types).toEqual(
      expect.arrayContaining([
        'WebSite',
        'Organization',
        'WebPage',
        'WebApplication',
        'Course',
        'FAQPage',
      ]),
    );
    expect(data['@graph'].find((node) => node['@type'] === 'WebSite')?.inLanguage).toBe('zh-CN');
    expect(data['@graph'].find((node) => node['@type'] === 'FAQPage')?.mainEntity).toHaveLength(3);
  });
});
