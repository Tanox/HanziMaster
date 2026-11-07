// src/app/learn/layout.tsx v5.2.35

import type { Metadata } from 'next';

// 页面为 Client Component，metadata 由同段 Server layout 提供
export const metadata: Metadata = {
  title: '汉字学习 | Learn Chinese Characters',
  description: '学习 12 个基础汉字的字形、拼音、例句、笔顺与结构，支持发音与键盘切换。',
  alternates: { canonical: '/learn' },
  openGraph: {
    title: '汉字学习 | HanziMaster',
    description: 'Learn Chinese characters with stroke order, pinyin and examples.',
    url: '/learn',
  },
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
