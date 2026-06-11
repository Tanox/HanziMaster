// src/app/layout.tsx v2.4.0 - Apple Design Style
'use client';

import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { LocaleProvider, useTranslation } from '@/components/locale-provider';
import { ThemeToggleClient } from '@/components/theme-toggle';
import { LocaleToggleClient } from '@/components/locale-toggle';
import { MobileNav } from '@/components/mobile-nav';
import { NavLink } from '@/components/nav-link';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { QueryProvider } from '@/components/query-provider';

/* ───────── Main Layout ───────── */
function LayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = useTranslation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  /* Close mobile nav on route change */
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  /* Close on Escape key for accessibility */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileNavOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white flex flex-col">
      {/* Skip to content - accessibility */}
      <a href="#main-content" className="skip-to-content">
        {t('common.skipToContent')}
      </a>

      {/* ─── Header / Navbar ─── */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 py-3 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
            aria-label={t('common.home')}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300" aria-hidden="true">
              <span className="text-white text-base sm:text-xl font-bold hanzi-font">汉</span>
            </div>
            <span className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white">
              HanziMaster
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label={t('common.mainNav')}>
            <NavLink href="/">{t('common.home')}</NavLink>
            <NavLink href="/learn">{t('common.learn')}</NavLink>
            <NavLink href="/practice">{t('common.practice')}</NavLink>
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-800" aria-hidden="true" />
            <LocaleToggleClient />
            <ThemeToggleClient />
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 md:hidden" aria-label={t('common.mobileControls')}>
            <ThemeToggleClient />
            <LocaleToggleClient />
            <button
              onClick={() => setMobileNavOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-1 touch-target"
              aria-label={t('common.openMenu')}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav-drawer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} t={t} />

      {/* ─── Main Content ─── */}
      <main id="main-content" className="flex-1 page-transition">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-800 py-12 px-6 safe-area-bottom">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3" aria-hidden="true">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold hanzi-font">汉</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">HanziMaster</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-gray-500 dark:text-gray-400" aria-label={t('common.footerNav')}>
            <Link href="/learn" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {t('common.learn')}
            </Link>
            <Link href="/practice" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {t('common.practice')}
            </Link>
          </nav>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('footer.copyright')}</p>
        </div>
      </footer>

      {/* ─── Mobile Bottom Nav (iOS-style, only on small screens) ─── */}
      <nav
        className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 md:hidden z-40 safe-area-bottom"
        aria-label={t('common.mobileBottomNav')}
      >
        <div className="flex justify-around items-center py-2 px-2" style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
          <Link
            href="/"
            className={`flex flex-col items-center gap-1 px-4 py-2 touch-target ${pathname === '/' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'} transition-colors`}
            aria-current={pathname === '/' ? 'page' : undefined}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs font-medium">{t('common.home')}</span>
          </Link>
          <Link
            href="/learn"
            className={`flex flex-col items-center gap-1 px-4 py-2 touch-target ${pathname === '/learn' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'} transition-colors`}
            aria-current={pathname === '/learn' ? 'page' : undefined}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-xs font-medium">{t('common.learn')}</span>
          </Link>
          <Link
            href="/practice"
            className={`flex flex-col items-center gap-1 px-4 py-2 touch-target ${pathname === '/practice' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'} transition-colors`}
            aria-current={pathname === '/practice' ? 'page' : undefined}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span className="text-xs font-medium">{t('common.practice')}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        {/* Viewport meta for responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="description" content="HanziMaster - AI-powered Chinese character learning platform" />
        <title>HanziMaster | AI 汉字学习平台</title>
      </head>
      <body className="antialiased">
        <QueryProvider>
          <ThemeProvider>
            <LocaleProvider>
              <LayoutContent>{children}</LayoutContent>
            </LocaleProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
