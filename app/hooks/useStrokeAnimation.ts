// app/hooks/useStrokeAnimation.ts v1.0.1
import { useState, useRef, useEffect, useMemo } from 'react';
import { HanziData, AnimationState, InteractionMode } from '../types';
import { getPathLength } from '../utils/geometry';

export const useStrokeAnimation = (
  data: HanziData | null,
  mode: InteractionMode,
  animationState: AnimationState,
  setAnimationState: (state: AnimationState) => void,
  speed: number
) => {
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(-1);
  const [progress, setProgress] = useState(0); 
  
  const requestRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);

  const strokeLengths = useMemo(() => {
    if (!data || !data.medians) return [];
    return data.medians.map(getPathLength);
  }, [data]);

  useEffect(() => {
    setCurrentStrokeIndex(-1);
    setProgress(0);
    startTimeRef.current = undefined;
    if (mode === InteractionMode.VIEW) setAnimationState(AnimationState.IDLE);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  }, [data, mode, setAnimationState]);

  useEffect(() => {
    if (animationState !== AnimationState.PLAYING || mode !== InteractionMode.VIEW || !data) {
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
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [animationState, currentStrokeIndex, mode, data, speed, strokeLengths, setAnimationState]);

  return { currentStrokeIndex, progress, strokeLengths };
};
