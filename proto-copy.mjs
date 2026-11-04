import fs from 'fs';
const files = ['prototype.html', 'character-detail.html', 'wireframes.html', 'learn.html', 'practice.html', 'progress.html'];
const out = [];
for (const name of files) {
  const lines = fs.readFileSync('prototype/' + name, 'utf8').split(/\r?\n/);
  out.push(`===== ${name} (${lines.length} lines) =====`);
  lines.forEach((l, i) => {
    if (/\bAI\b|AI-|AI_|artificial intelligence| powered|智能|机器学习|GPT|Gemini/i.test(l)) {
      out.push(`${i + 1}: ${l.trim().slice(0, 220)}`);
    }
  });
}
fs.writeFileSync('proto-copy-result.txt', out.join('\n') + '\n', 'utf8');
console.log('done');
