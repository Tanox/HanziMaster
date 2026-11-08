// src/app/global-error.tsx v5.2.45
'use client';

import { useEffect } from 'react';
import { captureException } from '@sentry/nextjs';

/** 根级错误边界：必须自带 html/body，且不依赖任何 Provider。 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      captureException(error);
    }
  }, [error]);

  return (
    <html lang="zh-CN">
      <body id="global-error-body" className="flex min-h-screen items-center justify-center bg-white p-6 text-slate-900">
        <div id="global-error-panel" role="alert" className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">应用出现错误</h1>
          <p lang="en" className="mt-2 text-sm text-slate-600">Something went wrong.</p>
          <button
            id="global-error-retry"
            type="button"
            onClick={reset}
            className="mt-6 rounded-xl bg-rose-600 px-5 py-2 text-sm text-white"
          >
            重试 / Retry
          </button>
        </div>
      </body>
    </html>
  );
}
