
/**
 * HanziMaster v0.4.9
 */
import React, { useState } from 'react';
import { Loader2, Share2, Download } from 'lucide-react';
import { CharacterAnalysis, AppSettings, HanziData } from '../../types';
import { generateShareImage } from '../../utils/imageGenerator';

interface ShareImageButtonProps {
  hanziData: HanziData | null;
  analysis: CharacterAnalysis;
  settings: AppSettings;
}

const ShareImageButton: React.FC<ShareImageButtonProps> = ({ hanziData, analysis, settings }) => {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

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

      // Try Native Web Share API Level 2 (File Sharing)
      if (typeof navigator !== 'undefined' && 'share' in navigator && 'canShare' in navigator) {
         try {
             const blob = await (await fetch(dataUrl)).blob();
             const file = new File([blob], `HanziMaster_${analysis.char}.png`, { type: 'image/png' });
             const shareData = {
                 files: [file],
                 title: `HanziMaster: ${analysis.char}`,
                 text: `Mastered the character ${analysis.char} (${analysis.pinyin}) on HanziMaster!`
             };

             if (navigator.canShare(shareData)) {
                 await navigator.share(shareData);
                 setIsGeneratingImage(false);
                 return;
             }
         } catch (e) {
             // AbortError is common if user cancels, just ignore
             if ((e as Error).name !== 'AbortError') {
                console.warn("Share failed, falling back to download", e);
             } else {
                 setIsGeneratingImage(false);
                 return;
             }
         }
      }

      // Fallback: Download Image
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

  const canNativeShare = typeof navigator !== 'undefined' && 'share' in navigator && 'canShare' in navigator;

  return (
    <button
      onClick={handleShareImage}
      disabled={isGeneratingImage || !hanziData}
      className="relative inline-flex items-center justify-center p-2 rounded-full transition-colors group text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-600 dark:hover:text-slate-300 disabled:opacity-50"
      title={canNativeShare ? "Share Image" : "Download Image"}
    >
        <span className="absolute -bottom-8 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:-bottom-7 transition-all duration-200 pointer-events-none w-max z-50">
            {canNativeShare ? "Share Image" : "Download Image"}
        </span>
        {isGeneratingImage ? (
            <Loader2 size={18} className="animate-spin" />
        ) : canNativeShare ? (
            <Share2 size={18} />
        ) : (
            <Download size={18} />
        )}
    </button>
  );
};

export default ShareImageButton;
