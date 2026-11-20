// scripts/check-runtime.mjs v5.2.57
// prebuild 门禁：在构建最早期校验 Node 版本，避免平台默认运行时与 engines 不一致时
// 到安装/编译阶段才报难懂的错误。结果写 reports/runtime-check.txt。
import fs from 'node:fs';
import path from 'node:path';
import { REPORTS_DIR, ensureDir } from './temp-paths.mjs';

const REQUIRED = [24, 11, 0];
const actual = process.versions.node.split('.').map((part) => Number(part) || 0);
const ok =
  actual[0] > REQUIRED[0] ||
  (actual[0] === REQUIRED[0] &&
    (actual[1] > REQUIRED[1] || (actual[1] === REQUIRED[1] && actual[2] >= REQUIRED[2])));
const required = REQUIRED.join('.');
const found = actual.slice(0, 3).join('.');
const ua = process.env.npm_config_user_agent ?? '';
const packageManagerMismatch = ua && !ua.startsWith('pnpm/') && !ua.startsWith('npm/');

const lines = [
  '构建运行时门禁',
  `required node: >= ${required}`,
  `actual node:   ${found}`,
  `package manager: ${ua || '(not set)'}`,
];
if (!ok) lines.push(`ERROR: Node ${found} 低于项目要求 ${required}，请在 Vercel 项目设置中切换 Node 24.11+`);
if (packageManagerMismatch) lines.push(`WARN: 包管理器 ${ua} 不是 pnpm，项目要求 pnpm 11.24.0`);

ensureDir(REPORTS_DIR);
fs.writeFileSync(path.join(REPORTS_DIR, 'runtime-check.txt'), lines.join('\n') + '\n');
console.log(ok ? `runtime ok (node ${found})` : `runtime unsupported (node ${found} < ${required})`);
if (!ok) process.exitCode = 1;
