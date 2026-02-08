import React from 'react';
import { CharacterAnalysis } from '../types';
import { BookOpen, Lightbulb, History, Quote } from 'lucide-react';
import { UI_LABELS } from '../locales';
import PronunciationButton from './PronunciationButton';

interface AnalysisPanelProps {
  analysis: CharacterAnalysis | null;
  isLoading: boolean;
  language: string;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis, isLoading, language }) => {
  const labels = UI_LABELS[language] || UI_LABELS['en'];

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
          <div className="h-32 bg-slate-100 dark:bg-slate-700/50 rounded mt-6"></div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 grid gap-6 grid-cols-1 md:grid-cols-2">
      {/* Header Card */}
      <div className="col-span-1 md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between transition-colors duration-300">
        <div>
          <div className="flex items-end gap-3">
            <h2 className="text-4xl font-hanzi font-bold text-slate-800 dark:text-white">{analysis.char}</h2>
            <PronunciationButton text={analysis.char} size={24} className="mb-1" />
          </div>
          <p className="text-teal-600 dark:text-teal-400 text-lg font-medium mt-1 ml-1">{analysis.pinyin}</p>
        </div>
        <div className="text-right">
          <p className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider font-semibold">{labels.meaning}</p>
          <p className="text-slate-800 dark:text-slate-100 text-xl font-serif italic">{analysis.meaning}</p>
        </div>
      </div>

      {/* Radical & Stats */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300">
        <div className="flex items-center gap-2 mb-4 text-teal-700 dark:text-teal-400">
          <BookOpen size={20} />
          <h3 className="font-semibold">{labels.structure}</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between border-b border-slate-50 dark:border-slate-700 pb-2">
            <span className="text-slate-500 dark:text-slate-400">{labels.radical}</span>
            <span className="font-hanzi text-lg text-slate-800 dark:text-slate-200">{analysis.radical}</span>
          </div>
          <div className="flex justify-between border-b border-slate-50 dark:border-slate-700 pb-2">
            <span className="text-slate-500 dark:text-slate-400">{labels.strokeCount}</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">{analysis.strokeCount}</span>
          </div>
        </div>
      </div>

      {/* Etymology */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300">
        <div className="flex items-center gap-2 mb-4 text-amber-600 dark:text-amber-500">
          <History size={20} />
          <h3 className="font-semibold">{labels.origin}</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          {analysis.etymology}
        </p>
      </div>

      {/* Mnemonic */}
      <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 p-6 rounded-2xl border border-teal-100 dark:border-teal-900 transition-colors duration-300">
        <div className="flex items-center gap-2 mb-3 text-teal-800 dark:text-teal-300">
          <Lightbulb size={20} />
          <h3 className="font-bold">{labels.memoryAid}</h3>
        </div>
        <p className="text-teal-900 dark:text-teal-100 text-lg font-medium italic">
          "{analysis.mnemonic}"
        </p>
      </div>

      {/* Examples */}
      <div className="col-span-1 md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300">
        <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400">
          <Quote size={20} />
          <h3 className="font-semibold">{labels.commonWords}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {analysis.examples.map((ex, i) => (
            <div key={i} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-100 dark:border-slate-700 hover:border-indigo-100 dark:hover:border-indigo-900 transition-colors">
              <div className="flex justify-between items-start">
                  <div className="text-2xl font-hanzi text-slate-800 dark:text-slate-100 mb-1">{ex.word}</div>
                  <PronunciationButton text={ex.word} size={18} />
              </div>
              <div className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">{ex.pinyin}</div>
              <div className="text-slate-500 dark:text-slate-400 text-xs mt-1">{ex.meaning}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPanel;