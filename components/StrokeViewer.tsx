import React, { useEffect, useRef, useState, useMemo } from 'react';
import { HanziData, AnimationState, InteractionMode, AppSettings } from '../types';
import { PenTool } from 'lucide-react';

interface StrokeViewerProps {
  data: HanziData;
  animationState: AnimationState;
  setAnimationState: (state: AnimationState) => void;
  speed: number;
  mode: InteractionMode;
  settings: AppSettings;
  onPracticeComplete?: () => void;
}

const StrokeViewer: React.FC<StrokeViewerProps> = ({
  data,
  animationState,
  setAnimationState,
  speed,
  mode,
  settings,
  onPracticeComplete
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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const userStrokePathRef = useRef<Array<{x: number, y: number}>>([]);
  
  // Constants for SVG viewbox
  const SIZE = 1024; 
  const OFFSET_Y = SIZE * 0.9; // Based on the translate(0, -921.6) logic roughly

  // Helper to convert median points to SVG Path command
  const getMedianPath = (points: number[][]): string => {
    if (!points || points.length === 0) return '';
    return points.reduce((acc, point, index) => {
      const command = index === 0 ? 'M' : 'L';
      return `${acc} ${command} ${point[0]} ${point[1]}`;
    }, '');
  };

  const getDistance = (p1: {x: number, y: number}, p2: {x: number, y: number}) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  // Helper to calculate path length
  const getPathLength = (points: number[][]) => {
    let total = 0;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const dist = Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
      total += dist;
    }
    return total;
  };

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
    hasNotifiedCompletionRef.current = false;
    
    if (mode === InteractionMode.VIEW) {
      setAnimationState(AnimationState.IDLE);
    }
    clearCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, mode]);

  const animate = (time: number) => {
    if (startTimeRef.current === undefined) startTimeRef.current = time;
    
    const strokeDuration = 800 / speed; 
    const elapsed = time - startTimeRef.current;
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

  const drawUserStroke = (points: Array<{x: number, y: number}>, color: string = '#0d9488') => {
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
    
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    
    setIsDrawing(true);
    userStrokePathRef.current = [];
    clearCanvas();
    
    const point = getSvgCoordinates(e);
    userStrokePathRef.current.push(point);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing || mode !== InteractionMode.PRACTICE) return;
    
    const point = getSvgCoordinates(e);
    userStrokePathRef.current.push(point);
    drawUserStroke(userStrokePathRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDrawing || mode !== InteractionMode.PRACTICE) return;
    setIsDrawing(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

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
      // Fail
      setFeedbackColor('error');
      drawUserStroke(userPath, '#ef4444'); // Red
      setTimeout(() => {
        setFeedbackColor(null);
        clearCanvas();
      }, 500);
    }
  };

  // Determine visibility of the background "hint" strokes in Practice Mode
  // If settings.showOutline is true, we show them as usual.
  // If false, we hide them, making it a "blind write" test.
  // In View Mode, they are always visible as the base.
  const shouldShowBackground = mode === InteractionMode.VIEW || settings.showOutline;

  return (
    // Changed max-width logic to be responsive: wider on mobile, constrained on desktop
    <div className="relative w-full max-w-[90vw] md:max-w-[400px] aspect-square mx-auto">
      <div className={`relative w-full h-full bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden transition-all duration-300 select-none ${
        feedbackColor === 'error' 
          ? 'border-2 border-red-400 dark:border-red-500 ring-2 ring-red-100 dark:ring-red-900/30' 
          : 'border border-slate-100 dark:border-slate-700'
      }`}>
        
        {/* Practice Mode Indicator */}
        {mode === InteractionMode.PRACTICE && (
            <div className="absolute top-3 right-3 z-20 pointer-events-none">
                 <div className="bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 p-1.5 rounded-full shadow-sm">
                    <PenTool size={16} />
                 </div>
            </div>
        )}

        {/* Grid Background - Dynamic based on settings */}
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          
          {/* Diagonals - Rice only */}
          {settings.gridStyle === 'rice' && (
            <>
              <line x1="0" y1="0" x2={SIZE} y2={SIZE} className="stroke-slate-300 dark:stroke-slate-500" strokeWidth="2" />
              <line x1={SIZE} y1="0" x2="0" y2={SIZE} className="stroke-slate-300 dark:stroke-slate-500" strokeWidth="2" />
            </>
          )}

          {/* Cross lines - Rice and Field */}
          {(settings.gridStyle === 'rice' || settings.gridStyle === 'field') && (
            <>
              <line x1={SIZE/2} y1="0" x2={SIZE/2} y2={SIZE} className="stroke-slate-300 dark:stroke-slate-500" strokeWidth="2" />
              <line x1="0" y1={SIZE/2} x2={SIZE} y2={SIZE/2} className="stroke-slate-300 dark:stroke-slate-500" strokeWidth="2" />
            </>
          )}

          {/* Border - Always visible unless style 'none' (optional, but keeping border usually looks better. Let's make 'none' remove internal lines but keep box frame for structure) */}
          <rect x="0" y="0" width={SIZE} height={SIZE} className="stroke-slate-400 dark:stroke-slate-400" strokeWidth="4" fill="none" />
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
                   {/* White path on black background reveals the stroke */}
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
             {/* Background Shadows (The template) */}
             {data.strokes.map((strokePath, index) => (
               <path 
                 key={`bg-${index}`} 
                 d={strokePath}
                 className={`transition-all duration-300 ${
                    mode === InteractionMode.PRACTICE 
                        ? (index < practiceStrokeIndex ? 'fill-slate-800 dark:fill-slate-200' : 'fill-slate-100 dark:fill-slate-700') 
                        : 'fill-slate-200 dark:fill-slate-700'
                 }`}
                 style={{
                   // In practice mode, if showOutline is false, hide the future strokes (the template).
                   // Already completed strokes (index < practiceStrokeIndex) should remain visible so user sees what they wrote (conceptually).
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
             
             {/* Practice Mode: Current Stroke Hint (Outline) */}
             {/* If blind mode (no outline), we probably shouldn't show this pulse either, or maybe just a very faint one? 
                 Let's adhere to the setting: showOutline=false implies harder difficulty. Hide the hint. */}
             {mode === InteractionMode.PRACTICE && settings.showOutline && practiceStrokeIndex < data.strokes.length && (
                <path 
                  d={data.strokes[practiceStrokeIndex]}
                  className="fill-transparent stroke-teal-500/30 stroke-[20px]"
                  style={{ animation: 'pulse 2s infinite' }}
                />
             )}
          </g>
        </svg>

        {/* Interaction Canvas (Practice Mode) */}
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
        
        {/* Success Overlay for Practice Complete */}
        {mode === InteractionMode.PRACTICE && practiceStrokeIndex >= data.strokes.length && (
            <div className="absolute inset-0 flex items-center justify-center bg-teal-500/10 backdrop-blur-[2px] animate-fade-in z-10">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-full shadow-lg border border-teal-100 dark:border-teal-900 transform scale-110">
                    <span className="text-4xl">🎉</span>
                </div>
            </div>
        )}
      </div>
      
      {mode === InteractionMode.PRACTICE && (
          <div className="text-center mt-2 text-sm text-slate-400">
              {practiceStrokeIndex >= data.strokes.length 
                  ? "Great job!" 
                  : `Draw stroke ${practiceStrokeIndex + 1}/${data.strokes.length}`}
          </div>
      )}
    </div>
  );
};

export default StrokeViewer;
