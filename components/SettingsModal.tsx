
/**
 * HanziMaster v0.4.9
 */
import React from 'react';
import { X } from 'lucide-react';
import { AppSettings } from '../types';
import { UILabels } from '../locales/types';

// Import refactored sub-components
import SettingsAppearance from './settings/SettingsAppearance';
import SettingsGrid from './settings/SettingsGrid';
import SettingsLearning from './settings/SettingsLearning';
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
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  labels,
  speed,
  onSpeedChange,
  currentLang,
  onLanguageChange,
  currentTheme,
  onThemeChange
}) => {
  
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const update = (key: keyof AppSettings, value: any) => {
    onUpdateSettings({ ...settings, [key]: value });
  };

  return (
    <div 
      id="settings-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div id="settings-modal-content" className="bg-white dark:bg-slate-800 w-full max-w-sm max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-700 transform transition-all scale-100 scrollbar-hide flex flex-col shadow-2xl">
        {/* Header */}
        <div id="settings-header" className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10 shrink-0">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
            {labels.settingsTitle}
          </h3>
          <button 
            id="close-settings-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div id="settings-body" className="p-6 space-y-2 overflow-y-auto">
          
          <SettingsAppearance 
            labels={labels}
            currentTheme={currentTheme}
            onThemeChange={onThemeChange}
            currentLang={currentLang}
            onLanguageChange={onLanguageChange}
          />

          <SettingsGrid 
            labels={labels}
            gridStyle={settings.gridStyle}
            onUpdate={update}
          />
          
          <SettingsLearning 
            labels={labels}
            settings={settings}
            onUpdate={update}
            speed={speed}
            onSpeedChange={onSpeedChange}
          />

          <SettingsDataAudit labels={labels} />

          <SettingsApiKey 
            labels={labels}
            apiKey={settings.apiKey}
            onUpdate={update}
          />

          <SettingsHazardZone labels={labels} />

        </div>
        
        <div id="settings-footer" className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 sticky bottom-0 z-10 shrink-0 rounded-b-2xl">
           <button 
             id="settings-footer-close-btn"
             onClick={onClose}
             className="w-full py-3 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
           >
             {labels.closeBtn}
           </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
