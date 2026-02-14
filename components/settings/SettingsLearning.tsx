
/**
 * HanziMaster v0.5.2
 */
import React from 'react';
import { Gauge, PlayCircle, Infinity } from 'lucide-react';
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
    <SettingsSection title={labels.sectionInterface || 'Interface'}>
      <div className="space-y-4">
         {/* Speed Control */}
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
                        ? 'bg-white dark:bg-slate-600 text-teal-600 dark:text-teal-400 shadow-sm' 
                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
                    }`}
                  >
                      {s}x
                  </button>
              ))}
            </div>
         </div>

        {/* Auto Play */}
        <ToggleItem 
          label={labels.settingAutoPlay} 
          value={settings.autoPlay} 
          onChange={() => onUpdate('autoPlay', !settings.autoPlay)}
          icon={<PlayCircle size={16} />}
        />

        {/* Continuous Practice */}
        <div className="space-y-1">
            <ToggleItem 
                label={labels.settingContinuousMode} 
                value={settings.continuousMode} 
                onChange={() => onUpdate('continuousMode', !settings.continuousMode)}
                icon={<Infinity size={16} />}
            />
            {labels.settingContinuousDesc && (
                <p className="text-[10px] text-slate-400 dark:text-slate-500 pl-11 leading-tight">
                    {labels.settingContinuousDesc}
                </p>
            )}
        </div>
      </div>
    </SettingsSection>
  );
};

export default SettingsLearning;
