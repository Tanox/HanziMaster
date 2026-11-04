// src/components/state/__tests__/state-views.test.tsx v5.2.31
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import type { ReactElement } from 'react';
import { LocaleProvider } from '@/components/locale-provider';
import { EmptyState, ErrorState, LoadingSpinner } from '../state-views';

const renderWithProvider = (ui: ReactElement) =>
  render(<LocaleProvider defaultLocale="en">{ui}</LocaleProvider>);

describe('EmptyState', () => {
  it('should render default empty copy', () => {
    renderWithProvider(<EmptyState />);
    expect(screen.getByText('Nothing here yet')).toBeInTheDocument();
    expect(screen.getByText('Select a character to start learning.')).toBeInTheDocument();
  });

  it('should render custom title and description', () => {
    renderWithProvider(<EmptyState title="Custom" description="Custom desc" />);
    expect(screen.getByText('Custom')).toBeInTheDocument();
    expect(screen.getByText('Custom desc')).toBeInTheDocument();
  });

  it('should expose status role', () => {
    renderWithProvider(<EmptyState />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

describe('ErrorState', () => {
  it('should render retry button and call onRetry on click', () => {
    const onRetry = vi.fn();
    renderWithProvider(<ErrorState onRetry={onRetry} />);
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('should render custom retry label', () => {
    renderWithProvider(<ErrorState onRetry={() => {}} retryLabel="Back to home" />);
    expect(screen.getByRole('button', { name: 'Back to home' })).toBeInTheDocument();
  });

  it('should not render a retry button without onRetry', () => {
    renderWithProvider(<ErrorState />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

describe('LoadingSpinner', () => {
  it('should expose status role for assistive tech', () => {
    renderWithProvider(<LoadingSpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
