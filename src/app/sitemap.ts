// src/app/sitemap.ts v5.2.49

import type { MetadataRoute } from 'next';
import { SITE_PATHS, SITE_URL, SUPPORTED_LOCALES } from '@/lib/site';
import { localizedHref, localizePath } from '@/lib/urls';

/** 只收录带语言前缀的规范 URL（无前缀 URL 会 302，不应进 sitemap），并为每条补 hreflang 组。 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = (path: string) =>
    Object.fromEntries(
      SUPPORTED_LOCALES.map((item) => [item, `${SITE_URL}${localizePath(item, path)}`]),
    );

  return SITE_PATHS.flatMap((path) =>
    SUPPORTED_LOCALES.map((locale) => {
      const canonical = localizedHref(locale, path);
      return {
        url: `${SITE_URL}${canonical}`,
        lastModified,
        changeFrequency: path === '/' ? ('weekly' as const) : ('monthly' as const),
        priority: locale === 'en' ? (path === '/' ? 1 : 0.7) : 0.6,
        alternates: { languages: languages(canonical) },
      };
    }),
  );
}
