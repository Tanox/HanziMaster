// scripts/check-root-clean.mjs v5.2.55
// 根目录清洁度门禁：禁止临时脚本 / 一次性产物散落仓库根目录。
// 固定子目录：tmp/（会话临时）、cache/（可再生缓存）、log/（日志）、reports/（正式产物）；
// 四者均由 scripts/temp-paths.mjs 统一管理并 gitignore；.next/ 是 Next/Vercel 框架自有产物例外。
// 规则：根目录每个条目必须命中白名单，否则判失败。
// 用法：node scripts/check-root-clean.mjs（结果写 reports/root-clean.txt，失败退出码 1）

import fs from 'node:fs';
import path from 'node:path';
import { ROOT, REPORTS_DIR, ensureManagedDirs } from './temp-paths.mjs';

ensureManagedDirs();

// 工具链 / 平台约定必须位于仓库根的目录（含构建期生成目录，均已 gitignore）
const ALLOWED_DIRS = new Set([
  '.codebuddy', '.git', '.github', '.next', '.trae', '.turbo', '.vercel', '.workbuddy',
  'cache', 'docs', 'e2e', 'log', 'node_modules', 'playwright-report', 'prototype',
  'public', 'reports', 'scripts', 'src', 'tmp', 'test-results',
]);

// 包管理器 / 构建工具 / 社区惯例要求位于仓库根的文件
const ALLOWED_FILES = new Set([
  '.env.example', '.gitattributes', '.gitignore', '.npmrc', '.nvmrc', '.nvmdrc', '.prettierignore', '.prettierrc.json',
  'CHANGELOG.md', 'components.json', 'CONTRIBUTING.md', 'CONTRIBUTING_EN.md',
  'edgeone.json', 'eslint.config.js', 'HanziMaster.code-workspace', 'LICENSE',
  'metadata.json', 'next-env.d.ts', 'next.config.mjs', 'NOTICE', 'package.json',
  'playwright.config.ts', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'postcss.config.js',
  'README.md', 'README_EN.md', 'sentry.edge.config.ts', 'sentry.server.config.ts',
  'tsconfig.json', 'vercel.json', 'vitest.config.ts', 'vitest.setup.ts',
]);

// 本地环境变量文件按前缀放行（.env.local / .env.development.local 等，均已 gitignore）
const isLocalEnv = (name) => name.startsWith('.env');

// 临时产物特征：对「文件」即使命中白名单也判失败（兜底改名 / 新型产物）
// 目录不适用：固定子目录统一由 ALLOWED_DIRS 裁定，不按扩展名误伤
const TEMP_PATTERNS = [
  /\.(log|out|tmp|bak|orig|rej|tsbuildinfo)$/i,
  /(test-out|linecheck|build-out|build-err)/i,
  /^(audit-|tmp|temp|debug|draft)/i,
  /-result\.(json|txt|xml)$/i,
  /^(\.DS_Store|Thumbs\.db|desktop\.ini)$/i,
];

const entries = fs
  .readdirSync(ROOT, { withFileTypes: true })
  .filter((e) => e.name !== '.git')
  .sort((a, b) => a.name.localeCompare(b.name));

// 符号链接（如 .workbuddy → .codebuddy 记忆目录）按链接目标类型归类；断链按文件兜底
const isDirLike = (entry) => {
  if (entry.isDirectory()) return true;
  if (!entry.isSymbolicLink()) return false;
  try {
    return fs.statSync(path.join(ROOT, entry.name)).isDirectory();
  } catch {
    return false;
  }
};

const offenders = [];
for (const entry of entries) {
  const dirLike = isDirLike(entry);
  const allowed = dirLike
    ? ALLOWED_DIRS.has(entry.name)
    : ALLOWED_FILES.has(entry.name) || isLocalEnv(entry.name);
  if (!allowed || (!dirLike && TEMP_PATTERNS.some((re) => re.test(entry.name)))) {
    offenders.push(`${dirLike ? '[目录]' : '[文件]'} ${entry.name}`);
  }
}

const report = offenders.length
  ? `根目录清洁度门禁失败（${offenders.length} 项）\n${offenders.join('\n')}\n`
  : `root clean（${entries.length} 个条目全部命中白名单）\n`;
fs.writeFileSync(path.join(REPORTS_DIR, 'root-clean.txt'), report);
console.log(offenders.length ? `OVER: ${offenders.length}` : 'root clean');

if (offenders.length) {
  console.error(
    '根目录出现白名单之外的条目：\n' +
      offenders.map((o) => `  - ${o}`).join('\n') +
      '\n临时文件一律放 tmp/，缓存放 cache/，日志放 log/；正式工具脚本放 scripts/，核验产物写 reports/。'
  );
  process.exitCode = 1;
}
