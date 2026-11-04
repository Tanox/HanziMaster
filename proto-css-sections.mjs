import fs from 'fs';
const files = ['prototype.html', 'character-detail.html', 'wireframes.html', 'learn.html', 'practice.html', 'progress.html'];
const out = [];
for (const name of files) {
  const lines = fs.readFileSync('prototype/' + name, 'utf8').split(/\r?\n/);
  const s = lines.findIndex(l => /<style/.test(l));
  const e = lines.findIndex((l, i) => i > s && /<\/style>/.test(l));
  out.push(`===== ${name} CSS ${s + 1}-${e + 1} (${e - s + 1} lines) =====`);
  lines.slice(s, e + 1).forEach((l, i) => {
    if (/^\s*\/\*/.test(l)) out.push(`${s + 1 + i}: ${l.trim().slice(0, 110)}`);
  });
  // multi-line brace rule detection (lines with { but no })
  const open = lines.slice(s, e + 1).filter(l => l.includes('{') && !l.includes('}')).length;
  out.push(`  lines with unmatched '{' (block starts): ${open}`);
}
fs.writeFileSync('proto-css-result.txt', out.join('\n') + '\n', 'utf8');
console.log('done');
