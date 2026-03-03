// app/components/dashboard/MobileTabs.tsx v1.3.5
import React from 'react';
import { Brush, BookOpen } from 'lucide-react';
import { UILabels } from '../../types';

interface MobileTabsProps {
  activeTab: 'viewer' | 'analysis';
  setActiveTab: (tab: 'viewer' | 'analysis') => void;
  labels: UILabels;
}

const MobileTabs: React.FC<MobileTabsProps> = ({ activeTab, setActiveTab, labels }) => {
  return (
    <div className="lg:hidden w-full max-w-md mx-auto mb-6 flex p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl">
      <button
        onClick={() => setActiveTab('viewer')}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
          activeTab === 'viewer'
            ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
        }`}
      >
        <Brush size={16} />
        {labels.viewMode || 'Watch'}
      </button>
      <button
        onClick={() => setActiveTab('analysis')}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
          activeTab === 'analysis'
            ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
        }`}
      >
        <BookOpen size={16} />
        {labels.sectionContent || 'Content'}
      </button>
    </div>
  );
};

export default MobileTabs;
