// app/components/dashboard/AnalysisSection.tsx v0.7.1
import React from 'react';
import AnalysisPanel from '../AnalysisPanel';
import HistoryPanel from '../HistoryPanel';
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
  labels: UILabels;
  actions: {
    handleSearch: (term: string, langCode: string) => void;
    setHistory: (history: HistoryItem[]) => void;
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
  labels,
  actions
}) => {
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
      
      {settings.showHistory && (
        <HistoryPanel 
           history={history} 
           learnedItems={learnedItems}
           onSelect={(term) => actions.handleSearch(term, currentLang)} 
           onClear={() => actions.setHistory([])}
           labels={labels}
        />
      )}
    </div>
  );
};

export default AnalysisSection;