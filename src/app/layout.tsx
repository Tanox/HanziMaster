'use client';

import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider, useTranslation } from "@/components/locale-provider";
import { ThemeToggleClient } from "@/components/theme-toggle";
import { LocaleToggleClient } from "@/components/locale-toggle";

function LayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-slate-100 flex flex-col">
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 py-4 px-6 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform duration-300">
            <span className="text-white text-xl font-bold hanzi-font">汉</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">HanziMaster</h1>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wider">汉字大师</span>
          </div>
        </Link>
        
        <nav className="flex items-center gap-1">
          <Link 
            href="/learn" 
            className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50"
          >
            {t('common.learn')}
          </Link>
          <Link 
            href="/practice" 
            className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50"
          >
            {t('common.practice')}
          </Link>
          
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2"></div>
          
          <LocaleToggleClient />
          <ThemeToggleClient />
          
          <button className="ml-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0">
            {t('common.signIn')}
          </button>
        </nav>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-white dark:bg-slate-800/50 border-t border-slate-200/50 dark:border-slate-700/50 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold hanzi-font">汉</span>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">HanziMaster</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/learn" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('common.learn')}</Link>
            <Link href="/practice" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t('common.practice')}</Link>
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">About</a>
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact</a>
          </div>
          <p className="text-sm text-slate-400 dark:text-slate-500">{t('footer.copyright')}</p>
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
