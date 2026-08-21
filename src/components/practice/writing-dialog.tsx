// src/components/practice/writing-dialog.tsx v5.2.6
'use client';

import { useRef } from 'react';
import { useTranslation } from '@/components/locale-provider';
import type { CharacterQuiz } from '@/components/practice/practice-assets';
import { WritingCanvas, type WritingCanvasHandle } from '@/components/practice/writing-canvas';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { strokeOrderData } from '@/lib/stroke-order-data';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface WritingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  character: CharacterQuiz;
  strokeCount: number;
  onNext: () => void;
}

export function WritingDialog({ open, onOpenChange, character, strokeCount, onNext }: WritingDialogProps) {
  const { t } = useTranslation();
  const canvasRef = useRef<WritingCanvasHandle>(null);

  const clearCanvas = () => canvasRef.current?.clearCanvas();

  // 从笔顺数据表查询当前字符的笔画路径与中位线（无则回退纯自由书写）
  const strokeData = strokeOrderData[character.hanzi];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-background sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-foreground">
            {t('practice.writingTitle')}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {t('practice.writingDesc')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vermilion-50">
              <span className="font-serif text-3xl text-vermilion-600">{character.hanzi}</span>
            </div>
            <div className="text-left">
              <Badge variant="outline" className="border-vermilion-200 text-vermilion-700">
                {character.pinyin}
              </Badge>
              <p className="mt-1 text-sm text-muted-foreground">{character.meaning}</p>
            </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-dashed border-border bg-card">
            <WritingCanvas
              ref={canvasRef}
              character={character.hanzi}
              strokePaths={strokeData?.strokes}
              medians={strokeData?.medians}
              strokeCount={strokeCount}
            />
          </div>

          <p className="text-center text-xs text-muted-foreground">
            {t('practice.strokeCount')}: {strokeCount}
          </p>
        </div>

        <DialogFooter className="gap-2 sm:justify-between">
          <Button variant="outline" onClick={clearCanvas} className="border-border">
            {t('practice.clear')}
          </Button>
          <Button onClick={onNext} className="bg-vermilion-600 hover:bg-vermilion-700">
            {t('practice.next')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
