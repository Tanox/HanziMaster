// app/components/LearningPath.tsx v1.3.4
'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, BookOpen, GraduationCap, Palette } from 'lucide-react';
import { UILabels } from '../types';

interface Level {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  chars: string[];
  color: string;
}

interface LearningPathProps {
  labels: UILabels;
  onSelectChar: (char: string) => void;
}

const LearningPath: React.FC<LearningPathProps> = ({ labels, onSelectChar }) => {
  const [activeLevel, setActiveLevel] = useState<number>(0);

  const levels: Level[] = [
    {
      id: 'l1',
      title: labels.learningPathL1Title || 'L1: Foundation',
      desc: labels.learningPathL1Desc || 'Basic strokes & core rules',
      icon: <BookOpen className="w-5 h-5" />,
      chars: ['一', '二', '三', '十', '人', '大', '口', '日', '田', '山', '水', '火'],
      color: 'teal'
    },
    {
      id: 'l2',
      title: labels.learningPathL2Title || 'L2: Advancement',
      desc: labels.learningPathL2Desc || 'Structures & radicals',
      icon: <GraduationCap className="w-5 h-5" />,
      chars: ['你', '好', '他', '学', '家', '花', '国', '同', '区', '这', '道', '建'],
      color: 'indigo'
    },
    {
      id: 'l3',
      title: labels.learningPathL3Title || 'L3: Mastery',
      desc: labels.learningPathL3Desc || 'Complex characters & culture',
      icon: <Palette className="w-5 h-5" />,
      chars: ['龙', '凤', '繁', '森', '爱', '慧', '德', '愿', '墨', '舞', '琴', '书'],
      color: 'amber'
    }
  ];

  const currentLevel = levels[activeLevel];

  return (
    <div id="learning-path-module" className="w-full max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          {labels.learningPathTitle || 'Learning Path'}
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveLevel(prev => Math.max(0, prev - 1))}
            disabled={activeLevel === 0}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => setActiveLevel(prev => Math.min(levels.length - 1, prev + 1))}
            disabled={activeLevel === levels.length - 1}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className={`p-4 rounded-2xl bg-${currentLevel.color}-50 dark:bg-${currentLevel.color}-900/20 text-${currentLevel.color}-600 dark:text-${currentLevel.color}-400 shrink-0`}>
          {currentLevel.icon}
        </div>
        <div className="flex-grow">
          <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{currentLevel.title}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">{currentLevel.desc}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-4 sm:grid-cols-6 gap-3">
        {currentLevel.chars.map((char) => (
          <button
            key={char}
            onClick={() => onSelectChar(char)}
            className="aspect-square flex items-center justify-center text-2xl font-hanzi bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all active:scale-90 hover:shadow-md"
          >
            {char}
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {levels.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeLevel ? 'w-8 bg-teal-500' : 'w-2 bg-slate-200 dark:bg-slate-700'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LearningPath;
