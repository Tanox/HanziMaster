// src/components/practice/writing-canvas.tsx v5.2.25
// 书写画布：淡字底图 + 指针描线 + 逐笔笔顺引导动画；绘制/判定逻辑分置于
// writing-canvas-utils.ts，引导动画帧循环分置于 writing-canvas-animation.ts，
// 进度标签子组件与样式常量分置于 writing-canvas-parts.tsx。
'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { drawHint, judgeUserStroke } from './writing-canvas-utils';
import { runStrokeAnimation, type StrokeAnimationHandle } from './writing-canvas-animation';
import { ProgressLabel } from './writing-canvas-parts';

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
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawing = useRef(false);
    const animHandleRef = useRef<StrokeAnimationHandle | null>(null);
    const animStrokeRef = useRef(-1);
    const completedRef = useRef<Set<number>>(new Set());
    // 当前笔用户描红轨迹点（仅在引导播完后跟写时收集）
    const userPointsRef = useRef<{ x: number; y: number }[]>([]);
    // 已判定笔的准确度累计（0-1），用于计算整体均值
    const accuracyRef = useRef<number[]>([]);

    const clearCanvas = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      drawHint(canvas, character);
      animHandleRef.current?.cancel();
      animHandleRef.current = null;
      animStrokeRef.current = -1;
      completedRef.current = new Set();
      userPointsRef.current = [];
      accuracyRef.current = [];
    }, [character]);

    useImperativeHandle(ref, () => ({ clearCanvas }), [clearCanvas]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (canvas) drawHint(canvas, character);
      completedRef.current = new Set();
      animStrokeRef.current = -1;
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

    // 触发下一笔的引导动画
    const playNextStroke = () => {
      const canvas = canvasRef.current;
      if (!canvas || !strokePaths) return;
      const count = strokePaths.length;
      const next = completedRef.current.size;
      if (next >= count || animHandleRef.current) return;
      animStrokeRef.current = next;
      const rect = canvas.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height);
      const median = medians?.[next];
      animHandleRef.current = runStrokeAnimation({
        canvas,
        character,
        median: median ?? [],
        size,
        completed: completedRef.current,
        strokePaths,
        onComplete: () => {
          completedRef.current.add(next);
          animStrokeRef.current = -1;
          animHandleRef.current = null;
        },
      });
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
      // 有笔顺数据时：引导播放与跟写描红交替进行
      if (strokePaths) {
        // 全部笔画已播放完成：再次点击重置并从第一笔重新引导
        if (completedRef.current.size >= strokePaths.length && animStrokeRef.current === -1) {
          clearCanvas();
          return;
        }
        if (animStrokeRef.current !== -1) return; // 引导动画进行中，忽略
        if (completedRef.current.size === 0) {
          // 第一笔：先播放引导动画
          playNextStroke();
        } else {
          // 引导已播放过：进入跟写描红模式，收集当前笔轨迹
          isDrawing.current = true;
          userPointsRef.current = [getPoint(e)];
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext('2d');
          if (canvas && ctx) {
            const p = getPoint(e);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
          }
        }
        return;
      }
      isDrawing.current = true;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const p = getPoint(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
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
      if (strokePaths && userPointsRef.current.length > 0) {
        const current = completedRef.current.size - 1;
        const canvas = canvasRef.current;
        if (canvas && current >= 0) {
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
        userPointsRef.current = [];
      }
    };

    const hasGuidance = !!strokePaths && strokePaths.length > 0;
    const totalStrokes = hasGuidance ? (strokeCount ?? strokePaths.length) : 0;
    const progressLabel = hasGuidance ? `${completedRef.current.size} / ${totalStrokes}` : '';

    return (
      <div className="relative h-full w-full">
        <canvas
          id="writing-canvas"
          ref={canvasRef}
          role="img"
          aria-label={`${character} 书写练习画布${hasGuidance ? '，点击播放笔顺引导，引导后可跟写描红' : ''}`}
          className="h-full w-full cursor-crosshair touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
          onPointerCancel={stopDrawing}
        />
        {hasGuidance && <ProgressLabel character={character} progressLabel={progressLabel} />}
      </div>
    );
  },
);

WritingCanvas.displayName = 'WritingCanvas';
