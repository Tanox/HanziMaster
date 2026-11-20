// src/lib/storage.ts v5.2.50
// src/lib/storage.ts
// Secure localStorage utilities with version control

const STORAGE_VERSION = 1;

interface StorageData<T> {
  _v: number; // version
  _d: T; // data
}

/**
 * Safely read from localStorage with version checking
 */
export function safeGetItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return defaultValue;
    
    const parsed = JSON.parse(item) as StorageData<T>;
    
    // 版本不匹配或 envelope 缺 _d 时回退默认值，保证返回类型与运行时一致
    if (parsed._v !== STORAGE_VERSION || !('_d' in parsed)) {
      return defaultValue;
    }

    return parsed._d;
  } catch {
    return defaultValue;
  }
}

/**
 * Safely write to localStorage with version info
 */
/** 写入结果可判定的版本：配额超限/隐私模式下返回 false，避免调用方误报成功。 */
export function trySetItem<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const data: StorageData<T> = {
      _v: STORAGE_VERSION,
      _d: value,
    };
    window.localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function safeSetItem<T>(key: string, value: T): void {
  trySetItem(key, value);
}

/**
 * Safely remove a key from localStorage
 */
export function safeRemoveItem(key: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch {
    // Silently fail for storage errors
  }
}



