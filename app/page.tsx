'use client';

import React, { useEffect, useState } from 'react';
import { useAppController } from './hooks/useAppController';
import SearchInput from './components/SearchInput';
const RandomSuggestions = dynamic(() => import('./components/RandomSuggestions'));
const SettingsModal = dynamic(() => import('./components/SettingsModal'));
const ReloadPrompt = dynamic(() => import('./components/ReloadPrompt'));
import dynamic from 'next/dynamic';
const WelcomeScreen = dynamic(() => import('./components/WelcomeScreen'));
import Header from './components/Header';
import Footer from './components/Footer';
import ViewerSection from './components/dashboard/ViewerSection';
import AnalysisSection from './components/dashboard/AnalysisSection';
const CommonCharacters = dynamic(() => import('./components/CommonCharacters'));
const ChallengeModal = dynamic(() => import('./components/ChallengeModal'));
import { UI_LABELS } from './locales';
import { AlertCircle } from 'lucide-react';

const APP_VERSION = '1.3.1';

export default function Home() {
  const { state, actions } = useAppController();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch for local storage dependent state
  if (!mounted) {
    return (
      <div className="min-h-[100dvh] pb-24 bg-paper dark:bg-slate-900 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-teal-500 rounded-full animate-spin" />
      </div>
    );
  }

  const labels = UI_LABELS[state.currentLang] || UI_LABELS['en'];

  return (
    <div id="app-root-container" className="min-h-[100dvh] pb-24 bg-paper dark:bg-slate-900 transition-colors duration-300 flex flex-col">
      {state.showWelcome && (
        <WelcomeScreen 
          onDismiss={actions.handleDismissWelcome} 
          labels={labels} 
          currentLang={state.currentLang}
          onLanguageChange={actions.handleLanguageChange}
        />
      )}

      <Header 
        labels={labels} 
        onOpenSettings={() => actions.setIsSettingsOpen(true)} 
        isOffline={state.isOffline || state.settings.offlineMode}
        version={APP_VERSION}
        onStartChallenge={actions.startChallenge}
      />

      <main id="app-main-content" className="max-w-5xl w-full mx-auto px-4 py-8 flex-grow flex flex-col items-center">
        <div id="intro-header-section" className="w-full max-w-2xl text-center mb-6 md:mb-12">
          <h2 className="hidden md:block text-4xl md:text-5xl font-hanzi font-bold text-slate-800 dark:text-white mb-4 tracking-tight">
            {labels.appTitle} <span className="text-sm font-sans font-normal opacity-40 align-middle">v{APP_VERSION}</span>
          </h2>
          <p className="hidden md:block text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto font-light">
            {labels.appSubtitle}
          </p>
          
          <SearchInput 
            onSearch={(term) => actions.handleSearch(term, state.currentLang)} 
            onRandom={actions.handleRandom}
            isLoading={state.loading} 
            placeholderText={labels.searchPlaceholder}
            invalidCharMessage={labels.errorInvalidChar}
            randomButtonLabel={labels.randomBtn}
            activeChar={state.activeChar}
            activeTerm={state.activeTerm}
          />
          
          <div className="h-14 overflow-hidden">
            {state.error && (
                <div id="error-message-container" className="max-w-md mx-auto p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl flex items-center gap-3 border border-red-100 dark:border-red-900/50 animate-fade-in">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-sm font-medium">{state.error}</p>
                </div>
            )}
          </div>
        </div>

        <div id="content-wrapper" className="w-full flex flex-col lg:flex-row lg:gap-12">
          <div id="viewer-and-suggestions-column" className="w-full lg:w-5/12">
            <ViewerSection 
              activeTerm={state.activeTerm}
              activeChar={state.activeChar}
              activeCharIndex={state.activeCharIndex}
              hanziData={state.hanziData}
              analysis={state.analysis}
              pinyinCache={state.pinyinCache}
              animationState={state.animationState}
              interactionMode={state.interactionMode}
              speed={state.speed}
              settings={state.settings}
              loading={state.loading}
              error={state.error}
              labels={labels}
              actions={{
                handleCharSelect: actions.handleCharSelect,
                setAnimationState: actions.setAnimationState,
                setInteractionMode: actions.setInteractionMode,
                handlePracticeComplete: actions.handlePracticeComplete
              }}
            />
            {state.settings.showRandomSuggestions && (
              <RandomSuggestions 
                onSelect={(char) => actions.handleSearch(char, state.currentLang)} 
                label={labels.randomBtn}
                pinyinCache={state.pinyinCache}
                labels={labels}
              />
            )}
          </div>
          
          <div id="analysis-and-history-column" className="w-full lg:w-7/12 mt-8 lg:mt-0">
            <AnalysisSection 
              analysis={state.analysis}
              idiomAnalysis={state.idiomAnalysis}
              hanziData={state.hanziData}
              isAnalysisLoading={state.isAnalysisLoading}
              currentLang={state.currentLang}
              settings={state.settings}
              history={state.history}
              learnedItems={state.learnedItems}
              dueReviews={state.dueReviews}
              srsData={state.srsData}
              labels={labels}
              actions={{
                handleSearch: actions.handleSearch,
                clearAllProgress: actions.clearAllProgress
              }}
            />
          </div>
        </div>

        <CommonCharacters onSelect={(char) => actions.handleSearch(char, state.currentLang)} labels={labels} />

        <SettingsModal 
          isOpen={state.isSettingsOpen} 
          onClose={() => actions.setIsSettingsOpen(false)}
          settings={state.settings}
          onUpdateSettings={actions.setSettings}
          labels={labels}
          speed={state.speed}
          onSpeedChange={actions.setSpeed}
          currentLang={state.currentLang}
          onLanguageChange={actions.handleLanguageChange}
          currentTheme={state.theme}
          onThemeChange={actions.toggleTheme}
        />
        <ReloadPrompt labels={labels} />
        <ChallengeModal 
          isOpen={state.isChallengeActive}
          onClose={actions.endChallenge}
          character={state.challengeCharacter}
          labels={labels}
          onSubmitScore={actions.submitScore}
          scores={state.scores}
          onClearScores={actions.clearScores}
        />
      </main>
      <Footer labels={labels} version={APP_VERSION} />
    </div>
  );
}
