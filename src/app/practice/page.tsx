// src/app/practice/page.tsx v5.1.0
'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { useProgress } from '@/hooks/use-progress';
import { characters } from '@/lib/characters';
import type { CharacterQuiz } from '@/components/practice/practice-assets';
import { PracticeOptionsGrid } from '@/components/practice/practice-options';
import { WeeklyProgress } from '@/components/practice/weekly-progress';
import { WritingDialog } from '@/components/practice/writing-dialog';
import { QuizDialog } from '@/components/practice/quiz-dialog';

// 汉字到笔画数的映射，供书写对话框显示描红提示
const strokeMap = new Map(characters.map((c) => [c.hanzi, c.strokes]));

// 测验候选字符（顺序固定，便于索引切换）
const quizCharacters: CharacterQuiz[] = [
  { id: 1, hanzi: '一', pinyin: 'yī', translationKey: 'learn.one', meaning: 'One' },
  { id: 2, hanzi: '二', pinyin: 'èr', translationKey: 'learn.two', meaning: 'Two' },
  { id: 3, hanzi: '三', pinyin: 'sān', translationKey: 'learn.three', meaning: 'Three' },
  { id: 4, hanzi: '人', pinyin: 'rén', translationKey: 'learn.person', meaning: 'Person' },
  { id: 5, hanzi: '大', pinyin: 'dà', translationKey: 'learn.big', meaning: 'Big' },
  { id: 6, hanzi: '小', pinyin: 'xiǎo', translationKey: 'learn.small', meaning: 'Small' },
  { id: 7, hanzi: '口', pinyin: 'kǒu', translationKey: 'learn.mouth', meaning: 'Mouth' },
  { id: 8, hanzi: '日', pinyin: 'rì', translationKey: 'learn.sunDay', meaning: 'Sun/Day' },
  { id: 9, hanzi: '月', pinyin: 'yuè', translationKey: 'learn.moonMonth', meaning: 'Moon' },
  { id: 10, hanzi: '山', pinyin: 'shān', translationKey: 'learn.mountain', meaning: 'Mountain' },
  { id: 11, hanzi: '水', pinyin: 'shuǐ', translationKey: 'learn.water', meaning: 'Water' },
  { id: 12, hanzi: '火', pinyin: 'huǒ', translationKey: 'learn.fire', meaning: 'Fire' },
];

interface QuizState {
  currentIndex: number;
  correctCount: number;
  wrongCount: number;
  answered: boolean;
}

const INITIAL_QUIZ_STATE: QuizState = {
  currentIndex: 0,
  correctCount: 0,
  wrongCount: 0,
  answered: false,
};

export default function PracticePage() {
  const { t } = useTranslation();
  const progress = useProgress();

  // 滚动揭示动画（reveal 元素进入视口时添加 revealed 类）
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showWritingDialog, setShowWritingDialog] = useState(false);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [currentWriteChar, setCurrentWriteChar] = useState<CharacterQuiz>(quizCharacters[0]);
  const [quizState, setQuizState] = useState<QuizState>(INITIAL_QUIZ_STATE);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const handlePracticeOption = (optionId: string) => {
    setSelectedOption(optionId);
    if (optionId === 'writing') {
      setShowWritingDialog(true);
    } else if (optionId === 'quiz') {
      setShowQuizDialog(true);
    }
  };

  const handleNextWriteChar = () => {
    // 书写练习即视为已学习该字，持久化到进度系统
    progress.markLearned(currentWriteChar.id);
    const currentIndex = quizCharacters.findIndex((c) => c.id === currentWriteChar.id);
    const nextIndex = (currentIndex + 1) % quizCharacters.length;
    setCurrentWriteChar(quizCharacters[nextIndex]);
  };

  const handleQuizAnswer = (answer: string) => {
    if (quizState.answered) return;
    setSelectedAnswer(answer);
    const currentQuizChar = quizCharacters[quizState.currentIndex];
    const isCorrect = answer === currentQuizChar.hanzi;
    // 记录测验结果，驱动进度统计（连胜/准确率/周活动）
    progress.recordQuizResult(currentQuizChar.id, isCorrect);
    setQuizState((prev) => ({
      ...prev,
      correctCount: isCorrect ? prev.correctCount + 1 : prev.correctCount,
      wrongCount: isCorrect ? prev.wrongCount : prev.wrongCount + 1,
      answered: true,
    }));
  };

  const resetQuiz = () => {
    setQuizState(INITIAL_QUIZ_STATE);
    setSelectedAnswer('');
  };

  const handleNextQuiz = () => {
    const nextIndex = quizState.currentIndex + 1;
    if (nextIndex >= quizCharacters.length) {
      setShowQuizDialog(false);
      resetQuiz();
    } else {
      setQuizState((prev) => ({ ...prev, currentIndex: nextIndex, answered: false }));
      setSelectedAnswer('');
    }
  };

  const handleQuizOpenChange = (open: boolean) => {
    setShowQuizDialog(open);
    if (!open) resetQuiz();
  };

  const currentQuizChar = quizCharacters[quizState.currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-ink-50/50 to-background dark:from-ink-950/50 dark:to-background">
      <div className="max-w-6xl mx-auto px-6 py-16 safe-bottom">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-ink-900 dark:text-ink-50 display-font">
            {t('common.practice')} {t('practice.center')}
          </h2>
          <p className="text-xl text-ink-600 dark:text-ink-300 max-w-2xl mx-auto">
            {t('practice.subtitle')}
          </p>
        </div>

        <PracticeOptionsGrid selectedOption={selectedOption} onSelect={handlePracticeOption} />

        <WeeklyProgress
          charactersLearned={progress.getLearnedCount()}
          dayStreak={progress.streak}
          accuracy={progress.accuracy}
          weeklyActivity={progress.getWeeklyActivity()}
        />
      </div>

      <WritingDialog
        open={showWritingDialog}
        onOpenChange={setShowWritingDialog}
        character={currentWriteChar}
        strokeCount={strokeMap.get(currentWriteChar.hanzi) ?? currentWriteChar.hanzi.length}
        onNext={handleNextWriteChar}
      />

      <QuizDialog
        open={showQuizDialog}
        onOpenChange={handleQuizOpenChange}
        character={currentQuizChar}
        selectedAnswer={selectedAnswer}
        answered={quizState.answered}
        onAnswer={handleQuizAnswer}
        onNext={handleNextQuiz}
      />
    </div>
  );
}
