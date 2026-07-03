// src/lib/storage.ts v3.0.0
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
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    
    const parsed = JSON.parse(item) as unknown;

    // 运行时校验：确认结构包含 _v 和 _d 属性
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      !('_v' in parsed) ||
      !('_d' in parsed)
    ) {
      return defaultValue;
    }

    const data = parsed as StorageData<T>;

    // Version check - if version mismatch, return default
    if (data._v !== STORAGE_VERSION) {
      return defaultValue;
    }

    return data._d;
  } catch {
    return defaultValue;
  }
}

/**
 * Safely write to localStorage with version info
 */
export function safeSetItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    const data: StorageData<T> = {
      _v: STORAGE_VERSION,
      _d: value,
    };
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Failed to save to localStorage:', e);
    }
  }
}

/**
 * Remove item from localStorage
 */
export function safeRemoveItem(key: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.removeItem(key);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Failed to remove from localStorage:', e);
    }
  }
}
