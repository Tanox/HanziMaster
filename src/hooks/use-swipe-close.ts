// src/hooks/use-swipe-close.ts v5.2.50
'use client';

import { useRef } from 'react';
import type { TouchEvent } from 'react';

const SWIPE_THRESHOLD = 60;

/** 抽屉手势：LTR 右抽屉向右滑关闭；RTL 左抽屉向左滑关闭。 */
export function useSwipeClose(isOpen: boolean, onClose: () => void) {
  const startX = useRef<number | null>(null);

  const onTouchStart = (e: TouchEvent<HTMLElement>) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: TouchEvent<HTMLElement>) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    startX.current = null;
    const isRtl = document.documentElement.dir === 'rtl';
    // 关闭方向始终朝屏幕外侧：LTR 为 +dx，RTL 为 -dx
    if (isOpen && (isRtl ? dx < -SWIPE_THRESHOLD : dx > SWIPE_THRESHOLD)) onClose();
  };

  return { onTouchStart, onTouchEnd };
}
