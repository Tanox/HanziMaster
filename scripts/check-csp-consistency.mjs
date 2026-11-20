// scripts/check-csp-consistency.mjs v5.2.52
// 双平台 CSP 一致性门禁：断言 edgeone.json 的 CSP 与 next.config.mjs 生产 headers() 逐字一致。
// 生产配置校验要求 SITE_URL，这里注入占位值；仅用于读取 CSP，不触发任何构建。
import fs from 'node:fs';

process.env.NODE_ENV = 'production';
process.env.NEXT_PUBLIC_SITE_URL ||= 'https://example.invalid';

const config = (await import('../next.config.mjs')).default;
const rules = await config.headers();
const nextCsp = rules[0]?.headers.find((h) => h.key === 'Content-Security-Policy')?.value;

const edgeone = JSON.parse(fs.readFileSync('edgeone.json', 'utf8'));
const wildcard = edgeone.headers.find((r) => r.source === '/*');
const edgeCsp = wildcard?.headers.find((h) => h.key === 'Content-Security-Policy')?.value;

const normalized = (value) => (value ?? '').split(';').map((part) => part.trim()).filter(Boolean).join('; ');
const a = normalized(nextCsp);
const b = normalized(edgeCsp);
const report = `CSP 一致性门禁（2026-11-20 复核）\nnext.config.mjs: ${a}\nedgeone.json:   ${b}\n`;
fs.mkdirSync('reports', { recursive: true });
fs.writeFileSync('reports/csp-consistency.txt', report);

if (!a || a !== b) {
  console.error('CSP 不一致，请同步 next.config.mjs 与 edgeone.json：\n' + report);
  process.exit(1);
}
console.log('csp consistent');
