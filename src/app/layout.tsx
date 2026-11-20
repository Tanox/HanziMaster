// src/app/layout.tsx v5.2.49
import type { Metadata, Viewport } from 'next';
import { cookies, headers } from 'next/headers';
import { Space_Grotesk, Playfair_Display, Noto_Serif_SC, JetBrains_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@/components/google-analytics';
import { ThemeProvider } from '@/components/theme-provider';
import { LocaleProvider } from '@/components/locale-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LayoutClient } from '@/components/layout-client';
import { ConsentBanner } from '@/components/consent-banner';
import { StructuredData } from '@/components/structured-data';
import { getSiteUrlWarning } from '@/lib/site';
import { LOCALE_COOKIE, resolveLocale, resolvePath } from '@/lib/request-locale';
import { buildMetadata } from '@/lib/build-metadata';
import { loadTranslations } from '@/lib/i18n/load-translations';
import { logger } from '@/lib/logger';
import './globals.css';

// 字体对齐设计规范 07-design-prototype.md §2.2
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

// 生产漏配 SITE_URL 时构建日志明确告警（不阻断 CI，部署清单另列为必填）。
const siteUrlWarning = getSiteUrlWarning();
if (siteUrlWarning) logger.warn(siteUrlWarning, { scope: 'seo' });

/** 语言来自 proxy 注入的请求头（URL 前缀），其次 cookie；路径用于 canonical / hreflang。 */
const requestContext = async () => {
  const requestHeaders = await headers();
  const cookieStore = await cookies();
  return {
    locale: resolveLocale(requestHeaders, cookieStore.get(LOCALE_COOKIE)?.value),
    path: resolvePath(requestHeaders),
  };
};

/** 按当前语言生成 title / description / canonical / hreflang / OG（构造逻辑见 build-metadata.ts）。 */
export async function generateMetadata(): Promise<Metadata> {
  const { locale, path } = await requestContext();
  return buildMetadata(locale, path);
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f6' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // 首屏直接输出 URL 前缀对应的 lang / dir 与词典，避免英文→目标语言闪烁。
  const { locale } = await requestContext();
  const dictionary = await loadTranslations(locale);
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={direction}
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${playfairDisplay.variable} ${notoSerifSC.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* 字体由 next/font/google 构建期自托管，无需运行时 preconnect */}
        <GoogleAnalytics />
        <StructuredData locale={locale} />
      </head>
      <body className="antialiased font-sans">
        <ThemeProvider>
          <LocaleProvider defaultLocale={locale} initialDictionary={dictionary}>
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
