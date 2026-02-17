// app/services/hanziService.ts v0.9.1
import { HanziData } from '../types';

const CDN_BASE_URL = 'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0';
const LOCAL_BASE_URL = '/hanzi-data';

/**
 * Validates the structure of fetched Hanzi data.
 */
const isValidHanziData = (data: any): data is HanziData => {
  return (
    data &&
    Array.isArray(data.strokes) &&
    data.strokes.length > 0 &&
    Array.isArray(data.medians) &&
    data.medians.length === data.strokes.length
  );
};

/**
 * Fetches stroke data with multi-tier fallback and integrity check.
 * v0.9.1: Added validation to reject corrupted or partial JSON responses.
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
        const data = await localResponse.json();
        if (isValidHanziData(data)) return data;
        console.warn(`Local data for ${char} is invalid, falling back to CDN.`);
      }
    } catch (localError) {
        console.debug(`Local fetch for ${char} failed (likely not synced).`);
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

    const cdnData = await response.json();
    if (isValidHanziData(cdnData)) return cdnData;
    
    throw new Error(`Fetched data for ${char} failed validation.`);
  } catch (error) {
    // Tier 3: Final Catch
    console.error(`Fatal error loading data for "${char}":`, error);
    return null;
  }
};