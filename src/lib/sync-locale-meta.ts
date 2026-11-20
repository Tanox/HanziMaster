// src/lib/sync-locale-meta.ts v5.2.57
// 客户端切语言时同步 head 元数据与 JSON-LD：URL 前缀路由不重跑 RSC generateMetadata，需手动对齐。
import { isSupportedLocale, OG_LOCALES, type SupportedLocale } from './site';
import { clientMetadataPatch } from './seo-page';
import { buildStructuredDataGraph } from './structured-data-graph';

/** 替换 URL 中的语言前缀，保留 origin 与尾斜杠（首页 /{locale}/ 是规范形式）。 */
export const withLocale = (href: string, value: string): string => {
  try {
    const url = new URL(href, window.location.origin);
    const parts = url.pathname.split('/').filter(Boolean);
    const rest = parts[0] && isSupportedLocale(parts[0]) ? parts.slice(1) : parts;
    url.pathname = `/${value}${rest.length ? '/' + rest.join('/') : '/'}`;
    return url.toString();
  } catch {
    return href;
  }
};

const setMeta = (selector: string, content: string): void => {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
};

/** 同步 canonical / hreflang / og:locale / title / description / OG / Twitter / JSON-LD。 */
export const syncMetadataLocale = (value: SupportedLocale): void => {
  const path = window.location.pathname;
  const patch = clientMetadataPatch(value, path);

  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const href = canonical?.getAttribute('href');
  if (href) canonical?.setAttribute('href', withLocale(href, value));
  document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]').forEach((link) => {
    const hreflang = link.getAttribute('hreflang');
    const target = link.getAttribute('href');
    if (hreflang && isSupportedLocale(hreflang) && target) {
      link.setAttribute('href', withLocale(target, hreflang));
    }
  });

  document.title = patch.title;
  setMeta('meta[name="description"]', patch.description);
  setMeta('meta[property="og:locale"]', OG_LOCALES[value]);
  setMeta('meta[property="og:title"]', patch.ogTitle);
  setMeta('meta[property="og:description"]', patch.ogDescription);
  setMeta('meta[name="twitter:title"]', patch.ogTitle);
  setMeta('meta[name="twitter:description"]', patch.ogDescription);

  const jsonLd = document.getElementById('structured-data');
  if (jsonLd) {
    jsonLd.textContent = JSON.stringify(buildStructuredDataGraph(value, path));
  }
};
