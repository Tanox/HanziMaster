
// App.tsx v1.1.5
import React from 'react';
import { useAppController } from './app/hooks/useAppController';
import SearchInput from './app/components/SearchInput';
import RandomSuggestions from './app/components/RandomSuggestions';
import SettingsModal from './app/components/SettingsModal';
import ReloadPrompt from './app/components/ReloadPrompt';
import WelcomeScreen from './app/components/WelcomeScreen';
import Header from './app/components/Header';
import Footer from './app/components/Footer';
import ViewerSection from './app/components/dashboard/ViewerSection';
import AnalysisSection from './app/components/dashboard/AnalysisSection';
import { UI_LABELS } from './app/locales';
import { AlertCircle } from 'lucide-react';
import { ToastProvider } from './app/context/ToastContext';

const APP_VERSION = '1.1.5';

const AppContent: React.FC = () => {
  const { state, actions } = useAppController();
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
        currentLang={state.currentLang}
      />

      <main id="app-main-content" className="max-w-5xl w-full mx-auto px-4 py-8 flex-grow">
        <div id="intro-header-section" className="text-center mb-6 md:mb-12">
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

        <div id="main-grid-layout" className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-12">
          <div id="left-column-viewer-wrapper" className="order-1 lg:order-1 lg:col-span-5">
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
          </div>
          
          {state.settings.showRandomSuggestions && (
            <div id="center-column-suggestions" className="order-2 lg:order-3 lg:col-span-12">
              <RandomSuggestions 
                onSelect={(char) => actions.handleSearch(char, state.currentLang)} 
                label={labels.randomBtn}
                pinyinCache={state.pinyinCache}
                labels={labels}
              />
            </div>
          )}

          <div id="right-column-analysis-wrapper" className="order-3 lg:order-2 lg:col-span-7">
            <AnalysisSection 
              analysis={state.analysis}
              idiomAnalysis={state.idiomAnalysis}
              hanziData={state.hanziData}
              isAnalysisLoading={state.isAnalysisLoading}
              currentLang={state.currentLang}
              settings={state.settings}
              history={state.history}
              learnedItems={state.learnedItems}
              labels={labels}
              actions={{
                handleSearch: actions.handleSearch,
                clearAllProgress: actions.clearAllProgress
              }}
            />
          </div>
        </div>
        
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
      </main>
      <Footer labels={labels} version={APP_VERSION} />
    </div>
  );
};

const App: React.FC = () => (
  <ToastProvider>
    <AppContent />
  </ToastProvider>
);

export default App;
