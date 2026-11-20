// src/hooks/use-swipe-close.ts v5.2.50
'use client';

import { useRef } from 'react';
import type { TouchEvent } from 'react';

const SWIPE_THRESHOLD = 60;

/** 抽屉手势：LTR 右抽屉向右滑关闭；RTL 左抽屉向左滑关闭。 */
export function useSwipeClose(isOpen: boolean, onClose: () => void) {
  const startX = useRef<number | null>(null);

  const onTouchStart = (e: TouchEvent<HTMLElement>) => {
    // 辅助触控/合成事件可能给出空 touches，直接取 [0] 会抛 TypeError
    const touch = e.touches[0];
    startX.current = touch ? touch.clientX : null;
  };

  const onTouchEnd = (e: TouchEvent<HTMLElement>) => {
    if (startX.current === null) return;
    const touch = e.changedTouches[0];
    if (!touch) {
      startX.current = null;
      return;
    }
    const dx = touch.clientX - startX.current;
    startX.current = null;
    const isRtl = document.documentElement.dir === 'rtl';
    // 关闭方向始终朝屏幕外侧：LTR 为 +dx，RTL 为 -dx
    if (isOpen && (isRtl ? dx < -SWIPE_THRESHOLD : dx > SWIPE_THRESHOLD)) onClose();
  };

  return { onTouchStart, onTouchEnd };
}
