// src/lib/__tests__/version.test.ts v5.2.40

import { describe, expect, it } from 'vitest';
import { APP_VERSION, BUILD_ID, VERSION_LABEL } from '../version';

describe('version labels', () => {
  it('falls back to a dev version when env is not injected', () => {
    expect(APP_VERSION.length).toBeGreaterThan(0);
    expect(BUILD_ID).toBeTypeOf('string');
  });

  it('always starts with v and includes build only when available', () => {
    expect(VERSION_LABEL.startsWith('v')).toBe(true);
    expect(VERSION_LABEL.includes('build')).toBe(BUILD_ID.length > 0);
    expect(VERSION_LABEL).toContain(APP_VERSION);
  });

  it('uses the footer display format v{semver} · build {yymmddhhmm}', () => {
    expect(VERSION_LABEL).toMatch(/^v\d+\.\d+\.\d+(-[\w.]+)?( · build \d{10})?$/);
  });
});
