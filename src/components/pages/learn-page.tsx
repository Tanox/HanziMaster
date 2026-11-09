// src/components/pages/learn-page.tsx v5.2.47
'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { usePronunciation } from '@/hooks/use-pronunciation';
import { useHaptic } from '@/hooks/use-haptic';
import { characters } from '@/lib/characters';
import { CharacterGrid } from '@/components/learn/character-grid';
import { CharacterDetail } from '@/components/learn/character-detail';
import dynamic from 'next/dynamic';

// 测验弹窗按需拆包（P1-12）
const QuizDialog = dynamic(
  () => import('@/components/learn/quiz-dialog').then((m) => m.QuizDialog),
  { ssr: false }
);
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
  const currentIndex = Math.max(0, characters.findIndex((c) => c.id === selectedCharacterId));

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
    <div id="learn-page" className="min-h-screen bg-background">
      <div id="learn-content" className="safe-bottom mx-auto max-w-6xl px-6 py-10 sm:py-14">
        {/* 编辑式页眉：题名 + 当前字序号 + 键盘提示，发丝线与页面分隔 */}
        <div className="reveal mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-ink-200 pb-5 text-start dark:border-ink-800">
          <div>
            <h2 className="display-font text-3xl font-semibold tracking-tight text-ink-900 dark:text-ink-50 sm:text-4xl">
              {t('common.dailyPractice')}
            </h2>
            <p className="mt-1.5 text-sm text-ink-600 dark:text-ink-300">
              {t('common.masterCharacters')}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="display-font text-2xl text-vermilion-600 dark:text-vermilion-400" aria-hidden="true">
              {String(currentIndex + 1).padStart(2, '0')}
              <span className="text-ink-300 dark:text-ink-600">/{String(characters.length).padStart(2, '0')}</span>
            </span>
            <p className="hidden items-center gap-2 text-xs text-ink-400 dark:text-ink-500 md:flex">
              <kbd className="kbd" aria-hidden="true">←</kbd>
              <kbd className="kbd" aria-hidden="true">→</kbd>
              <span>{t('learn.kbdHint')}</span>
            </p>
          </div>
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
          <EmptyState className="mb-8" />
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
