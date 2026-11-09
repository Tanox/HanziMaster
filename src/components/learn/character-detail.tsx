// src/components/learn/character-detail.tsx v5.2.45
'use client';

import { useTranslation } from '@/components/locale-provider';
import type { Character } from '@/lib/characters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import dynamic from 'next/dynamic';

// 笔顺演示（含 12KB SVG 数据）按需加载，首屏只留骨架（P1-12）
const StrokeOrderDemo = dynamic(
  () => import('@/components/learn/stroke-order-demo').then((m) => m.StrokeOrderDemo),
  {
    ssr: false,
    loading: () => (
      <div id="stroke-order-skeleton" className="aspect-square w-full animate-pulse rounded-lg bg-ink-100 dark:bg-ink-800" />
    ),
  }
);

interface CharacterDetailProps {
  character: Character;
  onStartQuiz: () => void;
  onNextCharacter: () => void;
  onSpeak: (text: string) => void;
  /** 三态：null = 挂载后能力检测中 */
  speechSupported: boolean | null;
  pronounceError: boolean;
}

export function CharacterDetail({
  character,
  onStartQuiz,
  onNextCharacter,
  onSpeak,
  speechSupported,
  pronounceError,
}: CharacterDetailProps) {
  const { t } = useTranslation();
  // 发音能力不可用或播放失败时，展示可读的降级提示而非静默失败（P2-16）；null = 检测中不干预
  const showPronunciationHint = speechSupported === false || pronounceError;

  return (
    <div id="character-detail" className="bg-card/80 dark:bg-ink-900/80 backdrop-blur-xl rounded-4xl p-10 border border-ink-100 dark:border-ink-800 reveal revealed animate-fade-in-elegant shadow-ink-lg">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
      {/* 左栏「标本卡」：统一中轴居中，认知动线 见形 → 读音 → 知音 → 知义 → 行动 */}
      <div id="character-summary" className="text-center">
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 bg-vermilion-500/10 rounded-full blur-[40px] scale-125" />
          <span className="relative text-[120px] sm:text-[160px] leading-none font-light serif-font text-ink-900 dark:text-ink-50 animate-brush-stroke">
            {character.hanzi}
          </span>
        </div>

        {/* 读音注解紧随主字 */}
        <p id="character-pinyin" className="text-3xl font-medium tracking-wide text-ink-900 dark:text-ink-50">
          {character.pinyin}
        </p>
        <p className="text-sm text-ink-500 dark:text-ink-400 mb-6">{t('learn.pinyin')}</p>

        {/* 笔画与发音并排：发音为高频交互，升级为 44px 圆形描边图标按钮 */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Badge variant="outline" className="rounded-full border-vermilion-200 text-vermilion-600 dark:border-vermilion-500 dark:text-vermilion-400">
            {t('learn.strokeCount', { count: character.strokes })}
          </Badge>
          <Button
            id="play-audio-btn"
            variant="outline"
            size="icon"
            onClick={() => onSpeak(character.hanzi)}
            disabled={speechSupported === false}
            aria-label={t('learn.playAudio')}
            aria-describedby={showPronunciationHint ? 'pronunciation-hint' : undefined}
            className="h-11 w-11 rounded-full border-ink-200 text-ink-500 hover:border-vermilion-300 hover:bg-vermilion-500/10 hover:text-vermilion-500 disabled:opacity-60 dark:border-ink-700 dark:text-ink-400"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </Button>
        </div>
        {showPronunciationHint && (
          <p id="pronunciation-hint" role="status" className="text-xs text-ink-500 dark:text-ink-400 mb-8">
            {t('learn.pronunciationUnavailable')}
          </p>
        )}

        {/* 含义 */}
        <div id="character-meaning" className="mb-8">
          <p className="text-sm text-ink-500 dark:text-ink-400 mb-1">{t('learn.meaning')}</p>
          <p className="text-xl text-ink-700 dark:text-ink-200">{t(character.translationKey)}</p>
        </div>

        {/* 移动端两按钮等宽并排，桌面居中自适应 */}
        <div id="detail-actions" className="grid grid-cols-2 gap-3 sm:flex sm:justify-center sm:gap-4">
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
            <StrokeOrderDemo character={character.hanzi} strokeCount={character.strokes} />
          </div>
        </div>
      </div>
    </div>
  );
}
