// src/app/learn/page.tsx v3.0.0
'use client';

import { useState, useCallback, useRef, memo } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { characters, type Character } from '@/lib/characters';
import { useWritingCanvas } from '@/hooks/use-canvas';
import { useIsDark } from '@/hooks/use-is-dark';
import { usePronunciation } from '@/hooks/use-pronunciation';

interface CharacterButtonProps {
  character: Character;
  index: number;
  isSelected: boolean;
  onSelect: (char: Character) => void;
  tabIndex: number;
  onFocus?: () => void;
  isLearned?: boolean;
}

const CharacterButton = memo(function CharacterButton({ character, index, isSelected, onSelect, tabIndex, onFocus, isLearned }: CharacterButtonProps) {
  return (
    <button
      data-char-index={index}
      onClick={() => onSelect(character)}
      onFocus={onFocus}
      role="option"
      aria-selected={isSelected}
      tabIndex={tabIndex}
      className={cn(
        'group bg-muted dark:bg-card aspect-square rounded-3xl border-2 border-transparent hover:border-[#007aff] dark:hover:border-[#2997ff] hover:bg-[#007aff]/5 dark:hover:bg-[#007aff]/10 transition-all duration-300 text-center relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007aff] focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        isSelected && 'bg-primary border-primary',
      )}
    >
      <span className={cn('text-4xl sm:text-5xl font-light mb-2 block transition-colors hanzi-font', isSelected ? 'text-primary-foreground' : 'text-foreground')}>
        {character.hanzi}
      </span>
      <span className={cn('text-xs text-muted-foreground uppercase tracking-wider font-medium', isSelected && 'text-primary-foreground/70')}>
        {character.pinyin}
      </span>
      {isLearned && (
        <div className="absolute top-2 right-2 size-5 bg-[#34c759] rounded-full flex items-center justify-center">
          <svg className="size-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
});

export default function LearnPage() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(characters[0]?.id ?? null);
  const [showWritingDialog, setShowWritingDialog] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [showStrokeOrder, setShowStrokeOrder] = useState(false);
  const isDark = useIsDark(theme);
  const { isSpeaking, pronounceError, speak } = usePronunciation();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const selectedCharacter = characters.find(char => char.id === selectedCharacterId) ?? null;

  const selectCharacter = useCallback((char: Character) => {
    setSelectedCharacterId(char.id);
    setShowStrokeOrder(false);
  }, []);

  const handleListKeyDown = useCallback((e: React.KeyboardEvent) => {
    const total = characters.length;
    if (total === 0) return;
    let nextIndex = focusedIndex;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (focusedIndex + 1) % total;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = (focusedIndex - 1 + total) % total;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = total - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        selectCharacter(characters[focusedIndex]);
        return;
      default:
        return;
    }
    setFocusedIndex(nextIndex);
    const button = document.querySelector<HTMLButtonElement>(`[data-char-index="${nextIndex}"]`);
    button?.focus();
  }, [focusedIndex, selectCharacter]);

  const { clearCanvas } = useWritingCanvas({
    canvasRef,
    showDialog: showWritingDialog,
    character: selectedCharacter?.hanzi ?? '',
    isDark,
    showHint: true,
  });

  const handlePronunciation = useCallback(() => {
    if (selectedCharacter) speak(selectedCharacter.hanzi);
  }, [selectedCharacter, speak]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 safe-bottom">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 text-foreground">{t('common.dailyPractice')}</h1>
        <p className="text-xl text-muted-foreground">{t('common.masterCharacters')}</p>
      </div>

      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-5 mb-12" role="listbox" aria-label={t('common.masterCharacters')} onKeyDown={handleListKeyDown}>
        {characters.map((char, index) => (
          <CharacterButton
            key={char.id}
            character={char}
            index={index}
            isSelected={selectedCharacterId === char.id}
            onSelect={selectCharacter}
            tabIndex={index === focusedIndex ? 0 : -1}
            onFocus={() => setFocusedIndex(index)}
          />
        ))}
      </div>

      {selectedCharacter && (
        <div className="bg-muted dark:bg-card rounded-[32px] p-10 border border-border animate-scale-in">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="size-48 sm:size-56 bg-gradient-to-br from-background to-muted dark:from-card dark:to-background rounded-[24px] flex items-center justify-center border border-border shrink-0 relative group">
              <span className="text-[120px] sm:text-[140px] font-light text-muted-foreground hanzi-font transition-all duration-500 group-hover:scale-110">
                {selectedCharacter.hanzi}
              </span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-4 mb-8">
                <h3 className="text-4xl sm:text-5xl font-semibold text-foreground hanzi-font">{selectedCharacter.hanzi}</h3>
                <span className="text-2xl text-muted-foreground font-medium">{selectedCharacter.pinyin}</span>
                <Badge variant="secondary" className="text-sm font-semibold">{t(selectedCharacter.translationKey)}</Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-background dark:bg-foreground/5 rounded-[20px] p-5">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">{t('common.strokeCount')}</div>
                  <div className="text-2xl font-semibold text-foreground">{selectedCharacter.strokes} {t('common.strokes')}</div>
                </div>
                <div className="bg-background dark:bg-foreground/5 rounded-[20px] p-5">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">{t('learn.radical')}</div>
                  <div className="text-2xl font-semibold text-foreground hanzi-font">{selectedCharacter.radical}</div>
                </div>
                <div className="bg-background dark:bg-foreground/5 rounded-[20px] p-5">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">{t('learn.structure')}</div>
                  <div className="text-2xl font-semibold text-foreground">{t(selectedCharacter.structureKey)}</div>
                </div>
              </div>

              {selectedCharacter.words && selectedCharacter.words.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm text-muted-foreground uppercase tracking-wider font-medium mb-4">{t('learn.wordsTitle')}</h4>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {selectedCharacter.words.map((word, idx) => (
                      <button
                        key={word.text}
                        onClick={() => speak(word.text)}
                        className="animate-stagger-fade-in bg-background dark:bg-foreground/5 rounded-2xl px-5 py-3 border border-border hover:border-[#007aff] dark:hover:border-[#2997ff] transition-colors duration-200 text-left"
                        style={{ animationDelay: `${idx * 100}ms` }}
                        aria-label={`${word.text} - ${word.pinyin}`}
                      >
                        <span className="text-lg font-medium text-foreground hanzi-font block">{word.text}</span>
                        <span className="text-xs text-muted-foreground block mt-1">{word.pinyin} · {t(word.translationKey)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedCharacter.example && (
                <div className="mb-8 bg-background dark:bg-foreground/5 rounded-[20px] p-6">
                  <h4 className="text-sm text-muted-foreground uppercase tracking-wider font-medium mb-3">{t('learn.exampleTitle')}</h4>
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => speak(selectedCharacter.example.sentence)}
                      className="shrink-0 size-10 rounded-full bg-[#007aff]/10 flex items-center justify-center hover:bg-[#007aff]/20 transition-colors"
                      aria-label={t('common.hearPronunciation')}
                    >
                      <svg className="size-5 text-[#007aff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    </button>
                    <div>
                      <p className="text-lg text-foreground hanzi-font mb-1">{selectedCharacter.example.sentence}</p>
                      <p className="text-sm text-muted-foreground">{selectedCharacter.example.pinyin}</p>
                      <p className="text-sm text-muted-foreground mt-1">{t(selectedCharacter.example.translationKey)}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedCharacter.strokeOrder && (
                <div className="mb-8">
                  <Button variant="ghost" size="sm" onClick={() => setShowStrokeOrder(!showStrokeOrder)} className="text-[#007aff]">
                    {showStrokeOrder ? t('learn.hideStrokeOrder') : t('learn.showStrokeOrder')}
                  </Button>
                  {showStrokeOrder && (
                    <div className="mt-4 bg-background dark:bg-foreground/5 rounded-[20px] p-5">
                      <p className="text-lg text-foreground font-medium">{selectedCharacter.strokeOrder}</p>
                    </div>
                  )}
                </div>
              )}

              {pronounceError && (
                <div role="alert" className="text-sm text-[#ff3b30] mb-4">{t('common.pronunciationNotSupported')}</div>
              )}

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start">
                <Button size="lg" className="rounded-full" onClick={() => setShowWritingDialog(true)}>
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {t('common.practiceWriting')}
                </Button>
                <Button variant="ghost" size="lg" className="rounded-full text-[#007aff]" onClick={handlePronunciation} disabled={isSpeaking} aria-busy={isSpeaking}>
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  {isSpeaking ? '...' : t('common.hearPronunciation')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showWritingDialog} onOpenChange={setShowWritingDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold hanzi-font">
              {selectedCharacter?.hanzi} - {t('common.practiceWriting')}
            </DialogTitle>
            <DialogDescription>
              {selectedCharacter?.pinyin} · {selectedCharacter && t(selectedCharacter.translationKey)}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <canvas
              ref={canvasRef}
              className="size-[320px] sm:size-[400px] rounded-[24px] border-2 border-border cursor-crosshair touch-none shadow-md"
              aria-label={t('common.practiceWriting')}
            />
          </div>
          <DialogFooter className="flex flex-row sm:justify-between gap-2">
            <div className="text-sm text-muted-foreground">{t('practice.writeOnCanvas')}</div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={clearCanvas}>{t('practice.clear')}</Button>
              <Button onClick={() => setShowWritingDialog(false)}>{t('practice.done')}</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}