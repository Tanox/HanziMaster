// src/components/pwa-install-prompt.tsx v5.2.44
// P2-14：注册离线 SW + 「添加到主屏幕」引导（仅在浏览器发出可安装事件时出现）。
'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { Button } from '@/components/ui/button';
import { safeGetItem, safeSetItem } from '@/lib/storage';
import { BUILD_ID, APP_VERSION } from '@/lib/version';

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
      // 版本随构建变化，触发 SW 重新安装并淘汰旧缓存
      navigator.serviceWorker.register(`/sw.js?v=${APP_VERSION}-${BUILD_ID}`).catch(() => {
        // Service Worker 不可用时静默降级，不影响应用
      });
    }
    let legacyDismissed = false;
    try {
      legacyDismissed = window.localStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      // 存储不可用时忽略旧值
    }
    setDismissed(safeGetItem<boolean>(DISMISS_KEY, false) === true || legacyDismissed);

    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };
    const handleInstalled = () => setInstallEvent(null);
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const dismiss = () => {
    safeSetItem(DISMISS_KEY, true);
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
            try {
              await installEvent.prompt();
              await installEvent.userChoice;
            } finally {
              setInstallEvent(null);
            }
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
