// src/components/learn/stroke-order-demo.tsx v5.2.46
// 学习页笔顺演示组件：用 SVG 渲染汉字笔画，点击「显示笔顺」逐笔播放书写动画。
// 数据来自 stroke-order-loader（Hanzi Writer 标准 path，y 轴向上），无数据时回退灰字占位。
'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { loadStrokeOrder } from '@/lib/stroke-order-loader';
import type { StrokeOrderData } from '@/lib/character-types';

interface StrokeOrderDemoProps {
  character: string;
  /** 笔画总数（用于无数据时兜底圆点展示） */
  strokeCount: number;
}

const PLAY_INTERVAL = 550; // 每笔间隔 ms

export function StrokeOrderDemo({ character, strokeCount }: StrokeOrderDemoProps) {
  const { t } = useTranslation();
  const [data, setData] = useState<StrokeOrderData | null>(null);
  const [activeStroke, setActiveStroke] = useState(0); // 0 = 未开始
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalStrokes = data?.strokes.length ?? strokeCount;

  // 清空定时器
  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setPlaying(false);
  };

  useEffect(() => () => stop(), []);

  // 笔顺 chunk 按需加载，切换字符时重置播放进度（P1-12）
  useEffect(() => {
    let active = true;
    setData(null);
    setActiveStroke(0);
    loadStrokeOrder(character).then((loaded) => {
      if (active) setData(loaded ?? null);
    });
    return () => {
      active = false;
    };
  }, [character]);

  const handleToggle = () => {
    if (!data) return;
    if (playing) {
      stop();
      return;
    }
    // 从当前暂停位置继续，或重新开始
    setPlaying(true);
    timerRef.current = setInterval(() => {
      setActiveStroke((prev) => {
        const next = prev + 1;
        if (next >= data.strokes.length) {
          stop();
          return data.strokes.length; // 全部显示完
        }
        return next;
      });
    }, PLAY_INTERVAL);
  };

  const handleReset = () => {
    stop();
    setActiveStroke(0);
  };

  const isPlaying = playing;

  return (
    <div id="stroke-order-demo" className="w-full">
      <div className="aspect-square bg-card dark:bg-ink-900/50 rounded-lg border border-ink-100 dark:border-ink-800 overflow-hidden relative">
        {data ? (
          <svg
            viewBox="0 0 1024 1024"
            className="h-full w-full"
            role="img"
            aria-label={`${character} ${t('learn.strokeDemoLabel')}`}
          >
            {/*
              数据坐标系：1024×1024 网格、y 轴向上、字形以 y=900 为顶基线。
              scale(1,-1) translate(0,-900) 先平移再翻转，得到 svg_y = 900 - data_y（修正笔顺上下颠倒）。
            */}
            <g transform="scale(1, -1) translate(0, -900)">
              {/* 已完成 / 当前笔：朱砂红填充；未写笔：浅灰淡字形（strokes 为闭合填充轮廓） */}
              {data.strokes.map((d, i) => {
                const done = i < activeStroke;
                const current = i === activeStroke;
                return (
                  <path
                    key={i}
                    d={d}
                    fill={current || done ? 'var(--color-primary)' : 'var(--color-border)'}
                    opacity={current ? 1 : done ? 0.9 : 0.5}
                    style={{ transition: 'fill 0.2s, opacity 0.2s' }}
                  />
                );
              })}
            </g>
          </svg>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <span className="text-[80px] font-light serif-font text-ink-200 dark:text-ink-700">
              {character}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalStrokes }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-colors ${
                i < activeStroke ? 'bg-vermilion-500' : 'bg-vermilion-500/30'
              }`}
            />
          ))}
        </div>
        {data && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggle}
              className="rounded-full bg-vermilion-500 px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-vermilion-600"
              aria-label={isPlaying ? t('learn.hideStrokeOrder') : t('learn.showStrokeOrder')}
            >
              {isPlaying ? t('learn.hideStrokeOrder') : t('learn.showStrokeOrder')}
            </button>
            {activeStroke > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="rounded-full border border-ink-200 px-4 py-1.5 text-xs font-semibold text-ink-700 transition-colors hover:bg-ink-50 dark:border-ink-700 dark:text-ink-200"
              >
                {t('practice.clear')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
