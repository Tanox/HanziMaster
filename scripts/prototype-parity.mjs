// scripts/prototype-parity.mjs v5.2.55
// 对比原型 HTML 与 src/ 中的语义化 id，输出差异到 reports/prototype-parity.txt。
// 默认只报告；--strict 在「原型 id 未落地到代码」时返回非零退出码。

import fs from 'node:fs';
import path from 'node:path';
import { REPORTS_DIR, ensureDir } from './temp-paths.mjs';

const ID_RE = /\bid="([A-Za-z][A-Za-z0-9-]*)"/g;

const walk = (dir, predicate) => {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(file, predicate));
    else if (predicate(file)) out.push(file);
  }
  return out;
};

const collect = (files) => {
  const ids = new Set();
  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    for (const match of source.matchAll(ID_RE)) ids.add(match[1]);
  }
  return ids;
};

const prototypeIds = collect(walk('prototype', (f) => f.endsWith('.html')));
const appIds = collect(walk('src', (f) => /\.(tsx|ts|css)$/.test(f)));
const prototypeOnly = [...prototypeIds].filter((id) => !appIds.has(id)).sort();
const appOnly = [...appIds].filter((id) => !prototypeIds.has(id)).sort();

const report = [
  `prototype ids: ${prototypeIds.size}`,
  `app ids: ${appIds.size}`,
  `shared: ${[...prototypeIds].filter((id) => appIds.has(id)).length}`,
  '',
  'prototype-only (may be prototype scaffolding):',
  ...prototypeOnly,
  '',
  'app-only (added after prototype or not mirrored):',
  ...appOnly,
  '',
].join('\n');

ensureDir(REPORTS_DIR);
fs.writeFileSync(path.join(REPORTS_DIR, 'prototype-parity.txt'), report);
console.log(report.split('\n').slice(0, 3).join('\n'));

if (process.argv.includes('--strict') && prototypeOnly.length) {
  console.error(`${prototypeOnly.length} prototype ids are not present in src/`);
  process.exit(1);
}
