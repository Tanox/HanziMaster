'use client';

import { useState } from 'react';
import { useTranslation } from '@/components/locale-provider';

interface Character {
  id: number;
  hanzi: string;
  pinyin: string;
  meaning: string;
  translationKey: string;
}

const baseCharacters: Character[] = [
  { id: 1, hanzi: '一', pinyin: 'yī', meaning: '', translationKey: 'learn.one' },
  { id: 2, hanzi: '二', pinyin: 'èr', meaning: '', translationKey: 'learn.two' },
  { id: 3, hanzi: '三', pinyin: 'sān', meaning: '', translationKey: 'learn.three' },
  { id: 4, hanzi: '人', pinyin: 'rén', meaning: '', translationKey: 'learn.person' },
  { id: 5, hanzi: '大', pinyin: 'dà', meaning: '', translationKey: 'learn.big' },
  { id: 6, hanzi: '小', pinyin: 'xiǎo', meaning: '', translationKey: 'learn.small' },
  { id: 7, hanzi: '口', pinyin: 'kǒu', meaning: '', translationKey: 'learn.mouth' },
  { id: 8, hanzi: '日', pinyin: 'rì', meaning: '', translationKey: 'learn.sunDay' },
  { id: 9, hanzi: '月', pinyin: 'yuè', meaning: '', translationKey: 'learn.moonMonth' },
  { id: 10, hanzi: '山', pinyin: 'shān', meaning: '', translationKey: 'learn.mountain' },
  { id: 11, hanzi: '水', pinyin: 'shuǐ', meaning: '', translationKey: 'learn.water' },
  { id: 12, hanzi: '火', pinyin: 'huǒ', meaning: '', translationKey: 'learn.fire' },
];

export default function LearnPage() {
  const { t } = useTranslation();
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(baseCharacters[0]?.id ?? null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(baseCharacters[0] ?? null);

  const selectCharacter = (char: Character) => {
    if (selectedCharacterId === char.id) {
      setSelectedCharacterId(null);
      setSelectedCharacter(null);
    } else {
      setSelectedCharacterId(char.id);
      setSelectedCharacter(char);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">{t('common.dailyPractice')}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t('common.masterCharacters')}</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-full">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span>5 {t('common.dayStreak')}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {baseCharacters.map((char) => (
          <button
            key={char.id}
            onClick={() => selectCharacter(char)}
            className={`bg-white dark:bg-slate-800 p-6 rounded-3xl border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group text-center relative overflow-hidden ${
              selectedCharacterId === char.id
                ? 'border-emerald-500'
                : 'border-slate-100 dark:border-slate-700'
            }`}
          >
            <span className="text-4xl font-bold text-slate-900 dark:text-white mb-2 block group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors hanzi-font">
              {char.hanzi}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">{char.pinyin}</span>
          </button>
        ))}
      </div>

      {selectedCharacter && (
        <div className="mt-12 bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-lg">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-40 h-40 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-600">
              <span className="text-8xl text-slate-800 dark:text-slate-200 hanzi-font">{selectedCharacter.hanzi}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white hanzi-font">{selectedCharacter.hanzi}</h3>
                <span className="text-xl text-slate-500 dark:text-slate-400">{selectedCharacter.pinyin}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-6">{t(selectedCharacter.translationKey)}</p>
              <div className="flex gap-4">
                <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {t('common.practiceWriting')}
                </button>
                <button className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors flex items-center gap-2">
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
