// app/changelog/page.tsx v1.4.1
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, History } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAppController } from '../hooks/useAppController';

export default function ChangelogPage() {
  const { state } = useAppController();
  const { labels } = state;
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/changelog')
      .then(res => res.json())
      .then(data => {
        setContent(data.content);
        setLoading(false);
      })
      .catch(() => {
        setContent('# Changelog\n\nUnable to load changelog.');
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-paper dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors mb-12 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">{labels.backToHome}</span>
        </Link>

        <header className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <History className="text-teal-600" size={32} />
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              {labels.footerChangelog}
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400">
            {labels.currentLang === 'zh-CN' ? '记录汉字大师的每一次成长与蜕变。' : 'Recording every step of HanziMaster growth.'}
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <div className="markdown-body prose prose-slate dark:prose-invert max-w-none 
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-100 dark:prose-h2:border-slate-800
            prose-h3:text-lg prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-teal-600 dark:prose-h3:text-teal-400
            prose-ul:list-disc prose-ul:pl-6 prose-li:my-1 prose-li:text-slate-600 dark:prose-li:text-slate-400
            prose-p:text-slate-600 dark:prose-p:text-slate-400
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        )}

        <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-400">
            HanziMaster v1.4.0 &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </main>
  );
}
