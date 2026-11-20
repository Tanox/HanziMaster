// src/app/practice/layout.tsx v5.2.49

import type { Metadata } from 'next';
import { getPageSeo } from '@/lib/seo-metadata';

// canonical / hreflang / OG 由根 layout 统一生成，子级只提供本地化标题与描述。
export const generateMetadata = async (): Promise<Metadata> => getPageSeo('practiceTitle');

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
