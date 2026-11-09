// src/components/learn/character-plate.tsx v5.2.47
// 字帖左页：田字格字板是真实书写参照，格线为结构信息而非装饰。
'use client';

import { useTranslation } from '@/components/locale-provider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Character } from '@/lib/characters';

interface CharacterPlateProps {
  character: Character;
  onSpeak: (text: string) => void;
  speechSupported: boolean | null;
  pronounceError: boolean;
}

export function CharacterPlate({
  character,
  onSpeak,
  speechSupported,
  pronounceError,
}: CharacterPlateProps) {
  const { t } = useTranslation();
  const showHint = speechSupported === false || pronounceError;

  return (
    <div id="character-summary" className="flex flex-col gap-5 text-start lg:border-e lg:border-ink-200 lg:pe-10 dark:lg:border-ink-800">
      <Badge
        variant="outline"
        className="self-start rounded-sm border-vermilion-200 px-2.5 py-1 text-xs font-normal text-vermilion-600 dark:border-vermilion-800 dark:text-vermilion-300"
      >
        {t('learn.strokeCount', { count: character.strokes })}
      </Badge>

      <div className="relative mx-auto aspect-square w-full max-w-[340px] border border-vermilion-200/80 bg-card/60 dark:border-vermilion-800/70 dark:bg-ink-900/40">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M50 0V100 M0 50H100"
            fill="none"
            stroke="var(--color-vermilion-300)"
            strokeWidth="0.35"
            strokeDasharray="2 2"
            opacity="0.65"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[140px] leading-none font-light serif-font text-ink-900 dark:text-ink-50 animate-brush-stroke sm:text-[184px]">
          {character.hanzi}
        </span>
      </div>

      <div className="flex items-end justify-between gap-4 border-t border-ink-200 pt-5 dark:border-ink-800">
        <div>
          <p className="text-xs text-ink-500 dark:text-ink-400">{t('learn.pinyin')}</p>
          <p id="character-pinyin" className="display-font text-4xl font-medium leading-tight text-ink-900 dark:text-ink-50">
            {character.pinyin}
          </p>
        </div>
        <Button
          id="play-audio-btn"
          variant="outline"
          size="icon"
          onClick={() => onSpeak(character.hanzi)}
          disabled={speechSupported === false}
          aria-label={t('learn.playAudio')}
          aria-describedby={showHint ? 'pronunciation-hint' : undefined}
          className="size-11 shrink-0 rounded-full border-ink-200 text-ink-500 hover:border-vermilion-300 hover:bg-vermilion-500/10 hover:text-vermilion-500 disabled:opacity-60 dark:border-ink-700 dark:text-ink-400"
        >
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        </Button>
      </div>
      {showHint && (
        <p id="pronunciation-hint" role="status" className="-mt-2 text-xs text-ink-500 dark:text-ink-400">
          {t('learn.pronunciationUnavailable')}
        </p>
      )}

      <dl className="grid grid-cols-3 gap-3 border-t border-ink-200 pt-5 text-start dark:border-ink-800">
        <div id="character-meaning">
          <dt className="text-xs text-ink-500 dark:text-ink-400">{t('learn.meaning')}</dt>
          <dd className="mt-1 text-lg text-ink-800 dark:text-ink-100">{t(character.translationKey)}</dd>
        </div>
        <div>
          <dt className="text-xs text-ink-500 dark:text-ink-400">{t('learn.radical')}</dt>
          <dd className="mt-1 text-lg serif-font text-ink-800 dark:text-ink-100">{character.radical}</dd>
        </div>
        <div>
          <dt className="text-xs text-ink-500 dark:text-ink-400">{t('learn.structure')}</dt>
          <dd className="mt-1 text-sm leading-7 text-ink-800 dark:text-ink-100">{t(character.structureKey)}</dd>
        </div>
      </dl>
    </div>
  );
}
