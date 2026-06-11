'use client';

import { useState, useCallback } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Character {
  id: number;
  hanzi: string;
  pinyin: string;
  meaning: string;
  translationKey: string;
  strokes: number;
  radical: string;
  structure: string;
}

const baseCharacters: Character[] = [
  { id: 1, hanzi: '一', pinyin: 'yī', meaning: '', translationKey: 'learn.one', strokes: 1, radical: '一', structure: '独体' },
  { id: 2, hanzi: '二', pinyin: 'èr', meaning: '', translationKey: 'learn.two', strokes: 2, radical: '二', structure: '独体' },
  { id: 3, hanzi: '三', pinyin: 'sān', meaning: '', translationKey: 'learn.three', strokes: 3, radical: '一', structure: '独体' },
  { id: 4, hanzi: '人', pinyin: 'rén', meaning: '', translationKey: 'learn.person', strokes: 2, radical: '人', structure: '独体' },
  { id: 5, hanzi: '大', pinyin: 'dà', meaning: '', translationKey: 'learn.big', strokes: 3, radical: '大', structure: '独体' },
  { id: 6, hanzi: '小', pinyin: 'xiǎo', meaning: '', translationKey: 'learn.small', strokes: 3, radical: '小', structure: '独体' },
  { id: 7, hanzi: '口', pinyin: 'kǒu', meaning: '', translationKey: 'learn.mouth', strokes: 3, radical: '口', structure: '独体' },
  { id: 8, hanzi: '日', pinyin: 'rì', meaning: '', translationKey: 'learn.sunDay', strokes: 4, radical: '日', structure: '独体' },
  { id: 9, hanzi: '月', pinyin: 'yuè', meaning: '', translationKey: 'learn.moonMonth', strokes: 4, radical: '月', structure: '独体' },
  { id: 10, hanzi: '山', pinyin: 'shān', meaning: '', translationKey: 'learn.mountain', strokes: 3, radical: '山', structure: '独体' },
  { id: 11, hanzi: '水', pinyin: 'shuǐ', meaning: '', translationKey: 'learn.water', strokes: 4, radical: '水', structure: '独体' },
  { id: 12, hanzi: '火', pinyin: 'huǒ', meaning: '', translationKey: 'learn.fire', strokes: 4, radical: '火', structure: '独体' },
];

export default function LearnPage() {
  const { t } = useTranslation();
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(baseCharacters[0]?.id ?? null);

  const selectedCharacter = baseCharacters.find(char => char.id === selectedCharacterId) ?? null;

  const selectCharacter = useCallback((char: Character) => {
    setSelectedCharacterId(char.id);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, char: Character) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectCharacter(char);
    }
  }, [selectCharacter]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 safe-bottom">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 text-foreground">
          {t('common.dailyPractice')}
        </h2>
        <p className="text-xl text-muted-foreground">
          {t('common.masterCharacters')}
        </p>
      </div>

      <div
        className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-5 mb-12"
        role="listbox"
        aria-label={t('common.masterCharacters')}
      >
        {baseCharacters.map((char) => {
          const isSelected = selectedCharacterId === char.id;
          return (
            <button
              key={char.id}
              onClick={() => selectCharacter(char)}
              onKeyDown={(e) => handleKeyDown(e, char)}
              role="option"
              aria-selected={isSelected}
              tabIndex={0}
              className={`group bg-muted dark:bg-card aspect-square rounded-3xl border-2 border-transparent hover:border-[#007aff] dark:hover:border-[#2997ff] hover:bg-[#007aff]/5 dark:hover:bg-[#007aff]/10 transition-colors duration-300 text-center relative overflow-hidden outline-none ${
                isSelected
                  ? 'bg-primary border-primary'
                  : ''
              }`}
            >
              <span className={`text-4xl sm:text-5xl font-light mb-2 block transition-colors hanzi-font ${
                isSelected
                  ? 'text-primary-foreground'
                  : 'text-foreground'
              }`}>
                {char.hanzi}
              </span>
              <span className={`text-xs text-muted-foreground uppercase tracking-wider font-medium ${
                isSelected ? 'text-primary-foreground/70' : ''
              }`}>
                {char.pinyin}
              </span>
            </button>
          );
        })}
      </div>

      {selectedCharacter && (
        <div className="bg-muted dark:bg-card rounded-[32px] p-10 border border-border animate-scale-in">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br from-background to-muted dark:from-card dark:to-background rounded-[24px] flex items-center justify-center border border-border shrink-0 relative group">
              <span className="text-[120px] sm:text-[140px] font-light text-muted-foreground hanzi-font transition-all duration-500 group-hover:scale-110">
                {selectedCharacter.hanzi}
              </span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-4 mb-8">
                <h3 className="text-4xl sm:text-5xl font-semibold text-foreground hanzi-font">
                  {selectedCharacter.hanzi}
                </h3>
                <span className="text-2xl text-muted-foreground font-medium">
                  {selectedCharacter.pinyin}
                </span>
                <Badge variant="secondary" className="text-sm font-semibold">
                  {t(selectedCharacter.translationKey)}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-background dark:bg-foreground/5 rounded-[20px] p-5">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">
                    {t('common.strokeCount')}
                  </div>
                  <div className="text-2xl font-semibold text-foreground">
                    {selectedCharacter.strokes} {t('common.strokes')}
                  </div>
                </div>
                <div className="bg-background dark:bg-foreground/5 rounded-[20px] p-5">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">
                    {t('learn.radical')}
                  </div>
                  <div className="text-2xl font-semibold text-foreground hanzi-font">
                    {selectedCharacter.radical}
                  </div>
                </div>
                <div className="bg-background dark:bg-foreground/5 rounded-[20px] p-5">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">
                    {t('learn.structure')}
                  </div>
                  <div className="text-2xl font-semibold text-foreground">
                    {selectedCharacter.structure}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start">
                <Button size="lg" className="rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {t('common.practiceWriting')}
                </Button>
                <Button variant="ghost" size="lg" className="rounded-full text-[#007aff]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  {t('common.hearPronunciation')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
