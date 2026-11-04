import fs from 'fs';
import path from 'path';

const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.html', '.vue', '.py', '.go', '.java', '.dart', '.mjs']);
const roots = ['src', 'prototype', 'scripts', 'test', 'app', 'components', 'lib', 'hooks'];
const seen = new Set();
const out = [];

function walk(d) {
  if (!fs.existsSync(d)) return;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.next', '.git'].includes(e.name)) continue;
      walk(f);
    } else if (exts.has(path.extname(e.name))) {
      const full = path.resolve(f);
      if (seen.has(full)) continue;
      seen.add(full);
      const n = fs.readFileSync(f, 'utf8').split(/\r?\n/).length;
      out.push([n, f]);
    }
  }
}
for (const r of roots) walk(r);
for (const f of ['next.config.mjs', 'tailwind.config.ts', 'vitest.config.ts', 'eslint.config.mjs', 'postcss.config.mjs']) {
  if (fs.existsSync(f)) out.push([fs.readFileSync(f, 'utf8').split(/\r?\n/).length, f]);
}
out.sort((a, b) => b[0] - a[0]);
const lines = [];
lines.push('=== files > 200 lines ===');
for (const [n, f] of out) if (n > 200) lines.push(`${n}\t${f}`);
lines.push(`=== total source files: ${out.length} ===`);
lines.push('=== top 20 ===');
for (const [n, f] of out.slice(0, 20)) lines.push(`${n}\t${f}`);
fs.writeFileSync('linecount-result.txt', lines.join('\n') + '\n');
console.log('done');
