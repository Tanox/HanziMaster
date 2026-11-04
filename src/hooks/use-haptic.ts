// src/hooks/use-haptic.ts v5.2.31
export type HapticPattern = 'tap' | 'success' | 'error';

const PATTERNS: Record<HapticPattern, number | number[]> = {
  tap: 10,
  success: 30,
  error: [40, 60, 40],
};

/** 练习/测验的微妙震动反馈；不支持 Vibration API 的环境静默降级。 */
export function useHaptic() {
  return (pattern: HapticPattern) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(PATTERNS[pattern]);
    }
  };
}
