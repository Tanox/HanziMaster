// src/lib/site.ts v5.2.50

/**
 * 站点级常量。部署时必须通过 NEXT_PUBLIC_SITE_URL 指定正式域名，
 * 未配置时回退本地地址，绝不猜测生产域名。
 */
export const DEFAULT_SITE_URL = 'http://localhost:3000';

/** 只接受绝对 http(s) URL；非法值（如缺协议的 example.com）会让 new URL() 在 metadata/构建期抛错。 */
const normalizeSiteUrl = (value: string): string | null => {
  try {
    const url = new URL(value);
    // query / hash / 重复尾斜杠会让 sitemap 等处的字符串拼接产生畸形绝对 URL
    if (url.search || url.hash || value.slice(url.protocol.length + 2).includes('//')) return null;
    return url.protocol === 'http:' || url.protocol === 'https:' ? value.replace(/\/+$/, '') : null;
  } catch {
    return null;
  }
};

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const normalizedSiteUrl = configuredSiteUrl ? normalizeSiteUrl(configuredSiteUrl) : null;
export const SITE_URL = normalizedSiteUrl ?? DEFAULT_SITE_URL;
export const SITE_URL_CONFIGURED = Boolean(configuredSiteUrl);
export const SITE_URL_INVALID = Boolean(configuredSiteUrl) && normalizedSiteUrl === null;

/** 生产漏配或配置非法绝对 URL 时返回明确告警（不阻断构建）；纯函数便于单测与脚本复用。 */
export const getSiteUrlWarning = (env: NodeJS.ProcessEnv = process.env): string | null => {
  if (env.NODE_ENV !== 'production') return null;
  if (!env.NEXT_PUBLIC_SITE_URL) {
    return `NEXT_PUBLIC_SITE_URL is not set in production; canonical/hreflang/sitemap/robots fall back to ${DEFAULT_SITE_URL}`;
  }
  if (!normalizeSiteUrl(env.NEXT_PUBLIC_SITE_URL)) {
    return `NEXT_PUBLIC_SITE_URL="${env.NEXT_PUBLIC_SITE_URL}" is not a valid absolute http(s) URL; falling back to ${DEFAULT_SITE_URL}`;
  }
  return null;
};

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
  ar: 'ar_SA',
  fr: 'fr_FR',
  'pt-BR': 'pt_BR',
  de: 'de_DE',
  ja: 'ja_JP',
  ko: 'ko_KR',
  ru: 'ru_RU',
};
