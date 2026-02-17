// app/components/SettingsModal.tsx v0.7.1
import React from 'react';
import { X } from 'lucide-react';
import { AppSettings, UILabels } from '../types';

import SettingsAppearance from './settings/SettingsAppearance';
import SettingsVisuals from './settings/SettingsVisuals';
import SettingsLearning from './settings/SettingsLearning';
import SettingsContent from './settings/SettingsContent';
import SettingsDataAudit from './settings/SettingsDataAudit';
import SettingsApiKey from './settings/SettingsApiKey';
import SettingsHazardZone from './settings/SettingsHazardZone';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  labels: UILabels;
  speed: number;
  onSpeedChange: (speed: number) => void;
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  currentTheme: 'light' | 'dark';
  onThemeChange: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen, onClose, settings, onUpdateSettings, labels, speed, onSpeedChange, currentLang, onLanguageChange, currentTheme, onThemeChange
}) => {
  if (!isOpen) return null;

  const update = (key: keyof AppSettings, value: any) => {
    onUpdateSettings({ ...settings, [key]: value });
  };

  return (
    <div id="settings-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div id="settings-modal-content" className="bg-white dark:bg-slate-800 w-full max-w-sm max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white dark:bg-slate-800 z-10 shrink-0">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">{labels.settingsTitle}</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><X size={24} /></button>
        </div>

        <div className="p-6 space-y-8 overflow-y-auto custom-scrollbar">
          <SettingsAppearance labels={labels} currentTheme={currentTheme} onThemeChange={onThemeChange} currentLang={currentLang} onLanguageChange={onLanguageChange} />
          <SettingsVisuals labels={labels} settings={settings} onUpdate={update} />
          <SettingsLearning labels={labels} settings={settings} onUpdate={update} speed={speed} onSpeedChange={onSpeedChange} />
          <SettingsContent labels={labels} settings={settings} onUpdate={update} />
          <SettingsDataAudit labels={labels} settings={settings} onUpdate={update} />
          <SettingsApiKey labels={labels} apiKey={settings.apiKey} onUpdate={update} />
          <SettingsHazardZone labels={labels} />
        </div>
        
        <div className="p-5 bg-slate-50 dark:bg-slate-900/50 border-t sticky bottom-0 z-10 shrink-0">
           <button onClick={onClose} className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold hover:opacity-90 transition-all">{labels.closeBtn}</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;