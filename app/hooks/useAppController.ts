
// app/hooks/useAppController.ts v1.3.0
import { useState, useEffect, useCallback } from 'react';
import { AppSettings, InteractionMode, AnimationState, PracticeResult } from '../types';
import { Score } from '../components/Leaderboard';
import { COMMON_CHARS } from '../constants/commonChars';
import { useLocalStorage } from './useLocalStorage';
import { useInteractionState } from './useInteractionState';
import { useContentFetcher } from './useContentFetcher';
import { useUserProgress } from './useUserProgress';
import { soundService } from '../services/soundService';

const DEFAULT_SETTINGS: AppSettings = {
  gridStyle: 'rice',
  showOutline: true,
  autoPlay: true,
  continuousMode: false,
  offlineMode: false,
  soundEffects: true,
  showRandomSuggestions: true,
  showHistory: true,
  showStructure: true,
  showEtymology: true,
  showMnemonic: true,
  showExamples: true,
  showMainTitle: false,
  showCommonCharacters: true,
};

export const useAppController = () => {
  const [settings, setSettings] = useLocalStorage<AppSettings>('appSettings', DEFAULT_SETTINGS);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  const [hasSeenWelcome, setHasSeenWelcome] = useLocalStorage<boolean>('hasSeenWelcome', false);
  
  const [activeTerm, setActiveTerm] = useState<string>('一');
  const [activeChar, setActiveChar] = useState<string>('一');
  const [activeCharIndex, setActiveCharIndex] = useState<number>(0);
  const [currentLang, setCurrentLang] = useState<string>('zh-CN');
  
  const [scores, setScores] = useLocalStorage<Score[]>('leaderboardScores', []);
  const [isChallengeActive, setIsChallengeActive] = useState<boolean>(false);
  const [challengeCharacter, setChallengeCharacter] = useState<string>('');

  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  const interaction = useInteractionState();
  const content = useContentFetcher(settings);
  const userProgress = useUserProgress();

  useEffect(() => {
    setIsOffline(!navigator.onLine);
    setShowWelcome(!hasSeenWelcome);
    soundService.preloadSounds();
  }, [hasSeenWelcome]); 

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

  const [searchId, setSearchId] = useState(0);

  const handleSearch = useCallback(async (term: string, langCode: string = currentLang) => {
    const currentSearchId = Date.now();
    setSearchId(currentSearchId);
    
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

    const charDataPromise = content.actions.fetchCharacter(firstChar, langCode);
    const idiomPromise = term.length > 1 ? content.actions.fetchIdiom(term, langCode) : Promise.resolve();

    const [charDataResult] = await Promise.all([charDataPromise, idiomPromise]);

    // Only apply results if this is still the most recent search
    setSearchId(prev => {
      if (prev === currentSearchId) {
        if (charDataResult && settings.autoPlay) {
          setTimeout(() => interaction.actions.setAnimationState(AnimationState.PLAYING), 500);
        }
        content.actions.setLoading(false);
        content.actions.setIsAnalysisLoading(false);
      }
      return prev;
    });
  }, [currentLang, content.actions, interaction.actions, settings.autoPlay]);

  // Initial load from URL - only run once on mount
  useEffect(() => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const charFromUrl = urlParams.get('char');
        const initialChar = charFromUrl && /^[\u4E00-\u9FFF]{1,4}$/.test(charFromUrl) ? charFromUrl : '永';
        handleSearch(initialChar, currentLang);
    } catch (e) {
        console.warn("Failed to parse URL params", e);
        handleSearch('一', currentLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleDismissWelcome = () => {
    setShowWelcome(false);
    setHasSeenWelcome(true);
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

  const handlePracticeComplete = (result: PracticeResult) => {
    // Always update SRS for the current character
    userProgress.actions.updateSRS(activeChar, result);

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
             userProgress.actions.addToHistoryAndStats(activeTerm);
             if (settings.continuousMode) {
                 setTimeout(handleRandom, 1500);
             }
        }
    } else {
        userProgress.actions.addToHistoryAndStats(activeChar);
         if (settings.continuousMode) {
             setTimeout(handleRandom, 1500);
         }
    }
  };

  const startChallenge = () => {
    const randomIndex = Math.floor(Math.random() * COMMON_CHARS.length);
    const char = COMMON_CHARS[randomIndex];
    setChallengeCharacter(char);
    setIsChallengeActive(true);
  };

  const endChallenge = () => {
    setIsChallengeActive(false);
  };

  const submitScore = (score: number) => {
    const newScore: Score = {
      character: challengeCharacter,
      score,
      timestamp: Date.now(),
    };
    setScores(prevScores => [...prevScores, newScore]);
  };

  const clearScores = () => {
    setScores([]);
  };

  return {
    state: {
      settings,
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
      ...userProgress.state,
      scores,
      isChallengeActive,
      challengeCharacter,
    },
    actions: {
      setSettings,
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
      ...userProgress.actions,
      startChallenge,
      endChallenge,
      submitScore,
      clearScores,
    },
  };
};
