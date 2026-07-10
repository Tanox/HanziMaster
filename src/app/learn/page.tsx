'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from '@/components/locale-provider';
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
import { characters, type Character } from '@/lib/characters';

/* Scroll reveal hook */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function LearnPage() {
  const { t } = useTranslation();
  useScrollReveal();
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(characters[0]?.id ?? null);
  const [showWritingDialog, setShowWritingDialog] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showStrokeOrder, setShowStrokeOrder] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const selectedCharacter = characters.find(char => char.id === selectedCharacterId) ?? null;

  const selectCharacter = useCallback((char: Character) => {
    setSelectedCharacterId(char.id);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, char: Character) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectCharacter(char);
    }
  }, [selectCharacter]);

  // --- 发音播放功能 (Web Speech API) ---
  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, []);

  const handlePronunciation = useCallback(() => {
    if (!selectedCharacter) return;
    if (!('speechSynthesis' in window)) return;

    const utterance = new SpeechSynthesisUtterance(selectedCharacter.hanzi);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.8;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [selectedCharacter]);

  // --- 书写练习功能 (Canvas) ---
  useEffect(() => {
    if (!showWritingDialog || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布大小（高 DPI 屏）
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // 初始画布
    const clearCanvas = () => {
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

      // 对角线
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

      // 汉字提示
      ctx.font = `${Math.min(rect.width, rect.height) * 0.4}px serif`;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedCharacter?.hanzi || '', rect.width / 2, rect.height / 2);
    };

    clearCanvas();

    const getPoint = (e: PointerEvent | TouchEvent | MouseEvent): { x: number; y: number } => {
      const r = canvas.getBoundingClientRect();
      if ('touches' in e && e.touches.length > 0) {
        return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
      }
      if ('clientX' in e) {
        return { x: e.clientX - r.left, y: e.clientY - r.top };
      }
      return { x: 0, y: 0 };
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
  }, [showWritingDialog, selectedCharacter]);

  const handleClearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    // 重新绘制空白画布（与初始化逻辑一致）
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

    // 对角线
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

    // 汉字提示
    ctx.font = `${Math.min(rect.width, rect.height) * 0.4}px serif`;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(selectedCharacter?.hanzi || '', rect.width / 2, rect.height / 2);
  }, [selectedCharacter]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 safe-bottom">
      <div className="text-center mb-12 reveal">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 text-foreground">
          {t('common.dailyPractice')}
        </h2>
        <p className="text-xl text-muted-foreground">
          {t('common.masterCharacters')}
        </p>
      </div>

      <div
        className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-5 mb-12 stagger-children"
        role="listbox"
        aria-label={t('common.masterCharacters')}
      >
        {characters.map((char) => {
          const isSelected = selectedCharacterId === char.id;
          return (
            <button
              key={char.id}
              onClick={() => selectCharacter(char)}
              onKeyDown={(e) => handleKeyDown(e, char)}
              role="option"
              aria-selected={isSelected}
              tabIndex={0}
              className={`group bg-muted dark:bg-card aspect-square rounded-3xl border-2 border-transparent hover:border-[#007aff] dark:hover:border-[#2997ff] hover:bg-[#007aff]/5 dark:hover:bg-[#007aff]/10 transition-[border-color,background-color,colors] duration-300 text-center relative overflow-hidden outline-none ${
                isSelected
                  ? 'bg-primary border-primary'
                  : ''
              }`}
            >
              <span className={`text-4xl sm:text-5xl font-light mb-2 block transition-colors hanzi-font ${
                isSelected
                  ? 'text-primary-foreground'
                  : 'text-foreground'
              }`}>
                {char.hanzi}
              </span>
              <span className={`text-xs text-muted-foreground uppercase tracking-wider font-medium ${
                isSelected ? 'text-primary-foreground/70' : ''
              }`}>
                {char.pinyin}
              </span>
            </button>
          );
        })}
      </div>

      {selectedCharacter && (
        <div className="bg-muted dark:bg-card rounded-[32px] p-10 border border-border reveal revealed">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br from-background to-muted dark:from-card dark:to-background rounded-[24px] flex items-center justify-center border border-border shrink-0 relative group">
              <span className="text-[120px] sm:text-[140px] font-light text-muted-foreground hanzi-font transition-transform duration-500 group-hover:scale-110">
                {selectedCharacter.hanzi}
              </span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-4 mb-8">
                <h3 className="text-4xl sm:text-5xl font-semibold text-foreground hanzi-font">
                  {selectedCharacter.hanzi}
                </h3>
                <span className="text-2xl text-muted-foreground font-medium">
                  {selectedCharacter.pinyin}
                </span>
                <Badge variant="secondary" className="text-sm font-semibold">
                  {t(selectedCharacter.translationKey)}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-background dark:bg-foreground/5 rounded-[20px] p-5">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">
                    {t('common.strokeCount')}
                  </div>
                  <div className="text-2xl font-semibold text-foreground">
                    {selectedCharacter.strokes} {t('common.strokes')}
                  </div>
                </div>
                <div className="bg-background dark:bg-foreground/5 rounded-[20px] p-5">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">
                    {t('learn.radical')}
                  </div>
                  <div className="text-2xl font-semibold text-foreground hanzi-font">
                    {selectedCharacter.radical}
                  </div>
                </div>
                <div className="bg-background dark:bg-foreground/5 rounded-[20px] p-5">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">
                    {t('learn.structure')}
                  </div>
                  <div className="text-2xl font-semibold text-foreground">
                    {t(selectedCharacter.structureKey)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start">
                <Button
                  size="lg"
                  className="rounded-full"
                  onClick={() => setShowWritingDialog(true)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {t('common.practiceWriting')}
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="rounded-full text-[#007aff]"
                  onClick={handlePronunciation}
                  disabled={isSpeaking}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  {isSpeaking ? '…' : t('common.hearPronunciation')}
                </Button>
              </div>

              {/* 词组展示 */}
              <div className="mb-8">
                <h4 className="text-sm text-muted-foreground uppercase tracking-wider font-medium mb-4">{t('learn.wordsTitle')}</h4>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {selectedCharacter.words.map((word, idx) => (
                    <button
                      key={word.text}
                      onClick={() => speak(word.text)}
                      className="bg-background dark:bg-foreground/5 rounded-2xl px-5 py-3 border border-border hover:border-[#007aff] dark:hover:border-[#2997ff] transition-colors duration-200 text-left"
                      style={{ animationDelay: `${idx * 100}ms` }}
                      aria-label={`${word.text} - ${word.pinyin}`}
                    >
                      <span className="text-lg font-medium text-foreground hanzi-font block">{word.text}</span>
                      <span className="text-xs text-muted-foreground block mt-1">{word.pinyin} · {t(word.translationKey)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 例句展示 */}
              <div className="mb-8">
                <h4 className="text-sm text-muted-foreground uppercase tracking-wider font-medium mb-4">{t('learn.exampleTitle')}</h4>
                <button
                  onClick={() => speak(selectedCharacter.example.sentence)}
                  className="block w-full text-left bg-background dark:bg-foreground/5 rounded-2xl p-6 border border-border hover:border-[#007aff] dark:hover:border-[#2997ff] transition-colors duration-200"
                  aria-label={selectedCharacter.example.pinyin}
                >
                  <p className="text-xl text-foreground hanzi-font mb-2">{selectedCharacter.example.sentence}</p>
                  <p className="text-sm text-muted-foreground">{selectedCharacter.example.pinyin}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t(selectedCharacter.example.translationKey)}</p>
                </button>
              </div>

              {/* 笔顺展示 */}
              {selectedCharacter.strokeOrder && (
                <div>
                  <button
                    onClick={() => setShowStrokeOrder(!showStrokeOrder)}
                    className="text-sm text-[#007aff] dark:text-[#2997ff] font-medium hover:underline"
                  >
                    {showStrokeOrder ? t('learn.hideStrokeOrder') : t('learn.showStrokeOrder')}
                  </button>
                  {showStrokeOrder && (
                    <p className="text-base text-foreground mt-3 p-4 bg-background dark:bg-foreground/5 rounded-2xl border border-border">
                      {selectedCharacter.strokeOrder}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 书写练习对话框 */}
      <Dialog open={showWritingDialog} onOpenChange={setShowWritingDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold hanzi-font">
              {selectedCharacter?.hanzi} - {t('common.practiceWriting')}
            </DialogTitle>
            <DialogDescription>
              {selectedCharacter?.pinyin} · {selectedCharacter && t(selectedCharacter.translationKey)}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <canvas
              ref={canvasRef}
              className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-[24px] border-2 border-border cursor-crosshair touch-none shadow-md"
              aria-label={`Write character ${selectedCharacter?.hanzi}`}
            />
          </div>
          <DialogFooter className="flex flex-row sm:justify-between gap-2">
            <div className="text-sm text-muted-foreground">
              {t('practice.writeOnCanvas')}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleClearCanvas}>
                {t('practice.clear')}
              </Button>
              <Button onClick={() => setShowWritingDialog(false)}>
                {t('practice.done')}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
