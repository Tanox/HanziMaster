import type { Metadata } from 'next';
import { Inter, Noto_Serif_SC } from 'next/font/google';
import './globals.css';
import { ToastProvider } from './context/ToastContext';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const notoSerifSC = Noto_Serif_SC({ 
  weight: ['400', '700'], 
  subsets: ['latin'], 
  variable: '--font-hanzi' 
});

export const metadata: Metadata = {
  title: 'HanziMaster v1.3.6 - Interactive Calligraphy & AI Scoring',
  description: 'Master Chinese characters with stroke animations and intelligent scoring engine.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSerifSC.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#fdfbf7" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="bg-paper dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TZG68T8J31"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TZG68T8J31');
          `}
        </Script>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
