
// app/hooks/useAppController.ts v2.1.2
import { useState, useEffect, useCallback, useMemo } from 'react';
import { AppSettings } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { useInteractionState } from './useInteractionState';
import { useContentFetcher } from './useContentFetcher';
import { useUserProgress } from './useUserProgress';
import { useChallenge } from './useChallenge';
import { useAuthController } from './useAuthController';
import { useSearchController } from './useSearchController';
import { soundService } from '../services/soundService';
import { UI_LABELS } from '../locales';

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
  
  const [currentLang, setCurrentLang] = useState<string>('zh-CN');
  const labels = useMemo(() => UI_LABELS[currentLang] || UI_LABELS['en'], [currentLang]);

  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  const interaction = useInteractionState();
  const content = useContentFetcher(settings);
  const userProgress = useUserProgress();
  const challenge = useChallenge();
  const authController = useAuthController();
  
  const searchController = useSearchController({
    currentLang,
    settings,
    content,
    interaction,
    userProgress
  });

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

  // Initial load from URL - only run once on mount
  useEffect(() => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const charFromUrl = urlParams.get('char');
        const initialChar = charFromUrl && /^[\u4E00-\u9FFF]{1,4}$/.test(charFromUrl) ? charFromUrl : '永';
        searchController.actions.handleSearch(initialChar, currentLang);
    } catch (e) {
        console.warn("Failed to parse URL params", e);
        searchController.actions.handleSearch('一', currentLang);
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

  const handleLanguageChange = (code: string) => {
    setCurrentLang(code);
    if (searchController.state.activeTerm) {
      searchController.actions.handleSearch(searchController.state.activeTerm, code);
    }
  };

  return {
    state: {
      settings,
      theme,
      isOffline,
      isSettingsOpen,
      showWelcome,
      currentLang,
      labels,
      ...searchController.state,
      ...content.state,
      ...interaction.state,
      ...userProgress.state,
      ...challenge.state,
      ...authController.state,
    },
    actions: {
      setSettings,
      toggleTheme,
      setIsOffline,
      setIsSettingsOpen,
      handleDismissWelcome,
      handleLanguageChange,
      ...searchController.actions,
      ...interaction.actions,
      ...userProgress.actions,
      ...challenge.actions,
      ...authController.actions,
    },
  };
};

