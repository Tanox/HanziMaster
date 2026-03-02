
// app/components/dashboard/AnalysisSection.tsx v1.3.4
import React from 'react';
import dynamic from 'next/dynamic';
import AnalysisPanel from '../AnalysisPanel';
import HistoryPanel from '../HistoryPanel';
import { CharacterAnalysis, IdiomAnalysis, HanziData, AppSettings, HistoryItem, UILabels, SRSItem } from '../../types';

const ProgressStats = dynamic(() => import('./ProgressStats'), { 
  ssr: false,
  loading: () => <div className="h-24 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" />
});

interface AnalysisSectionProps {
  analysis: CharacterAnalysis | null;
  idiomAnalysis: IdiomAnalysis | null;
  hanziData: HanziData | null;
  isAnalysisLoading: boolean;
  currentLang: string;
  settings: AppSettings;
  history: HistoryItem[];
  learnedItems: string[];
  dueReviews: string[];
  srsData: Record<string, SRSItem>;
  labels: UILabels;
  actions: {
    handleSearch: (term: string, langCode: string) => void;
    clearAllProgress: () => void;
  }
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({
  analysis,
  idiomAnalysis,
  hanziData,
  isAnalysisLoading,
  currentLang,
  settings,
  history,
  learnedItems,
  dueReviews,
  srsData,
  labels,
  actions
}) => {
  const isOffline = settings.offlineMode || (typeof navigator !== 'undefined' && !navigator.onLine);

  return (
    <div id="analysis-section" className="flex flex-col w-full">
      <AnalysisPanel 
          analysis={analysis} 
          idiomAnalysis={idiomAnalysis}
          hanziData={hanziData}
          isLoading={isAnalysisLoading} 
          language={currentLang} 
          settings={settings} 
          onSearch={(term) => actions.handleSearch(term, currentLang)}
      />
      
      {settings.showHistory && (
        <>
          <ProgressStats 
            srsData={srsData} 
            totalLearned={learnedItems.length} 
            labels={labels} 
          />
          <HistoryPanel 
             history={history} 
             learnedItems={learnedItems}
             dueReviews={dueReviews}
             onSelect={(term) => actions.handleSearch(term, currentLang)} 
             onClear={actions.clearAllProgress}
             labels={labels}
          />
        </>
      )}
    </div>
  );
};

export default AnalysisSection;
