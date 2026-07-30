// src/components/practice/writing-dialog.tsx v5.0.0
'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from '@/components/locale-provider';
import type { CharacterQuiz } from '@/components/practice/practice-assets';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface WritingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  character: CharacterQuiz;
  strokeCount: number;
  onNext: () => void;
}

export function WritingDialog({ open, onOpenChange, character, strokeCount, onNext }: WritingDialogProps) {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  const resolveFg = () =>
    getComputedStyle(document.documentElement).getPropertyValue('--color-foreground').trim() || '#1a1a1a';
  const resolveSerif = () =>
    getComputedStyle(document.documentElement).getPropertyValue('--font-serif').trim() || 'serif';

  const drawHint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const fg = resolveFg();
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = fg;
    ctx.font = `${Math.min(rect.width, rect.height) * 0.4}px ${resolveSerif()}`;
    ctx.fillStyle = fg;
    ctx.globalAlpha = 0.08;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(character.hanzi, rect.width / 2, rect.height / 2);
    ctx.globalAlpha = 1;
  }, [character]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    const fg = resolveFg();
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = fg;
    ctx.font = `${Math.min(rect.width, rect.height) * 0.4}px ${resolveSerif()}`;
    ctx.fillStyle = fg;
    ctx.globalAlpha = 0.08;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(character.hanzi, rect.width / 2, rect.height / 2);
    ctx.globalAlpha = 1;
    return () => {};
  }, [character, drawHint]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHint();
  }, [drawHint]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    const rect = canvasRef.current.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    ctx.stroke();
  };

  const handleTouchEnd = () => {
    isDrawing.current = false;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] bg-card/95 dark:bg-ink-900/95 backdrop-blur-xl rounded-3xl border-ink-100 dark:border-ink-800 shadow-ink-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-ink-900 dark:text-ink-50 display-font">
            {t('practice.writingTitle')}
          </DialogTitle>
          <DialogDescription className="text-ink-600 dark:text-ink-300">
            {t('practice.writingDialogDesc')}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-light serif-font text-ink-900 dark:text-ink-50">
                {character.hanzi}
              </span>
              <div>
                <p className="text-lg font-medium text-ink-900 dark:text-ink-50">{character.pinyin}</p>
                <p className="text-sm text-ink-500 dark:text-ink-400">{character.meaning}</p>
              </div>
            </div>
            <Badge variant="outline" className="rounded-full border-ink-200 text-ink-600 dark:border-ink-700 dark:text-ink-300">
              {t('practice.strokeCount', { count: strokeCount })}
            </Badge>
          </div>

          <div className="relative aspect-square bg-card dark:bg-ink-900 rounded-xl border-2 border-dashed border-ink-200 dark:border-ink-700 overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-crosshair"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={clearCanvas} className="rounded-full border-ink-200 text-ink-700 dark:border-ink-700 dark:text-ink-200">
            {t('practice.clear')}
          </Button>
          <Button onClick={onNext} className="bg-vermilion-500 hover:bg-vermilion-600 text-primary-foreground rounded-full">
            {t('practice.next')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
