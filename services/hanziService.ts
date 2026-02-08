import { HanziData } from '../types';

const BASE_URL = 'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0';

export const fetchHanziData = async (char: string): Promise<HanziData | null> => {
  try {
    const response = await fetch(`${BASE_URL}/${char}.json`);
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Data not found for character: ${char}`);
        return null;
      }
      throw new Error('Failed to fetch hanzi data');
    }
    const data = await response.json();
    return data as HanziData;
  } catch (error) {
    console.error('Error fetching hanzi data:', error);
    return null;
  }
};