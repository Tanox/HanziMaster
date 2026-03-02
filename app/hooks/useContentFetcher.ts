// app/hooks/useContentFetcher.ts v1.3.4
import { useState } from 'react';
import { HanziData, CharacterAnalysis, IdiomAnalysis, AppSettings } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { fetchHanziData } from '../services/hanziService';
import { analyzeCharacter, analyzeIdiom } from '../services/geminiService';
import { LANGUAGES, UI_LABELS } from '../locales';

export const useContentFetcher = (settings: AppSettings) => {
  const [hanziData, setHanziData] = useState<HanziData | null>(null);
  const [analysis, setAnalysis] = useState<CharacterAnalysis | null>(null);
  const [idiomAnalysis, setIdiomAnalysis] = useState<IdiomAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [pinyinCache] = useLocalStorage<Record<string, string>>('ai_pinyin_cache', {});
  const [analysisCache, setAnalysisCache] = useLocalStorage<Record<string, CharacterAnalysis>>('ai_analysis_cache', {});
  const [idiomCache, setIdiomCache] = useLocalStorage<Record<string, IdiomAnalysis>>('ai_idiom_cache', {});

  const updateCache = <T>(key: string, data: T, setter: any) => {
    setter((prev: any) => ({ ...prev, [key]: data }));
  };

  const fetchCharacter = async (char: string, langCode: string) => {
    const langName = LANGUAGES.find(l => l.code === langCode)?.name || 'English';
    const labels = UI_LABELS[langCode] || UI_LABELS['en'];

    try {
      const fetchedData = await fetchHanziData(char);
      
      if (!fetchedData) {
        setHanziData(null);
        setError(labels.errorCharNotFound?.replace('{char}', char) || `Character data for "${char}" could not be found.`);
        return null;
      }

      setHanziData(fetchedData);
      
      if (analysisCache[char]) {
        setAnalysis(analysisCache[char]);
      } else {
        const res = await analyzeCharacter(char, langName, settings.offlineMode);
        if (res) {
          setAnalysis(res);
          if (!res.meaning.startsWith('Mode:')) updateCache(char, res, setAnalysisCache);
        }
      }
      return fetchedData;
    } catch (err) {
      console.error("Error in fetchCharacter:", err);
      setError(labels.errorGeneral || "An unexpected error occurred. Please try again.");
      return null;
    }
  };

  const fetchIdiom = async (term: string, langCode: string) => {
    try {
      if (idiomCache[term]) {
        setIdiomAnalysis(idiomCache[term]);
      } else {
        const langName = LANGUAGES.find(l => l.code === langCode)?.name || 'English';
        const res = await analyzeIdiom(term, langName, settings.offlineMode);
        if (res) {
          setIdiomAnalysis(res);
          if (!res.meaning.startsWith('Mode:')) updateCache(term, res, setIdiomCache);
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