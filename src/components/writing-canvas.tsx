// src/components/writing-canvas.tsx v2.4.0 - Apple Design Style
'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
}

interface WritingCanvasProps {
  character?: string;
  strokeCount?: number;
  onComplete?: (strokes: Point[][]) => void;
  onStrokeComplete?: (strokeIndex: number) => void;
  disabled?: boolean;
  showGuide?: boolean;
}

export function WritingCanvas({
  character = '',
  strokeCount = 0,
  onComplete,
  onStrokeComplete,
  disabled = false,
  showGuide = true,
}: WritingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(0);

  const getCanvasCoordinates = useCallback((e: React.MouseEvent | React.TouchEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height);
    if (showGuide && character) {
      drawGuideCharacter(ctx, canvas.width, canvas.height);
    }
  }, [showGuide, character]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)';
    ctx.lineWidth = 1;
    
    const gridSize = width / 8;
    
    for (let i = 0; i <= 8; i++) {
      ctx.beginPath();
      ctx.moveTo(i * gridSize, 0);
      ctx.lineTo(i * gridSize, height);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i * gridSize);
      ctx.lineTo(width, i * gridSize);
      ctx.stroke();
    }
    
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
    ctx.setLineDash([5, 5]);
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, height);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(width, 0);
    ctx.lineTo(0, height);
    ctx.stroke();
    
    ctx.setLineDash([]);
  };

  const drawGuideCharacter = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.font = `${width * 0.6}px 'Noto Sans SC', sans-serif`;
    ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(character, width / 2, height / 2);
  };

  const drawStroke = useCallback((ctx: CanvasRenderingContext2D, stroke: Point[], isCurrent = false) => {
    if (stroke.length < 2) return;
    
    ctx.beginPath();
    ctx.moveTo(stroke[0].x, stroke[0].y);
    
    for (let i = 1; i < stroke.length; i++) {
      const xc = (stroke[i].x + stroke[i - 1].x) / 2;
      const yc = (stroke[i].y + stroke[i - 1].y) / 2;
      ctx.quadraticCurveTo(stroke[i - 1].x, stroke[i - 1].y, xc, yc);
    }
    
    ctx.strokeStyle = isCurrent ? '#10b981' : '#10b981';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    
    ctx.strokeStyle = isCurrent ? '#34d399' : '#34d399';
    ctx.lineWidth = 3;
    ctx.stroke();
  }, []);

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height);
    
    if (showGuide && character) {
      drawGuideCharacter(ctx, canvas.width, canvas.height);
    }
    
    strokes.forEach((stroke, index) => {
      drawStroke(ctx, stroke, index === strokes.length - 1);
    });
    
    if (currentStroke.length > 0) {
      drawStroke(ctx, currentStroke, true);
    }
  }, [strokes, currentStroke, showGuide, character, drawStroke]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      }
      
      redrawCanvas();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [redrawCanvas]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    
    e.preventDefault();
    setIsDrawing(true);
    const point = getCanvasCoordinates(e);
    setCurrentStroke([point]);
  }, [disabled, getCanvasCoordinates]);

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || disabled) return;
    
    e.preventDefault();
    const point = getCanvasCoordinates(e);
    setCurrentStroke(prev => [...prev, point]);
  }, [isDrawing, disabled, getCanvasCoordinates]);

  const handleEnd = useCallback(() => {
    if (!isDrawing) return;
    
    setIsDrawing(false);
    
    if (currentStroke.length > 2) {
      const newStrokes = [...strokes, currentStroke];
      setStrokes(newStrokes);
      const newStrokeIndex = currentStrokeIndex + 1;
      setCurrentStrokeIndex(newStrokeIndex);
      
      onStrokeComplete?.(newStrokeIndex);
      
      if (strokeCount > 0 && newStrokes.length >= strokeCount) {
        onComplete?.(newStrokes);
      }
    }
    
    setCurrentStroke([]);
  }, [isDrawing, currentStroke, strokes, currentStrokeIndex, strokeCount, onComplete, onStrokeComplete]);

  const reset = useCallback(() => {
    setStrokes([]);
    setCurrentStroke([]);
    setCurrentStrokeIndex(0);
    clearCanvas();
  }, [clearCanvas]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        reset();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [reset]);

  return (
    <div className="relative">
      <div className="writing-canvas rounded-2xl apple-shadow-xl overflow-hidden bg-white dark:bg-gray-900">
        <canvas
          ref={canvasRef}
          className={`w-full aspect-square touch-none ${disabled ? 'cursor-not-allowed' : 'cursor-crosshair'}`}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          aria-label="书写画布"
          aria-describedby="canvas-instructions"
          aria-disabled={disabled}
        />
      </div>
      
      <div id="canvas-instructions" className="sr-only">
        在画布上书写汉字。按 Escape 键清除。
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            笔画: {currentStrokeIndex} / {strokeCount || '?'}
          </span>
          {showGuide && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              (显示参考字)
            </span>
          )}
        </div>
        
        <button
          onClick={reset}
          className="btn-apple-secondary text-sm px-4 py-2 touch-target"
          aria-label="清除画布"
        >
          清除
        </button>
      </div>
    </div>
  );
}
