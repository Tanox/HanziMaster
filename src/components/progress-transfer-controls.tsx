// src/components/progress-transfer-controls.tsx v5.2.44
// P2-17：设置面板中的进度导出 / 导入入口。
'use client';

import { useRef } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { useToast } from '@/components/toast';
import { Button } from '@/components/ui/button';
import { safeGetItem, safeSetItem } from '@/lib/storage';
import { getDefaultProgress, type ProgressData } from '@/lib/progress-utils';
import { createProgressBackup, parseProgressBackup } from '@/lib/progress-transfer';
import { PROGRESS_STORAGE_KEY, PROGRESS_IMPORTED_EVENT } from '@/hooks/use-progress';

export function ProgressTransferControls() {
  const { t } = useTranslation();
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const progress = safeGetItem<ProgressData>(PROGRESS_STORAGE_KEY, getDefaultProgress());
    const url = URL.createObjectURL(new Blob([createProgressBackup(progress)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `hanzi-master-progress-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (file?: File) => {
    if (!file) return;
    try {
      const progress = parseProgressBackup(await file.text());
      // 校验通过后才写入，非法文件不会破坏现有进度
      safeSetItem(PROGRESS_STORAGE_KEY, progress);
      window.dispatchEvent(new Event(PROGRESS_IMPORTED_EVENT));
      toast.success(t('progress.importDone'));
    } catch {
      toast.error(t('progress.importInvalid'));
    } finally {
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div id="progress-transfer-controls" className="flex gap-2">
      <Button type="button" id="progress-export" variant="outline" size="sm" className="flex-1" onClick={handleExport}>
        {t('progress.exportLabel')}
      </Button>
      <Button type="button" id="progress-import" variant="outline" size="sm" className="flex-1" onClick={() => inputRef.current?.click()}>
        {t('progress.importLabel')}
      </Button>
      <input
        ref={inputRef}
        id="progress-import-file"
        type="file"
        accept="application/json,.json"
        className="sr-only"
        aria-label={t('progress.importLabel')}
        onChange={(event) => void handleImport(event.target.files?.[0])}
      />
    </div>
  );
}
