// src/components/__tests__/mobile-nav.test.tsx v5.2.44
// P1-24：移动抽屉焦点陷阱、背景 inert、关闭后焦点归还

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MobileNav } from '../mobile-nav';
import { translations } from '@/lib/i18n';
import type { TranslationKey } from '@/lib/i18n';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

const t = (key: TranslationKey) => {
  const parts = key.split('.');
  let value: unknown = translations.en;
  for (const part of parts) value = (value as Record<string, unknown>)?.[part];
  return typeof value === 'string' ? value : key;
};

function Harness({ onCloseSpy }: { onCloseSpy: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div id="app-shell">
      <header id="site-header">
        <button onClick={() => setOpen(true)}>打开菜单</button>
      </header>
      <MobileNav
        isOpen={open}
        onClose={() => {
          onCloseSpy();
          setOpen(false);
        }}
        t={t}
      />
    </div>
  );
}

async function renderDrawer() {
  const onClose = vi.fn();
  render(<Harness onCloseSpy={onClose} />);
  const trigger = screen.getByRole('button', { name: '打开菜单' });
  trigger.focus();
  await userEvent.click(trigger);
  return { trigger, onClose };
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('MobileNav 焦点管理', () => {
  it('打开时聚焦关闭按钮并让背景 inert', async () => {
    await renderDrawer();
    expect(screen.getByRole('button', { name: t('common.closeMenu') })).toHaveFocus();
    expect(document.getElementById('site-header')).toHaveAttribute('inert');
  });

  it('Tab 在抽屉内环绕，Shift+Tab 反向环绕', async () => {
    await renderDrawer();
    const closeButton = screen.getByRole('button', { name: t('common.closeMenu') });
    const links = screen.getAllByRole('link');

    // 关闭按钮是首个可聚焦元素，Shift+Tab 应环绕到最后一个链接
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(links[links.length - 1]).toHaveFocus();
    // 从最后一个链接按 Tab 应回到关闭按钮
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(closeButton).toHaveFocus();
  });

  it('Escape 关闭后背景解除 inert 且焦点归还触发元素', async () => {
    const { trigger, onClose } = await renderDrawer();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
    expect(document.getElementById('site-header')).not.toHaveAttribute('inert');
    expect(trigger).toHaveFocus();
  });
});
