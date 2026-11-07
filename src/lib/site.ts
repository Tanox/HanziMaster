// src/lib/site.ts v5.2.35

/**
 * 站点级常量。部署时通过 NEXT_PUBLIC_SITE_URL 指定正式域名，
 * 未配置时回退本地地址，绝不猜测生产域名。
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export const DEFAULT_LOCALE = 'en';

/** 与 src/lib/i18n/index.ts 的 locales 保持一致，由 scripts/i18n-lint.mjs 校验。 */
export const SUPPORTED_LOCALES = [
  'en', 'zh-CN', 'zh-TW', 'es', 'ar', 'fr', 'pt-BR', 'de', 'ja', 'ko', 'ru',
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const isSupportedLocale = (value: string): value is SupportedLocale =>
  (SUPPORTED_LOCALES as readonly string[]).includes(value);

/** 阿拉伯语为当前唯一 RTL 语言。 */
export const isRtlLocale = (locale: string): boolean => locale === 'ar';

/** 页面路径（不含语言参数），供 sitemap 与 hreflang 共用。 */
export const SITE_PATHS = ['/', '/learn', '/practice', '/privacy', '/terms'] as const;
