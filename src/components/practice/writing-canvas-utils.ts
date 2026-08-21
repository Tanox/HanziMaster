// src/components/practice/writing-canvas-utils.ts v5.2.17
// 书写画布的绘制工具函数集（与组件逻辑分离，保证单文件 ≤200 行）
// 从设计 token 读取颜色与字体，避免 Canvas 写死色值（单一来源）

// 从设计 token 读取前景色与衬线字体
export const resolveFg = () =>
  getComputedStyle(document.documentElement).getPropertyValue('--color-foreground').trim() || '#1a1a1a';
export const resolveSerif = () =>
  getComputedStyle(document.documentElement).getPropertyValue('--font-serif').trim() || 'serif';
// 品牌朱砂红（作为当前笔高亮色）
export const resolvePrimary = () =>
  getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#c53d43';

// 归一化：把 0-1000 绝对坐标缩放到画布实际尺寸
export function scale(v: number, size: number) {
  return (v / 1000) * size;
}

// 解析 SVG path 字符串为 Path2D（浏览器原生支持），解析失败返回 null
export function parsePath(d: string): Path2D | null {
  try {
    return new Path2D(d);
  } catch {
    return null;
  }
}

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
    probe.lineWidth = tol * 2;
    let hit = 0;
    for (const p of points) {
      if (probe.isPointInStroke(path, p.x, p.y)) hit++;
    }
    return hit / points.length;
  }
  if (median && median.length >= 2) {
    let hit = 0;
    const pts = median.map((m) => ({ x: scale(m[0], size), y: scale(m[1], size) }));
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

// 淡字底图绘制
export const drawHint = (canvas: HTMLCanvasElement, character: string) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = resolveFg();
  ctx.font = `${Math.min(rect.width, rect.height) * 0.4}px ${resolveSerif()}`;
  ctx.fillStyle = resolveFg();
  ctx.globalAlpha = 0.08;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(character, rect.width / 2, rect.height / 2);
  ctx.globalAlpha = 1;
};

// 沿中位线绘制一笔：从 start 到 end 按 progress(0-1) 逐点描线
export const drawMedianStroke = (
  ctx: CanvasRenderingContext2D,
  medians: number[][],
  size: number,
  progress: number,
  color: string,
  lineWidth: number,
) => {
  if (medians.length < 2) return;
  const total = medians.length - 1;
  const seg = Math.min(Math.max(progress, 0), 1) * total;
  const idx = Math.floor(seg);
  const t = seg - idx;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(scale(medians[0][0], size), scale(medians[0][1], size));
  for (let i = 1; i <= idx; i++) {
    ctx.lineTo(scale(medians[i][0], size), scale(medians[i][1], size));
  }
  if (idx < total) {
    const a = medians[idx];
    const b = medians[idx + 1];
    ctx.lineTo(scale(a[0] + (b[0] - a[0]) * t, size), scale(a[1] + (b[1] - a[1]) * t, size));
  }
  ctx.stroke();
};
