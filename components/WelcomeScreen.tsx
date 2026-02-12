/**
 * HanziMaster v0.4.2
 */
import React from 'react';
import { Brush, ArrowRight } from 'lucide-react';
import { UILabels } from '../locales/types';

interface WelcomeScreenProps {
  onDismiss: () => void;
  labels: UILabels;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onDismiss, labels }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/90 backdrop-blur-md animate-fade-in p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-vermilion-500 to-vermilion-600 p-10 text-center relative overflow-hidden">
          {/* Background Decorative Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
             <span className="text-[12rem] font-hanzi leading-none text-white">字</span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-6 transform rotate-3">
               <Brush size={40} className="text-vermilion-600" />
            </div>
            <h1 className="text-3xl font-hanzi font-bold text-white mb-2 tracking-wide">
              {labels.appTitle}
            </h1>
            <div className="w-12 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 text-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
            {labels.welcomeTitle}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
            {labels.welcomeSubtitle}
          </p>

          <button
            onClick={onDismiss}
            className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            {labels.welcomeBtn}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;