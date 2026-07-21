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
import { characters } from '@/lib/characters';

const strokeMap = new Map(characters.map((c) => [c.hanzi, c.strokes]));

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

const icons = {
  pencil: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  question: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 01-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  chart: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h2a2 2 0 01-2-2z" />
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
};

export default function PracticePage() {
  const { t } = useTranslation();

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
  const [quizState, setQuizState] = useState<QuizState>({
    currentIndex: 0,
    correctCount: 0,
    wrongCount: 0,
    answered: false,
  });
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  const handlePracticeOption = (optionId: string) => {
    setSelectedOption(optionId);
    if (optionId === 'writing') {
      setShowWritingDialog(true);
    } else if (optionId === 'quiz') {
      setShowQuizDialog(true);
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleCanvasMouseUp = () => {
    isDrawing.current = false;
  };

  const handleCanvasTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const touch = e.touches[0];
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleCanvasTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleCanvasTouchEnd = () => {
    isDrawing.current = false;
  };

  const clearCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1a1a1a';

    ctx.font = `${Math.min(rect.width, rect.height) * 0.4}px serif`;
    ctx.fillStyle = 'rgba(26, 26, 26, 0.08)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentWriteChar.hanzi, rect.width / 2, rect.height / 2);
  }, [currentWriteChar]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1a1a1a';

    ctx.font = `${Math.min(rect.width, rect.height) * 0.4}px serif`;
    ctx.fillStyle = 'rgba(26, 26, 26, 0.08)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentWriteChar.hanzi, rect.width / 2, rect.height / 2);

    return () => { };
  }, [currentWriteChar]);

  const handleNextWriteChar = useCallback(() => {
    const currentIndex = quizCharacters.findIndex(c => c.id === currentWriteChar.id);
    const nextIndex = (currentIndex + 1) % quizCharacters.length;
    setCurrentWriteChar(quizCharacters[nextIndex]);
  }, [currentWriteChar]);

  const handleQuizAnswer = (answer: string) => {
    if (quizState.answered) return;
    setSelectedAnswer(answer);
    const currentQuizChar = quizCharacters[quizState.currentIndex];
    const isCorrect = answer === currentQuizChar.hanzi;

    setQuizState(prev => ({
      ...prev,
      correctCount: isCorrect ? prev.correctCount + 1 : prev.correctCount,
      wrongCount: isCorrect ? prev.wrongCount : prev.wrongCount + 1,
      answered: true,
    }));
  };

  const handleNextQuiz = () => {
    const nextIndex = quizState.currentIndex + 1;
    if (nextIndex >= quizCharacters.length) {
      setShowQuizDialog(false);
      setQuizState({
        currentIndex: 0,
        correctCount: 0,
        wrongCount: 0,
        answered: false,
      });
      setSelectedAnswer('');
    } else {
      setQuizState(prev => ({
        ...prev,
        currentIndex: nextIndex,
        answered: false,
      }));
      setSelectedAnswer('');
    }
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

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 stagger-children">
          {practiceOptions.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handlePracticeOption(option.id)}
                className={`group bg-white/80 dark:bg-ink-900/80 backdrop-blur-sm p-10 rounded-3xl border-2 border-ink-100 dark:border-ink-800 hover:border-vermilion-300 dark:hover:border-vermilion-500 hover:-translate-y-2 hover:shadow-ink-lg transition-[colors,transform] duration-300 text-left ${
                  isSelected ? 'border-vermilion-500 shadow-vermilion-glow' : ''
                }`}
              >
                <div className={`relative w-20 h-20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                  isSelected ? 'bg-vermilion-500 text-white' : 'bg-gradient-to-br from-vermilion-500/10 to-indigo/10 dark:from-vermilion-500/20 dark:to-indigo/20 text-vermilion-500'
                }`}>
                  {icons[option.icon]}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-ink-900 dark:text-ink-50 display-font">
                  {t(option.titleKey)}
                </h3>
                <p className="text-base text-ink-600 dark:text-ink-300 leading-relaxed mb-6">
                  {t(option.descKey)}
                </p>
                <div className={`flex items-center gap-2 font-semibold ${isSelected ? 'text-white' : 'text-vermilion-500'} group`}>
                  <span>{t('practice.startNow')}</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l-4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-white/80 dark:bg-ink-900/80 backdrop-blur-xl rounded-4xl p-10 border border-ink-100 dark:border-ink-800 reveal shadow-ink-lg">
          <h3 className="text-2xl font-semibold mb-10 text-ink-900 dark:text-ink-50 display-font">
            {t('practice.weeklyProgress')}
          </h3>

          <div className="grid grid-cols-7 gap-4 mb-10">
            {weekDays.map((day, index) => (
              <div
                key={day}
                className={`flex flex-col items-center p-5 rounded-xl ${
                  index < 5
                    ? 'bg-gradient-to-br from-vermilion-500 to-vermilion-600 text-white'
                    : 'bg-ink-50/50 dark:bg-ink-800/30 text-ink-600 dark:text-ink-400 border border-ink-100 dark:border-ink-800'
                } ${index === 4 ? 'ring-2 ring-vermilion-400' : ''}`}
              >
                <p className="text-xs mb-3 font-medium">{t(`practice.${day}`)}</p>
                <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center ${
                  index < 5 ? 'bg-white/20' : 'bg-white/50 dark:bg-ink-900/50'
                }`}>
                  {index < 5 ? (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
              accentVariant="vermilion"
            />
            <StatsCard
              label="practice.dayStreak"
              value="5"
              icon={icons.question}
              accentVariant="indigo"
            />
            <StatsCard
              label="practice.accuracy"
              value="87%"
              icon={icons.chart}
              accentVariant="success"
            />
          </div>
        </div>
      </div>

      <Dialog open={showWritingDialog} onOpenChange={setShowWritingDialog}>
        <DialogContent className="sm:max-w-[520px] bg-white/95 dark:bg-ink-900/95 backdrop-blur-xl rounded-3xl border-ink-100 dark:border-ink-800 shadow-ink-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-ink-900 dark:text-ink-50 display-font">
              {t('practice.writingTitle')}
            </DialogTitle>
            <DialogDescription className="text-ink-600 dark:text-ink-300">
              {t('practice.writingDialogDesc')}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-light serif-font text-ink-900 dark:text-ink-50">
                  {currentWriteChar.hanzi}
                </span>
                <div>
                  <p className="text-lg font-medium text-ink-900 dark:text-ink-50">{currentWriteChar.pinyin}</p>
                  <p className="text-sm text-ink-500 dark:text-ink-400">{currentWriteChar.meaning}</p>
                </div>
              </div>
              <Badge variant="outline" className="rounded-full border-ink-200 text-ink-600 dark:border-ink-700 dark:text-ink-300">
                {t('practice.strokeCount', { count: strokeMap.get(currentWriteChar.hanzi) ?? currentWriteChar.hanzi.length })}
              </Badge>
            </div>

            <div className="relative aspect-square bg-white dark:bg-ink-900 rounded-xl border-2 border-dashed border-ink-200 dark:border-ink-700 overflow-hidden">
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-crosshair"
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
                onTouchStart={handleCanvasTouchStart}
                onTouchMove={handleCanvasTouchMove}
                onTouchEnd={handleCanvasTouchEnd}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={clearCanvas} className="rounded-full border-ink-200 text-ink-700 dark:border-ink-700 dark:text-ink-200">
              {t('practice.clear')}
            </Button>
            <Button onClick={handleNextWriteChar} className="bg-vermilion-500 hover:bg-vermilion-600 text-white rounded-full">
              {t('practice.next')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showQuizDialog} onOpenChange={setShowQuizDialog}>
        <DialogContent className="sm:max-w-[480px] bg-white/95 dark:bg-ink-900/95 backdrop-blur-xl rounded-3xl border-ink-100 dark:border-ink-800 shadow-ink-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-ink-900 dark:text-ink-50 display-font">
              {t('practice.quizTitle')}
            </DialogTitle>
            <DialogDescription className="text-ink-600 dark:text-ink-300">
              {t('practice.quizDialogDesc')}
            </DialogDescription>
          </DialogHeader>

          <div className="py-8">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-6xl font-light serif-font text-ink-900 dark:text-ink-50">
                {currentQuizChar.hanzi}
              </span>
              <div className="text-right">
                <p className="text-2xl font-medium text-ink-900 dark:text-ink-50">{currentQuizChar.pinyin}</p>
                <p className="text-sm text-ink-500 dark:text-ink-400">{currentQuizChar.meaning}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {['一', '二', '三', '人', '大', '小', '口', '日'].map((char) => (
                <button
                  key={char}
                  onClick={() => handleQuizAnswer(char)}
                  disabled={quizState.answered}
                  className={`py-6 text-3xl font-light serif-font rounded-lg transition-[colors,transform] duration-300 ${
                    selectedAnswer === char
                      ? char === currentQuizChar.hanzi
                        ? 'bg-vermilion-500 text-white shadow-vermilion-glow'
                        : 'bg-red-500 text-white'
                      : 'bg-ink-50/50 dark:bg-ink-800/30 text-ink-900 dark:text-ink-50 border border-ink-200 dark:border-ink-700 hover:border-vermilion-300 dark:hover:border-vermilion-500'
                  }`}
                >
                  {char}
                </button>
              ))}
            </div>

            {quizState.answered && (
              <div className={`mt-6 text-center font-semibold ${
                selectedAnswer === currentQuizChar.hanzi ? 'text-vermilion-600 dark:text-vermilion-400' : 'text-red-500'
              }`}>
                {selectedAnswer === currentQuizChar.hanzi ? t('practice.quizCorrect') : t('practice.quizIncorrect')}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowQuizDialog(false); setQuizState({ currentIndex: 0, correctCount: 0, wrongCount: 0, answered: false }); setSelectedAnswer(''); }} className="rounded-full border-ink-200 text-ink-700 dark:border-ink-700 dark:text-ink-200">
              {t('common.cancel')}
            </Button>
            <Button onClick={handleNextQuiz} className="bg-vermilion-500 hover:bg-vermilion-600 text-white rounded-full">
              {t('practice.nextQuestion')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
