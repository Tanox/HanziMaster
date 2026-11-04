// src/lib/version.ts v5.2.27
// 版本号与 build 编号唯一来源：next.config.mjs 在 dev / build 时从 package.json 注入

export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '0.0.0-dev';

export const BUILD_ID = process.env.NEXT_PUBLIC_BUILD_ID || '';

export const VERSION_LABEL = BUILD_ID
  ? `v${APP_VERSION} · build ${BUILD_ID}`
  : `v${APP_VERSION}`;
