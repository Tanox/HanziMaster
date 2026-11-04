import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const r = spawnSync(
  process.execPath,
  ['node_modules/vitest/vitest.mjs', 'run', '--reporter=dot'],
  { encoding: 'utf8', cwd: process.cwd() }
);
fs.writeFileSync('test-out.txt', (r.stdout ?? '') + '\n=== stderr ===\n' + (r.stderr ?? ''));
console.log('exit', r.status);
