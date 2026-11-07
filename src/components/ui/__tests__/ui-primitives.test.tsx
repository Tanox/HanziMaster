// src/components/ui/__tests__/ui-primitives.test.tsx v5.2.35

import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import { Badge, badgeVariants } from '../badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';

beforeAll(() => {
  // Radix Portal 在 jsdom 下会探测 ResizeObserver，提供最小实现
  if (!('ResizeObserver' in globalThis)) {
    class MockResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    Object.defineProperty(globalThis, 'ResizeObserver', { value: MockResizeObserver, configurable: true });
  }
});

describe('Badge', () => {
  it('renders the default variant and merges class names', () => {
    render(<Badge id="test-badge" className="extra">基础</Badge>);
    const badge = screen.getByText('基础');
    expect(badge.getAttribute('data-variant')).toBe('default');
    expect(badge.className).toContain('extra');
  });

  it('exposes variant helpers', () => {
    expect(badgeVariants({ variant: 'success' })).toContain('text-green-600');
    expect(badgeVariants({ variant: undefined })).toContain('bg-vermilion-500');
  });
});

describe('Dialog', () => {
  it('renders title, description, header and footer', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>测验说明</DialogTitle>
            <DialogDescription>请选择一个答案</DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton>底部</DialogFooter>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByText('测验说明')).toBeInTheDocument();
    expect(screen.getByText('请选择一个答案')).toBeInTheDocument();
    expect(screen.getByText('底部')).toBeInTheDocument();
  });
});

describe('Tooltip', () => {
  it('renders a trigger inside the provider', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" id="tooltip-trigger">主题</button>
          </TooltipTrigger>
          <TooltipContent>切换主题</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    expect(screen.getByRole('button', { name: '主题' })).toBeInTheDocument();
  });
});
