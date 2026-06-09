// src/app/layout.tsx v2.3.0 - Apple Design Style
'use client';

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider, useTranslation } from "@/components/locale-provider";
import { ThemeToggleClient } from "@/components/theme-toggle";
import { LocaleToggleClient } from "@/components/locale-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { NavLink } from "@/components/nav-link";

/* ───────── Main Layout ───────── */
function LayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = useTranslation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  /* Close mobile nav on route change */
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white flex flex-col">
      {/* Skip to content - accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      {/* ─── Apple Style Header ─── */}
      <header className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 py-3 px-4 sm:px-6 flex justify-between items-center sticky top-0 z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <span className="text-white text-xl font-bold hanzi-font">汉</span>
          </div>
          <span className="font-semibold text-base text-gray-900 dark:text-white">HanziMaster</span>
        </Link>

        {/* Desktop Nav - Apple Style */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLink href="/learn">{t("common.learn")}</NavLink>
          <NavLink href="/practice">{t("common.practice")}</NavLink>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-2" />
          <LocaleToggleClient />
          <ThemeToggleClient />
        </nav>

        {/* Mobile: controls strip */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggleClient />
          <LocaleToggleClient />
          {/* Hamburger - Apple Style */}
          <button
            onClick={() => setMobileNavOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-1"
            aria-label="Open menu"
            aria-expanded={mobileNavOpen}
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={closeMobileNav} t={t} />

      {/* ─── Main Content ─── */}
      <main id="main-content" className="flex-1 page-transition" key={pathname}>
        {children}
      </main>

      {/* ─── Apple Style Footer ─── */}
      <footer className="bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-800 py-12 px-6 safe-bottom">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold hanzi-font">汉</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">HanziMaster</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/learn" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t("common.learn")}</Link>
            <Link href="/practice" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t("common.practice")}</Link>
          </nav>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t("footer.copyright")}</p>
        </div>
      </footer>
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Viewport meta for responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <LocaleProvider>
            <LayoutContent>{children}</LayoutContent>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
