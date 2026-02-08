import React, { useState, useEffect } from 'react';
import { fetchHanziData } from './services/hanziService';
import { analyzeCharacter } from './services/geminiService';
import { HanziData, CharacterAnalysis, AnimationState, InteractionMode } from './types';
import SearchInput from './components/SearchInput';
import StrokeViewer from './components/StrokeViewer';
import Controls from './components/Controls';
import AnalysisPanel from './components/AnalysisPanel';
import LanguageSelector from './components/LanguageSelector';
import { LANGUAGES, UI_LABELS } from './locales';
import { Brush, Moon, Sun, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [activeChar, setActiveChar] = useState<string>('永');
  const [hanziData, setHanziData] = useState<HanziData | null>(null);
  const [analysis, setAnalysis] = useState<CharacterAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
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
      const [data, aiResult] = await Promise.all([
        fetchHanziData(char),
        analyzeCharacter(char, langName)
      ]);

      if (data) {
        setHanziData(data);
        setTimeout(() => setAnimationState(AnimationState.PLAYING), 500);
      } else {
        // We use English for system errors if translation is missing, but usually this is safe
        setError(`Could not load stroke data for "${char}". It might not be a standard Chinese character.`);
      }

      if (aiResult) {
        setAnalysis(aiResult);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            <h1 className="font-bold text-xl tracking-tight hidden sm:block text-slate-800 dark:text-slate-100">
              {labels.appTitle}
            </h1>
            <h1 className="font-bold text-xl tracking-tight sm:hidden text-slate-800 dark:text-slate-100">
              Hanzi<span className="text-slate-400 dark:text-slate-500 font-normal">AI</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
             <LanguageSelector currentLang={currentLang} onLanguageChange={handleLanguageChange} />
             
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

      <main className="max-w-5xl mx-auto px-4 py-8">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4 transition-colors">{labels.appTitle}</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto">
            {labels.appSubtitle}
          </p>
          <SearchInput 
            onSearch={(char) => handleSearch(char, currentLang)} 
            isLoading={loading} 
            placeholderText={labels.searchPlaceholder}
            invalidCharMessage={labels.errorInvalidChar}
          />
          
          {error && (
            <div className="max-w-md mx-auto mt-4 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl flex items-center gap-3 border border-red-100 dark:border-red-900/50">
              <AlertCircle size={20} className="shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
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
                />
                <Controls 
                  animationState={animationState}
                  onPlay={() => setAnimationState(AnimationState.PLAYING)}
                  onPause={() => setAnimationState(AnimationState.PAUSED)}
                  onReset={() => {
                      setAnimationState(AnimationState.IDLE);
                      setInteractionMode(InteractionMode.VIEW); // Also reset interaction
                  }}
                  speed={speed}
                  onSpeedChange={setSpeed}
                  mode={interactionMode}
                  onToggleMode={() => {
                      const newMode = interactionMode === InteractionMode.VIEW ? InteractionMode.PRACTICE : InteractionMode.VIEW;
                      setInteractionMode(newMode);
                      if (newMode === InteractionMode.PRACTICE) {
                          setAnimationState(AnimationState.IDLE); // Stop animation
                      }
                  }}
                  labels={{
                    play: labels.controlsPlay,
                    pause: labels.controlsPause,
                    reset: labels.controlsReset,
                    speed: labels.controlsSpeed,
                    practiceMode: labels.practiceMode || "Practice", // Fallback
                    viewMode: labels.viewMode || "Watch"
                  }}
                />
                <div className="mt-8 text-center min-h-[1.5rem]">
                   {interactionMode === InteractionMode.VIEW && (
                       <p className="text-slate-400 dark:text-slate-500 text-sm animate-fade-in">
                         {animationState === AnimationState.PLAYING || animationState === AnimationState.PAUSED ? labels.strokeStatusActive : labels.strokeStatusComplete}
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

          {/* Right Column: AI Analysis */}
          <div className="lg:col-span-7">
            <AnalysisPanel analysis={analysis} isLoading={loading} language={currentLang} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-slate-400 dark:text-slate-600 py-8 text-sm mt-12 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <p>{labels.footerCredit}</p>
        <p className="mt-2 text-xs">{labels.version} v{process.env.APP_VERSION}</p>
      </footer>
    </div>
  );
};

export default App;