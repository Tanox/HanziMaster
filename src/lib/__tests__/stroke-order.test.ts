// src/lib/__tests__/stroke-order.test.ts v5.2.19
import { describe, it, expect } from 'vitest';
import { strokeOrderData } from '@/lib/stroke-order-data';
import { characters } from '@/lib/characters';

describe('stroke order data', () => {
  it('每个练习汉字都有真实笔顺数据', () => {
    for (const c of characters) {
      expect(strokeOrderData[c.hanzi], `缺少 ${c.hanzi} 的笔顺数据`).toBeTruthy();
    }
  });

  it('笔顺数据含非空 strokes 与 medians，且数量一致', () => {
    for (const hanzi of Object.keys(strokeOrderData)) {
      const data = strokeOrderData[hanzi];
      expect(data.strokes.length).toBeGreaterThan(0);
      expect(data.medians.length).toBeGreaterThan(0);
      // 每笔应有对应的描红轮廓与中位线
      expect(data.strokes.length).toBe(data.medians.length);
      for (const m of data.medians) expect(m.length).toBeGreaterThan(1);
    }
  });
});
