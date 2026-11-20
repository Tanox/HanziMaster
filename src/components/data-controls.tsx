// src/components/data-controls.tsx v5.2.52
'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { useToast } from '@/components/toast';
import { Button } from '@/components/ui/button';
import { ProgressTransferControls } from '@/components/progress-transfer-controls';
import { CloudSyncControls } from '@/components/cloud-sync-controls';
import { sectionTitle } from '@/components/settings-dialog-parts';
import { safeRemoveItem } from '@/lib/storage';
import { PROGRESS_IMPORTED_EVENT, PROGRESS_STORAGE_KEY } from '@/hooks/use-progress';

/** 设置面板「数据」分区：进度导入导出、云同步与带二次确认的重置。 */
export function DataControls() {
  const { t } = useTranslation();
  const toast = useToast();
  const [confirmReset, setConfirmReset] = useState(false);
  const restoreFocus = useRef(false);

  useEffect(() => {
    if (confirmReset || !restoreFocus.current) return;
    restoreFocus.current = false;
    document.getElementById('settings-reset')?.focus();
  }, [confirmReset]);

  const handleReset = () => {
    safeRemoveItem(PROGRESS_STORAGE_KEY);
    // storage 事件只跨文档触发；本标签页已挂载的 useProgress 需显式广播，否则旧 state 会写回
    window.dispatchEvent(new Event(PROGRESS_IMPORTED_EVENT));
    restoreFocus.current = true;
    setConfirmReset(false);
    toast.success(t('settings.resetDone'));
  };

  return (
    <section aria-label={t('settings.data')} className="space-y-3">
      <h3 className={sectionTitle}>{t('settings.data')}</h3>
      <ProgressTransferControls />
      <CloudSyncControls />
      {confirmReset ? (
        <div id="settings-reset-confirm" className="space-y-2 rounded-xl border border-vermilion-200 bg-vermilion-50 p-3 dark:border-vermilion-800 dark:bg-vermilion-900/30">
          <p className="text-sm font-semibold text-vermilion-700 dark:text-vermilion-300">{t('settings.resetProgress')}</p>
          <p className="text-xs text-vermilion-600 dark:text-vermilion-400">{t('settings.resetDesc')}</p>
          <div className="flex gap-2">
            <Button type="button" id="settings-reset-yes" variant="destructive" size="sm" onClick={handleReset}>
              {t('settings.resetYes')}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                restoreFocus.current = true;
                setConfirmReset(false);
              }}
            >
              {t('common.cancel')}
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          id="settings-reset"
          variant="outline"
          className="w-full border-vermilion-300 text-vermilion-600 hover:bg-vermilion-50 dark:border-vermilion-700 dark:text-vermilion-400 dark:hover:bg-vermilion-900/30"
          onClick={() => setConfirmReset(true)}
        >
          {t('settings.resetProgress')}
        </Button>
      )}
    </section>
  );
}
