
// app/hooks/useDataSync.ts v1.1.2
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useToast } from '../context/ToastContext';
import { DICTIONARY_SIZE, LEXICON_SIZE } from '../constants/dictionaryMeta';
import { UILabels } from '../types';

const CACHE_NAME = 'hanzi-data-local';
const LOCAL_BASE_URL = '/hanzi-data';

/**
 * Helper for fetching with retries and exponential backoff.
 */
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3, backoff = 500): Promise<Response> {
    try {
        const response = await fetch(url, options);
        if (response.ok) return response;
        if (retries > 0 && response.status >= 500) {
            await new Promise(resolve => setTimeout(resolve, backoff));
            return fetchWithRetry(url, options, retries - 1, backoff * 2);
        }
        return response;
    } catch (e) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, backoff));
            return fetchWithRetry(url, options, retries - 1, backoff * 2);
        }
        throw e;
    }
}

/**
 * Manages all logic related to offline data synchronization and auditing.
 * v1.1.2: Fixed lexicon download failure by adding a robust retry mechanism.
 */
export const useDataSync = (labels: UILabels) => {
  const [characterList, setCharacterList] = useState<string[]>([]);
  const [isLexiconDownloading, setIsLexiconDownloading] = useState(false);
  const [lexiconProgress, setLexiconProgress] = useState(0);
  const [lexiconCoveredCount, setLexiconCoveredCount] = useState(0);
  const [missingSample, setMissingSample] = useState<string[]>([]);
  const [currentTarget, setCurrentTarget] = useState<string>('');
  
  const [offlineDict, setOfflineDict] = useLocalStorage<Record<string, string>>('offlineDictionary', {});
  const [isDictDownloading, setIsDictDownloading] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    const fetchCharList = async () => {
        try {
            const res = await fetch(`${LOCAL_BASE_URL}/character-list.json`);
            if (res.ok) {
                const list = await res.json();
                setCharacterList(list);
            }
        } catch (e) {
            console.warn("Could not fetch character list for offline sync.", e);
        }
    };
    fetchCharList();
  }, []);

  /**
   * Audits the CacheStorage to check for locally stored stroke data against the full character list.
   */
  const auditLexicon = useCallback(async () => {
    if (characterList.length === 0) return;
    setIsAuditing(true);
    try {
        if (!('caches' in window)) return;
        const cache = await caches.open(CACHE_NAME);
        const keys = await cache.keys();
        const urls = new Set(keys.map(k => k.url));
        
        let count = 0;
        const missing: string[] = [];
        const highFreq = new Set(characterList.slice(0, 500));
        
        for (const char of characterList) {
            const path = `${window.location.origin}${LOCAL_BASE_URL}/${char}.json`;
            if (urls.has(path)) {
                count++;
            } else if (highFreq.has(char) && missing.length < 5) {
                missing.push(char);
            }
        }
        setLexiconCoveredCount(count);
        setMissingSample(missing);
    } catch (e) {
        console.warn("Lexicon audit failed", e);
    } finally {
        setIsAuditing(false);
    }
  }, [characterList]);

  useEffect(() => {
    auditLexicon();
  }, [auditLexicon]);

  const stats = useMemo(() => {
    const lexiconTotal = LEXICON_SIZE > 0 ? LEXICON_SIZE : characterList.length;
    const dictCovered = Object.keys(offlineDict).length;
    const dictTotal = DICTIONARY_SIZE; 
    return { lexiconTotal, lexiconCoveredCount, dictCovered, dictTotal };
  }, [offlineDict, lexiconCoveredCount, characterList.length]);

  /**
   * Iterates through the full character list and fetches/caches their stroke data.
   * Includes retry logic for network reliability.
   */
  const handleDownloadLexicon = async () => {
    if (isLexiconDownloading || characterList.length === 0) return;
    setIsLexiconDownloading(true);
    setLexiconProgress(0);
    const failedChars: string[] = [];

    try {
      const cache = await caches.open(CACHE_NAME);
      const total = stats.lexiconTotal;
      const BATCH_SIZE = 50;
      
      for (let i = 0; i < total; i += BATCH_SIZE) {
        const batch = characterList.slice(i, i + BATCH_SIZE);
        setCurrentTarget(batch[0]);
        
        await Promise.all(batch.map(async (char) => {
          const url = `${LOCAL_BASE_URL}/${char}.json`;
          try {
            if (!(await cache.match(url))) {
              const res = await fetchWithRetry(url);
              if (res.ok) {
                await cache.put(url, res);
              } else {
                failedChars.push(char);
              }
            }
          } catch (e) {
            failedChars.push(char);
          }
        }));
        
        const currentProgress = Math.round((Math.min(i + BATCH_SIZE, total) / total) * 100);
        setLexiconProgress(currentProgress);
      }
      
      setCurrentTarget('');
      await auditLexicon();
      
      if (failedChars.length > 0) {
        console.warn('Failed to download:', failedChars);
        const errorMsg = (labels.downloadError || "Lexicon sync failed").replace('Lexicon sync failed', `Sync failed for ${failedChars.length} items`);
        showToast(errorMsg, 'error');
      } else {
        showToast(labels.downloadSuccess, 'success');
      }
    } catch (error) { 
      showToast(labels.downloadError, 'error'); 
    } finally { 
      setIsLexiconDownloading(false); 
    }
  };

  /**
   * Dynamically imports and stores the offline dictionary.
   */
  const handleDownloadDictionary = async () => {
    if (isDictDownloading) return;
    setIsDictDownloading(true);
    try {
        const module = await import('../constants/dictionaryData');
        await new Promise(resolve => setTimeout(resolve, 800)); 
        setOfflineDict(module.SIMPLE_DICTIONARY);
        showToast(labels.dictionaryReady, 'success');
    } catch (e) {
        showToast(labels.dictionaryError, 'error');
    } finally {
        setIsDictDownloading(false);
    }
  };

  return {
      state: {
          isLexiconDownloading,
          lexiconProgress,
          missingSample,
          currentTarget,
          isDictDownloading,
          isAuditing,
          stats
      },
      actions: {
          auditLexicon,
          handleDownloadLexicon,
          handleDownloadDictionary
      }
  };
};
