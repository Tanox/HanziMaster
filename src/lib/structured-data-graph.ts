// src/lib/structured-data-graph.ts v5.2.57
// JSON-LD @graph 纯函数：按语言与路由生成页面级 WebPage / FAQPage / BreadcrumbList。
// 服务端布局与客户端切语言共用，避免结构化数据与实际页面内容不一致。
import { SITE_URL, SUPPORTED_LOCALES, type SupportedLocale } from './site';
import { localizePath, localizedHref } from './urls';
import { isHomePath, pageTitle } from './seo-page';
import { geoByLocale } from '@/lib/i18n/translations/extensions/geo';

type JsonLdNode = Record<string, unknown>;

/** FAQ 只在首页正文出现；其余页面用 BreadcrumbList，避免声明页面没有的内容。 */
export function buildStructuredDataGraph(locale: SupportedLocale, path: string) {
  const geo = geoByLocale[locale] ?? geoByLocale.en;
  const pageUrl = `${SITE_URL}${localizePath(locale, path)}`;
  const homeUrl = `${SITE_URL}${localizedHref(locale, '/')}`;
  const websiteId = `${SITE_URL}/#website`;
  const orgId = `${SITE_URL}/#organization`;
  const title = pageTitle(locale, path);

  const graph: JsonLdNode[] = [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: homeUrl,
      name: 'HanziMaster 汉字大师',
      alternateName: 'HanziMaster',
      inLanguage: locale,
    },
    {
      '@type': 'Organization',
      '@id': orgId,
      name: 'HanziMaster 汉字大师',
      url: homeUrl,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.svg` },
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      inLanguage: locale,
      isPartOf: { '@id': websiteId },
      about: { '@id': orgId },
    },
    {
      '@type': 'WebApplication',
      '@id': `${SITE_URL}/#app`,
      name: 'HanziMaster 汉字大师',
      url: homeUrl,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any (Web browser)',
      browserRequirements: 'Requires JavaScript, localStorage and Canvas',
      description: geo.factsLead,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      inLanguage: [...SUPPORTED_LOCALES],
      publisher: { '@id': orgId },
      isAccessibleForFree: true,
    },
    {
      '@type': 'Course',
      '@id': `${homeUrl}#course`,
      name: 'HanziMaster: 12 foundational Chinese characters',
      description: geo.fact2,
      teaches: geo.fact1,
      provider: { '@id': orgId },
      isAccessibleForFree: true,
      inLanguage: [locale, 'en'],
      hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online' },
    },
  ];

  if (isHomePath(path)) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      url: pageUrl,
      inLanguage: locale,
      mainEntity: [
        { '@type': 'Question', name: geo.q1, acceptedAnswer: { '@type': 'Answer', text: geo.a1 } },
        { '@type': 'Question', name: geo.q2, acceptedAnswer: { '@type': 'Answer', text: geo.a2 } },
        { '@type': 'Question', name: geo.q3, acceptedAnswer: { '@type': 'Answer', text: geo.a3 } },
      ],
    });
  } else {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'HanziMaster', item: homeUrl },
        { '@type': 'ListItem', position: 2, name: title, item: pageUrl },
      ],
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
