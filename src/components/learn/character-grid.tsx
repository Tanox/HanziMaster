// src/components/learn/character-grid.tsx v5.2.6
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
      className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-5 mb-12 stagger-children"
      id="character-grid"
      role="listbox"
      aria-label={t('common.masterCharacters')}
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
            className={`group aspect-square rounded-2xl border-2 border-transparent hover:border-vermilion-300 dark:hover:border-vermilion-500 hover:bg-vermilion-50/50 dark:hover:bg-vermilion-900/10 hover:shadow-ink transition-[colors,transform] duration-300 flex flex-col items-center justify-center relative overflow-hidden ${
              isSelected
                ? 'bg-vermilion-500 text-primary-foreground shadow-vermilion-glow'
                : 'bg-card dark:bg-ink-900/50 text-ink-900 dark:text-ink-50'
            }`}
          >
            {isSelected && (
              <div className="absolute inset-0 bg-vermilion-500/20 animate-pulse" />
            )}
            <span className={`text-4xl sm:text-5xl font-light serif-font transition-transform duration-300 ${
              isSelected ? '' : 'group-hover:scale-105'
            }`}>
              {character.hanzi}
            </span>
            <span className={`text-xs sm:text-sm mt-2 font-medium ${
              isSelected ? 'text-primary-foreground/80' : 'text-ink-500 dark:text-ink-400'
            }`}>
              {character.pinyin}
            </span>
            {isSelected && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary-foreground/20 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
