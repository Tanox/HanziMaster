// src/components/layout-client.tsx v3.0.0
'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/components/locale-provider';
import { ThemeToggleClient } from '@/components/theme-toggle';
import { LocaleToggleClient } from '@/components/locale-toggle';
import { MobileNav } from '@/components/mobile-nav';
import { NavLink } from '@/components/nav-link';
import { cn } from '@/lib/utils';


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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Skip to content - accessibility */}
      <a href="#main-content" className="skip-to-content">
        {t('common.skipToContent')}
      </a>

      {/* Header - Apple Style with Glassmorphism */}
      <header className="bg-background/80 backdrop-blur-xl border-b border-border/50 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className={cn('size-9 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200')}>
            <span className="text-white text-lg font-bold hanzi-font">汉</span>
          </div>
          <span className="text-xl font-semibold tracking-tight hidden sm:block">
            HanziMaster
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Main" className="hidden lg:flex items-center gap-8">
          <NavLink href="/learn">{t('common.learn')}</NavLink>
          <NavLink href="/practice">{t('common.practice')}</NavLink>
          <div className="h-6 w-px bg-border"></div>
          <LocaleToggleClient />
          <ThemeToggleClient />
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggleClient />
          <LocaleToggleClient />
          <button
            onClick={() => setMobileNavOpen(true)}
            className="p-2 rounded-lg hover:bg-accent transition-colors duration-200"
            aria-label={t('common.openMenu')}
            aria-expanded={mobileNavOpen}
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={closeMobileNav} t={t} />

      {/* Main Content */}
      <main id="main-content" className="flex-1 page-transition" key={pathname}>
        {children}
      </main>

      {/* Footer - Apple Style */}
      <footer className="bg-muted border-t border-border/50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <div className={cn('size-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center')}>
              <span className="text-white text-sm font-bold hanzi-font">汉</span>
            </div>
            <span className="text-lg font-semibold">HanziMaster</span>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <Link href="/learn" className={cn('hover:text-primary transition-colors')}>{t('common.learn')}</Link>
            <Link href="/practice" className={cn('hover:text-primary transition-colors')}>{t('common.practice')}</Link>
          </nav>
          <p className="text-xs sm:text-sm text-muted-foreground text-center">{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}
