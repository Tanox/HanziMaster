'use client';

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider, useTranslation } from "@/components/locale-provider";
import { ThemeToggleClient } from "@/components/theme-toggle";
import { LocaleToggleClient } from "@/components/locale-toggle";

/* ───────── Mobile Navigation Drawer ───────── */
function MobileNav({
  isOpen,
  onClose,
  t,
}: {
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
}) {
  const pathname = usePathname();

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Close on Escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const linkClass = (href: string) =>
    `block w-full text-left px-6 py-4 text-lg font-medium rounded-xl transition-all duration-200 ${
      pathname === href
        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
        : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50"
    }`;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <nav
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
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
          <Link href="/" onClick={onClose} className={linkClass("/")}>
            🏠 Home
          </Link>
          <Link href="/learn" onClick={onClose} className={linkClass("/learn")}>
            📖 {t("common.learn")}
          </Link>
          <Link href="/practice" onClick={onClose} className={linkClass("/practice")}>
            ✏️ {t("common.practice")}
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <LocaleToggleClient />
            <ThemeToggleClient />
          </div>
          <button
            onClick={onClose}
            className="mt-4 w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl text-base font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/25"
            style={{ minHeight: 48 }}
          >
            {t("common.signIn")}
          </button>
        </div>
      </nav>
    </>
  );
}

/* ───────── Desktop NavLink ───────── */
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive
          ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30"
          : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-700/50"
      }`}
      style={{ minHeight: 40 }}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-emerald-500 rounded-full" />
      )}
    </Link>
  );
}

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-slate-100 flex flex-col">
      {/* Skip to content - accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      {/* ─── Header ─── */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 py-3 px-4 sm:px-6 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform duration-300">
            <span className="text-white text-xl font-bold hanzi-font">汉</span>
          </div>
          <div className="flex-col hidden sm:flex">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
              HanziMaster
            </h1>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wider">
              汉字大师
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <NavLink href="/learn">{t("common.learn")}</NavLink>
          <NavLink href="/practice">{t("common.practice")}</NavLink>

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2" />

          <LocaleToggleClient />
          <ThemeToggleClient />

          <button className="ml-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-95"
            style={{ minHeight: 40 }}
          >
            {t("common.signIn")}
          </button>
        </nav>

        {/* Mobile: controls strip */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggleClient />
          <LocaleToggleClient />
          {/* Hamburger */}
          <button
            onClick={() => setMobileNavOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ml-1"
            aria-label="Open menu"
            aria-expanded={mobileNavOpen}
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={closeMobileNav} t={t} />

      {/* ─── Main Content ─── */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-white dark:bg-slate-800/50 border-t border-slate-200/50 dark:border-slate-700/50 py-10 sm:py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold hanzi-font">汉</span>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">HanziMaster</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/learn" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t("common.learn")}</Link>
            <Link href="/practice" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t("common.practice")}</Link>
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">About</a>
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact</a>
          </nav>
          <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 text-center">{t("footer.copyright")}</p>
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
