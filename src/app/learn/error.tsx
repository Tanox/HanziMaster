// src/app/learn/error.tsx v5.2.35
'use client';

import { useEffect } from 'react';
import { captureException } from '@sentry/nextjs';
import { useTranslation } from '@/components/locale-provider';

/** /learn 段错误边界：保留站点布局，提供重试入口。 */
export default function LearnError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      captureException(error);
    }
  }, [error]);

  return (
    <section id="learn-error-panel" role="alert" className="mx-auto max-w-lg px-6 py-20 text-center">
      <h1 className="text-2xl font-semibold text-foreground">{t('common.errorTitle')}</h1>
      <p className="mt-3 text-sm text-muted-foreground">{t('common.errorDesc')}</p>
      <button
        id="learn-error-retry"
        type="button"
        onClick={reset}
        className="mt-6 rounded-xl bg-primary px-5 py-2 text-sm text-primary-foreground"
      >
        {t('common.retry')}
      </button>
    </section>
  );
}
