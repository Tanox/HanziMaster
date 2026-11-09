// src/components/learn/word-examples.tsx v5.2.47
// 词条用发丝线分隔，不再堆同款圆角卡片；中文界面下译文与词条相同则不重复显示。
'use client';

import { useTranslation } from '@/components/locale-provider';
import type { Word } from '@/lib/character-types';

export function WordExamples({ words }: { words: Word[] }) {
  const { t } = useTranslation();

  return (
    <section className="text-start">
      <h3 className="display-font text-lg font-semibold text-ink-900 dark:text-ink-50">
        {t('learn.wordExamples')}
      </h3>
      <ul className="mt-3 border-t border-ink-200 dark:border-ink-800">
        {words.map((word, index) => {
          const translation = t(word.translationKey);
          return (
            <li
              key={index}
              className="flex items-baseline justify-between gap-4 border-b border-ink-200 py-3 dark:border-ink-800"
            >
              <span className="flex items-baseline gap-3">
                <span className="serif-font text-xl text-ink-900 dark:text-ink-50">{word.text}</span>
                <span className="text-sm text-ink-500 dark:text-ink-400">{word.pinyin}</span>
              </span>
              {translation !== word.text && (
                <span className="text-end text-sm text-ink-600 dark:text-ink-300">{translation}</span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
