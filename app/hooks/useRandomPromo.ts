
// @ts-nocheck
import { useState, useCallback } from 'react';
import { PROMO_COPY } from '../constants/promoCopy';

export type Language = 'zhCN' | 'en';

interface UseRandomPromoResult {
  getRandomCopy: (lang: Language, url: string) =&gt; string;
  getCurrentCopy: () =&gt; string | null;
}

export const useRandomPromo = (): UseRandomPromoResult =&gt; {
  const [lastIndex, setLastIndex] = useState&lt;Record&lt;Language, number&gt;&gt;({
    zhCN: -1,
    en: -1
  });
  const [currentCopy, setCurrentCopy] = useState&lt;string | null&gt;(null);

  const getRandomCopy = useCallback((lang: Language, url: string): string =&gt; {
    const copies = PROMO_COPY[lang];
    
    if (copies.length === 0) {
      return '';
    }

    if (copies.length === 1) {
      const copy = copies[0].replace('{url}', url);
      setCurrentCopy(copy);
      return copy;
    }

    let newIndex: number;
    do {
      newIndex = Math.floor(Math.random() * copies.length);
    } while (newIndex === lastIndex[lang]);

    setLastIndex(prev =&gt; ({ ...prev, [lang]: newIndex }));
    const copy = copies[newIndex].replace('{url}', url);
    setCurrentCopy(copy);
    return copy;
  }, [lastIndex]);

  const getCurrentCopy = useCallback((): string | null =&gt; {
    return currentCopy;
  }, [currentCopy]);

  return { getRandomCopy, getCurrentCopy };
};

