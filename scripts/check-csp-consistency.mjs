// scripts/check-csp-consistency.mjs v5.2.57
// 双平台配置门禁：断言 edgeone.json 的 CSP 与 next.config.mjs 生产 headers() 逐字一致，
// 并校验 vercel.json 不重复定义安全响应头、静态缓存范围不覆盖 sw.js（P2-A/D）。
// 生产配置校验要求 SITE_URL，这里注入占位值；仅用于读取 CSP，不触发任何构建。
import fs from 'node:fs';
import path from 'node:path';
import { REPORTS_DIR, ensureDir } from './temp-paths.mjs';

process.env.NODE_ENV = 'production';
process.env.NEXT_PUBLIC_SITE_URL ||= 'https://example.invalid';

const config = (await import('../next.config.mjs')).default;
const rules = await config.headers();
const nextCsp = rules[0]?.headers.find((h) => h.key === 'Content-Security-Policy')?.value;

const edgeone = JSON.parse(fs.readFileSync('edgeone.json', 'utf8'));
const wildcard = edgeone.headers.find((r) => r.source === '/*');
const edgeCsp = wildcard?.headers.find((h) => h.key === 'Content-Security-Policy')?.value;

const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const SECURITY_HEADERS = [
  'content-security-policy', 'x-frame-options', 'x-content-type-options',
  'referrer-policy', 'permissions-policy', 'cross-origin-opener-policy',
];
const duplicated = SECURITY_HEADERS.filter((key) =>
  vercel.headers?.some((rule) => rule.headers?.some((h) => h.key.toLowerCase() === key))
);
const swRule = vercel.headers?.find((rule) => rule.source === '/sw.js');
const swImmutable = vercel.headers?.some(
  (rule) => rule.source.includes('(.*') && rule.source.includes('sw') === false && /js/.test(rule.source)
);

const normalized = (value) => (value ?? '').split(';').map((part) => part.trim()).filter(Boolean).join('; ');
const a = normalized(nextCsp);
const b = normalized(edgeCsp);
const report = [
  'CSP / 平台配置门禁（2026-11-20 复核）',
  `next.config.mjs: ${a}`,
  `edgeone.json:   ${b}`,
  `vercel.json duplicated security headers: ${duplicated.join(', ') || 'none'}`,
  `vercel.json /sw.js cache rule: ${swRule ? 'present' : 'MISSING'}`,
  `vercel.json install/build: ${vercel.installCommand} / ${vercel.buildCommand}`,
  '',
].join('\n');
ensureDir(REPORTS_DIR);
fs.writeFileSync(path.join(REPORTS_DIR, 'csp-consistency.txt'), report);

const platformErrors = [];
if (!a || a !== b) platformErrors.push('CSP 不一致，请同步 next.config.mjs 与 edgeone.json');
if (duplicated.length) platformErrors.push(`vercel.json 重复定义安全响应头：${duplicated.join(', ')}`);
if (!swRule) platformErrors.push('vercel.json 缺少 /sw.js 的 must-revalidate 缓存规则');
if (swImmutable) platformErrors.push('vercel.json 存在覆盖 sw.js 的宽泛 immutable 缓存规则');
if (platformErrors.length) {
  console.error(platformErrors.join('\n') + '\n' + report);
  process.exit(1);
}
console.log('csp and platform config consistent');
