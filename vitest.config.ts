// vitest.config.ts v5.2.55
import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  // Vite/Vitest 中间缓存统一落入 cache/vite，避免默认写 node_modules/.vite 之外的散落路径
  cacheDir: './cache/vite',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['e2e/**', 'node_modules/**', 'tmp/**', 'cache/**', 'log/**', 'reports/**'],
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'html'],
      reportsDirectory: './cache/coverage',
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
