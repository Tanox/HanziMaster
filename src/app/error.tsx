// src/app/error.tsx v5.2.31
'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/components/state/state-views';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorState className="min-h-[60vh]" onRetry={reset} />;
}
