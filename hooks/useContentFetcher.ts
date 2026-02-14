
/**
 * HanziMaster v0.5.3
 */
import { useState } from 'react';
import { HanziData, CharacterAnalysis, IdiomAnalysis, AppSettings } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { fetchHanziData } from '../services/hanziService';
import { analyzeCharacter, analyzeIdiom } from '../services/geminiService';
import { PINYIN_MAP } from '../constants/pinyinData';
import { LANGUAGES } from '../locales';

const CACHE_LIMIT = 150;

export const useContentFetcher = (settings: AppSettings) => {
  // --- Data State ---
  const [hanziData, setHanziData] = useState<HanziData | null>(null);
  const [analysis, setAnalysis] = useState<CharacterAnalysis | null>(null);
  const [idiomAnalysis, setIdiomAnalysis] = useState<IdiomAnalysis | null>(null);
  
  // --- Loading & Error State ---
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // --- Caches (L2) ---
  const [pinyinCache, setPinyinCache] = useLocalStorage<Record<string, string>>('ai_pinyin_cache', {});
  const [analysisCache, setAnalysisCache] = useLocalStorage<Record<string, CharacterAnalysis>>('ai_analysis_cache', {});
  const [idiomCache, setIdiomCache] = useLocalStorage<Record<string, IdiomAnalysis>>('ai_idiom_cache', {});

  // --- Cache Helpers ---
  const updateCache = <T>(
    key: string, 
    data: T, 
    setter: React.Dispatch<React.SetStateAction<Record<string, T>>>
  ) => {
    setter(prev => {
      const keys = Object.keys(prev);
      const newCache = { ...prev, [key]: data };
      if (keys.length > CACHE_LIMIT) {
        const [firstKey] = keys;
        delete newCache[firstKey];
      }
      return newCache;
    });
  };

  const getLangName = (code: string) => {
    return LANGUAGES.find(l => l.code === code)?.name || 'Simplified Chinese';
  };

  // --- Core Fetch Actions ---

  const fetchCharacter = async (char: string, langCode: string) => {
    const fetchedData = await fetchHanziData(char);
    if (fetchedData) {
      setHanziData(fetchedData);
    } else {
      setHanziData(null);
    }

    const langName = getLangName(langCode);

    if (analysisCache[char]) {
         setAnalysis(analysisCache[char]);
    } else {
        try {
            const aiResult = await analyzeCharacter(char, langName, settings.offlineMode, settings.apiKey);
            
            if (aiResult) {
                // Pinyin Cache Update
                if (aiResult.pinyin && aiResult.pinyin !== '-') {
                    setPinyinCache(prevCache => {
                        if (!PINYIN_MAP[char] && prevCache[char] !== aiResult.pinyin) {
                            return { ...prevCache, [char]: aiResult.pinyin };
                        }
                        return prevCache;
                    });
                }
                
                 let finalResult = aiResult;
                 
                 if (aiResult.meaning?.startsWith("Mode:")) {
                      if (fetchedData) {
                          finalResult = { ...finalResult, strokeCount: fetchedData.strokes.length };
                      }
                      
                      if (finalResult.pinyin === '-' || finalResult.pinyin === '?') {
                          const localPinyin = PINYIN_MAP[char] || pinyinCache[char];
                          if (localPinyin) {
                              finalResult = { ...finalResult, pinyin: localPinyin };
                          }
                      }
                 }

                 setAnalysis(finalResult);

                 if (!finalResult.meaning?.startsWith("Mode:") && !finalResult.meaning?.includes("Network Unavailable")) {
                     updateCache(char, finalResult, setAnalysisCache);
                 }
            } else if (analysisCache[char]) {
                setAnalysis(analysisCache[char]);
            }
        } catch (err) {
            console.error("Char Analysis failed", err);
            if (analysisCache[char]) {
                setAnalysis(analysisCache[char]);
            }
        }
    }
    return fetchedData;
  };

  const fetchIdiom = async (term: string, langCode: string) => {
    if (idiomCache[term]) {
        setIdiomAnalysis(idiomCache[term]);
    } else {
        const langName = getLangName(langCode);
        try {
            const res = await analyzeIdiom(term, langName, settings.offlineMode, settings.apiKey);
            if (res) {
                setIdiomAnalysis(res);
                if (!res.meaning?.startsWith("Mode:")) {
                     updateCache(term, res, setIdiomCache);
                }
            }
        } catch (e: any) {
            console.error("Idiom search error", e);
        }
    }
  };

  const resetData = () => {
    setAnalysis(null);
    setIdiomAnalysis(null);
    setHanziData(null);
    setError(null);
  };

  return {
    state: {
      hanziData,
      analysis,
      idiomAnalysis,
      loading,
      isAnalysisLoading,
      error,
      pinyinCache
    },
    actions: {
      setLoading,
      setIsAnalysisLoading,
      setError,
      setHanziData,
      setAnalysis,
      setIdiomAnalysis,
      fetchCharacter,
      fetchIdiom,
      resetData
    }
  };
};
