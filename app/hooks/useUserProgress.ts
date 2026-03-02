
// app/hooks/useUserProgress.ts v1.3.4
import { useLocalStorage } from './useLocalStorage';
import { useAchievements } from './useAchievements';
import { HistoryItem, SRSItem, Grade, PracticeResult } from '../types';

/**
 * Manages user's learning progress, history, and stats using SM-2 algorithm.
 */
export const useUserProgress = () => {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('practiceHistory', []);
  const [learnedItems, setLearnedItems] = useLocalStorage<string[]>('learnedItems', []);
  const [srsData, setSrsData] = useLocalStorage<Record<string, SRSItem>>('srsData', {});
  
  const { 
    achievements, 
    stats, 
    newlyUnlocked, 
    clearNewUnlocked, 
    recordPractice, 
    clearAchievements 
  } = useAchievements();

  /**
   * Adds a term to the history and learned items list.
   * @param term The character or idiom practiced.
   */
  const addToHistoryAndStats = (term: string, result?: PracticeResult) => {
    // Add to history (capped at 20 items)
    setHistory(prev => {
      const filtered = prev.filter(item => item.char !== term);
      return [{ char: term, timestamp: Date.now() }, ...filtered].slice(0, 20); 
    });

    const isNewChar = !learnedItems.includes(term);

    // Add to unique learned items
    if (isNewChar) {
      setLearnedItems(prev => [...prev, term]);
    }

    if (result) {
      recordPractice(term, result, isNewChar);
    }
  };

  /**
   * Updates the SRS data for a character based on practice result using SM-2 algorithm.
   */
  const updateSRS = (char: string, result: PracticeResult) => {
    setSrsData(prev => {
      const item = prev[char] || {
        char,
        interval: 0,
        repetition: 0,
        efactor: 2.5,
        nextReviewDate: Date.now()
      };

      // Map our Grade to SM-2 quality (0-5)
      let quality = 0;
      switch (result.grade) {
        case Grade.EXQUISITE: quality = 5; break;
        case Grade.MASTERFUL: quality = 4; break;
        case Grade.PROFICIENT: quality = 3; break;
        case Grade.POOR: quality = Math.max(0, Math.floor(result.score / 20)); break;
      }

      let { interval, repetition, efactor } = item;

      if (quality >= 3) {
        if (repetition === 0) {
          interval = 1;
        } else if (repetition === 1) {
          interval = 6;
        } else {
          interval = Math.round(interval * efactor);
        }
        repetition += 1;
      } else {
        repetition = 0;
        interval = 1;
      }

      efactor = efactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
      if (efactor < 1.3) efactor = 1.3;

      const nextReviewDate = Date.now() + interval * 24 * 60 * 60 * 1000;

      return {
        ...prev,
        [char]: {
          char,
          interval,
          repetition,
          efactor,
          nextReviewDate
        }
      };
    });
  };

  /**
   * Gets a list of characters that are due for review.
   */
  const getDueReviews = (): string[] => {
    const now = Date.now();
    return Object.values(srsData)
      .filter(item => item.nextReviewDate <= now)
      .sort((a, b) => a.nextReviewDate - b.nextReviewDate)
      .map(item => item.char);
  };

  /**
   * Clears both the visible history and the underlying statistics.
   */
  const clearAllProgress = () => {
    setHistory([]);
    setLearnedItems([]);
    setSrsData({});
  };

  return {
    state: {
      history,
      learnedItems,
      srsData,
      dueReviews: getDueReviews(),
      achievements,
      stats,
      newlyUnlocked,
    },
    actions: {
      addToHistoryAndStats,
      updateSRS,
      clearAllProgress,
      clearNewUnlocked,
    },
  };
};
