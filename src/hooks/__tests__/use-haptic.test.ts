// src/hooks/__tests__/use-haptic.test.ts v5.2.42

import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useHaptic } from '../use-haptic';
import { saveSettings } from '@/lib/settings';

describe('useHaptic', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    Reflect.deleteProperty(navigator, 'vibrate');
    vi.restoreAllMocks();
  });

  it('maps each pattern to the expected vibration value', () => {
    const vibrate = vi.fn();
    Object.defineProperty(navigator, 'vibrate', { value: vibrate, configurable: true });
    const { result } = renderHook(() => useHaptic());

    result.current('tap');
    result.current('success');
    result.current('error');

    expect(vibrate).toHaveBeenNthCalledWith(1, 10);
    expect(vibrate).toHaveBeenNthCalledWith(2, 30);
    expect(vibrate).toHaveBeenNthCalledWith(3, [40, 60, 40]);
  });

  it('is a no-op when the Vibration API is unavailable', () => {
    const { result } = renderHook(() => useHaptic());
    expect(() => result.current('tap')).not.toThrow();
  });

  it('does not vibrate when the haptics setting is disabled', () => {
    const vibrate = vi.fn();
    Object.defineProperty(navigator, 'vibrate', { value: vibrate, configurable: true });
    saveSettings({ haptics: false, reduceMotion: false });
    const { result } = renderHook(() => useHaptic());

    result.current('tap');
    result.current('error');

    expect(vibrate).not.toHaveBeenCalled();
  });
});
