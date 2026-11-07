// src/lib/__tests__/settings.test.ts v5.2.42

import { beforeEach, describe, expect, it } from 'vitest';
import {
  DEFAULT_SETTINGS,
  SETTINGS_STORAGE_KEY,
  loadSettings,
  normalizeSettings,
  saveSettings,
} from '../settings';

describe('settings storage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('falls back to defaults when nothing is stored', () => {
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS);
  });

  it('round-trips saved settings', () => {
    saveSettings({ haptics: false, reduceMotion: true });
    expect(loadSettings()).toEqual({ haptics: false, reduceMotion: true });
  });

  it('normalizes corrupted or partial data', () => {
    expect(normalizeSettings(null)).toEqual(DEFAULT_SETTINGS);
    expect(normalizeSettings({ haptics: 'yes' })).toEqual(DEFAULT_SETTINGS);
    expect(normalizeSettings({ haptics: false })).toEqual({ haptics: false, reduceMotion: false });
  });

  it('ignores version-mismatched payloads', () => {
    window.localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({ _v: 0, _d: { haptics: false, reduceMotion: true } })
    );
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS);
  });
});
