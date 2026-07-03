// src/hooks/use-canvas.ts v3.0.0
'use client';

import { useEffect, useCallback, useRef } from 'react';

interface UseWritingCanvasOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  showDialog: boolean;
  character: string;
}

// 绘制渐变背景、田字格、对角虚线、中心十字线与汉字提示
const drawCanvasBackground = (
  ctx: CanvasRenderingContext2D,
  rect: { width: number; height: number },
  character: string,
) => {
  // 渐变背景
  const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(1, '#f5f5f7');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, rect.width, rect.height);

  // 田字格
  ctx.strokeStyle = '#d1d5db';
  ctx.lineWidth = 1;
  const gridSize = rect.width / 4;
  for (let i = 1; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(i * gridSize, 0);
    ctx.lineTo(i * gridSize, rect.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * gridSize);
    ctx.lineTo(rect.width, i * gridSize);
    ctx.stroke();
  }

  // 对角虚线
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = '#e5e7eb';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(rect.width, rect.height);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(rect.width, 0);
  ctx.lineTo(0, rect.height);
  ctx.stroke();
  ctx.setLineDash([]);

  // 中心十字线
  ctx.strokeStyle = '#e5e7eb';
  ctx.beginPath();
  ctx.moveTo(rect.width / 2, 0);
  ctx.lineTo(rect.width / 2, rect.height);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, rect.height / 2);
  ctx.lineTo(rect.width, rect.height / 2);
  ctx.stroke();

  // 汉字提示（0.4x 尺寸）
  ctx.font = `${Math.min(rect.width, rect.height) * 0.4}px serif`;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(character, rect.width / 2, rect.height / 2);
};

// 书写练习画布 Hook：封装 DPI 设置、背景绘制与指针事件
export function useWritingCanvas({ canvasRef, showDialog, character }: UseWritingCanvasOptions) {
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!showDialog || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布大小（高 DPI 屏）
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    drawCanvasBackground(ctx, rect, character);

    const getPoint = (e: PointerEvent): { x: number; y: number } => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const startDrawing = (e: PointerEvent) => {
      isDrawingRef.current = true;
      lastPointRef.current = getPoint(e);
      e.preventDefault();
    };

    const draw = (e: PointerEvent) => {
      if (!isDrawingRef.current || !lastPointRef.current) return;
      const point = getPoint(e);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
      lastPointRef.current = point;
      e.preventDefault();
    };

    const stopDrawing = () => {
      isDrawingRef.current = false;
      lastPointRef.current = null;
    };

    canvas.addEventListener('pointerdown', startDrawing);
    canvas.addEventListener('pointermove', draw);
    canvas.addEventListener('pointerup', stopDrawing);
    canvas.addEventListener('pointerleave', stopDrawing);
    canvas.addEventListener('pointercancel', stopDrawing);

    return () => {
      canvas.removeEventListener('pointerdown', startDrawing);
      canvas.removeEventListener('pointermove', draw);
      canvas.removeEventListener('pointerup', stopDrawing);
      canvas.removeEventListener('pointerleave', stopDrawing);
      canvas.removeEventListener('pointercancel', stopDrawing);
    };
  }, [showDialog, character, canvasRef]);

  // 清空画布并重绘背景
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    drawCanvasBackground(ctx, rect, character);
  }, [character, canvasRef]);

  return { clearCanvas };
}
