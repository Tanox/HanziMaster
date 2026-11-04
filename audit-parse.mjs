import fs from 'node:fs';
let b = fs.readFileSync('audit-raw.json');
let s = b[0] === 0xff && b[1] === 0xfe ? b.toString('utf16le') : b.toString('utf8');
s = s.replace(/^\uFEFF/, '');
const j = JSON.parse(s);
const seen = new Set();
for (const a of Object.values(j.advisories)) {
  if (['high', 'critical'].includes(a.severity) && !seen.has(a.module_name)) {
    seen.add(a.module_name);
    console.log(a.severity.padEnd(9), String(a.module_name).padEnd(26), String(a.vulnerable_versions).padEnd(16), '->', a.patched_versions);
  }
}
console.log('--- counts:', JSON.stringify(j.metadata.vulnerabilities));
