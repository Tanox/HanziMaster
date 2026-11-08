// scripts/i18n-lint.mjs v5.2.44
// 校验 11 语言包、扩展模块与站点语言常量的键/清单一致性，
// 并检查占位符集合一致性与超长文案（P3-2）。
// 叶子键一致性由单测 src/lib/__tests__/i18n.test.ts 与 site.test.ts 负责。

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/lib/i18n/translations');
const expected = ['en', 'zh-CN', 'zh-TW', 'es', 'ar', 'fr', 'pt-BR', 'de', 'ja', 'ko', 'ru'];
const errors = [];

const files = fs.readdirSync(root).filter((f) => f.endsWith('.ts')).map((f) => f.slice(0, -3)).sort();
const missing = expected.filter((locale) => !files.includes(locale));
const extra = files.filter((locale) => !expected.includes(locale));
if (missing.length) errors.push(`missing language files: ${missing.join(', ')}`);
if (extra.length) errors.push(`unexpected language files: ${extra.join(', ')}`);

const site = fs.readFileSync('src/lib/site.ts', 'utf8');
for (const locale of expected) {
  if (!site.includes(`'${locale}'`)) errors.push(`site.ts missing locale: ${locale}`);
}

const extensionModules = ['legal', 'a11y', 'meanings', 'settings', 'pwa', 'progress'];
for (const module of extensionModules) {
  const file = path.join(root, 'extensions', `${module}.ts`);
  if (!fs.existsSync(file)) {
    errors.push(`missing extension module: extensions/${module}.ts`);
    continue;
  }
  const source = fs.readFileSync(file, 'utf8');
  for (const locale of expected) {
    if (!source.includes(`'${locale}':`) && !source.includes(`  ${locale}:`)) {
      errors.push(`extensions/${module}.ts missing locale: ${locale}`);
    }
  }
}

// 占位符集合：按文件统计 {{name}}，任一语言与 en 不一致即报错（防止插值键漏译/多译）
const PLACEHOLDER = /\{\{\s*([\w.-]+)\s*\}\}/g;
const TEXT_LIMIT = 160;

function collect(source) {
  const placeholders = new Set();
  for (const match of source.matchAll(PLACEHOLDER)) placeholders.add(match[1]);
  return [...placeholders].sort().join(',');
}

const localeSources = Object.fromEntries(
  expected.map((locale) => [locale, fs.readFileSync(path.join(root, `${locale}.ts`), 'utf8')])
);
const baseline = collect(localeSources.en);
for (const locale of expected) {
  const found = collect(localeSources[locale]);
  if (found !== baseline) {
    errors.push(`${locale}.ts placeholder mismatch: expected [${baseline}], got [${found}]`);
  }
}

// 超长文案：主语言包中的 UI 文案超过阈值会破坏移动布局（合规长文在 extensions/legal.ts，不检查）
for (const locale of expected) {
  for (const [index, line] of localeSources[locale].split('\n').entries()) {
    const match = line.match(/:\s*'([^']*)'/);
    if (match && match[1].length > TEXT_LIMIT) {
      errors.push(`${locale}.ts:${index + 1} text too long (${match[1].length} > ${TEXT_LIMIT})`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(
  `i18n lint OK: ${expected.length} locales, ${extensionModules.length} extension modules, ` +
  `placeholders [${baseline || 'none'}], text limit ${TEXT_LIMIT}`
);
