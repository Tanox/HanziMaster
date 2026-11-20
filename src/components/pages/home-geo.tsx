// src/components/pages/home-geo.tsx v5.2.49
// GEO：SSR 即可抓取的事实区与 FAQ，给搜索引擎/生成式引擎提供可引用的真实信息。
'use client';

import { useLocale } from '@/components/locale-provider';
import type { TranslationKey } from '@/lib/i18n';

const FACT_KEYS: TranslationKey[] = ['geo.fact1', 'geo.fact2', 'geo.fact3'];
const FAQ_ITEMS: { q: TranslationKey; a: TranslationKey }[] = [
  { q: 'geo.q1', a: 'geo.a1' },
  { q: 'geo.q2', a: 'geo.a2' },
  { q: 'geo.q3', a: 'geo.a3' },
];

export function HomeGeo() {
  const { t } = useLocale();

  return (
    <>
      <section
        id="site-facts"
        aria-labelledby="site-facts-title"
        className="border-t border-ink-200 dark:border-ink-800"
      >
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2
            id="site-facts-title"
            className="display-font text-3xl font-semibold text-ink-900 dark:text-ink-50"
          >
            {t('geo.factsTitle')}
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-600 dark:text-ink-300">
            {t('geo.factsLead')}
          </p>
          <ul id="site-facts-list" className="mt-10 grid gap-6 sm:grid-cols-3">
            {FACT_KEYS.map((key) => (
              <li
                key={key}
                className="border-s-2 border-vermilion-500/40 ps-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300"
              >
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="site-faq"
        aria-labelledby="site-faq-title"
        className="border-t border-ink-200 dark:border-ink-800"
      >
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h2
            id="site-faq-title"
            className="display-font text-3xl font-semibold text-ink-900 dark:text-ink-50"
          >
            {t('geo.faqTitle')}
          </h2>
          <div className="mt-8 divide-y divide-ink-200 dark:divide-ink-800 border-y border-ink-200 dark:border-ink-800">
            {FAQ_ITEMS.map(({ q, a }) => (
              <details key={q} className="group py-4">
                <summary className="cursor-pointer text-base font-medium text-ink-900 dark:text-ink-50">
                  {t(q)}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  {t(a)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
