// src/components/toast.tsx v5.2.44
'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/components/locale-provider';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastApi {
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

// 状态由 Provider 持有，取代 v5.2.43 之前的模块级单例（P2-11）
const ToastContext = createContext<ToastApi | null>(null);

const typeStyles: Record<ToastType, string> = {
  success: 'bg-success-50 dark:bg-success-500/10 border-success-100 dark:border-success-500/30 text-success-600 dark:text-success-500',
  error: 'bg-vermilion-50 dark:bg-vermilion-900/30 border-vermilion-200 dark:border-vermilion-800 text-vermilion-700 dark:text-vermilion-300',
  warning: 'bg-warning-50 dark:bg-warning-500/10 border-warning-100 dark:border-warning-500/30 text-warning-600 dark:text-warning-500',
  info: 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300',
};

const iconMap: Record<ToastType, ReactNode> = {
  success: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

function ToastItem({ id, message, type, duration = 5000, onRemove }: Toast & { onRemove: (id: string) => void }) {
  const { t } = useTranslation();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onRemove(id), 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  return (
    <div
      role="alert"
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg min-w-[280px] max-w-[400px]',
        'transition-[opacity,transform] duration-300',
        isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0 animate-slide-in-right',
        typeStyles[type]
      )}
    >
      {iconMap[type]}
      <span className="text-sm font-medium flex-1">{message}</span>
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => onRemove(id), 300);
        }}
        className="p-1 rounded-lg hover:bg-ink-900/5 dark:hover:bg-ink-100/10 transition-colors"
        aria-label={t('common.closeNotification')}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const [items, setItems] = useState<Toast[]>([]);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const push = useCallback((message: string, type: ToastType, duration?: number) => {
    setItems((prev) => [...prev, { id: `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, message, type, duration }]);
  }, []);

  const api = useMemo<ToastApi>(() => ({
    success: (message, duration) => push(message, 'success', duration),
    error: (message, duration) => push(message, 'error', duration),
    warning: (message, duration) => push(message, 'warning', duration),
    info: (message, duration) => push(message, 'info', duration),
  }), [push]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      {items.length > 0 && (
        <div id="toast-container" className="fixed top-20 end-4 z-[100] flex flex-col gap-2" role="region" aria-label={t('common.notifications')}>
          {items.map((item) => <ToastItem key={item.id} {...item} onRemove={remove} />)}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
}
