
/**
 * HanziMaster v0.5.2
 */
import React from 'react';
import { AppSettings, GridStyle } from '../../types';
import { UILabels } from '../../locales/types';
import SettingsSection from './SettingsSection';

interface SettingsGridProps {
  labels: UILabels;
  gridStyle: GridStyle;
  onUpdate: (key: keyof AppSettings, value: any) => void;
}

const SettingsGrid: React.FC<SettingsGridProps> = ({ labels, gridStyle, onUpdate }) => {
  return (
    <SettingsSection title={labels.settingGridStyle}>
      <div className="grid grid-cols-3 gap-2">
          {(['rice', 'field', 'none'] as GridStyle[]).map((style) => (
            <button
              key={style}
              onClick={() => onUpdate('gridStyle', style)}
              className={`py-2 px-2 text-xs rounded-lg border transition-all ${
                gridStyle === style
                  ? 'bg-teal-50 dark:bg-teal-900/30 border-teal-500 text-teal-700 dark:text-teal-300 font-medium'
                  : 'bg-slate-50 dark:bg-slate-700/50 border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {style === 'rice' && labels.settingGridRice}
              {style === 'field' && labels.settingGridField}
              {style === 'none' && labels.settingGridNone}
            </button>
          ))}
      </div>
    </SettingsSection>
  );
};

export default SettingsGrid;