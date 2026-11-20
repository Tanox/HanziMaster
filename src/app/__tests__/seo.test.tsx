// src/app/__tests__/seo.test.tsx v5.2.57

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
    // 每个 UA 组必须自带敏感路径禁入，否则更具体的组会覆盖通配 * 的规则
    for (const rule of rules) {
      expect(rule.disallow).toEqual(expect.arrayContaining(['/api/', '/monitoring']));
    }
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(result.host).toBe(SITE_URL);
  });

  it('renders a localized JSON-LD @graph with a FAQPage on the homepage', () => {
    const html = renderToStaticMarkup(<StructuredData locale="zh-CN" path="/zh-CN/" />);
    const data = parseJsonLd(html);
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
    expect(types).not.toContain('BreadcrumbList');
    expect(data['@graph'].find((node) => node['@type'] === 'WebSite')?.inLanguage).toBe('zh-CN');
    expect(data['@graph'].find((node) => node['@type'] === 'FAQPage')?.mainEntity).toHaveLength(3);
    expect(data['@graph'].find((node) => node['@type'] === 'WebPage')?.url).toBe(`${SITE_URL}/zh-CN/`);
  });

  it('uses route-localized WebPage and BreadcrumbList instead of FAQ on inner pages', () => {
    const html = renderToStaticMarkup(<StructuredData locale="zh-CN" path="/zh-CN/learn" />);
    const data = parseJsonLd(html);
    const types = data['@graph'].map((node) => node['@type']);
    expect(types).not.toContain('FAQPage');
    const breadcrumb = data['@graph'].find((node) => node['@type'] === 'BreadcrumbList');
    expect(breadcrumb?.itemListElement).toHaveLength(2);
    expect(data['@graph'].find((node) => node['@type'] === 'WebPage')?.url).toBe(
      `${SITE_URL}/zh-CN/learn`,
    );
  });
});

function parseJsonLd(html: string) {
  const json = html.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? '{}';
  return JSON.parse(json) as {
    '@graph': { '@type': string; url?: string; inLanguage?: string; mainEntity?: unknown[]; itemListElement?: unknown[] }[];
  };
}
