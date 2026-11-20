// src/app/manifest.ts v5.2.35

import type { MetadataRoute } from 'next';
import { cookies, headers } from 'next/headers';
import { LOCALE_COOKIE, negotiateLocales } from '@/lib/request-locale';
import { DEFAULT_LOCALE, isRtlLocale, isSupportedLocale } from '@/lib/site';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  // manifest.webmanifest 带点号被 proxy matcher 排除：先读 cookie，首访再按 Accept-Language（含 q 权重）协商
  const cookie = (await cookies()).get(LOCALE_COOKIE)?.value;
  const fromCookie = cookie && isSupportedLocale(cookie) ? cookie : null;
  const fromHeader = negotiateLocales((await headers()).get('accept-language') ?? '')[0] ?? null;
  const locale = fromCookie ?? fromHeader ?? DEFAULT_LOCALE;
  return {
    name: 'HanziMaster 汉字大师',
    short_name: 'HanziMaster',
    description: 'Interactive Chinese character learning with stroke-order practice.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf9f6',
    theme_color: '#c53d43',
    lang: locale,
    dir: isRtlLocale(locale) ? 'rtl' : 'ltr',
    categories: ['education', 'productivity'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
  };
}
