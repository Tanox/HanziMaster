/**
 * app/components/analysis/cards/EtymologyCard.tsx v0.7.1
 */
import React from 'react';
import { History } from 'lucide-react';
import { UILabels } from '../../../types';
import BaseCard from './BaseCard';

interface EtymologyCardProps {
  content: string;
  labels: UILabels;
}

const EtymologyCard: React.FC<EtymologyCardProps> = ({ content, labels }) => (
  <BaseCard icon={<History size={14} />} title={labels.origin || 'Etymology'} className="md:col-span-4">
    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{content}</p>
  </BaseCard>
);

export default EtymologyCard;