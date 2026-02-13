
/**
 * HanziMaster v0.4.9
 */
import React from 'react';
import { Lightbulb } from 'lucide-react';
import { UILabels } from '../../../locales/types';

interface MnemonicCardProps {
  content: string;
  labels: UILabels;
}

const MnemonicCard: React.FC<MnemonicCardProps> = ({ content, labels }) => {
  return (
      <div id="character-mnemonic-card" className="md:col-span-2 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-teal-100 dark:border-teal-900/50 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2 text-teal-700 dark:text-teal-400">
              <Lightbulb size={18} />
              <h3 className="font-bold text-sm uppercase tracking-wide">{labels.memoryAid}</h3>
          </div>
          <p className="text-teal-900 dark:text-teal-100 text-base italic font-serif">
              "{content}"
          </p>
      </div>
  );
};

export default MnemonicCard;
