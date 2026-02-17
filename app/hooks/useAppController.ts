/**
 * app/hooks/useAppController.ts v0.7.1
 */
import { useState, useEffect } from 'react';
import { HistoryItem, AppSettings, InteractionMode, AnimationState } from '../types';
import { COMMON_CHARS } from '../constants/commonChars';
import { useLocalStorage } from './useLocalStorage';
import { useInteractionState } from './useInteractionState';
import { useContentFetcher } from './useContentFetcher';
import { UI_LABELS } from '../locales';

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
  const [settings, setSettings] = useLocalStorage<AppSettings>('appSettings', DEFAULT_SETTINGS);
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('practiceHistory', []);
  const [learnedItems, setLearnedItems] = useLocalStorage<string[]>('learnedItems', []);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  const [hasSeenWelcome, setHasSeenWelcome] = useLocalStorage<boolean>('hasSeenWelcome', false);
  
  const [activeTerm, setActiveTerm] = useState<string>('永');
  const [activeChar, setActiveChar] = useState<string>('永');
  const [activeCharIndex, setActiveCharIndex] = useState<number>(0);
  const [currentLang, setCurrentLang] = useState<string>('zh-CN');
  
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  const interaction = useInteractionState();
  const content = useContentFetcher(settings);

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
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const charFromUrl = urlParams.get('char');
        const initialChar = charFromUrl && /^[\u4E00-\u9FFF]{1,4}$/.test(charFromUrl) ? charFromUrl : '永';
        handleSearch(initialChar, currentLang);
    } catch (e) {
        console.warn("Failed to parse URL params", e);
        handleSearch('永', currentLang);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleDismissWelcome = () => {
    setShowWelcome(false);
    setHasSeenWelcome(true);
  };

  const addToHistoryAndStats = (term: string) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item.char !== term);
      return [{ char: term, timestamp: Date.now() }, ...filtered].slice(0, 20); 
    });

    setLearnedItems(prev => {
        if (prev.includes(term)) return prev;
        return [...prev, term];
    });
  };

  const handleSearch = async (term: string, langCode: string = currentLang) => {
    content.actions.setLoading(true); 
    content.actions.setIsAnalysisLoading(true); 
    content.actions.resetData();
    interaction.actions.resetInteraction();
    
    try {
        const currentUrlStr = window.location.href;
        if (currentUrlStr.startsWith('http') && !currentUrlStr.includes('blob:')) {
            const url = new URL(currentUrlStr);
            url.searchParams.set('char', term);
            window.history.pushState({ char: term }, '', url.toString());
        }
    } catch (e) {
        console.debug("Skipping pushState: environment restricted origin or non-standard protocol.");
    }

    setActiveTerm(term);
    const firstChar = term[0];
    setActiveChar(firstChar);
    setActiveCharIndex(0);

    const promises: Promise<any>[] = [
        content.actions.fetchCharacter(firstChar, langCode).then((data) => {
            if (data && settings.autoPlay) {
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
             addToHistoryAndStats(activeTerm);
             if (settings.continuousMode) {
                 setTimeout(handleRandom, 1500);
             }
        }
    } else {
        addToHistoryAndStats(activeChar);
         if (settings.continuousMode) {
             setTimeout(handleRandom, 1500);
         }
    }
  };

  return {
    state: {
      settings,
      history,
      learnedItems,
      theme,
      isOffline,
      isSettingsOpen,
      showWelcome,
      activeTerm,
      activeChar,
      activeCharIndex,
      currentLang,
      ...content.state,
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
      ...interaction.actions,
    },
  };
};