// scripts/check-deploy-env.mjs v5.2.57
// 部署环境变量预检：校验站点 URL / GA4 / Sentry / Blob 的形状，不打印任何值。
// 用法：node scripts/check-deploy-env.mjs [--strict] [--env-file .vercel/.env.production.local]
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, REPORTS_DIR, ensureDir } from './temp-paths.mjs';

const args = process.argv.slice(2);
const fileIndex = args.indexOf('--env-file');
const envFile = fileIndex >= 0 ? args[fileIndex + 1] : null;
const strict = args.includes('--strict');
const env = { ...process.env };

if (envFile) {
  const full = path.resolve(ROOT, envFile);
  if (!fs.existsSync(full)) {
    console.error(`env file not found: ${envFile}`);
    process.exit(1);
  }
  for (const line of fs.readFileSync(full, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
}

const errors = [];
const warnings = [];
const checked = [];
const note = (key, status) => checked.push(`${key}: ${status}`);

const siteUrl = env.NEXT_PUBLIC_SITE_URL;
if (!siteUrl) {
  errors.push('NEXT_PUBLIC_SITE_URL 缺失：生产必须配置正式域名');
  note('NEXT_PUBLIC_SITE_URL', 'MISSING');
} else {
  let parsed = null;
  try {
    parsed = new URL(siteUrl);
  } catch {
    errors.push('NEXT_PUBLIC_SITE_URL 不是合法绝对 URL');
  }
  if (parsed) {
    const protocolOk = parsed.protocol === 'https:' || parsed.protocol === 'http:';
    const extrasOk = !parsed.search && !parsed.hash && !siteUrl.slice(parsed.protocol.length + 2).includes('//');
    const productionOk =
      !strict ||
      (parsed.protocol === 'https:' &&
        !['localhost', '127.0.0.1'].includes(parsed.hostname) &&
        !/\.example\.(com|invalid)$|\.(test|invalid)$/.test(parsed.hostname));
    if (!protocolOk || !extrasOk || !productionOk) {
      errors.push(
        `NEXT_PUBLIC_SITE_URL 形状不合格（协议/query/hash/重复斜杠/正式域名），strict=${strict}`
      );
      note('NEXT_PUBLIC_SITE_URL', 'INVALID');
    } else {
      note('NEXT_PUBLIC_SITE_URL', strict ? 'OK (strict)' : 'OK');
      if (siteUrl.endsWith('/') && siteUrl !== '/') warnings.push('NEXT_PUBLIC_SITE_URL 带尾斜杠，site.ts 会自动去掉，但建议配置时省略');
    }
  }
}

const ga = env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
if (ga) {
  if (/^G-[A-Z0-9]+$/.test(ga)) note('NEXT_PUBLIC_GA_MEASUREMENT_ID', 'OK (shape)');
  else {
    errors.push('NEXT_PUBLIC_GA_MEASUREMENT_ID 形如 G-XXXXXXXXXX，请核对');
    note('NEXT_PUBLIC_GA_MEASUREMENT_ID', 'INVALID');
  }
} else {
  note('NEXT_PUBLIC_GA_MEASUREMENT_ID', 'OFF (optional)');
}

const isDsn = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && Boolean(url.username) && /^\/\d+$/.test(url.pathname);
  } catch {
    return false;
  }
};
const dsn = env.SENTRY_DSN;
if (dsn) {
  if (isDsn(dsn)) note('SENTRY_DSN', 'OK (shape)');
  else {
    errors.push('SENTRY_DSN 不是合法 Sentry DSN（需 https://<key>@<host>/<projectId>）');
    note('SENTRY_DSN', 'INVALID');
  }
  if (!env.SENTRY_ORG || !env.SENTRY_PROJECT) {
    const message = 'SENTRY_DSN 已设置但 SENTRY_ORG / SENTRY_PROJECT 缺失，source map 上传配置不完整';
    (strict ? errors : warnings).push(message);
    note('SENTRY_ORG/SENTRY_PROJECT', strict ? 'MISSING (strict)' : 'WARN');
  }
  if (!env.NEXT_PUBLIC_SENTRY_DSN) warnings.push('SENTRY_DSN 已设置但 NEXT_PUBLIC_SENTRY_DSN 缺失，浏览器端不会上报');
  if (!env.SENTRY_AUTH_TOKEN) warnings.push('SENTRY_AUTH_TOKEN 缺失，source map 不会上传（不阻断构建）');
} else {
  note('SENTRY_DSN', 'OFF (optional)');
}

const blobToken = Boolean(env.BLOB_READ_WRITE_TOKEN);
const blobStore = Boolean(env.BLOB_STORE_ID);
if (!blobToken && !blobStore) warnings.push('云同步未配置（BLOB_STORE_ID / BLOB_READ_WRITE_TOKEN 均缺失，/api/progress 返回 503）');
note('Vercel Blob', blobStore ? 'OK (OIDC)' : blobToken ? 'OK (token)' : 'OFF (optional)');

ensureDir(REPORTS_DIR);
const report = [
  `部署环境变量预检（strict=${strict}，env-file=${envFile ?? 'process.env'}）`,
  ...checked,
  ...errors.map((e) => `ERROR: ${e}`),
  ...warnings.map((w) => `WARN: ${w}`),
  '',
].join('\n');
fs.writeFileSync(path.join(REPORTS_DIR, 'deploy-env.txt'), report);
console.log(errors.length ? `deploy env invalid: ${errors.length} error(s)` : `deploy env ok (${warnings.length} warning(s))`);
if (errors.length) {
  console.error(report);
  process.exitCode = 1;
}
