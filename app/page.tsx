// app/page.tsx v2.1.2
'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useAppController } from './hooks/useAppController';
import ReloadPrompt from './components/ReloadPrompt';
const SettingsModal = dynamic(() => import('./components/SettingsModal'));
const AuthModal = dynamic(() => import('./components/auth/AuthModal'));
const WelcomeScreen = dynamic(() => import('./components/WelcomeScreen'));
import Header from './components/Header';
import Footer from './components/Footer';
const ChallengeModal = dynamic(() => import('./components/ChallengeModal'));
import { UI_LABELS } from './locales';
import { AchievementsPanel } from './components/AchievementsPanel';
import { AchievementToast } from './components/AchievementToast';
import { MainContent } from './components/MainContent';

const APP_VERSION = '2.1.2';

export default function Home() {
  const { state, actions } = useAppController();
  const [mounted, setMounted] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
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
        user={state.user}
        newlyUnlocked={state.newlyUnlocked}
        onStartChallenge={actions.startChallenge}
        onShowAchievements={() => setShowAchievements(true)}
        onOpenSettings={() => actions.setIsSettingsOpen(true)}
        onOpenAuth={() => actions.setIsAuthOpen(true)}
        onLogout={actions.handleLogout}
      />

      <MainContent 
        state={state}
        actions={actions}
        labels={labels}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        APP_VERSION={APP_VERSION}
      />

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
      
      {showAchievements && (
        <AchievementsPanel 
          achievements={state.achievements} 
          stats={state.stats} 
          onClose={() => setShowAchievements(false)} 
          labels={labels}
        />
      )}

      <AchievementToast 
        achievements={state.newlyUnlocked} 
        onDismiss={actions.clearNewUnlocked} 
        labels={labels}
      />

      <AuthModal 
        isOpen={state.isAuthOpen}
        onClose={() => actions.setIsAuthOpen(false)}
        labels={labels}
        onSuccess={actions.setUser}
      />
      
      <Footer labels={labels} version={APP_VERSION} />
    </div>
  );
}
