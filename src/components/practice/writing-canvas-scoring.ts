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

/** 把画布点投影到中位线折线，返回沿折线的累计弧长（用于方向/覆盖判定）。 */
const projectOnMedian = (
  p: { x: number; y: number },
  pts: { x: number; y: number }[],
): number => {
  let best = { along: 0, dist: Infinity };
  let along = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    if (len === 0) continue;
    const raw = ((p.x - a.x) * dx + (p.y - a.y) * dy) / (len * len);
    const t = Math.max(0, Math.min(1, raw));
    const d = Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
    if (d < best.dist) best = { along: along + t * len, dist: d };
    along += len;
  }
  return best.along;
};

/** 方向/覆盖因子：单点或反向轨迹最多半分，完整正向描完才得满分。 */
const directionCoverage = (
  points: { x: number; y: number }[],
  median: number[][],
  size: number,
): number => {
  const pts = median.map(([x, y]) => ({ x: scale(x, size), y: scaleY(y, size) }));
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) total += Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
  if (total === 0 || points.length < 2) return 0.5;
  let traveled = 0;
  let prev = projectOnMedian(points[0], pts);
  for (let i = 1; i < points.length; i++) {
    const cur = projectOnMedian(points[i], pts);
    const delta = cur - prev;
    traveled += delta >= 0 ? delta : delta * 0.5; // 反向移动倒扣
    prev = cur;
  }
  return 0.5 + 0.5 * Math.min(Math.max(traveled / total, 0), 1);
};

// 跟写描红结束：判定当前笔的贴合度并累加，返回更新后的准确度数组与均值
export function judgeUserStroke(params: {
  userPoints: { x: number; y: number }[];
  strokePath: string | undefined;
  median: number[][] | undefined;
  size: number;
  prevAccuracies: number[];
  onAccuracyChange?: (avg: number) => void;
  /** 描红路径启用：结合中位线方向/覆盖度修正命中率（默认关闭以保持纯函数向后兼容） */
  enforceDirection?: boolean;
}): number[] {
  const { userPoints, strokePath, median, size, prevAccuracies, onAccuracyChange, enforceDirection } = params;
  if (userPoints.length === 0) return prevAccuracies;
  let acc = scoreStroke(userPoints, strokePath, median, size);
  if (enforceDirection && median && median.length >= 2) {
    acc *= directionCoverage(userPoints, median, size);
  }
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
    const index = sequence[i] - 1;
    // 越界/缺位提交必须显式记 0 分，否则分母缩水会得到虚高准确度
    if (!Number.isInteger(index) || index < 0 || index >= medians.length) {
      accuracies = [...accuracies, 0];
      return;
    }
    const points = medians[index].map(([x, y]) => ({ x: scale(x, size), y: scaleY(y, size) }));
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
