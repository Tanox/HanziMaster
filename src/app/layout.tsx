// src/app/layout.tsx v3.0.0
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Noto_Sans_SC } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { LocaleProvider } from '@/components/locale-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LayoutClient } from '@/components/layout-client';
import './globals.css';

// Optimize fonts with next/font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-hanzi',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HanziMaster - AI-Powered Chinese Character Learning',
  description: 'Master Chinese characters with AI-powered insights, etymology exploration, and adaptive learning.',
  keywords: ['Chinese', 'Hanzi', 'Learning', 'Education', 'AI', 'Language'],
  authors: [{ name: 'HanziMaster Team' }],
  openGraph: {
    title: 'HanziMaster - AI-Powered Chinese Character Learning',
    description: 'Master Chinese characters with AI-powered insights.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} ${notoSansSC.variable}`}>
      <body className="antialiased font-sans">
        <ThemeProvider>
          <LocaleProvider>
            <TooltipProvider>
              <LayoutClient>{children}</LayoutClient>
            </TooltipProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
