// src/hooks/__tests__/use-swipe-close.test.ts v5.2.35

import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { TouchEvent } from 'react';
import { useSwipeClose } from '../use-swipe-close';

const touchEvent = (clientX: number, key: 'touches' | 'changedTouches') =>
  ({ [key]: [{ clientX }] } as unknown as TouchEvent<HTMLElement>);

describe('useSwipeClose', () => {
  it('closes when a right swipe exceeds the threshold', () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useSwipeClose(true, onClose));

    result.current.onTouchStart(touchEvent(10, 'touches'));
    result.current.onTouchEnd(touchEvent(100, 'changedTouches'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('ignores short swipes, left swipes and closed state', () => {
    const onClose = vi.fn();
    const { result: open } = renderHook(() => useSwipeClose(true, onClose));
    open.current.onTouchStart(touchEvent(10, 'touches'));
    open.current.onTouchEnd(touchEvent(30, 'changedTouches'));
    open.current.onTouchStart(touchEvent(100, 'touches'));
    open.current.onTouchEnd(touchEvent(20, 'changedTouches'));

    const { result: closed } = renderHook(() => useSwipeClose(false, onClose));
    closed.current.onTouchStart(touchEvent(10, 'touches'));
    closed.current.onTouchEnd(touchEvent(200, 'changedTouches'));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('ignores touch end without a start', () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useSwipeClose(true, onClose));
    result.current.onTouchEnd(touchEvent(200, 'changedTouches'));
    expect(onClose).not.toHaveBeenCalled();
  });
});
