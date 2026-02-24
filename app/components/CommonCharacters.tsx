// app/components/CommonCharacters.tsx v1.2.1

import React from 'react';
import { COMMON_CHARACTERS, CommonCharacter } from '../constants/commonCharacters';

import { UILabels } from '../types';

interface CommonCharactersProps {
  onSelect: (char: string) => void;
  labels: UILabels;
}

const CommonCharacters: React.FC<CommonCharactersProps> = ({ onSelect, labels }) => {
  return (
    <div id="common-characters-section" className="mt-8">
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">{labels.commonCharacters || 'Common Characters'}</h3>
      <div className="flex flex-wrap gap-2">
        {COMMON_CHARACTERS.map((charData) => (
          <button
            key={charData.char}
            onClick={() => onSelect(charData.char)}
            className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="font-hanzi text-xl">{charData.char}</span>
            <span className="ml-2 text-sm opacity-60">{charData.pinyin}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommonCharacters;
