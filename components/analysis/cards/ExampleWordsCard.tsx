
/**
 * HanziMaster v0.4.9
 */
import React from 'react';
import { BookOpen } from 'lucide-react';
import { ExampleWord } from '../../../types';
import { UILabels } from '../../../locales/types';
import PronunciationButton from '../../PronunciationButton';

interface ExampleWordsCardProps {
  examples: ExampleWord[];
  labels: UILabels;
  apiKey?: string;
}

const ExampleWordsCard: React.FC<ExampleWordsCardProps> = ({ examples, labels, apiKey }) => {
  return (
      <div id="character-examples-card" className="md:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 mt-2">
          <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400">
              <BookOpen size={18} />
              <h3 className="font-bold text-sm uppercase tracking-wide">{labels.commonWords}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {examples.map((ex, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors group">
                  <div className="bg-white dark:bg-slate-800 p-2 rounded text-xl font-hanzi text-slate-800 dark:text-slate-200">
                    <ruby>{ex.word}<rt className="text-[9px] text-vermilion-500">{ex.pinyin}</rt></ruby>
                  </div>
                  <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                          <PronunciationButton text={ex.word} size={14} className="opacity-50 hover:opacity-100" apiKey={apiKey} />
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-xs truncate mt-0.5" title={ex.meaning}>
                          {ex.meaning}
                      </p>
                  </div>
              </div>
              ))}
          </div>
      </div>
  );
};

export default ExampleWordsCard;
