
/**
 * HanziMaster v0.5.2
 */
import React from 'react';
import { Brush, ArrowRight, Globe, Search, Eye, PenTool, Check } from 'lucide-react';
import { UILabels } from '../locales/types';
import { LANGUAGES } from '../locales';

interface WelcomeScreenProps {
  onDismiss: () => void;
  labels: UILabels;
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex flex-col items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700/50 h-full">
     <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm text-teal-600 dark:text-teal-400 mb-2">
         {icon}
     </div>
     <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-0.5">{title}</h3>
     <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center leading-tight">{desc}</p>
  </div>
);

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onDismiss, labels, currentLang, onLanguageChange }) => {
  return (
    <div id="welcome-screen-overlay" className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/90 backdrop-blur-md animate-fade-in p-4">
      <div id="welcome-screen-content" className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 relative flex flex-col max-h-[90vh]">
        
        {/* Hero Section */}
        <div id="welcome-hero-section" className="shrink-0 bg-gradient-to-br from-vermilion-500 to-vermilion-600 p-6 pt-8 text-center relative overflow-hidden rounded-t-3xl">
          {/* Background Decorative Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center select-none">
             <span className="text-[12rem] font-hanzi leading-none text-white animate-pulse" style={{ animationDuration: '4s' }}>字</span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg mb-3 transform -rotate-3 transition-transform hover:rotate-0">
               <Brush size={24} className="text-vermilion-600" />
            </div>
            <h1 className="text-xl font-hanzi font-bold text-white tracking-wide">
              {labels.appTitle}
            </h1>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                {labels.welcomeTitle || "Welcome to HanziMaster"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {labels.welcomeSubtitle || "Discover the beauty of Chinese characters."}
            </p>
          </div>

          {/* Language Grid */}
          <div className="mb-8">
             <div className="flex items-center justify-center gap-2 mb-4 text-slate-400 dark:text-slate-500">
                <Globe size={14} />
                <span className="text-xs font-bold uppercase tracking-widest">Select Language / 选择语言</span>
             </div>
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {LANGUAGES.map(lang => (
                    <button
                        key={lang.code}
                        onClick={() => onLanguageChange(lang.code)}
                        className={`
                            relative flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200
                            ${currentLang === lang.code 
                                ? 'bg-vermilion-50 dark:bg-vermilion-900/20 border-vermilion-500 text-vermilion-700 dark:text-vermilion-300 shadow-sm' 
                                : 'bg-white dark:bg-slate-700/30 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-vermilion-200 dark:hover:border-vermilion-800 hover:bg-slate-50 dark:hover:bg-slate-700'}
                        `}
                    >
                        <span className="text-sm font-bold mb-0.5">{lang.native}</span>
                        <span className="text-[10px] opacity-70">{lang.name}</span>
                        {currentLang === lang.code && (
                            <div className="absolute top-2 right-2 text-vermilion-500">
                                <Check size={14} strokeWidth={3} />
                            </div>
                        )}
                    </button>
                ))}
             </div>
          </div>

          {/* Feature Guide */}
          <div id="welcome-features-section" className="grid grid-cols-3 gap-3 mb-2">
             <FeatureCard 
                icon={<Search size={18} />} 
                title={labels.guideSearchTitle || "Search"} 
                desc={labels.guideSearchDesc || "Find characters"} 
             />
             <FeatureCard 
                icon={<Eye size={18} />} 
                title={labels.guideWatchTitle || "Watch"} 
                desc={labels.guideWatchDesc || "See stroke order"} 
             />
             <FeatureCard 
                icon={<PenTool size={18} />} 
                title={labels.guidePracticeTitle || "Practice"} 
                desc={labels.guidePracticeDesc || "Write & Feedback"} 
             />
          </div>
        </div>

        {/* Footer Action */}
        <div className="shrink-0 p-6 pt-0 bg-white dark:bg-slate-800 rounded-b-3xl">
          <button
            id="welcome-get-started-btn"
            onClick={onDismiss}
            className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            {labels.welcomeBtn || "Get Started"}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;