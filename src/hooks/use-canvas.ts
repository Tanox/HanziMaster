// src/hooks/use-canvas.ts v5.0.0
'use client';

import { useEffect, useCallback, useRef } from 'react';

interface UseWritingCanvasOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  showDialog: boolean;
  character: string;
  isDark?: boolean;
  showHint?: boolean;
}

const readCssVar = (name: string, fallback: string): string => {
  if (typeof window === 'undefined') return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
};

// 读取设计 token，避免 Canvas 写死色值（单一来源，深浅主题自动跟随）
const readCanvasColors = (isDark: boolean) => {
  const fg = readCssVar('--color-foreground', isDark ? '#f3f1eb' : '#1a1a1a');
  const bg = readCssVar('--color-background', isDark ? '#0d0d0d' : '#faf9f6');
  const muted = readCssVar('--color-muted', isDark ? '#1a1a1a' : '#f3f1eb');
  const border = readCssVar('--color-border', isDark ? '#2d2d2d' : '#e5e1d8');
  const mix = (a: string, b: string, p: number) => `color-mix(in srgb, ${a} ${p}%, ${b})`;
  return {
    bgStart: bg,
    bgEnd: muted,
    grid: border,
    diagonal: mix(border, bg, 60),
    crosshair: mix(border, bg, 60),
    hint: mix(fg, 'transparent', 92),
    pen: fg,
  };
};

const readSerifFont = () => readCssVar('--font-serif', 'serif');

const drawCanvasBackground = (
  ctx: CanvasRenderingContext2D,
  rect: { width: number; height: number },
  character: string,
  isDark: boolean,
) => {
  const colors = readCanvasColors(isDark);
  const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
  gradient.addColorStop(0, colors.bgStart);
  gradient.addColorStop(1, colors.bgEnd);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, rect.width, rect.height);

  ctx.strokeStyle = colors.grid;
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

  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = colors.diagonal;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(rect.width, rect.height);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(rect.width, 0);
  ctx.lineTo(0, rect.height);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = colors.crosshair;
  ctx.beginPath();
  ctx.moveTo(rect.width / 2, 0);
  ctx.lineTo(rect.width / 2, rect.height);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, rect.height / 2);
  ctx.lineTo(rect.width, rect.height / 2);
  ctx.stroke();

  ctx.font = `${Math.min(rect.width, rect.height) * 0.4}px ${readSerifFont()}`;
  ctx.fillStyle = colors.hint;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(character, rect.width / 2, rect.height / 2);
};

export function useWritingCanvas({ canvasRef, showDialog, character, isDark = false }: UseWritingCanvasOptions) {
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!showDialog || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    drawCanvasBackground(ctx, rect, character, isDark);

    const getPoint = (e: PointerEvent): { x: number; y: number } => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const colors = readCanvasColors(isDark);

    const startDrawing = (e: PointerEvent) => {
      isDrawingRef.current = true;
      lastPointRef.current = getPoint(e);
      e.preventDefault();
    };

    const draw = (e: PointerEvent) => {
      if (!isDrawingRef.current || !lastPointRef.current) return;
      const point = getPoint(e);
      ctx.strokeStyle = colors.pen;
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
  }, [showDialog, character, canvasRef, isDark]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    drawCanvasBackground(ctx, rect, character, isDark);
  }, [character, canvasRef, isDark]);

  return { clearCanvas };
}
