// src/app/learn/page.tsx v5.2.38
'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { usePronunciation } from '@/hooks/use-pronunciation';
import { useHaptic } from '@/hooks/use-haptic';
import { characters } from '@/lib/characters';
import { CharacterGrid } from '@/components/learn/character-grid';
import { CharacterDetail } from '@/components/learn/character-detail';
import { QuizDialog } from '@/components/learn/quiz-dialog';
import { EmptyState } from '@/components/state/state-views';

export default function LearnPage() {
  const { t } = useTranslation();
  useScrollReveal();
  const { speak, pronounceError, speechSupported } = usePronunciation();
  const vibrate = useHaptic();
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
    vibrate(isCorrect ? 'success' : 'error');
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

  const goCharacter = (delta: number) => {
    const idx = characters.findIndex((c) => c.id === (selectedCharacterId ?? -1));
    const next = characters[(idx + delta + characters.length) % characters.length];
    setSelectedCharacterId(next.id);
  };

  const handleNextCharacter = () => goCharacter(1);

  // 键盘快捷键：← → 切换汉字（弹窗打开或组合键时忽略）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showQuizDialog || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'ArrowRight') goCharacter(1);
      if (e.key === 'ArrowLeft') goCharacter(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div id="learn-page" className="min-h-screen bg-linear-to-b from-ink-50/50 to-background dark:from-ink-950/50 dark:to-background">
      <div id="learn-content" className="max-w-6xl mx-auto px-6 py-16 safe-bottom">
        <div className="text-center mb-12 reveal">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 text-ink-900 dark:text-ink-50 display-font">
            {t('common.dailyPractice')}
          </h2>
          <p className="text-xl text-ink-600 dark:text-ink-300">
            {t('common.masterCharacters')}
          </p>
        </div>

        <CharacterGrid selectedId={selectedCharacterId} onSelect={setSelectedCharacterId} />

        {selectedCharacter ? (
          <CharacterDetail
            key={selectedCharacter.id}
            character={selectedCharacter}
            onStartQuiz={() => setShowQuizDialog(true)}
            onNextCharacter={handleNextCharacter}
            onSpeak={speak}
            speechSupported={speechSupported}
            pronounceError={pronounceError}
          />
        ) : (
          <EmptyState className="mb-12" />
        )}

        <p className="hidden md:flex items-center justify-center gap-2 text-xs text-ink-400 dark:text-ink-500">
          <kbd className="kbd" aria-hidden="true">←</kbd>
          <kbd className="kbd" aria-hidden="true">→</kbd>
          <span>{t('learn.kbdHint')}</span>
        </p>
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
