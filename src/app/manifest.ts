// src/app/manifest.ts v5.2.35

import type { MetadataRoute } from 'next';
import { cookies, headers } from 'next/headers';
import { LOCALE_COOKIE, resolveLocale } from '@/lib/request-locale';
import { isRtlLocale } from '@/lib/site';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  // manifest.webmanifest 带点号被 proxy matcher 排除，因此从 cookie 读取已解析的语言
  const locale = resolveLocale(await headers(), (await cookies()).get(LOCALE_COOKIE)?.value);
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
