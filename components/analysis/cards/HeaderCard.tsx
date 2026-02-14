
/**
 * HanziMaster v0.5.2
 */
import React from 'react';
import { Info } from 'lucide-react';
import { CharacterAnalysis, AppSettings, HanziData } from '../../../types';
import { UILabels } from '../../../locales/types';
import PronunciationButton from '../../PronunciationButton';
import ShareButton from '../../ShareButton';
import ShareImageButton from '../ShareImageButton';

interface HeaderCardProps {
  analysis: CharacterAnalysis;
  hanziData: HanziData | null;
  settings: AppSettings;
  labels: UILabels;
  compact: boolean;
  isFallback: boolean;
  fullWidth?: boolean;
}

const HeaderCard: React.FC<HeaderCardProps> = ({ 
  analysis, 
  hanziData, 
  settings, 
  labels, 
  compact, 
  isFallback,
  fullWidth = false
}) => {
  const shareUrl = `${window.location.origin}?char=${encodeURIComponent(analysis.char)}`;
  
  const shareTemplate = labels.shareTextChar || "I'm learning '{char}' ({pinyin}) on HanziMaster! {url}";
  const shareText = shareTemplate
    .replace('{char}', analysis.char)
    .replace('{pinyin}', analysis.pinyin)
    .replace('{meaning}', analysis.meaning)
    .replace('{url}', shareUrl);

  const shareTitle = labels.shareTitleChar.replace('{char}', analysis.char);

  // Common wrapper class
  const wrapperClass = `${fullWidth ? 'md:col-span-4' : 'md:col-span-2'} bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700`;

  if (compact) {
    return (
      <div id="character-header-card-compact" className={`${wrapperClass} flex items-center justify-between`}>
           <div className="flex items-center gap-4">
              <ruby className="text-5xl font-hanzi font-bold text-slate-800 dark:text-white">
                {analysis.char}
                <rt className="text-sm text-vermilion-500">{analysis.pinyin}</rt>
              </ruby>
              <div>
                   <div className="flex items-center gap-0 -ml-2">
                      <PronunciationButton text={analysis.char} size={18} apiKey={settings.apiKey} />
                      <ShareButton
                         title={shareTitle}
                         text={shareText}
                         url={shareUrl}
                         labels={labels}
                         size={16}
                         className="text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300"
                      />
                      <ShareImageButton hanziData={hanziData} analysis={analysis} settings={settings} />
                   </div>
                   <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                      {analysis.meaning}
                   </p>
              </div>
           </div>
      </div>
    );
  }

  return (
      <div id="character-header-card" className={`${wrapperClass} flex flex-col justify-between relative overflow-hidden group hover:border-vermilion-100 dark:hover:border-vermilion-900 transition-colors`}>
          <div className="absolute -right-4 -bottom-8 text-9xl font-hanzi text-slate-50 dark:text-slate-800 pointer-events-none select-none opacity-50 group-hover:scale-110 transition-transform duration-700">
              {analysis.char}
          </div>
          <div className="flex justify-between items-start z-10">
              <div>
                  <ruby className="text-5xl font-hanzi font-bold text-slate-900 dark:text-white mb-2 block">
                      {analysis.char}
                      <rt className="text-lg text-vermilion-500 dark:text-vermilion-400 font-medium tracking-wide">
                        {analysis.pinyin !== '-' ? analysis.pinyin : ''}
                      </rt>
                  </ruby>
                  <div className="flex items-center gap-0 -ml-2">
                      <PronunciationButton text={analysis.char} size={20} apiKey={settings.apiKey} className="text-vermilion-500 hover:bg-vermilion-50 dark:hover:bg-vermilion-900/30" />
                      <ShareButton
                         title={shareTitle}
                         text={shareText}
                         url={shareUrl}
                         labels={labels}
                         className="text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300"
                      />
                      <ShareImageButton hanziData={hanziData} analysis={analysis} settings={settings} />
                  </div>
              </div>
              <div className="text-right max-w-[50%]">
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{labels.meaning}</p>
                  <p className="text-lg text-slate-700 dark:text-slate-200 font-serif leading-tight">
                      {isFallback ? (
                          <span className="text-slate-400 text-sm italic flex items-center justify-end gap-1">
                              <Info size={14} />
                              {analysis.meaning.replace('Mode: ', '')}
                          </span>
                      ) : (
                          analysis.meaning
                      )}
                  </p>
              </div>
          </div>
      </div>
  );
};

export default HeaderCard;