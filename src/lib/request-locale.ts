// src/lib/request-locale.ts v5.2.49
// proxy 在 rewrite 时把原始语言与路径注入请求头，供 RSC（layout / generateMetadata / 合规页）首屏直接读取。
import { DEFAULT_LOCALE, isSupportedLocale, type SupportedLocale } from './site';

export const LOCALE_HEADER = 'x-hanzi-locale';
export const PATH_HEADER = 'x-hanzi-path';
export const LOCALE_COOKIE = 'hanzi-master-locale';

/** 优先级：proxy 注入的语言头（URL 前缀）> cookie > 默认语言。 */
export const resolveLocale = (headers: Headers, cookie?: string): SupportedLocale => {
  const fromHeader = headers.get(LOCALE_HEADER);
  if (fromHeader && isSupportedLocale(fromHeader)) return fromHeader;
  if (cookie && isSupportedLocale(cookie)) return cookie;
  return DEFAULT_LOCALE;
};

/**
 * 解析 Accept-Language（含 q 权重），返回按优先级排序的受支持语言。
 * 精确标签先于主干标签，避免 zh-TW 被排序靠前的 zh-CN 主干匹配抢占；繁体书写系统统一 zh-TW。
 */
export const negotiateLocales = (header: string): SupportedLocale[] => {
  const entries = header
    .split(',')
    .map((part, index) => {
      const [tagPart, ...params] = part.trim().split(';');
      const tag = tagPart.trim().toLowerCase();
      const qParam = params.find((p) => p.trim().startsWith('q='));
      const q = qParam ? Number(qParam.trim().slice(2)) : 1;
      return { tag, q: Number.isFinite(q) ? q : 0, index };
    })
    .filter((entry) => entry.tag && entry.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);

  const result: SupportedLocale[] = [];
  const push = (locale: SupportedLocale) => {
    if (!result.includes(locale)) result.push(locale);
  };
  for (const { tag } of entries) {
    const exact = SUPPORTED_LOCALES.find((locale) => locale.toLowerCase() === tag);
    if (exact) {
      push(exact);
      continue;
    }
    if (tag === 'zh-hant' || tag === 'zh-hk' || tag === 'zh-mo') {
      push('zh-TW');
      continue;
    }
    const base = tag.split('-')[0];
    const match = SUPPORTED_LOCALES.find((locale) => locale.toLowerCase().split('-')[0] === base);
    if (match) push(match);
  }
  return result;
};

/** 原始请求路径（含语言前缀）；仅接受站内安全路径，避免把任意字符串带入 metadata。 */
export const resolvePath = (headers: Headers): string => {
  const raw = headers.get(PATH_HEADER) ?? '/';
  return raw.startsWith('/') && raw.length <= 256 && !raw.includes('..') && !raw.includes('\\')
    ? raw
    : '/';
};
