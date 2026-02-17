// app/components/analysis/cards/ExampleWordsCard.tsx v0.7.1
import React from 'react';
import { BookOpen } from 'lucide-react';
import { ExampleWord, UILabels } from '../../../types';
import BaseCard from './BaseCard';
import PronunciationButton from '../../PronunciationButton';

interface ExampleWordsCardProps {
  examples: ExampleWord[];
  labels: UILabels;
  apiKey?: string;
}

const ExampleWordsCard: React.FC<ExampleWordsCardProps> = ({ examples, labels, apiKey }) => {
  if (!examples || examples.length === 0) return null;

  return (
    <BaseCard icon={<BookOpen size={14} />} title={labels.commonWords || 'Vocabulary'} className="md:col-span-4">
      <div className="space-y-4">
        {examples.slice(0, 3).map((ex, i) => (
          <div key={i} className="flex items-start gap-3">
            <PronunciationButton text={ex.word} size={18} apiKey={apiKey} className="min-w-0 w-8 h-8 -ml-1" />
            <div className="flex-1">
              <ruby className="font-hanzi text-lg text-slate-800 dark:text-slate-100">
                {ex.word}
                <rt className="text-xs text-slate-400">{ex.pinyin}</rt>
              </ruby>
              <p className="text-xs text-slate-500 dark:text-slate-400">{ex.meaning}</p>
            </div>
          </div>
        ))}
      </div>
    </BaseCard>
  );
};

export default ExampleWordsCard;