// src/app/learn/page.tsx v2.3.0 - Apple Design Style
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
  { id: 1, hanzi: '一', pinyin: 'yī', meaning: '', translationKey: 'learn.one', strokes: 1, radical: '一', structure: '独体' },
  { id: 2, hanzi: '二', pinyin: 'èr', meaning: '', translationKey: 'learn.two', strokes: 2, radical: '二', structure: '独体' },
  { id: 3, hanzi: '三', pinyin: 'sān', meaning: '', translationKey: 'learn.three', strokes: 3, radical: '一', structure: '独体' },
  { id: 4, hanzi: '人', pinyin: 'rén', meaning: '', translationKey: 'learn.person', strokes: 2, radical: '人', structure: '独体' },
  { id: 5, hanzi: '大', pinyin: 'dà', meaning: '', translationKey: 'learn.big', strokes: 3, radical: '大', structure: '独体' },
  { id: 6, hanzi: '小', pinyin: 'xiǎo', meaning: '', translationKey: 'learn.small', strokes: 3, radical: '小', structure: '独体' },
  { id: 7, hanzi: '口', pinyin: 'kǒu', meaning: '', translationKey: 'learn.mouth', strokes: 3, radical: '口', structure: '独体' },
  { id: 8, hanzi: '日', pinyin: 'rì', meaning: '', translationKey: 'learn.sunDay', strokes: 4, radical: '日', structure: '独体' },
  { id: 9, hanzi: '月', pinyin: 'yuè', meaning: '', translationKey: 'learn.moonMonth', strokes: 4, radical: '月', structure: '独体' },
  { id: 10, hanzi: '山', pinyin: 'shān', meaning: '', translationKey: 'learn.mountain', strokes: 3, radical: '山', structure: '独体' },
  { id: 11, hanzi: '水', pinyin: 'shuǐ', meaning: '', translationKey: 'learn.water', strokes: 4, radical: '水', structure: '独体' },
  { id: 12, hanzi: '火', pinyin: 'huǒ', meaning: '', translationKey: 'learn.fire', strokes: 4, radical: '火', structure: '独体' },
];

export default function LearnPage() {
  const { t } = useTranslation();
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(baseCharacters[0]?.id ?? null);

  const selectedCharacter = baseCharacters.find(char => char.id === selectedCharacterId) ?? null;

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
    <div className="max-w-6xl mx-auto px-6 py-16 pb-24 md:pb-16">
      {/* ─── Page Header - Apple Style ─── */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">每日练习</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">掌握最常用的汉字</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        
        {/* ─── Character Grid - Apple Style ─── */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">选择汉字</h2>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4" role="listbox" aria-label="选择要学习的汉字">
              {baseCharacters.map((char) => {
                const isSelected = selectedCharacterId === char.id;
                return (
                  <button
                    key={char.id}
                    onClick={() => selectCharacter(char)}
                    onKeyDown={(e) => handleKeyDown(e, char)}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={0}
                    className={`char-card aspect-square rounded-2xl flex items-center justify-center text-3xl font-bold hanzi-font cursor-pointer border-2 ${
                      isSelected
                        ? 'border-emerald-500'
                        : 'border-transparent hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                    aria-label={`汉字 ${char.hanzi}, 拼音 ${char.pinyin}`}
                  >
                    {char.hanzi}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Character Detail - Apple Style ─── */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 sticky top-24">
            {/* Character Display */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4 apple-shadow-sm">
                <span className="text-5xl font-bold hanzi-font text-gray-900 dark:text-white">{selectedCharacter?.hanzi}</span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-2xl font-bold hanzi-font text-gray-900 dark:text-white">{selectedCharacter?.hanzi}</span>
                <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium rounded-full">{selectedCharacter?.pinyin}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t(selectedCharacter?.translationKey ?? '')}</p>
            </div>

            {/* Character Details Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center apple-shadow-sm">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">笔画</div>
                <div className="font-semibold text-gray-900 dark:text-white">{selectedCharacter?.strokes}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center apple-shadow-sm">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">部首</div>
                <div className="font-semibold text-gray-900 dark:text-white hanzi-font">{selectedCharacter?.radical}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center apple-shadow-sm">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">结构</div>
                <div className="font-semibold text-gray-900 dark:text-white">{selectedCharacter?.structure}</div>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">掌握度</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">85%</span>
              </div>
              <div role="progressbar" aria-valuenow={85} aria-valuemin={0} aria-valuemax={100} aria-label="笔画掌握度" className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="progress-fill h-full" style={{width: '85%'}}></div>
              </div>
            </div>

            {/* Action Button */}
            <Link href="/practice" className="w-full btn-apple-primary text-white py-4 rounded-full font-medium flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
              练习书写
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
