

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

export const useAppController = () => {
  // --- Persistent State ---
  const [settings, setSettings] = useLocalStorage<AppSettings>('appSettings', DEFAULT_SETTINGS);
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('practiceHistory', []);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  const [hasSeenWelcome, setHasSeenWelcome] = useLocalStorage<boolean>('hasSeenWelcome', false);
  const [pinyinCache, setPinyinCache] = useLocalStorage<Record<string, string>>('ai_pinyin_cache', {});

  // --- App State ---
  const [activeTerm, setActiveTerm] = useState<string>('永');
  const [activeChar, setActiveChar] = useState<string>('永');
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
      // Correctly slice to keep the first 20 items, not remove them.
      return [{ char: term, timestamp: Date.now() }, ...filtered].slice(0, 20); 
    });
  };

  const fetchCharacterData = async (char: string, langCode: string) => {
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
    try {
        const aiResult = await analyzeCharacter(char, langName, settings.offlineMode, settings.apiKey);
        
        if (aiResult && aiResult.pinyin && aiResult.pinyin !== '-') {
            setPinyinCache(prevCache => {
                if (!PINYIN_MAP[char] && prevCache[char] !== aiResult.pinyin) {
                    return { ...prevCache, [char]: aiResult.pinyin };
                }
                return prevCache;
            });
        }
        
        if (fetchedData && aiResult && aiResult.meaning.startsWith("Mode:")) {
            setAnalysis({ ...aiResult, strokeCount: fetchedData.strokes.length });
        } else if (aiResult) {
            setAnalysis(aiResult);
        }
    } catch (err) {
        console.error("Char Analysis failed", err);
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

    setAnalysis(null);
    setIdiomAnalysis(null);
    setHanziData(null);
    
    const langName = LANGUAGES.find(l => l.code === langCode)?.name || 'Simplified Chinese';

    const promises: Promise<any>[] = [fetchCharacterData(firstChar, langCode)];

    if (term.length > 1) {
        promises.push(
            analyzeIdiom(term, langName, settings.offlineMode, settings.apiKey)
                .then(res => setIdiomAnalysis(res))
                .catch(e => {
                    console.error("Idiom search error", e);
                })
        );
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

  const handleCharSelect = (char: string, explicitMode?: InteractionMode) => {
      if (char === activeChar && !explicitMode) return;
      setActiveChar(char);
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
        const currentIndex = activeTerm.indexOf(activeChar);
        if (currentIndex !== -1 && currentIndex < activeTerm.length - 1) {
            maintainModeRef.current = InteractionMode.PRACTICE;
            setTimeout(() => {
                handleCharSelect(activeTerm[currentIndex + 1], InteractionMode.PRACTICE);
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
