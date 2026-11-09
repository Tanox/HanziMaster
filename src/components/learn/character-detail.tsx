// src/components/learn/character-detail.tsx v5.2.47
// 字帖跨页：左页田字格字板，右页题跋（例句 + 词语），下横带笔顺，底部动作条。
'use client';

import { useTranslation } from '@/components/locale-provider';
import type { Character } from '@/lib/characters';
import { Button } from '@/components/ui/button';
import { CharacterPlate } from '@/components/learn/character-plate';
import { WordExamples } from '@/components/learn/word-examples';
import dynamic from 'next/dynamic';

// 笔顺演示（含 12KB SVG 数据）按需加载，首屏只留骨架（P1-12）
const StrokeOrderDemo = dynamic(
  () => import('@/components/learn/stroke-order-demo').then((m) => m.StrokeOrderDemo),
  {
    ssr: false,
    loading: () => (
      <div id="stroke-order-skeleton" className="aspect-square w-full max-w-[220px] animate-pulse bg-ink-100 dark:bg-ink-800" />
    ),
  }
);

interface CharacterDetailProps {
  character: Character;
  onStartQuiz: () => void;
  onNextCharacter: () => void;
  onSpeak: (text: string) => void;
  /** 三态：null = 挂载后能力检测中 */
  speechSupported: boolean | null;
  pronounceError: boolean;
}

export function CharacterDetail({
  character,
  onStartQuiz,
  onNextCharacter,
  onSpeak,
  speechSupported,
  pronounceError,
}: CharacterDetailProps) {
  const { t } = useTranslation();
  const exampleTranslation = t(character.example.translationKey);

  return (
    <section
      id="character-detail"
      className="reveal revealed rounded-3xl border border-ink-200 bg-card/80 p-6 shadow-ink backdrop-blur-xl sm:p-10 dark:border-ink-800 dark:bg-ink-900/70"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        <CharacterPlate
          character={character}
          onSpeak={onSpeak}
          speechSupported={speechSupported}
          pronounceError={pronounceError}
        />

        <div className="flex flex-col gap-8 text-start">
          <section>
            <h3 className="display-font text-lg font-semibold text-ink-900 dark:text-ink-50">
              {t('learn.exampleTitle')}
            </h3>
            <div className="mt-3 border-s-2 border-vermilion-200 ps-4 dark:border-vermilion-800">
              <p className="serif-font text-xl leading-relaxed text-ink-900 dark:text-ink-50">
                {character.example.sentence}
              </p>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{character.example.pinyin}</p>
              {exampleTranslation !== character.example.sentence && (
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{exampleTranslation}</p>
              )}
            </div>
          </section>

          <WordExamples words={character.words} />

          <section className="border-t border-ink-200 pt-8 dark:border-ink-800">
            <h3 className="display-font text-lg font-semibold text-ink-900 dark:text-ink-50">
              {t('learn.strokeOrder')}
            </h3>
            <div className="mt-4">
              <StrokeOrderDemo character={character.hanzi} strokeCount={character.strokes} />
            </div>
          </section>
        </div>
      </div>

      <div
        id="detail-actions"
        className="mt-8 grid grid-cols-2 gap-3 border-t border-ink-200 pt-6 sm:flex sm:justify-end sm:gap-4 dark:border-ink-800"
      >
        <Button onClick={onStartQuiz} className="rounded-full bg-vermilion-500 text-primary-foreground hover:bg-vermilion-600">
          {t('learn.startQuiz')}
        </Button>
        <Button
          variant="outline"
          onClick={onNextCharacter}
          className="rounded-full border-ink-200 text-ink-700 dark:border-ink-700 dark:text-ink-200"
        >
          {t('learn.nextCharacter')}
        </Button>
      </div>
    </section>
  );
}
