// scripts/clean-temp.mjs v5.2.55
// 固定子目录清理器：默认只清 tmp/；--cache / --log / --reports 可单独清理对应目录；
// --all 清空四类目录；--dry-run 仅打印计划。绝不删除仓库根条目或四目录之外的路径。
// 用法：node scripts/clean-temp.mjs [--cache] [--log] [--reports] [--all] [--dry-run]
import fs from 'node:fs';
import path from 'node:path';
import {
  ROOT,
  TMP_DIR,
  CACHE_DIR,
  LOG_DIR,
  REPORTS_DIR,
  ensureManagedDirs,
} from './temp-paths.mjs';

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const all = args.has('--all');
const scoped = args.has('--cache') || args.has('--log') || args.has('--reports');
const targets = [
  { name: 'tmp', dir: TMP_DIR, selected: all || !scoped },
  { name: 'cache', dir: CACHE_DIR, selected: all || args.has('--cache') },
  { name: 'log', dir: LOG_DIR, selected: all || args.has('--log') },
  { name: 'reports', dir: REPORTS_DIR, selected: all || args.has('--reports') },
].filter((item) => item.selected);

const known = new Set([TMP_DIR, CACHE_DIR, LOG_DIR, REPORTS_DIR].map((p) => path.resolve(p)));
for (const { dir } of targets) {
  const resolved = path.resolve(dir);
  if (!known.has(resolved) || resolved === path.resolve(ROOT) || !resolved.startsWith(path.resolve(ROOT) + path.sep)) {
    console.error(`拒绝清理非受管目录：${dir}`);
    process.exit(1);
  }
}

for (const { name, dir } of targets) {
  if (!fs.existsSync(dir)) continue;
  console.log(`${dryRun ? '[dry-run] ' : ''}clean ${name}/`);
  if (!dryRun) fs.rmSync(dir, { recursive: true, force: true });
}
if (!dryRun) ensureManagedDirs();
