// src/lib/logger.ts v5.2.44
// P2-6：全应用唯一日志出口。结构化字段 + 敏感字段脱敏，禁止业务代码直接 console.*。

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

type LogValue = string | number | boolean | null | undefined | Error;
export type LogContext = Record<string, LogValue>;

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  scope: string;
  message: string;
  context?: Record<string, LogValue>;
}

const SENSITIVE_KEYS = /^(password|token|secret|authorization|cookie|email|phone|api[_-]?key)$/i;

/** 脱敏：敏感键一律替换为 [redacted]，Error 展开为可序列化字段。 */
function sanitize(context: LogContext): Record<string, LogValue> {
  return Object.fromEntries(
    Object.entries(context).map(([key, value]) => {
      if (SENSITIVE_KEYS.test(key)) return [key, '[redacted]'];
      if (value instanceof Error) {
        return [key, `${value.name}: ${value.message}`];
      }
      return [key, value];
    })
  );
}

function emit(entry: LogEntry): void {
  // 全应用唯一 console 出口，便于统一接 Sentry / 远端采集
  const sink = entry.level === 'error' ? console.error : entry.level === 'warn' ? console.warn : console.log;
  sink(JSON.stringify(entry));
}

export function createLogger(scope: string) {
  const write = (level: LogLevel, message: string, context?: LogContext) =>
    emit({
      timestamp: new Date().toISOString(),
      level,
      scope,
      message,
      context: context ? sanitize(context) : undefined,
    });

  return {
    debug: (message: string, context?: LogContext) => {
      if (process.env.NODE_ENV !== 'production') write('debug', message, context);
    },
    info: (message: string, context?: LogContext) => write('info', message, context),
    warn: (message: string, context?: LogContext) => write('warn', message, context),
    error: (message: string, context?: LogContext) => write('error', message, context),
  };
}

export const logger = createLogger('app');
