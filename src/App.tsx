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
import InstallPWA from './components/InstallPWA';
import WelcomeScreen from './components/WelcomeScreen';
import { LANGUAGES, UI_LABELS } from './locales';
import { Brush, AlertCircle, WifiOff, Settings, Github } from 'lucide-react';
import { COMMON_CHARS } from './utils/commonChars';

const APP_VERSION = '0.3.0';

const DEFAULT_SETTINGS: AppSettings = {
  apiKey: '', // Empty by default, relies on build-time env var if not set
  gridStyle: 'rice',
  showOutline: true,
  autoPlay: true,
  continuousMode: false,
  offlineMode: false,
  showRandomSuggestions: false, // Default to false as requested
  showHistory: true, // Default to true
  showStructure: true,
  showEtymology: true,
  showMnemonic: true,
  showExamples: true,
};

const App: React.FC = () => {
  const [activeChar, setActiveChar] = useState<string>('永');
  const [hanziData, setHanziData] = useState<HanziData | null>(null);
  const [analysis, setAnalysis] = useState<CharacterAnalysis | null>(null);
  
  // Two loading states: one for critical visuals (blocking), one for analysis (non-blocking)
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState<boolean>(false);
  
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  
  // Settings State
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

  // History State
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

  // Welcome Screen State
  const [showWelcome, setShowWelcome] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const seen = localStorage.getItem('hasSeenWelcome');
      return !seen;
    }
    return false;
  });

  // Persist Settings
  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  // Persist History
  useEffect(() => {
    localStorage.setItem('practiceHistory', JSON.stringify(history));
  }, [history]);
  
  // Language State - Default to Simplified Chinese if preferred, or English
  const [currentLang, setCurrentLang] = useState<string>('zh-CN');

  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved as 'light' | 'dark';
      // Default to light mode unless explicitly set
      return 'light';
    }
    return 'light';
  });

  // Animation & Interaction State
  const [animationState, setAnimationState] = useState<AnimationState>(AnimationState.IDLE);
  const [interactionMode, setInteractionMode] = useState<InteractionMode>(InteractionMode.VIEW);
  const [speed, setSpeed] = useState<number>(1);

  // Get current labels based on language
  const labels = UI_LABELS[currentLang] || UI_LABELS['en'];

  // Apply theme class
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

  // Monitor Online Status
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

  // Sync html lang attribute
  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Initial load
  useEffect(() => {
    handleSearch('永', currentLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (char: string, langCode: string = currentLang) => {
    // 1. Reset States
    setLoading(true); // Visuals loading (Blocks specific interactions)
    setIsAnalysisLoading(true); // Analysis loading (Shows skeletons)
    setError(null);
    setAnimationState(AnimationState.IDLE);
    setInteractionMode(InteractionMode.VIEW); 
    setActiveChar(char);
    setAnalysis(null);
    setHanziData(null);
    
    const langName = LANGUAGES.find(l => l.code === langCode)?.name || 'Simplified Chinese';
    
    // 2. Start AI Fetch in Background (Don't await yet)
    // Pass user-provided API key if available
    const aiPromise = analyzeCharacter(char, langName, settings.offlineMode, settings.apiKey);

    let fetchedData: HanziData | null = null;

    try {
      // 3. Fetch Visual Data (Critical Path - Await this)
      fetchedData = await fetchHanziData(char);

      if (fetchedData) {
        setHanziData(fetchedData);
        // CRITICAL: Stop visual loading immediately so user sees the char
        setLoading(false); 
        
        // Respect Auto-play setting
        if (settings.autoPlay) {
          setTimeout(() => setAnimationState(AnimationState.PLAYING), 500);
        }
      } else {
        // We use English for system errors if translation is missing
        setError(`Could not load stroke data for "${char}". It might not be a standard Chinese character.`);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected network error occurred. Please try again.");
      setLoading(false);
    }

    // 4. Handle AI Result (Lazy Load)
    try {
        const aiResult = await aiPromise;
        
        if (fetchedData && aiResult && aiResult.meaning.startsWith("Mode:")) {
             // Enhance offline/error analysis with real stroke count from visuals
             setAnalysis({
                 ...aiResult,
                 strokeCount: fetchedData.strokes.length
             });
        } else if (aiResult) {
             setAnalysis(aiResult);
        }
    } catch (err) {
        console.error("AI Analysis failed silently:", err);
        // Don't set global error if visuals loaded fine
    } finally {
        setIsAnalysisLoading(false);
    }
  };

  const handleRandom = () => {
    // Pick a random character from the COMMON_CHARS string
    const randomIndex = Math.floor(Math.random() * COMMON_CHARS.length);
    const randomChar = COMMON_CHARS[randomIndex];
    handleSearch(randomChar, currentLang);
  };

  const addToHistory = (char: string) => {
    setHistory(prev => {
      // Remove existing entry for this char if present (to bump it to top)
      const filtered = prev.filter(item => item.char !== char);
      return [{ char, timestamp: Date.now() }, ...filtered].slice(20); // Limit to 20 items
    });
  };

  const handlePracticeComplete = () => {
    // 1. Add to history
    addToHistory(activeChar);

    // 2. Handle Continuous Mode
    if (settings.continuousMode) {
      // Delay slightly to allow the "Success" animation to play
      setTimeout(() => {
         // Switch directly to practice mode for the next char
         setInteractionMode(InteractionMode.PRACTICE);
         handleRandom();
      }, 1500);
    }
  };

  const nextModeRef = useRef<InteractionMode>(InteractionMode.VIEW);

  // Override the interaction mode setting in handleSearch
  // We'll wrap logic inside the existing useEffect that responds to data load
  useEffect(() => {
      if (hanziData && !loading && nextModeRef.current === InteractionMode.PRACTICE) {
          setInteractionMode(InteractionMode.PRACTICE);
          setAnimationState(AnimationState.IDLE);
          nextModeRef.current = InteractionMode.VIEW; // Reset flag
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
    // Use min-h-[100dvh] for better mobile browser support (address bar handling)
    <div className="min-h-[100dvh] pb-24 bg-paper dark:bg-slate-900 transition-colors duration-300 flex flex-col">
      
      {showWelcome && <WelcomeScreen onDismiss={handleDismissWelcome} labels={labels} />}

      {/* Header - Glassmorphism */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800 sticky top-0 z-40 transition-colors duration-300 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400">
            <Brush size={24} />
            <h1 className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100 font-hanzi">
              {labels.appTitle}
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
             <InstallPWA installLabel={labels.installApp || 'Install App'} />

             {/* Settings Button now houses Language and Theme */}
             <button
               onClick={() => setIsSettingsOpen(true)}
               className="p-3 md:p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors touch-manipulation"
               aria-label="Settings"
             >
               <Settings size={20} />
             </button>
          </div>
        </div>
      </header>

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
          {/* Left Column: Visuals & Controls */}
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

          {/* Right Column: Analysis */}
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

      <footer className="mt-auto border-t border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm transition-colors">
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500 dark:text-slate-400">
          
          <div className="text-center md:text-left space-y-1">
            <p className="font-medium text-slate-600 dark:text-slate-300">
              {labels.footerCredit}
            </p>
            <p className="text-xs opacity-60">
              GPL-3.0 License &copy; {new Date().getFullYear()} HanziMaster
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
             <a 
               href="https://github.com/sutchan/HanziMaster" 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group"
             >
               <Github size={18} className="group-hover:scale-110 transition-transform" />
               <span className="font-medium">GitHub</span>
             </a>
             
             <div className="hidden md:block w-px h-4 bg-slate-300 dark:bg-slate-700"></div>
             
             <div className="flex items-center gap-2 text-xs font-mono opacity-80 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
               <span>v{APP_VERSION}</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;