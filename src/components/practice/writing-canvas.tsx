// src/components/practice/writing-canvas.tsx v5.2.46
// 书写画布：淡字底图 + 指针描线 + 逐笔笔顺引导 + 键盘替代路径；职责拆分见 utils/scoring/animation/use-keyboard-strokes。
'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { drawHint } from './writing-canvas-utils';
import { judgeUserStroke } from './writing-canvas-scoring';
import { startNextStroke, type StrokeAnimationHandle } from './writing-canvas-animation';
import { ProgressLabel } from './writing-canvas-parts';
import { KeyboardStrokeForm } from './writing-canvas-keyboard';
import { useKeyboardStrokes } from './use-keyboard-strokes';

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
    const animHandleRef = useRef<StrokeAnimationHandle | null>(null);
    const animStrokeRef = useRef(-1);
    const completedRef = useRef<Set<number>>(new Set());
    // 已播放引导、等待跟写的笔索引；与 completedRef（已跟写完成）严格分离
    const tracingRef = useRef<number | null>(null);
    // 当前笔用户描红轨迹点（仅在引导播完后跟写时收集）
    const userPointsRef = useRef<{ x: number; y: number }[]>([]);
    // 已判定笔的准确度累计（0-1），用于计算整体均值
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
    const clearCanvas = useCallback(() => {
      keyboard.reset();
      const canvas = canvasRef.current;
      if (!canvas) return;
      drawHint(canvas, character);
      animHandleRef.current?.cancel();
      animHandleRef.current = null;
      animStrokeRef.current = -1;
      completedRef.current = new Set();
      tracingRef.current = null;
      userPointsRef.current = [];
      accuracyRef.current = [];
    }, [character, keyboard.reset]);

    useImperativeHandle(ref, () => ({ clearCanvas }), [clearCanvas]);
    useEffect(() => {
      const canvas = canvasRef.current;
      if (canvas) drawHint(canvas, character);
      completedRef.current = new Set();
      animStrokeRef.current = -1;
      tracingRef.current = null;
      userPointsRef.current = [];
      accuracyRef.current = [];
      return () => {
        animHandleRef.current?.cancel();
        animHandleRef.current = null;
      };
    }, [character]);
    const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const startStroke = (e: React.PointerEvent<HTMLCanvasElement>) => {
      isDrawing.current = true;
      const p = getPoint(e);
      userPointsRef.current = [p];
      const ctx = canvasRef.current?.getContext('2d');
      ctx?.beginPath();
      ctx?.moveTo(p.x, p.y);
    };

    // 触发下一笔的引导动画（具体帧循环在 writing-canvas-animation.ts）
    const playNextStroke = () => {
      const canvas = canvasRef.current;
      if (!canvas || !strokePaths) return;
      startNextStroke({
        canvas,
        character,
        strokePaths,
        medians,
        completed: completedRef.current,
        animHandleRef,
        animStrokeRef,
        onGuidanceReady: (index) => { tracingRef.current = index; },
      });
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
      // 有笔顺数据时：引导播放与跟写描红交替进行
      if (strokePaths) {
        // 全部笔画已跟写完成：再次点击重置并从第一笔重新引导
        if (completedRef.current.size >= strokePaths.length && animStrokeRef.current === -1) {
          clearCanvas();
          return;
        }
        if (animStrokeRef.current !== -1) return; // 引导动画进行中，忽略
        if (tracingRef.current === null) {
          // 当前笔尚未引导：先播放动画，播完后等待跟写
          playNextStroke();
          return;
        }
        // 引导已播完：进入跟写描红模式，收集当前笔轨迹
        startStroke(e);
        return;
      }
      startStroke(e);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDrawing.current || !canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      const p = getPoint(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      if (strokePaths) userPointsRef.current.push(p);
    };

    const stopDrawing = () => {
      if (!isDrawing.current) return;
      isDrawing.current = false;
      if (strokePaths && userPointsRef.current.length > 0 && tracingRef.current !== null) {
        const current = tracingRef.current;
        const canvas = canvasRef.current;
        if (canvas && strokePaths[current]) {
          const rect = canvas.getBoundingClientRect();
          const size = Math.min(rect.width, rect.height);
          accuracyRef.current = judgeUserStroke({
            userPoints: userPointsRef.current,
            strokePath: strokePaths[current],
            median: medians?.[current],
            size,
            prevAccuracies: accuracyRef.current,
            onAccuracyChange,
          });
        }
        completedRef.current.add(current);
        tracingRef.current = null;
        userPointsRef.current = [];
        playNextStroke(); // 跟写完成后自动演示下一笔，形成交替引导
      }
    };

    const progressLabel = hasGuidance ? `${completedRef.current.size} / ${totalStrokes}` : '';

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
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
          onPointerCancel={stopDrawing}
        />
        {hasGuidance && <ProgressLabel progressLabel={progressLabel} />}
      </div>
      {hasGuidance && (
        <KeyboardStrokeForm totalStrokes={totalStrokes} result={keyboard.result} onSubmit={keyboard.submit} />
      )}
      </>
    );
  },
);

WritingCanvas.displayName = 'WritingCanvas';
