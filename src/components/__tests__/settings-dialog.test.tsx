// src/components/__tests__/settings-dialog.test.tsx v5.2.44

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LocaleProvider } from '../locale-provider';
import { ThemeProvider } from '../theme-provider';
import { SettingsButton } from '../settings-dialog';
import { ToastProvider } from '../toast';
import { loadSettings } from '@/lib/settings';
import { PROGRESS_STORAGE_KEY } from '@/hooks/use-progress';

function renderPanel() {
  return render(
    <ThemeProvider>
      <LocaleProvider>
        <ToastProvider>
          <SettingsButton />
        </ToastProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}

beforeEach(() => {
  window.localStorage.clear();
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
  document.documentElement.classList.remove('reduce-motion');
});

describe('settings dialog', () => {
  it('persists the haptics toggle', async () => {
    const user = userEvent.setup();
    renderPanel();
    await user.click(screen.getByRole('button', { name: 'Settings' }));

    const hapticsSwitch = screen.getByRole('switch', { name: 'Vibration feedback' });
    expect(hapticsSwitch).toHaveAttribute('aria-checked', 'true');
    await user.click(hapticsSwitch);

    expect(hapticsSwitch).toHaveAttribute('aria-checked', 'false');
    expect(loadSettings().haptics).toBe(false);
  });

  it('applies the reduce-motion class immediately when toggled', async () => {
    const user = userEvent.setup();
    renderPanel();
    await user.click(screen.getByRole('button', { name: 'Settings' }));

    await user.click(screen.getByRole('switch', { name: 'Reduce motion' }));

    expect(document.documentElement).toHaveClass('reduce-motion');
    expect(loadSettings().reduceMotion).toBe(true);
  });

  it('restores the reduce-motion class on mount for saved settings', () => {
    window.localStorage.setItem(
      'hanzi-master-settings',
      JSON.stringify({ _v: 1, _d: { haptics: true, reduceMotion: true } })
    );
    renderPanel();
    expect(document.documentElement).toHaveClass('reduce-motion');
  });

  it('resets learning progress after confirmation', async () => {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify({ _v: 1, _d: {} }));
    const user = userEvent.setup();
    renderPanel();
    await user.click(screen.getByRole('button', { name: 'Settings' }));
    await user.click(screen.getByRole('button', { name: 'Reset learning progress' }));
    await user.click(screen.getByRole('button', { name: 'Yes, reset' }));

    expect(window.localStorage.getItem(PROGRESS_STORAGE_KEY)).toBeNull();
  });
});
