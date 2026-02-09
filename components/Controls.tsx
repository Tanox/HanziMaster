import React from 'react';
import { Play, Pause, RotateCcw, PenTool, Eye } from 'lucide-react';
import { AnimationState, InteractionMode, AppSettings } from '../types';
import PronunciationButton from './PronunciationButton';

interface ControlsProps {
  animationState: AnimationState;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  mode: InteractionMode;
  onToggleMode: () => void;
  settings: AppSettings;
  char: string;
  labels: {
    play: string;
    pause: string;
    reset: string;
    speed: string;
    practiceMode: string;
    viewMode: string;
  };
}

const Controls: React.FC<ControlsProps> = ({
  animationState,
  onPlay,
  onPause,
  onReset,
  mode,
  onToggleMode,
  settings,
  char,
  labels,
}) => {
  const isPractice = mode === InteractionMode.PRACTICE;

  return (
    <div className="flex flex-col items-center gap-4 mt-6 w-full max-w-xs">
      {/* Mode Toggle */}
      <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-full flex w-full relative border border-slate-200 dark:border-slate-700">
          <button 
            onClick={isPractice ? onToggleMode : undefined}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-medium transition-all ${
                !isPractice 
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-400 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
              <Eye size={16} />
              {labels.viewMode}
          </button>
          <button 
            onClick={!isPractice ? onToggleMode : undefined}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-medium transition-all ${
                isPractice 
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-400 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
              <PenTool size={16} />
              {labels.practiceMode}
          </button>
      </div>

      <div className="flex flex-col items-center gap-4 transition-all duration-300">
        <div className="flex items-center gap-4">
            <button
            onClick={onReset}
            disabled={isPractice}
            className={`p-3 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm transition-all ${
                isPractice 
                ? 'opacity-30 cursor-not-allowed' 
                : 'hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-teal-600 dark:hover:text-teal-400'
            }`}
            title={labels.reset}
            aria-label={labels.reset}
            >
            <RotateCcw size={20} />
            </button>
            
            {/* Pronunciation Button (Always Enabled) */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm p-0.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
               <PronunciationButton text={char} size={22} className="w-[44px] h-[44px]" />
            </div>
            
            {animationState === AnimationState.PLAYING ? (
            <button
                onClick={onPause}
                disabled={isPractice}
                className={`p-4 text-white bg-teal-600 dark:bg-teal-500 rounded-full shadow-md transform transition-all ${
                    isPractice
                    ? 'opacity-30 cursor-not-allowed grayscale'
                    : 'hover:bg-teal-700 dark:hover:bg-teal-600 hover:scale-105'
                }`}
                title={labels.pause}
                aria-label={labels.pause}
            >
                <Pause size={24} fill="currentColor" />
            </button>
            ) : (
            <button
                onClick={onPlay}
                disabled={isPractice}
                className={`p-4 text-white bg-teal-600 dark:bg-teal-500 rounded-full shadow-md transform transition-all ${
                    isPractice
                    ? 'opacity-30 cursor-not-allowed grayscale'
                    : 'hover:bg-teal-700 dark:hover:bg-teal-600 hover:scale-105'
                }`}
                title={labels.play}
                aria-label={labels.play}
            >
                <Play size={24} fill="currentColor" className="ml-1" />
            </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Controls;