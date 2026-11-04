import fs from 'node:fs';
import path from 'node:path';

const roots = ['src', 'prototype/scripts', 'prototype/styles'];
const over = [];
const count = f => fs.readFileSync(f, 'utf8').split(/\r?\n/).length;

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(ts|tsx|css|js)$/.test(e.name)) {
      const n = count(p);
      if (n > 200) over.push(`${p}\t${n}`);
    }
  }
}

for (const r of roots) walk(r);
fs.writeFileSync('linecheck-result.txt', over.length ? over.join('\n') + '\n' : 'all <= 200\n');
console.log(over.length ? `OVER: ${over.length}` : 'all <= 200');
