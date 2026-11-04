import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const jobs = [
  { name: 'tsc', args: ['node_modules/typescript/bin/tsc', '--noEmit'] },
  { name: 'vitest', args: ['node_modules/vitest/vitest.mjs', 'run', '--reporter=dot'] },
];

const lines = [];
for (const job of jobs) {
  const r = spawnSync(process.execPath, job.args, { encoding: 'utf8', cwd: process.cwd() });
  lines.push(`===== ${job.name} exit=${r.status} =====`);
  lines.push((r.stdout || '').trim());
  if (r.stderr && r.stderr.trim()) {
    lines.push('--- stderr ---');
    lines.push(r.stderr.trim());
  }
}
fs.writeFileSync('verify-result.txt', lines.join('\n') + '\n', 'utf8');
console.log('done');
