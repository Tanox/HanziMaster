// src/lib/error-reporting.ts v5.2.35

import { captureException } from '@sentry/nextjs';

export interface ErrorContext {
  path?: string;
  method?: string;
  route?: string;
}

/**
 * 统一错误上报入口。Sentry 未配置 DSN 时不初始化，captureException 变为空操作；
 * 生产环境之外不做控制台输出，避免日志噪声。
 */
export function reportServerError(error: unknown, context: ErrorContext = {}): void {
  if (!process.env.SENTRY_DSN) {
    return;
  }
  const extras: Record<string, unknown> = {
    path: context.path,
    method: context.method,
    route: context.route,
  };
  captureException(error, { extra: extras });
}
