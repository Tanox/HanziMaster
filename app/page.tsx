'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useAppController } from './hooks/useAppController';
import SearchInput from './components/SearchInput';
import ReloadPrompt from './components/ReloadPrompt';
const RandomSuggestions = dynamic(() => import('./components/RandomSuggestions'));
const SettingsModal = dynamic(() => import('./components/SettingsModal'));
const WelcomeScreen = dynamic(() => import('./components/WelcomeScreen'));
const VideoModal = dynamic(() => import('./components/VideoModal'));
import Header from './components/Header';
import Footer from './components/Footer';
import ViewerSection from './components/dashboard/ViewerSection';
import AnalysisSection from './components/dashboard/AnalysisSection';
const CommonCharacters = dynamic(() => import('./components/CommonCharacters'));
const ChallengeModal = dynamic(() => import('./components/ChallengeModal'));
const LearningPath = dynamic(() => import('./components/LearningPath'));
import { UI_LABELS } from './locales';
import { AlertCircle, Brush, BookOpen, Settings, Video, Share2 } from 'lucide-react';
import ShareButton from './components/ShareButton';

const APP_VERSION = '1.3.1';

export default function Home() {
  const { state, actions } = useAppController();
  const [mounted, setMounted] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'viewer' | 'analysis'>('viewer');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Switch to viewer tab when character changes
  useEffect(() => {
    setActiveTab('viewer');
  }, [state.activeChar]);

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
        isOffline={state.isOffline || state.settings.offlineMode}
        version={APP_VERSION}
      />

      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        char={state.activeChar} 
        labels={labels} 
      />

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
                onRandom={actions.handleRandom}
                isLoading={state.loading} 
                placeholderText={labels.searchPlaceholder}
                invalidCharMessage={labels.errorInvalidChar}
                randomButtonLabel={labels.randomBtn}
                activeChar={state.activeChar}
                activeTerm={state.activeTerm}
                className="mb-0"
              />
            </div>
            
            <div className="flex items-center gap-2 md:gap-3 mb-8 md:mb-0">
               <ShareButton
                  title={labels.shareAppTitle || "Share HanziMaster"}
                  text={(labels.shareAppText || "Check out HanziMaster: {url}").replace('{url}', typeof window !== 'undefined' ? window.location.origin : '')}
                  url={typeof window !== 'undefined' ? window.location.origin : ''}
                  labels={labels}
                  size={20}
                  className="p-3 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm transition-all active:scale-95"
               />
               {state.activeChar && (
                 <button 
                   onClick={() => setIsVideoModalOpen(true)} 
                   className="p-3 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm transition-all active:scale-95"
                   aria-label={labels.generateVideo || 'Generate Video'}
                   title={labels.generateVideo || 'Generate Video'}
                 >
                   <Video size={20} />
                 </button>
               )}
               <button 
                 onClick={actions.startChallenge} 
                 className="p-3 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm transition-all active:scale-95"
                 aria-label={labels.startChallenge || 'Start Challenge'}
                 title={labels.startChallenge || 'Start Challenge'}
               >
                 <Brush size={20} />
               </button>
               <button 
                 onClick={() => actions.setIsSettingsOpen(true)} 
                 className="p-3 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm transition-all active:scale-95"
                 aria-label="Settings"
                 title={labels.settingsTitle || 'Settings'}
               >
                 <Settings size={20} />
               </button>
            </div>
          </div>

          {!state.activeChar && !state.loading && (
            <div className="mt-8 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
              {state.history && state.history.length > 0 && (
                <div className="w-full max-w-lg">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">{labels.recentHistory}</span>
                    <button 
                      onClick={actions.clearAllProgress}
                      className="text-[10px] text-slate-400 hover:text-red-500 transition-colors uppercase tracking-tighter"
                    >
                      {labels.clearBtn}
                    </button>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {state.history.slice(0, 8).map((item) => (
                      <button
                        key={`${item.char}-${item.timestamp}`}
                        onClick={() => actions.handleSearch(item.char, state.currentLang)}
                        className="px-4 py-2 text-lg font-hanzi bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all active:scale-95"
                      >
                        {item.char}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="w-full max-w-lg">
                <div className="flex items-center justify-center mb-3">
                  <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">{labels.tryCharacters}</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {['永', '福', '爱', '和', '梦', '龙', '静', '美'].map((char) => (
                    <button
                      key={char}
                      onClick={() => actions.handleSearch(char, state.currentLang)}
                      className="px-4 py-2 text-lg font-hanzi bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 transition-all active:scale-95"
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>

              <LearningPath 
                labels={labels} 
                onSelectChar={(char) => actions.handleSearch(char, state.currentLang)} 
              />
            </div>
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
          
          {/* Mobile Tabs */}
          <div className="lg:hidden w-full max-w-md mx-auto mb-6 flex p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl">
            <button
              onClick={() => setActiveTab('viewer')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'viewer'
                  ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Brush size={16} />
              {labels.viewMode || 'Watch'}
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'analysis'
                  ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <BookOpen size={16} />
              {labels.sectionContent || 'Content'}
            </button>
          </div>

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
