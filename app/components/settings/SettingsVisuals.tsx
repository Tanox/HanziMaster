// app/components/settings/SettingsVisuals.tsx v1.3.4
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
      <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 dark:bg-slate-900"><LayoutGrid size={18} /></div>
            <span className="text-slate-700 dark:text-slate-200 font-bold text-sm tracking-tight">{labels.settingGridStyle}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-50 dark:bg-slate-900 rounded-[1rem]">
              {(['rice', 'field', 'none'] as GridStyle[]).map((style) => (
                  <button 
                    key={style} 
                    onClick={() => onUpdate('gridStyle', style)} 
                    className={`py-2.5 text-[10px] uppercase font-black tracking-[0.1em] rounded-xl transition-all duration-300 ${settings.gridStyle === style ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm border border-slate-200/50 dark:border-slate-700/50 scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                      {style === 'rice' && labels.settingGridRice}
                      {style === 'field' && labels.settingGridField}
                      {style === 'none' && labels.settingGridNone}
                  </button>
              ))}
          </div>
      </div>
      <ToggleItem label={labels.settingShowOutline} value={settings.showOutline} onChange={() => onUpdate('showOutline', !settings.showOutline)} icon={<Eye size={18} />} />
      <ToggleItem label={labels.settingShowMainTitle || 'Show App Title'} value={settings.showMainTitle} onChange={() => onUpdate('showMainTitle', !settings.showMainTitle)} icon={<LayoutGrid size={18} />} />
    </div>
  </SettingsSection>
);

export default SettingsVisuals;
