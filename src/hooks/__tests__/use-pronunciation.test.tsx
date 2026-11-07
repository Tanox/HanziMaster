// src/hooks/__tests__/use-pronunciation.test.tsx v5.2.38
import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { usePronunciation } from '../use-pronunciation';

describe('usePronunciation', () => {
  it('should start idle', () => {
    const { result } = renderHook(() => usePronunciation());
    expect(result.current.isSpeaking).toBe(false);
    expect(result.current.pronounceError).toBe(false);
  });

  it('should set pronounceError when speech synthesis is unavailable', () => {
    // jsdom 未实现 speechSynthesis，覆盖降级错误路径
    const { result } = renderHook(() => usePronunciation());
    act(() => result.current.speak('汉'));
    expect(result.current.pronounceError).toBe(true);
    expect(result.current.isSpeaking).toBe(false);
  });

  it('should resolve speechSupported to false after mount when the API is absent', () => {
    // renderHook 同步 flush effects；jsdom 无 speechSynthesis，挂载后应落为 false（P2-16）
    const { result } = renderHook(() => usePronunciation());
    expect(result.current.speechSupported).toBe(false);
  });
});
