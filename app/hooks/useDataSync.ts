
// app/hooks/useDataSync.ts v1.0.7
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useToast } from '../context/ToastContext';
import { COMMON_CHARS } from '../constants/commonChars';
import { DICTIONARY_SIZE } from '../constants/dictionaryMeta';
import { UILabels } from '../types';

const CACHE_NAME = 'hanzi-data-local';
const LOCAL_BASE_URL = '/hanzi-data';

/**
 * Manages all logic related to offline data synchronization and auditing.
 * Extracted from SettingsDataAudit for better separation of concerns (v1.0.3).
 * @param labels - The UI labels for toast notifications.
 */
export const useDataSync = (labels: UILabels) => {
  const [isLexiconDownloading, setIsLexiconDownloading] = useState(false);
  const [lexiconProgress, setLexiconProgress] = useState(0);
  const [lexiconCoveredCount, setLexiconCoveredCount] = useState(0);
  const [missingSample, setMissingSample] = useState<string[]>([]);
  const [currentTarget, setCurrentTarget] = useState<string>('');
  
  const [offlineDict, setOfflineDict] = useLocalStorage<Record<string, string>>('offlineDictionary', {});
  const [isDictDownloading, setIsDictDownloading] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);

  const { showToast } = useToast();

  /**
   * Audits the CacheStorage to check for locally stored stroke data.
   */
  const auditLexicon = useCallback(async () => {
    setIsAuditing(true);
    try {
        if (!('caches' in window)) {
            console.warn("Cache API not supported in this context.");
            return;
        }
        const cache = await caches.open(CACHE_NAME);
        const keys = await cache.keys();
        const urls = new Set(keys.map(k => k.url));
        
        let count = 0;
        const missing: string[] = [];
        const highFreq = COMMON_CHARS.slice(0, 500);
        
        for (const char of COMMON_CHARS) {
            const path = `${window.location.origin}${LOCAL_BASE_URL}/${char}.json`;
            if (urls.has(path)) {
                count++;
            } else if (highFreq.includes(char) && missing.length < 5) {
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
  }, []);

  useEffect(() => {
    auditLexicon();
  }, [auditLexicon]);

  const stats = useMemo(() => {
    const lexiconTotal = COMMON_CHARS.length;
    const dictCovered = Object.keys(offlineDict).length;
    const dictTotal = DICTIONARY_SIZE; 

    return { lexiconTotal, lexiconCoveredCount, dictCovered, dictTotal };
  }, [offlineDict, lexiconCoveredCount]);

  /**
   * Iterates through all common characters and fetches/caches their stroke data.
   */
  const handleDownloadLexicon = async () => {
    if (isLexiconDownloading) return;
    setIsLexiconDownloading(true);
    setLexiconProgress(0);
    try {
      const cache = await caches.open(CACHE_NAME);
      const total = stats.lexiconTotal;
      const BATCH_SIZE = 40;
      
      for (let i = 0; i < total; i += BATCH_SIZE) {
        const batch = COMMON_CHARS.slice(i, i + BATCH_SIZE);
        setCurrentTarget(batch[0]);
        
        await Promise.all(batch.map(async (char) => {
          const url = `${LOCAL_BASE_URL}/${char}.json`;
          if (!(await cache.match(url))) {
            try { 
                const res = await fetch(url); 
                if (res.ok) await cache.put(url, res); 
            } catch (e) { /* silent catch */ }
          }
        }));
        
        const currentProgress = Math.round((Math.min(i + BATCH_SIZE, total) / total) * 100);
        setLexiconProgress(currentProgress);
      }
      
      setCurrentTarget('');
      await auditLexicon();
      showToast(labels.downloadSuccess, 'success');
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
