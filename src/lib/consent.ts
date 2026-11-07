// src/lib/consent.ts v5.2.35

import { safeGetItem, safeSetItem } from './storage';

/** 统计脚本同意状态：未选择 / 已同意 / 已拒绝。 */
export type ConsentChoice = 'granted' | 'denied';

export const CONSENT_STORAGE_KEY = 'hanzi-master-analytics-consent';
export const CONSENT_CHANGE_EVENT = 'hanzimaster:consent-change';

export function getConsent(): ConsentChoice | null {
  const value = safeGetItem<string | null>(CONSENT_STORAGE_KEY, null);
  return value === 'granted' || value === 'denied' ? value : null;
}

/** 保存选择并广播，供同页面的统计组件即时响应（storage 事件仅跨标签页触发）。 */
export function setConsent(choice: ConsentChoice): void {
  safeSetItem<string>(CONSENT_STORAGE_KEY, choice);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_CHANGE_EVENT, { detail: choice }));
  }
}

/** 撤销同意：写入 null 后 getConsent 视为「未选择」，横幅重新出现。 */
export function clearConsent(): void {
  safeSetItem<string | null>(CONSENT_STORAGE_KEY, null);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_CHANGE_EVENT));
  }
}
