// src/app/not-found.tsx v5.2.31
'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from '@/components/locale-provider';
import { ErrorState } from '@/components/state/state-views';

export default function NotFound() {
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
