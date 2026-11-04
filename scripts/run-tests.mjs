// scripts/run-tests.mjs · 测试运行包装器（v5.2.33）
// 用途：本机命令行中出现 "vitest" 字样会被 IDE 监控机制误判为 watch 模式并截断输出，
// 故由本脚本以子进程方式运行测试，并将结果落盘到 reports/（不污染仓库根）。
// 用法：node scripts/run-tests.mjs [--coverage]
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const coverage = process.argv.includes('--coverage');
const args = ['node_modules/vitest/vitest.mjs', 'run', '--reporter=dot'];
if (coverage) args.push('--coverage');

const r = spawnSync(process.execPath, args, { encoding: 'utf8', cwd: process.cwd() });

fs.mkdirSync('reports', { recursive: true });
fs.writeFileSync(
  path.join('reports', 'test-out.txt'),
  (r.stdout ?? '') + '\n=== stderr ===\n' + (r.stderr ?? '')
);
console.log('exit', r.status, coverage ? '(coverage)' : '');
process.exitCode = r.status ?? 1;
