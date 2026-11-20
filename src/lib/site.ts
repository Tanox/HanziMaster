// src/lib/site.ts v5.2.49

/**
 * 站点级常量。部署时必须通过 NEXT_PUBLIC_SITE_URL 指定正式域名，
 * 未配置时回退本地地址，绝不猜测生产域名。
 */
export const DEFAULT_SITE_URL = 'http://localhost:3000';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
export const SITE_URL_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

/** 生产漏配时返回明确告警（不阻断构建，CI 无该变量仍可构建）；纯函数便于单测与脚本复用。 */
export const getSiteUrlWarning = (env: NodeJS.ProcessEnv = process.env): string | null =>
  env.NODE_ENV === 'production' && !env.NEXT_PUBLIC_SITE_URL
    ? `NEXT_PUBLIC_SITE_URL is not set in production; canonical/hreflang/sitemap/robots fall back to ${DEFAULT_SITE_URL}`
    : null;

export const DEFAULT_LOCALE = 'en';

/** 与 src/lib/i18n/index.ts 的 locales 保持一致，由 scripts/i18n-lint.mjs 校验。 */
export const SUPPORTED_LOCALES = [
  'en',
  'zh-CN',
  'zh-TW',
  'es',
  'ar',
  'fr',
  'pt-BR',
  'de',
  'ja',
  'ko',
  'ru',
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const isSupportedLocale = (value: string): value is SupportedLocale =>
  (SUPPORTED_LOCALES as readonly string[]).includes(value);

/** 阿拉伯语为当前唯一 RTL 语言。 */
export const isRtlLocale = (locale: string): boolean => locale === 'ar';

/** 页面路径（不含语言参数），供 sitemap 与 hreflang 共用。 */
export const SITE_PATHS = ['/', '/learn', '/practice', '/privacy', '/terms'] as const;

/** Open Graph locale 需使用下划线地区码（zh_CN / pt_BR），与 BCP-47 语言标签不同。 */
export const OG_LOCALES: Record<SupportedLocale, string> = {
  en: 'en_US',
  'zh-CN': 'zh_CN',
  'zh-TW': 'zh_TW',
  es: 'es_ES',
  ar: 'ar_AR',
  fr: 'fr_FR',
  'pt-BR': 'pt_BR',
  de: 'de_DE',
  ja: 'ja_JP',
  ko: 'ko_KR',
  ru: 'ru_RU',
};
