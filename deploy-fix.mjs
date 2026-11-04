import fs from 'fs';
const V = '5.2.30';
const rd = f => fs.readFileSync(f, 'utf8');
const wr = (f, s) => fs.writeFileSync(f, s, 'utf8');

// 05-deployment.md 文档戳
wr('docs/05-deployment.md', rd('docs/05-deployment.md').replace('> 文档版本：v5.2.28', `> 文档版本：v${V}`));

const pkg = JSON.parse(rd('package.json'));
pkg.version = V;
wr('package.json', JSON.stringify(pkg, null, 2) + '\n');

const meta = JSON.parse(rd('metadata.json'));
meta.version = V;
meta.name = `HanziMaster 汉字大师 v${V}`;
meta.description = `v${V}: 修复 EdgeOne 部署安装命令（改用 pnpm，绕开 only-allow pnpm 守卫）。`;
wr('metadata.json', JSON.stringify(meta, null, 2) + '\n');

for (const f of ['README.md', 'README_EN.md']) wr(f, rd(f).replaceAll('v5.2.29', `v${V}`));

const cl = rd('CHANGELOG.md');
const sec = `## [${V}] - 修复 EdgeOne 部署安装命令
### Fix
- \`edgeone.json\` \`installCommand\` 由 \`npm install\` 改为 \`npm install -g pnpm@11 && pnpm install\`：构建器默认 npm install 会触发项目 \`preinstall\` 的 only-allow pnpm 守卫而失败。
- \`docs/05-deployment.md\` 补充 EdgeOne 安装命令说明并同步文档版本戳。
### Chore
- 同步全局展示位至 v${V}。

`;
wr('CHANGELOG.md', cl.replace(/^# Changelog\r?\n/, `# Changelog\n${sec}`));
console.log('deploy-fix synced to', V);
