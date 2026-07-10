'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/components/locale-provider';
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

function useScrollReveal() {
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
}

export default function LearnPage() {
  const { t } = useTranslation();
  useScrollReveal();
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(characters[0]?.id ?? null);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizCorrect, setQuizCorrect] = useState<boolean | null>(null);

  const selectedCharacter = characters.find((c) => c.id === selectedCharacterId) || null;

  const handleQuizSubmit = () => {
    if (!selectedCharacter) return;
    const isCorrect = quizAnswer.toLowerCase() === selectedCharacter.pinyin.toLowerCase();
    setQuizCorrect(isCorrect);
    if (isCorrect) {
      setTimeout(() => {
        setShowQuizDialog(false);
        setQuizAnswer('');
        setQuizCorrect(null);
      }, 1500);
    }
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

        <div
          className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-5 mb-12 stagger-children"
          role="listbox"
          aria-label={t('common.masterCharacters')}
        >
          {characters.map((character) => {
            const isSelected = selectedCharacterId === character.id;
            return (
              <button
                key={character.id}
                onClick={() => setSelectedCharacterId(character.id)}
                role="option"
                aria-selected={isSelected}
                aria-label={`${character.hanzi}, ${character.pinyin}`}
                className={`group aspect-square rounded-[24px] border-2 border-transparent hover:border-vermilion-300 dark:hover:border-vermilion-500 hover:bg-vermilion-50/50 dark:hover:bg-vermilion-900/10 hover:shadow-ink transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden ${
                  isSelected
                    ? 'bg-vermilion-500 text-white shadow-vermilion-glow'
                    : 'bg-white dark:bg-ink-900/50 text-ink-900 dark:text-ink-50'
                }`}
              >
                {isSelected && (
                  <div className="absolute inset-0 bg-vermilion-500/20 animate-pulse" />
                )}
                <span className={`text-4xl sm:text-5xl font-light serif-font transition-transform duration-300 ${
                  isSelected ? '' : 'group-hover:scale-105'
                }`}>
                  {character.hanzi}
                </span>
                <span className={`text-xs sm:text-sm mt-2 font-medium ${
                  isSelected ? 'text-white/80' : 'text-ink-500 dark:text-ink-400'
                }`}>
                  {character.pinyin}
                </span>
                {isSelected && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white/20 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {selectedCharacter && (
          <div className="bg-white/80 dark:bg-ink-900/80 backdrop-blur-xl rounded-[32px] p-10 border border-ink-100 dark:border-ink-800 reveal revealed shadow-ink-lg">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 mb-6">
                  <Badge variant="outline" className="rounded-full border-vermilion-200 text-vermilion-600 dark:border-vermilion-500 dark:text-vermilion-400">
                    {t('learn.strokeCount', { count: selectedCharacter.strokes })}
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-ink-500 dark:text-ink-400 hover:text-vermilion-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    {t('learn.playAudio')}
                  </Button>
                </div>

                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-vermilion-500/10 rounded-full blur-[40px] scale-125" />
                  <span className="relative text-[120px] sm:text-[160px] font-light serif-font text-ink-900 dark:text-ink-50 animate-brush-stroke">
                    {selectedCharacter.hanzi}
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-sm text-ink-500 dark:text-ink-400 mb-1">{t('learn.pinyin')}</p>
                    <p className="text-2xl font-medium text-ink-900 dark:text-ink-50">{selectedCharacter.pinyin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-ink-500 dark:text-ink-400 mb-1">{t('learn.meaning')}</p>
                    <p className="text-xl text-ink-700 dark:text-ink-200">{t(selectedCharacter.translationKey)}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => setShowQuizDialog(true)} className="bg-vermilion-500 hover:bg-vermilion-600 text-white rounded-full">
                    {t('learn.startQuiz')}
                  </Button>
                  <Button variant="outline" className="rounded-full border-ink-200 text-ink-700 dark:border-ink-700 dark:text-ink-200">
                    {t('learn.nextCharacter')}
                  </Button>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-ink-50/50 dark:bg-ink-800/30 rounded-[20px] p-6">
                  <h4 className="text-lg font-semibold text-ink-900 dark:text-ink-50 mb-4 display-font">
                    {t('learn.wordExamples')}
                  </h4>
                  <div className="space-y-3">
                    {selectedCharacter.words.map((word, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-ink-900/50 rounded-[12px]">
                        <div>
                          <p className="text-lg font-medium text-ink-900 dark:text-ink-50">{word.text}</p>
                          <p className="text-sm text-ink-500 dark:text-ink-400">{word.pinyin}</p>
                        </div>
                        <p className="text-sm text-ink-600 dark:text-ink-300">{t(word.translationKey)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-ink-50/50 dark:bg-ink-800/30 rounded-[20px] p-6">
                  <h4 className="text-lg font-semibold text-ink-900 dark:text-ink-50 mb-4 display-font">
                    {t('learn.strokeOrder')}
                  </h4>
                  <div className="aspect-square bg-white dark:bg-ink-900/50 rounded-[16px] flex items-center justify-center border border-ink-100 dark:border-ink-800">
                    <span className="text-[80px] font-light serif-font text-ink-200 dark:text-ink-700">
                      {selectedCharacter.hanzi}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-center gap-2">
                    {Array.from({ length: selectedCharacter.strokes }).map((_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-vermilion-500/30" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog open={showQuizDialog} onOpenChange={setShowQuizDialog}>
        <DialogContent className="bg-white/95 dark:bg-ink-900/95 backdrop-blur-xl rounded-[24px] border-ink-100 dark:border-ink-800 shadow-ink-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-ink-900 dark:text-ink-50 display-font">
              {t('learn.quizTitle')}
            </DialogTitle>
            <DialogDescription className="text-ink-600 dark:text-ink-300">
              {t('learn.quizDesc')}
            </DialogDescription>
          </DialogHeader>

          <div className="py-8">
            <div className="text-center mb-8">
              <span className="text-[80px] font-light serif-font text-ink-900 dark:text-ink-50">
                {selectedCharacter?.hanzi}
              </span>
            </div>

            <input
              type="text"
              value={quizAnswer}
              onChange={(e) => {
                setQuizAnswer(e.target.value);
                setQuizCorrect(null);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleQuizSubmit()}
              placeholder={t('learn.quizPlaceholder')}
              className={`w-full px-6 py-4 text-lg text-center rounded-[16px] border-2 transition-all duration-300 ${
                quizCorrect === true
                  ? 'border-vermilion-500 bg-vermilion-50 dark:bg-vermilion-900/20 text-vermilion-600 dark:text-vermilion-400'
                  : quizCorrect === false
                  ? 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                  : 'border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 text-ink-900 dark:text-ink-50 focus:border-vermilion-500 focus:outline-none'
              }`}
            />

            {quizCorrect !== null && (
              <div className={`mt-4 text-center font-medium ${
                quizCorrect ? 'text-vermilion-600 dark:text-vermilion-400' : 'text-red-500'
              }`}>
                {quizCorrect ? t('learn.quizCorrect') : t('learn.quizIncorrect')}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button onClick={() => setShowQuizDialog(false)} variant="outline" className="rounded-full border-ink-200 text-ink-700 dark:border-ink-700 dark:text-ink-200">
              {t('common.cancel')}
            </Button>
            <Button onClick={handleQuizSubmit} className="bg-vermilion-500 hover:bg-vermilion-600 text-white rounded-full">
              {t('common.submit')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
