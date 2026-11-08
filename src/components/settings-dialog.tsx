// src/components/settings-dialog.tsx v5.2.44
'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTheme, type Theme } from '@/components/theme-provider';
import { useLocale } from '@/components/locale-provider';
import { localeNames } from '@/components/locale-toggle';
import { useToast } from '@/components/toast';
import { loadSettings, saveSettings, DEFAULT_SETTINGS, type AppSettings } from '@/lib/settings';
import { safeRemoveItem } from '@/lib/storage';
import { PROGRESS_STORAGE_KEY } from '@/hooks/use-progress';
import { ProgressTransferControls } from '@/components/progress-transfer-controls';
import type { Locale } from '@/lib/i18n';

const THEMES: readonly Theme[] = ['light', 'dark', 'system'];

/** 头部按钮全局挂载：挂载时同步「减少动效」类，保证刷新后设置仍然生效。 */
const applyReduceMotion = (on: boolean) => {
  document.documentElement.classList.toggle('reduce-motion', on);
};

function SwitchRow({ label, desc, checked, onChange }: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-ink-500 dark:text-ink-400">{desc}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-vermilion-500' : 'bg-ink-200 dark:bg-ink-700'}`}
      >
        <span className={`absolute top-0.5 start-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'ltr:translate-x-5 rtl:-translate-x-5' : ''}`} />
      </button>
    </div>
  );
}

const sectionTitle = 'text-xs font-semibold uppercase tracking-wide text-ink-400 dark:text-ink-500';

export function SettingsButton() {
  const { t, locale, setLocale, availableLocales } = useLocale();
  const { theme, setTheme } = useTheme();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    applyReduceMotion(loadSettings().reduceMotion);
  }, []);

  useEffect(() => {
    if (open) {
      setSettings(loadSettings());
      setConfirmReset(false);
    }
  }, [open]);

  const update = (patch: Partial<AppSettings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    saveSettings(next);
    if (patch.reduceMotion !== undefined) applyReduceMotion(next.reduceMotion);
  };

  const handleReset = () => {
    safeRemoveItem(PROGRESS_STORAGE_KEY);
    setConfirmReset(false);
    toast.success(t('settings.resetDone'));
  };

  return (
    <>
      <button
        type="button"
        id="settings-open"
        onClick={() => setOpen(true)}
        aria-label={t('settings.title')}
        aria-haspopup="dialog"
        title={t('settings.title')}
        className="p-2 rounded-lg hover:bg-muted transition-colors"
        style={{ minWidth: 44, minHeight: 44 }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent id="settings-dialog" closeLabel={t('common.close')} className="max-h-[85vh] overflow-y-auto sm:max-w-md">
          <DialogHeader>
            <DialogTitle id="settings-title">{t('settings.title')}</DialogTitle>
            <DialogDescription>{t('settings.description')}</DialogDescription>
          </DialogHeader>

          <section aria-label={t('settings.appearance')} className="space-y-3">
            <h3 className={sectionTitle}>{t('settings.appearance')}</h3>
            <div role="radiogroup" aria-label={t('settings.appearance')} className="grid grid-cols-3 gap-2">
              {THEMES.map((th) => (
                <button
                  key={th}
                  type="button"
                  role="radio"
                  aria-checked={theme === th}
                  onClick={() => setTheme(th)}
                  className={`rounded-xl border px-3 py-2 text-sm transition-colors ${theme === th ? 'border-vermilion-500 bg-vermilion-500/10 font-semibold text-vermilion-600 dark:text-vermilion-400' : 'border-ink-200 text-ink-600 hover:bg-muted dark:border-ink-700 dark:text-ink-300'}`}
                >
                  {t(`common.theme.${th}`)}
                </button>
              ))}
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">{t('settings.language')}</span>
              <select
                id="settings-language"
                value={locale}
                onChange={(e) => setLocale(e.target.value as Locale)}
                className="h-10 w-full rounded-xl border border-ink-200 bg-card px-3 text-sm dark:border-ink-700 dark:bg-ink-900"
              >
                {availableLocales.map((l) => (
                  <option key={l} value={l}>{localeNames[l]}</option>
                ))}
              </select>
            </label>
          </section>

          <section aria-label={t('settings.feedback')} className="space-y-3">
            <h3 className={sectionTitle}>{t('settings.feedback')}</h3>
            <SwitchRow
              label={t('settings.haptics')}
              desc={t('settings.hapticsDesc')}
              checked={settings.haptics}
              onChange={(v) => update({ haptics: v })}
            />
          </section>

          <section aria-label={t('settings.motion')} className="space-y-3">
            <h3 className={sectionTitle}>{t('settings.motion')}</h3>
            <SwitchRow
              label={t('settings.reduceMotion')}
              desc={t('settings.reduceMotionDesc')}
              checked={settings.reduceMotion}
              onChange={(v) => update({ reduceMotion: v })}
            />
          </section>

          <section aria-label={t('settings.data')} className="space-y-3">
            <h3 className={sectionTitle}>{t('settings.data')}</h3>
            <ProgressTransferControls />
            {confirmReset ? (
              <div id="settings-reset-confirm" className="space-y-2 rounded-xl border border-vermilion-200 bg-vermilion-50 p-3 dark:border-vermilion-800 dark:bg-vermilion-900/30">
                <p className="text-sm font-semibold text-vermilion-700 dark:text-vermilion-300">{t('settings.resetProgress')}</p>
                <p className="text-xs text-vermilion-600 dark:text-vermilion-400">{t('settings.resetDesc')}</p>
                <div className="flex gap-2">
                  <Button type="button" id="settings-reset-yes" variant="destructive" size="sm" onClick={handleReset}>
                    {t('settings.resetYes')}
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => setConfirmReset(false)}>
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
        </DialogContent>
      </Dialog>
    </>
  );
}
