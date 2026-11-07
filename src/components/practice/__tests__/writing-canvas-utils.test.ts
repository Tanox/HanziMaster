// src/components/practice/__tests__/writing-canvas-utils.test.ts v5.2.36
import { afterEach, describe, expect, it, vi } from 'vitest';
import { judgeUserStroke, parsePath, scoreStroke } from '../writing-canvas-utils';

// 0-1000 绝对坐标的水平中位线；size=200 时映射为 (0,100) → (200,100)
const median = [
  [0, 500],
  [1000, 500],
];
const onLine = { x: 100, y: 100 };

const baseParams = {
  strokePath: undefined,
  median,
  size: 200,
  prevAccuracies: [0.5],
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('parsePath', () => {
  it('returns null when Path2D is unavailable or throws', () => {
    vi.stubGlobal('Path2D', undefined);
    expect(parsePath('M0 0 L10 10')).toBeNull();
    vi.stubGlobal('Path2D', class {
      constructor() {
        throw new Error('invalid path');
      }
    });
    expect(parsePath('bad')).toBeNull();
  });

  it('returns a Path2D instance for a valid path', () => {
    class FakePath2D {
      constructor(public d: string) {}
    }
    vi.stubGlobal('Path2D', FakePath2D);
    expect(parsePath('M0 0 L10 10')).toBeInstanceOf(FakePath2D);
  });
});

describe('scoreStroke', () => {
  it('returns 0 for an empty trajectory', () => {
    expect(scoreStroke([], undefined, median, 200)).toBe(0);
  });

  it('returns 0 without a usable path or median', () => {
    expect(scoreStroke([onLine], undefined, undefined, 200)).toBe(0);
    expect(scoreStroke([onLine], undefined, [[0, 0]], 200)).toBe(0);
  });

  it('scores a median-aligned trajectory as 1', () => {
    expect(scoreStroke([onLine, { x: 20, y: 100 }], undefined, median, 200)).toBe(1);
  });

  it('scores the proportion of hits within tolerance', () => {
    expect(scoreStroke([onLine, { x: 100, y: 300 }], undefined, median, 200)).toBe(0.5);
  });

  it('includes the tolerance boundary and excludes the next unit', () => {
    expect(scoreStroke([{ x: 100, y: 118 }], undefined, median, 200, 18)).toBe(1);
    expect(scoreStroke([{ x: 100, y: 119 }], undefined, median, 200, 18)).toBe(0);
  });

  it('honours a custom tolerance', () => {
    expect(scoreStroke([{ x: 100, y: 140 }], undefined, median, 200, 50)).toBe(1);
  });

  it('uses Path2D.isPointInStroke when a stroke path is available', () => {
    class FakePath2D {
      constructor(public d: string) {}
    }
    vi.stubGlobal('Path2D', FakePath2D);
    const probe = { lineWidth: 0, isPointInStroke: vi.fn(() => true) };
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      probe as unknown as CanvasRenderingContext2D
    );
    expect(scoreStroke([{ x: 1, y: 1 }], 'M0 0 L10 10', median, 200, 18)).toBe(1);
    expect(probe.lineWidth).toBe(36);
    expect(probe.isPointInStroke).toHaveBeenCalledTimes(1);
  });

  it('counts partial hits in the Path2D branch', () => {
    class FakePath2D {
      constructor(public d: string) {}
    }
    vi.stubGlobal('Path2D', FakePath2D);
    const probe = { lineWidth: 0, isPointInStroke: vi.fn((_p: unknown, x: number) => x < 5) };
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      probe as unknown as CanvasRenderingContext2D
    );
    expect(
      scoreStroke([{ x: 1, y: 1 }, { x: 9, y: 1 }], 'M0 0 L10 10', undefined, 200)
    ).toBe(0.5);
  });

  it('prefers the Path2D branch over the median fallback', () => {
    class FakePath2D {
      constructor(public d: string) {}
    }
    vi.stubGlobal('Path2D', FakePath2D);
    const probe = { lineWidth: 0, isPointInStroke: vi.fn(() => false) };
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      probe as unknown as CanvasRenderingContext2D
    );
    expect(scoreStroke([onLine], 'M0 0 L10 10', median, 200)).toBe(0);
  });

  it('falls back to the median when no 2d context is available', () => {
    class FakePath2D {
      constructor(public d: string) {}
    }
    vi.stubGlobal('Path2D', FakePath2D);
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
    expect(scoreStroke([onLine], 'M0 0 L10 10', median, 200)).toBe(1);
  });
});

describe('judgeUserStroke', () => {
  it('returns the previous array untouched for an empty stroke', () => {
    const prev = [0.5];
    const onAccuracyChange = vi.fn();
    const result = judgeUserStroke({ ...baseParams, userPoints: [], prevAccuracies: prev, onAccuracyChange });
    expect(result).toBe(prev);
    expect(onAccuracyChange).not.toHaveBeenCalled();
  });

  it('appends the accuracy and reports the new average', () => {
    const onAccuracyChange = vi.fn();
    const result = judgeUserStroke({ ...baseParams, userPoints: [onLine], onAccuracyChange });
    expect(result).toEqual([0.5, 1]);
    expect(onAccuracyChange).toHaveBeenCalledWith(0.75);
  });

  it('does not mutate the incoming accuracies', () => {
    const prev = [0.5];
    judgeUserStroke({ ...baseParams, userPoints: [onLine], prevAccuracies: prev });
    expect(prev).toEqual([0.5]);
  });

  it('works without an accuracy callback', () => {
    expect(judgeUserStroke({ ...baseParams, userPoints: [onLine] })).toEqual([0.5, 1]);
  });

  it('accumulates a zero score for an off-track stroke', () => {
    const onAccuracyChange = vi.fn();
    const result = judgeUserStroke({
      ...baseParams,
      userPoints: [{ x: 100, y: 300 }],
      prevAccuracies: [],
      onAccuracyChange,
    });
    expect(result).toEqual([0]);
    expect(onAccuracyChange).toHaveBeenCalledWith(0);
  });
});
