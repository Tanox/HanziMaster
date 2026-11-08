// src/app/layout.tsx v5.2.45
import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import { Space_Grotesk, Playfair_Display, Noto_Serif_SC, JetBrains_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@/components/google-analytics';
import { ThemeProvider } from '@/components/theme-provider';
import { LocaleProvider } from '@/components/locale-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LayoutClient } from '@/components/layout-client';
import { ConsentBanner } from '@/components/consent-banner';
import { StructuredData } from '@/components/structured-data';
import { DEFAULT_LOCALE, SITE_URL, SUPPORTED_LOCALES, isRtlLocale, isSupportedLocale } from '@/lib/site';
import './globals.css';

// 字体对齐设计规范 07-design-prototype.md §2.2
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const notoSerifSC = Noto_Serif_SC({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-serif', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

// P1-8：hreflang 指向语言前缀 URL（由 src/proxy.ts 重写到实际页面），x-default 保留根路径
const languageAlternates = Object.fromEntries(
  SUPPORTED_LOCALES.map((locale) => [locale, `/${locale}/`])
);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'HanziMaster 汉字大师 — 汉字笔顺与书写练习',
    template: '%s | HanziMaster 汉字大师',
  },
  description:
    '通过笔顺演示、田字格书写练习与拼音测验学习汉字；纯前端本地优先，支持 11 种语言与深色模式。',
  applicationName: 'HanziMaster',
  keywords: ['Chinese', 'Hanzi', '汉字', '笔顺', 'Stroke Order', 'Learning', 'Education'],
  authors: [{ name: 'HanziMaster Team' }],
  category: 'education',
  alternates: {
    canonical: '/',
    languages: { ...languageAlternates, 'x-default': '/' },
  },
  openGraph: {
    title: 'HanziMaster 汉字大师 — 汉字笔顺与书写练习',
    description: 'Learn Chinese characters with stroke-order demonstrations and handwriting practice.',
    type: 'website',
    url: '/',
    siteName: 'HanziMaster',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HanziMaster 汉字大师',
    description: 'Interactive Chinese character learning with stroke-order practice.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: { icon: '/icon.svg' },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f6' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // 首访默认 en；之后按语言切换时写入的 cookie 输出正确的 lang/dir（含 RTL）
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('hanzi-master-locale')?.value;
  const initialLocale = savedLocale && isSupportedLocale(savedLocale) ? savedLocale : DEFAULT_LOCALE;
  const direction = isRtlLocale(initialLocale) ? 'rtl' : 'ltr';

  return (
    <html
      lang={initialLocale}
      dir={direction}
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${playfairDisplay.variable} ${notoSerifSC.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* 字体由 next/font/google 构建期自托管，无需运行时 preconnect */}
        <GoogleAnalytics />
        <StructuredData />
      </head>
      <body className="antialiased font-sans">
        <ThemeProvider>
          <LocaleProvider defaultLocale={initialLocale}>
            <TooltipProvider>
              <LayoutClient>{children}</LayoutClient>
              <ConsentBanner />
            </TooltipProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
