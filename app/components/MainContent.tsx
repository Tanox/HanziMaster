// app/components/MainContent.tsx v2.1.2
import React from 'react';
import dynamic from 'next/dynamic';
import SearchInput from './SearchInput';
import WelcomeContent from './dashboard/WelcomeContent';
import MobileTabs from './dashboard/MobileTabs';
import ViewerSection from './dashboard/ViewerSection';
import AnalysisSection from './dashboard/AnalysisSection';
import { UILabels } from '../types';
import { AlertCircle } from 'lucide-react';
import { useAppController } from '../hooks/useAppController';

const RandomSuggestions = dynamic(() => import('./RandomSuggestions'));
const CommonCharacters = dynamic(() => import('./CommonCharacters'));

type AppControllerReturn = ReturnType<typeof useAppController>;

interface MainContentProps {
  state: AppControllerReturn['state'];
  actions: AppControllerReturn['actions'];
  labels: UILabels;
  activeTab: 'viewer' | 'analysis';
  setActiveTab: (tab: 'viewer' | 'analysis') => void;
  APP_VERSION: string;
}

export const MainContent: React.FC<MainContentProps> = ({
  state,
  actions,
  labels,
  activeTab,
  setActiveTab,
  APP_VERSION
}) => {
  return (
    <main id="app-main-content" className="max-w-5xl w-full mx-auto px-4 py-8 flex-grow flex flex-col items-center">
      <div id="intro-header-section" className="w-full max-w-2xl text-center mb-6 md:mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
        {state.settings.showMainTitle && (
          <>
            <h2 className="hidden md:block text-4xl md:text-5xl font-hanzi font-bold text-slate-800 dark:text-white mb-4 tracking-tight">
              {labels.appTitle} <span className="text-sm font-sans font-normal opacity-40 align-middle">v{APP_VERSION}</span>
            </h2>
            <p className="hidden md:block text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto font-light">
              {labels.appSubtitle}
            </p>
          </>
        )}
        
        <div className="w-full max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="w-full max-w-md">
            <SearchInput 
              onSearch={(term) => actions.handleSearch(term, state.currentLang)} 
              isLoading={state.loading} 
              placeholderText={labels.searchPlaceholder}
              invalidCharMessage={labels.errorInvalidChar}
              activeChar={state.activeChar}
              activeTerm={state.activeTerm}
              className="mb-0"
            />
          </div>
        </div>

        {!state.activeChar && !state.loading && (
          <WelcomeContent 
            labels={labels}
            history={state.history}
            currentLang={state.currentLang}
            user={state.user}
            onSearch={actions.handleSearch}
            onClearProgress={actions.clearAllProgress}
            onOpenAuth={() => actions.setIsAuthOpen(true)}
            onOpenSettings={() => actions.setIsSettingsOpen(true)}
            onLogout={actions.handleLogout}
            theme={state.theme}
            onThemeChange={actions.toggleTheme}
            onLanguageChange={actions.handleLanguageChange}
            settings={state.settings}
            onUpdateSettings={actions.setSettings}
          />
        )}
        
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
        
        <MobileTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          labels={labels} 
        />

        <div id="viewer-and-suggestions-column" className={`w-full lg:w-5/12 ${activeTab === 'viewer' ? 'block' : 'hidden lg:block'}`}>
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
            randomButtonLabel={labels.randomBtn}
            actions={{
              handleCharSelect: actions.handleCharSelect,
              setAnimationState: actions.setAnimationState,
              setInteractionMode: actions.setInteractionMode,
              handlePracticeComplete: actions.handlePracticeComplete,
              handleRandom: actions.handleRandom
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
        
        <div id="analysis-and-history-column" className={`w-full lg:w-7/12 mt-8 lg:mt-0 ${activeTab === 'analysis' ? 'block' : 'hidden lg:block'}`}>
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

      {state.settings.showCommonCharacters && (
        <CommonCharacters onSelect={(char) => actions.handleSearch(char, state.currentLang)} labels={labels} />
      )}
    </main>
  );
};
