// src/app/__tests__/semantic-structure.test.ts v5.2.57
// 语义结构静态门禁：页面标题层级与地标数量直接影响 SEO / a11y，且不依赖本地字体网络。
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = (path: string) => readFileSync(`${process.cwd()}/${path}`, 'utf8');
const count = (text: string, pattern: RegExp) => (text.match(pattern) ?? []).length;

describe('semantic heading structure', () => {
  it('gives learn and practice exactly one h1 and no other heading tags at page root', () => {
    for (const file of [
      'src/components/pages/learn-page.tsx',
      'src/components/pages/practice-page.tsx',
    ]) {
      const text = source(file);
      expect(count(text, /<h1[\s>]/g)).toBe(1);
      expect(count(text, /<h2[\s>]/g)).toBe(0);
    }
  });

  it('uses h2 for section headings under the learn/practice h1', () => {
    for (const file of [
      'src/components/learn/character-detail.tsx',
      'src/components/learn/word-examples.tsx',
      'src/components/practice/practice-options.tsx',
      'src/components/practice/weekly-progress.tsx',
    ]) {
      const text = source(file);
      expect(count(text, /<h3[\s>]/g)).toBe(0);
      expect(count(text, /<h2[\s>]/g)).toBeGreaterThan(0);
    }
  });

  it('keeps a single global main landmark on legal pages', () => {
    for (const file of ['src/app/privacy/page.tsx', 'src/app/terms/page.tsx']) {
      const text = source(file);
      expect(count(text, /<main[\s>]/g)).toBe(0);
      expect(count(text, /<h1[\s>]/g)).toBe(1);
      expect(text).toContain('<Breadcrumbs');
    }
  });

  it('renders breadcrumbs on every inner page and never on the homepage', () => {
    for (const file of ['learn-page.tsx', 'practice-page.tsx']) {
      expect(source(`src/components/pages/${file}`)).toContain('<Breadcrumbs');
    }
    expect(source('src/components/pages/home-page.tsx')).not.toContain('<Breadcrumbs');
  });
});
