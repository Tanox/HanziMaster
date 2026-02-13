
/**
 * HanziMaster v0.4.9
 */
import React from 'react';
import { Gauge, Wifi, Eye, PlayCircle, Infinity } from 'lucide-react';
import { AppSettings } from '../../types';
import { UILabels } from '../../locales/types';
import ToggleItem from '../ToggleItem';
import SettingsSection from './SettingsSection';

interface SettingsLearningProps {
  labels: UILabels;
  settings: AppSettings;
  onUpdate: (key: keyof AppSettings, value: any) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const SettingsLearning: React.FC<SettingsLearningProps> = ({ 
  labels, 
  settings, 
  onUpdate, 
  speed, 
  onSpeedChange 
}) => {
  return (
    <SettingsSection title={labels.practiceMode}>
      <div className="space-y-3">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-400 dark:bg-slate-800">
                 <Gauge size={16} />
              </div>
              <span className="text-slate-700 dark:text-slate-200 font-medium text-sm">
                  {labels.controlsSpeed}
              </span>
            </div>
            <div className="flex gap-1 bg-slate-100 dark:bg-slate-700/50 rounded-lg p-1">
              {[0.5, 1, 1.5].map(s => (
                  <button 
                    key={s} 
                    onClick={() => onSpeedChange(s)} 
                    className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
                        speed === s 
                        ? 'bg-white dark:bg-slate-600 text-teal-600 dark:text-teal-400' 
                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                    }`}
                  >
                      {s}x
                  </button>
              ))}
            </div>
         </div>

         <ToggleItem 
          label={labels.settingOfflineMode} 
          value={settings.offlineMode} 
          onChange={() => onUpdate('offlineMode', !settings.offlineMode)}
          icon={<Wifi size={16} />}
        />

        <ToggleItem 
          label={labels.settingShowOutline} 
          value={settings.showOutline} 
          onChange={() => onUpdate('showOutline', !settings.showOutline)}
          icon={<Eye size={16} />}
        />
        
        <ToggleItem 
          label={labels.settingAutoPlay} 
          value={settings.autoPlay} 
          onChange={() => onUpdate('autoPlay', !settings.autoPlay)}
          icon={<PlayCircle size={16} />}
        />

        <ToggleItem 
          label={labels.settingContinuousMode} 
          value={settings.continuousMode} 
          onChange={() => onUpdate('continuousMode', !settings.continuousMode)}
          icon={<Infinity size={16} />}
        />
      </div>
    </SettingsSection>
  );
};

export default SettingsLearning;
