import fs from 'fs';

const files = ['prototype.html', 'character-detail.html', 'wireframes.html', 'learn.html', 'practice.html', 'progress.html'];
const out = [];
for (const name of files) {
  const s = fs.readFileSync('prototype/' + name, 'utf8');
  out.push(`===== ${name} =====`);
  const ids = [...s.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  out.push(`ids(${ids.length}): ${ids.join(', ')}`);
  const refs = [...s.matchAll(/getElementById\(\s*['"]([^'"]+)['"]\s*\)/g)].map(m => m[1]);
  out.push(`getElementById refs: ${[...new Set(refs)].join(', ')}`);
  const q = [...s.matchAll(/querySelector(?:All)?\(\s*['"]#([^'"\s.,>:[]+)/g)].map(m => m[1]);
  out.push(`querySelector #refs: ${[...new Set(q)].join(', ')}`);
  const anchors = [...s.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
  out.push(`href anchors: ${[...new Set(anchors)].join(', ')}`);
  const aria = [...s.matchAll(/aria-(?:controls|labelledby|describedby)="([^"]+)"/g)].map(m => m[1]);
  out.push(`aria refs: ${[...new Set(aria)].join(', ')}`);
  const cssIds = [...s.matchAll(/#([A-Za-z][\w-]*)\s*[{,.:>\s]/g)].map(m => m[1]);
  out.push(`css #selectors: ${[...new Set(cssIds)].join(', ')}`);
  out.push(`script tags: ${[...s.matchAll(/<script[^>]*>/g)].map(m => m[0]).join(' | ')}`);
  out.push(`version header: ${(s.match(/<!--[^\n]*v[\d.]+[^\n]*-->/) || ['(none)'])[0]}`);
}
fs.writeFileSync('proto-refs-result.txt', out.join('\n') + '\n');
console.log('done');
