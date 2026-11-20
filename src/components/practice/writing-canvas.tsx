// src/components/practice/writing-canvas.tsx v5.2.51
// 书写画布：淡字底图 + 指针描线 + 逐笔笔顺引导 + 键盘替代路径；指针交互拆分见 writing-canvas-input.ts。
'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { drawHint, redrawUserStrokes } from './writing-canvas-utils';
import { ProgressLabel } from './writing-canvas-parts';
import { KeyboardStrokeForm } from './writing-canvas-keyboard';
import { useKeyboardStrokes } from './use-keyboard-strokes';
import { pointerDown, pointerMove, pointerUp, type WritingInputCtx } from './writing-canvas-input';
import type { StrokeAnimationHandle } from './writing-canvas-animation';

export interface WritingCanvasHandle {
  clearCanvas: () => void;
}

interface WritingCanvasProps {
  character: string;
  /** 可选：当前字符的笔画 SVG path（有序），用于笔顺引导 */
  strokePaths?: string[];
  /** 可选：当前字符每笔的中位线（笔顺方向），与 strokePaths 一一对应 */
  medians?: number[][][];
  /** 当前字符笔画总数（用于兜底动画） */
  strokeCount?: number;
  /** 可选：描红准确度（0-1）变化时回调，用于练习反馈 */
  onAccuracyChange?: (accuracy: number) => void;
}

export const WritingCanvas = forwardRef<WritingCanvasHandle, WritingCanvasProps>(
  ({ character, strokePaths, medians, strokeCount, onAccuracyChange }, ref) => {
    const { t } = useTranslation();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const hasGuidance = !!strokePaths && strokePaths.length > 0;
    const totalStrokes = hasGuidance ? (strokeCount ?? strokePaths.length) : 0;
    const isDrawing = useRef(false);
    const pointerId = useRef<number | null>(null);
    const animHandleRef = useRef<StrokeAnimationHandle | null>(null);
    const animStrokeRef = useRef(-1);
    const completedRef = useRef<Set<number>>(new Set());
    const tracingRef = useRef<number | null>(null);
    const userPointsRef = useRef<{ x: number; y: number }[]>([]);
    const tracesRef = useRef<{ x: number; y: number }[][]>([]);
    const accuracyRef = useRef<number[]>([]);
    const keyboard = useKeyboardStrokes({
      strokePaths,
      medians,
      totalStrokes,
      canvasRef,
      accuracyRef,
      completedRef,
      onAccuracyChange,
    });

    const resetRefs = useCallback(() => {
      animHandleRef.current?.cancel();
      animHandleRef.current = null;
      animStrokeRef.current = -1;
      completedRef.current = new Set();
      tracingRef.current = null;
      userPointsRef.current = [];
      tracesRef.current = [];
      accuracyRef.current = [];
      isDrawing.current = false;
      pointerId.current = null;
    }, []);

    const clearCanvas = useCallback(() => {
      keyboard.reset();
      resetRefs();
      const canvas = canvasRef.current;
      if (canvas) drawHint(canvas, character);
    }, [character, keyboard.reset, resetRefs]);

    useImperativeHandle(ref, () => ({ clearCanvas }), [clearCanvas]);

    // 每次事件重新取 canvasRef.current，避免 render 时锁定尚未挂载的 DOM 节点
    const inputContext = (): WritingInputCtx => ({
      canvas: canvasRef.current,
      character,
      strokePaths,
      medians,
      isDrawing,
      pointerId,
      userPoints: userPointsRef,
      traces: tracesRef,
      accuracy: accuracyRef,
      completed: completedRef,
      tracing: tracingRef,
      animHandle: animHandleRef,
      animStroke: animStrokeRef,
      onAccuracyChange,
      resetRefs,
    });

    // 切换字符或异步笔顺数据到达时完整重置（含键盘结果/笔迹/准确度），防止跨字状态污染
    useEffect(() => {
      resetRefs();
      keyboard.reset();
      const canvas = canvasRef.current;
      if (canvas) drawHint(canvas, character);
      // 尺寸变化只重绘，不重置笔迹/准确度/键盘结果（旋转屏幕等场景保留用户进度）
      const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => {
        const target = canvasRef.current;
        if (!target) return;
        drawHint(target, character);
        redrawUserStrokes(target, tracesRef.current);
      });
      if (canvas && observer) observer.observe(canvas);
      return () => {
        observer?.disconnect();
        resetRefs();
      };
    }, [character, strokePaths, medians, keyboard.reset, resetRefs]);

    return (
      <>
        <div className="relative h-full w-full">
          <canvas
            id="writing-canvas"
            ref={canvasRef}
            role="img"
            aria-label={`${character} ${t('practice.canvasLabel')}`}
            aria-describedby="writing-stroke-help"
            className="h-full w-full cursor-crosshair touch-none"
            onPointerDown={(e) => pointerDown(inputContext(), e)}
            onPointerMove={(e) => pointerMove(inputContext(), e)}
            onPointerUp={(e) => pointerUp(inputContext(), e)}
            onPointerLeave={(e) => pointerUp(inputContext(), e)}
            onPointerCancel={(e) => pointerUp(inputContext(), e)}
          />
          {hasGuidance && <ProgressLabel progressLabel={`${completedRef.current.size} / ${totalStrokes}`} />}
        </div>
        {hasGuidance && (
          <KeyboardStrokeForm totalStrokes={totalStrokes} result={keyboard.result} onSubmit={keyboard.submit} />
        )}
      </>
    );
  },
);

WritingCanvas.displayName = 'WritingCanvas';
