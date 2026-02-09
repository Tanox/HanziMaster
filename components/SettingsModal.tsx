import React, { useState } from 'react';
import { X, Eye, EyeOff, PlayCircle, Layers, BookOpen, Lightbulb, Quote, Infinity, Wifi, Shuffle, Clock, Gauge, Key, Check, AlertTriangle, ExternalLink } from 'lucide-react';
import { AppSettings, GridStyle } from '../types';
import { UILabels } from '../locales/types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  labels: UILabels;
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  labels,
  speed,
  onSpeedChange
}) => {
  const [showApiKey, setShowApiKey] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const update = (key: keyof AppSettings, value: any) => {
    onUpdateSettings({ ...settings, [key]: value });
  };

  const hasDefaultKey = Boolean(process.env.API_KEY);
  const usingCustomKey = Boolean(settings.apiKey);

  const ToggleItem = ({ 
    label, 
    value, 
    onChange, 
    icon,
    disabled = false
  }: { 
    label: string, 
    value: boolean, 
    onChange: () => void, 
    icon: React.ReactNode,
    disabled?: boolean
  }) => (
    <div className={`flex items-center justify-between ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${value ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
           {icon}
        </div>
        <span className="text-slate-700 dark:text-slate-200 font-medium text-sm">{label}</span>
      </div>
      <button 
        onClick={onChange}
        disabled={disabled}
        className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${value ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-600'}`}
      >
        <div className={`bg-white w-4 h-4 rounded-full transform transition-transform duration-300 ${value ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 mt-6 first:mt-0">
      {title}
    </h4>
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-slate-800 w-full max-w-sm max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-700 transform transition-all scale-100 scrollbar-hide flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10 shrink-0">
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
        <div className="p-6 space-y-2 overflow-y-auto">
          
          {/* Section: Visuals */}
          <SectionHeader title={labels.settingGridStyle} />
          <div className="grid grid-cols-3 gap-2 mb-2">
              {(['rice', 'field', 'none'] as GridStyle[]).map((style) => (
                <button
                  key={style}
                  onClick={() => update('gridStyle', style)}
                  className={`py-2 px-2 text-xs rounded-lg border transition-all ${
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
          
          {/* Section: API Key (Enhanced) */}
          <SectionHeader title={labels.settingApiKey} />
          <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Key size={16} className="text-teal-500" />
                    Gemini API Key
                </label>
                
                {usingCustomKey ? (
                     <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/30">
                        <Check size={12} />
                        {labels.badgeCustom}
                     </span>
                ) : hasDefaultKey ? (
                     <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-900/30">
                        <Check size={12} />
                        {labels.badgeDefault}
                     </span>
                ) : (
                     <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                        {labels.badgeNone}
                     </span>
                )}
            </div>
            
            <div className="relative mb-2">
                <input 
                    type={showApiKey ? "text" : "password"}
                    value={settings.apiKey || ''} 
                    onChange={(e) => update('apiKey', e.target.value)}
                    placeholder={labels.settingApiKeyPlaceholder}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg pl-3 pr-20 py-2.5 text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-teal-500 dark:focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all font-mono"
                    autoComplete="off"
                    spellCheck="false"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {settings.apiKey && (
                        <button
                            onClick={() => update('apiKey', '')}
                            className="p-1.5 text-slate-400 hover:text-red-500 rounded-md transition-colors"
                            title="Clear"
                        >
                            <X size={14} />
                        </button>
                    )}
                    <button
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md transition-colors"
                        title={showApiKey ? "Hide" : "Show"}
                    >
                        {showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                </div>
            </div>

            {settings.apiKey && !settings.apiKey.startsWith('AIza') && (
                <div className="flex items-start gap-2 mb-3 text-amber-600 dark:text-amber-400 text-xs px-2 animate-fade-in">
                     <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                     <span>{labels.settingApiKeyValidationMsg}</span>
                </div>
            )}

            <div className="flex flex-col gap-2 text-xs text-slate-500 dark:text-slate-400">
                <p className="leading-relaxed">{labels.settingApiKeyHelp}</p>
                <div className="flex items-center gap-3 mt-1">
                    <a 
                      href="https://aistudio.google.com/app/apikey" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 font-medium bg-white dark:bg-slate-700 px-3 py-1.5 rounded border border-slate-200 dark:border-slate-600 hover:border-teal-300 transition-colors"
                    >
                      {labels.getApiKey}
                      <ExternalLink size={12} />
                    </a>
                </div>
            </div>
          </div>

          {/* Section: Learning */}
          <SectionHeader title={labels.practiceMode} />
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
              onChange={() => update('offlineMode', !settings.offlineMode)}
              icon={<Wifi size={16} />}
            />

            <ToggleItem 
              label={labels.settingShowOutline} 
              value={settings.showOutline} 
              onChange={() => update('showOutline', !settings.showOutline)}
              icon={<Eye size={16} />}
            />
            
            <ToggleItem 
              label={labels.settingAutoPlay} 
              value={settings.autoPlay} 
              onChange={() => update('autoPlay', !settings.autoPlay)}
              icon={<PlayCircle size={16} />}
            />

            <ToggleItem 
              label={labels.settingContinuousMode} 
              value={settings.continuousMode} 
              onChange={() => update('continuousMode', !settings.continuousMode)}
              icon={<Infinity size={16} />}
            />
          </div>

          {/* Section: Interface */}
          <SectionHeader title={labels.sectionInterface} />
          <div className="space-y-3">
            <ToggleItem 
              label={labels.settingShowRandomSuggestions} 
              value={settings.showRandomSuggestions} 
              onChange={() => update('showRandomSuggestions', !settings.showRandomSuggestions)}
              icon={<Shuffle size={16} />}
            />
            <ToggleItem 
              label={labels.settingShowHistory} 
              value={settings.showHistory} 
              onChange={() => update('showHistory', !settings.showHistory)}
              icon={<Clock size={16} />}
            />
          </div>

          {/* Section: Content */}
          <SectionHeader title={labels.sectionContent} />
          <div className="space-y-3">
            <ToggleItem 
              label={labels.settingShowStructure} 
              value={settings.showStructure} 
              onChange={() => update('showStructure', !settings.showStructure)}
              icon={<Layers size={16} />}
              disabled={settings.offlineMode}
            />
            
            <ToggleItem 
              label={labels.settingShowEtymology} 
              value={settings.showEtymology} 
              onChange={() => update('showEtymology', !settings.showEtymology)}
              icon={<BookOpen size={16} />}
              disabled={settings.offlineMode}
            />

            <ToggleItem 
              label={labels.settingShowMnemonic} 
              value={settings.showMnemonic} 
              onChange={() => update('showMnemonic', !settings.showMnemonic)}
              icon={<Lightbulb size={16} />}
              disabled={settings.offlineMode}
            />

            <ToggleItem 
              label={labels.settingShowExamples} 
              value={settings.showExamples} 
              onChange={() => update('showExamples', !settings.showExamples)}
              icon={<Quote size={16} />}
              disabled={settings.offlineMode}
            />
          </div>

        </div>
        
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 sticky bottom-0 z-10 shrink-0 rounded-b-2xl">
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