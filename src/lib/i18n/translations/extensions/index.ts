// src/lib/i18n/translations/extensions/index.ts v5.2.35

import { a11yByLocale } from './a11y';
import { legalByLocale } from './legal';
import { meaningsByLocale } from './meanings';

/** 基准语言包结构；扩展模块单独成文件，避免任一语言文件超过 200 行。 */
type BaseTranslations = typeof import('../en').en;

/**
 * 把合规、无障碍与汉字释义扩展合并进基准语言包。
 * 所有语言经过同一函数，叶子键集合天然一致，由 i18n.test.ts 校验。
 */
export function extendTranslations(base: BaseTranslations, locale: string) {
  const a11y = a11yByLocale[locale] ?? a11yByLocale.en;
  const legal = legalByLocale[locale] ?? legalByLocale.en;
  const meanings = meaningsByLocale[locale] ?? meaningsByLocale.en;

  return {
    ...base,
    common: { ...base.common, ...a11y.common },
    learn: { ...base.learn, strokeDemoLabel: a11y.learn.strokeDemoLabel },
    practice: {
      ...base.practice,
      canvasLabel: a11y.practice.canvasLabel,
      meanings,
    },
    legal,
  };
}
