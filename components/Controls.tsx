import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { AnimationState } from '../types';

interface ControlsProps {
  animationState: AnimationState;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const Controls: React.FC<ControlsProps> = ({
  animationState,
  onPlay,
  onPause,
  onReset,
  speed,
  onSpeedChange,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onReset}
          className="p-3 text-slate-600 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:text-teal-600 transition-colors shadow-sm"
          title="Reset"
        >
          <RotateCcw size={20} />
        </button>
        
        {animationState === AnimationState.PLAYING ? (
          <button
            onClick={onPause}
            className="p-4 text-white bg-teal-600 rounded-full hover:bg-teal-700 transition-colors shadow-md transform hover:scale-105"
            title="Pause"
          >
            <Pause size={24} fill="currentColor" />
          </button>
        ) : (
          <button
            onClick={onPlay}
            className="p-4 text-white bg-teal-600 rounded-full hover:bg-teal-700 transition-colors shadow-md transform hover:scale-105"
            title="Play"
          >
            <Play size={24} fill="currentColor" className="ml-1" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Speed</span>
        <div className="flex gap-1">
          {[0.5, 1, 1.5].map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-2 py-1 text-xs font-bold rounded ${
                speed === s
                  ? 'bg-teal-100 text-teal-700'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Controls;