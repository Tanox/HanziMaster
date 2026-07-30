// src/components/learn/character-detail.tsx v5.1.0
'use client';

import { useTranslation } from '@/components/locale-provider';
import type { Character } from '@/lib/characters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CharacterDetailProps {
  character: Character;
  onStartQuiz: () => void;
  onNextCharacter: () => void;
  onSpeak: (text: string) => void;
}

export function CharacterDetail({
  character,
  onStartQuiz,
  onNextCharacter,
  onSpeak,
}: CharacterDetailProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-card/80 dark:bg-ink-900/80 backdrop-blur-xl rounded-3xl p-10 border border-ink-100 dark:border-ink-800 reveal revealed shadow-ink-lg">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="outline" className="rounded-full border-vermilion-200 text-vermilion-600 dark:border-vermilion-500 dark:text-vermilion-400">
              {t('learn.strokeCount', { count: character.strokes })}
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => onSpeak(character.hanzi)} className="text-ink-500 dark:text-ink-400 hover:text-vermilion-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              {t('learn.playAudio')}
            </Button>
          </div>

          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-vermilion-500/10 rounded-full blur-[40px] scale-125" />
            <span className="relative text-[120px] sm:text-[160px] font-light serif-font text-ink-900 dark:text-ink-50 animate-brush-stroke">
              {character.hanzi}
            </span>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <p className="text-sm text-ink-500 dark:text-ink-400 mb-1">{t('learn.pinyin')}</p>
              <p className="text-2xl font-medium text-ink-900 dark:text-ink-50">{character.pinyin}</p>
            </div>
            <div>
              <p className="text-sm text-ink-500 dark:text-ink-400 mb-1">{t('learn.meaning')}</p>
              <p className="text-xl text-ink-700 dark:text-ink-200">{t(character.translationKey)}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={onStartQuiz} className="bg-vermilion-500 hover:bg-vermilion-600 text-primary-foreground rounded-full">
              {t('learn.startQuiz')}
            </Button>
            <Button variant="outline" onClick={onNextCharacter} className="rounded-full border-ink-200 text-ink-700 dark:border-ink-700 dark:text-ink-200">
              {t('learn.nextCharacter')}
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-ink-50/50 dark:bg-ink-800/30 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-ink-900 dark:text-ink-50 mb-4 display-font">
              {t('learn.wordExamples')}
            </h4>
            <div className="space-y-3">
              {character.words.map((word, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-card dark:bg-ink-900/50 rounded-md">
                  <div>
                    <p className="text-lg font-medium text-ink-900 dark:text-ink-50">{word.text}</p>
                    <p className="text-sm text-ink-500 dark:text-ink-400">{word.pinyin}</p>
                  </div>
                  <p className="text-sm text-ink-600 dark:text-ink-300">{t(word.translationKey)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-ink-50/50 dark:bg-ink-800/30 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-ink-900 dark:text-ink-50 mb-4 display-font">
              {t('learn.strokeOrder')}
            </h4>
            <div className="aspect-square bg-card dark:bg-ink-900/50 rounded-lg flex items-center justify-center border border-ink-100 dark:border-ink-800">
              <span className="text-[80px] font-light serif-font text-ink-200 dark:text-ink-700">
                {character.hanzi}
              </span>
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {Array.from({ length: character.strokes }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-vermilion-500/30" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
