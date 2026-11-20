// src/components/structured-data.tsx v5.2.49
// JSON-LD @graph：为搜索引擎与生成式引擎提供可引用的站点、应用、课程与 FAQ 事实。
import { SITE_URL, SUPPORTED_LOCALES, type SupportedLocale } from '@/lib/site';
import { geoByLocale } from '@/lib/i18n/translations/extensions/geo';

export function StructuredData({ locale }: { locale: SupportedLocale }) {
  const geo = geoByLocale[locale] ?? geoByLocale.en;
  const websiteId = `${SITE_URL}/#website`;
  const orgId = `${SITE_URL}/#organization`;

  const graph = [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: SITE_URL,
      name: 'HanziMaster 汉字大师',
      alternateName: 'HanziMaster',
      inLanguage: locale,
    },
    {
      '@type': 'Organization',
      '@id': orgId,
      name: 'HanziMaster 汉字大师',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.svg` },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: 'HanziMaster 汉字大师',
      inLanguage: locale,
      isPartOf: { '@id': websiteId },
      about: { '@id': orgId },
    },
    {
      '@type': 'WebApplication',
      '@id': `${SITE_URL}/#app`,
      name: 'HanziMaster 汉字大师',
      url: SITE_URL,
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
      '@id': `${SITE_URL}/#course`,
      name: 'HanziMaster: 12 foundational Chinese characters',
      description: geo.fact2,
      teaches: geo.fact1,
      provider: { '@id': orgId },
      isAccessibleForFree: true,
      inLanguage: [locale, 'en'],
      hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online' },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        { '@type': 'Question', name: geo.q1, acceptedAnswer: { '@type': 'Answer', text: geo.a1 } },
        { '@type': 'Question', name: geo.q2, acceptedAnswer: { '@type': 'Answer', text: geo.a2 } },
        { '@type': 'Question', name: geo.q3, acceptedAnswer: { '@type': 'Answer', text: geo.a3 } },
      ],
    },
  ];

  // 数据全部来自静态常量与已校验的 locale；用文本子节点避免 dangerouslySetInnerHTML。
  return (
    <script id="structured-data" type="application/ld+json">
      {JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}
    </script>
  );
}
