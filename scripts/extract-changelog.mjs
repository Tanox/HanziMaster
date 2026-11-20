// scripts/extract-changelog.mjs v5.2.55
// 从 CHANGELOG.md 抽取指定版本小节作为 Release 正文，并校验 tag 与 package.json 一致。
// 用法：node scripts/extract-changelog.mjs v5.2.44
import fs from 'node:fs';
import path from 'node:path';
import { REPORTS_DIR, ensureDir } from './temp-paths.mjs';

const tag = process.argv[2];
if (!tag || !/^v\d+\.\d+\.\d+$/.test(tag)) {
  console.error('用法：node scripts/extract-changelog.mjs vX.Y.Z');
  process.exit(1);
}

const version = tag.slice(1);
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (pkg.version !== version) {
  console.error(`tag ${tag} 与 package.json 版本 ${pkg.version} 不一致`);
  process.exit(1);
}

const text = fs.readFileSync('CHANGELOG.md', 'utf8');
const heading = `## [${version}]`;
const start = text.indexOf(heading);
if (start < 0) {
  console.error(`CHANGELOG.md 缺少 ${heading} 小节`);
  process.exit(1);
}

const rest = text.slice(start);
const nextSection = rest.indexOf('\n## [', 1);
const section = (nextSection > 0 ? rest.slice(0, nextSection) : rest)
  .split('\n')
  .slice(1) // 去掉版本标题行
  .join('\n')
  .trim();

if (!section) {
  console.error(`${heading} 小节为空`);
  process.exit(1);
}

ensureDir(REPORTS_DIR);
fs.writeFileSync(path.join(REPORTS_DIR, 'release-notes.md'), `${section}\n`);
console.log(`release notes: ${tag} (${section.split('\n').length} 行)`);
