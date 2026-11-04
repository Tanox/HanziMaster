import fs from 'fs';

const files = ['prototype.html', 'character-detail.html', 'wireframes.html', 'learn.html', 'practice.html', 'progress.html'];
const out = [];
for (const name of files) {
  const p = 'prototype/' + name;
  const s = fs.readFileSync(p, 'utf8');
  const lines = s.split(/\r?\n/);
  out.push(`===== ${name} (${lines.length} lines) =====`);
  lines.forEach((l, i) => {
    if (/<style|<\/style|<script|<\/script|<body|<\/body|<header|<footer|<main|<section|<nav|<aside/i.test(l)) {
      out.push(`${i + 1}: ${l.trim().slice(0, 140)}`);
    }
  });
  // section comments inside style/script
  out.push('--- section comments ---');
  lines.forEach((l, i) => {
    if (/^\s*\/\*\s*=+|^\s*\/\/\s*=+|^\s*<!--\s*=+/i.test(l) && l.trim().length < 160) {
      out.push(`${i + 1}: ${l.trim().slice(0, 130)}`);
    }
  });
}
fs.writeFileSync('proto-scan-result.txt', out.join('\n') + '\n');
console.log('done');
