// src/components/learn/stroke-order-demo.tsx v5.2.47
// 笔顺：田字格参考线 + 编号笔画序列；编号只用于这个真实顺序，不作装饰。
'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { loadStrokeOrder } from '@/lib/stroke-order-loader';
import type { StrokeOrderData } from '@/lib/character-types';

interface StrokeOrderDemoProps {
  character: string;
  /** 笔画总数（用于无数据时兜底序列长度） */
  strokeCount: number;
}

const PLAY_INTERVAL = 550;

export function StrokeOrderDemo({ character, strokeCount }: StrokeOrderDemoProps) {
  const { t } = useTranslation();
  const [data, setData] = useState<StrokeOrderData | null>(null);
  const [activeStroke, setActiveStroke] = useState(0); // 已显示的笔画数
  const [playing, setPlaying] = useState(false);
  const totalStrokes = data?.strokes.length ?? strokeCount;

  useEffect(() => {
    let active = true;
    setData(null);
    setActiveStroke(0);
    setPlaying(false);
    loadStrokeOrder(character).then((loaded) => {
      if (active) setData(loaded ?? null);
    });
    return () => {
      active = false;
    };
  }, [character]);

  // 由 playing 驱动定时器，避免在 setState updater 内调用 setState
  useEffect(() => {
    if (!playing || !data) return;
    const timer = setInterval(() => {
      setActiveStroke((prev) => Math.min(prev + 1, data.strokes.length));
    }, PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [playing, data]);

  useEffect(() => {
    if (playing && activeStroke >= totalStrokes) setPlaying(false);
  }, [playing, activeStroke, totalStrokes]);

  const handleToggle = () => {
    if (!data) return;
    if (playing) {
      setPlaying(false);
      return;
    }
    // 已播完再点「显示笔顺」= 从头重播，而不是什么都不做
    if (activeStroke >= data.strokes.length) setActiveStroke(0);
    setPlaying(true);
  };

  const handleReset = () => {
    setPlaying(false);
    setActiveStroke(0);
  };

  return (
    <div id="stroke-order-demo" className="w-full">
      <div className="grid items-center gap-6 sm:grid-cols-[minmax(0,220px)_minmax(0,1fr)]">
        <div className="relative aspect-square w-full max-w-[220px] border border-vermilion-200/80 bg-card dark:border-vermilion-800/70 dark:bg-ink-900/40">
          {data ? (
            <svg
              viewBox="0 0 1024 1024"
              className="h-full w-full"
              role="img"
              aria-label={`${character} ${t('learn.strokeDemoLabel')}`}
            >
              {/* 田字格参考线置于翻转坐标系之外，RTL 下也保持对称 */}
              <path
                d="M512 0V1024 M0 512H1024"
                fill="none"
                stroke="var(--color-vermilion-400)"
                strokeWidth="2"
                strokeDasharray="16 16"
                opacity="0.3"
              />
              {/*
                数据坐标系：1024×1024 网格、y 轴向上、字形以 y=900 为顶基线。
                scale(1,-1) translate(0,-900) 得到 svg_y = 900 - data_y。
              */}
              <g transform="scale(1, -1) translate(0, -900)">
                {data.strokes.map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    fill={i < activeStroke ? 'var(--color-primary)' : 'var(--color-ink-300)'}
                    opacity={i < activeStroke ? 0.95 : 0.45}
                    style={{ transition: 'fill 0.2s, opacity 0.2s' }}
                  />
                ))}
              </g>
            </svg>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="serif-font text-[76px] font-light text-ink-200 dark:text-ink-700">
                {character}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 text-start">
          <ol className="flex flex-wrap gap-2" aria-label={t('learn.strokeOrder')}>
            {Array.from({ length: totalStrokes }).map((_, i) => {
              const done = i < activeStroke;
              const current = i === activeStroke;
              return (
                <li
                  key={i}
                  aria-current={current ? 'step' : undefined}
                  className={`flex size-9 items-center justify-center border text-sm transition-colors ${
                    done
                      ? 'border-vermilion-500 bg-vermilion-500 text-primary-foreground'
                      : current
                        ? 'border-vermilion-300 text-vermilion-600 dark:border-vermilion-700 dark:text-vermilion-300'
                        : 'border-ink-200 text-ink-400 dark:border-ink-700 dark:text-ink-500'
                  }`}
                >
                  {i + 1}
                </li>
              );
            })}
          </ol>

          {data && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleToggle}
                className="rounded-full bg-vermilion-500 px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-vermilion-600"
                aria-label={playing ? t('learn.hideStrokeOrder') : t('learn.showStrokeOrder')}
              >
                {playing ? t('learn.hideStrokeOrder') : t('learn.showStrokeOrder')}
              </button>
              {activeStroke > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full border border-ink-200 px-4 py-2 text-xs font-semibold text-ink-700 transition-colors hover:bg-ink-50 dark:border-ink-700 dark:text-ink-200 dark:hover:bg-ink-800"
                >
                  {t('practice.clear')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
