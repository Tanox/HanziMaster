import React from 'react';
import { Play, Pause, RotateCcw, PenTool, Eye } from 'lucide-react';
import { AnimationState, InteractionMode } from '../types';

interface ControlsProps {
  animationState: AnimationState;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  mode: InteractionMode;
  onToggleMode: () => void;
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
  speed,
  onSpeedChange,
  mode,
  onToggleMode,
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

      <div className={`flex flex-col items-center gap-4 transition-all duration-300 ${isPractice ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}>
        <div className="flex items-center gap-4">
            <button
            onClick={onReset}
            className="p-3 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-teal-600 dark:hover:text-teal-400 transition-colors shadow-sm"
            title={labels.reset}
            aria-label={labels.reset}
            >
            <RotateCcw size={20} />
            </button>
            
            {animationState === AnimationState.PLAYING ? (
            <button
                onClick={onPause}
                className="p-4 text-white bg-teal-600 dark:bg-teal-500 rounded-full hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors shadow-md transform hover:scale-105"
                title={labels.pause}
                aria-label={labels.pause}
            >
                <Pause size={24} fill="currentColor" />
            </button>
            ) : (
            <button
                onClick={onPlay}
                className="p-4 text-white bg-teal-600 dark:bg-teal-500 rounded-full hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors shadow-md transform hover:scale-105"
                title={labels.play}
                aria-label={labels.play}
            >
                <Play size={24} fill="currentColor" className="ml-1" />
            </button>
            )}
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{labels.speed}</span>
            <div className="flex gap-1">
            {[0.5, 1, 1.5].map((s) => (
                <button
                key={s}
                onClick={() => onSpeedChange(s)}
                className={`px-2 py-1 text-xs font-bold rounded ${
                    speed === s
                    ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
                >
                {s}x
                </button>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;