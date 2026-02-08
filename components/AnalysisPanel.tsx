import React from 'react';
import { CharacterAnalysis } from '../types';
import { BookOpen, Lightbulb, History, Quote } from 'lucide-react';
import { UI_LABELS } from '../locales';

interface AnalysisPanelProps {
  analysis: CharacterAnalysis | null;
  isLoading: boolean;
  language: string;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis, isLoading, language }) => {
  const labels = UI_LABELS[language] || UI_LABELS['en'];

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/4"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          <div className="h-32 bg-slate-100 rounded mt-6"></div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 grid gap-6 grid-cols-1 md:grid-cols-2">
      {/* Header Card */}
      <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-hanzi font-bold text-slate-800">{analysis.char}</h2>
          <p className="text-teal-600 text-lg font-medium mt-1">{analysis.pinyin}</p>
        </div>
        <div className="text-right">
          <p className="text-slate-500 text-sm uppercase tracking-wider font-semibold">{labels.meaning}</p>
          <p className="text-slate-800 text-xl font-serif italic">{analysis.meaning}</p>
        </div>
      </div>

      {/* Radical & Stats */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-4 text-teal-700">
          <BookOpen size={20} />
          <h3 className="font-semibold">{labels.structure}</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between border-b border-slate-50 pb-2">
            <span className="text-slate-500">{labels.radical}</span>
            <span className="font-hanzi text-lg">{analysis.radical}</span>
          </div>
          <div className="flex justify-between border-b border-slate-50 pb-2">
            <span className="text-slate-500">{labels.strokeCount}</span>
            <span className="font-medium">{analysis.strokeCount}</span>
          </div>
        </div>
      </div>

      {/* Etymology */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-4 text-amber-600">
          <History size={20} />
          <h3 className="font-semibold">{labels.origin}</h3>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          {analysis.etymology}
        </p>
      </div>

      {/* Mnemonic */}
      <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-2xl border border-teal-100">
        <div className="flex items-center gap-2 mb-3 text-teal-800">
          <Lightbulb size={20} />
          <h3 className="font-bold">{labels.memoryAid}</h3>
        </div>
        <p className="text-teal-900 text-lg font-medium italic">
          "{analysis.mnemonic}"
        </p>
      </div>

      {/* Examples */}
      <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-4 text-indigo-600">
          <Quote size={20} />
          <h3 className="font-semibold">{labels.commonWords}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {analysis.examples.map((ex, i) => (
            <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-indigo-100 transition-colors">
              <div className="text-2xl font-hanzi text-slate-800 mb-1">{ex.word}</div>
              <div className="text-indigo-600 text-sm font-medium">{ex.pinyin}</div>
              <div className="text-slate-500 text-xs mt-1">{ex.meaning}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisPanel;