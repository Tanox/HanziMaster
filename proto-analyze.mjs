import fs from 'fs';

const files = ['prototype.html', 'character-detail.html', 'wireframes.html', 'learn.html', 'practice.html', 'progress.html'];
const out = [];
for (const name of files) {
  const s = fs.readFileSync('prototype/' + name, 'utf8');
  const ids = [...s.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  out.push(`===== ${name} =====`);
  const inlineHandlers = [...s.matchAll(/\son[a-z]+="[^"]*"/g)].map(m => m[0]);
  out.push(`inline handlers(${inlineHandlers.length}): ${inlineHandlers.slice(0, 8).join(' | ')}`);
  out.push(`script type attrs: ${[...s.matchAll(/<script([^>]*)>/g)].map(m => m[1].trim() || '(none)').join(' | ')}`);
  // token collisions: id appearing outside attribute/selector/string contexts
  for (const id of ids) {
    const re = new RegExp('\\b' + id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g');
    const total = (s.match(re) || []).length;
    const asId = (s.match(new RegExp('\\sid="' + id + '"', 'g')) || []).length;
    const asRef = (s.match(new RegExp("['\"]#?" + id + "['\"]", 'g')) || []).length;
    const asSel = (s.match(new RegExp('#' + id + '\\b', 'g')) || []).length;
    const other = total - asId - asRef - asSel;
    if (other > 0) out.push(`  COLLISION? ${id}: total=${total} id=${asId} strRef=${asRef} sel=${asSel} other=${other}`);
  }
  // unresolved aria/anchor refs
  const refs = [
    ...[...s.matchAll(/aria-(?:controls|labelledby|describedby)="([^"]+)"/g)].map(m => m[1]),
    ...[...s.matchAll(/href="#([^"]+)"/g)].map(m => m[1]),
  ];
  const missing = [...new Set(refs)].filter(r => !ids.includes(r));
  out.push(`UNRESOLVED refs: ${missing.length ? missing.join(', ') : '(none)'}`);
}
fs.writeFileSync('proto-analyze-result.txt', out.join('\n') + '\n');
console.log('done');
