// src/app/learn/page.tsx v3.0.0
'use client';

import { useState, useCallback, useRef, memo, useEffect } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { characters, type Character } from '@/lib/characters';
import { useWritingCanvas } from '@/hooks/use-canvas';

// 汉字选择按钮（记忆化避免重渲染）
interface CharacterButtonProps {
  character: Character;
  isSelected: boolean;
  onSelect: (char: Character) => void;
}

const CharacterButton = memo(function CharacterButton({ character, isSelected, onSelect }: CharacterButtonProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(character);
    }
  };
  return (
    <button
      onClick={() => onSelect(character)}
      onKeyDown={handleKeyDown}
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      className={cn(
        'group bg-muted dark:bg-card aspect-square rounded-3xl border-2 border-transparent hover:border-[#007aff] dark:hover:border-[#2997ff] hover:bg-[#007aff]/5 dark:hover:bg-[#007aff]/10 transition-colors duration-300 text-center relative overflow-hidden outline-none',
        isSelected && 'bg-primary border-primary',
      )}
    >
      <span className={cn('text-4xl sm:text-5xl font-light mb-2 block transition-colors hanzi-font', isSelected ? 'text-primary-foreground' : 'text-foreground')}>
        {character.hanzi}
      </span>
      <span className={cn('text-xs text-muted-foreground uppercase tracking-wider font-medium', isSelected && 'text-primary-foreground/70')}>
        {character.pinyin}
      </span>
    </button>
  );
});

export default function LearnPage() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(characters[0]?.id ?? null);
  const [showWritingDialog, setShowWritingDialog] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pronounceError, setPronounceError] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const selectedCharacter = characters.find(char => char.id === selectedCharacterId) ?? null;

  useEffect(() => {
    const checkDark = () => {
      if (theme === 'dark') {
        setIsDark(true);
      } else if (theme === 'system') {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      } else {
        setIsDark(false);
      }
    };
    checkDark();
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.addEventListener('change', checkDark);
    return () => mql.removeEventListener('change', checkDark);
  }, [theme]);

  const selectCharacter = useCallback((char: Character) => {
    setSelectedCharacterId(char.id);
  }, []);

  const { clearCanvas } = useWritingCanvas({
    canvasRef,
    showDialog: showWritingDialog,
    character: selectedCharacter?.hanzi ?? '',
    isDark,
  });

  // 发音播放（Web Speech API），不支持时显示内联错误信息
  const handlePronunciation = useCallback(() => {
    if (!selectedCharacter) return;
    if (!('speechSynthesis' in window)) {
      setPronounceError(true);
      return;
    }
    setPronounceError(false);
    const utterance = new SpeechSynthesisUtterance(selectedCharacter.hanzi);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [selectedCharacter]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 safe-bottom">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 text-foreground">{t('common.dailyPractice')}</h2>
        <p className="text-xl text-muted-foreground">{t('common.masterCharacters')}</p>
      </div>

      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-5 mb-12" role="listbox" aria-label={t('common.masterCharacters')}>
        {characters.map((char) => (
          <CharacterButton key={char.id} character={char} isSelected={selectedCharacterId === char.id} onSelect={selectCharacter} />
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
                <Button variant="ghost" size="lg" className="rounded-full text-[#007aff]" onClick={handlePronunciation} disabled={isSpeaking}>
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

      {/* 书写练习对话框 */}
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
