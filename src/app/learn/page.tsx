// src/app/learn/page.tsx v2.4.0 - shadcn/ui
'use client';

import * as React from "react"
import { useState, useCallback } from 'react';
import { useTranslation } from '@/components/locale-provider';
import { useLearningStore } from '@/store/learning';
import { WritingCanvas } from '@/components/writing-canvas';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            <span className="gradient-text">{t('learn.title')}</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
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
                    className={cn(
                      "char-card p-4 text-center transition-all duration-300",
                      isSelected ? "ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "",
                      isMastered ? "border-l-4 border-emerald-500" : "",
                      "stagger-item"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                    role="option"
                    aria-selected={isSelected}
                    aria-label={`${char.char} - ${char.pinyin}`}
                  >
                    <span className="text-3xl sm:text-4xl hanzi-font block mb-1">{char.char}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{char.pinyin}</span>
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
              <Card className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl">
                <CardHeader className="text-center pb-2">
                  {/* 大字显示 */}
                  <div className="inline-block p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 mb-4">
                    <span className="text-6xl sm:text-7xl hanzi-font gradient-text">
                      {selectedCharacter.char}
                    </span>
                  </div>
                  
                  {/* 拼音 */}
                  <div className="inline-block px-4 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-lg font-medium">
                    {selectedCharacter.pinyin}
                  </div>
                  <CardTitle className="mt-4 text-center text-slate-600 dark:text-slate-300 text-lg font-normal">
                    {selectedCharacter.meaning}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* 属性卡片 */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {selectedCharacter.strokes}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{t('common.strokeCount')}</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <div className="text-lg font-bold text-slate-900 dark:text-white">
                        {selectedCharacter.radical}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{t('learn.radical')}</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {selectedCharacter.structure}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{t('learn.structure')}</div>
                    </div>
                  </div>

                  {/* 书写画布或按钮 */}
                  {showCanvas ? (
                    <div className="space-y-4">
                      <WritingCanvas
                        character={selectedCharacter.char}
                        strokeCount={selectedCharacter.strokes}
                        onComplete={handleWritingComplete}
                        showGuide={true}
                      />
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowCanvas(false)}
                      >
                        取消
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                        onClick={handleStartWriting}
                      >
                        {t('learn.startWriting')}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label={t('learn.listenPronunciation')}
                      >
                        🔊
                      </Button>
                    </div>
                  )}

                  {/* 掌握度进度条 */}
                  {charProgress && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">{t('learn.masteryProgress')}</span>
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">
                          {charProgress.accuracy}%
                        </span>
                      </div>
                      <Progress 
                        value={charProgress.accuracy} 
                        className="h-2"
                        aria-label={`掌握度: ${charProgress.accuracy}%`}
                      />
                      <div className="text-xs text-slate-400 dark:text-slate-500 text-right">
                        练习次数: {charProgress.practiceCount}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl text-center py-12">
                <CardContent>
                  <p className="text-slate-500 dark:text-slate-400">{t('learn.selectChar')}</p>
                </CardContent>
              </Card>
            )}
          </section>
        </div>

        {/* 底部提示 */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            {t('learn.practiceHints')}
          </p>
        </div>
      </div>
    </div>
  );
}
