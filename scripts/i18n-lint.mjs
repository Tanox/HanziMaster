// scripts/i18n-lint.mjs v5.2.49
// 校验 11 语言包、扩展模块与站点语言常量的键/清单一致性，
// 并检查占位符集合一致性与超长文案（P3-2）。
// 叶子键一致性由单测 src/lib/__tests__/i18n.test.ts 与 site.test.ts 负责。

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/lib/i18n/translations');
const expected = ['en', 'zh-CN', 'zh-TW', 'es', 'ar', 'fr', 'pt-BR', 'de', 'ja', 'ko', 'ru'];
const errors = [];

const files = fs
  .readdirSync(root)
  .filter((f) => f.endsWith('.ts'))
  .map((f) => f.slice(0, -3))
  .sort();
const missing = expected.filter((locale) => !files.includes(locale));
const extra = files.filter((locale) => !expected.includes(locale));
if (missing.length) errors.push(`missing language files: ${missing.join(', ')}`);
if (extra.length) errors.push(`unexpected language files: ${extra.join(', ')}`);

const site = fs.readFileSync('src/lib/site.ts', 'utf8');
for (const locale of expected) {
  if (!site.includes(`'${locale}'`)) errors.push(`site.ts missing locale: ${locale}`);
}

const extensionModules = ['legal', 'a11y', 'meanings', 'settings', 'pwa', 'progress', 'seo', 'geo', 'cloud'];
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

// 占位符一致性：基准包按「键」比较（原按文件整体集合比较无法发现同一文件内跨键互换）
const PLACEHOLDER = /\{\{\s*([\w.-]+)\s*\}\}/g;
const TEXT_LIMIT = 160;

const collectByKey = (source) => {
  const byKey = new Map();
  for (const line of source.split('\n')) {
    const match = line.match(/^\s*([\w'.-]+):\s*'((?:[^'\\]|\\.)*)'/);
    if (!match) continue;
    const names = [...match[2].matchAll(PLACEHOLDER)].map((m) => m[1]);
    const merged = new Set([...(byKey.get(match[1]) ?? []), ...names]);
    byKey.set(match[1], [...merged].sort().join(','));
  }
  return byKey;
};
const collectAll = (source) =>
  [...new Set([...source.matchAll(PLACEHOLDER)].map((m) => m[1]))].sort().join(',');

/** 扩展模块是 en: {...} / 'zh-CN': {...} 结构，按顶层 locale 块分别收集占位符。 */
const collectExtensionBlocks = (source) => {
  const blocks = new Map();
  const matches = [...source.matchAll(/^\s{2}('?)([\w-]+)\1:\s*\{/gm)];
  matches.forEach((m, i) => {
    const start = m.index + m[0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : source.length;
    blocks.set(m[2], collectAll(source.slice(start, end)));
  });
  return blocks;
};

const localeSources = Object.fromEntries(
  expected.map((locale) => [locale, fs.readFileSync(path.join(root, `${locale}.ts`), 'utf8')]),
);
const baselineByKey = collectByKey(localeSources.en);
for (const locale of expected) {
  const byKey = collectByKey(localeSources[locale]);
  for (const [key, names] of baselineByKey) {
    if (byKey.get(key) !== names) {
      errors.push(`${locale}.ts key "${key}" placeholder mismatch: expected [${names}], got [${byKey.get(key) ?? ''}]`);
    }
  }
}

// 扩展模块此前只检查语言块存在，不检查占位符；此处补齐
for (const module of extensionModules) {
  const blocks = collectExtensionBlocks(fs.readFileSync(path.join(root, 'extensions', `${module}.ts`), 'utf8'));
  const baseline = blocks.get('en') ?? '';
  for (const locale of expected) {
    if ((blocks.get(locale) ?? '') !== baseline) {
      errors.push(`extensions/${module}.ts ${locale} placeholder mismatch: expected [${baseline}], got [${blocks.get(locale) ?? ''}]`);
    }
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
    `checked ${baselineByKey.size} keys, text limit ${TEXT_LIMIT}`,
);
