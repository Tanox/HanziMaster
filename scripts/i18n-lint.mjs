// scripts/i18n-lint.mjs v5.2.42
// 校验 11 语言包、扩展模块与站点语言常量的键/清单一致性。
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

const extensionModules = ['legal', 'a11y', 'meanings', 'settings'];
for (const module of extensionModules) {
  const source = fs.readFileSync(path.join(root, 'extensions', `${module}.ts`), 'utf8');
  for (const locale of expected) {
    if (!source.includes(`'${locale}':`) && !source.includes(`  ${locale}:`)) {
      errors.push(`extensions/${module}.ts missing locale: ${locale}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`i18n lint OK: ${expected.length} locales, ${extensionModules.length} extension modules`);
