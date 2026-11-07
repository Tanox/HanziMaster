// src/components/structured-data.tsx v5.2.35

import { SITE_URL } from '@/lib/site';

/** WebApplication JSON-LD：不执行脚本，仅数据块；CSP 的 unsafe-inline 已覆盖。 */
export function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'HanziMaster 汉字大师',
    url: SITE_URL,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any (Web browser)',
    browserRequirements: 'Requires JavaScript, localStorage and Canvas',
    description:
      'Learn Chinese characters with stroke-order demonstrations, Tian-zi-ge writing practice, pinyin quizzes and local progress tracking.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    inLanguage: ['en', 'zh-CN', 'zh-TW', 'es', 'ar', 'fr', 'pt-BR', 'de', 'ja', 'ko', 'ru'],
  };

  // data 为模块内静态常量，不含用户输入；用文本子节点避免 dangerouslySetInnerHTML
  return (
    <script id="structured-data-webapp" type="application/ld+json">
      {JSON.stringify(data)}
    </script>
  );
}
