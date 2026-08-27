// src/components/practice/writing-canvas-parts.tsx v5.2.25
// 书写画布渲染子组件与局部常量，主组件 writing-canvas.tsx 仅保留编排逻辑。
import { useTranslation } from '@/components/locale-provider';

/** 进度标签容器样式：底部居中、不拦截指针事件 */
export const PROGRESS_LABEL_WRAPPER_CLASS =
  'pointer-events-none absolute inset-x-0 bottom-2 flex justify-center';

/** 进度标签气泡样式 */
export const PROGRESS_LABEL_BADGE_CLASS =
  'rounded-full bg-card/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm';

interface ProgressLabelProps {
  character: string;
  progressLabel: string;
}

/** 笔顺引导下的进度提示标签（已完成笔数 / 总笔数） */
export function ProgressLabel({ character, progressLabel }: ProgressLabelProps) {
  const { t } = useTranslation();
  return (
    <div id="progress-label" className={PROGRESS_LABEL_WRAPPER_CLASS}>
      <span className={PROGRESS_LABEL_BADGE_CLASS}>
        {t('learn.strokeOrder')}: {progressLabel}
      </span>
    </div>
  );
}
