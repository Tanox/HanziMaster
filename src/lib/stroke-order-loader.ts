// src/lib/stroke-order-loader.ts v5.2.44
// P1-12：12 汉字笔顺 SVG path / medians 从首屏包中拆出，打开演示或书写弹窗时再加载。
import type { StrokeOrderData } from './character-types';

let cache: Record<string, StrokeOrderData> | null = null;
let pending: Promise<Record<string, StrokeOrderData>> | null = null;

async function loadAll(): Promise<Record<string, StrokeOrderData>> {
  if (cache) return cache;
  if (!pending) {
    pending = import('./stroke-order-data').then((module) => {
      cache = module.strokeOrderData;
      return cache;
    });
  }
  return pending;
}

/** 按字符取笔顺数据；同一份 chunk 只加载一次。 */
export async function loadStrokeOrder(character: string): Promise<StrokeOrderData | undefined> {
  return (await loadAll())[character];
}
