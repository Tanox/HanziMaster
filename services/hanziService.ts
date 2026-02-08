import { HanziData } from '../types';

const CDN_BASE_URL = 'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0';
const LOCAL_BASE_URL = '/hanzi-data';

export const fetchHanziData = async (char: string): Promise<HanziData | null> => {
  try {
    // 1. Try Local Data (Built-in)
    // We attempt to fetch from the local public folder first.
    // This allows the app to work offline for the "Common Characters" that we copied during build.
    try {
      const localResponse = await fetch(`${LOCAL_BASE_URL}/${char}.json`);
      if (localResponse.ok) {
        const data = await localResponse.json();
        return data as HanziData;
      }
    } catch (localError) {
      // Ignore local fetch error, proceed to CDN
      // console.debug('Local data not found, falling back to CDN');
    }

    // 2. Fallback to CDN
    const response = await fetch(`${CDN_BASE_URL}/${char}.json`);
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Data not found for character: ${char}`);
        return null;
      }
      throw new Error('Failed to fetch hanzi data from CDN');
    }
    const data = await response.json();
    return data as HanziData;
  } catch (error) {
    console.error('Error fetching hanzi data:', error);
    return null;
  }
};