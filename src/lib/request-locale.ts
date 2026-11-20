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

/** 原始请求路径（含语言前缀）；仅接受站内安全路径，避免把任意字符串带入 metadata。 */
export const resolvePath = (headers: Headers): string => {
  const raw = headers.get(PATH_HEADER) ?? '/';
  return raw.startsWith('/') && raw.length <= 256 && !raw.includes('..') && !raw.includes('\\')
    ? raw
    : '/';
};
