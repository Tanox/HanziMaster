// src/components/learn/__tests__/stroke-order-demo.test.tsx v5.2.47
// 笔顺演示行为回归：静止态、逐笔节奏、播完重播、编号序列与无障碍当前笔标记。
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LocaleProvider } from '@/components/locale-provider';
import { StrokeOrderDemo } from '../stroke-order-demo';

const data = { strokes: ['M0 0', 'M1 1', 'M2 2'], medians: [] };

vi.mock('@/lib/stroke-order-loader', () => ({
  loadStrokeOrder: vi.fn(() => Promise.resolve({ strokes: ['M0 0', 'M1 1', 'M2 2'], medians: [] })),
}));

const renderDemo = () =>
  render(
    <LocaleProvider defaultLocale="en">
      <StrokeOrderDemo character="大" strokeCount={3} />
    </LocaleProvider>
  );

const strokePaths = () => Array.from(document.querySelectorAll('#stroke-order-demo g path'));
const redCount = () =>
  strokePaths().filter((p) => p.getAttribute('fill') === 'var(--color-primary)').length;
const steps = () => Array.from(document.querySelectorAll('#stroke-order-demo ol li'));

const tick = async () => {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(550);
  });
};

beforeEach(() => {
  vi.useFakeTimers();
  window.history.replaceState(null, '', '/');
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe('StrokeOrderDemo', () => {
  it('静止时全部为淡字形，编号序列标出当前笔', async () => {
    renderDemo();
    await act(async () => {
      await Promise.resolve();
    });

    expect(strokePaths()).toHaveLength(data.strokes.length);
    expect(redCount()).toBe(0);
    expect(steps()).toHaveLength(3);
    expect(steps()[0].getAttribute('aria-current')).toBe('step');
    expect(screen.getByRole('button', { name: 'Show Stroke Order' })).toBeTruthy();
  });

  it('每 550ms 精确显示一笔，播完自动停止并可从头重播', async () => {
    renderDemo();
    await act(async () => {
      await Promise.resolve();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Show Stroke Order' }));
    await tick();
    expect(redCount()).toBe(1);
    await tick();
    expect(redCount()).toBe(2);
    await tick();
    expect(redCount()).toBe(3);

    // 播放结束后按钮回到「显示笔顺」，且不再有当前笔
    expect(screen.getByRole('button', { name: 'Show Stroke Order' })).toBeTruthy();
    expect(steps().every((li) => li.getAttribute('aria-current') === null)).toBe(true);

    // 再点一次应重置进度从头播放
    fireEvent.click(screen.getByRole('button', { name: 'Show Stroke Order' }));
    expect(redCount()).toBe(0);
    await tick();
    expect(redCount()).toBe(1);
  });

  it('清除按钮重置进度', async () => {
    renderDemo();
    await act(async () => {
      await Promise.resolve();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Show Stroke Order' }));
    await tick();
    await tick();
    expect(redCount()).toBe(2);

    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(redCount()).toBe(0);
    expect(steps()[0].getAttribute('aria-current')).toBe('step');
  });
});
