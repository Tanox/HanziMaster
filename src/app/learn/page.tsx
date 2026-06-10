// src/app/learn/page.tsx v2.3.1 - Apple Design Style
'use client';

import { useState, useCallback } from 'react';
import { useTranslation } from '@/components/locale-provider';
import Link from 'next/link';

interface Character {
  id: number;
  hanzi: string;
  pinyin: string;
  meaning: string;
  translationKey: string;
  strokes: number;
  radical: string;
  structure: string;
}

const baseCharacters: Character[] = [
  { id: 1, hanzi: '一', pinyin: 'yī', meaning: '数字一', translationKey: 'learn.one', strokes: 1, radical: '一', structure: '独体' },
  { id: 2, hanzi: '二', pinyin: 'èr', meaning: '数字二', translationKey: 'learn.two', strokes: 2, radical: '二', structure: '独体' },
  { id: 3, hanzi: '三', pinyin: 'sān', meaning: '数字三', translationKey: 'learn.three', strokes: 3, radical: '一', structure: '独体' },
  { id: 4, hanzi: '人', pinyin: 'rén', meaning: '人类', translationKey: 'learn.person', strokes: 2, radical: '人', structure: '独体' },
  { id: 5, hanzi: '大', pinyin: 'dà', meaning: '大的', translationKey: 'learn.big', strokes: 3, radical: '大', structure: '独体' },
  { id: 6, hanzi: '小', pinyin: 'xiǎo', meaning: '小的', translationKey: 'learn.small', strokes: 3, radical: '小', structure: '独体' },
  { id: 7, hanzi: '口', pinyin: 'kǒu', meaning: '嘴巴', translationKey: 'learn.mouth', strokes: 3, radical: '口', structure: '独体' },
  { id: 8, hanzi: '日', pinyin: 'rì', meaning: '太阳/日子', translationKey: 'learn.sunDay', strokes: 4, radical: '日', structure: '独体' },
  { id: 9, hanzi: '月', pinyin: 'yuè', meaning: '月亮/月份', translationKey: 'learn.moonMonth', strokes: 4, radical: '月', structure: '独体' },
  { id: 10, hanzi: '山', pinyin: 'shān', meaning: '山脉', translationKey: 'learn.mountain', strokes: 3, radical: '山', structure: '独体' },
  { id: 11, hanzi: '水', pinyin: 'shuǐ', meaning: '水流', translationKey: 'learn.water', strokes: 4, radical: '水', structure: '独体' },
  { id: 12, hanzi: '火', pinyin: 'huǒ', meaning: '火焰', translationKey: 'learn.fire', strokes: 4, radical: '火', structure: '独体' },
];

