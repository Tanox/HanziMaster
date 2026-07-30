// src/components/learn/quiz-dialog.tsx v5.0.0
'use client';

import { useTranslation } from '@/components/locale-provider';
import type { Character } from '@/lib/characters';
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
  character: Character | null;
  value: string;
  onChange: (value: string) => void;
  correct: boolean | null;
  onSubmit: () => void;
}

export function QuizDialog({
  open,
  onOpenChange,
  character,
  value,
  onChange,
  correct,
  onSubmit,
}: QuizDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card/95 dark:bg-ink-900/95 backdrop-blur-xl rounded-3xl border-ink-100 dark:border-ink-800 shadow-ink-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-ink-900 dark:text-ink-50 display-font">
            {t('learn.quizTitle')}
          </DialogTitle>
          <DialogDescription className="text-ink-600 dark:text-ink-300">
            {t('learn.quizDesc')}
          </DialogDescription>
        </DialogHeader>

        <div className="py-8">
          <div className="text-center mb-8">
            <span className="text-[80px] font-light serif-font text-ink-900 dark:text-ink-50">
              {character?.hanzi}
            </span>
          </div>

          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
            placeholder={t('learn.quizPlaceholder')}
            aria-label={t('learn.pinyin')}
            className={`w-full px-6 py-4 text-lg text-center rounded-lg border-2 transition-[colors,border-color,box-shadow] duration-300 ${
              correct === true
                ? 'border-vermilion-500 bg-vermilion-50 dark:bg-vermilion-900/20 text-vermilion-600 dark:text-vermilion-400'
                : correct === false
                ? 'border-destructive/40 bg-destructive/10 dark:bg-destructive/20 text-destructive'
                : 'border-ink-200 dark:border-ink-700 bg-card dark:bg-ink-900 text-ink-900 dark:text-ink-50 focus:border-vermilion-500 focus:outline-none'
            }`}
          />

          {correct !== null && (
            <div className={`mt-4 text-center font-medium ${
              correct ? 'text-vermilion-600 dark:text-vermilion-400' : 'text-destructive'
            }`}>
              {correct ? t('learn.quizCorrect') : t('learn.quizIncorrect')}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline" className="rounded-full border-ink-200 text-ink-700 dark:border-ink-700 dark:text-ink-200">
            {t('common.cancel')}
          </Button>
          <Button onClick={onSubmit} className="bg-vermilion-500 hover:bg-vermilion-600 text-primary-foreground rounded-full">
            {t('common.submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
