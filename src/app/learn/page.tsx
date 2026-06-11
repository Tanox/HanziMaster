// src/app/learn/page.tsx v2.4.0 - Apple Design Style
'use client';

import { useState, useCallback } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { useLearningStore } from '@/store/learning';
import { WritingCanvas } from '@/components/writing-canvas';

export default function LearnPage() {
  const { t } = useTranslation();
  const { characters, progress, updateProgress, addPractice } = useLearningStore();
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    characters[0]?.id ?? null
  );
  const [showCanvas, setShowCanvas] = useState(false);

  const selectedCharacter = characters.find(char => char.id === selectedCharacterId) ?? null;
  const charProgress = selectedCharacterId ? progress[selectedCharacterId] : null;

  const selectCharacter = useCallback((charId: string) => {
    setSelectedCharacterId(charId);
    setShowCanvas(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, charId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectCharacter(charId);
    }
  }, [selectCharacter]);

  const handleStartWriting = useCallback(() => {
    setShowCanvas(true);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const handleStrokeComplete = useCallback((_strokeIndex: number) => {
    // 可以在这里添加笔画完成反馈
  }, []);

  const handleWritingComplete = useCallback((strokes: any[]) => {
    if (!selectedCharacterId) return;
    
    // 计算准确度（简化版本）
    const accuracy = Math.min(100, Math.round((strokes.length / (selectedCharacter?.strokes || 1)) * 100));
    
    addPractice(selectedCharacterId);
    updateProgress(selectedCharacterId, {
      mastered: accuracy >= 80,
      practiceCount: (charProgress?.practiceCount ?? 0) + 1,
      accuracy,
      lastPracticed: new Date().toISOString(),
    });
    
    setShowCanvas(false);
  }, [selectedCharacterId, selectedCharacter, charProgress, addPractice, updateProgress]);

  return (
    <div className="min-h-screen bg-white dark:bg-black py-8 px-4 sm:px-6 safe-area-bottom">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            <span className="gradient-text">{t('learn.title')}</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {t('learn.subtitle')}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：字符选择网格 */}
          <section className="order-2 lg:order-1" aria-label={t('learn.selectChar')}>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {characters.map((char, index) => {
                const isSelected = char.id === selectedCharacterId;
                const charProg = progress[char.id];
                const isMastered = charProg?.mastered ?? false;
                
                return (
                  <button
                    key={char.id}
                    onClick={() => selectCharacter(char.id)}
                    onKeyDown={(e) => handleKeyDown(e, char.id)}
                    className={`
                      char-card p-4 text-center transition-all duration-300
                      ${isSelected ? 'ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : ''}
                      ${isMastered ? 'border-l-4 border-emerald-500' : ''}
                      stagger-item
                    `}
                    style={{ animationDelay: `${index * 50}ms` }}
                    role="option"
                    aria-selected={isSelected}
                    aria-label={`${char.char} - ${char.pinyin}`}
                  >
                    <span className="text-3xl sm:text-4xl hanzi-font block mb-1">{char.char}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{char.pinyin}</span>
                    {isMastered && (
                      <span className="block mt-1 text-emerald-500 text-xs">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 右侧：字符详情面板 */}
          <section className="order-1 lg:order-2" aria-label={t('learn.charDetail')}>
            {selectedCharacter ? (
              <div className="feature-card apple-shadow-xl">
                {/* 大字显示 */}
                <div className="text-center mb-6">
                  <div className="inline-block p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 mb-4">
                    <span className="text-6xl sm:text-7xl hanzi-font gradient-text">
                      {selectedCharacter.char}
                    </span>
                  </div>
                  
                  {/* 拼音 */}
                  <div className="inline-block px-4 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-lg font-medium">
                    {selectedCharacter.pinyin}
                  </div>
                </div>

                {/* 含义 */}
                <p className="text-center text-gray-600 dark:text-gray-300 mb-6 text-lg">
                  {selectedCharacter.meaning}
                </p>

                {/* 属性卡片 */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {selectedCharacter.strokes}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t('common.strokeCount')}</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {selectedCharacter.radical}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t('learn.radical')}</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {selectedCharacter.structure}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t('learn.structure')}</div>
                  </div>
                </div>

                {/* 书写画布或按钮 */}
                {showCanvas ? (
                  <div className="mb-6">
                    <WritingCanvas
                      character={selectedCharacter.char}
                      strokeCount={selectedCharacter.strokes}
                      onComplete={handleWritingComplete}
                      onStrokeComplete={handleStrokeComplete}
                      showGuide={true}
                    />
                    <button
                      onClick={() => setShowCanvas(false)}
                      className="mt-4 w-full btn-apple-secondary"
                    >
                      取消
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={handleStartWriting}
                      className="flex-1 btn-apple-primary glow-emerald flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      {t('learn.startWriting')}
                    </button>
                    <button
                      className="btn-apple-secondary flex items-center justify-center gap-2"
                      aria-label={t('learn.listenPronunciation')}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 5.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* 掌握度进度条 */}
                {charProgress && (
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500 dark:text-gray-400">{t('learn.masteryProgress')}</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        {charProgress.accuracy}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full progress-fill progress-animated"
                        style={{ width: `${charProgress.accuracy}%` }}
                        role="progressbar"
                        aria-valuenow={charProgress.accuracy}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                      练习次数: {charProgress.practiceCount}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="feature-card apple-shadow-xl text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">{t('learn.selectChar')}</p>
              </div>
            )}
          </section>
        </div>

        {/* 底部提示 */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {t('learn.practiceHints')}
          </p>
        </div>
      </div>
    </div>
  );
}
