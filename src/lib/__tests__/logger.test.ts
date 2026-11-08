// src/lib/__tests__/logger.test.ts v5.2.44

import { afterEach, describe, expect, it, vi } from 'vitest';
import { createLogger } from '../logger';

afterEach(() => vi.restoreAllMocks());

describe('createLogger', () => {
  it('emits a structured entry with scope and level', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    createLogger('test').error('boom', { code: 42 });
    const entry = JSON.parse(spy.mock.calls[0][0] as string);
    expect(entry).toMatchObject({ level: 'error', scope: 'test', message: 'boom', context: { code: 42 } });
    expect(typeof entry.timestamp).toBe('string');
  });

  it('redacts sensitive fields and serializes Error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    createLogger('test').error('failed', { token: 'abc', email: 'a@b.c', error: new Error('oops') });
    const entry = JSON.parse(spy.mock.calls[0][0] as string);
    expect(entry.context).toMatchObject({
      token: '[redacted]',
      email: '[redacted]',
      error: 'Error: oops',
    });
  });

  it('suppresses debug logs in production', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const previous = process.env.NODE_ENV;
    vi.stubEnv('NODE_ENV', 'production');
    createLogger('test').debug('verbose');
    vi.stubEnv('NODE_ENV', previous);
    expect(spy).not.toHaveBeenCalled();
  });
});
