import fs from 'node:fs';
const V_FROM = '5.2.30';
const V = '5.2.31';
const rd = f => fs.readFileSync(f, 'utf8');
const wr = (f, s) => fs.writeFileSync(f, s, 'utf8');

const stamped = [
  'src/lib/i18n/translations/en.ts', 'src/lib/i18n/translations/zh-CN.ts', 'src/lib/i18n/translations/zh-TW.ts',
  'src/lib/i18n/translations/es.ts', 'src/lib/i18n/translations/ar.ts', 'src/lib/i18n/translations/fr.ts',
  'src/lib/i18n/translations/pt-BR.ts', 'src/lib/i18n/translations/de.ts', 'src/lib/i18n/translations/ja.ts',
  'src/lib/i18n/translations/ko.ts', 'src/lib/i18n/translations/ru.ts',
  'src/components/state/state-views.tsx', 'src/app/error.tsx', 'src/app/not-found.tsx', 'src/app/loading.tsx',
  'src/hooks/use-haptic.ts', 'src/hooks/use-swipe-close.ts', 'src/lib/storage.ts',
  'src/components/mobile-nav.tsx', 'src/components/nav-link.tsx',
  'src/components/learn/character-grid.tsx', 'src/components/learn/character-detail.tsx',
  'src/app/learn/page.tsx', 'src/app/practice/page.tsx', 'src/components/practice/practice-options.tsx',
  'src/app/globals.css', 'src/app/styles/utilities.css',
  'vitest.config.ts', 'vitest.setup.ts',
  'src/components/state/__tests__/state-views.test.tsx', 'src/hooks/__tests__/use-progress.test.tsx',
  'src/hooks/__tests__/use-pronunciation.test.tsx', 'src/components/learn/__tests__/character-grid.test.tsx',
  'prototype/wireframes.html', 'prototype/styles/wireframes-part2.css', 'prototype/scripts/wireframes-states.js',
  'prototype/DESIGN_SPEC.md', 'docs/tasks.md', 'docs/tasks-done.md',
];

for (const f of stamped) {
  const s = rd(f);
  if (s.includes(V_FROM)) wr(f, s.replaceAll(V_FROM, V));
}

const pkg = JSON.parse(rd('package.json'));
pkg.version = V;
wr('package.json', JSON.stringify(pkg, null, 2) + '\n');

const meta = JSON.parse(rd('metadata.json'));
meta.version = V;
meta.name = `HanziMaster 汉字大师 v${V}`;
meta.description = `v${V}: 完成 tasks.md T1/T2/T4–T14（状态组件、焦点增强、动效与手势、组件测试、原型状态可视化），T3 安全修复推进中。`;
wr('metadata.json', JSON.stringify(meta, null, 2) + '\n');

for (const f of ['README.md', 'README_EN.md']) wr(f, rd(f).replaceAll(`v${V_FROM}`, `v${V}`));
console.log('synced to', V);
