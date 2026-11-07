// src/app/practice/layout.tsx v5.2.35

import type { Metadata } from 'next';

// 页面为 Client Component，metadata 由同段 Server layout 提供
export const metadata: Metadata = {
  title: '书写练习 | Handwriting Practice',
  description: '在田字格中练习汉字书写，配合拼音测验与本地学习进度统计。',
  alternates: { canonical: '/practice' },
  openGraph: {
    title: '书写练习 | HanziMaster',
    description: 'Practice Chinese handwriting with a Tian-zi-ge canvas and pinyin quizzes.',
    url: '/practice',
  },
};

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
