
/**
 * HanziMaster v0.5.2
 */
import React from 'react';
import { History } from 'lucide-react';
import { UILabels } from '../../../locales/types';

interface EtymologyCardProps {
  content: string;
  labels: UILabels;
}

const EtymologyCard: React.FC<EtymologyCardProps> = ({ content, labels }) => {
  return (
      <div id="character-etymology-card" className="md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-amber-100 dark:hover:border-amber-900/30 transition-colors">
          <div className="flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-500">
              <History size={18} />
              <h3 className="font-bold text-sm uppercase tracking-wide">{labels.origin}</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
              {content}
          </p>
      </div>
  );
};

export default EtymologyCard;