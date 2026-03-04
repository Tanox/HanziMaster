// app/about/page.tsx v1.4.1
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles, Shield, Zap, Globe } from 'lucide-react';
import Link from 'next/link';
import { useAppController } from '../hooks/useAppController';

export default function AboutPage() {
  const { state } = useAppController();
  const { labels } = state;

  const features = [
    {
      icon: <Zap className="text-teal-500" />,
      title: labels.aboutFeature1Title,
      desc: labels.aboutFeature1Desc
    },
    {
      icon: <Sparkles className="text-amber-500" />,
      title: labels.aboutFeature2Title,
      desc: labels.aboutFeature2Desc
    },
    {
      icon: <Globe className="text-blue-500" />,
      title: labels.aboutFeature3Title,
      desc: labels.aboutFeature3Desc
    },
    {
      icon: <Shield className="text-emerald-500" />,
      title: labels.aboutFeature4Title,
      desc: labels.aboutFeature4Desc
    }
  ];

  return (
    <main className="min-h-screen bg-paper dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors mb-12 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">{labels.backToHome}</span>
          </Link>

          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              {labels.aboutTitle}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {labels.aboutIntro}
            </p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/50 shadow-sm"
              >
                <div className="mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </section>

          <section className="prose dark:prose-invert max-w-none mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{labels.aboutVisionTitle}</h2>
            <p className="text-slate-600 dark:text-slate-400">
              {labels.aboutVisionDesc}
            </p>
          </section>

          <footer className="pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2 text-slate-400">
              <span>Made with</span>
              <Heart size={16} className="text-red-500 fill-current" />
              <span>by Sut</span>
            </div>
            <p className="text-xs text-slate-400">
              HanziMaster v1.4.0 &copy; {new Date().getFullYear()}
            </p>
          </footer>
        </motion.div>
      </div>
    </main>
  );
}
