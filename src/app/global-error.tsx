// src/app/global-error.tsx v5.2.45
'use client';

import { useEffect, useState } from 'react';
import { captureException } from '@sentry/nextjs';
import { isRtlLocale, isSupportedLocale } from '@/lib/site';

/** 根级错误边界：必须自带 html/body，且不依赖任何 Provider。 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // 根错误边界不套 Provider：从 proxy 写入的 locale cookie 恢复语言与方向，避免 RTL 用户看到 LTR 错误页
  const [locale, setLocale] = useState('zh-CN');
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      captureException(error);
    }
    try {
      const raw = document.cookie.match(/(?:^|;\s*)hanzi-master-locale=([^;]+)/)?.[1];
      const value = raw ? decodeURIComponent(raw) : '';
      if (isSupportedLocale(value)) setLocale(value);
    } catch {
      // cookie 值畸形时保留默认语言
    }
  }, [error]);

  return (
    <html lang={locale} dir={isRtlLocale(locale) ? 'rtl' : 'ltr'}>
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
