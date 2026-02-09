import React, { useState, useEffect } from 'react';
import { fetchHanziData } from './services/hanziService';
import { analyzeCharacter } from './services/geminiService';
import { HanziData, CharacterAnalysis, AnimationState, InteractionMode, AppSettings, HistoryItem } from './types';
import SearchInput from './components/SearchInput';
import StrokeViewer from './components/StrokeViewer';
import Controls from './components/Controls';
import AnalysisPanel from './components/AnalysisPanel';
import LanguageSelector from './components/LanguageSelector';
import RandomSuggestions from './components/RandomSuggestions';
import HistoryPanel from './components/HistoryPanel';
import SettingsModal from './components/SettingsModal';
import { LANGUAGES, UI_LABELS } from './locales';
import { Brush, Moon, Sun, AlertCircle, WifiOff, Settings } from 'lucide-react';
import { COMMON_CHARS } from './utils/commonChars';

const APP_VERSION = '0.2.6';

const DEFAULT_SETTINGS: AppSettings = {
  gridStyle: 'rice',
  showOutline: true,
  autoPlay: true,
  continuousMode: false,
  offlineMode: false,
  showSpeedControl: true,
  showRandomSuggestions: true,
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
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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
    setLoading(true);
    setError(null);
    setAnimationState(AnimationState.IDLE);
    setInteractionMode(InteractionMode.VIEW); // Reset to view mode on new search
    setActiveChar(char);
    setAnalysis(null);
    setHanziData(null);
    
    // Find language name for API
    const langName = LANGUAGES.find(l => l.code === langCode)?.name || 'Simplified Chinese';
    
    try {
      // Parallel fetch for speed
      // We pass settings.offlineMode to force the AI service to skip if enabled
      const [data, aiResult] = await Promise.all([
        fetchHanziData(char),
        analyzeCharacter(char, langName, settings.offlineMode)
      ]);

      if (data) {
        setHanziData(data);
        // Respect Auto-play setting
        if (settings.autoPlay) {
          setTimeout(() => setAnimationState(AnimationState.PLAYING), 500);
        }
        
        // Enhance offline/error analysis with real stroke count if in fallback mode
        if (aiResult && aiResult.meaning.startsWith("Mode:")) {
            setAnalysis({
                ...aiResult,
                strokeCount: data.strokes.length
            });
        } else if (aiResult) {
             setAnalysis(aiResult);
        }

      } else {
        // We use English for system errors if translation is missing, but usually this is safe
        setError(`Could not load stroke data for "${char}". It might not be a standard Chinese character.`);
        if (aiResult) setAnalysis(aiResult);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
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

  const nextModeRef = React.useRef<InteractionMode>(InteractionMode.VIEW);

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

  return (
    <div className="min-h-screen pb-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400">
            <Brush size={24} />
            <h1 className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100">
              {labels.appTitle}
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
             <LanguageSelector currentLang={currentLang} onLanguageChange={handleLanguageChange} />
             
             <button
               onClick={() => setIsSettingsOpen(true)}
               className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
               aria-label="Settings"
             >
               <Settings size={18} />
             </button>

             <button 
               onClick={toggleTheme}
               className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
               aria-label="Toggle Dark Mode"
             >
               {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-4 md:py-8">
        
        <div className="text-center mb-6 md:mb-10">
          <h2 className="hidden md:block text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4 transition-colors">{labels.appTitle}</h2>
          <p className="hidden md:block text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto">
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

        <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
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
                  speed={speed}
                  onSpeedChange={setSpeed}
                  mode={interactionMode}
                  onToggleMode={() => {
                      const newMode = interactionMode === InteractionMode.VIEW ? InteractionMode.PRACTICE : InteractionMode.VIEW;
                      setInteractionMode(newMode);
                      if (newMode === InteractionMode.PRACTICE) {
                          setAnimationState(AnimationState.IDLE);
                      }
                  }}
                  settings={settings}
                  char={activeChar}
                  labels={{
                    play: labels.controlsPlay,
                    pause: labels.controlsPause,
                    reset: labels.controlsReset,
                    speed: labels.controlsSpeed,
                    practiceMode: labels.practiceMode || "Practice",
                    viewMode: labels.viewMode || "Watch"
                  }}
                />
                <div className="mt-6 md:mt-8 text-center min-h-[1.5rem]">
                   {interactionMode === InteractionMode.VIEW && (
                       <p className="text-slate-400 dark:text-slate-500 text-sm animate-fade-in">
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
            <AnalysisPanel analysis={analysis} isLoading={loading} language={currentLang} settings={settings} />
            
            <HistoryPanel 
               history={history} 
               onSelect={(char) => handleSearch(char, currentLang)} 
               onClear={() => setHistory([])}
               labels={labels}
            />
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
        />

      </main>

      <footer className="text-center text-slate-400 dark:text-slate-600 py-8 text-sm mt-0 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <p>{labels.footerCredit}</p>
        <p className="mt-2 text-xs">{labels.version} v{APP_VERSION}</p>
      </footer>
    </div>
  );
};

export default App;