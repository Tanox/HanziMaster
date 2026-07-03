// src/components/mobile-nav.tsx v3.0.0
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const APP_VERSION = '3.0.0';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
}

export function MobileNav({ isOpen, onClose, t }: MobileNavProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  /* Focus management */
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  /* Close on route change */
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  /* Close on Escape key + focus trap (Tab/Shift+Tab 循环在对话框内) */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const drawer = drawerRef.current;
        if (!drawer) return;
        const focusable = drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
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
        className="fixed inset-0 bg-black/40 dark:bg-black/60 z-50 backdrop-blur-sm animate-fade-in-up"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed end-0 top-0 h-full w-72 max-w-[85vw] bg-background shadow-2xl z-50 animate-slide-in-right flex flex-col"
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="size-9 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white text-base font-bold hanzi-font">汉</span>
            </div>
            <span className="text-base font-bold text-foreground">HanziMaster</span>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Close menu"
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={onClose}
              className={cn(
                'block px-4 py-3 rounded-xl font-medium transition-colors',
                pathname === '/'
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent'
              )}
            >
              {t('common.home')}
            </Link>
            <Link
              href="/learn"
              onClick={onClose}
              className={cn(
                'block px-4 py-3 rounded-xl font-medium transition-colors',
                pathname === '/learn'
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent'
              )}
            >
              {t('common.learn')}
            </Link>
            <Link
              href="/practice"
              onClick={onClose}
              className={cn(
                'block px-4 py-3 rounded-xl font-medium transition-colors',
                pathname === '/practice'
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent'
              )}
            >
              {t('common.practice')}
            </Link>
          </div>
        </nav>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            HanziMaster v{APP_VERSION}
          </p>
        </div>
      </div>
    </>
  );
}
