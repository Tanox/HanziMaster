// app/components/AnalysisPanel.tsx v1.3.4
import React from 'react';
import { CharacterAnalysis, IdiomAnalysis, AppSettings, HanziData } from '../types';
import { UI_LABELS } from '../locales';
import IdiomDisplay from './analysis/IdiomDisplay';
import CharacterDisplay from './analysis/CharacterDisplay';

interface AnalysisPanelProps {
  analysis: CharacterAnalysis | null;
  idiomAnalysis: IdiomAnalysis | null;
  hanziData: HanziData | null;
  isLoading: boolean;
  language: string;
  settings: AppSettings;
  onSearch?: (term: string) => void;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis, idiomAnalysis, hanziData, isLoading, language, settings, onSearch }) => {
  const labels = UI_LABELS[language] || UI_LABELS['en'];
  const containerClass = "w-full max-w-4xl mx-auto mt-6 flex flex-col gap-6 min-h-[480px] transition-all duration-500";

  if (isLoading) {
    return (
      <div id="analysis-loading-skeleton" className={containerClass}>
        <div className="w-full p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 transition-colors duration-300">
            <div className="animate-pulse space-y-4">
            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
            <div className="h-32 bg-slate-100 dark:bg-slate-700/50 rounded mt-6"></div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div id="analysis-panel-container" className={containerClass}>
      {idiomAnalysis && (
        <IdiomDisplay 
          data={idiomAnalysis} 
          labels={labels} 
        />
      )}
      {analysis && (
        <CharacterDisplay 
          analysis={analysis}
          hanziData={hanziData}
          settings={settings} 
          labels={labels} 
          compact={!!idiomAnalysis}
          onSearch={onSearch}
        />
      )}
      {!analysis && !idiomAnalysis && <div className="flex-1"></div>}
    </div>
  );
};

export default AnalysisPanel;
