/**
 * app/components/analysis/cards/OfflineStateCard.tsx v0.7.1
 */
import React from 'react';
import { WifiOff } from 'lucide-react';
import { UILabels } from '../../../types';
import BaseCard from './BaseCard';

interface OfflineStateCardProps {
  labels: UILabels;
}

const OfflineStateCard: React.FC<OfflineStateCardProps> = ({ labels }) => (
  <BaseCard icon={<WifiOff size={14} />} title={labels.offlineModeActive || 'Offline Mode'} className="md:col-span-4">
    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
      {labels.offlineMsg || 'Detailed analysis requires an internet connection. Practice mode and basic functions are available offline.'}
    </p>
  </BaseCard>
);

export default OfflineStateCard;