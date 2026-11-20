// src/components/privacy-controls.tsx v5.2.52
'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { useToast } from '@/components/toast';
import { Button } from '@/components/ui/button';
import { sectionTitle } from '@/components/settings-dialog-parts';
import { clearConsent, getConsent, setConsent, updateAnalyticsConsent } from '@/lib/consent';

/** 设置面板「隐私与数据」分区：允许随时撤回/重新开启统计同意。 */
export function PrivacyControls() {
  const { t } = useTranslation();
  const toast = useToast();
  const [consent, setView] = useState<'granted' | 'denied' | null>(null);

  useEffect(() => {
    setView(getConsent());
  }, []);

  const change = (granted: boolean) => {
    const ok = granted ? setConsent('granted') : clearConsent();
    if (!ok) {
      toast.error(t('common.errorDesc'));
      return;
    }
    updateAnalyticsConsent(granted ? 'granted' : 'denied');
    setView(getConsent());
    toast.success(t('settings.consentUpdated'));
  };

  return (
    <section aria-label={t('settings.privacyTitle')} className="space-y-3">
      <h3 className={sectionTitle}>{t('settings.privacyTitle')}</h3>
      <p className="text-xs text-ink-500 dark:text-ink-400">{t('settings.privacyDesc')}</p>
      <Button type="button" id="settings-consent-toggle" variant="outline" className="w-full" onClick={() => change(consent !== 'granted')}>
        {consent === 'granted' ? t('settings.withdrawConsent') : t('legal.accept')}
      </Button>
    </section>
  );
}
