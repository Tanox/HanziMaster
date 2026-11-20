// scripts/seo-audit.mjs v5.2.57
// 站点 HTML 结构审计：桌面 / 移动两种 UA 抽查多语言页面，报告写 reports/seo-audit.txt。
// 用法：node scripts/seo-audit.mjs [baseUrl]（默认 http://localhost:3000）
import fs from 'node:fs';
import path from 'node:path';

const base = (process.argv[2] ?? process.env.SEO_AUDIT_URL ?? 'http://localhost:3000').replace(/\/+$/, '');
const locales = ['en', 'zh-CN'];
const pages = ['/', '/learn', '/practice', '/privacy', '/terms'];
const userAgents = {
  desktop: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36',
  mobile: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148',
};

const attr = (tag, name) => new RegExp(`${name}="([^"]+)"`).exec(tag)?.[1] ?? null;

function analyzeHtml(html) {
  const results = [];
  const check = (name, pass, detail = '') => results.push({ name, pass, detail });

  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  const main = (html.match(/<main[\s>]/g) ?? []).length;
  check('single-h1', h1 === 1, `found ${h1}`);
  check('single-main', main === 1, `found ${main}`);

  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  let previous = 0;
  let jump = '';
  for (const level of levels) {
    if (previous && level > previous + 1) jump = `h${previous} -> h${level}`;
    previous = level;
  }
  check('heading-hierarchy', !jump, jump || 'no skipped levels');

  const canonicalTag = /<link[^>]*rel="canonical"[^>]*>/.exec(html)?.[0] ?? '';
  const canonical = attr(canonicalTag, 'href');
  check('canonical', Boolean(canonical), canonical ?? 'missing');
  if (canonical && !base.includes('localhost')) {
    check('canonical-absolute-https', canonical.startsWith('https://'), canonical);
  }

  const hreflang = (html.match(/hreflang="/g) ?? []).length;
  check('hreflang-11-plus-x-default', hreflang >= 12, `found ${hreflang}`);

  const ogImage = /<meta[^>]+(?:property|name)="og:image"/.test(html);
  check('og-image', ogImage, ogImage ? 'present' : 'missing');

  const raw = /<script[^>]*id="structured-data"[^>]*>([\s\S]*?)<\/script>/.exec(html)?.[1];
  let types = [];
  try {
    types = (JSON.parse(raw ?? '{}')['@graph'] ?? []).map((node) => node['@type']);
  } catch {
    types = [];
  }
  for (const type of ['WebSite', 'Organization', 'WebPage']) {
    check(`jsonld-${type}`, types.includes(type), types.join(','));
  }
  return results;
}

async function fetchPage(url, userAgent) {
  const response = await fetch(url, {
    headers: { 'User-Agent': userAgent, Accept: 'text/html' },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

const lines = [`# SEO / GEO 结构审计 · ${new Date().toISOString()}`, `Base: ${base}`, ''];
let failures = 0;
for (const [device, userAgent] of Object.entries(userAgents)) {
  for (const locale of locales) {
    for (const page of pages) {
      const url = `${base}/${locale}${page === '/' ? '/' : page}`;
      try {
        const results = analyzeHtml(await fetchPage(url, userAgent));
        const failed = results.filter((r) => !r.pass);
        failures += failed.length;
        lines.push(
          `[${device}] ${url}: ${failed.length ? 'FAIL' : 'PASS'}` +
            (failed.length ? ` — ${failed.map((r) => `${r.name}(${r.detail})`).join('; ')}` : ''),
        );
      } catch (error) {
        failures += 1;
        lines.push(`[${device}] ${url}: FAIL — ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }
}

lines.push('', `Total failures: ${failures}`);
fs.mkdirSync('reports', { recursive: true });
fs.writeFileSync(path.join('reports', 'seo-audit.txt'), `${lines.join('\n')}\n`);
console.log(`seo-audit: ${failures ? `FAIL (${failures})` : 'PASS'} → reports/seo-audit.txt`);
process.exitCode = failures ? 1 : 0;
