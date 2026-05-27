import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider } from "@/components/locale-provider";
import { ThemeToggleClient } from "@/components/theme-toggle";
import { LocaleToggleClient } from "@/components/locale-toggle";

export const metadata: Metadata = {
  title: "HanziMaster 汉字大师",
  description: "AI-powered Chinese character learning platform",
};

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
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-slate-100 flex flex-col">
              <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
                <a href="/" className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-emerald-600">汉</span>
                  <h1 className="text-xl font-semibold tracking-tight">HanziMaster</h1>
                </a>
                <nav className="flex items-center gap-4">
                  <a href="/learn" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors">
                    Learn
                  </a>
                  <a href="/learn" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors">
                    Practice
                  </a>
                  <LocaleToggleClient />
                  <ThemeToggleClient />
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                    Sign In
                  </button>
                </nav>
              </header>

              <main className="flex-1">
                {children}
              </main>

              <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-8 px-6 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">© 2026 HanziMaster 汉字大师 v2.2.0. All rights reserved.</p>
              </footer>
            </div>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
