import React from 'react';
import { X, Grid, Eye, PlayCircle, Layers, BookOpen, Lightbulb, Quote, Infinity } from 'lucide-react';
import { AppSettings, GridStyle } from '../types';
import { UILabels } from '../locales/types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  labels: UILabels;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  labels
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

  const ToggleItem = ({ 
    label, 
    value, 
    onChange, 
    icon 
  }: { 
    label: string, 
    value: boolean, 
    onChange: () => void, 
    icon: React.ReactNode 
  }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${value ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
           {icon}
        </div>
        <span className="text-slate-700 dark:text-slate-200 font-medium">{label}</span>
      </div>
      <button 
        onClick={onChange}
        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${value ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-600'}`}
      >
        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${value ? 'translate-x-6' : 'translate-x-0'}`} />
      </button>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-slate-800 w-full max-w-sm max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 transform transition-all scale-100 scrollbar-hide">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
            {labels.settingsTitle}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Grid Style */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Grid size={16} />
              {labels.settingGridStyle}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['rice', 'field', 'none'] as GridStyle[]).map((style) => (
                <button
                  key={style}
                  onClick={() => update('gridStyle', style)}
                  className={`py-2 px-3 text-sm rounded-lg border transition-all ${
                    settings.gridStyle === style
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
          </div>

          <hr className="border-slate-100 dark:border-slate-700" />

          {/* General Toggles */}
          <div className="space-y-4">
            <ToggleItem 
              label={labels.settingShowOutline} 
              value={settings.showOutline} 
              onChange={() => update('showOutline', !settings.showOutline)}
              icon={<Eye size={18} />}
            />
            
            <ToggleItem 
              label={labels.settingAutoPlay} 
              value={settings.autoPlay} 
              onChange={() => update('autoPlay', !settings.autoPlay)}
              icon={<PlayCircle size={18} />}
            />

            <ToggleItem 
              label={labels.settingContinuousMode} 
              value={settings.continuousMode} 
              onChange={() => update('continuousMode', !settings.continuousMode)}
              icon={<Infinity size={18} />}
            />
          </div>

          <hr className="border-slate-100 dark:border-slate-700" />

          {/* Content Display Toggles */}
           <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Display Sections
            </label>

            <ToggleItem 
              label={labels.settingShowStructure} 
              value={settings.showStructure} 
              onChange={() => update('showStructure', !settings.showStructure)}
              icon={<Layers size={18} />}
            />
            
            <ToggleItem 
              label={labels.settingShowEtymology} 
              value={settings.showEtymology} 
              onChange={() => update('showEtymology', !settings.showEtymology)}
              icon={<BookOpen size={18} />}
            />

            <ToggleItem 
              label={labels.settingShowMnemonic} 
              value={settings.showMnemonic} 
              onChange={() => update('showMnemonic', !settings.showMnemonic)}
              icon={<Lightbulb size={18} />}
            />

            <ToggleItem 
              label={labels.settingShowExamples} 
              value={settings.showExamples} 
              onChange={() => update('showExamples', !settings.showExamples)}
              icon={<Quote size={18} />}
            />
          </div>

        </div>
        
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 sticky bottom-0 z-10">
           <button 
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
