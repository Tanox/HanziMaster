// src/components/mobile-nav.tsx v2.3.1 - Apple Design Style
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

  const links = [
    { href: '/', key: 'common.home' },
    { href: '/learn', key: 'common.learn' },
    { href: '/practice', key: 'common.practice' },
  ];

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
      <div
        className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 z-50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('common.navigation') || 'Navigation menu'}
        className="fixed right-0 top-0 h-full w-72 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl z-50 animate-slide-in-right flex flex-col rounded-l-[24px]"
      >
        <div className="flex justify-between items-center p-5 border-b border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/30">
              <span className="text-white text-base font-bold hanzi-font">汉</span>
            </div>
            <span className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">
              HanziMaster
            </span>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label={t('common.close') || 'Close menu'}
            className="touch-target p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4" role="navigation">
          <ul className="space-y-1.5" role="menubar">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href} role="none">
                  <Link
                    href={link.href}
                    onClick={onClose}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                    className={`touch-target flex items-center px-4 py-3 rounded-full font-medium transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
                      isActive
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-5 border-t border-slate-200/80 dark:border-slate-700/80 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            HanziMaster v2.3.1
          </p>
        </div>
      </div>
    </>
  );
}
