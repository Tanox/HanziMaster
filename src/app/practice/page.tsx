// src/app/practice/page.tsx v3.0.0
'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { StatsCard } from '@/components/stats-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PracticeOption {
  id: string;
  titleKey: string;
  descKey: string;
  icon: 'pencil' | 'question' | 'chart';
}

interface CharacterQuiz {
  id: number;
  hanzi: string;
  pinyin: string;
  translationKey: string;
  meaning: string;
}

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

// Icons
const icons = {
  pencil: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  question: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 01-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  chart: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h2a2 2 0 01-2-2z" />
    </svg>
  ),
} as const;

const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

const practiceOptions: PracticeOption[] = [
  { id: 'writing', titleKey: 'practice.writingTitle', descKey: 'practice.writingDesc', icon: 'pencil' },
  { id: 'quiz', titleKey: 'practice.quizTitle', descKey: 'practice.quizDesc', icon: 'question' },
  { id: 'progress', titleKey: 'practice.progressTitle', descKey: 'practice.progressDesc', icon: 'chart' },
];

type QuizState = {
  currentIndex: number;
  correctCount: number;
  wrongCount: number;
  answered: boolean;
  selectedAnswer: string | null;
  showPronunciation: boolean;
};

export default function PracticePage() {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Writing practice
  const [showWritingDialog, setShowWritingDialog] = useState(false);
  const [currentWriteChar, setCurrentWriteChar] = useState<CharacterQuiz>(quizCharacters[0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Quiz practice
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>({
    currentIndex: 0,
    correctCount: 0,
    wrongCount: 0,
    answered: false,
    selectedAnswer: null,
    showPronunciation: false,
  });
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [quizShowResult, setQuizShowResult] = useState(false);

  // Progress / stats
  const [showProgressDialog, setShowProgressDialog] = useState(false);

  const currentQuizChar = quizCharacters[quizState.currentIndex];

  // --- Writing practice (Canvas) ---
  useEffect(() => {
    if (!showWritingDialog || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const clearCanvas = () => {
      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(1, '#f5f5f7');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Grid lines
      ctx.strokeStyle = '#d1d5db';
      ctx.lineWidth = 1;
      const gridSize = rect.width / 4;
      for (let i = 1; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, rect.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(rect.width, i * gridSize);
        ctx.stroke();
      }

      // Diagonal
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = '#e5e7eb';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(rect.width, rect.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(rect.width, 0);
      ctx.lineTo(0, rect.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Center cross
      ctx.strokeStyle = '#e5e7eb';
      ctx.beginPath();
      ctx.moveTo(rect.width / 2, 0);
      ctx.lineTo(rect.width / 2, rect.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, rect.height / 2);
      ctx.lineTo(rect.width, rect.height / 2);
      ctx.stroke();

      // Character hint
      ctx.font = `${Math.min(rect.width, rect.height) * 0.4}px serif`;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(currentWriteChar.hanzi, rect.width / 2, rect.height / 2);
    };

    clearCanvas();

    const getPoint = (e: PointerEvent): { x: number; y: number } => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    let isDrawing = false;
    let lastPoint: { x: number; y: number } | null = null;

    const startDrawing = (e: PointerEvent) => {
      isDrawing = true;
      lastPoint = getPoint(e);
      e.preventDefault();
    };

    const draw = (e: PointerEvent) => {
      if (!isDrawing || !lastPoint) return;
      const point = getPoint(e);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
      lastPoint = point;
      e.preventDefault();
    };

    const stopDrawing = () => {
      isDrawing = false;
      lastPoint = null;
    };

    canvas.addEventListener('pointerdown', startDrawing);
    canvas.addEventListener('pointermove', draw);
    canvas.addEventListener('pointerup', stopDrawing);
    canvas.addEventListener('pointerleave', stopDrawing);
    canvas.addEventListener('pointercancel', stopDrawing);

    return () => {
      canvas.removeEventListener('pointerdown', startDrawing);
      canvas.removeEventListener('pointermove', draw);
      canvas.removeEventListener('pointerup', stopDrawing);
      canvas.removeEventListener('pointerleave', stopDrawing);
      canvas.removeEventListener('pointercancel', stopDrawing);
    };
  }, [showWritingDialog, currentWriteChar]);

  // --- Quiz ---
  const generateQuizOptions = useCallback((correctChar: CharacterQuiz) => {
    const options = new Set<string>();
    options.add(correctChar.pinyin);

    while (options.size < 4) {
      const randomChar = quizCharacters[Math.floor(Math.random() * quizCharacters.length)];
      if (randomChar.id !== correctChar.id) {
        options.add(randomChar.pinyin);
      }
    }

    return Array.from(options).sort(() => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    if (showQuizDialog && currentQuizChar) {
      setQuizOptions(generateQuizOptions(currentQuizChar));
    }
  }, [showQuizDialog, currentQuizChar, generateQuizOptions]);

  const handleQuizAnswer = useCallback((selectedPinyin: string) => {
    if (quizState.answered) return;
    const isCorrect = selectedPinyin === currentQuizChar.pinyin;
    setQuizState(prev => ({
      ...prev,
      answered: true,
      selectedAnswer: selectedPinyin,
      correctCount: prev.correctCount + (isCorrect ? 1 : 0),
      wrongCount: prev.wrongCount + (isCorrect ? 0 : 1),
    }));
  }, [quizState.answered, currentQuizChar]);

  const handleNextQuizQuestion = useCallback(() => {
    if (quizState.currentIndex >= quizCharacters.length - 1) {
      setQuizShowResult(true);
      return;
    }
    setQuizState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex + 1,
      answered: false,
      selectedAnswer: null,
      showPronunciation: false,
    }));
  }, [quizState.currentIndex]);

  const resetQuiz = useCallback(() => {
    setQuizState({
      currentIndex: 0,
      correctCount: 0,
      wrongCount: 0,
      answered: false,
      selectedAnswer: null,
      showPronunciation: false,
    });
    setQuizShowResult(false);
  }, []);

  const startWriting = useCallback(() => {
    setShowWritingDialog(true);
  }, []);

  const startQuiz = useCallback(() => {
    resetQuiz();
    setShowQuizDialog(true);
  }, [resetQuiz]);

  const showProgress = useCallback(() => {
    setShowProgressDialog(true);
  }, []);

  const handlePracticeOption = useCallback((optionId: string) => {
    setSelectedOption(optionId);
    if (optionId === 'writing') {
      startWriting();
    } else if (optionId === 'quiz') {
      startQuiz();
    } else if (optionId === 'progress') {
      showProgress();
    }
  }, [startWriting, startQuiz, showProgress]);

  const handlePronounceQuiz = useCallback(() => {
    if (!currentQuizChar) return;
    if (!('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(currentQuizChar.hanzi);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [currentQuizChar]);

  const handlePronounceWrite = useCallback(() => {
    if (!('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(currentWriteChar.hanzi);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [currentWriteChar]);

  const handleClearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, '#f5f5f7');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    const gridSize = rect.width / 4;
    for (let i = 1; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(i * gridSize, 0);
      ctx.lineTo(i * gridSize, rect.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * gridSize);
      ctx.lineTo(rect.width, i * gridSize);
      ctx.stroke();
    }
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#e5e7eb';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(rect.width, rect.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(rect.width, 0);
    ctx.lineTo(0, rect.height);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = '#e5e7eb';
    ctx.beginPath();
    ctx.moveTo(rect.width / 2, 0);
    ctx.lineTo(rect.width / 2, rect.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, rect.height / 2);
    ctx.lineTo(rect.width, rect.height / 2);
    ctx.stroke();
    ctx.font = `${Math.min(rect.width, rect.height) * 0.4}px serif`;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentWriteChar.hanzi, rect.width / 2, rect.height / 2);
  }, [currentWriteChar]);

  const handleNextWriteChar = useCallback(() => {
    const currentIndex = quizCharacters.findIndex(c => c.id === currentWriteChar.id);
    const nextIndex = (currentIndex + 1) % quizCharacters.length;
    setCurrentWriteChar(quizCharacters[nextIndex]);
  }, [currentWriteChar]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 safe-bottom">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground">
          {t('common.practice')} {t('practice.center')}
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('practice.subtitle')}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
        {practiceOptions.map((option) => {
          const isSelected = selectedOption === option.id;
          return (
            <button
              key={option.id}
              onClick={() => handlePracticeOption(option.id)}
              className={`group bg-muted dark:bg-card p-10 rounded-3xl border-2 border-transparent hover:border-[#007aff] dark:hover:border-[#2997ff] hover:-translate-y-1 transition-all duration-300 text-left ${
                isSelected ? 'border-[#007aff] bg-background dark:bg-foreground/5' : ''
              }`}
            >
              <div className={`w-20 h-20 bg-gradient-to-br from-[#007aff]/10 to-[#af52de]/10 dark:from-[#007aff]/20 dark:to-[#af52de]/20 rounded-[20px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-[#007aff] ${
                isSelected ? 'bg-[#007aff] text-white' : ''
              }`}>
                {icons[option.icon]}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {t(option.titleKey)}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                {t(option.descKey)}
              </p>
              <div className={`flex items-center gap-2 font-semibold ${isSelected ? 'text-foreground' : 'text-[#007aff]'} group`}>
                <span>{t('practice.startNow')}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l-4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-muted dark:bg-card rounded-[32px] p-10 border border-border">
        <h3 className="text-2xl font-semibold mb-10 text-foreground">
          {t('practice.weeklyProgress')}
        </h3>

        <div className="grid grid-cols-7 gap-4 mb-10">
          {weekDays.map((day, index) => (
            <div
              key={day}
              className={`flex flex-col items-center p-5 rounded-[20px] ${
                index < 5
                  ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground'
                  : 'bg-background dark:bg-foreground/5 text-muted-foreground border border-border'
              } ${index === 4 ? 'ring-2 ring-[#007aff]' : ''}`}
            >
              <p className="text-xs mb-3 font-medium">{t(`practice.${day}`)}</p>
              <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center ${
                index < 5 ? 'bg-white/20 dark:bg-black/10' : 'bg-muted dark:bg-foreground/10'
              }`}>
                {index < 5 ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-xs font-medium">{index === 4 ? t('practice.today') : t('practice.pending')}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <StatsCard
            label="practice.charactersLearned"
            value="12"
            icon={icons.pencil}
          />
          <StatsCard
            label="practice.dayStreak"
            value="5"
            icon={icons.question}
          />
          <StatsCard
            label="practice.accuracy"
            value="87%"
            icon={icons.chart}
          />
        </div>
      </div>

      {/* Writing Practice Dialog */}
      <Dialog open={showWritingDialog} onOpenChange={setShowWritingDialog}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {t('practice.writingTitle')}
            </DialogTitle>
            <DialogDescription>
              {t('practice.writingDialogDesc')}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-5xl font-light hanzi-font text-foreground">{currentWriteChar.hanzi}</span>
              <Badge variant="secondary" className="text-base">
                {currentWriteChar.pinyin}
              </Badge>
              <Button variant="ghost" size="sm" onClick={handlePronounceWrite}>
                🔊
              </Button>
            </div>
            <canvas
              ref={canvasRef}
              className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-[24px] border-2 border-border cursor-crosshair touch-none shadow-md"
              aria-label={`Write character ${currentWriteChar.hanzi}`}
            />
          </div>
          <DialogFooter className="flex flex-row sm:justify-between gap-2">
            <div className="text-sm text-muted-foreground">
              {t('practice.characterProgress', { current: quizCharacters.findIndex(c => c.id === currentWriteChar.id) + 1, total: quizCharacters.length })}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleClearCanvas}>{t('practice.clear')}</Button>
              <Button variant="ghost" onClick={handleNextWriteChar}>{t('practice.next')}</Button>
              <Button onClick={() => setShowWritingDialog(false)}>{t('practice.done')}</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quiz Dialog */}
      <Dialog open={showQuizDialog} onOpenChange={setShowQuizDialog}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {t('practice.quizTitle')}
            </DialogTitle>
            <DialogDescription>
              {t('practice.quizDialogDesc')}
            </DialogDescription>
          </DialogHeader>

          {quizShowResult ? (
            <div className="flex flex-col items-center gap-6 py-8">
              <div className="text-6xl font-bold text-[#007aff]">
                {Math.round((quizState.correctCount / quizCharacters.length) * 100)}%
              </div>
              <div className="text-center">
                <div className="text-xl text-foreground mb-2">{t('practice.quizComplete')}</div>
                <div className="text-muted-foreground">
                  {t('practice.correct')} {quizState.correctCount} · {t('practice.wrong')} {quizState.wrongCount}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setShowQuizDialog(false)}>{t('practice.close')}</Button>
                <Button onClick={resetQuiz}>{t('practice.retake')}</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  问题 {quizState.currentIndex + 1} / {quizCharacters.length}
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-green-600">✓ {quizState.correctCount}</span>
                  <span className="text-red-600">✗ {quizState.wrongCount}</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 py-4">
                <div className="text-[100px] font-light hanzi-font text-foreground">
                  {currentQuizChar?.hanzi}
                </div>
                <Button variant="ghost" size="sm" onClick={handlePronounceQuiz}>
                  🔊 {t('practice.listenPronunciation')}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {quizOptions.map((option) => {
                  const isSelected = quizState.selectedAnswer === option;
                  const isCorrect = option === currentQuizChar?.pinyin;
                  let buttonClass = '';
                  if (quizState.answered) {
                    if (isCorrect) {
                      buttonClass = 'bg-green-500 text-white hover:bg-green-500';
                    } else if (isSelected && !isCorrect) {
                      buttonClass = 'bg-red-500 text-white hover:bg-red-500';
                    }
                  }
                  return (
                    <Button
                      key={option}
                      variant={quizState.answered ? 'outline' : 'secondary'}
                      size="lg"
                      className={`text-lg py-6 font-medium ${buttonClass}`}
                      disabled={quizState.answered}
                      onClick={() => handleQuizAnswer(option)}
                    >
                      {option}
                    </Button>
                  );
                })}
              </div>

              {quizState.answered && (
                <div className="flex justify-end mt-2">
                  <Button onClick={handleNextQuizQuestion}>
                    {quizState.currentIndex >= quizCharacters.length - 1 ? t('practice.viewResults') : t('practice.nextQuestion')}
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Progress Dialog */}
      <Dialog open={showProgressDialog} onOpenChange={setShowProgressDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {t('practice.progressTitle')}
            </DialogTitle>
            <DialogDescription>
              {t('practice.progressDialogDesc')}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="bg-muted rounded-[20px] p-6 text-center">
              <div className="text-4xl font-bold text-[#007aff] mb-2">12</div>
              <div className="text-sm text-muted-foreground">已学汉字</div>
            </div>
            <div className="bg-muted rounded-[20px] p-6 text-center">
              <div className="text-4xl font-bold text-[#af52de] mb-2">5</div>
              <div className="text-sm text-muted-foreground">连续天数</div>
            </div>
            <div className="bg-muted rounded-[20px] p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">87%</div>
              <div className="text-sm text-muted-foreground">准确率</div>
            </div>
          </div>

          <div className="py-4">
            <h4 className="text-lg font-semibold mb-4 text-foreground">学习汉字</h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {quizCharacters.map((char) => (
                <div
                  key={char.id}
                  className="aspect-square flex flex-col items-center justify-center bg-background dark:bg-foreground/5 rounded-2xl p-3 border border-border"
                >
                  <span className="text-2xl font-light hanzi-font text-foreground">{char.hanzi}</span>
                  <span className="text-xs text-muted-foreground mt-1">{char.pinyin}</span>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setShowProgressDialog(false)}>{t('practice.close')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
