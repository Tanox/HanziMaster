
// app/components/analysis/cards/HeaderCard.tsx v1.1.6
import React, { useState, useEffect } from 'react';
import { CharacterAnalysis, AppSettings, HanziData, UILabels } from '../../../types';
import PronunciationButton from '../../PronunciationButton';
import ShareButton from '../../ShareButton';
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
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const shareUrl = `${origin}?char=${encodeURIComponent(analysis.char)}`;
  const shareTemplate = labels.shareTextChar || "I learned '{char}' ({pinyin}) on HanziMaster! Meaning: {meaning}. See more: {url}";
  const shareText = shareTemplate
    .replace('{char}', analysis.char)
    .replace('{pinyin}', analysis.pinyin)
    .replace('{meaning}', analysis.meaning)
    .replace('{url}', shareUrl);
  const shareTitle = (labels.shareTitleChar || "Learn '{char}' on HanziMaster").replace('{char}', analysis.char);

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
            {hasStrokeCount && (
              <div id="header-stroke-count" className="flex flex-col items-center pt-3 shrink-0">
                <span className="text-3xl font-bold text-slate-600 dark:text-slate-300">{definitiveStrokeCount}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">{labels.strokeCount}</span>
              </div>
            )}
          </div>
          <div className="flex items-center -mr-2">
            {!isFallback && <PronunciationButton text={analysis.char} />}
            <ShareButton title={shareTitle} text={shareText} url={shareUrl} labels={labels} className="text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300" />
            <ShareImageButton analysis={analysis} />
          </div>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">{analysis.meaning}</p>
      </div>
    </div>
  );
};

export default HeaderCard;
