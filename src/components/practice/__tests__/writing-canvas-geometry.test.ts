// src/components/practice/__tests__/writing-canvas-geometry.test.ts v5.2.46
import { describe, expect, it } from 'vitest';
import { scale, scaleY } from '../writing-canvas-utils';
import { distToSegment } from '../writing-canvas-scoring';

describe('scale', () => {
  it('maps the 1024 data grid to the canvas bounds', () => {
    expect(scale(0, 200)).toBe(0);
    expect(scale(1024, 200)).toBe(200);
  });

  it('scales intermediate and out-of-range values linearly', () => {
    expect(scale(512, 200)).toBe(100);
    expect(scale(1536, 200)).toBe(300);
  });
});

describe('scaleY', () => {
  it('flips the y-up data space onto the y-down canvas around the 900 baseline', () => {
    expect(scaleY(900, 200)).toBe(0); // 顶基线 → 画布顶部
    expect(scaleY(-124, 200)).toBe(200); // 网格底（1024）→ 画布底部
  });

  it('maps mid-grid values linearly', () => {
    expect(scaleY(450, 200)).toBeCloseTo(87.890625, 3);
    expect(scaleY(1350, 200)).toBeCloseTo(-87.890625, 3);
  });
});

describe('distToSegment', () => {
  it('returns 0 for a point on the segment', () => {
    expect(distToSegment(5, 0, 0, 0, 10, 0)).toBe(0);
  });

  it('returns the perpendicular distance for an interior projection', () => {
    expect(distToSegment(5, 7, 0, 0, 10, 0)).toBeCloseTo(7);
  });

  it('clamps projections beyond both endpoints', () => {
    expect(distToSegment(-3, 4, 0, 0, 10, 0)).toBe(5);
    expect(distToSegment(13, 4, 0, 0, 10, 0)).toBe(5);
  });

  it('degenerates to point distance for a zero-length segment', () => {
    expect(distToSegment(3, 4, 0, 0, 0, 0)).toBe(5);
  });

  it('handles diagonal segments', () => {
    expect(distToSegment(5, 5, 0, 0, 10, 10)).toBe(0);
    expect(distToSegment(0, 10, 0, 0, 10, 10)).toBeCloseTo(Math.sqrt(50));
  });
});
