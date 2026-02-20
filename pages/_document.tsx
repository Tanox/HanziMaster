
// pages/_document.tsx v1.1.6
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      &lt;Html lang="en"&gt;
        &lt;Head&gt;
          &lt;meta charSet="UTF-8" /&gt;
          &lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" /&gt;
          &lt;meta name="theme-color" content="#fdfbf7" media="(prefers-color-scheme: light)" /&gt;
          &lt;meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" /&gt;
          
          &lt;title&gt;HanziMaster - Interactive Calligraphy &amp; AI Scoring&lt;/title&gt;
          &lt;meta name="description" content="Master Chinese characters with stroke animations and intelligent scoring engine." /&gt;
          
          &lt;script async src="https://www.googletagmanager.com/gtag/js?id=G-TZG68T8J31"&gt;&lt;/script&gt;
          &lt;script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-TZG68T8J31');
              `,
            }}
          /&gt;
          
          &lt;link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet" /&gt;
        &lt;/Head&gt;
        &lt;body className="bg-paper dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300"&gt;
          &lt;Main /&gt;
          &lt;NextScript /&gt;
        &lt;/body&gt;
      &lt;/Html&gt;
    );
  }
}

export default MyDocument;
