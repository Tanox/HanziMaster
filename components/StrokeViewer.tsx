
/**
 * HanziMaster v0.3.1
 */
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { HanziData, AnimationState, InteractionMode, AppSettings } from '../types';
import { PenTool } from 'lucide-react';
import { UILabels } from '../locales/types';
import { getDistance, getPathLength } from '../utils/geometry';

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
  // Use a flag ref to prevent multiple calls to onPracticeComplete for the same completion
  const hasNotifiedCompletionRef = useRef(false);

  // Success Feedback State (Auto-hide)
  const [showSuccess, setShowSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const userStrokePathRef = useRef<Array<{x: number, y: number}>>([]);
  // Track last drawn point for efficient segment drawing
  const lastDrawnPointRef = useRef<{x: number, y: number} | null>(null);
  
  // Constants for SVG viewbox
  const SIZE = 1024; 
  const OFFSET_Y = SIZE * 0.9; // Based on the translate(0, -921.6) logic roughly

  const strokeLengths = useMemo(() => {
    if (!data || !data.medians) return [];
    return data.medians.map(getPathLength);
  }, [data]);

  // --- Animation Logic (View Mode) ---
  
  // Reset when data changes or mode changes
  useEffect(() => {
    setCurrentStrokeIndex(-1);
    setProgress(0);
    setPracticeStrokeIndex(0);
    setFeedbackColor(null);
    setShowSuccess(false);
    hasNotifiedCompletionRef.current = false;
    
    if (mode === InteractionMode.VIEW) {
      setAnimationState(AnimationState.IDLE);
    }
    clearCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, mode]);

  // Handle Success State Auto-hide
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (mode === InteractionMode.PRACTICE && data && practiceStrokeIndex >= data.strokes.length && data.strokes.length > 0) {
        setShowSuccess(true);
        timer = setTimeout(() => {
            setShowSuccess(false);
        }, 2000);
    } else {
        setShowSuccess(false);
    }
    return () => clearTimeout(timer);
  }, [practiceStrokeIndex, mode, data]);

  // Auto-reset strokes 5 seconds after completion
  useEffect(() => {
    let resetTimer: ReturnType<typeof setTimeout>;
    if (mode === InteractionMode.PRACTICE && data && practiceStrokeIndex >= data.strokes.length && data.strokes.length > 0) {
      resetTimer = setTimeout(() => {
        setPracticeStrokeIndex(0);
        hasNotifiedCompletionRef.current = false; // Allow completion event to fire again
        clearCanvas();
      }, 5000);
    }
    return () => clearTimeout(resetTimer);
  }, [practiceStrokeIndex, mode, data]);

  const animate = (time: number) => {
    if (startTimeRef.current === undefined) startTimeRef.current = time;
    const elapsed = time - startTimeRef.current;
    
    // Total duration for one stroke
    const totalStrokeDuration = (strokeLengths[currentStrokeIndex] / 1500) * (1 / speed) * 1000;
    
    // Calculate current progress
    const currentProgress = Math.min(elapsed / totalStrokeDuration, 1);
    setProgress(currentProgress);
    
    if (currentProgress < 1) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      // Move to next stroke or finish
      startTimeRef.current = undefined;
      const nextStroke = currentStrokeIndex + 1;
      if (nextStroke < data.strokes.length) {
        setCurrentStrokeIndex(nextStroke);
        setProgress(0);
        requestRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete
        setAnimationState(AnimationState.IDLE);
      }
    }
  };

  useEffect(() => {
    if (animationState === AnimationState.PLAYING && mode === InteractionMode.VIEW) {
      // If idle, start from beginning
      if (currentStrokeIndex === -1 || currentStrokeIndex >= data.strokes.length - 1) {
        setCurrentStrokeIndex(0);
        setProgress(0);
      }
      startTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current!);
      startTimeRef.current = undefined;
    }
    return () => cancelAnimationFrame(requestRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationState, mode, data]);


  // --- Drawing Logic (Practice Mode) ---

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    userStrokePathRef.current = [];
    lastDrawnPointRef.current = null;
  };

  const drawUserStroke = (ctx: CanvasRenderingContext2D, toPoint: {x: number, y: number}) => {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 100;
    ctx.strokeStyle = feedbackColor === 'success' ? '#10b981' : (feedbackColor === 'error' ? '#ef4444' : '#0f172a');
    
    // For dark mode, use a lighter color for drawing
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark && !feedbackColor) {
        ctx.strokeStyle = '#f1f5f9';
    }

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

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    // Validate stroke
    const userStroke = userStrokePathRef.current;
    const targetStroke = data.medians[practiceStrokeIndex];

    if (userStroke.length < 2 || !targetStroke || targetStroke.length < 2) {
      setFeedbackColor('error');
      setTimeout(clearCanvas, 500);
      return;
    }

    const startPointUser = userStroke[0];
    const endPointUser = userStroke[userStroke.length - 1];

    const startPointTarget = { x: targetStroke[0][0], y: targetStroke[0][1] };
    const endPointTarget = { x: targetStroke[targetStroke.length - 1][0], y: targetStroke[targetStroke.length - 1][1] };

    const startDist = getDistance(startPointUser, startPointTarget);
    const endDist = getDistance(endPointUser, endPointTarget);

    // Heuristic: start/end points must be reasonably close, within 30% of stroke length
    const strokeLen = getPathLength(targetStroke);
    const threshold = Math.max(150, strokeLen * 0.4);

    if (startDist < threshold && endDist < threshold) {
        setFeedbackColor('success');
        setTimeout(() => {
            const nextStroke = practiceStrokeIndex + 1;
            setPracticeStrokeIndex(nextStroke);
            clearCanvas();
        }, 300);
    } else {
        setFeedbackColor('error');
        setTimeout(clearCanvas, 500);
    }
  };
  
  // Call onPracticeComplete when finished, but only once
  useEffect(() => {
    if (practiceStrokeIndex >= data.strokes.length && data.strokes.length > 0 && !hasNotifiedCompletionRef.current) {
        if (onPracticeComplete) {
            onPracticeComplete();
        }
        hasNotifiedCompletionRef.current = true;
    }
  }, [practiceStrokeIndex, data.strokes.length, onPracticeComplete]);


  // Determine grid line paths
  const gridLines = useMemo(() => {
    if (settings.gridStyle === 'none') return [];
    
    const lines = [
      // Bounding box
      { d: `M 0,0 L ${SIZE},0 L ${SIZE},${SIZE} L 0,${SIZE} Z`, stroke: '#e2e8f0', dark: '#334155' },
      // Cross
      { d: `M ${SIZE/2},0 L ${SIZE/2},${SIZE}`, stroke: '#e2e8f0', dark: '#334155' },
      { d: `M 0,${SIZE/2} L ${SIZE},${SIZE/2}`, stroke: '#e2e8f0', dark: '#334155' },
    ];
    if (settings.gridStyle === 'rice') {
      // Diagonals
      lines.push({ d: `M 0,0 L ${SIZE},${SIZE}`, stroke: '#e2e8f0', dark: '#334155' });
      lines.push({ d: `M ${SIZE},0 L 0,${SIZE}`, stroke: '#e2e8f0', dark: '#334155' });
    }
    return lines;
  }, [settings.gridStyle]);

  const StatusOverlay = () => {
    let text: string | null = null;

    if (mode === InteractionMode.PRACTICE) {
        if (showSuccess) {
            text = labels.practiceComplete;
        } else if (settings.continuousMode && practiceStrokeIndex < data.strokes.length) {
            text = labels.settingContinuousMode;
        }
    } else if (mode === InteractionMode.VIEW) {
        if (animationState === AnimationState.PLAYING || animationState === AnimationState.PAUSED) {
            text = labels.strokeStatusActive;
        } else if (currentStrokeIndex >= data.strokes.length - 1 && data.strokes.length > 0) {
            text = labels.strokeStatusComplete;
        }
    }

    const isVisible = text !== null;

    return (
        <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold backdrop-blur-sm shadow-md ${mode === InteractionMode.PRACTICE && showSuccess ? 'bg-emerald-600/90 text-white' : 'bg-black/40 text-white'}`}>
                {text}
            </div>
        </div>
    );
  };

  return (
    <div className="w-full max-w-xs relative bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-100 dark:border-slate-700 aspect-square shadow-inner bg-texture-paper select-none touch-none">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full h-full"
      >
        <g transform={`translate(0, ${OFFSET_Y}) scale(1, -1)`}>
          {/* Grid Lines */}
          <g strokeWidth="2" className="stroke-slate-200 dark:stroke-slate-700">
             {gridLines.map((line, i) => (
                <path key={i} d={line.d} />
             ))}
          </g>

          {/* Character Outline/Guide */}
          {(settings.showOutline || mode === InteractionMode.PRACTICE) && (
            <path
              d={data.strokes.join(' ')}
              className={`
                fill-none stroke-vermilion-100 dark:stroke-vermilion-900 
                ${mode === InteractionMode.PRACTICE ? 'opacity-60' : 'opacity-100'}
              `}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Animated Strokes (View Mode) */}
          {mode === InteractionMode.VIEW && data.strokes.map((stroke, i) => (
            <path
              key={i}
              d={stroke}
              className={`fill-none stroke-vermilion-500`}
              strokeWidth="100"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: i <= currentStrokeIndex ? 1 : 0,
                strokeDasharray: strokeLengths[i],
                strokeDashoffset: i === currentStrokeIndex ? strokeLengths[i] * (1 - progress) : 0,
              }}
            />
          ))}

          {/* Completed Strokes (Practice Mode) */}
          {mode === InteractionMode.PRACTICE && data.strokes.map((stroke, i) => (
            <path
              key={i}
              d={stroke}
              className={`fill-none stroke-vermilion-500`}
              strokeWidth="100"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: i < practiceStrokeIndex ? 1 : 0 }}
            />
          ))}
        </g>
      </svg>
      
      {/* Practice Canvas Overlay */}
      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        className="absolute inset-0 w-full h-full"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />

      {/* Practice Mode Guide */}
      {mode === InteractionMode.PRACTICE && practiceStrokeIndex < data.strokes.length && (
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center animate-fade-in">
               <PenTool size={24} className="mx-auto text-teal-500 mb-2" />
               <p className="font-bold text-slate-700 dark:text-slate-200">
                  Stroke {practiceStrokeIndex + 1} / {data.strokes.length}
               </p>
               <p className="text-xs text-slate-500 dark:text-slate-400">
                  Please write the next stroke.
               </p>
            </div>
         </div>
      )}

      <StatusOverlay />
    </div>
  );
};

export default StrokeViewer;
