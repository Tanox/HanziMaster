// src/components/practice/writing-canvas.tsx v5.2.17
// 书写画布：淡字符底图 + 指针轨迹绘制 + 逐笔笔顺引导动画。
// - 提供笔顺数据时：点击画布逐笔播放书写动画（沿中位线描线），当前笔高亮；
//   引导播完后可跟写描红，松手判定该笔与笔形的贴合度（0-100%）。
// - 全部笔画播放完成后再次点击：重置并从第一笔重新引导。
// - 无笔顺数据时：回退到原有淡字底图 + 自由书写。
// 绘制与判定工具函数抽离至 writing-canvas-utils.ts。
'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { useTranslation } from '@/components/locale-provider';
import {
  drawHint,
  drawMedianStroke,
  parsePath,
  resolveFg,
  resolvePrimary,
  scoreStroke,
} from './writing-canvas-utils';

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
    const isDrawing = useRef(false);
    const animRafRef = useRef<number | null>(null);
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
      if (animRafRef.current !== null) cancelAnimationFrame(animRafRef.current);
      animRafRef.current = null;
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
        if (animRafRef.current !== null) cancelAnimationFrame(animRafRef.current);
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
      if (next >= count || animRafRef.current !== null) return;
      animStrokeRef.current = next;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height);
      const median = medians?.[next];
      const primary = resolvePrimary();
      const start = performance.now();
      const dur = 500;

      const frame = (now: number) => {
        const progress = Math.min((now - start) / dur, 1);
        drawHint(canvas, character);
        // 已完成笔：浅色虚线轮廓
        completedRef.current.forEach((i) => {
          const p = parsePath(strokePaths[i]);
          if (!p) return;
          ctx.strokeStyle = resolveFg();
          ctx.globalAlpha = 0.25;
          ctx.setLineDash([6, 6]);
          ctx.stroke(p);
          ctx.setLineDash([]);
          ctx.globalAlpha = 1;
        });
        // 当前笔：沿中位线动画描线
        if (median && median.length >= 2) {
          drawMedianStroke(ctx, median, size, progress, primary, 5);
        }
        if (progress < 1) {
          animRafRef.current = requestAnimationFrame(frame);
        } else {
          completedRef.current.add(next);
          animStrokeRef.current = -1;
          animRafRef.current = null;
        }
      };
      animRafRef.current = requestAnimationFrame(frame);
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
      // 跟写描红结束：判定刚播放完的那一笔贴合度
      if (strokePaths && userPointsRef.current.length > 0) {
        const current = completedRef.current.size - 1;
        const canvas = canvasRef.current;
        if (canvas && current >= 0) {
          const rect = canvas.getBoundingClientRect();
          const size = Math.min(rect.width, rect.height);
          const acc = scoreStroke(
            userPointsRef.current,
            strokePaths[current],
            medians?.[current],
            size,
          );
          accuracyRef.current.push(acc);
          const avg = accuracyRef.current.reduce((a, b) => a + b, 0) / accuracyRef.current.length;
          onAccuracyChange?.(avg);
        }
        userPointsRef.current = [];
      }
    };

    const hasGuidance = !!strokePaths && strokePaths.length > 0;
    const totalStrokes = hasGuidance ? (strokeCount ?? strokePaths.length) : 0;
    const progressLabel = hasGuidance
      ? `${completedRef.current.size} / ${totalStrokes}`
      : undefined;

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
        {hasGuidance && (
          <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center">
            <span className="rounded-full bg-card/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
              {t('learn.strokeOrder')}: {progressLabel}
            </span>
          </div>
        )}
      </div>
    );
  },
);

WritingCanvas.displayName = 'WritingCanvas';
