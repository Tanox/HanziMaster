// src/components/google-analytics.tsx v5.2.35
'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { CONSENT_CHANGE_EVENT, getConsent } from '@/lib/consent';

// 衡量 ID 由部署环境注入；未配置时不加载任何统计脚本（合规默认关闭）
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * 统计脚本注入：三重门控 —— 仅生产环境 + 用户明确同意 + 客户端挂载后。
 * 未同意时组件不渲染任何 <script>，因此首屏不会向第三方发起请求。
 */
export function GoogleAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => {
      setAllowed(process.env.NODE_ENV === 'production' && getConsent() === 'granted');
    };
    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  if (!allowed || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        id="google-analytics-lib"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
