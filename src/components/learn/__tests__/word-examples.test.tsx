// src/components/learn/__tests__/word-examples.test.tsx v5.2.47
// 词条译文去重：中文界面译文与词条相同时不再重复，不同时（如 en / zh-TW 简繁差异）仍展示。
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WordExamples } from '../word-examples';
import type { Word } from '@/lib/character-types';

const words: Word[] = [
  { text: '大人', pinyin: 'dàrén', translationKey: 'learn.words.adult' },
  { text: '大学', pinyin: 'dàxué', translationKey: 'learn.words.university' },
];

const mockT = vi.fn();
vi.mock('@/components/locale-provider', () => ({
  useTranslation: () => ({ t: (key: string) => mockT(key) }),
}));

describe('WordExamples', () => {
  it('译文与词条相同时不重复渲染（zh-CN / ja 常见）', () => {
    mockT.mockImplementation((key: string) =>
      key === 'learn.wordExamples' ? '词语与短语' : key === 'learn.words.adult' ? '大人' : '大学'
    );
    render(<WordExamples words={words} />);

    expect(screen.getAllByText('大人')).toHaveLength(1);
    expect(screen.getAllByText('大学')).toHaveLength(1);
    expect(screen.getByText('dàrén')).toBeTruthy();
  });

  it('译文与词条不同时保留译文（en / zh-TW 简繁差异）', () => {
    mockT.mockImplementation((key: string) =>
      key === 'learn.wordExamples' ? 'Words & Phrases' : key === 'learn.words.adult' ? 'adult' : '大學'
    );
    render(<WordExamples words={words} />);

    expect(screen.getByText('adult')).toBeTruthy();
    expect(screen.getByText('大學')).toBeTruthy();
    expect(screen.getAllByText('大学')).toHaveLength(1);
  });
});
