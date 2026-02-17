// app/components/WelcomeScreen.tsx v0.8.4
import React, { useState } from 'react';
import { Brush, ArrowRight, ArrowLeft, Globe, Search, Eye, PenTool, Check, Sparkles } from 'lucide-react';
import { UILabels } from '../types';
import { LANGUAGES } from '../locales';

interface WelcomeScreenProps {
  onDismiss: () => void;
  labels: UILabels;
  currentLang: string;
  onLanguageChange: (lang: string) => void;
}

const FeatureCard = ({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: string }) => (
  <div 
    className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700/50 animate-fade-in"
    style={{ animationDelay: delay }}
  >
     <div className="shrink-0 w-10 h-10 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center text-teal-600 dark:text-teal-400">
         {icon}
     </div>
     <div>
        <h3 className="text-sm font-bold text-slate-800 dark:text-100 mb-0.5">{title}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{desc}</p>
     </div>
  </div>
);

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onDismiss, labels, currentLang, onLanguageChange }) => {
  const [step, setStep] = useState(1);

  return (
    <div id="welcome-screen-overlay" className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/90 backdrop-blur-md animate-fade-in p-4">
      <div id="welcome-screen-content" className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-700 relative flex flex-col max-h-[90vh] overflow-hidden">
        
        <div id="welcome-hero-section" className="shrink-0 bg-gradient-to-br from-vermilion-500 to-vermilion-600 p-8 text-center relative overflow-hidden rounded-t-[2.4rem]">
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center select-none">
             <span className="text-[14rem] font-hanzi leading-none text-white animate-pulse" style={{ animationDuration: '6s' }}>
                {step === 1 ? '文' : '艺'}
             </span>
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl mb-4 transform -rotate-3 transition-transform hover:rotate-0">
               <Brush size={28} className="text-vermilion-600" />
            </div>
            <h1 className="text-2xl font-hanzi font-bold text-white tracking-widest drop-shadow-sm">
              {labels.appTitle}
            </h1>
            <div className="flex gap-1.5 mt-4">
               <div className={`w-6 h-1 rounded-full transition-all duration-300 ${step === 1 ? 'bg-white' : 'bg-white/30'}`} />
               <div className={`w-6 h-1 rounded-full transition-all duration-300 ${step === 2 ? 'bg-white' : 'bg-white/30'}`} />
            </div>
          </div>
        </div>

        {step === 1 && (
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar animate-fade-in">
                <div className="text-center mb-8">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{labels.welcomeIntroTitle}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{labels.welcomeIntroDesc}</p>
                </div>
                <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 mb-4 text-slate-400 dark:text-slate-500">
                        <Globe size={14} />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Display Language / 显示语言</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {LANGUAGES.map(lang => (
                            <button
                                key={lang.code}
                                onClick={() => onLanguageChange(lang.code)}
                                className={`relative flex flex-col items-start p-3.5 rounded-2xl border-2 transition-all duration-200 ${currentLang === lang.code ? 'bg-vermilion-50 dark:bg-vermilion-900/20 border-vermilion-500 text-vermilion-700 dark:text-vermilion-300 shadow-sm' : 'bg-white dark:bg-slate-700/30 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-vermilion-200 dark:hover:border-vermilion-800 hover:bg-slate-50'}`}
                            >
                                <span className="text-sm font-bold">{lang.native}</span>
                                <span className="text-[10px] opacity-60 font-medium">{lang.name}</span>
                                {currentLang === lang.code && <div className="absolute top-3 right-3 text-vermilion-500"><Check size={16} strokeWidth={3} /></div>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {step === 2 && (
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar animate-fade-in">
                <div className="text-center mb-8">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{labels.welcomeFeatureTitle}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{labels.welcomeFeatureDesc}</p>
                </div>
                <div className="space-y-4">
                    <FeatureCard icon={<Search size={20} />} title={labels.guideSearchTitle} desc={labels.guideSearchDesc} delay="0.1s" />
                    <FeatureCard icon={<Eye size={20} />} title={labels.guideWatchTitle} desc={labels.guideWatchDesc} delay="0.2s" />
                    <FeatureCard icon={<PenTool size={20} />} title={labels.guidePracticeTitle} desc={labels.guidePracticeDesc} delay="0.3s" />
                    <FeatureCard icon={<Sparkles size={20} />} title={labels.guideAITitle} desc={labels.guideAIDesc} delay="0.4s" />
                </div>
            </div>
        )}

        <div className="shrink-0 p-8 pt-0 bg-white dark:bg-slate-800 rounded-b-[2.5rem] flex gap-4">
          {step === 2 && (
             <button onClick={() => setStep(1)} className="p-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 rounded-2xl transition-all"><ArrowLeft size={20} /></button>
          )}
          <button onClick={() => step === 1 ? setStep(2) : onDismiss()} className="flex-1 py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-bold shadow-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-3 group">
            {step === 1 ? labels.welcomeStepNext : (labels.welcomeBtn || "Get Started")}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;