// app/hooks/useSuggestions.ts v1.0.1
import { useState, useEffect, useCallback } from 'react';
import { COMMON_CHARS } from '../constants/commonChars';
import { COMMON_TERMS } from '../constants/commonTerms';
import { SEASONAL_EVENTS } from '../constants/seasonalEvents';

export const useSuggestions = () => {
  const [items, setItems] = useState<string[]>([]);
  const [activeSeasonKey, setActiveSeasonKey] = useState<string | null>(null);

  const getSeasonalTerms = useCallback(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    const event = SEASONAL_EVENTS.find(e => {
       if (e.startMonth === e.endMonth) {
           return month === e.startMonth && day >= e.startDay && day <= e.endDay;
       } else {
           if (month === e.startMonth) return day >= e.startDay;
           if (month === e.endMonth) return day <= e.endDay;
           return month > e.startMonth && month < e.endMonth;
       }
    });

    if (event) {
        setActiveSeasonKey(event.name);
        return event.keywords;
    }
    setActiveSeasonKey(null);
    return [];
  }, []);

  const generateItems = useCallback(() => {
    const newItems: string[] = [];
    const seasonalTerms = getSeasonalTerms();
    let slotsFilled = 0;
    
    if (seasonalTerms.length > 0) {
        const shuffledSeasonal = [...seasonalTerms].sort(() => 0.5 - Math.random());
        const countToTake = Math.min(2, shuffledSeasonal.length);
        for(let i=0; i<countToTake; i++) {
            newItems.push(shuffledSeasonal[i]);
            slotsFilled++;
        }
    }

    const totalSlots = 6;
    const remainingSlots = totalSlots - slotsFilled;
    for (let i = 0; i < remainingSlots; i++) {
        if (Math.random() < 0.4) {
            newItems.push(COMMON_CHARS[Math.floor(Math.random() * COMMON_CHARS.length)]);
        } else {
            newItems.push(COMMON_TERMS[Math.floor(Math.random() * COMMON_TERMS.length)]);
        }
    }
    setItems(newItems);
  }, [getSeasonalTerms]);

  useEffect(() => { generateItems(); }, [generateItems]);

  return { items, activeSeasonKey, generateItems };
};
