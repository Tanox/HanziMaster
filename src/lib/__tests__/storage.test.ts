// src/lib/__tests__/storage.test.ts v5.2.50

import { beforeEach, describe, expect, it } from 'vitest';
import { safeGetItem, safeSetItem, trySetItem } from '../storage';

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

    window.localStorage.setItem('no-data', JSON.stringify({ _v: 1 }));
    expect(safeGetItem('no-data', 7)).toBe(7);
  });

  it('silently ignores quota errors', () => {
    // 内存 Storage 兜底以自有 setItem 实现，遮蔽 Storage.prototype；
    // 必须 mock 实际被调用的实例方法，否则配额异常不会被触发。
    const storage = window.localStorage;
    const original = storage.setItem;
    storage.setItem = () => {
      throw new Error('QuotaExceededError');
    };
    try {
      expect(() => safeSetItem('blocked', 'value')).not.toThrow();
      expect(trySetItem('blocked', 'value')).toBe(false);
    } finally {
      // 断言失败也必须还原实例方法，否则污染后续用例
      storage.setItem = original;
    }
  });
});
