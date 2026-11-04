// src/lib/progress-utils.ts v5.2.27
// 进度计算纯函数：与 React / localStorage 解耦，便于单元测试与复用

export interface QuizResult {
  charId: number;
  correct: boolean;
  timestamp: number;
}

export interface ProgressData {
  learnedCharIds: number[];
  quizResults: QuizResult[];
  dailyActivity: Record<string, boolean>;
}

const DATE_KEY = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 86_400_000;

export const getDefaultProgress = (): ProgressData => ({
  learnedCharIds: [],
  quizResults: [],
  dailyActivity: {},
});

// 用本地日历字段生成 YYYY-MM-DD，避免 toISOString() 的 UTC 偏移导致跨零点判定错误
export const toLocalDateStr = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// 通过 Date 的日历运算偏移天数（setDate 按本地日历，不受 DST 23/25 小时影响）
export const shiftLocalDateStr = (date: Date, days: number): string => {
  const shifted = new Date(date.getTime());
  shifted.setDate(shifted.getDate() + days);
  return toLocalDateStr(shifted);
};

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const isValidDateKey = (key: string): boolean => {
  if (!DATE_KEY.test(key)) return false;
  const [y, m, d] = key.split('-').map(Number);
  const normalized = new Date(Date.UTC(y, m - 1, d));
  return normalized.getUTCFullYear() === y &&
    normalized.getUTCMonth() === m - 1 &&
    normalized.getUTCDate() === d;
};

// 把日期键转成 UTC 天序号：整数运算，彻底规避夏令时导致的 23/25 小时日差
const toUtcDay = (key: string): number => {
  const [y, m, d] = key.split('-').map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / DAY_MS);
};

// 对 localStorage 读取的数据做运行时 schema 校验，过滤被篡改或旧版本遗留的非法字段
export const validateProgress = (data: unknown): ProgressData => {
  const result = getDefaultProgress();
  if (!data || typeof data !== 'object') return result;
  const d = data as Partial<ProgressData>;

  if (Array.isArray(d.learnedCharIds)) {
    result.learnedCharIds = [...new Set(d.learnedCharIds.filter(isFiniteNumber))];
  }
  if (Array.isArray(d.quizResults)) {
    result.quizResults = d.quizResults
      .filter(
        (r): r is QuizResult =>
          !!r &&
          typeof r === 'object' &&
          isFiniteNumber((r as QuizResult).charId) &&
          typeof (r as QuizResult).correct === 'boolean' &&
          isFiniteNumber((r as QuizResult).timestamp)
      )
      .map((r) => ({
        charId: r.charId,
        correct: r.correct,
        timestamp: r.timestamp,
      }));
  }
  if (d.dailyActivity && typeof d.dailyActivity === 'object') {
    for (const [k, v] of Object.entries(d.dailyActivity)) {
      if (isValidDateKey(k) && typeof v === 'boolean') {
        result.dailyActivity[k] = v;
      }
    }
  }
  return result;
};

export const computeAccuracy = (quizResults: QuizResult[]): number => {
  if (quizResults.length === 0) return 0;
  const correct = quizResults.filter((r) => r.correct).length;
  return Math.round((correct / quizResults.length) * 100);
};

export const computeStreak = (
  activity: Record<string, boolean>,
  now: Date = new Date()
): number => {
  const days = [...new Set(
    Object.keys(activity).filter((k) => isValidDateKey(k) && activity[k]).map(toUtcDay)
  )].sort((a, b) => b - a);

  if (days.length === 0) return 0;

  const today = toUtcDay(toLocalDateStr(now));
  // 连胜必须以今天或昨天结束；未来日期或过旧日期都不构成连胜
  if (days[0] > today || days[0] < today - 1) return 0;

  let streak = 1;
  for (let i = 0; i < days.length - 1; i++) {
    if (days[i] - days[i + 1] !== 1) break;
    streak++;
  }
  return streak;
};

export const computeWeeklyActivity = (
  activity: Record<string, boolean>,
  now: Date = new Date()
): boolean[] => {
  const result: boolean[] = Array(7).fill(false);
  for (let i = 0; i < 7; i++) {
    result[6 - i] = activity[shiftLocalDateStr(now, -i)] === true;
  }
  return result;
};
