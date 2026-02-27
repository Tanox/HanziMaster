// app/components/ShareButton.tsx v1.0.1
'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

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

const ShareButton: React.FC<ShareButtonProps> = ({ title, text, url, size = 18, className = "", labels }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { showToast } = useToast();
  const effectiveUrl = url || window.location.origin;

  const handleShare = async () => {
    const hasUrlInText = text.includes(effectiveUrl);
    const shareData: ShareData = { title, text };
    if (!hasUrlInText) {
      shareData.url = effectiveUrl;
    }

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.warn('Web Share API failed:', err);
      }
    } else {
      try {
        const fullText = hasUrlInText ? text : `${text}\n\n${effectiveUrl}`;
        await navigator.clipboard.writeText(fullText);
        setIsCopied(true);
        showToast(labels.shareMessageCopied, 'success');
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        showToast(labels.copyFailed || "Failed to copy", 'error');
      }
    }
  };
  
  const tooltip = isCopied ? labels.shareMessageCopied : labels.shareAction;

  return (
    <button onClick={handleShare} className={`relative inline-flex items-center justify-center p-2 rounded-full transition-colors group ${className}`} title={tooltip}>
      <span className="absolute -bottom-8 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:-bottom-7 transition-all duration-200 pointer-events-none">{tooltip}</span>
      {isCopied ? <Check size={size} className="text-emerald-500" /> : <Share2 size={size} />}
    </button>
  );
};

export default ShareButton;
