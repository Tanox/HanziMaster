// src/components/locale-toggle.tsx v3.0.0
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocale } from './locale-provider';
import type { Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

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
  'ru': 'Русский'
};

export function LocaleToggleClient() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale, availableLocales } = useLocale();
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

  /* Click outside to close */
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

  /* Keyboard: Escape to close, Arrow keys to navigate */
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const items = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]');
        if (!items || items.length === 0) return;
        const currentIndex = Array.from(items).findIndex((el) => el === document.activeElement);
        const nextIndex = e.key === 'ArrowDown'
          ? (currentIndex + 1) % items.length
          : currentIndex === -1
            ? items.length - 1
            : (currentIndex - 1 + items.length) % items.length;
        items[nextIndex]?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  /* 菜单打开时聚焦到第一个选项 */
  useEffect(() => {
    if (isOpen) {
      const firstOption = listRef.current?.querySelector<HTMLButtonElement>('[role="option"]');
      firstOption?.focus();
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((v) => !v)}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        aria-label={`Change language (current: ${localeNames[locale] || locale})`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        style={{ minWidth: 44, minHeight: 44 }}
      >
        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      {isOpen && (
        <div
          ref={listRef}
          role="listbox"
          aria-label="Select language"
          className="absolute end-0 mt-2 w-48 max-h-[70vh] overflow-y-auto bg-background rounded-lg shadow-lg border border-border z-50"
        >
          {availableLocales.map((loc) => (
            <button
              key={loc}
              role="option"
              aria-selected={locale === loc}
              onClick={() => selectLocale(loc)}
              tabIndex={0}
              className={cn(
                'w-full text-left px-4 py-2.5 text-sm hover:bg-accent transition-colors first:rounded-t-lg last:rounded-b-lg',
                locale === loc
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted-foreground'
              )}
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
