// src/components/breadcrumbs.tsx v5.2.57
// 非首页面包屑：语义化 nav/ol；文案与 JSON-LD BreadcrumbList 共用 pageTitle 映射。
// 纯展示组件（无 hooks / 无 server-only API），可在 Server 与 Client 页面中复用。
import Link from 'next/link';
import type { SupportedLocale } from '@/lib/site';
import { localizedHref } from '@/lib/urls';
import { isHomePath, pageTitle } from '@/lib/seo-page';

export function Breadcrumbs({ locale, path }: { locale: SupportedLocale; path: string }) {
  if (isHomePath(path)) return null;

  return (
    <nav id="breadcrumbs" aria-label="Breadcrumb" className="mb-6 text-sm text-ink-500 dark:text-ink-400">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href={localizedHref(locale, '/')} className="hover:text-vermilion-600 dark:hover:text-vermilion-400">
            HanziMaster
          </Link>
        </li>
        <li className="before:me-2 before:content-['/']" aria-current="page">
          {pageTitle(locale, path)}
        </li>
      </ol>
    </nav>
  );
}
