
// app/hooks/useAppController.ts v1.7.0 - Refactored
import { useState, useEffect, useMemo } from 'react';
import { UI_LABELS } from '../locales';
import { useAuth } from './useAuth';
import { useAppSettings } from './useAppSettings';
import { useSearchNavigation } from './useSearchNavigation';
import { useChallengeMode } from './useChallengeMode';
import { useOffline } from './useOffline';
import { useInteractionState } from './useInteractionState';
import { useContentFetcher } from './useContentFetcher';
import { useUserProgress } from './useUserProgress';

export const useAppController = () => {
  const auth = useAuth();
  const settings = useAppSettings();
  const offline = useOffline();
  const challenge = useChallengeMode();
  
  const [currentLang, setCurrentLang] = useState<string>('zh-CN');
  const labels = useMemo(() => UI_LABELS[currentLang] || UI_LABELS['en'], [currentLang]);

  const interaction = useInteractionState();
  const content = useContentFetcher(settings.state.settings);
  const userProgress = useUserProgress();

  const navigation = useSearchNavigation(
    {
      currentLang,
      autoPlay: settings.state.settings.autoPlay,
      continuousMode: settings.state.settings.continuousMode,
    },
    {
      content,
      interaction,
      userProgress
    }
  );

  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const charFromUrl = urlParams.get('char');
      const initialChar = charFromUrl && /^[\u4E00-\u9FFF]{1,4}$/.test(charFromUrl) ? charFromUrl : '永';
      navigation.actions.handleSearch(initialChar, currentLang);
    } catch (e) {
      console.warn("Failed to parse URL params", e);
      navigation.actions.handleSearch('一', currentLang);
    }
  }, []);

  const handleLanguageChange = (code: string) => {
    setCurrentLang(code);
    if (navigation.state.activeTerm) {
      navigation.actions.handleSearch(navigation.state.activeTerm, code);
    }
  };

  return {
    state: {
      ...auth.state,
      ...settings.state,
      ...offline.state,
      ...challenge.state,
      currentLang,
      labels,
      ...navigation.state,
      ...content.state,
      ...interaction.state,
      ...userProgress.state,
    },
    actions: {
      ...auth.actions,
      ...settings.actions,
      ...offline.actions,
      ...challenge.actions,
      setCurrentLang: handleLanguageChange,
      ...navigation.actions,
      ...content.actions,
      ...interaction.actions,
      ...userProgress.actions,
    },
  };
};