export default function LearnPage() {
  const { t } = useTranslation();
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(baseCharacters[0]?.id ?? null);

  const selectedCharacter = baseCharacters.find(char => char.id === selectedCharacterId) ?? null;
  const masteryPercent = 85;

  const selectCharacter = useCallback((char: Character) => {
    setSelectedCharacterId(char.id);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, char: Character) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectCharacter(char);
    }
  }, [selectCharacter]);

  return (
    <div className="min-h-screen bg-white dark:bg-black safe-area-bottom">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 pb-24 md:pb-16">
        {/* ─── Page Header - Apple Style ─── */}
        <div className="text-center mb-12 sm:mb-16" role="heading" aria-level={1}>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
            <span className="gradient-text">{t('common.dailyPractice')}</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400">{t('common.masterCharacters')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* ─── Character Grid - Apple Style ─── */}
          <section aria-label="汉字选择网格" className="order-2 lg:order-1">
            <div className="feature-card apple-shadow-xl">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">选择汉字</h2>
              <div
                className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4"
                role="listbox"
                aria-label="选择要学习的汉字"
              >
                {baseCharacters.map((char, index) => {
                  const isSelected = selectedCharacterId === char.id;
                  return (
                    <button
                      key={char.id}
                      onClick={() => selectCharacter(char)}
                      onKeyDown={(e) => handleKeyDown(e, char)}
                      role="option"
                      aria-selected={isSelected}
                      aria-label={`汉字 ${char.hanzi}, 拼音 ${char.pinyin}`}
                      tabIndex={0}
                      className={`char-card aspect-square rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-bold hanzi-font cursor-pointer border-2 touch-target transition-all duration-300 stagger-item ${
                        isSelected
                          ? 'border-emerald-500 ring-4 ring-emerald-500/20 scale-105'
                          : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:scale-105'
                      }`}
                      style={{ animationDelay: `${index * 40}ms` }}
                    >
                      <span className={isSelected ? 'gradient-text' : 'text-gray-900 dark:text-gray-100'}>
                        {char.hanzi}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ─── Character Detail Panel - Apple Style ─── */}
          <section aria-label="选中汉字详情" className="order-1 lg:order-2">
            <div className="feature-card apple-shadow-xl sticky top-24">

              {/* Large Character Display */}
              <div className="text-center mb-8">
                <div
                  className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-3xl flex items-center justify-center mb-6 apple-shadow-xl bg-white dark:bg-gray-900 overflow-hidden"
                  role="img"
                  aria-label={`大字显示 ${selectedCharacter?.hanzi}`}
                >
                  <div className="absolute inset-0 writing-canvas opacity-50"></div>
                  <span
                    key={selectedCharacter?.id}
                    className="relative text-7xl sm:text-8xl font-bold hanzi-font gradient-text char-enter"
                  >
                    {selectedCharacter?.hanzi}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-3xl font-bold hanzi-font text-gray-900 dark:text-gray-100">
                    {selectedCharacter?.hanzi}
                  </span>
                  <span
                    className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium rounded-full"
                    aria-label="拼音"
                  >
                    {selectedCharacter?.pinyin}
                  </span>
                </div>

                <p className="text-base text-gray-600 dark:text-gray-400">
                  {selectedCharacter?.meaning}
                </p>
              </div>

              {/* Character Details Grid */}
              <div
                className="grid grid-cols-3 gap-3 mb-8"
                role="list"
                aria-label="汉字属性信息"
              >
                <div className="feature-card apple-shadow-sm !p-4 !rounded-2xl text-center" role="listitem">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('common.strokeCount')}</div>
                  <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {selectedCharacter?.strokes}<span className="text-sm font-normal ml-0.5">{t('common.strokes')}</span>
                  </div>
                </div>
                <div className="feature-card apple-shadow-sm !p-4 !rounded-2xl text-center" role="listitem">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('learn.radical')}</div>
                  <div className="text-xl font-semibold text-gray-900 dark:text-gray-100 hanzi-font">
                    {selectedCharacter?.radical}
                  </div>
                </div>
                <div className="feature-card apple-shadow-sm !p-4 !rounded-2xl text-center" role="listitem">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('learn.structure')}</div>
                  <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {selectedCharacter?.structure}
                  </div>
                </div>
              </div>

              {/* Writing Canvas - 米字格 */}
              <div className="mb-8" aria-label="书写练习画布">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 text-center">书写练习区</div>
                <div
                  className="relative aspect-square w-full max-w-[240px] mx-auto rounded-2xl overflow-hidden apple-shadow-sm bg-white dark:bg-gray-900"
                  role="img"
                  aria-label="米字格书写画布"
                >
                  {/* 米字格 SVG */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 200 200"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                  >
                    {/* 外边框 */}
                    <rect x="1" y="1" width="198" height="198" fill="none" stroke="#10b981" strokeWidth="2" rx="12" opacity="0.3" />
                    {/* 十字线 - 横 */}
                    <line x1="0" y1="100" x2="200" y2="100" stroke="#10b981" strokeWidth="1" strokeDasharray="6,6" opacity="0.25" />
                    {/* 十字线 - 竖 */}
                    <line x1="100" y1="0" x2="100" y2="200" stroke="#10b981" strokeWidth="1" strokeDasharray="6,6" opacity="0.25" />
                    {/* 对角线 - 左上到右下 */}
                    <line x1="0" y1="0" x2="200" y2="200" stroke="#10b981" strokeWidth="1" strokeDasharray="6,6" opacity="0.25" />
                    {/* 对角线 - 右上到左下 */}
                    <line x1="200" y1="0" x2="0" y2="200" stroke="#10b981" strokeWidth="1" strokeDasharray="6,6" opacity="0.25" />
                  </svg>
                  {/* 米字格背景网格 */}
                  <div className="absolute inset-0 writing-canvas opacity-30"></div>
                  {/* 示例字 (浅色半透明) */}
                  <span className="absolute inset-0 flex items-center justify-center text-7xl sm:text-8xl font-bold hanzi-font text-gray-300 dark:text-gray-700 select-none">
                    {selectedCharacter?.hanzi}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8" role="group" aria-label="掌握度进度">
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-600 dark:text-gray-400">{t('common.strokeMastery')}</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{masteryPercent}%</span>
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={masteryPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="笔画掌握度进度条"
                  className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"
                >
                  <div
                    className="progress-fill progress-animated h-full"
                    style={{ width: `${masteryPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3" role="group" aria-label="操作按钮组">
                <Link
                  href="/practice"
                  className="w-full btn-apple-primary text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 touch-target glow-emerald"
                  role="button"
                  aria-label="开始学习按钮"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                  {t('common.startLearning')}
                </Link>

                <button
                  type="button"
                  className="w-full btn-apple-secondary py-4 rounded-full font-medium flex items-center justify-center gap-2 touch-target"
                  aria-label="听发音按钮"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
                  </svg>
                  {t('common.hearPronunciation')}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
