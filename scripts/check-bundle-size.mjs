// scripts/check-bundle-size.mjs v5.2.35
// 体积预算门禁：在 pnpm build 之后运行，读取 .next/static/chunks 的实际产物。
// 阈值可用 MAX_BUNDLE_KB / MAX_CHUNK_KB 覆盖，产物报告写 reports/bundle-size.txt。

import fs from 'node:fs';
import path from 'node:path';

const chunksDir = path.resolve('.next/static/chunks');
if (!fs.existsSync(chunksDir)) {
  console.error('No build output. Run `pnpm build` before the size gate.');
  process.exit(1);
}

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : file.endsWith('.js') ? [file] : [];
  });

const files = walk(chunksDir).map((file) => ({
  file: path.relative(process.cwd(), file),
  kb: fs.statSync(file).size / 1024,
}));
const totalKb = files.reduce((sum, item) => sum + item.kb, 0);
const largest = [...files].sort((a, b) => b.kb - a.kb).slice(0, 5);
const maxTotal = Number(process.env.MAX_BUNDLE_KB ?? 1500);
const maxChunk = Number(process.env.MAX_CHUNK_KB ?? 500);

const report = [
  `chunks: ${files.length}`,
  `total: ${totalKb.toFixed(1)} KB (budget ${maxTotal} KB)`,
  `largest chunk: ${largest[0]?.kb.toFixed(1) ?? 0} KB (budget ${maxChunk} KB)`,
  ...largest.map((item) => `  ${item.kb.toFixed(1).padStart(8)} KB  ${item.file}`),
  '',
].join('\n');

fs.mkdirSync('reports', { recursive: true });
fs.writeFileSync(path.join('reports', 'bundle-size.txt'), report);
console.log(report.trimEnd());

if (totalKb > maxTotal || (largest[0]?.kb ?? 0) > maxChunk) {
  console.error('Bundle size budget exceeded');
  process.exit(1);
}
