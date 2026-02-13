
/**
 * HanziMaster v0.4.9
 */
import { useState, useEffect } from 'react';
import { HistoryItem, AppSettings, InteractionMode, AnimationState } from '../types';
import { COMMON_CHARS } from '../constants/commonChars';
import { useLocalStorage } from './useLocalStorage';
import { useInteractionState } from './useInteractionState';
import { useContentFetcher } from './useContentFetcher';

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
  // --- Persistent Global State ---
  const [settings, setSettings] = useLocalStorage<AppSettings>('appSettings', DEFAULT_SETTINGS);
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('practiceHistory', []);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  const [hasSeenWelcome, setHasSeenWelcome] = useLocalStorage<boolean>('hasSeenWelcome', false);
  
  // --- UI State ---
  const [activeTerm, setActiveTerm] = useState<string>('永');
  const [activeChar, setActiveChar] = useState<string>('永');
  const [activeCharIndex, setActiveCharIndex] = useState<number>(0);
  const [currentLang, setCurrentLang] = useState<string>('zh-CN');
  
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  // --- Sub-Hooks ---
  const interaction = useInteractionState();
  const content = useContentFetcher(settings);

  // --- Effects ---

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

  // --- Actions ---

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
      return [{ char: term, timestamp: Date.now() }, ...filtered].slice(0, 20); 
    });
  };

  // Main Orchestrator: Search
  const handleSearch = async (term: string, langCode: string = currentLang) => {
    content.actions.setLoading(true); 
    content.actions.setIsAnalysisLoading(true); 
    content.actions.resetData();
    interaction.actions.resetInteraction();
    
    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set('char', term);
    window.history.pushState({}, '', url);

    setActiveTerm(term);
    const firstChar = term[0];
    setActiveChar(firstChar);
    setActiveCharIndex(0);

    // Parallel Fetching
    const promises: Promise<any>[] = [
        content.actions.fetchCharacter(firstChar, langCode).then((data) => {
            if (data && settings.autoPlay) {
                // We use a small timeout to let the view render before playing
                setTimeout(() => interaction.actions.setAnimationState(AnimationState.PLAYING), 500);
            }
        })
    ];

    if (term.length > 1) {
        promises.push(content.actions.fetchIdiom(term, langCode));
    }

    await Promise.all(promises);

    content.actions.setLoading(false);
    content.actions.setIsAnalysisLoading(false);
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * COMMON_CHARS.length);
    const randomChar = COMMON_CHARS[randomIndex];
    handleSearch(randomChar, currentLang);
  };

  // Main Orchestrator: Select Char within Idiom
  const handleCharSelect = (char: string, explicitMode?: InteractionMode, index?: number) => {
      const targetIndex = index !== undefined ? index : activeTerm.indexOf(char);
      
      if (char === activeChar && targetIndex === activeCharIndex && !explicitMode) return;
      
      setActiveChar(char);
      if (targetIndex >= 0) setActiveCharIndex(targetIndex);
      
      interaction.actions.setAnimationState(AnimationState.IDLE);
      
      const targetMode = explicitMode || (interaction.state.maintainModeRef.current || InteractionMode.VIEW);
      interaction.actions.setInteractionMode(targetMode);
      
      content.actions.fetchCharacter(char, currentLang).then((data) => {
          if (data && settings.autoPlay && targetMode !== InteractionMode.PRACTICE) {
              setTimeout(() => interaction.actions.setAnimationState(AnimationState.PLAYING), 500);
          }
      });
  };

  const handleLanguageChange = (code: string) => {
    setCurrentLang(code);
    if (activeTerm) {
      handleSearch(activeTerm, code);
    }
  };

  // Main Orchestrator: Practice Flow
  const handlePracticeComplete = () => {
    if (activeTerm.length > 1) {
        if (activeCharIndex < activeTerm.length - 1) {
            interaction.state.maintainModeRef.current = InteractionMode.PRACTICE;
            setTimeout(() => {
                const nextIndex = activeCharIndex + 1;
                handleCharSelect(activeTerm[nextIndex], InteractionMode.PRACTICE, nextIndex);
            }, 1000);
            return;
        } else {
             interaction.state.maintainModeRef.current = null;
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
      // App Global
      settings,
      history,
      theme,
      isOffline,
      isSettingsOpen,
      showWelcome,
      // Selection
      activeTerm,
      activeChar,
      activeCharIndex,
      currentLang,
      // Content (spread from hook)
      ...content.state,
      // Interaction (spread from hook)
      ...interaction.state,
    },
    actions: {
      setSettings,
      setHistory,
      toggleTheme,
      setIsOffline,
      setIsSettingsOpen,
      handleDismissWelcome,
      handleSearch,
      handleRandom,
      handleCharSelect,
      handleLanguageChange,
      handlePracticeComplete,
      // Interaction Actions
      ...interaction.actions,
    },
  };
};
