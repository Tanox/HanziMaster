import React, { useState, useEffect } from 'react';
import { fetchHanziData } from './services/hanziService';
import { analyzeCharacter } from './services/geminiService';
import { HanziData, CharacterAnalysis, AnimationState } from './types';
import SearchInput from './components/SearchInput';
import StrokeViewer from './components/StrokeViewer';
import Controls from './components/Controls';
import AnalysisPanel from './components/AnalysisPanel';
import LanguageSelector from './components/LanguageSelector';
import { LANGUAGES } from './locales';
import { Brush, Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
  const [activeChar, setActiveChar] = useState<string>('永');
  const [hanziData, setHanziData] = useState<HanziData | null>(null);
  const [analysis, setAnalysis] = useState<CharacterAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
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

  // Animation State
  const [animationState, setAnimationState] = useState<AnimationState>(AnimationState.IDLE);
  const [speed, setSpeed] = useState<number>(1);

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

  // Initial load
  useEffect(() => {
    handleSearch('永', currentLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (char: string, langCode: string = currentLang) => {
    setLoading(true);
    setAnimationState(AnimationState.IDLE);
    setActiveChar(char);
    setAnalysis(null);
    
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
        alert("Could not load stroke data for this character.");
      }

      if (aiResult) {
        setAnalysis(aiResult);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while loading data.");
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (code: string) => {
    setCurrentLang(code);
    // If we have a character loaded, re-analyze it in the new language
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
              HanziMaster <span className="text-slate-400 dark:text-slate-500 font-normal">AI</span>
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

             <div className="hidden sm:block text-xs text-slate-400 dark:text-slate-500 font-medium px-2 py-1 bg-slate-50 dark:bg-slate-700 rounded border border-slate-100 dark:border-slate-600">
               v0.1.0
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4 transition-colors">Master Stroke Order</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto">
            Enter a Chinese character to visualize its stroke order and get detailed AI-powered insights.
          </p>
          <SearchInput onSearch={(char) => handleSearch(char, currentLang)} isLoading={loading} />
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
                />
                <Controls 
                  animationState={animationState}
                  onPlay={() => setAnimationState(AnimationState.PLAYING)}
                  onPause={() => setAnimationState(AnimationState.PAUSED)}
                  onReset={() => setAnimationState(AnimationState.IDLE)}
                  speed={speed}
                  onSpeedChange={setSpeed}
                />
                <div className="mt-8 text-center">
                   <p className="text-slate-400 dark:text-slate-500 text-sm">
                     Stroke {animationState === AnimationState.PLAYING || animationState === AnimationState.PAUSED ? 'Active' : 'Complete'}
                   </p>
                </div>
              </>
            ) : (
              !loading && <div className="text-slate-400 dark:text-slate-600 italic">No character data loaded.</div>
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
        <p>Data provided by Hanzi Writer & Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;