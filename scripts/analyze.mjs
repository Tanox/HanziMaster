// scripts/analyze.mjs v5.2.35
// 跨平台设置 ANALYZE=1 后执行生产构建（Windows PowerShell 不支持 ENV=1 前缀）。

import { spawnSync } from 'node:child_process';

const result = spawnSync(process.execPath, ['node_modules/next/dist/bin/next', 'build'], {
  env: { ...process.env, ANALYZE: '1' },
  stdio: 'inherit',
});

process.exitCode = result.status ?? 1;
