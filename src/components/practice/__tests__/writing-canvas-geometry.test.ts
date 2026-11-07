// src/components/practice/__tests__/writing-canvas-geometry.test.ts v5.2.36
import { describe, expect, it } from 'vitest';
import { distToSegment, scale } from '../writing-canvas-utils';

describe('scale', () => {
  it('maps 0 and 1000 to the canvas bounds', () => {
    expect(scale(0, 200)).toBe(0);
    expect(scale(1000, 200)).toBe(200);
  });

  it('scales intermediate and out-of-range values linearly', () => {
    expect(scale(500, 200)).toBe(100);
    expect(scale(1500, 200)).toBe(300);
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
