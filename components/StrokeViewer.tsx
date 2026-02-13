
/**
 * HanziMaster v0.4.2
 */
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { HanziData, AnimationState, InteractionMode, AppSettings } from '../types';
import { PenTool } from 'lucide-react';
import { UILabels } from '../locales/types';
import { getDistance, getPathLength, getMedianPath } from '../utils/geometry';

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
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(-1);
  const [progress, setProgress] = useState(0); // 0 to 1 for current stroke
  const requestRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  
  // Practice Mode State
  const [practiceStrokeIndex, setPracticeStrokeIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [feedbackColor, setFeedbackColor] = useState<string | null>(null); // 'success' or 'error'
  const hasNotifiedCompletionRef = useRef(false);

  // Success Feedback State (Auto-hide)
  const [showSuccess, setShowSuccess] = useState(false);

  // Generate unique ID prefix for SVG masks
  const idPrefix = React.useId();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const userStrokePathRef = useRef<Array<{x: number, y: number}>>([]);
  const lastDrawnPointRef = useRef<{x: number, y: number} | null>(null);
  
  // Constants for SVG viewbox
  const SIZE = 1024; 
  const OFFSET_Y = 900; 

  const strokeLengths = useMemo(() => {
    if (!data || !data.medians) return [];
    return data.medians.map(getPathLength);
  }, [data]);

  // --- Animation Logic (View Mode) ---
  
  useEffect(() => {
    setCurrentStrokeIndex(-1);
    setProgress(0);
    setPracticeStrokeIndex(0);
    setFeedbackColor(null);
    setShowSuccess(false);
    hasNotifiedCompletionRef.current = false;
    startTimeRef.current = undefined;
    
    if (mode === InteractionMode.VIEW) {
      setAnimationState(AnimationState.IDLE);
    }
    clearCanvas();
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  }, [data, mode, setAnimationState]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (mode === InteractionMode.PRACTICE && data && practiceStrokeIndex >= data.strokes.length && data.strokes.length > 0) {
        setShowSuccess(true);
        timer = setTimeout(() => setShowSuccess(false), 2000);
    } else {
        setShowSuccess(false);
    }
    return () => clearTimeout(timer);
  }, [practiceStrokeIndex, mode, data]);

  useEffect(() => {
    if (animationState !== AnimationState.PLAYING || mode !== InteractionMode.VIEW) {
      startTimeRef.current = undefined;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    if (currentStrokeIndex === -1) {
        setCurrentStrokeIndex(0);
        return;
    }

    const animate = (time: number) => {
        if (startTimeRef.current === undefined) startTimeRef.current = time;
        const elapsed = time - startTimeRef.current;
        
        const length = strokeLengths[currentStrokeIndex] || 1000;
        const totalStrokeDuration = (length / 800) * (1 / speed) * 1000;
        
        const currentProgress = Math.min(elapsed / totalStrokeDuration, 1);
        setProgress(currentProgress);
        
        if (currentProgress < 1) {
          requestRef.current = requestAnimationFrame(animate);
        } else {
          startTimeRef.current = undefined;
          const nextStroke = currentStrokeIndex + 1;
          
          if (nextStroke < data.strokes.length) {
            setCurrentStrokeIndex(nextStroke);
            setProgress(0);
          } else {
            setAnimationState(AnimationState.IDLE);
            setCurrentStrokeIndex(data.strokes.length);
          }
        }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
       if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animationState, currentStrokeIndex, mode, data, speed, strokeLengths, setAnimationState]);

  // --- Drawing Logic (Practice Mode) ---

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    userStrokePathRef.current = [];
    lastDrawnPointRef.current = null;
  };

  const drawUserStroke = (ctx: CanvasRenderingContext2D, toPoint: {x: number, y: number}) => {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 60;
    
    const isDark = document.documentElement.classList.contains('dark');
    ctx.strokeStyle = feedbackColor === 'success' ? '#10b981' : (feedbackColor === 'error' ? '#ef4444' : (isDark ? '#f1f5f9' : '#0f172a'));

    if (lastDrawnPointRef.current) {
        ctx.beginPath();
        ctx.moveTo(lastDrawnPointRef.current.x, lastDrawnPointRef.current.y);
        ctx.lineTo(toPoint.x, toPoint.y);
        ctx.stroke();
    }
    lastDrawnPointRef.current = toPoint;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (mode !== InteractionMode.PRACTICE || practiceStrokeIndex >= data.strokes.length) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    setFeedbackColor(null);
    clearCanvas();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * SIZE;
    const y = ((e.clientY - rect.top) / rect.height) * SIZE;
    userStrokePathRef.current = [{x, y}];
    lastDrawnPointRef.current = {x, y};
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * SIZE;
    const y = ((e.clientY - rect.top) / rect.height) * SIZE;
    userStrokePathRef.current.push({x, y});
    drawUserStroke(ctx, {x, y});
  };

  const transformDataToScreen = (point: number[]) => {
     return { x: point[0], y: OFFSET_Y - point[1] };
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    const userStroke = userStrokePathRef.current;
    const targetStrokeData = data.medians[practiceStrokeIndex];

    if (userStroke.length < 2 || !targetStrokeData) {
      setFeedbackColor('error');
      setTimeout(clearCanvas, 500);
      return;
    }

    const startPointUser = userStroke[0];
    const endPointUser = userStroke[userStroke.length - 1];

    const startPointTarget = transformDataToScreen(targetStrokeData[0]);
    const endPointTarget = transformDataToScreen(targetStrokeData[targetStrokeData.length - 1]);

    const startDist = getDistance(startPointUser, startPointTarget);
    const endDist = getDistance(endPointUser, endPointTarget);

    const strokeLen = getPathLength(targetStrokeData);
    const threshold = Math.max(200, strokeLen * 0.5); 

    if (startDist < threshold && endDist < threshold) {
        setFeedbackColor('success');
        setTimeout(() => {
            setPracticeStrokeIndex(prev => prev + 1);
            clearCanvas();
        }, 300);
    } else {
        setFeedbackColor('error');
        setTimeout(clearCanvas, 500);
    }
  };
  
  useEffect(() => {
    if (practiceStrokeIndex >= data.strokes.length && data.strokes.length > 0 && !hasNotifiedCompletionRef.current) {
        onPracticeComplete?.();
        hasNotifiedCompletionRef.current = true;
    }
  }, [practiceStrokeIndex, data.strokes.length, onPracticeComplete]);

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
              // UPDATED: Used white/20 for dark mode outline to improve contrast and readability
              className={`fill-none stroke-vermilion-100 dark:stroke-white/20 ${mode === InteractionMode.PRACTICE ? 'opacity-60' : 'opacity-100'}`} 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          )}

          {/* Animated Strokes (View Mode) - Masked Median Animation */}
          {mode === InteractionMode.VIEW && data.strokes.map((_, i) => {
             // Only render if needed for animation state
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
              d={stroke} // Use outline
              className="fill-slate-900 dark:fill-slate-100 stroke-none" // Solid fill
              style={{ opacity: i < practiceStrokeIndex ? 1 : 0 }}
            />
          ))}
        </g>
      </svg>
      <canvas id="practice-canvas" ref={canvasRef} width={SIZE} height={SIZE} className="absolute inset-0 w-full h-full cursor-crosshair" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp} style={{ touchAction: 'none' }} />
      <StatusOverlay />
    </div>
  );
};

export default StrokeViewer;
