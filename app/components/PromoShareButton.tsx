
// app/components/PromoShareButton.tsx v1.1.6

import React, { useState, useEffect } from 'react';
import { Share2, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useRandomPromo, Language } from '../hooks/useRandomPromo';
import { PROMO_COPY } from '../constants/promoCopy';

interface PromoShareButtonProps {
  size?: number;
  className?: string;
  lang: Language;
  labels: {
    shareAction: string;
    shareMessageCopied: string;
    copyFailed?: string;
  };
}

const PromoShareButton: React.FC<PromoShareButtonProps> = ({ 
  size = 18, 
  className = "", 
  lang,
  labels 
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [effectiveUrl, setEffectiveUrl] = useState('');
  const { showToast } = useToast();
  const { getRandomCopy } = useRandomPromo();

  useEffect(() => {
    setEffectiveUrl(window.location.origin);
  }, []);

  const handleShare = async () => {
    try {
      const promoCopy = getRandomCopy(lang, effectiveUrl);
      
      if (typeof navigator.share === 'function') {
        await navigator.share({
          title: lang === 'zhCN' ? '汉字大师 - 练字神器' : 'HanziMaster - Chinese Learning',
          text: promoCopy,
          url: effectiveUrl
        });
      } else {
        await navigator.clipboard.writeText(promoCopy);
        setIsCopied(true);
        showToast(labels.shareMessageCopied, 'success');
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.warn('Share failed:', err);
      showToast(labels.copyFailed || "Failed to copy", 'error');
    }
  };
  
  const tooltip = isCopied ? labels.shareMessageCopied : labels.shareAction;

  return (
    <button 
      onClick={handleShare} 
      className={`relative inline-flex items-center justify-center p-2 rounded-full transition-colors group ${className}`} 
      title={tooltip}
    >
      <span className="absolute -bottom-8 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:-bottom-7 transition-all duration-200 pointer-events-none">
        {tooltip}
      </span>
      {isCopied ? (
        <Check size={size} className="text-emerald-500" />
      ) : (
        <Share2 size={size} />
      )}
    </button>
  );
};

export default PromoShareButton;
