// src/app/not-found.tsx v5.2.38
import type { Metadata } from 'next';
import NotFoundClient from '@/components/not-found-client';

// 404 页面禁止被搜索引擎收录（P2-15）；交互逻辑在 Client 内核 not-found-client.tsx
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundClient />;
}
