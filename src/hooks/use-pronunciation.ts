// src/hooks/use-pronunciation.ts v3.0.0
'use client';

import { useCallback, useEffect, useState } from 'react';

// 汉字发音 Hook，基于 Web Speech API。
// 统一处理 isSpeaking 状态、不支持时的错误反馈，以及组件卸载时中断发音。
export function usePronunciation() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pronounceError, setPronounceError] = useState(false);

  const speak = useCallback((hanzi: string) => {
    if (!('speechSynthesis' in window)) {
      setPronounceError(true);
      return;
    }
    setPronounceError(false);
    const utterance = new SpeechSynthesisUtterance(hanzi);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      setPronounceError(true);
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, []);

  // 组件卸载时中断正在播放的发音，避免延续到卸载后
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return { isSpeaking, pronounceError, speak };
}
