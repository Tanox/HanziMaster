// src/app/learn/page.tsx v5.1.0
'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { characters } from '@/lib/characters';
import { CharacterGrid } from '@/components/learn/character-grid';
import { CharacterDetail } from '@/components/learn/character-detail';
import { QuizDialog } from '@/components/learn/quiz-dialog';

export default function LearnPage() {
  const { t } = useTranslation();
  useScrollReveal();
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(characters[0]?.id ?? null);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizCorrect, setQuizCorrect] = useState<boolean | null>(null);
  const autoCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedCharacter = characters.find((c) => c.id === selectedCharacterId) || null;

  // 答对后定时自动关闭弹窗；用 ref 持有句柄以便关闭/卸载时清理，
  // 避免用户提前关闭或路由切换后定时器仍触发，造成操作已卸载组件或状态错乱。
  const handleQuizSubmit = () => {
    if (!selectedCharacter) return;
    const isCorrect = quizAnswer.toLowerCase() === selectedCharacter.pinyin.toLowerCase();
    setQuizCorrect(isCorrect);
    if (isCorrect) {
      autoCloseTimer.current = setTimeout(() => {
        setShowQuizDialog(false);
        setQuizAnswer('');
        setQuizCorrect(null);
      }, 1500);
    }
  };

  const clearAutoCloseTimer = () => {
    if (autoCloseTimer.current) {
      clearTimeout(autoCloseTimer.current);
      autoCloseTimer.current = null;
    }
  };

  // 组件卸载时清理定时器
  useEffect(() => clearAutoCloseTimer, []);

  // 使用 Web Speech API 朗读汉字发音
  const speak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'zh-CN';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch {
      // 语音合成不可用时静默忽略
    }
  };

  const handleNextCharacter = () => {
    const idx = characters.findIndex((c) => c.id === (selectedCharacterId ?? -1));
    const next = characters[(idx + 1) % characters.length];
    setSelectedCharacterId(next.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ink-50/50 to-background dark:from-ink-950/50 dark:to-background">
      <div className="max-w-6xl mx-auto px-6 py-16 safe-bottom">
        <div className="text-center mb-12 reveal">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 text-ink-900 dark:text-ink-50 display-font">
            {t('common.dailyPractice')}
          </h2>
          <p className="text-xl text-ink-600 dark:text-ink-300">
            {t('common.masterCharacters')}
          </p>
        </div>

        <CharacterGrid selectedId={selectedCharacterId} onSelect={setSelectedCharacterId} />

        {selectedCharacter && (
          <CharacterDetail
            character={selectedCharacter}
            onStartQuiz={() => setShowQuizDialog(true)}
            onNextCharacter={handleNextCharacter}
            onSpeak={speak}
          />
        )}
      </div>

      <QuizDialog
        open={showQuizDialog}
        onOpenChange={(open) => {
          if (!open) clearAutoCloseTimer();
          setShowQuizDialog(open);
        }}
        character={selectedCharacter}
        value={quizAnswer}
        onChange={(v) => {
          setQuizAnswer(v);
          setQuizCorrect(null);
        }}
        correct={quizCorrect}
        onSubmit={handleQuizSubmit}
      />
    </div>
  );
}
