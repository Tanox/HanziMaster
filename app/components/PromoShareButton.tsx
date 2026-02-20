
// app/components/PromoShareButton.tsx v1.0.0

import React, { useState } from 'react';
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

const PromoShareButton: React.FC&lt;PromoShareButtonProps&gt; = ({ 
  size = 18, 
  className = "", 
  lang,
  labels 
}) =&gt; {
  const [isCopied, setIsCopied] = useState(false);
  const { showToast } = useToast();
  const { getRandomCopy } = useRandomPromo();
  const effectiveUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const handleShare = async () =&gt; {
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
        setTimeout(() =&gt; setIsCopied(false), 2000);
      }
    } catch (err) {
      console.warn('Share failed:', err);
      showToast(labels.copyFailed || "Failed to copy", 'error');
    }
  };
  
  const tooltip = isCopied ? labels.shareMessageCopied : labels.shareAction;

  return (
    &lt;button 
      onClick={handleShare} 
      className={`relative inline-flex items-center justify-center p-2 rounded-full transition-colors group ${className}`} 
      title={tooltip}
    &gt;
      &lt;span className="absolute -bottom-8 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:-bottom-7 transition-all duration-200 pointer-events-none"&gt;
        {tooltip}
      &lt;/span&gt;
      {isCopied ? (
        &lt;Check size={size} className="text-emerald-500" /&gt;
      ) : (
        &lt;Share2 size={size} /&gt;
      )}
    &lt;/button&gt;
  );
};

export default PromoShareButton;
