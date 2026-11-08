// src/lib/__tests__/progress-transfer.test.ts v5.2.44

import { describe, expect, it } from 'vitest';
import { createProgressBackup, parseProgressBackup } from '../progress-transfer';
import type { ProgressData } from '../progress-utils';

const sample: ProgressData = {
  learnedCharIds: [1, 2, 3],
  quizResults: [{ charId: 1, correct: true, timestamp: 1700000000000 }],
  dailyActivity: { '2026-11-07': true },
};

describe('进度备份', () => {
  it('导出的文件可被完整还原', () => {
    const raw = createProgressBackup(sample, new Date('2026-11-08T00:00:00Z'));
    expect(JSON.parse(raw)).toMatchObject({ app: 'HanziMaster', version: 1 });
    expect(parseProgressBackup(raw)).toEqual(sample);
  });

  it('非法 JSON / 错误来源 / 结构损坏一律拒绝', () => {
    expect(() => parseProgressBackup('{oops')).toThrow();
    expect(() => parseProgressBackup(JSON.stringify({ app: 'Other', version: 1, exportedAt: '2026-01-01', progress: sample }))).toThrow();
    expect(() => parseProgressBackup(JSON.stringify({ app: 'HanziMaster', version: 1, exportedAt: '2026-01-01', progress: { learnedCharIds: null } }))).toThrow();
  });

  it('过滤进度中的非法值并支持 v0 裸数据迁移', () => {
    const legacy = JSON.stringify({
      learnedCharIds: [1, NaN, 'x', 2],
      quizResults: [{ charId: 'bad', correct: true, timestamp: 1 }],
      dailyActivity: { '2026-99-99': true },
    });
    const parsed = parseProgressBackup(legacy);
    expect(parsed.learnedCharIds).toEqual([1, 2]);
    expect(parsed.quizResults).toEqual([]);
  });
});
