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

function LayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = useTranslation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Skip to content - accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      {/* Header - Apple Style */}
      <header className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 bg-gradient-to-br from-[#007aff] to-[#af52de] rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
            <span className="text-white text-lg font-bold hanzi-font">汉</span>
          </div>
          <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white hidden sm:block">
            HanziMaster
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLink href="/learn">{t("common.learn")}</NavLink>
          <NavLink href="/practice">{t("common.practice")}</NavLink>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-800"></div>
          <LocaleToggleClient />
          <ThemeToggleClient />
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggleClient />
          <LocaleToggleClient />
          <button
            onClick={() => setMobileNavOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Open menu"
            aria-expanded={mobileNavOpen}
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <footer className="bg-[#f5f5f7] dark:bg-[#1d1d1f] border-t border-gray-200/50 dark:border-gray-800/50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#007aff] to-[#af52de] rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold hanzi-font">汉</span>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">HanziMaster</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/learn" className="hover:text-[#007aff] dark:hover:text-[#2997ff] transition-colors">{t("common.learn")}</Link>
            <Link href="/practice" className="hover:text-[#007aff] dark:hover:text-[#2997ff] transition-colors">{t("common.practice")}</Link>
          </nav>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 text-center">{t("footer.copyright")}</p>
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
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
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
