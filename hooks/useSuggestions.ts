
/**
 * HanziMaster v0.5.2
 */
import { useState, useEffect, useCallback } from 'react';
import { COMMON_CHARS } from '../constants/commonChars';
import { COMMON_TERMS } from '../constants/commonTerms';
import { SEASONAL_EVENTS } from '../constants/seasonalEvents';

export const useSuggestions = () => {
  const [items, setItems] = useState<string[]>([]);
  const [activeSeasonKey, setActiveSeasonKey] = useState<string | null>(null);

  const getSeasonalTerms = useCallback(() => {
    const now = new Date();
    const month = now.getMonth() + 1; // 1-12
    const day = now.getDate();

    const event = SEASONAL_EVENTS.find(e => {
       if (e.startMonth === e.endMonth) {
           return month === e.startMonth && day >= e.startDay && day <= e.endDay;
       } else {
           // Logic for events spanning across months
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
    
    // Strategy:
    // 1. If seasonal terms exist, reserve first 2 slots for them
    // 2. Remaining slots: Mix of single chars and idioms
    
    let slotsFilled = 0;
    
    // Insert seasonal terms (randomly pick up to 2 unique ones)
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
        const roll = Math.random();
        if (roll < 0.4) {
            // 40% chance for single char
            newItems.push(COMMON_CHARS[Math.floor(Math.random() * COMMON_CHARS.length)]);
        } else {
            // 60% chance for terms/idioms
            newItems.push(COMMON_TERMS[Math.floor(Math.random() * COMMON_TERMS.length)]);
        }
    }
    setItems(newItems);
  }, [getSeasonalTerms]);

  // Generate on mount
  useEffect(() => {
    generateItems();
  }, [generateItems]);

  return {
    items,
    activeSeasonKey,
    generateItems
  };
};