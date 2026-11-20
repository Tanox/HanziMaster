// src/app/robots.ts v5.2.50

import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/** AI 爬虫组必须重复声明敏感路径禁入：robots.txt 中更具体的 UA 组优先于通配 * 组。 */
const SENSITIVE_PATHS = ['/api/', '/monitoring'];
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
      { userAgent: '*', allow: '/', disallow: SENSITIVE_PATHS },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: SENSITIVE_PATHS })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
