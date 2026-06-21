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
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    
    const parsed = JSON.parse(item) as StorageData<T>;
    
    // Version check - if version mismatch, return default
    if (parsed._v !== STORAGE_VERSION) {
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
    // Silently fail for quota exceeded or other storage errors
    console.warn('Failed to save to localStorage:', e);
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
    console.warn('Failed to remove from localStorage:', e);
  }
}
