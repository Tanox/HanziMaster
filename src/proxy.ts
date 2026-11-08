// src/proxy.ts v5.2.44
// P1-7：URL 级 i18n。/ {locale}/... 前缀由 proxy 重写到既有页面 + ?lang=，
// 因此无需复制三套页面，且 /、/learn、/practice 等旧深链保持可用。
import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, isSupportedLocale } from '@/lib/site';

const LOCALE_COOKIE = 'hanzi-master-locale';

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
      (locale) => locale.toLowerCase() === tag || locale.toLowerCase().split('-')[0] === tag.split('-')[0]
    );
    if (match) return match;
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];

  // 语言前缀：重写到无前缀页面，同时把语言通过 ?lang= 与 cookie 传给首屏
  if (first && isSupportedLocale(first)) {
    const url = request.nextUrl.clone();
    url.pathname = '/' + segments.slice(1).join('/');
    url.searchParams.set('lang', first);
    const response = NextResponse.rewrite(url);
    response.cookies.set(LOCALE_COOKIE, first, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    return response;
  }

  // 无前缀旧深链（/learn、/practice、/privacy、/terms 与 /）：
  // 按协商语言给出本地化 URL，保留查询参数；避免 404 且语言由 cookie 延续。
  const url = request.nextUrl.clone();
  const rest = segments.join('/');
  url.pathname = `/${negotiateLocale(request)}/${rest ? `${rest}` : ''}`;
  if (search) url.search = search;
  return NextResponse.redirect(url, 302);
}

export const config = {
  matcher: ['/((?!_next/|api/|.*\\.).*)'],
};
