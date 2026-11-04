import fs from 'fs';

const read = (f) => (fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '');
const checks = {
  'proxy.ts deleted': !fs.existsSync('src/proxy.ts'),
  'styles/utilities.css exists': fs.existsSync('src/app/styles/utilities.css'),
  'styles/keyframes.css exists': fs.existsSync('src/app/styles/keyframes.css'),
  'globals imports utilities': read('src/app/globals.css').includes('styles/utilities.css'),
  'learn-quiz-dialog id': read('src/components/learn/quiz-dialog.tsx').includes('learn-quiz-dialog'),
  'practice-quiz-dialog id': read('src/components/practice/quiz-dialog.tsx').includes('practice-quiz-dialog'),
  'feature-card no static id': !read('src/components/feature-card.tsx').includes('id="feature-card"'),
  'stats-card no static id': !read('src/components/stats-card.tsx').includes('id="stats-card"'),
  'app-shell id': read('src/components/layout-client.tsx').includes('id="app-shell"'),
  'mobile-nav v5.2.26': read('src/components/mobile-nav.tsx').includes('v5.2.26'),
  'stroke-order-demo uses var': read('src/components/learn/stroke-order-demo.tsx').includes('var(--color-primary)'),
  'package 5.2.26': read('package.json').includes('"version": "5.2.26"'),
  'pnpm-workspace.yaml': fs.existsSync('pnpm-workspace.yaml'),
  'CHANGELOG 5.2.26': read('CHANGELOG.md').includes('[5.2.26]'),
};
const lines = ['=== prior fixes ==='];
for (const [k, v] of Object.entries(checks)) lines.push(`${v ? 'OK  ' : 'FAIL'} ${k}`);

const protos = [
  'prototype/prototype.html',
  'prototype/character-detail.html',
  'prototype/wireframes.html',
  'prototype/learn.html',
  'prototype/practice.html',
  'prototype/progress.html',
];
lines.push('', '=== prototype files ===');
for (const f of protos) {
  const s = read(f);
  const ids = [...s.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  const styleTags = (s.match(/<style/g) || []).length;
  const scriptTags = (s.match(/<script/g) || []).length;
  lines.push(`${f} | lines=${s.split(/\r?\n/).length} | <style>=${styleTags} <script>=${scriptTags} | ids=${ids.length} | dup=[${[...new Set(dup)].join(',')}]`);
  lines.push(`  ids: ${ids.join(', ')}`);
  const styleStart = s.indexOf('<style');
  const styleEnd = s.lastIndexOf('</style>');
  const scriptStart = s.indexOf('<script');
  const scriptEnd = s.lastIndexOf('</script>');
  lines.push(`  style-block-lines=${styleStart >= 0 ? s.slice(0, styleEnd).split('\n').length - s.slice(0, styleStart).split('\n').length : 0} script-block-lines=${scriptStart >= 0 ? s.slice(0, scriptEnd).split('\n').length - s.slice(0, scriptStart).split('\n').length : 0}`);
}
fs.writeFileSync('audit-result.txt', lines.join('\n') + '\n');
console.log('done');
