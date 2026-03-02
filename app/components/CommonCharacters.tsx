// app/components/CommonCharacters.tsx v1.3.4

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { COMMON_CHARACTERS, CommonCharacter } from '../constants/commonCharacters';
import { UILabels } from '../types';

interface CommonCharactersProps {
  onSelect: (char: string) => void;
  labels: UILabels;
}

const CommonCharacters: React.FC<CommonCharactersProps> = ({ onSelect, labels }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleChars = isExpanded ? COMMON_CHARACTERS : COMMON_CHARACTERS.slice(0, 15);

  return (
    <div id="common-characters-section" className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
          {labels.commonCharacters || 'Common Characters'}
        </h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <span>{isExpanded ? labels.showLess : labels.showMore}</span>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
            <ChevronDown size={16} />
          </motion.div>
        </button>
      </div>
      <motion.div className="flex flex-wrap gap-2 overflow-hidden">
        <AnimatePresence>
          {visibleChars.map((charData) => (
            <motion.button
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key={charData.char}
              onClick={() => onSelect(charData.char)}
              className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="font-hanzi text-xl">{charData.char}</span>
              <span className="ml-2 text-sm opacity-60">{charData.pinyin}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CommonCharacters;
