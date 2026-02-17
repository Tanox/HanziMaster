// app/services/hanziService.ts v0.8.9
import { HanziData } from '../types';

const CDN_BASE_URL = 'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0';
const LOCAL_BASE_URL = '/hanzi-data';

/**
 * Fetches stroke data with multi-tier fallback.
 * v0.8.9: Enhanced resilience against network 'Failed to fetch' errors.
 */
export const fetchHanziData = async (char: string): Promise<HanziData | null> => {
  try {
    // Tier 1: Try Local Data (Internal PWA Cache or /public folder)
    try {
      const localResponse = await fetch(`${LOCAL_BASE_URL}/${char}.json`, {
          cache: 'default',
          headers: { 'Accept': 'application/json' }
      });
      if (localResponse.ok) {
        return await localResponse.json() as HanziData;
      }
    } catch (localError) {
        console.debug(`Local fetch for ${char} failed (likely not synced), falling back to CDN.`);
    }

    // Tier 2: Try CDN Data (jsDelivr)
    const response = await fetch(`${CDN_BASE_URL}/${char}.json`, {
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

    return await response.json() as HanziData;
  } catch (error) {
    // Tier 3: Final Catch
    console.error(`Fatal error loading data for "${char}":`, error);
    return null;
  }
};