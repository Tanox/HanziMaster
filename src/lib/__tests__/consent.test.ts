// src/lib/__tests__/consent.test.ts v5.2.35

import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  clearConsent,
  CONSENT_CHANGE_EVENT,
  CONSENT_STORAGE_KEY,
  getConsent,
  setConsent,
} from '../consent';

describe('analytics consent', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns null before a choice is made', () => {
    expect(getConsent()).toBeNull();
  });

  it('persists granted and denied choices under the versioned key', () => {
    setConsent('granted');
    expect(getConsent()).toBe('granted');
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toContain('granted');

    setConsent('denied');
    expect(getConsent()).toBe('denied');
  });

  it('broadcasts a change event so the analytics component can react', () => {
    const listener = vi.fn();
    window.addEventListener(CONSENT_CHANGE_EVENT, listener);
    setConsent('granted');
    expect(listener).toHaveBeenCalledTimes(1);
    window.removeEventListener(CONSENT_CHANGE_EVENT, listener);
  });

  it('clears a previous choice', () => {
    setConsent('granted');
    clearConsent();
    expect(getConsent()).toBeNull();
  });

  it('ignores corrupted storage values', () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, '{not json');
    expect(getConsent()).toBeNull();
  });
});
