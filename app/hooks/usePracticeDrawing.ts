
// app/hooks/usePracticeDrawing.ts v1.0.5
import { useState, useRef, useEffect, RefObject, PointerEvent } from 'react';
import { HanziData, InteractionMode, Point, PracticeResult, Grade, AppSettings } from '../types';
import { getDistance, subtract, cosineSimilarity, resample, calculateShapeScore, mapResultToScore } from '../utils/geometry';
import { soundService } from '../services/soundService';

const CANVAS_SIZE = 1024;
const OFFSET_Y = 900; 

const TOLERANCE_START_POINT = 120; 
const TOLERANCE_SHAPE_ERROR = 150; 
const TOLERANCE_DIRECTION = 0; 
const MAX_MISTAKES_FOR_GHOST = 3;

export const usePracticeDrawing = (
  canvasRef: RefObject<HTMLCanvasElement>,
  data: HanziData | null,
  mode: InteractionMode,
  settings: AppSettings,
  onPracticeComplete?: (result: PracticeResult) => void
) => {
  const [practiceStrokeIndex, setPracticeStrokeIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [feedbackColor, setFeedbackColor] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [mistakeCount, setMistakeCount] = useState(0);
  const [showGhostHint, setShowGhostHint] = useState(false);
  
  const [strokeScores, setStrokeScores] = useState<number[]>([]);
  const [lastPracticeResult, setLastPracticeResult] = useState<PracticeResult | null>(null);
  
  const userStrokePathRef = useRef<Point[]>([]);
  const lastDrawnPointRef = useRef<Point | null>(null);
  const hasNotifiedCompletionRef = useRef(false);

  useEffect(() => {
    setPracticeStrokeIndex(0);
    setFeedbackColor(null);
    setShowSuccess(false);
    setMistakeCount(0);
    setShowGhostHint(false);
    setStrokeScores([]);
    setLastPracticeResult(null);
    hasNotifiedCompletionRef.current = false;
    clearCanvas();
  }, [data]);

  useEffect(() => {
    if (data && practiceStrokeIndex >= data.strokes.length && data.strokes.length > 0) {
        if (!hasNotifiedCompletionRef.current) {
            const finalScore = Math.round(strokeScores.reduce((a, b) => a + b, 0) / strokeScores.length);
            let grade = Grade.POOR;
            if (finalScore >= 95) grade = Grade.EXQUISITE;
            else if (finalScore >= 85) grade = Grade.MASTERFUL;
            else if (finalScore >= 75) grade = Grade.PROFICIENT;

            const result = { score: finalScore, grade, strokeScores };
            setLastPracticeResult(result);
            if (settings.soundEffects) {
                soundService.playSound('complete');
            }
            onPracticeComplete?.(result);
            hasNotifiedCompletionRef.current = true;
        }
        setShowSuccess(true);
    } else {
        setShowSuccess(false);
    }
  }, [practiceStrokeIndex, data, strokeScores, onPracticeComplete, settings.soundEffects]);

  useEffect(() => {
    if (mistakeCount >= MAX_MISTAKES_FOR_GHOST) setShowGhostHint(true);
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
    const startPointTarget = transformDataToScreen(targetStrokeData[0]);
    const startDist = getDistance(startPointUser, startPointTarget);

    if (startDist > TOLERANCE_START_POINT) {
        failStroke();
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
      failStroke();
      return;
    }

    const startPointUser = userStroke[0];
    const endPointUser = userStroke[userStroke.length - 1];
    const startPointTarget = transformDataToScreen(targetStrokeData[0]);
    const endPointTarget = transformDataToScreen(targetStrokeData[targetStrokeData.length - 1]);
    
    const vecUser = subtract(endPointUser, startPointUser);
    const vecTarget = subtract(endPointTarget, startPointTarget);
    const directionScore = cosineSimilarity(vecUser, vecTarget);
    
    if (directionScore < TOLERANCE_DIRECTION) {
        failStroke();
        return;
    }

    const SAMPLE_COUNT = 10;
    const targetPointsScreen = targetStrokeData.map(transformDataToScreen);
    const resampledUser = resample(userStroke, SAMPLE_COUNT);
    const resampledTarget = resample(targetPointsScreen, SAMPLE_COUNT);
    const shapeError = calculateShapeScore(resampledUser, resampledTarget);

    if (shapeError > TOLERANCE_SHAPE_ERROR) {
        failStroke();
        return;
    }

    const score = mapResultToScore(shapeError, directionScore);
    passStroke(score);
  };

  const failStroke = () => {
      if (settings.soundEffects) {
          soundService.playSound('error');
      }
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
      setFeedbackColor('error');
      setMistakeCount(prev => prev + 1);
      setTimeout(clearCanvas, 500);
  };

  const passStroke = (score: number) => {
      if (settings.soundEffects) {
          soundService.playSound('correct');
      }
      if (navigator.vibrate) navigator.vibrate(20);
      setFeedbackColor('success');
      setStrokeScores(prev => [...prev, score]);
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
    showGhostHint,
    lastPracticeResult,
    handlers: { handlePointerDown, handlePointerMove, handlePointerUp }
  };
};
