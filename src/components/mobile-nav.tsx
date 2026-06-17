// src/components/mobile-nav.tsx v3.0.0
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

  // Focus management
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Close on Escape key
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
        className="fixed right-0 top-0 h-full w-72 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl z-50 animate-slide-in-right flex flex-col"
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-[#007aff] to-[#af52de] rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white text-base font-bold hanzi-font">汉</span>
            </div>
            <span className="text-base font-bold text-gray-900 dark:text-white">HanziMaster</span>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={onClose}
              className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                pathname === '/'
                  ? 'bg-[#007aff]/10 dark:bg-[#5856d6]/20 text-[#007aff] dark:text-[#2997ff]'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {t('common.home')}
            </Link>
            <Link
              href="/learn"
              onClick={onClose}
              className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                pathname === '/learn'
                  ? 'bg-[#007aff]/10 dark:bg-[#5856d6]/20 text-[#007aff] dark:text-[#2997ff]'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {t('common.learn')}
            </Link>
            <Link
              href="/practice"
              onClick={onClose}
              className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                pathname === '/practice'
                  ? 'bg-[#007aff]/10 dark:bg-[#5856d6]/20 text-[#007aff] dark:text-[#2997ff]'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {t('common.practice')}
            </Link>
          </div>
        </nav>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            HanziMaster v3.0.0
          </p>
        </div>
      </div>
    </>
  );
}
