
/**
 * HanziMaster v0.4.9
 */
import { useState, useRef, useEffect } from 'react';
import { HanziData, InteractionMode } from '../types';
import { getDistance, getPathLength } from '../utils/geometry';

// Canvas coordinate system size
const CANVAS_SIZE = 1024;
const OFFSET_Y = 900; 

export const usePracticeDrawing = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  data: HanziData | null,
  mode: InteractionMode,
  onPracticeComplete?: () => void
) => {
  const [practiceStrokeIndex, setPracticeStrokeIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [feedbackColor, setFeedbackColor] = useState<string | null>(null); // 'success' or 'error'
  const [showSuccess, setShowSuccess] = useState(false);
  
  const userStrokePathRef = useRef<Array<{x: number, y: number}>>([]);
  const lastDrawnPointRef = useRef<{x: number, y: number} | null>(null);
  const hasNotifiedCompletionRef = useRef(false);

  // Reset when data changes
  useEffect(() => {
    setPracticeStrokeIndex(0);
    setFeedbackColor(null);
    setShowSuccess(false);
    hasNotifiedCompletionRef.current = false;
    clearCanvas();
  }, [data]);

  // Handle completion notification
  useEffect(() => {
    if (data && practiceStrokeIndex >= data.strokes.length && data.strokes.length > 0) {
        if (!hasNotifiedCompletionRef.current) {
            onPracticeComplete?.();
            hasNotifiedCompletionRef.current = true;
        }
        setShowSuccess(true);
        const timer = setTimeout(() => setShowSuccess(false), 2000);
        return () => clearTimeout(timer);
    } else {
        setShowSuccess(false);
    }
  }, [practiceStrokeIndex, data, onPracticeComplete]);

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
    ctx.strokeStyle = feedbackColor === 'success' 
        ? '#10b981' 
        : (feedbackColor === 'error' ? '#ef4444' : (isDark ? '#f1f5f9' : '#0f172a'));

    if (lastDrawnPointRef.current) {
        ctx.beginPath();
        ctx.moveTo(lastDrawnPointRef.current.x, lastDrawnPointRef.current.y);
        ctx.lineTo(toPoint.x, toPoint.y);
        ctx.stroke();
    }
    lastDrawnPointRef.current = toPoint;
  };

  const transformDataToScreen = (point: number[]) => {
     return { x: point[0], y: OFFSET_Y - point[1] };
  };

  // --- Pointer Handlers ---

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (mode !== InteractionMode.PRACTICE || !data || practiceStrokeIndex >= data.strokes.length) return;
    
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    setFeedbackColor(null);
    clearCanvas();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CANVAS_SIZE;
    const y = ((e.clientY - rect.top) / rect.height) * CANVAS_SIZE;
    
    userStrokePathRef.current = [{x, y}];
    lastDrawnPointRef.current = {x, y};
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CANVAS_SIZE;
    const y = ((e.clientY - rect.top) / rect.height) * CANVAS_SIZE;
    
    userStrokePathRef.current.push({x, y});
    drawUserStroke(ctx, {x, y});
  };

  const handlePointerUp = () => {
    if (!isDrawing || !data) return;
    setIsDrawing(false);
    
    const userStroke = userStrokePathRef.current;
    const targetStrokeData = data.medians[practiceStrokeIndex];

    // Minimal stroke validation
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
    // Dynamic threshold based on stroke length, but clamped
    const threshold = Math.max(200, strokeLen * 0.5); 

    if (startDist < threshold && endDist < threshold) {
        setFeedbackColor('success');
        // Vibrate for haptic feedback if available
        if (navigator.vibrate) navigator.vibrate(20);
        
        setTimeout(() => {
            setPracticeStrokeIndex(prev => prev + 1);
            clearCanvas();
        }, 300);
    } else {
        setFeedbackColor('error');
        if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
        setTimeout(clearCanvas, 500);
    }
  };

  return {
    practiceStrokeIndex,
    isDrawing,
    feedbackColor,
    showSuccess,
    handlers: {
        handlePointerDown,
        handlePointerMove,
        handlePointerUp
    }
  };
};
