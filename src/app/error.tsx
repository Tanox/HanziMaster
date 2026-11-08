// src/app/error.tsx v5.2.44
'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/components/state/state-views';
import { logger } from '@/lib/logger';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error('页面级错误边界捕获异常', { error, digest: error.digest });
  }, [error]);

  return <ErrorState className="min-h-[60vh]" onRetry={reset} />;
}
