// src/app/layout.tsx v5.1.0
import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Playfair_Display, Noto_Serif_SC, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { LocaleProvider } from '@/components/locale-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LayoutClient } from '@/components/layout-client';
import './globals.css';

// 字体对齐设计规范 07-design-prototype.md §2.2：Space Grotesk / Playfair Display / Noto Serif SC / JetBrains Mono
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
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
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${playfairDisplay.variable} ${notoSerifSC.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
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
