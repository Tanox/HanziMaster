// src/components/google-analytics.tsx v5.2.17
import Script from 'next/script';

// Google Analytics 衡量 ID（来自用户配置）
const GA_MEASUREMENT_ID = 'G-TZG68T8J31';

// 仅生产环境上报：开发/预览/构建期不向 GA 发送数据，避免污染统计
const ENABLE_ANALYTICS = process.env.NODE_ENV === 'production';

/**
 * 全局 Google Analytics 注入组件。
 * 使用 Next.js next/script 在 <head> 中加载 gtag.js，
 * 并初始化衡量 ID 对应的数据收集。
 * 通过 ENABLE_ANALYTICS 控制仅在 production 环境上报。
 */
export function GoogleAnalytics() {
  if (!ENABLE_ANALYTICS) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
