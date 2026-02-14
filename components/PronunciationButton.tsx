
/**
 * HanziMaster v0.5.2
 */
import React, { useState } from 'react';
import { Volume2, Loader2, AlertCircle } from 'lucide-react';
import { playPronunciation } from '../services/ttsService';

interface PronunciationButtonProps {
  text: string;
  size?: number;
  className?: string;
  apiKey?: string;
}

const PronunciationButton: React.FC<PronunciationButtonProps> = ({ text, size = 20, className = "", apiKey }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;

    setIsPlaying(true);
    setError(false);

    try {
      await playPronunciation(text, 'zh-CN', apiKey);
      // We don't exactly know when the audio *finishes* playing without hooking into onended of the source node
      // But the API call is the main "loading" part.
      // Let's keep the spinner for a short moment or until the promise resolves (audio loaded).
      // The service plays it immediately.
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPlaying}
      // Increased padding and added min-width/height for better touch targets (Apple HIG recommends 44pt)
      className={`inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2 rounded-full transition-colors ${
        error 
          ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' 
          : 'text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30'
      } ${className}`}
      title="Play pronunciation"
      aria-label={`Pronounce ${text}`}
    >
      {isPlaying ? (
        <Loader2 size={size} className="animate-spin" />
      ) : error ? (
        <AlertCircle size={size} />
      ) : (
        <Volume2 size={size} />
      )}
    </button>
  );
};

export default PronunciationButton;