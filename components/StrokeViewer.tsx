
/**
 * HanziMaster v0.5.2
 */
import React, { useRef, useMemo } from 'react';
import { HanziData, AnimationState, InteractionMode, AppSettings } from '../types';
import { PenTool } from 'lucide-react';
import { UILabels } from '../locales/types';
import { getMedianPath } from '../utils/geometry';
import { useStrokeAnimation } from '../hooks/useStrokeAnimation';
import { usePracticeDrawing } from '../hooks/usePracticeDrawing';

interface StrokeViewerProps {
  data: HanziData;
  animationState: AnimationState;
  setAnimationState: (state: AnimationState) => void;
  speed: number;
  mode: InteractionMode;
  settings: AppSettings;
  onPracticeComplete?: () => void;
  labels: UILabels;
}

const StrokeViewer: React.FC<StrokeViewerProps> = ({
  data,
  animationState,
  setAnimationState,
  speed,
  mode,
  settings,
  onPracticeComplete,
  labels
}) => {
  // SVG Constants
  const SIZE = 1024; 
  const OFFSET_Y = 900; 
  const idPrefix = React.useId();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- Hooks ---
  const { currentStrokeIndex, progress, strokeLengths } = useStrokeAnimation(
    data, mode, animationState, setAnimationState, speed
  );

  const { practiceStrokeIndex, showSuccess, handlers } = usePracticeDrawing(
    canvasRef, data, mode, onPracticeComplete
  );

  // --- Render Helpers ---

  const gridLines = useMemo(() => {
    if (settings.gridStyle === 'none') return [];
    const lines = [
      { d: `M 0,0 L ${SIZE},0 L ${SIZE},${SIZE} L 0,${SIZE} Z` },
      { d: `M ${SIZE/2},0 L ${SIZE/2},${SIZE}` },
      { d: `M 0,${SIZE/2} L ${SIZE},${SIZE/2}` },
    ];
    if (settings.gridStyle === 'rice') {
      lines.push({ d: `M 0,0 L ${SIZE},${SIZE}` });
      lines.push({ d: `M ${SIZE},0 L 0,${SIZE}` });
    }
    return lines;
  }, [settings.gridStyle]);

  const StatusOverlay = () => {
    let text: string | null = null;
    if (mode === InteractionMode.PRACTICE) {
        if (showSuccess) text = labels.practiceComplete;
        else if (practiceStrokeIndex < data.strokes.length) {
            text = (labels.strokeProgress || "Stroke {current} / {total}")
                .replace('{current}', (practiceStrokeIndex + 1).toString())
                .replace('{total}', data.strokes.length.toString());
        }
    } else if (mode === InteractionMode.VIEW) {
        if (currentStrokeIndex >= data.strokes.length && data.strokes.length > 0 && animationState === AnimationState.IDLE) {
            text = labels.strokeStatusComplete;
        }
    }
    if (!text) return null;
    return (
        <div id="stroke-status-overlay" className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none animate-fade-in">
            <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold backdrop-blur-sm shadow-sm flex items-center gap-2 ${mode === InteractionMode.PRACTICE && showSuccess ? 'bg-emerald-600/90 text-white' : 'bg-slate-900/10 dark:bg-white/10 text-slate-500 dark:text-slate-300'}`}>
                {mode === InteractionMode.PRACTICE && !showSuccess && <PenTool size={10} />}
                {text}
            </div>
        </div>
    );
  };

  return (
    <div id="stroke-viewer-container" className="w-full max-w-xs relative bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-700 aspect-square shadow-inner bg-texture-paper select-none touch-none overflow-hidden">
      <svg id="stroke-svg" viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full">
        <defs>
          {data.strokes.map((stroke, i) => (
            <clipPath id={`${idPrefix}-clip-${i}`} key={i}>
              <path d={stroke} />
            </clipPath>
          ))}
        </defs>

        <g strokeWidth="2" fill="none" className="stroke-slate-200 dark:stroke-slate-700 opacity-70">
            {gridLines.map((line, i) => <path key={i} d={line.d} vectorEffect="non-scaling-stroke" />)}
        </g>

        <g transform={`translate(0, ${OFFSET_Y}) scale(1, -1)`}>
          {/* Background Outline (Guide) */}
          {(settings.showOutline || mode === InteractionMode.PRACTICE) && (
            <path 
              d={data.strokes.join(' ')} 
              className={`fill-none stroke-vermilion-100 dark:stroke-white/20 ${mode === InteractionMode.PRACTICE ? 'opacity-60' : 'opacity-100'}`} 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          )}

          {/* Animated Strokes (View Mode) - Masked Median Animation */}
          {mode === InteractionMode.VIEW && data.strokes.map((_, i) => {
             // Optimization: Skip future strokes
             if (i > currentStrokeIndex && currentStrokeIndex !== -1) return null;
             
             const median = data.medians[i];
             if (!median) return null;

             return (
               <path
                 key={i}
                 d={getMedianPath(median)}
                 clipPath={`url(#${idPrefix}-clip-${i})`}
                 className="fill-none stroke-slate-900 dark:stroke-slate-100"
                 strokeWidth="128" // Thick centerline to fill the mask
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 style={{
                   opacity: i <= currentStrokeIndex ? 1 : 0,
                   strokeDasharray: strokeLengths[i],
                   strokeDashoffset: i === currentStrokeIndex ? strokeLengths[i] * (1 - progress) : (i < currentStrokeIndex ? 0 : strokeLengths[i]),
                 }}
               />
             );
          })}

          {/* Completed Strokes (Practice Mode) - Solid Fill */}
          {mode === InteractionMode.PRACTICE && data.strokes.map((stroke, i) => (
            <path
              key={i}
              d={stroke} 
              className="fill-slate-900 dark:fill-slate-100 stroke-none" 
              style={{ opacity: i < practiceStrokeIndex ? 1 : 0 }}
            />
          ))}
        </g>
      </svg>
      
      <canvas 
        id="practice-canvas" 
        ref={canvasRef} 
        width={SIZE} 
        height={SIZE} 
        className="absolute inset-0 w-full h-full cursor-crosshair" 
        onPointerDown={handlers.handlePointerDown} 
        onPointerMove={handlers.handlePointerMove} 
        onPointerUp={handlers.handlePointerUp} 
        onPointerLeave={handlers.handlePointerUp} 
        style={{ touchAction: 'none' }} 
      />
      
      <StatusOverlay />
    </div>
  );
};

export default StrokeViewer;