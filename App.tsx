/**
 * HanziMaster v0.3.1
 */
import React, { useState, useEffect, useRef } from 'react';
import { fetchHanziData } from './services/hanziService';
import { analyzeCharacter } from './services/geminiService';
import { HanziData, CharacterAnalysis, AnimationState, InteractionMode, AppSettings, HistoryItem } from './types';
import SearchInput from './components/SearchInput';
import StrokeViewer from './components/StrokeViewer';
import Controls from './components/Controls';
import AnalysisPanel from './components/AnalysisPanel';
import RandomSuggestions from './components/RandomSuggestions';
import HistoryPanel from './components/HistoryPanel';
import SettingsModal from './components/SettingsModal';
import ReloadPrompt from './components/ReloadPrompt';
import WelcomeScreen from './components/WelcomeScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import { LANGUAGES, UI_LABELS } from './locales';
import { AlertCircle, WifiOff } from 'lucide-react';
import { COMMON_CHARS } from './utils/commonChars';

const APP_VERSION = '0.3.1';

const DEFAULT_SETTINGS: AppSettings = {
  apiKey: '', 
  gridStyle: 'rice',
  showOutline: true,
  autoPlay: true,
  continuousMode: false,
  offlineMode: false,
  showRandomSuggestions: false,
  showHistory: true,
  showStructure: true,
  showEtymology: true,
  showMnemonic: true,
  showExamples: true,
};

