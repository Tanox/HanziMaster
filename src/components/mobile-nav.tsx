// src/components/mobile-nav.tsx v5.2.44
'use client';

import { APP_VERSION } from '@/lib/version';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSwipeClose } from '@/hooks/use-swipe-close';
import type { TranslationKey } from '@/lib/i18n';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

export function MobileNav({ isOpen, onClose, t }: MobileNavProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const swipe = useSwipeClose(isOpen, onClose);

  // 仅在 URL 真的变化时关闭抽屉；避免 onClose 身份变化导致打开即被关闭
  const previousPathname = useRef(pathname);
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    // 记录触发元素，关闭后归还焦点；背景内容设 inert，避免 Tab 逃逸与读屏穿透
    const trigger = document.activeElement as HTMLElement | null;
    const shell = document.getElementById('app-shell');
    const background = shell
      ? Array.from(shell.children).filter(
          (el) => el.id !== 'mobile-nav' && el.id !== 'mobile-nav-backdrop'
        )
      : [];
    background.forEach((el) => el.setAttribute('inert', ''));
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = Array.from(
        drawerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      const outside = !drawerRef.current?.contains(active);
      if (e.shiftKey && (active === first || outside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || outside)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      background.forEach((el) => el.removeAttribute('inert'));
      trigger?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        id="mobile-nav-backdrop"
        className="fixed inset-0 bg-ink-900/30 dark:bg-ink-950/50 z-50 backdrop-blur-sm animate-fade-in-elegant"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('common.navigationMenu')}
        className="fixed end-0 top-0 h-full w-72 max-w-[85vw] bg-card/95 dark:bg-ink-900/95 backdrop-blur-xl shadow-ink-xl z-50 animate-slide-in-right flex flex-col overscroll-contain"
        id="mobile-nav"
        onTouchStart={swipe.onTouchStart}
        onTouchEnd={swipe.onTouchEnd}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-5 border-b border-ink-100 dark:border-ink-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-vermilion-500 to-vermilion-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground text-base font-bold serif-font">汉</span>
            </div>
            <span className="text-base font-bold text-ink-900 dark:text-ink-50 display-font">HanziMaster</span>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors duration-200 touch-target"
            aria-label={t('common.closeMenu')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            <Link
              href="/"
              onClick={onClose}
              className={`block px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${
                pathname === '/'
                  ? 'bg-vermilion-500/10 dark:bg-vermilion-500/20 text-vermilion-500 dark:text-vermilion-400'
                  : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'
              }`}
            >
              {t('common.home')}
            </Link>
            <Link
              href="/learn"
              onClick={onClose}
              className={`block px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${
                pathname === '/learn'
                  ? 'bg-vermilion-500/10 dark:bg-vermilion-500/20 text-vermilion-500 dark:text-vermilion-400'
                  : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'
              }`}
            >
              {t('common.learn')}
            </Link>
            <Link
              href="/practice"
              onClick={onClose}
              className={`block px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${
                pathname === '/practice'
                  ? 'bg-vermilion-500/10 dark:bg-vermilion-500/20 text-vermilion-500 dark:text-vermilion-400'
                  : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'
              }`}
            >
              {t('common.practice')}
            </Link>
          </div>
        </nav>

        {/* Drawer Footer */}
        <div className="p-5 border-t border-ink-100 dark:border-ink-800 text-center">
          <p id="drawer-version" className="text-xs text-ink-400 dark:text-ink-500">
            HanziMaster v{APP_VERSION}
          </p>
        </div>
      </div>
    </>
  );
}
