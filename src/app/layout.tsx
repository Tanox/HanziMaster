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
import { TooltipProvider } from "@/components/ui/tooltip";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Skip to content - accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      {/* Header - Apple Style with Glassmorphism */}
      <header className="bg-background/80 backdrop-blur-xl border-b border-border/50 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 bg-gradient-to-br from-[#007aff] to-[#5856d6] rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
            <span className="text-white text-lg font-bold hanzi-font">汉</span>
          </div>
          <span className="text-xl font-semibold tracking-tight hidden sm:block">
            HanziMaster
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavLink href="/learn">{t("common.learn")}</NavLink>
          <NavLink href="/practice">{t("common.practice")}</NavLink>
          <div className="w-px h-6 bg-border"></div>
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
            aria-label="Open menu"
            aria-expanded={mobileNavOpen}
            style={{ minWidth: 44, minHeight: 44 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
            <div className="w-8 h-8 bg-gradient-to-br from-[#007aff] to-[#5856d6] rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold hanzi-font">汉</span>
            </div>
            <span className="text-lg font-semibold">HanziMaster</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <Link href="/learn" className="hover:text-[#007aff] dark:hover:text-[#2997ff] transition-colors">{t("common.learn")}</Link>
            <Link href="/practice" className="hover:text-[#007aff] dark:hover:text-[#2997ff] transition-colors">{t("common.practice")}</Link>
          </nav>
          <p className="text-xs sm:text-sm text-muted-foreground text-center">{t("footer.copyright")}</p>
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
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
        <meta name="theme-color" content="#ffffff"/>
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <LocaleProvider>
            <TooltipProvider>
              <LayoutContent>{children}</LayoutContent>
            </TooltipProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
