// src/components/not-found-client.tsx v5.2.38
'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from '@/components/locale-provider';
import { ErrorState } from '@/components/state/state-views';

// 404 页面交互内核：由 app/not-found.tsx（Server 外壳）渲染，负责文案与返回首页
export default function NotFoundClient() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <ErrorState
      className="min-h-[60vh]"
      title={t('common.notFoundTitle')}
      description={t('common.notFoundDesc')}
      retryLabel={t('common.backHome')}
      onRetry={() => router.push('/')}
    />
  );
}
