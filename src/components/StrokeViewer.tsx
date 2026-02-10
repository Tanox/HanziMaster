/**
 * HanziMaster v0.3.2
 */
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { HanziData, AnimationState, InteractionMode, AppSettings } from '../types';
import { PenTool } from 'lucide-react';
import { UILabels } from '../locales/types';
import { getDistance, getMedianPath, getPathLength } from '../utils/geometry';

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
    
    const strokeDuration = 800 / speed; 
    // Fix: Provide fallback for startTimeRef.current to satisfy TypeScript arithmetic requirement
    const elapsed = time - (startTimeRef.current ?? time);
    const currentProgress = Math.min(elapsed / strokeDuration, 1);
    
    setProgress(currentProgress);

    if (currentProgress < 1) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      // Stroke finished
      if (currentStrokeIndex < data.strokes.length - 1) {
        setCurrentStrokeIndex(prev => prev + 1);
        startTimeRef.current = undefined;
        setProgress(0);
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setAnimationState(AnimationState.COMPLETED);
        setCurrentStrokeIndex(data.strokes.length);
      }
    }
  };

  useEffect(() => {
    if (mode === InteractionMode.PRACTICE) {
        if (requestRef.current !== undefined) cancelAnimationFrame(requestRef.current);
        return;
    }

    if (animationState === AnimationState.PLAYING) {
        if (currentStrokeIndex === -1 || currentStrokeIndex === data.strokes.length) {
            setCurrentStrokeIndex(0);
            setProgress(0);
            startTimeRef.current = undefined;
        }
        requestRef.current = requestAnimationFrame(animate);
    } else if (animationState === AnimationState.IDLE) {
        setCurrentStrokeIndex(-1);
        setProgress(0);
        if (requestRef.current !== undefined) cancelAnimationFrame(requestRef.current);
    } else if (animationState === AnimationState.PAUSED) {
        if (requestRef.current !== undefined) cancelAnimationFrame(requestRef.current);
        startTimeRef.current = undefined;
    }

    return () => {
        if (requestRef.current !== undefined) cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationState, currentStrokeIndex, data, speed, mode]);


  // --- Practice Logic (Practice Mode) ---

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Draw only the new segment (more efficient for touch)
  const drawSegment = (p1: {x: number, y: number}, p2: {x: number, y: number}, color: string = '#cf352e') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  };

  const drawFullStroke = (points: Array<{x: number, y: number}>, color: string = '#cf352e') => {
    const canvas = canvasRef.current;
    if (!canvas || points.length < 2) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
  };

  // Convert screen coordinates to SVG space (0-1024)
  const getSvgCoordinates = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = SIZE / rect.width;
    const scaleY = SIZE / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  // Convert Hanzi Data Point (Y-up, origin bottom-left-ish) to SVG Space (Y-down, origin top-left)
  // Based on the transform: scale(1, -1) translate(0, -921.6)
  // SVG_Y = -1 * (Data_Y - 921.6) = 921.6 - Data_Y
  const dataToSvgPoint = (p: number[]) => {
    return { x: p[0], y: OFFSET_Y - p[1] };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (mode !== InteractionMode.PRACTICE || practiceStrokeIndex >= data.strokes.length) return;
    
    // Crucial for mobile: prevent scrolling while drawing
    e.preventDefault(); 
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    
    setIsDrawing(true);
    userStrokePathRef.current = [];
    clearCanvas();
    
    const point = getSvgCoordinates(e);
    userStrokePathRef.current.push(point);
    lastDrawnPointRef.current = point;
    
    // Draw initial dot
    drawSegment(point, point);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing || mode !== InteractionMode.PRACTICE) return;
    e.preventDefault(); // Safety against scroll
    
    const point = getSvgCoordinates(e);
    userStrokePathRef.current.push(point);
    
    if (lastDrawnPointRef.current) {
        drawSegment(lastDrawnPointRef.current, point);
    }
    lastDrawnPointRef.current = point;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDrawing || mode !== InteractionMode.PRACTICE) return;
    setIsDrawing(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    lastDrawnPointRef.current = null;

    validateStroke();
  };

  const validateStroke = () => {
    if (practiceStrokeIndex >= data.strokes.length) return;

    const userPath = userStrokePathRef.current;
    if (userPath.length < 5) return; // Tap is not a stroke

    const targetMedian = data.medians[practiceStrokeIndex].map(dataToSvgPoint);
    
    const startDist = getDistance(userPath[0], targetMedian[0]);
    const endDist = getDistance(userPath[userPath.length - 1], targetMedian[targetMedian.length - 1]);
    
    // Threshold (1024 scale)
    const THRESHOLD = 350; 

    if (startDist < THRESHOLD && endDist < THRESHOLD) {
      // Success
      const nextIndex = practiceStrokeIndex + 1;
      setPracticeStrokeIndex(nextIndex);
      clearCanvas();
      if (navigator.vibrate) navigator.vibrate(20);

      // Check for completion
      if (nextIndex >= data.strokes.length) {
         // Notify parent after a short delay to allow React state to settle/UI to update
         // Using a timeout also lets the final visual update happen before potential page jump
         setTimeout(() => {
             if (onPracticeComplete && !hasNotifiedCompletionRef.current) {
                 hasNotifiedCompletionRef.current = true;
                 onPracticeComplete();
             }
         }, 500);
      }
    } else {
      // Fail - redraw full stroke in error color
      setFeedbackColor('error');
      clearCanvas();
      drawFullStroke(userPath, '#ef4444'); // Red
      setTimeout(() => {
        setFeedbackColor(null);
        clearCanvas();
      }, 500);
    }
  };

  // Determine visibility of the background "hint" strokes in Practice Mode
  const shouldShowBackground = mode === InteractionMode.VIEW || settings.showOutline;

  return (
    // Responsive aspect ratio container
    <div className="relative w-full max-w-[90vw] md:max-w-[400px] aspect-square mx-auto my-6">
      
      {/* Outer Frame (Shadow & Texture) */}
      <div className={`relative w-full h-full bg-texture-paper rounded-lg transition-all duration-300 select-none overflow-hidden ${
        feedbackColor === 'error' 
          ? 'ring-4 ring-red-200 dark:ring-red-900/50 border-red-400' 
          : mode === InteractionMode.PRACTICE 
            ? 'ring-4 ring-vermilion-100 dark:ring-vermilion-900/30 border-vermilion-200 dark:border-vermilion-800'
            : 'border-slate-200 dark:border-slate-700'
      } border`}>
        
        {/* Practice Mode Seal/Indicator */}
        {mode === InteractionMode.PRACTICE && (
            <div className="absolute top-4 right-4 z-20 pointer-events-none animate-fade-in">
                 <div className="bg-vermilion-500 text-white p-2 rounded-lg border-2 border-vermilion-600 transform rotate-6 opacity-90">
                    <PenTool size={18} />
                 </div>
            </div>
        )}

        {/* Grid Background - Styled to look like traditional guides */}
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-30">
          
          {/* Diagonals - Rice only */}
          {settings.gridStyle === 'rice' && (
            <>
              <line x1="0" y1="0" x2={SIZE} y2={SIZE} className="stroke-vermilion-600 dark:stroke-slate-400" strokeWidth="2" strokeDasharray="10,10" />
              <line x1={SIZE} y1="0" x2="0" y2={SIZE} className="stroke-vermilion-600 dark:stroke-slate-400" strokeWidth="2" strokeDasharray="10,10" />
            </>
          )}

          {/* Cross lines - Rice and Field */}
          {(settings.gridStyle === 'rice' || settings.gridStyle === 'field') && (
            <>
              <line x1={SIZE/2} y1="0" x2={SIZE/2} y2={SIZE} className="stroke-vermilion-600 dark:stroke-slate-400" strokeWidth="2" strokeDasharray="10,10" />
              <line x1="0" y1={SIZE/2} x2={SIZE} y2={SIZE/2} className="stroke-vermilion-600 dark:stroke-slate-400" strokeWidth="2" strokeDasharray="10,10" />
            </>
          )}
        </svg>

        {/* Character Rendering */}
        <svg 
          viewBox={`0 0 ${SIZE} ${SIZE}`} 
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <defs>
            {/* View Mode Masks */}
            {mode === InteractionMode.VIEW && data.medians.map((medianPoints, index) => {
              const len = strokeLengths[index] || 1000;
              const dashArray = index === currentStrokeIndex 
                  ? `${progress * len} ${len}` 
                  : (index < currentStrokeIndex ? `${len} 0` : `0 ${len}`);
              
              return (
                <mask id={`mask-${index}`} key={`mask-${index}`} maskUnits="userSpaceOnUse">
                   <path 
                     d={getMedianPath(medianPoints)} 
                     fill="none" 
                     stroke="white" 
                     strokeWidth="150" 
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeDasharray={dashArray}
                   />
                </mask>
              );
            })}
          </defs>

          <g transform={`scale(1, -1) translate(0, -${OFFSET_Y})`}> 
             {/* Background Shadows (Template) */}
             {data.strokes.map((strokePath, index) => (
               <path 
                 key={`bg-${index}`} 
                 d={strokePath}
                 className={`transition-all duration-300 ${
                    mode === InteractionMode.PRACTICE 
                        ? (index < practiceStrokeIndex ? 'fill-slate-800 dark:fill-slate-100' : 'fill-slate-200 dark:fill-slate-600') 
                        : 'fill-slate-200 dark:fill-slate-600'
                 }`}
                 style={{
                   opacity: (mode === InteractionMode.PRACTICE && !shouldShowBackground && index >= practiceStrokeIndex) ? 0 : 1
                 }}
               />
             ))}

             {/* Animated/Revealed Strokes (View Mode) */}
             {mode === InteractionMode.VIEW && data.strokes.map((strokePath, index) => (
               <path 
                 key={`fg-${index}`} 
                 d={strokePath} 
                 className="fill-slate-900 dark:fill-slate-100 transition-colors duration-300"
                 mask={`url(#mask-${index})`}
                 style={{
                   opacity: index <= currentStrokeIndex ? 1 : 0
                 }}
               />
             ))}
             
             {/* Practice Mode: Hint Pulse */}
             {mode === InteractionMode.PRACTICE && settings.showOutline && practiceStrokeIndex < data.strokes.length && (
                <path 
                  d={data.strokes[practiceStrokeIndex]}
                  className="fill-transparent stroke-vermilion-400 stroke-[20px]"
                  style={{ animation: 'pulse 2s infinite' }}
                />
             )}
          </g>
        </svg>

        {/* Interaction Canvas */}
        {mode === InteractionMode.PRACTICE && (
            <canvas
                ref={canvasRef}
                width={SIZE}
                height={SIZE}
                className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            />
        )}
        
        {/* Success Overlay (Seal Stamp Effect) */}
        {mode === InteractionMode.PRACTICE && showSuccess && (
            <div className="absolute inset-0 flex items-center justify-center bg-vermilion-500/10 backdrop-blur-[1px] animate-fade-in z-30">
                <div className="bg-vermilion-600 text-white w-24 h-24 rounded-lg flex items-center justify-center border-4 border-vermilion-800 transform rotate-12 scale-110 animate-bounce">
                    <span className="text-5xl font-hanzi font-bold">优</span>
                </div>
            </div>
        )}
      </div>
      
      {/* Status Text below viewer */}
      <div className="text-center mt-4 h-6">
        {mode === InteractionMode.PRACTICE && (
          <div className="inline-block px-3 py-1 rounded-full bg-vermilion-50 dark:bg-vermilion-900/20 text-vermilion-700 dark:text-vermilion-300 text-xs font-medium tracking-wide transition-opacity duration-300" 
               style={{ opacity: showSuccess || practiceStrokeIndex < data.strokes.length ? 1 : 0 }}>
              {practiceStrokeIndex >= data.strokes.length 
                  ? labels.practiceComplete 
                  : `Stroke ${practiceStrokeIndex + 1} / ${data.strokes.length}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default StrokeViewer;