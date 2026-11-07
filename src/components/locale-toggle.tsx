// src/components/locale-toggle.tsx v5.2.35
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocale } from './locale-provider';
import type { Locale } from '@/lib/i18n';

const localeNames: Record<string, string> = {
  'en': 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'es': 'Español',
  'ar': 'العربية',
  'fr': 'Français',
  'pt-BR': 'Português (BR)',
  'de': 'Deutsch',
  'ja': '日本語',
  'ko': '한국어',
  'ru': 'Русский',
};

export function LocaleToggleClient() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale, availableLocales, t } = useLocale();
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    buttonRef.current?.focus();
  }, []);

  const selectLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
    close();
  }, [setLocale, close]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close]);

  /* Roving tabindex：仅当前项进 Tab 序列，方向键在列表内移动 */
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        const items = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]');
        if (!items || items.length === 0) return;
        const currentIndex = Array.from(items).findIndex((el) => el === document.activeElement);
        const nextIndex =
          e.key === 'Home' ? 0
          : e.key === 'End' ? items.length - 1
          : e.key === 'ArrowDown' ? (currentIndex + 1) % items.length
          : (currentIndex - 1 + items.length) % items.length;
        items[nextIndex]?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  return (
    <div id="locale-toggle" className="relative" ref={menuRef}>
      <button
        id="locale-toggle-button"
        ref={buttonRef}
        onClick={() => setIsOpen((v) => !v)}
        className="p-2 rounded-lg hover:bg-muted transition-colors"
        aria-label={`${t('common.changeLanguage')} (${localeNames[locale] || locale})`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        style={{ minWidth: 44, minHeight: 44 }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      {isOpen && (
        <div
          id="locale-toggle-menu"
          ref={listRef}
          role="listbox"
          aria-label={t('common.selectLanguage')}
          className="absolute right-0 mt-2 w-48 max-h-[70vh] overflow-y-auto bg-card dark:bg-ink-900 rounded-lg shadow-ink-lg border border-border z-50"
        >
          {availableLocales.map((loc) => (
            <button
              key={loc}
              role="option"
              aria-selected={locale === loc}
              onClick={() => selectLocale(loc)}
              tabIndex={locale === loc ? 0 : -1}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg ${
                locale === loc
                  ? 'bg-vermilion-500/10 dark:bg-vermilion-500/20 text-vermilion-600 dark:text-vermilion-400 font-semibold'
                  : 'text-ink-700 dark:text-ink-200'
              }`}
              style={{ minHeight: 40 }}
            >
              {localeNames[loc]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
