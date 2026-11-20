// src/app/robots.ts v5.2.49

import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/** 显式允许生成式引擎/AI 搜索爬虫（默认 * 已允许，此处表明 GEO 意图并便于日后按 UA 细分）。 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/monitoring'] },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
