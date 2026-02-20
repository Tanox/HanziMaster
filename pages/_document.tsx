
// pages/_document.tsx v1.1.6
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
          <meta name="theme-color" content="#fdfbf7" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
          
          <title>HanziMaster - Interactive Calligraphy & AI Scoring</title>
          <meta name="description" content="Master Chinese characters with stroke animations and intelligent scoring engine." />
          
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-TZG68T8J31"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-TZG68T8J31');
              `,
            }}
          />
          
          <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        </Head>
        <body className="bg-paper dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
