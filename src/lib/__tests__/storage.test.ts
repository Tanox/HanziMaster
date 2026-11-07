// src/lib/__tests__/storage.test.ts v5.2.35

import { beforeEach, describe, expect, it } from 'vitest';
import { safeGetItem, safeSetItem } from '../storage';

describe('safeGetItem / safeSetItem', () => {
  beforeEach(() => window.localStorage.clear());

  it('round-trips typed values with a version envelope', () => {
    safeSetItem('test-key', { count: 3 });
    expect(safeGetItem('test-key', { count: 0 })).toEqual({ count: 3 });
    const raw = JSON.parse(window.localStorage.getItem('test-key')!);
    expect(raw).toEqual({ _v: 1, _d: { count: 3 } });
  });

  it('returns the default for missing, malformed or outdated entries', () => {
    expect(safeGetItem('missing', 7)).toBe(7);

    window.localStorage.setItem('broken', '{not json');
    expect(safeGetItem('broken', 7)).toBe(7);

    window.localStorage.setItem('old', JSON.stringify({ _v: 0, _d: 99 }));
    expect(safeGetItem('old', 7)).toBe(7);
  });

  it('silently ignores quota errors', () => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = () => {
      throw new Error('QuotaExceededError');
    };
    expect(() => safeSetItem('blocked', 'value')).not.toThrow();
    Storage.prototype.setItem = original;
  });
});
