/**
 * app/hooks/usePracticeDrawing.ts v0.7.1
 */
import { useState, useRef, useEffect, RefObject, PointerEvent } from 'react';
import { HanziData, InteractionMode, Point } from '../types';
import { getDistance, subtract, cosineSimilarity, resample, calculateShapeScore } from '../utils/geometry';

const CANVAS_SIZE = 1024;
const OFFSET_Y = 900; 

// Spec 13 Thresholds
const TOLERANCE_START_POINT = 120; // px (Relaxed slightly for touch)
const TOLERANCE_SHAPE_ERROR = 150; // px (Average deviation)
const TOLERANCE_DIRECTION = 0; // Cosine similarity > 0 (Positive correlation)
const MAX_MISTAKES_FOR_GHOST = 3;

export const usePracticeDrawing = (
  canvasRef: RefObject<HTMLCanvasElement>,
  data: HanziData | null,
  mode: InteractionMode,
  onPracticeComplete?: () => void
) => {
  const [practiceStrokeIndex, setPracticeStrokeIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [feedbackColor, setFeedbackColor] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Ghosting Lifeline State
  const [mistakeCount, setMistakeCount] = useState(0);
  const [showGhostHint, setShowGhostHint] = useState(false);
  
  const userStrokePathRef = useRef<Point[]>([]);
  const lastDrawnPointRef = useRef<Point | null>(null);
  const hasNotifiedCompletionRef = useRef(false);

  useEffect(() => {
    setPracticeStrokeIndex(0);
    setFeedbackColor(null);
    setShowSuccess(false);
    setMistakeCount(0);
    setShowGhostHint(false);
    hasNotifiedCompletionRef.current = false;
    clearCanvas();
  }, [data]);

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
        // Reset ghost hint for next stroke
        setMistakeCount(0);
        setShowGhostHint(false);
    }
  }, [practiceStrokeIndex, data, onPracticeComplete]);

  // Trigger Ghost Hint based on mistakes
  useEffect(() => {
    if (mistakeCount >= MAX_MISTAKES_FOR_GHOST) {
        setShowGhostHint(true);
    }
  }, [mistakeCount]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    userStrokePathRef.current = [];
    lastDrawnPointRef.current = null;
  };

  const drawUserStroke = (ctx: CanvasRenderingContext2D, toPoint: Point) => {
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

  const transformDataToScreen = (point: number[]): Point => ({ x: point[0], y: OFFSET_Y - point[1] });

  const handlePointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    if (mode !== InteractionMode.PRACTICE || !data || practiceStrokeIndex >= data.strokes.length) return;
    
    const targetStrokeData = data.medians[practiceStrokeIndex];
    if (!targetStrokeData) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CANVAS_SIZE;
    const y = ((e.clientY - rect.top) / rect.height) * CANVAS_SIZE;
    const startPointUser: Point = {x, y};

    // 1. Start Point Validation
    const startPointTarget = transformDataToScreen(targetStrokeData[0]);
    const startDist = getDistance(startPointUser, startPointTarget);

    if (startDist > TOLERANCE_START_POINT) {
        // Invalid start point
        if (navigator.vibrate) navigator.vibrate(50);
        setFeedbackColor('error');
        // Increment mistake count immediately
        setMistakeCount(prev => prev + 1);
        
        // Visual feedback at touch point
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx) {
             ctx.beginPath();
             ctx.arc(x, y, 20, 0, Math.PI * 2);
             ctx.fillStyle = 'rgba(239, 68, 68, 0.5)';
             ctx.fill();
        }
        
        setTimeout(() => {
            setFeedbackColor(null);
            clearCanvas();
        }, 500);
        return;
    }

    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    setFeedbackColor(null);
    clearCanvas();

    userStrokePathRef.current = [startPointUser];
    lastDrawnPointRef.current = startPointUser;
  };

  const handlePointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
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

    if (userStroke.length < 2 || !targetStrokeData) {
      setFeedbackColor('error');
      setMistakeCount(prev => prev + 1);
      setTimeout(clearCanvas, 500);
      return;
    }

    // Prepare data for Spec 13 Validation
    const startPointUser = userStroke[0];
    const endPointUser = userStroke[userStroke.length - 1];
    const startPointTarget = transformDataToScreen(targetStrokeData[0]);
    const endPointTarget = transformDataToScreen(targetStrokeData[targetStrokeData.length - 1]);
    
    // 2. Direction Validation (Cosine Similarity)
    const vecUser = subtract(endPointUser, startPointUser);
    const vecTarget = subtract(endPointTarget, startPointTarget);
    const directionScore = cosineSimilarity(vecUser, vecTarget);
    
    if (directionScore < TOLERANCE_DIRECTION) {
        // Wrong direction
        failStroke();
        return;
    }

    // 3. Shape Validation (Resampled Average Distance)
    const SAMPLE_COUNT = 10;
    const targetPointsScreen = targetStrokeData.map(transformDataToScreen);
    const resampledUser = resample(userStroke, SAMPLE_COUNT);
    const resampledTarget = resample(targetPointsScreen, SAMPLE_COUNT);
    const shapeError = calculateShapeScore(resampledUser, resampledTarget);

    if (shapeError > TOLERANCE_SHAPE_ERROR) {
        // Shape too distorted
        failStroke();
        return;
    }

    // Success
    passStroke();
  };

  const failStroke = () => {
      setFeedbackColor('error');
      setMistakeCount(prev => prev + 1);
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
      setTimeout(clearCanvas, 500);
  };

  const passStroke = () => {
      setFeedbackColor('success');
      if (navigator.vibrate) navigator.vibrate(20);
      setTimeout(() => {
          setPracticeStrokeIndex(prev => prev + 1);
          clearCanvas();
      }, 300);
  };

  return {
    practiceStrokeIndex,
    isDrawing,
    feedbackColor,
    showSuccess,
    showGhostHint, // Exposed for StrokeViewer to use
    handlers: { handlePointerDown, handlePointerMove, handlePointerUp }
  };
};