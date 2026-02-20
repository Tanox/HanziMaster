
import React, { useState, useEffect } from 'react';
import { Share2, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { PROMO_COPY } from '../constants/promoCopy';

interface PromoShareButtonProps {
  size?: number;
  className?: string;
  lang: 'zhCN' | 'en';
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
  const [effectiveUrl, setEffectiveUrl] = useState('');
  const [lastIndex, setLastIndex] = useState({
    zhCN: -1,
    en: -1
  });
  const { showToast } = useToast();

  const getRandomCopy = (currentLang: 'zhCN' | 'en', url: string): string =&gt; {
    const copies = PROMO_COPY[currentLang];
    
    if (copies.length === 0) {
      return '';
    }

    if (copies.length === 1) {
      return copies[0].replace('{url}', url);
    }

    let newIndex: number;
    do {
      newIndex = Math.floor(Math.random() * copies.length);
    } while (newIndex === lastIndex[currentLang]);

    setLastIndex(prev =&gt; ({ ...prev, [currentLang]: newIndex }));
    return copies[newIndex].replace('{url}', url);
  };

  useEffect(() =&gt; {
    setEffectiveUrl(window.location.origin);
  }, []);

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
