// scripts/check-line-count.mjs · 源文件行数门禁（v5.2.55）
// 规则：src / prototype 下的 ts、tsx、css、js 单文件不超过 200 行。
// 用法：node scripts/check-line-count.mjs（等价 pnpm run check:lines）
import fs from 'node:fs';
import path from 'node:path';
import { REPORTS_DIR, ensureDir } from './temp-paths.mjs';

const roots = ['src', 'prototype/scripts', 'prototype/styles'];
const LIMIT = 200;
const over = [];

// 结尾换行会产生一个空字符串，不应计入源码行数（恰好 200 行的文件会被误判超限）
const count = (f) => {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  if (lines.at(-1) === '') lines.pop();
  return lines.length;
};

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(ts|tsx|css|js)$/.test(e.name)) {
      const n = count(p);
      if (n > LIMIT) over.push(`${p}\t${n}`);
    }
  }
}

for (const r of roots) walk(r);

ensureDir(REPORTS_DIR);
fs.writeFileSync(
  path.join(REPORTS_DIR, 'line-count.txt'),
  over.length ? over.join('\n') + '\n' : `all <= ${LIMIT}\n`
);
console.log(over.length ? `OVER: ${over.length}` : `all <= ${LIMIT}`);
process.exitCode = over.length ? 1 : 0;
