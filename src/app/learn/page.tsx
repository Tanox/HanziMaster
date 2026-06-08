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
    setSelectedCharacterId(char.id);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, char: Character) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectCharacter(char);
    }
  }, [selectCharacter]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 safe-bottom">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 text-black dark:text-white">
          {t('common.dailyPractice')}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {t('common.masterCharacters')}
        </p>
      </div>

      <div
        className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-5 mb-12"
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
              className={`group bg-[#fbfbfd] dark:bg-[#1d1d1f] aspect-square rounded-[24px] border border-gray-200 dark:border-gray-800 hover:border-[#007aff] dark:hover:border-[#2997ff] hover:bg-[#007aff]/5 dark:hover:bg-[#007aff]/10 transition-all duration-300 text-center relative overflow-hidden outline-none ${
                isSelected
                  ? 'bg-black dark:bg-white border-black dark:border-white'
                  : ''
              }`}
            >
              <span className={`text-4xl sm:text-5xl font-light mb-2 block transition-colors hanzi-font ${
                isSelected
                  ? 'text-white dark:text-black'
                  : 'text-black dark:text-white'
              }`}>
                {char.hanzi}
              </span>
              <span className={`text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-medium ${
                isSelected ? 'text-white/70 dark:text-black/70' : ''
              }`}>
                {char.pinyin}
              </span>
            </button>
          );
        })}
      </div>

      {selectedCharacter && (
        <div className="bg-[#fbfbfd] dark:bg-[#1d1d1f] rounded-[32px] p-10 border border-gray-200 dark:border-gray-800 animate-scale-in">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br from-white to-[#f5f5f7] dark:from-[#1d1d1f] dark:to-black rounded-[24px] flex items-center justify-center border border-gray-200 dark:border-gray-800 shrink-0 relative group">
              <span className="text-[120px] sm:text-[140px] font-light text-gray-700 dark:text-gray-300 hanzi-font transition-all duration-500 group-hover:scale-110">
                {selectedCharacter.hanzi}
              </span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-4 mb-8">
                <h3 className="text-4xl sm:text-5xl font-semibold text-black dark:text-white hanzi-font">
                  {selectedCharacter.hanzi}
                </h3>
                <span className="text-2xl text-gray-500 dark:text-gray-400 font-medium">
                  {selectedCharacter.pinyin}
                </span>
                <span className="inline-block px-4 py-2 bg-[#007aff]/10 text-[#007aff] rounded-full text-sm font-semibold">
                  {t(selectedCharacter.translationKey)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white dark:bg-black rounded-[20px] p-5">
                  <div className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2 font-medium">
                    {t('common.strokeCount')}
                  </div>
                  <div className="text-2xl font-semibold text-black dark:text-white">
                    {selectedCharacter.strokes} {t('common.strokes')}
                  </div>
                </div>
                <div className="bg-white dark:bg-black rounded-[20px] p-5">
                  <div className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2 font-medium">
                    {t('learn.radical')}
                  </div>
                  <div className="text-2xl font-semibold text-black dark:text-white hanzi-font">
                    {selectedCharacter.radical}
                  </div>
                </div>
                <div className="bg-white dark:bg-black rounded-[20px] p-5">
                  <div className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2 font-medium">
                    {t('learn.structure')}
                  </div>
                  <div className="text-2xl font-semibold text-black dark:text-white">
                    {selectedCharacter.structure}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start">
                <button
                  className="group bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-[980px] text-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
                  aria-label={`${t('common.practiceWriting')} ${selectedCharacter.hanzi}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {t('common.practiceWriting')}
                </button>
                <button
                  className="group text-[#007aff] text-lg font-medium hover:opacity-70 transition-opacity flex items-center justify-center gap-2"
                  aria-label={`${t('common.hearPronunciation')} ${selectedCharacter.hanzi}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
