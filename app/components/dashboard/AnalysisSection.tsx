
// app/components/dashboard/AnalysisSection.tsx v1.0.2
import React from 'react';
import AnalysisPanel from '../AnalysisPanel';
import HistoryPanel from '../HistoryPanel';
import VeoVideoGenerator from '../VeoVideoGenerator';
import { CharacterAnalysis, IdiomAnalysis, HanziData, AppSettings, HistoryItem, UILabels } from '../../types';

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
      />
      
      {analysis && !isAnalysisLoading && !isOffline && (
        <VeoVideoGenerator char={analysis.char} labels={labels} />
      )}
      
      {settings.showHistory && (
        <HistoryPanel 
           history={history} 
           learnedItems={learnedItems}
           dueReviews={dueReviews}
           onSelect={(term) => actions.handleSearch(term, currentLang)} 
           onClear={actions.clearAllProgress}
           labels={labels}
        />
      )}
    </div>
  );
};

export default AnalysisSection;
