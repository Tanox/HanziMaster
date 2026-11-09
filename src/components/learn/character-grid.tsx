// src/components/learn/character-grid.tsx v5.2.47
// 选字格改为素纸小格 + 朱砂印角，去掉整格红底与脉冲装饰。
'use client';

import { useTranslation } from '@/components/locale-provider';
import { characters } from '@/lib/characters';

interface CharacterGridProps {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export function CharacterGrid({ selectedId, onSelect }: CharacterGridProps) {
  const { t } = useTranslation();

  return (
    <div
      id="character-grid"
      role="listbox"
      aria-label={t('common.masterCharacters')}
      className="stagger-children reveal mb-8 grid grid-cols-2 gap-3 xs:grid-cols-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6"
    >
      {characters.map((character) => {
        const isSelected = selectedId === character.id;
        return (
          <button
            key={character.id}
            onClick={() => onSelect(character.id)}
            role="option"
            aria-selected={isSelected}
            aria-label={`${character.hanzi}, ${character.pinyin}`}
            className={`group relative flex aspect-square flex-col items-center justify-center border transition-colors duration-200 ${
              isSelected
                ? 'border-vermilion-500/70 bg-vermilion-50/60 text-vermilion-600 dark:border-vermilion-700 dark:bg-vermilion-900/10 dark:text-vermilion-300'
                : 'border-ink-200 bg-card/60 text-ink-900 hover:border-vermilion-300 dark:border-ink-800 dark:bg-ink-900/30 dark:text-ink-50 dark:hover:border-vermilion-700'
            }`}
          >
            {isSelected && (
              <span aria-hidden="true" className="absolute start-2 top-2 size-1.5 bg-vermilion-500" />
            )}
            <span className="serif-font text-4xl font-light sm:text-5xl">{character.hanzi}</span>
            <span className={`mt-2 text-xs sm:text-sm ${
              isSelected ? 'text-vermilion-600/80 dark:text-vermilion-300/80' : 'text-ink-500 dark:text-ink-400'
            }`}>
              {character.pinyin}
            </span>
          </button>
        );
      })}
    </div>
  );
}
