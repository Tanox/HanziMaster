
/**
 * HanziMaster v0.5.2
 */
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
  apiKey?: string;
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
  apiKey,
}) => {
  const isPractice = mode === InteractionMode.PRACTICE;

  return (
    <div id="controls-container" className="flex flex-col items-center gap-4 mt-6 w-full max-w-xs">
      {/* Mode Toggle */}
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
            {/* Secondary: Reset Button */}
            <button
              id="btn-reset"
              onClick={onReset}
              disabled={isPractice}
              className={`w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full transition-all ${
                  isPractice 
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30'
              }`}
              title={labels.reset}
              aria-label={labels.reset}
            >
              <RotateCcw size={20} />
            </button>
            
            {/* Primary: Play/Pause Button */}
            {animationState === AnimationState.PLAYING ? (
            <button
                id="btn-pause"
                onClick={onPause}
                disabled={isPractice}
                className={`w-16 h-16 flex items-center justify-center text-white bg-teal-600 dark:bg-teal-500 rounded-full transform transition-all ${
                    isPractice
                    ? 'opacity-30 cursor-not-allowed grayscale'
                    : 'hover:bg-teal-700 dark:hover:bg-teal-600 hover:scale-105'
                }`}
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
                className={`w-16 h-16 flex items-center justify-center text-white bg-teal-600 dark:bg-teal-500 rounded-full transform transition-all ${
                    isPractice
                    ? 'opacity-30 cursor-not-allowed grayscale'
                    : 'hover:bg-teal-700 dark:hover:bg-teal-600 hover:scale-105'
                }`}
                title={labels.play}
                aria-label={labels.play}
            >
                <Play size={28} fill="currentColor" className="ml-1" />
            </button>
            )}

            {/* Secondary: Pronunciation Button */}
            <PronunciationButton
                text={char}
                size={22}
                className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                apiKey={apiKey}
            />
        </div>
      </div>
    </div>
  );
};

export default Controls;