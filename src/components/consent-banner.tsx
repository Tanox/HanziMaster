// src/components/consent-banner.tsx v5.2.44
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { CONSENT_CHANGE_EVENT, getConsent, setConsent } from '@/lib/consent';

/** 统计同意横幅：未作出选择前不加载任何统计脚本（见 google-analytics.tsx）。 */
export function ConsentBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 挂载后读取 localStorage，避免 SSR/CSR 首屏不一致
    const sync = () => setVisible(getConsent() === null);
    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  if (!visible) return null;

  return (
    <aside
      id="consent-banner"
      role="region"
      aria-labelledby="consent-banner-title"
      className="fixed bottom-4 start-4 end-4 z-60 mx-auto max-w-2xl rounded-2xl border border-border bg-card/95 p-5 shadow-lg backdrop-blur-xl"
    >
      <h2 id="consent-banner-title" className="text-base font-semibold text-foreground">
        {t('legal.consentTitle')}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {t('legal.consentBody')}{' '}
        <Link href="/privacy" className="text-primary underline underline-offset-4">
          {t('legal.privacyLink')}
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap justify-end gap-3">
        <button
          id="consent-reject"
          type="button"
          onClick={() => setConsent('denied')}
          className="rounded-xl border border-border px-4 py-2 text-sm hover:bg-muted"
        >
          {t('legal.reject')}
        </button>
        <button
          id="consent-accept"
          type="button"
          onClick={() => setConsent('granted')}
          className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary-hover"
        >
          {t('legal.accept')}
        </button>
      </div>
    </aside>
  );
}
