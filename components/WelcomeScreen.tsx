
/**
 * HanziMaster v0.4.3
 */
import React from 'react';
import { Brush, ArrowRight, Globe, Search, Eye, PenTool } from 'lucide-react';
import { UILabels } from '../locales/types';
import { LANGUAGES } from '../locales';

interface WelcomeScreenProps {
  onDismiss: () => void;
  labels: UILabels;
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex flex-col items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700/50">
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
      <div id="welcome-screen-content" className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 relative">
        
        {/* Language Selector (Top Right) */}
        <div className="absolute top-4 right-4 z-20">
           <div className="relative group">
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1.5 text-xs font-medium text-white cursor-pointer hover:bg-white/30 transition-colors">
                 <Globe size={12} />
                 <span>{LANGUAGES.find(l => l.code === currentLang)?.native}</span>
              </div>
              <select 
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                 value={currentLang}
                 onChange={(e) => onLanguageChange(e.target.value)}
              >
                 {LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>
                        {lang.native} ({lang.name})
                    </option>
                 ))}
              </select>
           </div>
        </div>

        {/* Hero Section */}
        <div id="welcome-hero-section" className="bg-gradient-to-br from-vermilion-500 to-vermilion-600 p-8 pt-12 text-center relative overflow-hidden">
          {/* Background Decorative Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center select-none">
             <span className="text-[12rem] font-hanzi leading-none text-white animate-pulse" style={{ animationDuration: '4s' }}>字</span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-4 transform -rotate-3 transition-transform hover:rotate-0">
               <Brush size={32} className="text-vermilion-600" />
            </div>
            <h1 className="text-2xl font-hanzi font-bold text-white mb-2 tracking-wide">
              {labels.appTitle}
            </h1>
            <div className="w-8 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                {labels.welcomeTitle || "Welcome to HanziMaster"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {labels.welcomeSubtitle || "Discover the beauty of Chinese characters. The ultimate tool combining traditional calligraphy with AI insights."}
            </p>
          </div>

          {/* Feature Guide */}
          <div id="welcome-features-section" className="grid grid-cols-3 gap-3 mb-8">
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
