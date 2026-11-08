// src/components/practice/quiz-dialog.tsx v5.2.44
'use client';

import { useTranslation } from '@/components/locale-provider';
import type { CharacterQuiz } from '@/components/practice/practice-assets';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface QuizDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  character: CharacterQuiz;
  selectedAnswer: string;
  answered: boolean;
  onAnswer: (hanzi: string) => void;
  onNext: () => void;
}

const QUIZ_OPTIONS = ['一', '二', '三', '人', '大', '小', '口', '日'];

export function QuizDialog({
  open,
  onOpenChange,
  character,
  selectedAnswer,
  answered,
  onAnswer,
  onNext,
}: QuizDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent id="practice-quiz-dialog" closeLabel={t('common.close')} className="sm:max-w-[480px] bg-card/95 dark:bg-ink-900/95 backdrop-blur-xl rounded-3xl border-ink-100 dark:border-ink-800 shadow-ink-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-ink-900 dark:text-ink-50 display-font">
            {t('practice.quizTitle')}
          </DialogTitle>
          <DialogDescription className="text-ink-600 dark:text-ink-300">
            {t('practice.quizDialogDesc')}
          </DialogDescription>
        </DialogHeader>

        <div className="py-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-6xl font-light serif-font text-ink-900 dark:text-ink-50">
              {character.hanzi}
            </span>
            <div className="text-right">
              <p className="text-2xl font-medium text-ink-900 dark:text-ink-50">{character.pinyin}</p>
              <p className="text-sm text-ink-500 dark:text-ink-400">{t(character.meaningKey)}</p>
            </div>
          </div>

          <div id="practice-quiz-options" role="radiogroup" aria-label={t('practice.quizTitle')} className="grid grid-cols-2 gap-4">
            {QUIZ_OPTIONS.map((char) => {
              const checked = selectedAnswer === char;
              return (
                <button
                  key={char}
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  onClick={() => onAnswer(char)}
                  disabled={answered}
                  className={`relative py-6 text-3xl font-light serif-font rounded-lg transition-[colors,transform] duration-300 ${
                    checked
                      ? char === character.hanzi
                        ? 'bg-vermilion-500 text-primary-foreground shadow-vermilion-glow ring-2 ring-vermilion-600'
                        : 'bg-destructive text-destructive-foreground ring-2 ring-destructive'
                      : 'bg-ink-50/50 dark:bg-ink-800/30 text-ink-900 dark:text-ink-50 border border-ink-200 dark:border-ink-700 hover:border-vermilion-300 dark:hover:border-vermilion-500'
                  }`}
                >
                  {char}
                  {/* 选中态的第二视觉线索：颜色之外提供勾选图标 */}
                  {checked && <span aria-hidden="true" className="absolute top-1 end-2 text-base">✓</span>}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className={`mt-6 text-center font-semibold ${
              selectedAnswer === character.hanzi ? 'text-vermilion-600 dark:text-vermilion-400' : 'text-destructive'
            }`}>
              {selectedAnswer === character.hanzi ? t('practice.correct') : t('practice.wrong')}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-full border-ink-200 text-ink-700 dark:border-ink-700 dark:text-ink-200">
            {t('common.cancel')}
          </Button>
          <Button onClick={onNext} className="bg-vermilion-500 hover:bg-vermilion-600 text-primary-foreground rounded-full">
            {t('practice.nextQuestion')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
