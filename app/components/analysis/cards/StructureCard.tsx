// app/components/analysis/cards/StructureCard.tsx v1.3.4
import React from 'react';
import { Box } from 'lucide-react';
import { UILabels } from '../../../types';
import BaseCard from './BaseCard';

interface StructureCardProps {
  radical: string;
  structure?: string;
  labels: UILabels;
}

const StructureCard: React.FC<StructureCardProps> = ({ radical, structure, labels }) => (
  <BaseCard icon={<Box size={14} />} title={labels.structure || 'Structure'} className="md:col-span-2">
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500 dark:text-slate-400">{labels.radical || 'Radical'}</span>
        <p className="text-2xl font-hanzi text-slate-700 dark:text-slate-200">{radical}</p>
      </div>
      {structure && (
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-2">
          <span className="text-sm text-slate-500 dark:text-slate-400">{labels.structure || 'Structure'}</span>
          <p className="text-base font-medium text-slate-700 dark:text-slate-200">{structure}</p>
        </div>
      )}
    </div>
  </BaseCard>
);

export default StructureCard;