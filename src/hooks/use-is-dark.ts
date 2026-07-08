// src/hooks/use-is-dark.ts v3.0.0
'use client';

import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

// 根据主题设置与系统偏好计算是否为深色模式，并监听系统主题变化。
// SSR 安全：初始值固定为 false，避免访问 window。
export function useIsDark(theme: Theme): boolean {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      if (theme === 'dark') {
        setIsDark(true);
      } else if (theme === 'system') {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      } else {
        setIsDark(false);
      }
    };
    checkDark();
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.addEventListener('change', checkDark);
    return () => mql.removeEventListener('change', checkDark);
  }, [theme]);

  return isDark;
}
