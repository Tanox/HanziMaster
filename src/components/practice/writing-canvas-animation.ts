// src/components/practice/writing-canvas-animation.ts v5.2.20
// 书写引导动画：沿当前笔画中位线逐帧描线，已完成的笔画以浅色虚线轮廓呈现。
// 抽离自 writing-canvas.tsx，使组件文件 ≤200 行（单一职责：动画播放）。

import { drawHint, drawMedianStroke, parsePath, resolveFg, resolvePrimary } from './writing-canvas-utils';

export interface StrokeAnimationHandle {
  cancel: () => void;
}

export interface StrokeAnimationOptions {
  canvas: HTMLCanvasElement;
  character: string;
  /** 当前笔画的中位线（笔顺方向），用于沿线路径描线 */
  median: number[][];
  /** 画布实际边长（min(width, height)），用于坐标缩放 */
  size: number;
  /** 已完成笔画下标集合，渲染为浅色虚线轮廓 */
  completed: Set<number>;
  /** 全部笔画的 SVG path（有序），用于绘制已完成笔画轮廓 */
  strokePaths: string[];
  /** 动画完成回调（单笔播放结束） */
  onComplete: () => void;
}

// 触发当前笔画的引导动画（沿中位线描线，duration≈500ms）
export function runStrokeAnimation(opts: StrokeAnimationOptions): StrokeAnimationHandle {
  const { canvas, character, median, size, completed, strokePaths, onComplete } = opts;
  const ctx = canvas.getContext('2d');
  if (!ctx) return { cancel: () => {} };
  const primary = resolvePrimary();
  const start = performance.now();
  const dur = 500;
  let raf: number | null = null;

  const frame = (now: number) => {
    const progress = Math.min((now - start) / dur, 1);
    drawHint(canvas, character);
    // 已完成笔：浅色虚线轮廓
    completed.forEach((i) => {
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
      raf = requestAnimationFrame(frame);
    } else {
      raf = null;
      onComplete();
    }
  };

  raf = requestAnimationFrame(frame);
  return {
    cancel: () => {
      if (raf !== null) cancelAnimationFrame(raf);
    },
  };
}
