'use client';

import { useState, useCallback } from 'react';
import { useTranslation } from '@/components/locale-provider';

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
    setSelectedCharacterId(prev => (prev === char.id ? null : char.id));
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, char: Character) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectCharacter(char);
    }
  }, [selectCharacter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 safe-bottom">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-4 sm:gap-6">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-1 sm:mb-3 text-slate-900 dark:text-white">
            {t('common.dailyPractice')}
          </h2>
          <p className="text-sm sm:text-lg text-slate-500 dark:text-slate-400">
            {t('common.masterCharacters')}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-sm font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-4 sm:px-5 py-2 sm:py-3 rounded-full shadow-sm">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span>5 {t('common.dayStreak')}</span>
        </div>
      </div>

      {/* Character Grid */}
      <div
        className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 mb-8 sm:mb-12"
        role="listbox"
        aria-label={t('common.masterCharacters')}
      >
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
              className={`group bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-2xl border-2 shadow-sm hover:shadow-lg transition-all duration-300 text-center relative overflow-hidden outline-none ${
                isSelected
                  ? 'border-emerald-500 dark:border-emerald-400 shadow-emerald-500/20 scale-[1.04]'
                  : 'border-slate-100 dark:border-slate-700 active:scale-95'
              }`}
              style={{ minHeight: 88, minWidth: 72 }}
            >
              {/* Selected top bar indicator */}
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />
              )}

              {/* Hover Overlay - only on devices that support hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 hidden sm:block"></div>

              <span className={`text-3xl sm:text-4xl font-bold mb-1 sm:mb-2 block transition-colors hanzi-font relative z-10 ${
                isSelected
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
              }`}>
                {char.hanzi}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-medium relative z-10">
                {char.pinyin}
              </span>
            </button>
          );
        })}
      </div>

      {/* Character Detail Panel */}
      {selectedCharacter && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-700 shadow-lg animate-scale-in">
          <div className="flex flex-col md:flex-row gap-6 sm:gap-10 items-center md:items-start">
            {/* Character Display */}
            <div className="w-36 h-36 sm:w-48 sm:h-48 bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-900/20 rounded-2xl sm:rounded-3xl flex items-center justify-center border-2 border-dashed border-emerald-200 dark:border-emerald-800/50 shrink-0 relative overflow-hidden group">
              <span className="text-6xl sm:text-9xl text-slate-800 dark:text-slate-200 hanzi-font transition-all duration-500 group-hover:scale-110">
                {selectedCharacter.hanzi}
              </span>
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:block"></div>
            </div>

            {/* Character Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 sm:gap-4 mb-4 sm:mb-6">
                <h3 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white hanzi-font">
                  {selectedCharacter.hanzi}
                </h3>
                <span className="text-lg sm:text-2xl text-slate-400 dark:text-slate-500 font-medium">
                  {selectedCharacter.pinyin}
                </span>
                <span className="inline-block px-3 sm:px-4 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs sm:text-sm font-semibold">
                  {t(selectedCharacter.translationKey)}
                </span>
              </div>

              {/* Character Details Grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                  <div className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 font-medium">
                    {t('common.strokeCount')}
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-slate-700 dark:text-slate-300">
                    {selectedCharacter.strokes} {t('common.strokes')}
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                  <div className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 font-medium">
                    {t('learn.radical')}
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-slate-700 dark:text-slate-300 hanzi-font">
                    {selectedCharacter.radical}
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                  <div className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 font-medium">
                    {t('learn.structure')}
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-slate-700 dark:text-slate-300">
                    {selectedCharacter.structure}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
                <button
                  className="group bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-95 flex items-center justify-center gap-2 sm:gap-3"
                  style={{ minHeight: 48 }}
                  aria-label={`${t('common.practiceWriting')} ${selectedCharacter.hanzi}`}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {t('common.practiceWriting')}
                </button>
                <button
                  className="group bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-600 active:bg-slate-100 dark:active:bg-slate-500 transition-all flex items-center justify-center gap-2 sm:gap-3 active:scale-95"
                  style={{ minHeight: 48 }}
                  aria-label={`${t('common.hearPronunciation')} ${selectedCharacter.hanzi}`}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  {t('common.hearPronunciation')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
