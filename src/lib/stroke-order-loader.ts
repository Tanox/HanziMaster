// src/lib/stroke-order-loader.ts v5.2.50
// P1-12：12 汉字笔顺 SVG path / medians 从首屏包中拆出，打开演示或书写弹窗时再加载。
import type { StrokeOrderData } from './character-types';
import { createLogger } from './logger';

const logger = createLogger('stroke-order-loader');

let cache: Record<string, StrokeOrderData> | null = null;
let pending: Promise<Record<string, StrokeOrderData>> | null = null;

async function loadAll(): Promise<Record<string, StrokeOrderData>> {
  if (cache) return cache;
  if (!pending) {
    pending = import('./stroke-order-data').then((module) => {
      cache = module.strokeOrderData;
      return cache;
    });
    // chunk 加载失败后清空 pending 允许重试；同时消费 rejection，避免 unhandled rejection
    pending.catch((error: unknown) => {
      pending = null;
      logger.warn('笔顺数据加载失败，已重置缓存以便重试', {
        error: error instanceof Error ? error : String(error),
      });
    });
  }
  return pending;
}

/** 按字符取笔顺数据；同一份 chunk 只加载一次，失败后可重试。 */
export async function loadStrokeOrder(character: string): Promise<StrokeOrderData | undefined> {
  return (await loadAll())[character];
}
