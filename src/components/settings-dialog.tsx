// src/components/settings-dialog.tsx v5.2.52
'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTheme, type Theme } from '@/components/theme-provider';
import { useLocale } from '@/components/locale-provider';
import { localeNames } from '@/components/locale-toggle';
import { useToast } from '@/components/toast';
import { loadSettings, saveSettings, DEFAULT_SETTINGS, type AppSettings } from '@/lib/settings';
import { SwitchRow, sectionTitle } from '@/components/settings-dialog-parts';
import { DataControls } from '@/components/data-controls';
import { PrivacyControls } from '@/components/privacy-controls';
import type { Locale } from '@/lib/i18n';

const THEMES: readonly Theme[] = ['light', 'dark', 'system'];

const applyReduceMotion = (on: boolean) => {
  document.documentElement.classList.toggle('reduce-motion', on);
};

export function SettingsButton() {
  const { t, locale, setLocale, availableLocales } = useLocale();
  const { theme, setTheme } = useTheme();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    applyReduceMotion(loadSettings().reduceMotion);
  }, []);

  useEffect(() => {
    if (open) setSettings(loadSettings());
  }, [open]);

  const update = (patch: Partial<AppSettings>) => {
    const next = { ...settings, ...patch };
    // 存储不可用时（隐私模式 / 配额耗尽）不更新 UI，避免显示「已保存」的假象
    if (!saveSettings(next)) {
      toast.error(t('common.errorDesc'));
      return;
    }
    setSettings(next);
    if (patch.reduceMotion !== undefined) applyReduceMotion(next.reduceMotion);
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
                  tabIndex={theme === th ? 0 : -1}
                  onClick={() => setTheme(th)}
                  onKeyDown={(e) => {
                    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
                    e.preventDefault();
                    const delta = e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 1;
                    const next = THEMES[(THEMES.indexOf(theme) + delta + THEMES.length) % THEMES.length];
                    setTheme(next);
                    (e.currentTarget.parentElement?.children[THEMES.indexOf(next)] as HTMLElement | undefined)?.focus();
                  }}
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

          <PrivacyControls />
          <DataControls />
        </DialogContent>
      </Dialog>
    </>
  );
}
