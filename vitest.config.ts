// vitest.config.ts v5.2.36
import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['e2e/**', 'node_modules/**'],
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'html'],
      reportsDirectory: './coverage',
      // 口径：只统计可单元测试的逻辑层；页面 JSX、静态文案与数据表不计入
      include: [
        'src/lib/**/*.ts',
        'src/hooks/**/*.ts',
        'src/components/state/**/*.tsx',
        'src/components/ui/**/*.tsx',
        // 纯逻辑工具不属于页面 JSX，纳入后可单独度量关键路径算法覆盖率
        'src/components/practice/writing-canvas-utils.ts',
      ],
      exclude: [
        ...coverageConfigDefaults.exclude,
        'src/**/*.test.{ts,tsx}',
        'src/**/__tests__/**',
        'src/lib/i18n/translations/**',
        'src/lib/characters*.ts',
        'src/lib/character-types.ts',
        'src/lib/stroke-order-data.ts',
        'src/content/**',
        'src/app/**',
      ],
      thresholds: {
        statements: 80,
        branches: 70,
        functions: 80,
        lines: 80,
      },
    },
  },
});
