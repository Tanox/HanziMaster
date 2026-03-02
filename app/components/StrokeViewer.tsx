
// app/components/StrokeViewer.tsx v1.3.4
import React, { useRef, useMemo } from 'react';
import { HanziData, AnimationState, InteractionMode, AppSettings, UILabels, Grade, PracticeResult, CharacterAnalysis } from '../types';
import { PenTool } from 'lucide-react';
import { getMedianPath } from '../utils/geometry';
import { useStrokeAnimation } from '../hooks/useStrokeAnimation';
import { usePracticeDrawing } from '../hooks/usePracticeDrawing';
import ResultSeal from './ui/ResultSeal';

interface StrokeViewerProps {
  data: HanziData;
  analysis?: CharacterAnalysis | null;
  animationState: AnimationState;
  setAnimationState: (state: AnimationState) => void;
  speed: number;
  mode: InteractionMode;
  settings: AppSettings;
  onPracticeComplete?: (result: PracticeResult) => void;
  labels: UILabels;
}

const StrokeViewer: React.FC<StrokeViewerProps> = ({
  data,
  analysis,
  animationState,
  setAnimationState,
  speed,
  mode,
  settings,
  onPracticeComplete,
  labels
}) => {
  const SIZE = 1024; 
  const OFFSET_Y = 900; 
  const idPrefix = React.useId();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { currentStrokeIndex, progress, strokeLengths } = useStrokeAnimation(
    data, mode, animationState, setAnimationState, speed
  );

  const { practiceStrokeIndex, showSuccess, showGhostHint, lastPracticeResult, handlers } = usePracticeDrawing(
    canvasRef, data, mode, settings, onPracticeComplete
  );

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
        // "Demo end" prompt removed as per user request
    }
    if (!text) return null;
    return (
        <div id="stroke-status-overlay" className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none animate-fade-in z-30">
            <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold backdrop-blur-sm shadow-sm flex items-center gap-2 ${mode === InteractionMode.PRACTICE && showSuccess ? 'bg-emerald-600/90 text-white' : 'bg-slate-900/10 dark:bg-white/10 text-slate-500 dark:text-slate-300'}`}>
                {mode === InteractionMode.PRACTICE && !showSuccess && <PenTool size={10} />}
                {text}
            </div>
        </div>
    );
  };

  return (
    <div id="stroke-viewer-container" className="w-full max-w-xs relative bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-700 aspect-square shadow-inner bg-texture-paper select-none touch-none overflow-hidden">
      <svg id="stroke-svg" viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full absolute inset-0 z-0">
        <defs>
          {data.strokes.map((stroke, i) => (
            <clipPath id={`${idPrefix}-clip-${i}`} key={i}>
              <path d={stroke} />
            </clipPath>
          ))}
        </defs>

        <g strokeWidth="1" fill="none" className="stroke-slate-300 dark:stroke-slate-600 opacity-80">
            {gridLines.map((line, i) => <path key={i} d={line.d} vectorEffect="non-scaling-stroke" />)}
        </g>

        <g transform={`translate(0, ${OFFSET_Y}) scale(1, -1)`}>
          {mode === InteractionMode.PRACTICE && data.strokes.map((stroke, i) => {
              if (i < practiceStrokeIndex) {
                  return <path key={i} d={stroke} className="fill-slate-900 dark:fill-slate-100 stroke-none" />;
              }
                  if (i === practiceStrokeIndex) {
                  const shouldShow = settings.showOutline || showGhostHint;
                  return shouldShow ? (
                      <path 
                        key={i} 
                        d={stroke} 
                        className={`fill-none stroke-vermilion-200 dark:stroke-white/30 ${showGhostHint ? 'opacity-80 animate-pulse' : 'opacity-60'}`} 
                        strokeWidth="4" 
                      />
                  ) : null;
              }
              if (i > practiceStrokeIndex && settings.showOutline) {
                  return <path key={i} d={stroke} className="fill-none stroke-vermilion-200 dark:stroke-white/10 opacity-30" strokeWidth="4" />;
              }
              return null;
          })}

          {mode === InteractionMode.VIEW && (
              <>
                {settings.showOutline && (
                    <path 
                        d={data.strokes.join(' ')} 
                        className="fill-none stroke-vermilion-200 dark:stroke-white/20 opacity-100" 
                        strokeWidth="4" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                    />
                )}
                {data.strokes.map((_, i) => {
                    if (i > currentStrokeIndex && currentStrokeIndex !== -1) return null;
                    const median = data.medians[i];
                    if (!median) return null;
                    return (
                    <path
                        key={i}
                        d={getMedianPath(median)}
                        clipPath={`url(#${idPrefix}-clip-${i})`}
                        className="fill-none stroke-slate-900 dark:stroke-slate-100"
                        strokeWidth="128"
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
              </>
          )}
        </g>
      </svg>
      
      <canvas 
        id="practice-canvas" 
        ref={canvasRef} 
        width={SIZE} 
        height={SIZE} 
        className="absolute inset-0 w-full h-full cursor-crosshair z-10" 
        onPointerDown={handlers.handlePointerDown} 
        onPointerMove={handlers.handlePointerMove} 
        onPointerUp={handlers.handlePointerUp} 
        onPointerLeave={handlers.handlePointerUp} 
        style={{ touchAction: 'none' }} 
      />
      
      {showSuccess && lastPracticeResult && (
        <ResultSeal 
          result={lastPracticeResult} 
          labels={labels} 
          analysis={analysis} 
        />
      )}
      <StatusOverlay />
    </div>
  );
};

export default StrokeViewer;
