// app/utils/cacheUtils.ts v1.3.8

export function getCacheItem<T>(cacheKey: string, itemKey: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const cache = window.localStorage.getItem(cacheKey);
    if (!cache) return null;
    const parsedCache = JSON.parse(cache);
    return parsedCache[itemKey] || null;
  } catch (error) {
    console.warn(`Error reading cache key "${cacheKey}":`, error);
    return null;
  }
}

export function setCacheItem<T>(cacheKey: string, itemKey: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    const cache = window.localStorage.getItem(cacheKey);
    const parsedCache = cache ? JSON.parse(cache) : {};
    parsedCache[itemKey] = value;
    window.localStorage.setItem(cacheKey, JSON.stringify(parsedCache));
  } catch (error) {
    console.warn(`Error writing cache key "${cacheKey}":`, error);
  }
}
