// src/components/practice/writing-canvas.tsx v5.2.6
// 书写画布：淡字符底图 + 指针轨迹绘制，直接从设计 token 读取前景色与衬线字体，
// 与原型 prototype.html 的「无网格虚线框」规范保持一致，并用指针事件统一鼠标/触控。
'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';

export interface WritingCanvasHandle {
  clearCanvas: () => void;
}

interface WritingCanvasProps {
  character: string;
}

// 从设计 token 读取前景色与衬线字体，避免 Canvas 写死色值（单一来源）
const resolveFg = () =>
  getComputedStyle(document.documentElement).getPropertyValue('--color-foreground').trim() || '#1a1a1a';
const resolveSerif = () =>
  getComputedStyle(document.documentElement).getPropertyValue('--font-serif').trim() || 'serif';

const drawHint = (canvas: HTMLCanvasElement, character: string) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = resolveFg();
  ctx.font = `${Math.min(rect.width, rect.height) * 0.4}px ${resolveSerif()}`;
  ctx.fillStyle = resolveFg();
  ctx.globalAlpha = 0.08;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(character, rect.width / 2, rect.height / 2);
  ctx.globalAlpha = 1;
};

export const WritingCanvas = forwardRef<WritingCanvasHandle, WritingCanvasProps>(({ character }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) drawHint(canvas, character);
  }, [character]);

  useImperativeHandle(ref, () => ({ clearCanvas }), [clearCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) drawHint(canvas, character);
  }, [character]);

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const p = getPoint(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    const p = getPoint(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  return (
    <canvas
      id="writing-canvas"
      ref={canvasRef}
      role="img"
      aria-label={`${character} ${character} 书写练习画布`}
      className="h-full w-full cursor-crosshair touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDrawing}
      onPointerLeave={stopDrawing}
      onPointerCancel={stopDrawing}
    />
  );
});

WritingCanvas.displayName = 'WritingCanvas';
