// src/hooks/use-swipe-close.ts v5.2.31
'use client';

import { useRef } from 'react';
import type { TouchEvent } from 'react';

const SWIPE_THRESHOLD = 60;

/** 右侧抽屉手势：向右滑出超过阈值时触发关闭。 */
export function useSwipeClose(isOpen: boolean, onClose: () => void) {
  const startX = useRef<number | null>(null);

  const onTouchStart = (e: TouchEvent<HTMLElement>) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: TouchEvent<HTMLElement>) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    startX.current = null;
    if (isOpen && dx > SWIPE_THRESHOLD) onClose();
  };

  return { onTouchStart, onTouchEnd };
}
