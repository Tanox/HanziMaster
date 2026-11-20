// src/proxy.ts v5.2.50
// P1-7：URL 级 i18n。Next.js 16 的中间件文件约定为 proxy.ts（middleware.ts 已弃用并告警），
// /{locale}/... 前缀由本文件重写到既有页面 + ?lang=，因此无需复制多套页面，
// 且 /、/learn、/practice 等旧深链保持可用；首访按 Accept-Language 协商重定向到语言前缀。
// P0-31：rewrite 时把语言与原始路径注入请求头，供 RSC 首屏直接输出正确 lang / 词典 / metadata。
import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isSupportedLocale } from '@/lib/site';
import { LOCALE_COOKIE, LOCALE_HEADER, PATH_HEADER } from '@/lib/request-locale';

/** 从浏览器 Accept-Language 推断首选语言（首访 / 时用于生成语言前缀）。 */
function negotiateLocale(request: NextRequest): string {
  const fromUrl = request.nextUrl.searchParams.get('lang');
  if (fromUrl && isSupportedLocale(fromUrl)) return fromUrl;
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isSupportedLocale(cookie)) return cookie;
  const header = request.headers.get('accept-language') ?? '';
  for (const part of header.split(',')) {
    const tag = part.split(';')[0].trim().toLowerCase();
    const match = SUPPORTED_LOCALES.find(
      (locale) =>
        locale.toLowerCase() === tag || locale.toLowerCase().split('-')[0] === tag.split('-')[0],
    );
    if (match) return match;
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];

  // 语言前缀：重写到无前缀页面；?lang= 供旧逻辑、cookie 供后续请求、
  // 请求头供本次 RSC 首屏（避免 SSR 先输出英文再由客户端切换的语言闪烁）。
  if (first && isSupportedLocale(first)) {
    const url = request.nextUrl.clone();
    url.pathname = '/' + segments.slice(1).join('/');
    url.searchParams.set('lang', first);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(LOCALE_HEADER, first);
    requestHeaders.set(PATH_HEADER, pathname);
    const response = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    response.cookies.set(LOCALE_COOKIE, first, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    return response;
  }

  // 无前缀旧深链（/learn、/practice、/privacy、/terms 与 /）：
  // 按协商语言给出本地化 URL，保留查询参数；避免 404 且语言由 cookie 延续。
  // 根路径显式补尾斜杠，与 layout.tsx 的 hreflang `/{locale}/` 保持一致。
  const url = request.nextUrl.clone();
  const rest = segments.join('/');
  const locale = negotiateLocale(request);
  url.pathname = rest ? `/${locale}/${rest}` : `/${locale}/`;
  if (search) url.search = search;
  return NextResponse.redirect(url, 302);
}

export const config = {
  // /monitoring 是 Sentry tunnel（next.config.mjs），不得被 302 到语言前缀，否则 POST 上报丢失
  matcher: ['/((?!_next/|api/|monitoring|.*\\.).*)'],
};
