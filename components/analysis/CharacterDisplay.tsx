/**
 * HanziMaster v0.3.6
 */
import React, { useState } from 'react';
import { BookOpen, Lightbulb, History, Info, Image as ImageIcon, Loader2 } from 'lucide-react';
import { CharacterAnalysis, AppSettings, HanziData } from '../../types/index.ts';
import PronunciationButton from '../PronunciationButton.tsx';
import ShareButton from '../ShareButton.tsx';
import { UILabels } from '../../locales/types.ts';
import { generateShareImage } from '../../utils/imageGenerator.ts';

interface CharacterDisplayProps {
  analysis: CharacterAnalysis;
  hanziData: HanziData | null;
  settings: AppSettings;
  labels: UILabels;
  compact?: boolean;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ analysis, hanziData, settings, labels, compact = false }) => {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const isFallback = analysis.meaning.startsWith('Mode:') || analysis.radical === '?';
  const showRichContent = !settings.offlineMode && !isFallback;

  const shareText = `I'm learning to write '${analysis.char}' (${analysis.pinyin}) on HanziMaster! It means "${analysis.meaning}". Check out its animated stroke order!`;
  const shareTitle = labels.shareTitleChar.replace('{char}', analysis.char);
  const shareUrl = `${window.location.origin}?char=${encodeURIComponent(analysis.char)}`;

  const handleShareImage = async () => {
    if (!hanziData) return;
    setIsGeneratingImage(true);
    try {
      const dataUrl = await generateShareImage({
        hanziData,
        analysis,
        settings,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      });
      const link = document.createElement('a');
      link.download = `HanziMaster_${analysis.char}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to generate share image", error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const ShareImageButton = () => (
    <button
      onClick={handleShareImage}
      disabled={isGeneratingImage || !hanziData}
      className="relative inline-flex items-center justify-center p-2 rounded-full transition-colors group text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 disabled:opacity-50"
      title="Share as Image"
    >
        <span className="absolute -bottom-8 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:-bottom-7 transition-all duration-200 pointer-events-none">
            Share as Image
        </span>
        {isGeneratingImage ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
    </button>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min">
      {!compact ? (
          <div className="md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col justify-between relative overflow-hidden group hover:border-vermilion-100 dark:hover:border-vermilion-900 transition-colors">
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
                          <ShareImageButton />
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
      ) : (
          <div className="md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
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
                          <ShareImageButton />
                       </div>
                       <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                          {analysis.meaning}
                       </p>
                  </div>
               </div>
          </div>
      )}

      {settings.showStructure && showRichContent && (
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center hover:border-vermilion-100 dark:hover:border-vermilion-900 transition-colors">
              <span className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">{labels.radical}</span>
              <span className="text-4xl font-hanzi text-slate-800 dark:text-slate-200 mb-1">{analysis.radical}</span>
          </div>
      )}

      {settings.showStructure && (analysis.strokeCount > 0) && (
          <div className={`bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center hover:border-vermilion-100 dark:hover:border-vermilion-900 transition-colors ${!showRichContent ? 'md:col-span-2' : ''}`}>
              <span className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">{labels.strokeCount}</span>
              <span className="text-4xl font-mono font-light text-slate-800 dark:text-slate-200 mb-1">{analysis.strokeCount}</span>
          </div>
      )}

      {settings.showEtymology && showRichContent && (
          <div className="md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-amber-100 dark:hover:border-amber-900/30 transition-colors">
              <div className="flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-500">
                  <History size={18} />
                  <h3 className="font-bold text-sm uppercase tracking-wide">{labels.origin}</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
                  {analysis.etymology}
              </p>
          </div>
      )}

      {settings.showMnemonic && showRichContent && (
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

      {settings.showExamples && showRichContent && (
          <div className="md:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 mt-2">
              <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400">
                  <BookOpen size={18} />
                  <h3 className="font-bold text-sm uppercase tracking-wide">{labels.commonWords}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {analysis.examples.map((ex, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors group">
                      <div className="bg-white dark:bg-slate-800 p-2 rounded text-xl font-hanzi text-slate-800 dark:text-slate-200">
                        <ruby>{ex.word}<rt className="text-[9px] text-vermilion-500">{ex.pinyin}</rt></ruby>
                      </div>
                      <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                              <PronunciationButton text={ex.word} size={14} className="opacity-50 hover:opacity-100" apiKey={settings.apiKey} />
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
  );
};

export default CharacterDisplay;