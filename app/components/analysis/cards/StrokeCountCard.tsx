// app/components/analysis/cards/StrokeCountCard.tsx v1.3.4
import React from 'react';
import { PenTool } from 'lucide-react';
import { UILabels } from '../../../types';
import BaseCard from './BaseCard';

interface StrokeCountCardProps {
  count: number;
  labels: UILabels;
  fullWidth?: boolean;
}

const StrokeCountCard: React.FC<StrokeCountCardProps> = ({ count, labels, fullWidth }) => (
  <BaseCard icon={<PenTool size={14} />} title={labels.strokeCount || 'Strokes'} className={`md:col-span-2 ${fullWidth ? 'md:col-span-4' : ''}`}>
    <p className="text-3xl font-bold text-slate-700 dark:text-slate-200">{count}</p>
  </BaseCard>
);

export default StrokeCountCard;