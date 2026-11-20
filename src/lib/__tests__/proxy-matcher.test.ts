// src/lib/__tests__/proxy-matcher.test.ts v5.2.57
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { PROXY_MATCHER, shouldBypassProxy } from '../proxy-matcher';

describe('proxy 路由绕过规则', () => {
  it('框架、API、tunnel 与带点静态资源 bypass', () => {
    for (const pathname of [
      '/_next/static/chunk.js',
      '/api/health',
      '/api/progress?code=abc',
      '/monitoring',
      '/sw.js',
      '/icon.svg',
      '/llms.txt',
      '/robots.txt',
      '/sitemap.xml',
    ]) {
      expect(shouldBypassProxy(pathname), pathname).toBe(true);
    }
  });

  it('约定式图片与清单路由 bypass（社交分享图不再被 302）', () => {
    for (const pathname of ['/opengraph-image', '/twitter-image', '/manifest.webmanifest', '/favicon.ico']) {
      expect(shouldBypassProxy(pathname), pathname).toBe(true);
    }
  });

  it('页面路由仍由 proxy 做语言协商', () => {
    for (const pathname of ['/', '/learn', '/practice', '/privacy', '/terms', '/zh-CN', '/en/learn', '/ar/practice']) {
      expect(shouldBypassProxy(pathname), pathname).toBe(false);
    }
  });

  it('matcher 字符串与运行时守卫结论一致', () => {
    // Next matcher 对整条路径生效，测试需^...$锚定，否则可在中间斜杠处误命中
    const matcher = new RegExp(`^${PROXY_MATCHER}$`);
    expect(matcher.test('/opengraph-image')).toBe(false);
    expect(matcher.test('/twitter-image')).toBe(false);
    expect(matcher.test('/zh-CN')).toBe(true);
    expect(matcher.test('/api/health')).toBe(false);
  });

  it('proxy.ts 的静态 matcher 字面量与共享常量保持同步', () => {
    const source = readFileSync(new URL('../../proxy.ts', import.meta.url), 'utf8');
    const literal = source.match(/matcher:\s*\['([^']+)'\]/)?.[1];
    expect(literal).toBe(PROXY_MATCHER);
  });
});
