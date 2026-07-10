// src/components/mobile-nav.tsx v4.0.0
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
}

export function MobileNav({ isOpen, onClose, t }: MobileNavProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
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
        className="fixed right-0 top-0 h-full w-72 max-w-[85vw] bg-white/95 dark:bg-ink-900/95 backdrop-blur-xl shadow-ink-xl z-50 animate-slide-in-right flex flex-col overscroll-contain"
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-5 border-b border-ink-100 dark:border-ink-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-vermilion-500 to-vermilion-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white text-base font-bold serif-font">汉</span>
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
          <p className="text-xs text-ink-400 dark:text-ink-500">
            HanziMaster v4.0.0
          </p>
        </div>
      </div>
    </>
  );
}
