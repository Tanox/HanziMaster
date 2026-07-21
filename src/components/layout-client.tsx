// src/components/layout-client.tsx v4.0.0
'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/components/locale-provider';
import { ThemeToggleClient } from '@/components/theme-toggle';
import { LocaleToggleClient } from '@/components/locale-toggle';
import { MobileNav } from '@/components/mobile-nav';
import { NavLink } from '@/components/nav-link';
import { ToastContainer } from '@/components/toast';

interface LayoutClientProps {
  children: React.ReactNode;
}

export function LayoutClient({ children }: LayoutClientProps) {
  const { t } = useTranslation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 text-ink-900 dark:text-ink-50 flex flex-col">
      {/* Skip to content - accessibility */}
      <a href="#main-content" className="skip-to-content">
        {t('common.skipToContent')}
      </a>

      {/* Header - Oriental Ink Style with Glassmorphism */}
      <header className="bg-white/70 dark:bg-ink-900/70 backdrop-blur-xl border-b border-ink-200/50 dark:border-ink-800/50 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-vermilion-500 to-vermilion-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:shadow-md transition-[colors,transform,box-shadow] duration-300">
            <span className="text-white text-lg font-bold serif-font">汉</span>
          </div>
          <span className="text-xl font-semibold tracking-tight hidden sm:block display-font">
            HanziMaster
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLink href="/learn">{t('common.learn')}</NavLink>
          <NavLink href="/practice">{t('common.practice')}</NavLink>
          <div className="w-px h-6 bg-ink-200 dark:bg-ink-700"></div>
          <LocaleToggleClient />
          <ThemeToggleClient />
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggleClient />
          <LocaleToggleClient />
          <button
            onClick={() => setMobileNavOpen(true)}
            className="p-2 rounded-xl hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors duration-200 touch-target"
            aria-label={t('common.openMenu')}
            aria-expanded={mobileNavOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={closeMobileNav} t={t} />

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Main Content */}
      <main id="main-content" className="flex-1 page-transition" key={pathname}>
        {children}
      </main>

      {/* Footer - Oriental Ink Style */}
      <footer className="bg-ink-100/50 dark:bg-ink-900/50 border-t border-ink-200/50 dark:border-ink-800/50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-vermilion-500 to-vermilion-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-bold serif-font">汉</span>
            </div>
            <span className="text-lg font-semibold display-font">HanziMaster</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-8 text-sm text-ink-500 dark:text-ink-400">
            <Link href="/learn" className="hover:text-vermilion-500 transition-colors">{t('common.learn')}</Link>
            <Link href="/practice" className="hover:text-vermilion-500 transition-colors">{t('common.practice')}</Link>
          </nav>
          <p className="text-xs sm:text-sm text-ink-400 dark:text-ink-500 text-center">{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}
