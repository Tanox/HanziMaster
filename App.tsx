

/**
 * HanziMaster v0.4.2
 */
import React from 'react';
import { useAppController } from './hooks/useAppController.ts';
import { AnimationState, InteractionMode } from './types/index.ts';
import SearchInput from './components/SearchInput.tsx';
import StrokeViewer from './components/StrokeViewer.tsx';
import Controls from './components/Controls.tsx';
import AnalysisPanel from './components/AnalysisPanel.tsx';
import RandomSuggestions from './components/RandomSuggestions.tsx';
import HistoryPanel from './components/HistoryPanel.tsx';
import SettingsModal from './components/SettingsModal.tsx';
import ReloadPrompt from './components/ReloadPrompt.tsx';
import WelcomeScreen from './components/WelcomeScreen.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import IdiomNavigator from './components/IdiomNavigator.tsx';
import { UI_LABELS } from './locales/index.ts';
import { AlertCircle, WifiOff } from 'lucide-react';
import { ToastProvider } from './context/ToastContext.tsx';

const APP_VERSION = '0.4.2';

const AppContent: React.FC = () => {
  const { state, actions } = useAppController();
  const labels = UI_LABELS[state.currentLang] || UI_LABELS['en'];

  return (
    <div className="min-h-[100dvh] pb-24 bg-paper dark:bg-slate-900 transition-colors duration-300 flex flex-col">
      
      {state.showWelcome && <WelcomeScreen onDismiss={actions.handleDismissWelcome} labels={labels} />}

      <Header 
        labels={labels} 
        onOpenSettings={() => actions.setIsSettingsOpen(true)} 
      />

      <main className="max-w-5xl w-full mx-auto px-4 py-8 flex-grow">
        
        <div className="text-center mb-6 md:mb-12">
          <h2 className="hidden md:block text-4xl md:text-5xl font-hanzi font-bold text-slate-800 dark:text-white mb-4 transition-colors tracking-tight">{labels.appTitle}</h2>
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
          
          {state.error && (
            <div className="max-w-md mx-auto mt-4 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl flex items-center gap-3 border border-red-100 dark:border-red-900/50">
              <AlertCircle size={20} className="shrink-0" />
              <p className="text-sm font-medium">{state.error}</p>
            </div>
          )}

          {(state.isOffline || state.settings.offlineMode) && (
             <div className="max-w-md mx-auto mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 rounded-lg flex items-center justify-center gap-2 border border-amber-100 dark:border-amber-900/30 text-sm">
                 <WifiOff size={16} />
                 <span>{state.settings.offlineMode ? (labels.offlineModeEnabled || "Offline Mode Enabled") : (labels.offlineModeActive || "Offline Mode: Using local data & native voice.")}</span>
             </div>
          )}
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-12">
          
          {/* --- Left Column / Mobile Order 1: Viewer --- */}
          <div className="order-1 lg:order-1 lg:col-span-5 flex flex-col items-center">
            
            <IdiomNavigator 
                term={state.activeTerm} 
                activeChar={state.activeChar} 
                activeIndex={state.activeCharIndex}
                onSelectChar={(char, index) => actions.handleCharSelect(char, undefined, index)} 
            />

            {state.hanziData ? (
              <>
                <StrokeViewer 
                  data={state.hanziData}
                  animationState={state.animationState}
                  setAnimationState={actions.setAnimationState}
                  speed={state.speed}
                  mode={state.interactionMode}
                  settings={state.settings}
                  onPracticeComplete={actions.handlePracticeComplete}
                  labels={labels}
                />
                <Controls 
                  animationState={state.animationState}
                  onPlay={() => actions.setAnimationState(AnimationState.PLAYING)}
                  onPause={() => actions.setAnimationState(AnimationState.PAUSED)}
                  onReset={() => {
                      actions.setAnimationState(AnimationState.IDLE);
                      actions.setInteractionMode(InteractionMode.VIEW);
                  }}
                  mode={state.interactionMode}
                  onToggleMode={() => {
                      const newMode = state.interactionMode === InteractionMode.VIEW ? InteractionMode.PRACTICE : InteractionMode.VIEW;
                      actions.setInteractionMode(newMode);
                      if (newMode === InteractionMode.PRACTICE) {
                          actions.setAnimationState(AnimationState.IDLE);
                      }
                  }}
                  char={state.activeChar}
                  labels={{
                    play: labels.controlsPlay,
                    pause: labels.controlsPause,
                    reset: labels.controlsReset,
                    speed: labels.controlsSpeed,
                    practiceMode: labels.practiceMode || "Practice",
                    viewMode: labels.viewMode || "Watch"
                  }}
                  apiKey={state.settings.apiKey}
                />
              </>
            ) : (
              !state.loading && !state.error && (
                <div className="h-64 w-64 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl text-slate-400 dark:text-slate-600 italic">
                  {labels.previewText}
                </div>
              )
            )}
          </div>
          
          {/* --- Mobile Order 2 / Desktop Order 3: Suggestions --- */}
          {state.settings.showRandomSuggestions && (
            <div className="order-2 lg:order-3 lg:col-span-12">
              <RandomSuggestions 
                onSelect={(char) => actions.handleSearch(char, state.currentLang)} 
                label={labels.randomBtn}
                pinyinCache={state.pinyinCache}
                labels={labels}
              />
            </div>
          )}

          {/* --- Right Column / Mobile Order 3: Analysis --- */}
          <div className="order-3 lg:order-2 lg:col-span-7">
            <AnalysisPanel 
                analysis={state.analysis} 
                idiomAnalysis={state.idiomAnalysis}
                hanziData={state.hanziData}
                isLoading={state.isAnalysisLoading} 
                language={state.currentLang} 
                settings={state.settings} 
            />
            
            {state.settings.showHistory && (
              <HistoryPanel 
                 history={state.history} 
                 onSelect={(term) => actions.handleSearch(term, state.currentLang)} 
                 onClear={() => actions.setHistory([])}
                 labels={labels}
              />
            )}
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

const App: React.FC = () => {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
};

export default App;