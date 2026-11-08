// src/components/__tests__/toast.test.tsx v5.2.44

import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { LocaleProvider } from '../locale-provider';
import { ToastProvider, useToast } from '../toast';
import { translations } from '@/lib/i18n';

type ToastApi = ReturnType<typeof useToast>;
let emit: ToastApi | null = null;

function Harness() {
  emit = useToast();
  return null;
}

function renderToast() {
  return render(
    <LocaleProvider>
      <ToastProvider>
        <Harness />
      </ToastProvider>
    </LocaleProvider>
  );
}

const closeLabel = translations.en.common.closeNotification;

describe('ToastProvider', () => {
  it('renders nothing until a notification is emitted', () => {
    renderToast();
    expect(document.getElementById('toast-container')).toBeNull();
  });

  it('shows the message with an accessible localized close control', async () => {
    renderToast();
    act(() => emit!.success('保存成功'));

    expect(await screen.findByText('保存成功')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: closeLabel })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: closeLabel }));
  });

  it('supports all four notification types', async () => {
    renderToast();
    act(() => {
      emit!.error('错误');
      emit!.warning('注意');
      emit!.info('提示');
    });

    expect(await screen.findByText('错误')).toBeInTheDocument();
    expect(screen.getByText('注意')).toBeInTheDocument();
    expect(screen.getByText('提示')).toBeInTheDocument();
  });

  it('keeps separate provider instances isolated', async () => {
    const { unmount } = renderToast();
    act(() => emit!.info('first'));
    expect(await screen.findByText('first')).toBeInTheDocument();
    unmount();

    renderToast();
    expect(screen.queryByText('first')).toBeNull();
  });
});
