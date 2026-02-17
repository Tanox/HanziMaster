/**
 * app/services/hanziService.ts v0.7.1
 */
import { HanziData } from '../types';

const CDN_BASE_URL = 'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0';
const LOCAL_BASE_URL = '/hanzi-data';

export const fetchHanziData = async (char: string): Promise<HanziData | null> => {
  try {
    try {
      const localResponse = await fetch(`${LOCAL_BASE_URL}/${char}.json`);
      if (localResponse.ok) {
        const data = await localResponse.json();
        return data as HanziData;
      }
    } catch (localError) {
        // Ignore local fetch error in dev or if not synced
    }

    const response = await fetch(`${CDN_BASE_URL}/${char}.json`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch hanzi data from CDN');
    }
    const data = await response.json();
    return data as HanziData;
  } catch (error) {
    console.error('Error fetching hanzi data:', error);
    return null;
  }
};