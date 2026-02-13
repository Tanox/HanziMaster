
/**
 * HanziMaster v0.4.9
 */
import React from 'react';
import { CharacterAnalysis, AppSettings, HanziData } from '../../types';
import { UILabels } from '../../locales/types';

import HeaderCard from './cards/HeaderCard';
import StructureCard from './cards/StructureCard';
import StrokeCountCard from './cards/StrokeCountCard';
import EtymologyCard from './cards/EtymologyCard';
import MnemonicCard from './cards/MnemonicCard';
import ExampleWordsCard from './cards/ExampleWordsCard';

interface CharacterDisplayProps {
  analysis: CharacterAnalysis;
  hanziData: HanziData | null;
  settings: AppSettings;
  labels: UILabels;
  compact?: boolean;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ analysis, hanziData, settings, labels, compact = false }) => {
  const isFallback = analysis.meaning.startsWith('Mode:') || analysis.radical === '?';
  const showRichContent = !settings.offlineMode && !isFallback;

  return (
    <div id="character-analysis-grid" className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min">
      
      <HeaderCard 
        analysis={analysis} 
        hanziData={hanziData} 
        settings={settings} 
        labels={labels} 
        compact={compact}
        isFallback={isFallback}
      />

      {settings.showStructure && showRichContent && (
        <StructureCard radical={analysis.radical} labels={labels} />
      )}

      {settings.showStructure && (analysis.strokeCount > 0) && (
        <StrokeCountCard 
            count={analysis.strokeCount} 
            labels={labels} 
            fullWidth={!showRichContent} 
        />
      )}

      {settings.showEtymology && showRichContent && (
        <EtymologyCard content={analysis.etymology} labels={labels} />
      )}

      {settings.showMnemonic && showRichContent && (
        <MnemonicCard content={analysis.mnemonic} labels={labels} />
      )}

      {settings.showExamples && showRichContent && (
        <ExampleWordsCard 
            examples={analysis.examples} 
            labels={labels} 
            apiKey={settings.apiKey} 
        />
      )}
    </div>
  );
};

export default CharacterDisplay;
