// scripts/check-root-clean.mjs v5.2.43
// 根目录清洁度门禁：禁止临时脚本 / 一次性产物落盘仓库根目录。
// 规则：根目录每个条目必须命中白名单（工具链约定文件或生成产物目录），否则判失败。
// 用法：node scripts/check-root-clean.mjs（结果写 reports/root-clean.txt，失败退出码 1）

import fs from 'node:fs';
import path from 'node:path';

// 工具链 / 平台约定必须位于仓库根的目录（含构建期生成目录，均已 gitignore）
const ALLOWED_DIRS = new Set([
  '.codebuddy', '.git', '.github', '.next', '.trae', '.turbo', '.vercel',
  'coverage', 'dist', 'docs', 'e2e', 'node_modules', 'out',
  'playwright-report', 'prototype', 'public', 'reports', 'scripts', 'src', 'test-results',
]);

// 包管理器 / 构建工具 / 社区惯例要求位于仓库根的文件
const ALLOWED_FILES = new Set([
  '.env.example', '.gitignore', '.npmrc', '.nvmrc', '.prettierignore', '.prettierrc.json',
  'CHANGELOG.md', 'components.json', 'CONTRIBUTING.md', 'CONTRIBUTING_EN.md',
  'edgeone.json', 'eslint.config.js', 'HanziMaster.code-workspace', 'LICENSE',
  'metadata.json', 'next-env.d.ts', 'next.config.mjs', 'NOTICE', 'package.json',
  'playwright.config.ts', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'postcss.config.js',
  'README.md', 'README_EN.md', 'sentry.edge.config.ts', 'sentry.server.config.ts',
  'tsconfig.json', 'tsconfig.tsbuildinfo', 'vercel.json',
  'vitest.config.ts', 'vitest.setup.ts',
]);

// 本地环境变量文件按前缀放行（.env.local / .env.development.local 等，均已 gitignore）
const isLocalEnv = (name) => name.startsWith('.env');

// 临时产物特征：即使命中白名单也判失败（兜底改名 / 新型产物）
const TEMP_PATTERNS = [
  /\.(log|out|tmp|bak|orig|rej)$/i,
  /(test-out|linecheck|build-out|build-err)/i,
  /^(audit-|tmp|temp|debug|draft)/i,
  /-result\.(json|txt|xml)$/i,
  /^(\.DS_Store|Thumbs\.db|desktop\.ini)$/i,
];

const entries = fs
  .readdirSync('.', { withFileTypes: true })
  .filter((e) => e.name !== '.git')
  .sort((a, b) => a.name.localeCompare(b.name));

const offenders = [];
for (const entry of entries) {
  const allowed = entry.isDirectory()
    ? ALLOWED_DIRS.has(entry.name)
    : ALLOWED_FILES.has(entry.name) || isLocalEnv(entry.name);
  if (!allowed || TEMP_PATTERNS.some((re) => re.test(entry.name))) {
    offenders.push(`${entry.isDirectory() ? '[目录]' : '[文件]'} ${entry.name}`);
  }
}

fs.mkdirSync('reports', { recursive: true });
const report = offenders.length
  ? `根目录清洁度门禁失败（${offenders.length} 项）\n${offenders.join('\n')}\n`
  : `root clean（${entries.length} 个条目全部命中白名单）\n`;
fs.writeFileSync(path.join('reports', 'root-clean.txt'), report);
console.log(offenders.length ? `OVER: ${offenders.length}` : 'root clean');

if (offenders.length) {
  console.error(
    '根目录出现白名单之外的条目：\n' +
      offenders.map((o) => `  - ${o}`).join('\n') +
      '\n一次性脚本请放 scripts/，脚本与工具产物统一写 reports/（或对应生成目录）。'
  );
  process.exitCode = 1;
}
