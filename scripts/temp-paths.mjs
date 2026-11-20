// scripts/temp-paths.mjs v5.2.55
// 临时文件目录单一来源：tmp/（会话临时）、cache/（可再生缓存）、log/（运行日志）、
// reports/（正式核验产物）。所有路径相对仓库根解析，脚本写入前调用 ensureManagedDirs()。
// 直接执行 `node scripts/temp-paths.mjs` 只创建目录，不删除任何内容。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
export const TMP_DIR = path.join(ROOT, 'tmp');
export const CACHE_DIR = path.join(ROOT, 'cache');
export const LOG_DIR = path.join(ROOT, 'log');
export const REPORTS_DIR = path.join(ROOT, 'reports');
export const COVERAGE_DIR = path.join(CACHE_DIR, 'coverage');
export const TS_BUILD_INFO = path.join(CACHE_DIR, 'tsconfig.tsbuildinfo');
// Next.js/Vercel/EdgeOne 预设要求构建目录默认为 .next；仅它是框架自有的固定例外。
export const NEXT_DIST_DIR = path.join(ROOT, process.env.NEXT_DIST_DIR || '.next');

export const MANAGED_DIRS = Object.freeze([TMP_DIR, CACHE_DIR, LOG_DIR, REPORTS_DIR]);

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export function ensureManagedDirs() {
  for (const dir of MANAGED_DIRS) ensureDir(dir);
  return MANAGED_DIRS;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  ensureManagedDirs();
  console.log('managed dirs ready: tmp/, cache/, log/, reports/');
}
