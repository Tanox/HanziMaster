/** @type {import('next').NextConfig} */

// next.config.mjs v5.2.47

import { readFileSync } from 'node:fs';
import createBundleAnalyzer from '@next/bundle-analyzer';
// @sentry/nextjs 为 CJS 包，ESM 配置中须走默认导出互操作
import sentryModule from '@sentry/nextjs';

const { withSentryConfig } = sentryModule;

// 版本号取自 package.json 单一来源；build 编号按构建时刻本地时间生成（yymmddhhmm 的 10 位写法）
const { version: appVersion } = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8')
);
const pad = (n) => String(n).padStart(2, '0');
const now = new Date();
const buildId = `${String(now.getFullYear()).slice(-2)}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}`;

// CSP 与安全头：统一由 headers() 注入所有路由，平台侧不重复配置。
// script-src 'unsafe-inline' 为 Next.js App Router 内联脚本所必需；生产禁用 eval。
// 开发态 React Refresh / Turbopack 依赖 eval，原先无差别禁用会导致 hydration 失败
// （.reveal 元素永不显示、next/dynamic 客户端组件不挂载），故仅 dev 放开。
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
  ...(process.env.NODE_ENV !== 'production' ? ["'unsafe-eval'"] : []),
].join(' ');

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      `script-src ${scriptSrc}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net",
      "object-src 'none'",
      "frame-src 'none'",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  // 不再发送已废弃且可能引入风险的 X-XSS-Protection
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

const nextConfig = {
  reactStrictMode: true,
  // 构建时注入，dev / build 均生效；页脚与移动抽屉从此处读取，杜绝硬编码版本脱节
  env: {
    NEXT_PUBLIC_APP_VERSION: appVersion,
    NEXT_PUBLIC_BUILD_ID: buildId,
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  // 应用不使用 next/image 远程图片；字体由 next/font/google 构建期自托管
  // 因此移除无效的 images.remotePatterns 配置
};

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === '1',
  openAnalyzer: false,
});

let config = withBundleAnalyzer(nextConfig);

// 未配置 DSN 时保持零开销，本地构建不依赖 Sentry 服务端
if (process.env.SENTRY_DSN) {
  config = withSentryConfig(config, {
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    silent: true,
    disableLogger: true,
    tunnelRoute: '/monitoring',
  });
}

export default config;
