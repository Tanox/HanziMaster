// scripts/sync-version.mjs v5.2.35
// 用法：node scripts/sync-version.mjs [--check]
// 以 package.json 的 version 为唯一权威源，同步全局展示位。
// 不处理 CHANGELOG 历史条目、文档头注释与源码头注释（按规范仅改本次改动文件）。

import fs from 'node:fs';

const VERSION_RE = /^(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/;
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = pkg.version;
if (!VERSION_RE.test(version)) {
  console.error(`Invalid semver in package.json: ${version}`);
  process.exit(1);
}

const checkOnly = process.argv.includes('--check');
const changes = [];

const target = (file, transform) => {
  const before = fs.readFileSync(file, 'utf8');
  const after = transform(before);
  if (before === after) return;
  changes.push(file);
  if (!checkOnly) fs.writeFileSync(file, after);
};

target('metadata.json', (raw) => {
  const meta = JSON.parse(raw);
  meta.name = String(meta.name).replace(/v\d+\.\d+\.\d+(?:[-+][\w.-]+)?/, `v${version}`);
  meta.version = version;
  return `${JSON.stringify(meta, null, 2)}\n`;
});

for (const file of ['README.md', 'README_EN.md']) {
  target(file, (raw) => raw.replace(/v\d+\.\d+\.\d+(?:[-+][\w.-]+)?/g, `v${version}`));
}

if (checkOnly) {
  if (changes.length) {
    console.error(`Version display out of sync: ${changes.join(', ')}`);
    process.exit(1);
  }
  console.log(`version display in sync: v${version}`);
} else {
  console.log(`synced to v${version}: ${changes.length ? changes.join(', ') : '(already up to date)'}`);
}
