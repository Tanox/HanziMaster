// app/components/analysis/cards/ExampleWordsCard.tsx v0.9.7
'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';
import { ExampleWord, UILabels } from '../../../types';
import BaseCard from './BaseCard';
import PronunciationButton from '../../PronunciationButton';

interface ExampleWordsCardProps {
  examples: ExampleWord[];
  labels: UILabels;
  onSearch?: (term: string) => void;
}

const ExampleWordsCard: React.FC<ExampleWordsCardProps> = ({ examples, labels, onSearch }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  if (!Array.isArray(examples) || examples.length === 0) return null;

  const displayExamples = isExpanded ? examples : examples.slice(0, 3);
  const hasMore = examples.length > 3;

  return (
    <BaseCard icon={<BookOpen size={14} />} title={labels.commonWords || 'Vocabulary'} className="md:col-span-4">
      <div className="space-y-4">
        {displayExamples.map((ex, i) => (
          <div key={i} className="flex items-start gap-3 group">
            <PronunciationButton 
              text={ex.word} 
              size={16} 
              className="mt-1 shrink-0 w-8 h-8 min-w-0 min-h-0 p-0 bg-slate-50 dark:bg-slate-900/50 hover:bg-teal-50 dark:hover:bg-teal-900/30 border border-slate-100 dark:border-slate-700 transition-all duration-200" 
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <button 
                  onClick={() => onSearch?.(ex.word)}
                  className="font-hanzi text-xl text-slate-800 dark:text-slate-100 leading-none hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-left"
                >
                  {ex.word}
                </button>
                <span className="text-xs font-medium text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 px-1.5 py-0.5 rounded">
                  {ex.pinyin}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {ex.meaning}
              </p>
            </div>
          </div>
        ))}

        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-2 mt-2 text-xs font-medium text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-teal-50/50 dark:hover:bg-teal-900/20 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 transition-all duration-200"
          >
            {isExpanded ? labels.showLess : labels.showMore}
          </button>
        )}
      </div>
    </BaseCard>
  );
};

export default ExampleWordsCard;