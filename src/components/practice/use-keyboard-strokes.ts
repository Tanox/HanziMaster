// src/components/practice/use-keyboard-strokes.ts v5.2.44
// P1-25：键盘替代路径的状态与评分编排，从 writing-canvas.tsx 抽出以保持 ≤200 行。
'use client';

import { useCallback, useState } from 'react';
import type { RefObject } from 'react';
import { scoreKeyboardSequence } from './writing-canvas-scoring';

interface Params {
  strokePaths?: string[];
  medians?: number[][][];
  totalStrokes: number;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  accuracyRef: RefObject<number[]>;
  completedRef: RefObject<Set<number>>;
  onAccuracyChange?: (accuracy: number) => void;
}

export function useKeyboardStrokes({
  strokePaths,
  medians,
  totalStrokes,
  canvasRef,
  accuracyRef,
  completedRef,
  onAccuracyChange,
}: Params) {
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);

  const reset = useCallback(() => setResult(null), []);

  // 与指针描红共享 judgeUserStroke 评分管线，结果通过同一 onAccuracyChange 回传
  const submit = (raw: string) => {
    if (!strokePaths || !medians || totalStrokes === 0) return;
    const sequence = raw.split(/[^0-9]+/).filter(Boolean).map(Number);
    const rect = canvasRef.current?.getBoundingClientRect();
    const size = rect ? Math.min(rect.width, rect.height) : 0;
    const { correct, accuracies } = scoreKeyboardSequence({
      sequence,
      totalStrokes,
      strokePaths,
      medians,
      size,
      prevAccuracies: accuracyRef.current ?? [],
    });
    if (accuracyRef.current) accuracyRef.current = accuracies;
    if (completedRef.current) completedRef.current = new Set(Array.from({ length: totalStrokes }, (_, i) => i));
    onAccuracyChange?.(accuracies.reduce((a, b) => a + b, 0) / (accuracies.length || 1));
    setResult(correct ? 'correct' : 'wrong');
  };

  return { result, submit, reset };
}
