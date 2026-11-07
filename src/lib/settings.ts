// src/lib/settings.ts v5.2.42
// 应用偏好设置（设置面板唯一来源）：经 lib/storage.ts 版本化读写，不直接访问 localStorage。
import { safeGetItem, safeSetItem } from './storage';

export const SETTINGS_STORAGE_KEY = 'hanzi-master-settings';

export interface AppSettings {
  /** 震动反馈：练习/测验答题时触发 Vibration API，默认开 */
  haptics: boolean;
  /** 减少动效：停用滚动浮现等界面动画，优先级高于系统 prefers-reduced-motion，默认关 */
  reduceMotion: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
  haptics: true,
  reduceMotion: false,
};

/** 逐字段校验并合并默认值，抵御损坏/缺字段的存量数据。 */
export const normalizeSettings = (value: unknown): AppSettings => {
  const source = (typeof value === 'object' && value !== null ? value : {}) as Record<string, unknown>;
  return {
    haptics: typeof source.haptics === 'boolean' ? source.haptics : DEFAULT_SETTINGS.haptics,
    reduceMotion:
      typeof source.reduceMotion === 'boolean' ? source.reduceMotion : DEFAULT_SETTINGS.reduceMotion,
  };
};

export const loadSettings = (): AppSettings =>
  normalizeSettings(safeGetItem<unknown>(SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS));

export const saveSettings = (settings: AppSettings): void => {
  safeSetItem(SETTINGS_STORAGE_KEY, settings);
};
