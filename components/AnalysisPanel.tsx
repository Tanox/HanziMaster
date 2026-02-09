import React from 'react';
import { CharacterAnalysis, AppSettings } from '../types';
import { BookOpen, Lightbulb, History, Quote } from 'lucide-react';
import { UI_LABELS } from '../locales';
import PronunciationButton from './PronunciationButton';

interface AnalysisPanelProps {
  analysis: CharacterAnalysis | null;
  isLoading: boolean;
  language: string;
  settings: AppSettings;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis, isLoading, language, settings }) => {
  const labels = UI_LABELS[language] || UI_LABELS['en'];

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
          <div className="h-32 bg-slate-100 dark:bg-slate-700/50 rounded mt-6"></div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  const isOffline = settings.offlineMode;

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min">
        
        {/* 1. Header Card (Hero) - Spans 2 cols on desktop */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-between relative overflow-hidden group hover:border-teal-100 dark:hover:border-teal-900 transition-colors">
            {/* Decorative background char */}
            <div className="absolute -right-4 -bottom-8 text-9xl font-hanzi text-slate-50 dark:text-slate-800 pointer-events-none select-none opacity-50 group-hover:scale-110 transition-transform duration-700">
                {analysis.char}
            </div>
            
            <div className="flex justify-between items-start z-10">
                <div>
                    <h2 className="text-5xl font-hanzi font-bold text-slate-900 dark:text-white mb-1">{analysis.char}</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-xl text-teal-600 dark:text-teal-400 font-medium tracking-wide">{analysis.pinyin}</span>
                        <PronunciationButton text={analysis.char} size={20} />
                    </div>
                </div>
                <div className="text-right max-w-[50%]">
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{labels.meaning}</p>
                    <p className="text-lg text-slate-700 dark:text-slate-200 font-serif leading-tight">{analysis.meaning}</p>
                </div>
            </div>
        </div>

        {/* 2. Radical Card */}
        {settings.showStructure && !isOffline && (
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center hover:border-teal-100 dark:hover:border-teal-900 transition-colors">
                <span className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">{labels.radical}</span>
                <span className="text-4xl font-hanzi text-slate-800 dark:text-slate-200 mb-1">{analysis.radical}</span>
            </div>
        )}

        {/* 3. Stroke Count Card */}
        {settings.showStructure && !isOffline && (
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center hover:border-teal-100 dark:hover:border-teal-900 transition-colors">
                 <span className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">{labels.strokeCount}</span>
                 <span className="text-4xl font-mono font-light text-slate-800 dark:text-slate-200 mb-1">{analysis.strokeCount}</span>
            </div>
        )}

        {/* 4. Etymology (Origin) - Full Width or large box */}
        {settings.showEtymology && !isOffline && (
            <div className="md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-amber-100 dark:hover:border-amber-900/30 transition-colors">
                 <div className="flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-500">
                    <History size={18} />
                    <h3 className="font-bold text-sm uppercase tracking-wide">{labels.origin}</h3>
                 </div>
                 <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
                    {analysis.etymology}
                 </p>
            </div>
        )}

        {/* 5. Mnemonic - Colored Card */}
        {settings.showMnemonic && !isOffline && (
            <div className="md:col-span-2 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-teal-100 dark:border-teal-900/50 flex flex-col justify-center">
                 <div className="flex items-center gap-2 mb-2 text-teal-700 dark:text-teal-400">
                    <Lightbulb size={18} />
                    <h3 className="font-bold text-sm uppercase tracking-wide">{labels.memoryAid}</h3>
                 </div>
                 <p className="text-teal-900 dark:text-teal-100 text-base italic font-serif">
                    "{analysis.mnemonic}"
                 </p>
            </div>
        )}

        {/* 6. Vocabulary List - Full Width */}
        {settings.showExamples && !isOffline && (
            <div className="md:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mt-2">
                 <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400">
                    <BookOpen size={18} />
                    <h3 className="font-bold text-sm uppercase tracking-wide">{labels.commonWords}</h3>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {analysis.examples.map((ex, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                          <div className="bg-white dark:bg-slate-800 p-2 rounded shadow-sm text-xl font-hanzi text-slate-800 dark:text-slate-200">
                              {ex.word}
                          </div>
                          <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                  <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold">{ex.pinyin}</span>
                                  <PronunciationButton text={ex.word} size={14} className="opacity-50 hover:opacity-100" />
                              </div>
                              <p className="text-slate-500 dark:text-slate-400 text-xs truncate mt-0.5" title={ex.meaning}>
                                  {ex.meaning}
                              </p>
                          </div>
                      </div>
                    ))}
                 </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisPanel;