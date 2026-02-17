// app/components/settings/SettingsVisuals.tsx v0.7.1
import React from 'react';
import { Eye, LayoutGrid } from 'lucide-react';
import { AppSettings, GridStyle, UILabels } from '../../types';
import SettingsSection from './SettingsSection';
import ToggleItem from '../ToggleItem';

interface SettingsVisualsProps {
  labels: UILabels;
  settings: AppSettings;
  onUpdate: (key: keyof AppSettings, value: any) => void;
}

const SettingsVisuals: React.FC<SettingsVisualsProps> = ({ labels, settings, onUpdate }) => (
  <SettingsSection title={labels.sectionAppearance || 'Appearance'}>
    <div className="space-y-4">
      <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800"><LayoutGrid size={16} /></div>
            <span className="text-slate-700 dark:text-slate-200 font-medium text-sm">{labels.settingGridStyle}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 dark:bg-slate-700/50 rounded-xl">
              {(['rice', 'field', 'none'] as GridStyle[]).map((style) => (
                  <button key={style} onClick={() => onUpdate('gridStyle', style)} className={`py-2 text-[10px] uppercase font-bold rounded-lg transition-all ${settings.gridStyle === style ? 'bg-white dark:bg-slate-600 text-teal-600 dark:text-teal-300 shadow-sm' : 'text-slate-400'}`}>
                      {style === 'rice' && labels.settingGridRice}{style === 'field' && labels.settingGridField}{style === 'none' && labels.settingGridNone}
                  </button>
              ))}
          </div>
      </div>
      <ToggleItem label={labels.settingShowOutline} value={settings.showOutline} onChange={() => onUpdate('showOutline', !settings.showOutline)} icon={<Eye size={16} />} />
    </div>
  </SettingsSection>
);

export default SettingsVisuals;