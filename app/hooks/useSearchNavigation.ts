import { useState, useCallback, useEffect, useRef } from 'react';
import { InteractionMode, AnimationState } from '../types';
import { COMMON_CHARS } from '../constants/commonChars';
import { useContentFetcher } from './useContentFetcher';
import { useInteractionState } from './useInteractionState';
import { useUserProgress } from './useUserProgress';
import { AppSettings } from '../types';

export interface UseSearchNavigationDeps {
  content: ReturnType<typeof useContentFetcher>;
  interaction: ReturnType<typeof useInteractionState>;
  userProgress: ReturnType<typeof useUserProgress>;
}

export interface UseSearchNavigationProps {
  currentLang: string;
  autoPlay: boolean;
  continuousMode: boolean;
  onPracticeComplete?: (result: unknown) => void;
}

export const useSearchNavigation = (
  props: UseSearchNavigationProps,
  deps: UseSearchNavigationDeps
) => {
  const { currentLang, autoPlay, continuousMode, onPracticeComplete } = props;
  const { content, interaction, userProgress } = deps;
  
  const [activeTerm, setActiveTerm] = useState<string>('一');
  const [activeChar, setActiveChar] = useState<string>('一');
  const [activeCharIndex, setActiveCharIndex] = useState<number>(0);
  const [searchId, setSearchId] = useState(0);
  const searchCallbacksRef = useRef({ onPracticeComplete });
  searchCallbacksRef.current.onPracticeComplete = onPracticeComplete;

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

    userProgress.actions.addToHistoryAndStats(term);

    const charDataPromise = content.actions.fetchCharacter(firstChar, langCode);
    const idiomPromise = term.length > 1 ? content.actions.fetchIdiom(term, langCode) : Promise.resolve();

    const [charDataResult] = await Promise.all([charDataPromise, idiomPromise]);

    setSearchId(prev => {
      if (prev === currentSearchId) {
        if (charDataResult && autoPlay) {
          setTimeout(() => interaction.actions.setAnimationState(AnimationState.PLAYING), 500);
        }
        content.actions.setLoading(false);
        content.actions.setIsAnalysisLoading(false);
      }
      return prev;
    });
  }, [currentLang, content.actions, interaction.actions, autoPlay, userProgress.actions]);

  const handleRandom = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * COMMON_CHARS.length);
    const randomChar = COMMON_CHARS[randomIndex];
    handleSearch(randomChar, currentLang);
  }, [handleSearch, currentLang]);

  const handleCharSelect = useCallback((char: string, explicitMode?: InteractionMode, index?: number) => {
    const targetIndex = index !== undefined ? index : activeTerm.indexOf(char);
    
    if (char === activeChar && targetIndex === activeCharIndex && !explicitMode) return;
    
    setActiveChar(char);
    if (targetIndex >= 0) setActiveCharIndex(targetIndex);
    
    interaction.actions.setAnimationState(AnimationState.IDLE);
    
    const targetMode = explicitMode || (interaction.state.maintainModeRef.current || InteractionMode.VIEW);
    interaction.actions.setInteractionMode(targetMode);
    
    content.actions.fetchCharacter(char, currentLang).then((data) => {
      if (data && autoPlay && targetMode !== InteractionMode.PRACTICE) {
        setTimeout(() => interaction.actions.setAnimationState(AnimationState.PLAYING), 500);
      }
    });
  }, [activeTerm, activeCharIndex, activeChar, interaction, content, currentLang, autoPlay]);

  const handlePracticeComplete = useCallback((result: { score: number }) => {
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
        if (continuousMode) {
          setTimeout(handleRandom, 1500);
        }
      }
    } else {
      userProgress.actions.addToHistoryAndStats(activeChar);
      if (continuousMode) {
        setTimeout(handleRandom, 1500);
      }
    }
  }, [activeChar, activeTerm, activeCharIndex, userProgress, interaction, continuousMode, handleCharSelect, handleRandom]);

  return {
    state: { 
      activeTerm, 
      activeChar, 
      activeCharIndex, 
      searchId 
    },
    actions: { 
      handleSearch, 
      handleRandom, 
      handleCharSelect,
      handlePracticeComplete 
    }
  };
};
