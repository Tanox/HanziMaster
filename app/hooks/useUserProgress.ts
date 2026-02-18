
// app/hooks/useUserProgress.ts v1.0.2
import { useLocalStorage } from './useLocalStorage';
import { HistoryItem } from '../types';

/**
 * Manages user's learning progress, history, and stats.
 * Separated from useAppController as per v1.0.0 Architecture Spec.
 */
export const useUserProgress = () => {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('practiceHistory', []);
  const [learnedItems, setLearnedItems] = useLocalStorage<string[]>('learnedItems', []);

  /**
   * Adds a term to the history and learned items list.
   * @param term The character or idiom practiced.
   */
  const addToHistoryAndStats = (term: string) => {
    // Add to history (capped at 20 items)
    setHistory(prev => {
      const filtered = prev.filter(item => item.char !== term);
      return [{ char: term, timestamp: Date.now() }, ...filtered].slice(0, 20); 
    });

    // Add to unique learned items
    setLearnedItems(prev => {
        if (prev.includes(term)) return prev;
        return [...prev, term];
    });
  };

  /**
   * Clears both the visible history and the underlying statistics.
   */
  const clearAllProgress = () => {
    setHistory([]);
    setLearnedItems([]);
  };

  return {
    state: {
      history,
      learnedItems,
    },
    actions: {
      addToHistoryAndStats,
      clearAllProgress,
    },
  };
};
