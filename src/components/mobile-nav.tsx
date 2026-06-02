// src/components/mobile-nav.tsx v2.2.1
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
}

export function MobileNav({ isOpen, onClose, t }: MobileNavProps) {
  const pathname = usePathname();

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* Close on Escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const linkClass = (href: string) =>
    `block w-full text-left px-6 py-4 text-lg font-medium rounded-xl transition-all duration-200 ${
      pathname === href
        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50'
    }`;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <nav
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            HanziMaster
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close menu"
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-2 p-4">
          <Link href="/" onClick={onClose} className={linkClass('/')}>
            {t('common.home')}
          </Link>
          <Link href="/learn" onClick={onClose} className={linkClass('/learn')}>
            {t('common.learn')}
          </Link>
          <Link href="/practice" onClick={onClose} className={linkClass('/practice')}>
            {t('common.practice')}
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            HanziMaster v2.2.1
          </p>
        </div>
      </nav>
    </>
  );
}
