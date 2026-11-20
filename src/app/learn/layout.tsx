// src/app/learn/layout.tsx v5.2.49

import type { Metadata } from 'next';
import { getPageSeo } from '@/lib/seo-metadata';

// 页面为 Client Component，metadata 由同段 Server layout 提供；
// canonical / hreflang / OG 统一由根 layout 按语言前缀生成，避免子级覆盖成无前缀 URL。
export const generateMetadata = async (): Promise<Metadata> => getPageSeo('learnTitle');

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
