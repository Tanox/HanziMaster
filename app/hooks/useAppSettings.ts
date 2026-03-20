import { useState, useEffect } from 'react';
import { AppSettings } from '../types';
import { useLocalStorage } from './useLocalStorage';
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

export const useAppSettings = () => {
  const [settings, setSettings] = useLocalStorage<AppSettings>('appSettings', DEFAULT_SETTINGS);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  const [hasSeenWelcome, setHasSeenWelcome] = useLocalStorage<boolean>('hasSeenWelcome', false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  useEffect(() => {
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

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleDismissWelcome = () => {
    setShowWelcome(false);
    setHasSeenWelcome(true);
  };

  return {
    state: { 
      settings, 
      theme, 
      hasSeenWelcome, 
      isSettingsOpen, 
      showWelcome 
    },
    actions: { 
      setSettings, 
      setTheme, 
      setHasSeenWelcome, 
      setIsSettingsOpen, 
      toggleTheme, 
      handleDismissWelcome 
    }
  };
};
