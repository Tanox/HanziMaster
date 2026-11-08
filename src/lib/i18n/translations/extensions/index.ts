// src/lib/i18n/translations/extensions/index.ts v5.2.44

import { a11yByLocale } from './a11y';
import { legalByLocale } from './legal';
import { meaningsByLocale } from './meanings';
import { settingsByLocale } from './settings';
import { pwaByLocale } from './pwa';
import { progressByLocale } from './progress';

/** 基准语言包结构；扩展模块单独成文件，避免任一语言文件超过 200 行。 */
type BaseTranslations = typeof import('../en').en;

/**
 * 把合规、无障碍、汉字释义与设置面板扩展合并进基准语言包。
 * 所有语言经过同一函数，叶子键集合天然一致，由 i18n.test.ts 校验。
 */
export function extendTranslations(base: BaseTranslations, locale: string) {
  const a11y = a11yByLocale[locale] ?? a11yByLocale.en;
  const legal = legalByLocale[locale] ?? legalByLocale.en;
  const meanings = meaningsByLocale[locale] ?? meaningsByLocale.en;
  const settings = settingsByLocale[locale] ?? settingsByLocale.en;
  const pwa = pwaByLocale[locale] ?? pwaByLocale.en;
  const progress = progressByLocale[locale] ?? progressByLocale.en;

  return {
    ...base,
    pwa,
    progress,
    common: { ...base.common, ...a11y.common },
    learn: { ...base.learn, strokeDemoLabel: a11y.learn.strokeDemoLabel },
    practice: {
      ...base.practice,
      canvasLabel: a11y.practice.canvasLabel,
      keyboardLabel: a11y.practice.keyboardLabel,
      keyboardHint: a11y.practice.keyboardHint,
      meanings,
    },
    settings,
    legal,
  };
}
