/**
 * app/hooks/useInteractionState.ts v0.7.1
 */
import { useState, useRef } from 'react';
import { AnimationState, InteractionMode } from '../types';

export const useInteractionState = () => {
  const [animationState, setAnimationState] = useState<AnimationState>(AnimationState.IDLE);
  const [interactionMode, setInteractionMode] = useState<InteractionMode>(InteractionMode.VIEW);
  const [speed, setSpeed] = useState<number>(1);
  
  const maintainModeRef = useRef<InteractionMode | null>(null);

  const resetInteraction = () => {
    setAnimationState(AnimationState.IDLE);
    setInteractionMode(InteractionMode.VIEW);
    maintainModeRef.current = null;
  };

  return {
    state: { animationState, interactionMode, speed, maintainModeRef },
    actions: { setAnimationState, setInteractionMode, setSpeed, resetInteraction }
  };
};