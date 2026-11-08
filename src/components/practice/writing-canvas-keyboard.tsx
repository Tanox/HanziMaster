// src/components/practice/writing-canvas-keyboard.tsx v5.2.44
// 键盘 / 读屏替代路径：以「笔画顺序编号」完成一次书写练习（P1-25）
'use client';

import { useState } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { Button } from '@/components/ui/button';

interface KeyboardStrokeFormProps {
  totalStrokes: number;
  result: 'correct' | 'wrong' | null;
  onSubmit: (raw: string) => void;
}

export function KeyboardStrokeForm({ totalStrokes, result, onSubmit }: KeyboardStrokeFormProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  return (
    <form
      id="writing-keyboard-form"
      className="mt-3 space-y-2"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value);
      }}
    >
      <label htmlFor="writing-stroke-sequence" className="block text-sm font-medium text-ink-700 dark:text-ink-200">
        {t('practice.keyboardLabel')} ({totalStrokes})
      </label>
      <div className="flex gap-2">
        <input
          id="writing-stroke-sequence"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          inputMode="numeric"
          autoComplete="off"
          placeholder="1 2 3"
          aria-describedby="writing-stroke-help"
          className="min-w-0 flex-1 rounded-lg border border-ink-200 dark:border-ink-700 bg-card px-3 py-2 text-sm text-ink-900 dark:text-ink-50"
        />
        <Button type="submit" size="sm" className="rounded-lg bg-vermilion-500 hover:bg-vermilion-600 text-primary-foreground">
          {t('common.submit')}
        </Button>
      </div>
      <p id="writing-stroke-help" className="sr-only">{t('practice.keyboardHint')}</p>
      {result && (
        <p id="writing-keyboard-result" role="status" className="text-sm font-medium text-vermilion-600 dark:text-vermilion-400">
          {result === 'correct' ? t('practice.correct') : t('practice.wrong')}
        </p>
      )}
    </form>
  );
}
