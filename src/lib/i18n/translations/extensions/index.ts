// src/lib/i18n/translations/extensions/index.ts v5.2.52

import { a11yByLocale } from './a11y';
import { cloudByLocale } from './cloud';
import { geoByLocale } from './geo';
import { legalByLocale } from './legal';
import { meaningsByLocale } from './meanings';
import { seoByLocale } from './seo';
import { settingsByLocale } from './settings';
import { privacyByLocale } from './privacy';
import { pwaByLocale } from './pwa';
import { progressByLocale } from './progress';

/** 基准语言包结构；扩展模块单独成文件，避免任一语言文件超过 200 行。 */
type BaseTranslations = typeof import('../en').en;

/**
 * 把合规、无障碍、汉字释义、设置、SEO 与 GEO 扩展合并进基准语言包。
 * 所有语言经过同一函数，叶子键集合天然一致，由 i18n.test.ts 校验。
 */
export function extendTranslations(base: BaseTranslations, locale: string) {
  const a11y = a11yByLocale[locale] ?? a11yByLocale.en;
  const cloud = cloudByLocale[locale] ?? cloudByLocale.en;
  const legal = legalByLocale[locale] ?? legalByLocale.en;
  const meanings = meaningsByLocale[locale] ?? meaningsByLocale.en;
  const settings = settingsByLocale[locale] ?? settingsByLocale.en;
  const privacy = privacyByLocale[locale] ?? privacyByLocale.en;
  const pwa = pwaByLocale[locale] ?? pwaByLocale.en;
  const progress = progressByLocale[locale] ?? progressByLocale.en;
  const seo = seoByLocale[locale] ?? seoByLocale.en;
  const geo = geoByLocale[locale] ?? geoByLocale.en;

  return {
    ...base,
    seo,
    geo,
    pwa,
    progress,
    cloud,
    common: { ...base.common, ...a11y.common },
    learn: { ...base.learn, strokeDemoLabel: a11y.learn.strokeDemoLabel },
    practice: {
      ...base.practice,
      canvasLabel: a11y.practice.canvasLabel,
      keyboardLabel: a11y.practice.keyboardLabel,
      keyboardHint: a11y.practice.keyboardHint,
      meanings,
    },
    settings: { ...settings, ...privacy },
    legal,
  };
}
