// app/components/analysis/ShareImageButton.tsx v1.1.0
import React, { useState } from 'react';
import { Loader2, Image as ImageIcon, Download, Share2 } from 'lucide-react';
import { CharacterAnalysis, AppSettings, HanziData } from '../../types';
import { generateShareImage } from '../../utils/imageGenerator';
import { useToast } from '../../context/ToastContext';

interface ShareImageButtonProps {
  analysis: CharacterAnalysis;
  settings: AppSettings;
  score?: number;
  grade?: any;
  label?: string;
  className?: string;
}

const ShareImageButton: React.FC<ShareImageButtonProps> = ({ 
  analysis, 
  settings, 
  score, 
  grade,
  label,
  className = ""
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { showToast } = useToast();

  const handleShare = async () => {
    setIsGenerating(true);
    try {
      const dataUrl = await generateShareImage({
        char: analysis.char,
        pinyin: analysis.pinyin,
        meaning: analysis.meaning,
        score,
        grade,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      });

      // 1. Native File Share (Mobile)
      if (navigator.share && navigator.canShare) {
        try {
          const blob = await (await fetch(dataUrl)).blob();
          const file = new File([blob], `HanziMaster_${analysis.char}.png`, { type: 'image/png' });
          const shareData = {
            files: [file],
            title: `HanziMaster: ${analysis.char}`,
            text: `Check out my progress with '${analysis.char}' on HanziMaster!`
          };

          if (navigator.canShare(shareData)) {
            await navigator.share(shareData);
            setIsGenerating(false);
            return;
          }
        } catch (e) {
          if ((e as Error).name !== 'AbortError') console.error("Share failed", e);
        }
      }

      // 2. Download Fallback (Desktop/Legacy)
      const link = document.createElement('a');
      link.download = `HanziMaster_${analysis.char}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Card saved to downloads", "success");

    } catch (error) {
      console.error("Failed to generate share image", error);
      showToast("Image generation failed", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const isMobileShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <button
      onClick={handleShare}
      disabled={isGenerating}
      className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${isGenerating ? 'opacity-70' : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'} ${className}`}
      title={isMobileShare ? "Share Artistic Card" : "Download Card"}
    >
      <div className="relative">
        {isGenerating ? (
            <Loader2 size={18} className="animate-spin text-teal-600" />
        ) : (
            isMobileShare ? <Share2 size={18} className="text-slate-400 group-hover:text-teal-600 transition-colors" /> : <Download size={18} className="text-slate-400 group-hover:text-teal-600 transition-colors" />
        )}
      </div>
      {label && <span className="text-sm font-bold text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-200">{label}</span>}
      
      {/* Tooltip */}
      {!label && (
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isGenerating ? "Grinding Ink..." : (isMobileShare ? "Share Card" : "Save Image")}
          </span>
      )}
    </button>
  );
};

export default ShareImageButton;
