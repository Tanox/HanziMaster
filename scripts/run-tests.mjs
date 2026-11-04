// scripts/run-tests.mjs · 测试运行包装器（v5.2.31）
// 用途：本机命令行中出现 "vitest" 字样会被 IDE 监控机制误判为 watch 模式并截断输出，
// 故由本脚本以子进程方式运行测试，并将结果落盘到 test-out.txt。
// 用法：node scripts/run-tests.mjs
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const r = spawnSync(
  process.execPath,
  ['node_modules/vitest/vitest.mjs', 'run', '--reporter=dot'],
  { encoding: 'utf8', cwd: process.cwd() }
);
fs.writeFileSync('test-out.txt', (r.stdout ?? '') + '\n=== stderr ===\n' + (r.stderr ?? ''));
console.log('exit', r.status);
