// src/components/__tests__/providers.test.tsx v5.2.35

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LocaleProvider, useLocale } from '../locale-provider';
import { ThemeProvider, useTheme } from '../theme-provider';

function ThemeProbe() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button type="button" onClick={() => setTheme('dark')}>dark</button>
    </div>
  );
}

function LocaleProbe() {
  const { locale, setLocale, t } = useLocale();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="title">{t('legal.privacyTitle')}</span>
      <button type="button" onClick={() => setLocale('zh-CN')}>zh</button>
    </div>
  );
}

beforeEach(() => {
  window.localStorage.clear();
  window.history.replaceState(null, '', '/');
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
});

afterEach(() => {
  document.documentElement.lang = 'en';
  document.documentElement.dir = 'ltr';
  document.documentElement.classList.remove('dark', 'light');
  vi.unstubAllGlobals();
});

describe('ThemeProvider', () => {
  it('exposes resolvedTheme and persists a manual choice', async () => {
    render(<ThemeProvider><ThemeProbe /></ThemeProvider>);
    expect(screen.getByTestId('theme').textContent).toBe('system');
    expect(screen.getByTestId('resolved').textContent).toBe('light');

    await userEvent.click(screen.getByRole('button', { name: 'dark' }));
    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(screen.getByTestId('resolved').textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem('hanzi-master-theme')).toContain('dark');
  });
});

describe('LocaleProvider', () => {
  it('prefers a shareable ?lang= URL parameter', async () => {
    window.history.replaceState(null, '', '/?lang=ja');
    render(<LocaleProvider><LocaleProbe /></LocaleProvider>);
    expect(await screen.findByTestId('locale')).toHaveTextContent('ja');
    expect(document.documentElement.lang).toBe('ja');
    expect(document.documentElement.dir).toBe('ltr');
  });

  it('switches locale, writes cookie and resolves RTL for Arabic', async () => {
    render(<LocaleProvider><LocaleProbe /></LocaleProvider>);
    expect(await screen.findByTestId('title')).toHaveTextContent('Privacy Policy');

    await userEvent.click(screen.getByRole('button', { name: 'zh' }));
    expect(screen.getByTestId('locale')).toHaveTextContent('zh-CN');
    expect(document.cookie).toContain('hanzi-master-locale=zh-CN');
    expect(screen.getByTestId('title')).toHaveTextContent('隐私政策');
  });

  it('sets rtl direction for arabic URL locale', async () => {
    window.history.replaceState(null, '', '/?lang=ar');
    render(<LocaleProvider><LocaleProbe /></LocaleProvider>);
    expect(await screen.findByTestId('locale')).toHaveTextContent('ar');
    expect(document.documentElement.dir).toBe('rtl');
  });
});