const App: React.FC = () => {
  const [activeChar, setActiveChar] = useState<string>('永');
  const [hanziData, setHanziData] = useState<HanziData | null>(null);
  const [analysis, setAnalysis] = useState<CharacterAnalysis | null>(null);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState<boolean>(false);
  
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('appSettings');
      if (saved) {
        try {
           return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
        } catch (e) {
           return DEFAULT_SETTINGS;
        }
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('practiceHistory');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return [];
        }
      }
    }
    return [];
  });

  const [showWelcome, setShowWelcome] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const seen = localStorage.getItem('hasSeenWelcome');
      return !seen;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('practiceHistory', JSON.stringify(history));
  }, [history]);
  
  const [currentLang, setCurrentLang] = useState<string>('zh-CN');

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved as 'light' | 'dark';
      return 'light';
    }
    return 'light';
  });

  const [animationState, setAnimationState] = useState<AnimationState>(AnimationState.IDLE);
  const [interactionMode, setInteractionMode] = useState<InteractionMode>(InteractionMode.VIEW);
  const [speed, setSpeed] = useState<number>(1);

  const labels = UI_LABELS[currentLang] || UI_LABELS['en'];

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

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

  useEffect(() => {
    handleSearch('永', currentLang);
  }, []);

  const handleSearch = async (char: string, langCode: string = currentLang) => {
    setLoading(true); 
    setIsAnalysisLoading(true); 
    setError(null);
    setAnimationState(AnimationState.IDLE);
    setInteractionMode(InteractionMode.VIEW); 
    setActiveChar(char);
    setAnalysis(null);
    setHanziData(null);
    
    const langName = LANGUAGES.find(l => l.code === langCode)?.name || 'Simplified Chinese';
    
    const aiPromise = analyzeCharacter(char, langName, settings.offlineMode, settings.apiKey);

    let fetchedData: HanziData | null = null;

    try {
      fetchedData = await fetchHanziData(char);

      if (fetchedData) {
        setHanziData(fetchedData);
        setLoading(false); 
        
        if (settings.autoPlay) {
          setTimeout(() => setAnimationState(AnimationState.PLAYING), 500);
        }
      } else {
        setError(`Could not load stroke data for "${char}". It might not be a standard Chinese character.`);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected network error occurred. Please try again.");
      setLoading(false);
    }

    try {
        const aiResult = await aiPromise;
        
        if (fetchedData && aiResult && aiResult.meaning.startsWith("Mode:")) {
             setAnalysis({
                 ...aiResult,
                 strokeCount: fetchedData.strokes.length
             });
        } else if (aiResult) {
             setAnalysis(aiResult);
        }
    } catch (err) {
        console.error("AI Analysis failed silently:", err);
    } finally {
        setIsAnalysisLoading(false);
    }
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * COMMON_CHARS.length);
    const randomChar = COMMON_CHARS[randomIndex];
    handleSearch(randomChar, currentLang);
  };

  const addToHistory = (char: string) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item.char !== char);
      return [{ char, timestamp: Date.now() }, ...filtered].slice(20); 
    });
  };

  const handlePracticeComplete = () => {
    addToHistory(activeChar);

    if (settings.continuousMode) {
      setTimeout(() => {
         setInteractionMode(InteractionMode.PRACTICE);
         handleRandom();
      }, 1500);
    }
  };

  const nextModeRef = useRef<InteractionMode>(InteractionMode.VIEW);

  useEffect(() => {
      if (hanziData && !loading && nextModeRef.current === InteractionMode.PRACTICE) {
          setInteractionMode(InteractionMode.PRACTICE);
          setAnimationState(AnimationState.IDLE);
          nextModeRef.current = InteractionMode.VIEW; 
      }
  }, [hanziData, loading]);


  const handleLanguageChange = (code: string) => {
    setCurrentLang(code);
    if (activeChar) {
      handleSearch(activeChar, code);
    }
  };
  
  const handleDismissWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  return (
    <div className="min-h-[100dvh] pb-24 bg-paper dark:bg-slate-900 transition-colors duration-300 flex flex-col">
      
      {showWelcome && <WelcomeScreen onDismiss={handleDismissWelcome} labels={labels} />}

      <Header 
        labels={labels} 
        onOpenSettings={() => setIsSettingsOpen(true)} 
      />

      <main className="max-w-5xl w-full mx-auto px-4 py-8 flex-grow">
        
        <div className="text-center mb-6 md:mb-12">
          <h2 className="hidden md:block text-4xl md:text-5xl font-hanzi font-bold text-slate-800 dark:text-white mb-4 transition-colors tracking-tight">{labels.appTitle}</h2>
          <p className="hidden md:block text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto font-light">
            {labels.appSubtitle}
          </p>
          
          <SearchInput 
            onSearch={(char) => handleSearch(char, currentLang)} 
            onRandom={handleRandom}
            isLoading={loading} 
            placeholderText={labels.searchPlaceholder}
            invalidCharMessage={labels.errorInvalidChar}
            randomButtonLabel={labels.randomBtn}
            activeChar={activeChar}
          />
          
          {error && (
            <div className="max-w-md mx-auto mt-4 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl flex items-center gap-3 border border-red-100 dark:border-red-900/50">
              <AlertCircle size={20} className="shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {(isOffline || settings.offlineMode) && (
             <div className="max-w-md mx-auto mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 rounded-lg flex items-center justify-center gap-2 border border-amber-100 dark:border-amber-900/30 text-sm">
                 <WifiOff size={16} />
                 <span>{settings.offlineMode ? labels.settingOfflineMode + " Enabled" : "Offline Mode: Using local data & native voice."}</span>
             </div>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
          <div className="lg:col-span-5 flex flex-col items-center">
            {hanziData ? (
              <>
                <StrokeViewer 
                  data={hanziData}
                  animationState={animationState}
                  setAnimationState={setAnimationState}
                  speed={speed}
                  mode={interactionMode}
                  settings={settings}
                  onPracticeComplete={() => {
                      if (settings.continuousMode) {
                          nextModeRef.current = InteractionMode.PRACTICE;
                      }
                      handlePracticeComplete();
                  }}
                  labels={labels}
                />
                <Controls 
                  animationState={animationState}
                  onPlay={() => setAnimationState(AnimationState.PLAYING)}
                  onPause={() => setAnimationState(AnimationState.PAUSED)}
                  onReset={() => {
                      setAnimationState(AnimationState.IDLE);
                      setInteractionMode(InteractionMode.VIEW);
                  }}
                  mode={interactionMode}
                  onToggleMode={() => {
                      const newMode = interactionMode === InteractionMode.VIEW ? InteractionMode.PRACTICE : InteractionMode.VIEW;
                      setInteractionMode(newMode);
                      if (newMode === InteractionMode.PRACTICE) {
                          setAnimationState(AnimationState.IDLE);
                      }
                  }}
                  char={activeChar}
                  labels={{
                    play: labels.controlsPlay,
                    pause: labels.controlsPause,
                    reset: labels.controlsReset,
                    speed: labels.controlsSpeed,
                    practiceMode: labels.practiceMode || "Practice",
                    viewMode: labels.viewMode || "Watch"
                  }}
                  apiKey={settings.apiKey}
                />
                <div className="mt-6 md:mt-8 text-center min-h-[1.5rem]">
                   {interactionMode === InteractionMode.VIEW && (
                       <p className="text-slate-400 dark:text-slate-500 text-sm animate-fade-in font-medium">
                         {animationState === AnimationState.PLAYING || animationState === AnimationState.PAUSED ? labels.strokeStatusActive : labels.strokeStatusComplete}
                       </p>
                   )}
                   {interactionMode === InteractionMode.PRACTICE && settings.continuousMode && (
                        <p className="text-teal-600 dark:text-teal-400 text-sm font-medium animate-pulse">
                            {labels.settingContinuousMode}
                        </p>
                   )}
                </div>
              </>
            ) : (
              !loading && !error && (
                <div className="h-64 w-64 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl text-slate-400 dark:text-slate-600 italic">
                  {labels.previewText}
                </div>
              )
            )}
          </div>

          <div className="lg:col-span-7">
            <AnalysisPanel analysis={analysis} isLoading={isAnalysisLoading} language={currentLang} settings={settings} />
            
            {settings.showHistory && (
              <HistoryPanel 
                 history={history} 
                 onSelect={(char) => handleSearch(char, currentLang)} 
                 onClear={() => setHistory([])}
                 labels={labels}
              />
            )}
          </div>
        </div>

        {settings.showRandomSuggestions && (
          <RandomSuggestions 
            onSelect={(char) => handleSearch(char, currentLang)} 
            label={labels.randomBtn}
          />
        )}
        
        <SettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onUpdateSettings={setSettings}
          labels={labels}
          speed={speed}
          onSpeedChange={setSpeed}
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          currentTheme={theme}
          onThemeChange={toggleTheme}
        />
        
        <ReloadPrompt />

      </main>

      <Footer labels={labels} version={APP_VERSION} />
    </div>
  );
};

export default App;