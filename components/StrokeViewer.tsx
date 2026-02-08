import React, { useEffect, useRef, useState } from 'react';
import { HanziData, AnimationState } from '../types';

interface StrokeViewerProps {
  data: HanziData;
  animationState: AnimationState;
  setAnimationState: (state: AnimationState) => void;
  speed: number;
}

const StrokeViewer: React.FC<StrokeViewerProps> = ({
  data,
  animationState,
  setAnimationState,
  speed,
}) => {
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(-1);
  const [progress, setProgress] = useState(0); // 0 to 1 for current stroke
  const requestRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  
  // Helper to convert median points to SVG Path command
  // Input: [[x1, y1], [x2, y2], ...]
  // Output: "M x1 y1 L x2 y2 ..."
  const getMedianPath = (points: number[][]): string => {
    if (!points || points.length === 0) return '';
    return points.reduce((acc, point, index) => {
      const command = index === 0 ? 'M' : 'L';
      return `${acc} ${command} ${point[0]} ${point[1]}`;
    }, '');
  };

  // Reset when data changes
  useEffect(() => {
    setCurrentStrokeIndex(-1);
    setProgress(0);
    setAnimationState(AnimationState.IDLE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const animate = (time: number) => {
    if (startTimeRef.current === undefined) startTimeRef.current = time;
    
    // Duration per stroke (adjusted by speed)
    // Base duration ~800ms per stroke is usually good
    const strokeDuration = 800 / speed; 
    
    const elapsed = time - startTimeRef.current;
    const currentProgress = Math.min(elapsed / strokeDuration, 1);
    
    setProgress(currentProgress);

    if (currentProgress < 1) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      // Stroke finished
      if (currentStrokeIndex < data.strokes.length - 1) {
        // Move to next stroke
        setCurrentStrokeIndex(prev => prev + 1);
        startTimeRef.current = undefined; // Reset start time for next stroke
        setProgress(0);
        requestRef.current = requestAnimationFrame(animate);
      } else {
        // All finished
        setAnimationState(AnimationState.COMPLETED);
        setCurrentStrokeIndex(data.strokes.length); // Ensure all are shown
      }
    }
  };

  useEffect(() => {
    if (animationState === AnimationState.PLAYING) {
        // If we were idle or completed, start from 0
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
        startTimeRef.current = undefined; // This effectively stops the progress increment
    }

    return () => {
        if (requestRef.current !== undefined) cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationState, currentStrokeIndex, data, speed]);


  // Constants for SVG viewbox
  const size = 1024; // Standard HanziWriter size
  
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors duration-300">
      {/* Grid Background */}
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <line x1="0" y1="0" x2={size} y2={size} className="stroke-slate-300 dark:stroke-slate-500" strokeWidth="2" />
        <line x1={size} y1="0" x2="0" y2={size} className="stroke-slate-300 dark:stroke-slate-500" strokeWidth="2" />
        <line x1={size/2} y1="0" x2={size/2} y2={size} className="stroke-slate-300 dark:stroke-slate-500" strokeWidth="2" />
        <line x1="0" y1={size/2} x2={size} y2={size/2} className="stroke-slate-300 dark:stroke-slate-500" strokeWidth="2" />
        <rect x="0" y="0" width={size} height={size} className="stroke-slate-400 dark:stroke-slate-400" strokeWidth="4" fill="none" />
      </svg>

      {/* Character Rendering */}
      <svg 
        viewBox={`0 0 ${size} ${size}`} 
        className="absolute inset-0 w-full h-full transform scale-y-[-1]" // Hanzi Writer data is flipped vertically
      >
        <defs>
          {data.medians.map((medianPoints, index) => (
            <clipPath id={`clip-${index}`} key={`clip-${index}`}>
               {/* This path is the "revealer". It follows the median. 
                   We use stroke-dasharray to animate the length.
                   The stroke-width must be wide enough to cover the actual stroke outline. 
               */}
               <path 
                 d={getMedianPath(medianPoints)} 
                 fill="none" 
                 stroke="#000" 
                 strokeWidth="150" 
                 strokeLinecap="round"
                 pathLength={1} // Normalize length to 1 for easier math
                 strokeDasharray={`${index === currentStrokeIndex ? progress : (index < currentStrokeIndex ? 1 : 0)} 1`}
               />
            </clipPath>
          ))}
        </defs>

        <g transform={`scale(1, -1) translate(0, -${size*0.9})`}> 
           {/* 
              Hanzi data coordinate system is a bit quirky. 
              Usually 1024x1024, but stored upside down relative to standard SVG. 
              The scale-y-[-1] on the parent SVG handles flip, but sometimes we need translation.
           */}
           {/* Background Shadows (The full character in light grey) */}
           {data.strokes.map((strokePath, index) => (
             <path 
               key={`bg-${index}`} 
               d={strokePath}
               className="fill-slate-200 dark:fill-slate-700 transition-colors duration-300"
             />
           ))}

           {/* Foreground Strokes (The animated parts) */}
           {data.strokes.map((strokePath, index) => (
             <path 
               key={`fg-${index}`} 
               d={strokePath} 
               className="fill-slate-900 dark:fill-slate-100 transition-colors duration-300"
               clipPath={`url(#clip-${index})`}
               style={{
                 transition: 'opacity 0.2s',
                 opacity: index <= currentStrokeIndex ? 1 : 0
               }}
             />
           ))}
        </g>
      </svg>
    </div>
  );
};

export default StrokeViewer;