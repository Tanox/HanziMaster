// sentry.server.config.ts v5.2.35

import * as Sentry from '@sentry/nextjs';

/** 仅配置 DSN 时初始化；采样率保守，避免生产流量产生过高配额消耗。 */
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 0.1,
  });
}
