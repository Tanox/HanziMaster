// src/app/practice/page.tsx v3.0.0
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { useTheme } from '@/components/theme-provider';
import { StatsCard } from '@/components/stats-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { characters, type Character } from '@/lib/characters';
import { useWritingCanvas } from '@/hooks/use-canvas';
import { useQuiz, type QuizState } from '@/hooks/use-quiz';

const icons = {
  pencil: (<svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>),
  question: (<svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 01-18 0 9 9 0 0118 0z" /></svg>),
  chart: (<svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h2a2 2 0 01-2-2z" /></svg>),
} as const;
const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
const practiceOptions = [
  { id: 'writing', titleKey: 'practice.writingTitle', descKey: 'practice.writingDesc', icon: 'pencil' },
  { id: 'quiz', titleKey: 'practice.quizTitle', descKey: 'practice.quizDesc', icon: 'question' },
  { id: 'progress', titleKey: 'practice.progressTitle', descKey: 'practice.progressDesc', icon: 'chart' },
] as const;
function WritingDialog({ open, onOpenChange, char, onPronounce, onNext, index, total, isDark }: { open: boolean; onOpenChange: (v: boolean) => void; char: Character; onPronounce: () => void; onNext: () => void; index: number; total: number; isDark: boolean; }) {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { clearCanvas } = useWritingCanvas({ canvasRef, showDialog: open, character: char.hanzi, isDark });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{t('practice.writingTitle')}</DialogTitle>
          <DialogDescription>{t('practice.writingDialogDesc')}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-5xl font-light hanzi-font text-foreground">{char.hanzi}</span>
            <Badge variant="secondary" className="text-base">{char.pinyin}</Badge>
            <Button variant="ghost" size="sm" onClick={onPronounce} aria-label={t('practice.listenPronunciation')}><span aria-hidden="true">🔊</span></Button>
          </div>
          <canvas ref={canvasRef} className="size-[320px] sm:size-[400px] rounded-[24px] border-2 border-border cursor-crosshair touch-none shadow-md" aria-label={t('common.practiceWriting')} />
        </div>
        <DialogFooter className="flex flex-row sm:justify-between gap-2">
          <div className="text-sm text-muted-foreground">{t('practice.characterProgress', { current: index + 1, total })}</div>
          <div className="flex gap-2"><Button variant="ghost" onClick={clearCanvas}>{t('practice.clear')}</Button><Button variant="ghost" onClick={onNext}>{t('practice.next')}</Button><Button onClick={() => onOpenChange(false)}>{t('practice.done')}</Button></div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function QuizDialog({ open, onOpenChange, quizState, quizOptions, currentQuizChar, onAnswer, onNext, onPronounce, total, quizShowResult, onReset }: { open: boolean; onOpenChange: (v: boolean) => void; quizState: QuizState; quizOptions: string[]; currentQuizChar: Character | undefined; onAnswer: (pinyin: string) => void; onNext: () => void; onPronounce: () => void; total: number; quizShowResult: boolean; onReset: () => void; }) {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{t('practice.quizTitle')}</DialogTitle>
          <DialogDescription>{t('practice.quizDialogDesc')}</DialogDescription>
        </DialogHeader>
        {quizShowResult ? (
          <div className="flex flex-col items-center gap-6 py-8">
            <div role="status" aria-live="polite" className="text-6xl font-bold text-[#007aff]">{Math.round((quizState.correctCount / total) * 100)}%</div>
            <div className="text-center"><div className="text-xl text-foreground mb-2">{t('practice.quizComplete')}</div><div className="text-muted-foreground">{t('practice.correct')} {quizState.correctCount} · {t('practice.wrong')} {quizState.wrongCount}</div></div>
            <div className="flex gap-2"><Button variant="ghost" onClick={() => onOpenChange(false)}>{t('practice.close')}</Button><Button onClick={onReset}>{t('practice.retake')}</Button></div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{t('practice.question')} {quizState.currentIndex + 1} / {total}</div>
              <div className="flex gap-4 text-sm"><span className="text-[#34c759]">✓ {quizState.correctCount}</span><span className="text-[#ff3b30]">✗ {quizState.wrongCount}</span></div>
            </div>
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="text-[100px] font-light hanzi-font text-foreground">{currentQuizChar?.hanzi}</div>
              <Button variant="ghost" size="sm" onClick={onPronounce}><span aria-hidden="true">🔊</span> {t('practice.listenPronunciation')}</Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quizOptions.map((option) => {
                const isCorrect = option === currentQuizChar?.pinyin;
                const isSel = quizState.selectedAnswer === option;
                return <Button key={option} variant={quizState.answered ? 'outline' : 'secondary'} size="lg" disabled={quizState.answered} onClick={() => onAnswer(option)} className={cn('text-lg py-6 font-medium', quizState.answered && isCorrect && 'bg-[#34c759] text-white hover:bg-[#34c759]', quizState.answered && isSel && !isCorrect && 'bg-[#ff3b30] text-white hover:bg-[#ff3b30]')}>{option}</Button>;
              })}
            </div>
            {quizState.answered && <div className="flex justify-end mt-2"><Button onClick={onNext}>{quizState.currentIndex >= total - 1 ? t('practice.viewResults') : t('practice.nextQuestion')}</Button></div>}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
function ProgressDialog({ open, onOpenChange, items }: { open: boolean; onOpenChange: (v: boolean) => void; items: Character[]; }) {
  const { t } = useTranslation();
  const stats = [
    { v: '12', k: 'practice.charactersLearned', c: 'text-[#007aff]' },
    { v: '5', k: 'practice.dayStreak', c: 'text-[#af52de]' },
    { v: '87%', k: 'practice.accuracy', c: 'text-[#34c759]' },
  ];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{t('practice.progressTitle')}</DialogTitle>
          <DialogDescription>{t('practice.progressDialogDesc')}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 py-4">
          {stats.map(({ v, k, c }) => (
            <div key={k} className="bg-muted rounded-[20px] p-6 text-center">
              <div className={cn('text-4xl font-bold mb-2', c)}>{v}</div>
              <div className="text-sm text-muted-foreground">{t(k)}</div>
            </div>
          ))}
        </div>
        <div className="py-4">
          <h4 className="text-lg font-semibold mb-4 text-foreground">{t('practice.charactersLearned')}</h4>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {items.map((char) => (
              <div key={char.id} className="aspect-square flex flex-col items-center justify-center bg-background dark:bg-foreground/5 rounded-2xl p-3 border border-border">
                <span className="text-2xl font-light hanzi-font text-foreground">{char.hanzi}</span>
                <span className="text-xs text-muted-foreground mt-1">{char.pinyin}</span>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter><Button onClick={() => onOpenChange(false)}>{t('practice.close')}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default function PracticePage() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showWritingDialog, setShowWritingDialog] = useState(false);
  const [currentWriteChar, setCurrentWriteChar] = useState<Character>(characters[0]);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { quizState, quizOptions, handleQuizAnswer, handleNextQuizQuestion, resetQuiz, quizShowResult, currentQuizChar } = useQuiz(characters);

  useEffect(() => {
    const checkDark = () => {
      if (theme === 'dark') {
        setIsDark(true);
      } else if (theme === 'system') {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      } else {
        setIsDark(false);
      }
    };
    checkDark();
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.addEventListener('change', checkDark);
    return () => mql.removeEventListener('change', checkDark);
  }, [theme]);

  const handlePronounce = useCallback((hanzi: string) => {
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(hanzi);
    u.lang = 'zh-CN'; u.rate = 0.8;
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
  }, []);
  const handlePracticeOption = useCallback((optionId: string) => {
    setSelectedOption(optionId);
    if (optionId === 'writing') setShowWritingDialog(true);
    else if (optionId === 'quiz') { resetQuiz(); setShowQuizDialog(true); }
    else if (optionId === 'progress') setShowProgressDialog(true);
  }, [resetQuiz]);
  const handleNextWriteChar = useCallback(() => {
    const idx = characters.findIndex(c => c.id === currentWriteChar.id);
    setCurrentWriteChar(characters[(idx + 1) % characters.length]);
  }, [currentWriteChar]);
  const writeIndex = characters.findIndex(c => c.id === currentWriteChar.id);
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 safe-bottom">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground">{t('common.practice')} {t('practice.center')}</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('practice.subtitle')}</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
        {practiceOptions.map((option) => {
          const isSelected = selectedOption === option.id;
          return <button key={option.id} onClick={() => handlePracticeOption(option.id)} className={cn('group bg-muted dark:bg-card p-10 rounded-3xl border-2 border-transparent hover:border-[#007aff] dark:hover:border-[#2997ff] hover:-translate-y-1 transition-all duration-300 text-left', isSelected && 'border-[#007aff] bg-background dark:bg-foreground/5')}>
            <div className={cn('size-20 bg-gradient-to-br from-[#007aff]/10 to-[#af52de]/10 dark:from-[#007aff]/20 dark:to-[#af52de]/20 rounded-[20px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-[#007aff]', isSelected && 'bg-[#007aff] text-white')}>{icons[option.icon]}</div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">{t(option.titleKey)}</h3>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">{t(option.descKey)}</p>
            <div className={cn('flex items-center gap-2 font-semibold group', isSelected ? 'text-foreground' : 'text-[#007aff]')}>
              <span>{t('practice.startNow')}</span>
              <svg className="size-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l-4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
          </button>;
        })}
      </div>
      <div className="bg-muted dark:bg-card rounded-[32px] p-10 border border-border">
        <h3 className="text-2xl font-semibold mb-10 text-foreground">{t('practice.weeklyProgress')}</h3>
        <div className="grid grid-cols-7 gap-4 mb-10">
          {weekDays.map((day, index) => (
            <div key={day} className={cn('flex flex-col items-center p-5 rounded-[20px]', index < 5 ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground' : 'bg-background dark:bg-foreground/5 text-muted-foreground border border-border', index === 4 && 'ring-2 ring-[#007aff]')}>
              <p className="text-xs mb-3 font-medium">{t(`practice.${day}`)}</p>
              <div className={cn('size-10 sm:size-14 rounded-xl flex items-center justify-center', index < 5 ? 'bg-white/20 dark:bg-black/10' : 'bg-muted dark:bg-foreground/10')}>
                {index < 5 ? <svg className="size-5 sm:size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> : <span className="text-xs font-medium">{index === 4 ? t('practice.today') : t('practice.pending')}</span>}
              </div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <StatsCard label="practice.charactersLearned" value="12" icon={icons.pencil} />
          <StatsCard label="practice.dayStreak" value="5" icon={icons.question} />
          <StatsCard label="practice.accuracy" value="87%" icon={icons.chart} />
        </div>
      </div>
      <WritingDialog open={showWritingDialog} onOpenChange={setShowWritingDialog} char={currentWriteChar} onPronounce={() => handlePronounce(currentWriteChar.hanzi)} onNext={handleNextWriteChar} index={writeIndex} total={characters.length} isDark={isDark} />
      <QuizDialog open={showQuizDialog} onOpenChange={setShowQuizDialog} quizState={quizState} quizOptions={quizOptions} currentQuizChar={currentQuizChar} onAnswer={handleQuizAnswer} onNext={handleNextQuizQuestion} onPronounce={() => currentQuizChar && handlePronounce(currentQuizChar.hanzi)} total={characters.length} quizShowResult={quizShowResult} onReset={resetQuiz} />
      <ProgressDialog open={showProgressDialog} onOpenChange={setShowProgressDialog} items={characters} />
    </div>
  );
}
