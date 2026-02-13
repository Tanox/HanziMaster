

/**
 * HanziMaster v0.4.2
 */
import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext.tsx';

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
  size?: number;
  className?: string;
  labels: {
    shareAction: string;
    shareMessageCopied: string;
    copyFailed?: string;
  };
}

const ShareButton: React.FC<ShareButtonProps> = ({ 
  title, 
  text, 
  url, 
  size = 18, 
  className = "", 
  labels 
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const { showToast } = useToast();
  const effectiveUrl = url || window.location.origin;

  const handleShare = async () => {
    const shareData = {
      title: title,
      text: text,
      url: effectiveUrl,
    };

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.warn('Web Share API failed:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        const fullText = `${text}\n\n${effectiveUrl}`;
        await navigator.clipboard.writeText(fullText);
        setIsCopied(true);
        showToast(labels.shareMessageCopied, 'success');
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
        showToast(labels.copyFailed || "Failed to copy", 'error');
      }
    }
  };
  
  const tooltip = isCopied ? labels.shareMessageCopied : labels.shareAction;

  return (
    <button
      onClick={handleShare}
      className={`relative inline-flex items-center justify-center p-2 rounded-full transition-colors group ${className}`}
      title={tooltip}
      aria-label={tooltip}
    >
      <span className="absolute -bottom-8 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:-bottom-7 transition-all duration-200 pointer-events-none">
        {tooltip}
      </span>
      {isCopied ? (
        <Check size={size} className="text-emerald-500" />
      ) : typeof navigator.share === 'function' ? (
        <Share2 size={size} />
      ) : (
        <Copy size={size} />
      )}
    </button>
  );
};

export default ShareButton;