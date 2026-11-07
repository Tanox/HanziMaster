// src/components/__tests__/toast.test.tsx v5.2.35

import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { toast, ToastContainer } from '../toast';

describe('ToastContainer', () => {
  it('renders nothing until a notification is emitted', () => {
    render(<ToastContainer />);
    expect(document.getElementById('toast-container')).toBeNull();
  });

  it('shows the message with an accessible close control', async () => {
    render(<ToastContainer />);
    act(() => {
      toast.success('保存成功');
    });

    expect(await screen.findByText('保存成功')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close notification' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Close notification' }));
  });

  it('supports all four notification types', async () => {
    render(<ToastContainer />);
    act(() => {
      toast.error('错误');
      toast.warning('注意');
      toast.info('提示');
    });

    expect(await screen.findByText('错误')).toBeInTheDocument();
    expect(screen.getByText('注意')).toBeInTheDocument();
    expect(screen.getByText('提示')).toBeInTheDocument();
  });
});
