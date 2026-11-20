// src/lib/seo-metadata.ts v5.2.49
// 子页面共享的服务端 metadata：标题按语言取，canonical / hreflang / OG 由根 layout 统一生成。
import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { resolveLocale } from './request-locale';
import { seoByLocale } from '@/lib/i18n/translations/extensions/seo';

export type PageSeoKey = 'learnTitle' | 'practiceTitle' | 'privacyTitle' | 'termsTitle';

export async function getPageSeo(key: PageSeoKey): Promise<Metadata> {
  const locale = resolveLocale(await headers());
  const seo = seoByLocale[locale] ?? seoByLocale.en;
  return { title: seo[key], description: seo.description };
}
