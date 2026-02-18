// app/components/analysis/CharacterDisplay.tsx v1.0.1
import React from 'react';
import { CharacterAnalysis, AppSettings, HanziData, UILabels } from '../../types';
import HeaderCard from './cards/HeaderCard';
import StructureCard from './cards/StructureCard';
import StrokeCountCard from './cards/StrokeCountCard';
import EtymologyCard from './cards/EtymologyCard';
import MnemonicCard from './cards/MnemonicCard';
import ExampleWordsCard from './cards/ExampleWordsCard';
import OfflineStateCard from './cards/OfflineStateCard';

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
  const hasStrokeCount = analysis.strokeCount > 0;
  
  return (
    <div id="character-analysis-grid" className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min">
      <HeaderCard analysis={analysis} hanziData={hanziData} settings={settings} labels={labels} compact={compact} isFallback={isFallback} fullWidth={!hasStrokeCount && !showRichContent} />
      {settings.showStructure && showRichContent && <StructureCard radical={analysis.radical} labels={labels} />}
      {settings.showStructure && hasStrokeCount && <StrokeCountCard count={analysis.strokeCount} labels={labels} fullWidth={!showRichContent} />}
      {settings.showEtymology && showRichContent && <EtymologyCard content={analysis.etymology} labels={labels} />}
      {settings.showMnemonic && showRichContent && <MnemonicCard content={analysis.mnemonic} labels={labels} />}
      {settings.showExamples && showRichContent && <ExampleWordsCard examples={analysis.examples} labels={labels} />}
      {!showRichContent && <OfflineStateCard labels={labels} />}
    </div>
  );
};

export default CharacterDisplay;
