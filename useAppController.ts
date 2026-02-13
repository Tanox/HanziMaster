

/**
 * HanziMaster v0.4.2
 */
import { useState, useEffect, useRef } from 'react';
import { HanziData, CharacterAnalysis, IdiomAnalysis, AnimationState, InteractionMode, AppSettings, HistoryItem } from '../types/index.ts';
import { fetchHanziData } from '../services/hanziService.ts';
import { analyzeCharacter, analyzeIdiom } from '../services/geminiService.ts';
import { LANGUAGES } from '../locales/index.ts';
import { COMMON_CHARS } from '../constants/commonChars.ts';
import { useLocalStorage } from './useLocalStorage.ts';
import { PINYIN_MAP } from '../constants/pinyinData.ts';

const DEFAULT_SETTINGS: AppSettings = {
  apiKey: '', 
  gridStyle: 'rice',
  showOutline: true,
  autoPlay: true,
  continuousMode: false,
  offlineMode: false,
  showRandomSuggestions: true,
  showHistory: true,
  showStructure: true,
  showEtymology: true,
  showMnemonic: true,
  showExamples: true,
};

const CACHE_LIMIT = 150; // Max items to keep in analysis cache

export const useAppController = () => {
  // --- Persistent State ---
  const [settings, setSettings] = useLocalStorage<AppSettings>('appSettings', DEFAULT_SETTINGS);
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('practiceHistory', []);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  const [hasSeenWelcome, setHasSeenWelcome] = useLocalStorage<boolean>('hasSeenWelcome', false);
  const [pinyinCache, setPinyinCache] = useLocalStorage<Record<string, string>>('ai_pinyin_cache', {});
  
  // --- Offline Caches (L2 Cache) ---
  const [analysisCache, setAnalysisCache] = useLocalStorage<Record<string, CharacterAnalysis>>('ai_analysis_cache', {});
  const [idiomCache, setIdiomCache] = useLocalStorage<Record<string, IdiomAnalysis>>('ai_idiom_cache', {});

  // --- App State ---
  const [activeTerm, setActiveTerm] = useState<string>('永');
  const [activeChar, setActiveChar] = useState<string>('永');
  const [activeCharIndex, setActiveCharIndex] = useState<number>(0);
  const [currentLang, setCurrentLang] = useState<string>('zh-CN');
  
  // --- Data State ---
  const [hanziData, setHanziData] = useState<HanziData | null>(null);
  const [analysis, setAnalysis] = useState<CharacterAnalysis | null>(null);
  const [idiomAnalysis, setIdiomAnalysis] = useState<IdiomAnalysis | null>(null);
  
  // --- UI/Loading State ---
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  // --- Animation/Interaction State ---
  const [animationState, setAnimationState] = useState<AnimationState>(AnimationState.IDLE);
  const [interactionMode, setInteractionMode] = useState<InteractionMode>(InteractionMode.VIEW);
  const [speed, setSpeed] = useState<number>(1);
  const maintainModeRef = useRef<InteractionMode | null>(null);

  useEffect(() => {
    setShowWelcome(!hasSeenWelcome);
  }, []); 

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  useEffect(() => {
    // Check for character in URL query params on initial load
    const urlParams = new URLSearchParams(window.location.search);
    const charFromUrl = urlParams.get('char');
    const initialChar = charFromUrl && /^[\u4E00-\u9FFF]{1,4}$/.test(charFromUrl) ? charFromUrl : '永';
    handleSearch(initialChar, currentLang);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleDismissWelcome = () => {
    setShowWelcome(false);
    setHasSeenWelcome(true);
  };

  const addToHistory = (term: string) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item.char !== term);
      // Correctly slice to keep the first 20 items
      return [{ char: term, timestamp: Date.now() }, ...filtered].slice(0, 20); 
    });
  };

  const updateCache = <T>(
    key: string, 
    data: T, 
    setter: React.Dispatch<React.SetStateAction<Record<string, T>>>
  ) => {
    setter(prev => {
      const keys = Object.keys(prev);
      const newCache = { ...prev, [key]: data };
      if (keys.length > CACHE_LIMIT) {
        // Simple pruning: remove the first key found (often oldest in simple objects)
        const [firstKey] = keys;
        delete newCache[firstKey];
      }
      return newCache;
    });
  };

  const fetchCharacterData = async (char: string, langCode: string) => {
    // 1. Fetch Stroke Data (handled by Service Worker cache)
    const fetchedData = await fetchHanziData(char);
    if (fetchedData) {
      setHanziData(fetchedData);
      if (settings.autoPlay && (maintainModeRef.current !== InteractionMode.PRACTICE && interactionMode !== InteractionMode.PRACTICE)) {
         setTimeout(() => setAnimationState(AnimationState.PLAYING), 500);
      }
    } else {
      setHanziData(null);
    }

    const langName = LANGUAGES.find(l => l.code === langCode)?.name || 'Simplified Chinese';

    // 2. Fetch Analysis (Check Cache First)
    if (analysisCache[char] && !settings.offlineMode) {
         // Use cached data if available (even if online, to save quota/time)
         // Note: If user forces offline mode, we still try to use cache.
         setAnalysis(analysisCache[char]);
    } else {
        try {
            // If offline or cache miss, try to analyze
            const aiResult = await analyzeCharacter(char, langName, settings.offlineMode, settings.apiKey);
            
            // Pinyin Cache Update
            if (aiResult && aiResult.pinyin && aiResult.pinyin !== '-') {
                setPinyinCache(prevCache => {
                    if (!PINYIN_MAP[char] && prevCache[char] !== aiResult.pinyin) {
                        return { ...prevCache, [char]: aiResult.pinyin };
                    }
                    return prevCache;
                });
            }
            
            if (aiResult) {
                 // Enhance result with stroke count from HanziWriter data if AI missed it
                 let finalResult = aiResult;
                 if (fetchedData && aiResult.meaning.startsWith("Mode:")) {
                      finalResult = { ...aiResult, strokeCount: fetchedData.strokes.length };
                 }

                 setAnalysis(finalResult);

                 // Only cache valid results (not offline fallbacks)
                 if (!finalResult.meaning.startsWith("Mode:") && !finalResult.meaning.includes("Network Unavailable")) {
                     updateCache(char, finalResult, setAnalysisCache);
                 } else if (analysisCache[char]) {
                     // If we got a fallback but have a cache (e.g. transient network error), use cache
                     setAnalysis(analysisCache[char]);
                 }
            }
        } catch (err) {
            console.error("Char Analysis failed", err);
            if (analysisCache[char]) {
                setAnalysis(analysisCache[char]);
            }
        }
    }
  };

  const handleSearch = async (term: string, langCode: string = currentLang) => {
    setLoading(true); 
    setIsAnalysisLoading(true); 
    setError(null);
    setAnimationState(AnimationState.IDLE);
    setInteractionMode(InteractionMode.VIEW); 
    maintainModeRef.current = null;
    
    // Update URL without reloading page for shareability
    const url = new URL(window.location.href);
    url.searchParams.set('char', term);
    window.history.pushState({}, '', url);

    setActiveTerm(term);
    const firstChar = term[0];
    setActiveChar(firstChar);
    setActiveCharIndex(0);

    setAnalysis(null);
    setIdiomAnalysis(null);
    setHanziData(null);
    
    const langName = LANGUAGES.find(l => l.code === langCode)?.name || 'Simplified Chinese';

    // Parallel Fetching
    const promises: Promise<any>[] = [fetchCharacterData(firstChar, langCode)];

    if (term.length > 1) {
        // Check Idiom Cache
        if (idiomCache[term] && !settings.offlineMode) {
            setIdiomAnalysis(idiomCache[term]);
        } else {
            promises.push(
                analyzeIdiom(term, langName, settings.offlineMode, settings.apiKey)
                    .then(res => {
                        setIdiomAnalysis(res);
                        // Cache valid idiom results
                        if (res && !res.meaning.startsWith("Mode:")) {
                             updateCache(term, res, setIdiomCache);
                        } else if (idiomCache[term]) {
                             // Fallback to cache on error/offline
                             setIdiomAnalysis(idiomCache[term]);
                        }
                    })
                    .catch(e => {
                        console.error("Idiom search error", e);
                        if (idiomCache[term]) {
                             setIdiomAnalysis(idiomCache[term]);
                        }
                    })
            );
        }
    }

    await Promise.all(promises);

    setLoading(false);
    setIsAnalysisLoading(false);
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * COMMON_CHARS.length);
    const randomChar = COMMON_CHARS[randomIndex];
    handleSearch(randomChar, currentLang);
  };

  const handleCharSelect = (char: string, explicitMode?: InteractionMode, index?: number) => {
      // If index is provided, use it. Otherwise rely on indexOf (fallback, not recommended for duplicates)
      const targetIndex = index !== undefined ? index : activeTerm.indexOf(char);
      
      if (char === activeChar && targetIndex === activeCharIndex && !explicitMode) return;
      
      setActiveChar(char);
      if (targetIndex >= 0) setActiveCharIndex(targetIndex);
      
      setAnimationState(AnimationState.IDLE);
      const targetMode = explicitMode || (maintainModeRef.current || InteractionMode.VIEW);
      setInteractionMode(targetMode);
      fetchCharacterData(char, currentLang);
  };

  const handleLanguageChange = (code: string) => {
    setCurrentLang(code);
    if (activeTerm) {
      handleSearch(activeTerm, code);
    }
  };

  const handlePracticeComplete = () => {
    if (activeTerm.length > 1) {
        if (activeCharIndex < activeTerm.length - 1) {
            maintainModeRef.current = InteractionMode.PRACTICE;
            setTimeout(() => {
                const nextIndex = activeCharIndex + 1;
                handleCharSelect(activeTerm[nextIndex], InteractionMode.PRACTICE, nextIndex);
            }, 1000);
            return;
        } else {
             maintainModeRef.current = null;
             addToHistory(activeTerm);
             if (settings.continuousMode) {
                 setTimeout(handleRandom, 1500);
             }
        }
    } else {
        addToHistory(activeChar);
         if (settings.continuousMode) {
             setTimeout(handleRandom, 1500);
         }
    }
  };

  return {
    state: {
      settings,
      history,
      theme,
      activeTerm,
      activeChar,
      activeCharIndex,
      currentLang,
      hanziData,
      analysis,
      idiomAnalysis,
      loading,
      isAnalysisLoading,
      error,
      isOffline,
      isSettingsOpen,
      showWelcome,
      animationState,
      interactionMode,
      speed,
      pinyinCache,
    },
    actions: {
      setSettings,
      setHistory,
      toggleTheme,
      setActiveTerm,
      setActiveChar,
      setHanziData,
      setAnalysis,
      setLoading,
      setError,
      setIsOffline,
      setIsSettingsOpen,
      handleDismissWelcome,
      handleSearch,
      handleRandom,
      handleCharSelect,
      handleLanguageChange,
      handlePracticeComplete,
      setAnimationState,
      setInteractionMode,
      setSpeed,
    },
  };
};