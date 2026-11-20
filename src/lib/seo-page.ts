// src/lib/seo-page.ts v5.2.57
// 页面级 SEO 文案单一映射：UI 面包屑、JSON-LD 与客户端切语言元数据共用，避免第二套映射。
import type { SupportedLocale } from './site';
import { stripLocalePrefix } from './urls';
import { seoByLocale } from '@/lib/i18n/translations/extensions/seo';

type SeoPageKey = 'learnTitle' | 'practiceTitle' | 'privacyTitle' | 'termsTitle';

const PAGE_KEYS: Record<string, SeoPageKey> = {
  '/learn': 'learnTitle',
  '/practice': 'practiceTitle',
  '/privacy': 'privacyTitle',
  '/terms': 'termsTitle',
};

/** 首页路径判定：接受 /、/zh-CN/ 与空路径，供 FAQ 与面包屑共用。 */
export const isHomePath = (path: string): boolean => {
  const clean = stripLocalePrefix(path);
  return clean === '/' || clean === '';
};

/** 当前页面的本地化标题；未知路径回退到站点标题，不臆造词条。 */
export function pageTitle(locale: SupportedLocale, path: string): string {
  const seo = seoByLocale[locale] ?? seoByLocale.en;
  const key = PAGE_KEYS[stripLocalePrefix(path)];
  return key ? seo[key] : seo.title;
}

/** 客户端切换语言时同步 <title> / description / OG / Twitter 的完整文案（与 generateMetadata 的 template 一致）。 */
export function clientMetadataPatch(
  locale: SupportedLocale,
  path: string,
): { title: string; description: string; ogTitle: string; ogDescription: string } {
  const seo = seoByLocale[locale] ?? seoByLocale.en;
  const key = PAGE_KEYS[stripLocalePrefix(path)];
  return {
    title: key ? `${seo[key]} | HanziMaster 汉字大师` : seo.title,
    description: seo.description,
    ogTitle: seo.ogTitle,
    ogDescription: seo.ogDescription,
  };
}
