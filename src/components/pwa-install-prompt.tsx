// src/components/pwa-install-prompt.tsx v5.2.44
// P2-14：注册离线 SW + 「添加到主屏幕」引导（仅在浏览器发出可安装事件时出现）。
'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'hanzi-master-pwa-dismissed';

export function PwaInstallPrompt() {
  const { t } = useTranslation();
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service Worker 不可用时静默降级，不影响应用
      });
    }
    setDismissed(localStorage.getItem(DISMISS_KEY) === '1');

    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1');
    setDismissed(true);
    setInstallEvent(null);
  };

  if (dismissed || !installEvent) return null;

  return (
    <aside
      id="pwa-install-prompt"
      aria-label={t('pwa.installTitle')}
      className="fixed bottom-4 start-4 end-4 z-40 mx-auto flex max-w-md items-center justify-between gap-3 rounded-xl border border-ink-200 bg-card px-4 py-3 shadow-ink-lg dark:border-ink-700"
    >
      <span className="text-sm font-medium text-ink-800 dark:text-ink-100">{t('pwa.installTitle')}</span>
      <div className="flex shrink-0 gap-2">
        <Button
          id="pwa-install-action"
          size="sm"
          className="rounded-lg bg-vermilion-500 text-primary-foreground hover:bg-vermilion-600"
          onClick={async () => {
            await installEvent.prompt();
            await installEvent.userChoice;
            setInstallEvent(null);
          }}
        >
          {t('pwa.installAction')}
        </Button>
        <Button id="pwa-install-dismiss" size="sm" variant="ghost" aria-label={t('common.close')} onClick={dismiss}>
          ✕
        </Button>
      </div>
    </aside>
  );
}
