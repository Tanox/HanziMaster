// src/instrumentation.ts v5.2.35

/** 按运行时动态加载 Sentry 配置；未配置 DSN 时零开销跳过。 */
export async function register() {
  if (!process.env.SENTRY_DSN) {
    return;
  }
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');
  } else if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config');
  }
}

/** Next.js 服务端请求错误钩子，交由统一上报模块处理。 */
export async function onRequestError(
  error: unknown,
  request: { path?: string; method?: string },
  context: { routerKind?: string; routePath?: string }
) {
  const { reportServerError } = await import('./lib/error-reporting');
  reportServerError(error, {
    path: request.path,
    method: request.method,
    route: context.routePath,
  });
}
