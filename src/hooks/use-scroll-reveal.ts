// src/hooks/use-scroll-reveal.ts v5.2.42
import { useEffect } from 'react';

import { loadSettings } from '@/lib/settings';

// 滚动揭示动画：观察 .reveal 元素，进入视口时添加 .revealed 并停止观察。
// 设置面板开启「减少动效」时跳过观察，所有 .reveal 立即显示（优先级高于系统 prefers-reduced-motion）。
export function useScrollReveal() {
  useEffect(() => {
    if (loadSettings().reduceMotion) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
