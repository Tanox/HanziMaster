// src/app/sitemap.ts v5.2.44

import type { MetadataRoute } from 'next';
import { SITE_PATHS, SITE_URL, SUPPORTED_LOCALES } from '@/lib/site';

/** 主路径 + 各语言前缀 URL（P1-8）；合规页面同样可索引。 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of SITE_PATHS) {
    entries.push({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: path === '/' ? 'weekly' : 'monthly',
      priority: path === '/' ? 1 : 0.7,
    });
    for (const locale of SUPPORTED_LOCALES) {
      const localized = path === '/' ? `/${locale}/` : `/${locale}${path}`;
      entries.push({
        url: `${SITE_URL}${localized}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
  }

  return entries;
}
