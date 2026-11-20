// src/lib/urls.ts v5.2.49
// 站内链接统一带语言前缀：URL 可分享、可索引，且不再经过 proxy 的 302 协商跳转。
import { isSupportedLocale, type SupportedLocale } from './site';

/** `/learn` → `/zh-CN/learn`；`/` → `/zh-CN/`（与 hreflang 的尾斜杠一致）。 */
export const localizedHref = (locale: SupportedLocale, path: string): string => {
  const clean = path === '/' || path === '' ? '' : path.startsWith('/') ? path : `/${path}`;
  return clean ? `/${locale}${clean}` : `/${locale}/`;
};

/** 去掉语言前缀供 active 判定：/zh-CN/learn → /learn；/zh-CN/ → /。 */
export const stripLocalePrefix = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length && isSupportedLocale(segments[0])) {
    return `/${segments.slice(1).join('/')}`;
  }
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
};

/** hreflang / sitemap 共用的路径生成器：把带语言前缀的原始路径换成另一语言。 */
export const localizePath = (locale: SupportedLocale, path: string): string => {
  const segments = path.split('/').filter(Boolean);
  const rest = segments.length && isSupportedLocale(segments[0]) ? segments.slice(1) : segments;
  return localizedHref(locale, rest.length ? `/${rest.join('/')}` : '/');
};
