/**
 * HanziMaster v0.3.1
 */
import { useState, useEffect, useRef } from 'react';
import { HanziData, CharacterAnalysis, IdiomAnalysis, AnimationState, InteractionMode, AppSettings, HistoryItem } from '../types';
import { fetchHanziData } from '../services/hanziService';
import { analyzeCharacter, analyzeIdiom } from '../services/geminiService';
import { LANGUAGES } from '../locales';
import { COMMON_CHARS } from '../utils/commonChars';

const DEFAULT_SETTINGS: AppSettings = {
  apiKey: '', 
  gridStyle: 'rice',
  showOutline: true,
  autoPlay: true,
  continuousMode: false,
  offlineMode: false,
  showRandomSuggestions: false,
  showHistory: true,
  showStructure: true,
  showEtymology: true,
  showMnemonic: true,
  showExamples: true,
};

export const useAppController = () => {
  const [activeTerm, setActiveTerm] = useState<string>('永');
  const [activeChar, setActiveChar] = useState<string>('永');
  
  const [hanziData, setHanziData] = useState<HanziData | null>(null);
  const [analysis, setAnalysis] = useState<CharacterAnalysis | null>(null);
  const [idiomAnalysis, setIdiomAnalysis] = useState<IdiomAnalysis | null>(null);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const seen = localStorage.getItem('hasSeenWelcome');
      return !seen;
    }
    return false;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('appSettings');
      if (saved) {
        try {
           return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
        } catch (e) {
           return DEFAULT_SETTINGS;
        }
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('practiceHistory');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return [];
        }
      }
    }
    return [];
  });

  const [currentLang, setCurrentLang] = useState<string>('zh-CN');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved as 'light' | 'dark';
      return 'light';
    }
    return 'light';
  });

  const [animationState, setAnimationState] = useState<AnimationState>(AnimationState.IDLE);
  const [interactionMode, setInteractionMode] = useState<InteractionMode>(InteractionMode.VIEW);
  const [speed, setSpeed] = useState<number>(1);
  const nextModeRef = useRef<InteractionMode>(InteractionMode.VIEW);

  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('practiceHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
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
      if (hanziData && !loading && nextModeRef.current === InteractionMode.PRACTICE) {
          setInteractionMode(InteractionMode.PRACTICE);
          setAnimationState(AnimationState.IDLE);
          nextModeRef.current = InteractionMode.VIEW; 
      }
  }, [hanziData, loading]);

  useEffect(() => {
    handleSearch('永', currentLang);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleDismissWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  const addToHistory = (term: string) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item.char !== term);
      return [{ char: term, timestamp: Date.now() }, ...filtered].slice(20); 
    });
  };

  const fetchCharacterData = async (char: string, langCode: string) => {
    const fetchedData = await fetchHanziData(char);
    if (fetchedData) {
      setHanziData(fetchedData);
      if (settings.autoPlay) {
         setTimeout(() => setAnimationState(AnimationState.PLAYING), 500);
      }
    } else {
      setHanziData(null);
      if (activeTerm.length === 1) {
          setError(`Could not load stroke data for "${char}".`);
      }
    }

    const langName = LANGUAGES.find(l => l.code === langCode)?.name || 'Simplified Chinese';
    try {
        const aiResult = await analyzeCharacter(char, langName, settings.offlineMode, settings.apiKey);
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
    
    setActiveTerm(term);
    const firstChar = term[0];
    setActiveChar(firstChar);

    setAnalysis(null);
    setIdiomAnalysis(null);
    setHanziData(null);
    
    const langName = LANGUAGES.find(l => l.code === langCode)?.name || 'Simplified Chinese';

    if (term.length > 1) {
        try {
            const idiomPromise = analyzeIdiom(term, langName, settings.offlineMode, settings.apiKey);
            await fetchCharacterData(firstChar, langCode);
            const idiomResult = await idiomPromise;
            setIdiomAnalysis(idiomResult);
        } catch (e) {
            console.error("Idiom search error", e);
            setError("Failed to load idiom data.");
        }
    } else {
        await fetchCharacterData(firstChar, langCode);
    }

    setLoading(false);
    setIsAnalysisLoading(false);
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * COMMON_CHARS.length);
    const randomChar = COMMON_CHARS[randomIndex];
    handleSearch(randomChar, currentLang);
  };

  const handleCharSelect = (char: string) => {
      if (char === activeChar) return;
      setActiveChar(char);
      setAnimationState(AnimationState.IDLE);
      setInteractionMode(InteractionMode.VIEW);
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
            setTimeout(() => {
                handleCharSelect(activeTerm[currentIndex + 1]);
                setInteractionMode(InteractionMode.PRACTICE);
            }, 1000);
            return;
        } else {
             addToHistory(activeTerm);
             if (settings.continuousMode) {
                 setTimeout(() => {
                     setInteractionMode(InteractionMode.PRACTICE);
                     handleRandom();
                 }, 1500);
             }
             return;
        }
    }

    addToHistory(activeTerm);

    if (settings.continuousMode) {
      nextModeRef.current = InteractionMode.PRACTICE;
      setTimeout(() => {
         handleRandom();
      }, 1500);
    }
  };

  return {
    state: {
      activeTerm,
      activeChar,
      hanziData,
      analysis,
      idiomAnalysis,
      loading,
      isAnalysisLoading,
      error,
      isOffline,
      isSettingsOpen,
      showWelcome,
      settings,
      history,
      currentLang,
      theme,
      animationState,
      interactionMode,
      speed,
    },
    actions: {
      handleSearch,
      handleRandom,
      handleCharSelect,
      handleLanguageChange,
      handlePracticeComplete,
      handleDismissWelcome,
      toggleTheme,
      setIsSettingsOpen,
      setSettings,
      setHistory,
      setAnimationState,
      setInteractionMode,
      setSpeed,
    }
  };
};