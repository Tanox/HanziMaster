// src/app/privacy/page.tsx v5.2.35

import Link from 'next/link';
import { PRIVACY_UPDATED, privacySections } from '@/content/privacy';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '隐私政策 | HanziMaster 汉字大师',
  description: 'HanziMaster 汉字大师的隐私政策：本地存储、统计同意与浏览器能力说明。',
  alternates: { canonical: '/privacy' },
};

/** 静态合规页面：Server Component 渲染，双语并列，避免随界面语言切换缺漏。 */
export default function PrivacyPage() {
  return (
    <main id="privacy-page" className="mx-auto w-full max-w-3xl px-6 py-16">
      <header id="privacy-page-header" className="mb-12">
        <h1 className="text-3xl font-bold text-foreground">隐私政策</h1>
        <p lang="en" className="mt-2 text-xl text-muted-foreground">Privacy Policy</p>
        <p className="mt-4 text-sm text-muted-foreground">最后更新 / Last updated: {PRIVACY_UPDATED}</p>
      </header>

      <div id="privacy-sections" className="space-y-10">
        {privacySections.map((section) => (
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

      <footer id="privacy-page-footer" className="mt-12 border-t border-border pt-6">
        <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
          服务条款 / Terms of Service
        </Link>
      </footer>
    </main>
  );
}
