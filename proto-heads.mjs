import fs from 'fs';
const files = ['prototype.html', 'character-detail.html', 'wireframes.html', 'learn.html', 'practice.html', 'progress.html'];
const out = [];
for (const name of files) {
  const lines = fs.readFileSync('prototype/' + name, 'utf8').split(/\r?\n/);
  out.push(`===== ${name} =====`);
  lines.slice(0, 22).forEach((l, i) => out.push(`${i + 1}: ${l}`));
  out.push('--- header/nav/footer/main tags ---');
  lines.forEach((l, i) => {
    if (/<(header|nav|footer|main|section|form|aside)\b/i.test(l)) out.push(`${i + 1}: ${l.trim().slice(0, 160)}`);
  });
}
fs.writeFileSync('proto-heads-result.txt', out.join('\n') + '\n', 'utf8');
console.log('done');
