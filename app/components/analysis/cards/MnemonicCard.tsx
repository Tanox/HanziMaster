/**
 * app/components/analysis/cards/MnemonicCard.tsx v0.7.1
 */
import React from 'react';
import { Lightbulb } from 'lucide-react';
import { UILabels } from '../../../types';
import BaseCard from './BaseCard';

interface MnemonicCardProps {
  content: string;
  labels: UILabels;
}

const MnemonicCard: React.FC<MnemonicCardProps> = ({ content, labels }) => (
  <BaseCard icon={<Lightbulb size={14} />} title={labels.memoryAid || 'Mnemonic'} className="md:col-span-4">
    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">{content}</p>
  </BaseCard>
);

export default MnemonicCard;