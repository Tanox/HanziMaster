// src/components/practice/writing-canvas-scoring.ts v5.2.46
// 描红贴合度判定：指针轨迹 / 键盘笔画序列共用同一评分管线（单一职责拆分自 writing-canvas-utils.ts）。

import { parsePath, scale, scaleY } from './writing-canvas-utils';

// 点到线段最短距离（用于描红贴合度判定）
export function distToSegment(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
): number {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(px - ax, py - ay);
  let t = ((px - ax) * dx + (py - ay) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

// 描红贴合度判定：返回 0-1，表示用户轨迹点落在笔形/中位线容差内的比例
// - 优先用 strokePath（Path2D.isPointInStroke，带容差线宽）判断点是否在笔画内
// - 路径不可用时回退到中位线折线距离判定
export function scoreStroke(
  points: { x: number; y: number }[],
  strokePath: string | undefined,
  median: number[][] | undefined,
  size: number,
  tol = 18,
): number {
  if (!points.length) return 0;
  const path = strokePath ? parsePath(strokePath) : null;
  const probe = document.createElement('canvas').getContext('2d');
  if (path && probe) {
    // Path2D 坐标为数据空间：把画布点反变换回数据坐标，线宽容差按同比例放大
    const k = 1024 / size;
    probe.lineWidth = tol * 2 * k;
    let hit = 0;
    for (const p of points) {
      if (probe.isPointInStroke(path, p.x * k, 900 - p.y * k)) hit++;
    }
    return hit / points.length;
  }
  if (median && median.length >= 2) {
    let hit = 0;
    const pts = median.map((m) => ({ x: scale(m[0], size), y: scaleY(m[1], size) }));
    for (const p of points) {
      let min = Infinity;
      for (let i = 0; i < pts.length - 1; i++) {
        const d = distToSegment(p.x, p.y, pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y);
        if (d < min) min = d;
      }
      if (min <= tol) hit++;
    }
    return hit / points.length;
  }
  return 0;
}

// 跟写描红结束：判定当前笔的贴合度并累加，返回更新后的准确度数组与均值
export function judgeUserStroke(params: {
  userPoints: { x: number; y: number }[];
  strokePath: string | undefined;
  median: number[][] | undefined;
  size: number;
  prevAccuracies: number[];
  onAccuracyChange?: (avg: number) => void;
}): number[] {
  const { userPoints, strokePath, median, size, prevAccuracies, onAccuracyChange } = params;
  if (userPoints.length === 0) return prevAccuracies;
  const acc = scoreStroke(userPoints, strokePath, median, size);
  const next = [...prevAccuracies, acc];
  const avg = next.reduce((a, b) => a + b, 0) / next.length;
  onAccuracyChange?.(avg);
  return next;
}

/** 键盘替代路径（P1-25）：把提交的笔画编号序列转成轨迹点，复用与指针路径完全相同的 judgeUserStroke 评分管线。
 *  顺序错误时，用「提交笔画的中位线」去对照「期望笔画的路径」，自然得到低分，无需第二套评分规则。 */
export function scoreKeyboardSequence(params: {
  sequence: number[];
  totalStrokes: number;
  strokePaths: string[];
  medians: number[][][];
  size: number;
  prevAccuracies: number[];
}): { correct: boolean; accuracies: number[] } {
  const { sequence, totalStrokes, strokePaths, medians, size, prevAccuracies } = params;
  const expected = Array.from({ length: totalStrokes }, (_, i) => i + 1);
  const correct =
    totalStrokes > 0 &&
    sequence.length === expected.length &&
    sequence.every((n, i) => n === expected[i]);

  let accuracies = prevAccuracies;
  expected.forEach((_, i) => {
    const points = (medians[sequence[i] - 1] ?? []).map(([x, y]) => ({
      x: scale(x, size),
      y: scaleY(y, size),
    }));
    accuracies = judgeUserStroke({
      userPoints: points,
      strokePath: strokePaths[i],
      median: medians[i],
      size,
      prevAccuracies: accuracies,
    });
  });

  return { correct, accuracies };
}
