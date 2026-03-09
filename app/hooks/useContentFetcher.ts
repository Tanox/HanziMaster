// app/hooks/useContentFetcher.ts v1.3.8
import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { HanziData, CharacterAnalysis, IdiomAnalysis, AppSettings } from '../types';
import { fetchHanziData } from '../services/hanziService';
import { analyzeCharacter, analyzeIdiom } from '../services/geminiService';
import { LANGUAGES, UI_LABELS } from '../locales';
import { getCacheItem, setCacheItem } from '../utils/cacheUtils';

export const useContentFetcher = (settings: AppSettings) => {
  const [hanziData, setHanziData] = useState<HanziData | null>(null);
  const [analysis, setAnalysis] = useState<CharacterAnalysis | null>(null);
  const [idiomAnalysis, setIdiomAnalysis] = useState<IdiomAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [pinyinCache] = useLocalStorage<Record<string, string>>('ai_pinyin_cache', {});

  const fetchCharacter = async (char: string, langCode: string) => {
    const langName = LANGUAGES.find(l => l.code === langCode)?.name || 'English';
    const labels = UI_LABELS[langCode] || UI_LABELS['en'];

    try {
      // Priority 1: Fetch Hanzi Stroke Data
      const fetchedData = await fetchHanziData(char);
      
      if (!fetchedData) {
        setHanziData(null);
        setError(labels.errorCharNotFound?.replace('{char}', char) || `Character data for "${char}" could not be found.`);
        return null;
      }

      setHanziData(fetchedData);
      
      // Priority 2: Fetch Analysis Data (Delayed)
      setIsAnalysisLoading(true);
      const cached = getCacheItem<CharacterAnalysis>('ai_analysis_cache', char);
      if (cached) {
        setAnalysis(cached);
      } else {
        const res = await analyzeCharacter(char, langName, settings.offlineMode);
        if (res) {
          setAnalysis(res);
          if (!res.meaning.startsWith('Mode:')) setCacheItem('ai_analysis_cache', char, res);
        }
      }
      setIsAnalysisLoading(false);
      
      return fetchedData;
    } catch (err) {
      console.error("Error in fetchCharacter:", err);
      setError(labels.errorGeneral || "An unexpected error occurred. Please try again.");
      setIsAnalysisLoading(false);
      return null;
    }
  };

  const fetchIdiom = async (term: string, langCode: string) => {
    try {
      const cached = getCacheItem<IdiomAnalysis>('ai_idiom_cache', term);
      if (cached) {
        setIdiomAnalysis(cached);
      } else {
        const langName = LANGUAGES.find(l => l.code === langCode)?.name || 'English';
        const res = await analyzeIdiom(term, langName, settings.offlineMode);
        if (res) {
          setIdiomAnalysis(res);
          if (!res.meaning.startsWith('Mode:')) setCacheItem('ai_idiom_cache', term, res);
        }
      }
    } catch (err) {
      console.error("Error in fetchIdiom:", err);
    }
  };

  const resetData = () => {
    setAnalysis(null);
    setIdiomAnalysis(null);
    setHanziData(null);
    setError(null);
  };

  return {
    state: { hanziData, analysis, idiomAnalysis, loading, isAnalysisLoading, error, pinyinCache },
    actions: { setLoading, setIsAnalysisLoading, setError, fetchCharacter, fetchIdiom, resetData }
  };
};
