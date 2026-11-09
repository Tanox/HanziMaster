// src/components/practice/__tests__/writing-canvas-drawing.test.ts v5.2.46
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  drawHint,
  drawMedianStroke,
  resolveFg,
  resolvePrimary,
  resolveSerif,
} from '../writing-canvas-utils';

function makeCtx() {
  return {
    lineWidth: 0,
    lineCap: '',
    lineJoin: '',
    strokeStyle: '',
    fillStyle: '',
    font: '',
    globalAlpha: 1,
    textAlign: '',
    textBaseline: '',
    setTransform: vi.fn(),
    scale: vi.fn(),
    fillText: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
  };
}

const withCtx = (ctx: ReturnType<typeof makeCtx>) =>
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
    ctx as unknown as CanvasRenderingContext2D
  );

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('design token resolvers', () => {
  it('falls back to the built-in palette when tokens are absent', () => {
    expect(resolveFg()).toBe('#1a1a1a');
    expect(resolveSerif()).toBe('serif');
    expect(resolvePrimary()).toBe('#c53d43');
  });

  it('reads values from the document root tokens', () => {
    const tokens: Record<string, string> = {
      '--color-foreground': '#111111',
      '--font-serif': 'Noto Serif SC',
      '--color-primary': '#abcdef',
    };
    vi.stubGlobal('getComputedStyle', () => ({
      getPropertyValue: (key: string) => tokens[key] ?? '',
    }));
    expect(resolveFg()).toBe('#111111');
    expect(resolveSerif()).toBe('Noto Serif SC');
    expect(resolvePrimary()).toBe('#abcdef');
  });
});

describe('drawHint', () => {
  it('returns safely when no 2d context is available', () => {
    withCtx(null as unknown as ReturnType<typeof makeCtx>);
    expect(() => drawHint(document.createElement('canvas'), '永')).not.toThrow();
  });

  it('sizes the canvas and draws the centred hint character', () => {
    const ctx = makeCtx();
    withCtx(ctx);
    const canvas = document.createElement('canvas');
    vi.spyOn(canvas, 'getBoundingClientRect').mockReturnValue({ width: 200, height: 200 } as DOMRect);
    drawHint(canvas, '永');
    expect(canvas.width).toBe(200);
    expect(canvas.height).toBe(200);
    expect(ctx.setTransform).toHaveBeenCalledWith(1, 0, 0, 1, 0, 0);
    expect(ctx.fillText).toHaveBeenCalledWith('永', 100, 100);
    expect(ctx.font).toContain('80px');
    expect(ctx.globalAlpha).toBe(1);
  });

  it('scales by devicePixelRatio when it is greater than 1', () => {
    const ctx = makeCtx();
    withCtx(ctx);
    const canvas = document.createElement('canvas');
    vi.spyOn(canvas, 'getBoundingClientRect').mockReturnValue({ width: 100, height: 100 } as DOMRect);
    vi.stubGlobal('devicePixelRatio', 2);
    drawHint(canvas, '一');
    expect(canvas.width).toBe(200);
    expect(ctx.scale).toHaveBeenCalledWith(2, 2);
  });
});

describe('drawMedianStroke', () => {
  const medians = [
    [0, 0],
    [500, 500],
    [1000, 1000],
  ];

  it('does nothing for a median with fewer than two points', () => {
    const ctx = makeCtx();
    drawMedianStroke(ctx as unknown as CanvasRenderingContext2D, [[0, 0]], 200, 1, '#000', 4);
    expect(ctx.beginPath).not.toHaveBeenCalled();
    expect(ctx.stroke).not.toHaveBeenCalled();
  });

  it('starts at the first median point and strokes once at progress 0', () => {
    const ctx = makeCtx();
    drawMedianStroke(ctx as unknown as CanvasRenderingContext2D, medians, 200, 0, '#c53d43', 4);
    // y=0 经翻转映射为画布 (900-0)/1024*200 = 175.78125（字形基线靠近画布底部）
    expect(ctx.moveTo).toHaveBeenCalledWith(0, 175.78125);
    expect(ctx.lineTo).toHaveBeenCalledTimes(1);
    expect(ctx.stroke).toHaveBeenCalledTimes(1);
    expect(ctx.strokeStyle).toBe('#c53d43');
    expect(ctx.lineWidth).toBe(4);
  });

  it('reaches the last median point at progress 1', () => {
    const ctx = makeCtx();
    drawMedianStroke(ctx as unknown as CanvasRenderingContext2D, medians, 200, 1, '#000', 2);
    expect(ctx.lineTo).toHaveBeenCalledTimes(2);
    expect(ctx.lineTo).toHaveBeenLastCalledWith(195.3125, -19.53125);
  });

  it('clamps progress above 1 and below 0', () => {
    const high = makeCtx();
    const low = makeCtx();
    drawMedianStroke(high as unknown as CanvasRenderingContext2D, medians, 200, 5, '#000', 2);
    drawMedianStroke(low as unknown as CanvasRenderingContext2D, medians, 200, -5, '#000', 2);
    expect(high.lineTo).toHaveBeenLastCalledWith(195.3125, -19.53125);
    expect(low.lineTo).toHaveBeenCalledTimes(1);
  });

  it('interpolates a partial segment for a mid progress', () => {
    const ctx = makeCtx();
    drawMedianStroke(ctx as unknown as CanvasRenderingContext2D, medians, 200, 0.25, '#000', 2);
    expect(ctx.lineTo).toHaveBeenLastCalledWith(48.828125, 126.953125);
  });
});
