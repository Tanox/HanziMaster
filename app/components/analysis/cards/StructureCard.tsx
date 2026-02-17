// app/components/analysis/cards/StructureCard.tsx v0.7.1
import React from 'react';
import { Box } from 'lucide-react';
import { UILabels } from '../../../types';
import BaseCard from './BaseCard';

interface StructureCardProps {
  radical: string;
  labels: UILabels;
}

const StructureCard: React.FC<StructureCardProps> = ({ radical, labels }) => (
  <BaseCard icon={<Box size={14} />} title={labels.radical || 'Radical'} className="md:col-span-2">
    <p className="text-2xl font-hanzi text-slate-700 dark:text-slate-200">{radical}</p>
  </BaseCard>
);

export default StructureCard;