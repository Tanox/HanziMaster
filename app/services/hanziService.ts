// app/services/hanziService.ts v0.9.3
import { HanziData } from '../types';

const CDN_BASE_URL = 'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0';
const LOCAL_BASE_URL = '/hanzi-data';

/**
 * Validates the structure of fetched Hanzi data.
 * v0.9.3: Added strict path validation (starts with M).
 */
const isValidHanziData = (data: any): data is HanziData => {
  return (
    data &&
    Array.isArray(data.strokes) &&
    data.strokes.length > 0 &&
    data.strokes.every((s: string) => typeof s === 'string' && s.startsWith('M')) &&
    Array.isArray(data.medians) &&
    data.medians.length === data.strokes.length
  );
};

/**
 * Helper for fetching with retries and exponential backoff.
 */
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3, backoff = 500): Promise<Response> {
    try {
        const response = await fetch(url, options);
        if (response.ok) return response;
        if (retries > 0 && response.status >= 500) {
            await new Promise(resolve => setTimeout(resolve, backoff));
            return fetchWithRetry(url, options, retries - 1, backoff * 2);
        }
        return response;
    } catch (e) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, backoff));
            return fetchWithRetry(url, options, retries - 1, backoff * 2);
        }
        throw e;
    }
}

/**
 * Fetches stroke data with multi-tier fallback and integrity check.
 */
export const fetchHanziData = async (char: string): Promise<HanziData | null> => {
  try {
    // Tier 1: Try Local Data
    try {
      const localResponse = await fetch(`${LOCAL_BASE_URL}/${char}.json`, {
          cache: 'default',
          headers: { 'Accept': 'application/json' }
      });
      if (localResponse.ok) {
        const data = await localResponse.json();
        if (isValidHanziData(data)) return data;
        console.warn(`Local data for ${char} is invalid, falling back to CDN.`);
      }
    } catch (localError) {
        console.debug(`Local fetch for ${char} failed (likely not synced).`);
    }

    // Tier 2: Try CDN Data with Retry
    const response = await fetchWithRetry(`${CDN_BASE_URL}/${char}.json`, {
        mode: 'cors',
        credentials: 'omit'
    });

    if (!response.ok) {
      if (response.status === 404) {
          console.warn(`Character "${char}" not found in Hanzi database.`);
          return null;
      }
      throw new Error(`CDN returned status ${response.status}`);
    }

    const cdnData = await response.json();
    if (isValidHanziData(cdnData)) return cdnData;
    
    throw new Error(`Fetched data for ${char} failed validation.`);
  } catch (error) {
    console.error(`Fatal error loading data for "${char}":`, error);
    return null;
  }
};