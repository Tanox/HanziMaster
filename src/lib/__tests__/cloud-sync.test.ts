// src/lib/__tests__/cloud-sync.test.ts v5.2.51

import { describe, expect, it } from 'vitest';
import {
  isSyncCode, generateSyncCode, blobPath, MAX_BACKUP_BYTES,
  SYNC_CODE_STORAGE_KEY,
} from '../cloud-sync';

describe('云同步规则', () => {
  it('同步码只接受 32 位小写十六进制', () => {
    expect(isSyncCode('a'.repeat(32))).toBe(true);
    expect(isSyncCode('A'.repeat(32))).toBe(false);
    expect(isSyncCode('../etc/passwd')).toBe(false);
    expect(isSyncCode('a'.repeat(31))).toBe(false);
  });

  it('生成的同步码格式合法且两次不同', () => {
    const a = generateSyncCode();
    const b = generateSyncCode();
    expect(isSyncCode(a)).toBe(true);
    expect(isSyncCode(b)).toBe(true);
    expect(a).not.toBe(b);
  });

  it('Blob 路径固定前缀，杜绝穿越', () => {
    expect(blobPath('a'.repeat(32))).toBe(`hanzi-master/progress/${'a'.repeat(32)}.json`);
    expect(SYNC_CODE_STORAGE_KEY).toBe('hanzi-master-sync-code');
    expect(MAX_BACKUP_BYTES).toBe(5 * 1024 * 1024);
  });
});
