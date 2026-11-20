// src/lib/build-metadata.ts v5.2.49
// 纯函数构造 metadata：与 Next 请求上下文解耦，便于单测覆盖 11 语言 canonical / hreflang / OG。
import type { Metadata } from 'next';
import { OG_LOCALES, SITE_URL, SUPPORTED_LOCALES, type SupportedLocale } from './site';
import { localizePath, stripLocalePrefix } from './urls';
import { seoByLocale } from '@/lib/i18n/translations/extensions/seo';

export function buildMetadata(locale: SupportedLocale, path: string): Metadata {
  const seo = seoByLocale[locale] ?? seoByLocale.en;
  const canonical = localizePath(locale, path);
  const languages = Object.fromEntries(
    SUPPORTED_LOCALES.map((item) => [item, localizePath(item, path)]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: seo.title, template: '%s | HanziMaster 汉字大师' },
    description: seo.description,
    applicationName: 'HanziMaster',
    keywords: [
      'Chinese',
      'Hanzi',
      '汉字',
      '笔顺',
      'Stroke Order',
      'Tian-zi-ge',
      'Learning',
      'Education',
    ],
    authors: [{ name: 'HanziMaster Team' }],
    category: 'education',
    alternates: {
      canonical,
      languages: { ...languages, 'x-default': stripLocalePrefix(path) },
    },
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      type: 'website',
      url: canonical,
      siteName: 'HanziMaster',
      locale: OG_LOCALES[locale],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.ogTitle,
      description: seo.ogDescription,
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    icons: { icon: '/icon.svg' },
    manifest: '/manifest.webmanifest',
  };
}
