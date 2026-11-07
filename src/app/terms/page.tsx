// src/app/terms/page.tsx v5.2.35

import Link from 'next/link';
import type { Metadata } from 'next';
import { TERMS_UPDATED, termsSections } from '@/content/terms';

export const metadata: Metadata = {
  title: '服务条款 | HanziMaster 汉字大师',
  description: 'HanziMaster 汉字大师的服务条款：教育用途、本地数据、开源许可与责任说明。',
  alternates: { canonical: '/terms' },
};

/** 静态合规页面：Server Component 渲染，双语并列。 */
export default function TermsPage() {
  return (
    <main id="terms-page" className="mx-auto w-full max-w-3xl px-6 py-16">
      <header id="terms-page-header" className="mb-12">
        <h1 className="text-3xl font-bold text-foreground">服务条款</h1>
        <p lang="en" className="mt-2 text-xl text-muted-foreground">Terms of Service</p>
        <p className="mt-4 text-sm text-muted-foreground">最后更新 / Last updated: {TERMS_UPDATED}</p>
      </header>

      <div id="terms-sections" className="space-y-10">
        {termsSections.map((section) => (
          <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
            <h2 id={`${section.id}-title`} className="text-xl font-semibold text-foreground">
              {section.title}
            </h2>
            <p lang="en" className="mt-1 text-sm text-muted-foreground">{section.titleEn}</p>
            {section.paragraphs.map((paragraph, index) => (
              <div key={index} className="mt-4">
                <p className="leading-relaxed text-foreground/90">{paragraph}</p>
                <p lang="en" className="mt-2 leading-relaxed text-muted-foreground">
                  {section.paragraphsEn[index]}
                </p>
              </div>
            ))}
          </section>
        ))}
      </div>

      <footer id="terms-page-footer" className="mt-12 border-t border-border pt-6">
        <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
          隐私政策 / Privacy Policy
        </Link>
      </footer>
    </main>
  );
}
