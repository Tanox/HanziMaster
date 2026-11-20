// src/lib/__tests__/next-config-sentry.test.ts v5.2.57
// 回归：@sentry/nextjs v11 起 withSentryConfig 位于 /config 子路径。
// 修复前从根导入会在平台设置 SENTRY_DSN 时抛 `withSentryConfig is not a function`。
// 这里做静态守卫（避免 vitest 转换重型 Sentry 模块导致超时）；无 DSN 的配置导入
// 已由 scripts/check-csp-consistency.mjs 在 CI 的 pnpm check:csp 中实际执行。
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('next.config.mjs Sentry 导入路径', () => {
  const source = readFileSync('next.config.mjs', 'utf8');

  it('从 @sentry/nextjs/config 具名导入 withSentryConfig', () => {
    expect(source).toMatch(/import\s*\{\s*withSentryConfig\s*\}\s*from\s*'@sentry\/nextjs\/config'/);
  });

  it('不再从 @sentry/nextjs 根导入该导出', () => {
    expect(source).not.toMatch(/withSentryConfig[^'"]*'@sentry\/nextjs'/);
  });

  it('SENTRY_DSN 分支仍会调用 withSentryConfig 包装配置', () => {
    expect(source).toContain("if (process.env.SENTRY_DSN)");
    expect(source).toContain('withSentryConfig(config,');
  });
});
