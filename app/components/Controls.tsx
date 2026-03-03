// app/components/Controls.tsx v1.3.7
import React from 'react';
import { Play, Pause, RotateCcw, PenTool, Eye } from 'lucide-react';
import { AnimationState, InteractionMode } from '../types';
import PronunciationButton from './PronunciationButton';

interface ControlsProps {
  animationState: AnimationState;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  mode: InteractionMode;
  onToggleMode: () => void;
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
  char,
  labels,
}) => {
  const isPractice = mode === InteractionMode.PRACTICE;

  return (
    <div id="controls-container" className="flex flex-col items-center gap-4 mt-6 w-full max-w-xs">
      <div id="mode-toggle-container" className="bg-slate-100 dark:bg-slate-800 p-1 rounded-full flex w-full relative border border-slate-200 dark:border-slate-700">
          <button 
            id="btn-view-mode"
            onClick={isPractice ? onToggleMode : undefined}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-medium transition-all ${
                !isPractice 
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-400' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
              <Eye size={16} />
              {labels.viewMode}
          </button>
          <button 
            id="btn-practice-mode"
            onClick={!isPractice ? onToggleMode : undefined}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-medium transition-all ${
                isPractice 
                ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-400' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
              <PenTool size={16} />
              {labels.practiceMode}
          </button>
      </div>

      <div id="playback-controls-container" className="flex flex-col items-center gap-4 transition-all duration-300 pt-2">
        <div className="flex items-center justify-center gap-3">
            {isPractice ? (
                <button
                    id="btn-reset"
                    onClick={onReset}
                    className="w-16 h-16 flex items-center justify-center text-white bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 rounded-full transform transition-all hover:scale-105 shadow-md"
                    title={labels.reset || 'Clear Strokes'}
                    aria-label={labels.reset || 'Clear Strokes'}
                >
                    <RotateCcw size={28} />
                </button>
            ) : animationState === AnimationState.PLAYING ? (
            <button
                id="btn-pause"
                onClick={onPause}
                disabled={isPractice}
                className="w-16 h-16 flex items-center justify-center text-white bg-teal-600 dark:bg-teal-500 rounded-full transform transition-all hover:bg-teal-700 dark:hover:bg-teal-600 hover:scale-105 shadow-md"
                title={labels.pause}
                aria-label={labels.pause}
            >
                <Pause size={28} fill="currentColor" />
            </button>
            ) : (
            <button
                id="btn-play"
                onClick={onPlay}
                disabled={isPractice}
                className="w-16 h-16 flex items-center justify-center text-white bg-teal-600 dark:bg-teal-500 rounded-full transform transition-all hover:bg-teal-700 dark:hover:bg-teal-600 hover:scale-105 shadow-md"
                title={labels.play}
                aria-label={labels.play}
            >
                <Play size={28} fill="currentColor" className="ml-1" />
            </button>
            )}

            <PronunciationButton
                text={char}
                size={22}
                className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
        </div>
      </div>
    </div>
  );
};

export default Controls;
