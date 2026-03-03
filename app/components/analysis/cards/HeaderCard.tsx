
// app/components/analysis/cards/HeaderCard.tsx v1.3.6
import React from 'react';
import { CharacterAnalysis, AppSettings, HanziData, UILabels } from '../../../types';
import PronunciationButton from '../../PronunciationButton';
import ShareImageButton from '../ShareImageButton';

interface HeaderCardProps {
  analysis: CharacterAnalysis;
  hanziData: HanziData | null;
  settings: AppSettings;
  labels: UILabels;
  compact?: boolean;
  isFallback: boolean;
  fullWidth?: boolean;
}

const HeaderCard: React.FC<HeaderCardProps> = ({ analysis, hanziData, labels, isFallback, fullWidth }) => {
  const definitiveStrokeCount = hanziData?.strokes?.length ?? analysis.strokeCount;
  const hasStrokeCount = definitiveStrokeCount > 0;

  return (
    <div className={`md:col-span-4 ${fullWidth ? 'md:col-span-4' : 'md:col-span-2'} bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm animate-fade-in flex flex-col justify-between`}>
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-4">
            <ruby className="font-hanzi text-6xl md:text-7xl text-slate-800 dark:text-white">
              {analysis.char}
              <rt className="text-xl text-teal-600 dark:text-teal-400 font-medium tracking-wide">{analysis.pinyin}</rt>
            </ruby>
          </div>
          <div className="flex items-center -mr-2">
            {!isFallback && (
              <div className="lg:hidden">
                <PronunciationButton text={analysis.char} />
              </div>
            )}
            <ShareImageButton analysis={analysis} />
          </div>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">{analysis.meaning}</p>
      </div>
    </div>
  );
};

export default HeaderCard;
