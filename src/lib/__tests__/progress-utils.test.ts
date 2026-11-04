// src/lib/__tests__/progress-utils.test.ts v5.2.27
import { describe, it, expect } from 'vitest';
import {
  computeAccuracy,
  computeStreak,
  computeWeeklyActivity,
  getDefaultProgress,
  shiftLocalDateStr,
  toLocalDateStr,
  validateProgress,
} from '@/lib/progress-utils';

// 用本地正午构造固定日期，避免时区/夏令时导致测试跨日漂移
const localNoon = (y: number, m: number, d: number) => new Date(y, m - 1, d, 12, 0, 0);

describe('toLocalDateStr / shiftLocalDateStr', () => {
  it('按本地日历字段生成 YYYY-MM-DD', () => {
    expect(toLocalDateStr(localNoon(2026, 1, 5))).toBe('2026-01-05');
    expect(toLocalDateStr(localNoon(2026, 12, 31))).toBe('2026-12-31');
  });

  it('跨月、跨年与闰日的日历运算正确', () => {
    expect(shiftLocalDateStr(localNoon(2026, 3, 1), -1)).toBe('2026-02-28');
    expect(shiftLocalDateStr(localNoon(2024, 3, 1), -1)).toBe('2024-02-29');
    expect(shiftLocalDateStr(localNoon(2026, 1, 1), -1)).toBe('2025-12-31');
    expect(shiftLocalDateStr(localNoon(2026, 12, 31), 1)).toBe('2027-01-01');
  });
});

describe('validateProgress', () => {
  it('非对象输入回退为空进度', () => {
    expect(validateProgress(null)).toEqual(getDefaultProgress());
    expect(validateProgress('bad')).toEqual(getDefaultProgress());
    expect(validateProgress(42)).toEqual(getDefaultProgress());
  });

  it('过滤 NaN/Infinity、非法记录与非法日期键，并去重', () => {
    const result = validateProgress({
      learnedCharIds: [1, 1, NaN, Infinity, '3', 2],
      quizResults: [
        { charId: 1, correct: true, timestamp: 100 },
        { charId: NaN, correct: false, timestamp: 200 },
        { charId: 2, correct: 'yes', timestamp: 300 },
        { charId: 3, correct: false, timestamp: Infinity },
        null,
      ],
      dailyActivity: {
        '2026-03-08': true,
        '2026-13-45': true,
        'not-a-date': true,
        '2026-02-30': true,
        '2026-03-09': 'yes',
      },
    });
    expect(result.learnedCharIds).toEqual([1, 2]);
    expect(result.quizResults).toEqual([{ charId: 1, correct: true, timestamp: 100 }]);
    expect(result.dailyActivity).toEqual({ '2026-03-08': true });
  });
});

describe('computeStreak', () => {
  it('无活动返回 0', () => {
    expect(computeStreak({}, localNoon(2026, 3, 10))).toBe(0);
  });

  it('以今天结束的连续天数正确累计', () => {
    const activity = {
      '2026-03-08': true, '2026-03-09': true, '2026-03-10': true,
    };
    expect(computeStreak(activity, localNoon(2026, 3, 10))).toBe(3);
  });

  it('允许以昨天结束（今天尚未练习）', () => {
    const activity = { '2026-03-08': true, '2026-03-09': true };
    expect(computeStreak(activity, localNoon(2026, 3, 10))).toBe(2);
  });

  it('跨夏令时切换日仍按日历天连续（修复 UTC 毫秒差导致的断连）', () => {
    // 2026-03-08 为美国夏令时开始日（本地日仅 23 小时）
    const activity = {
      '2026-03-07': true, '2026-03-08': true,
      '2026-03-09': true, '2026-03-10': true,
    };
    expect(computeStreak(activity, localNoon(2026, 3, 10))).toBe(4);
  });

  it('存在断档时只累计最近连续段', () => {
    const activity = {
      '2026-03-01': true, '2026-03-02': true,
      '2026-03-09': true, '2026-03-10': true,
    };
    expect(computeStreak(activity, localNoon(2026, 3, 10))).toBe(2);
  });

  it('最后活动早于昨天或位于未来时返回 0', () => {
    expect(computeStreak({ '2026-03-01': true }, localNoon(2026, 3, 10))).toBe(0);
    expect(computeStreak({ '2026-04-01': true }, localNoon(2026, 3, 10))).toBe(0);
  });
});

describe('computeAccuracy', () => {
  it('无结果返回 0，按比例四舍五入', () => {
    expect(computeAccuracy([])).toBe(0);
    expect(computeAccuracy([
      { charId: 1, correct: true, timestamp: 1 },
      { charId: 2, correct: false, timestamp: 2 },
      { charId: 3, correct: true, timestamp: 3 },
    ])).toBe(67);
  });
});

describe('computeWeeklyActivity', () => {
  it('返回 7 位，最右为今天，按日历回推', () => {
    const activity = { '2026-03-10': true, '2026-03-08': true };
    expect(computeWeeklyActivity(activity, localNoon(2026, 3, 10))).toEqual([
      false, false, false, false, true, false, true,
    ]);
  });

  it('忽略缺失日期，不抛异常', () => {
    expect(computeWeeklyActivity({}, localNoon(2026, 3, 10))).toEqual(Array(7).fill(false));
  });
});
