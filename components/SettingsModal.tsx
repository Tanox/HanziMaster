
/**
 * HanziMaster v0.4.2
 */
import React, { useState, useMemo } from 'react';
import { X, Eye, EyeOff, PlayCircle, Infinity, Wifi, Gauge, Key, Check, ExternalLink, Moon, Sun, Globe, Palette, Database, Clipboard, ChevronDown, ChevronUp, Trash2, AlertTriangle } from 'lucide-react';
import { AppSettings, GridStyle } from '../types';
import { UILabels } from '../locales/types';
import { LANGUAGES } from '../locales';
import { COMMON_CHARS } from '../constants/commonChars';
import { PINYIN_MAP } from '../constants/pinyinData';
import ToggleItem from './ToggleItem';
import { useToast } from '../context/ToastContext';

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

const SectionHeader = ({ title }: { title: string }) => (
  <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 mt-6 first:mt-0">
    {title}
  </h4>
);

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
  const [showApiKey, setShowApiKey] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const { showToast } = useToast();

  // --- Audit Logic ---
  const auditData = useMemo(() => {
    const total = COMMON_CHARS.length;
    const missing = COMMON_CHARS.filter(char => !PINYIN_MAP[char]);
    const covered = total - missing.length;
    const percentage = Math.round((covered / total) * 100);
    return { total, missing, covered, percentage };
  }, []);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const update = (key: keyof AppSettings, value: any) => {
    onUpdateSettings({ ...settings, [key]: value });
  };

  const copyMissingToClipboard = () => {
    const text = auditData.missing.join('');
    navigator.clipboard.writeText(text)
      .then(() => showToast(labels.copySuccess || "Copied!", 'success'))
      .catch(() => showToast(labels.copyFailed || "Copy failed", 'error'));
  };

  const handleReset = () => {
    if (window.confirm(labels.resetConfirm || "Are you sure you want to clear all data?")) {
      try {
        localStorage.clear();
        // Clear caches if supported
        if ('caches' in window) {
           caches.keys().then((names) => {
             names.forEach(name => caches.delete(name));
           });
        }
        window.location.reload();
      } catch (e) {
        console.error("Reset failed", e);
        showToast(labels.toastError || "Reset failed", 'error');
      }
    }
  };

  const hasDefaultKey = Boolean(process.env.API_KEY);
  const usingCustomKey = Boolean(settings.apiKey);

  const coverageDesc = labels.pinyinCoverageDesc 
    ? labels.pinyinCoverageDesc.replace('{covered}', auditData.covered.toString()).replace('{total}', auditData.total.toString())
    : `Local pinyin mapping for random suggestions. ${auditData.covered} out of ${auditData.total} characters covered.`;

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
          
          {/* Section: Appearance */}
          <SectionHeader title={labels.sectionAppearance || 'Appearance'} />
          <div className="space-y-4 mb-4">
             {/* Theme Toggle */}
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800">
                     <Palette size={16} />
                  </div>
                  <span className="text-slate-700 dark:text-slate-200 font-medium text-sm">
                      {labels.settingTheme}
                  </span>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-700/50 p-1 rounded-lg">
                    <button
                        onClick={() => currentTheme === 'dark' && onThemeChange()}
                        className={`p-1.5 rounded-md transition-all flex items-center gap-1.5 ${currentTheme === 'light' ? 'bg-white shadow-sm text-amber-500' : 'text-slate-400'}`}
                        title={labels.themeLight}
                    >
                        <Sun size={14} />
                    </button>
                    <button
                        onClick={() => currentTheme === 'light' && onThemeChange()}
                        className={`p-1.5 rounded-md transition-all flex items-center gap-1.5 ${currentTheme === 'dark' ? 'bg-slate-600 shadow-sm text-indigo-400' : 'text-slate-400'}`}
                        title={labels.themeDark}
                    >
                        <Moon size={14} />
                    </button>
                </div>
             </div>

             {/* Language Selector */}
             <div className="space-y-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800">
                     <Globe size={16} />
                  </div>
                  <span className="text-slate-700 dark:text-slate-200 font-medium text-sm">
                      {labels.settingLanguage}
                  </span>
                </div>
                <select 
                    value={currentLang}
                    onChange={(e) => onLanguageChange(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
                >
                    {LANGUAGES.map(lang => (
                        <option key={lang.code} value={lang.code}>
                            {lang.native} ({lang.name})
                        </option>
                    ))}
                </select>
             </div>
          </div>

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

          {/* Section: Database Audit (Data Quality Check) */}
          <SectionHeader title={labels.settingDatabaseStatus || "Database Status"} />
          <div id="settings-audit-section" className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <Database size={16} className="text-teal-500" />
                    {labels.pinyinCoverage || "Pinyin Coverage"}
                </div>
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                    {auditData.percentage}%
                </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-3">
                <div 
                    className="h-full bg-teal-500 rounded-full transition-all duration-1000" 
                    style={{ width: `${auditData.percentage}%` }}
                />
            </div>

            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                {coverageDesc}
            </p>

            <button
                onClick={() => setShowAudit(!showAudit)}
                className="w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
            >
                <span className="flex items-center gap-1.5">
                    {auditData.missing.length} {labels.missingChars || "Missing Characters"}
                </span>
                {showAudit ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {showAudit && (
                <div className="mt-3 animate-fade-in">
                    <div className="max-h-32 overflow-y-auto p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-hanzi leading-loose tracking-widest text-slate-400 break-all select-all">
                        {auditData.missing.join(' ')}
                    </div>
                    <button
                        onClick={copyMissingToClipboard}
                        className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-bold text-teal-600 hover:text-teal-700 transition-colors"
                    >
                        <Clipboard size={12} />
                        {labels.copyMissing || "Copy Missing List"}
                    </button>
                </div>
            )}
          </div>

          {/* Section: API Key */}
          <SectionHeader title={labels.settingApiKey} />
          <div id="settings-apikey-section" className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Key size={16} className="text-teal-500" />
                    Gemini API Key
                </label>
                
                {usingCustomKey ? (
                     <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/30">
                        <Check size={12} />
                        {labels.badgeCustom || "Custom"}
                     </span>
                ) : hasDefaultKey ? (
                     <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-900/30">
                        <Check size={12} />
                        {labels.badgeDefault || "Default"}
                     </span>
                ) : (
                     <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                        {labels.badgeNone || "None"}
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

            <div className="flex flex-col gap-2 text-xs text-slate-500 dark:text-slate-400">
                <p className="leading-relaxed">{labels.settingApiKeyHelp}</p>
                <div className="flex items-center gap-3 mt-1">
                    <a 
                      href="https://aistudio.google.com/app/apikey" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 font-medium bg-white dark:bg-slate-700 px-3 py-1.5 rounded border border-slate-200 dark:border-slate-600 hover:border-teal-300 transition-colors"
                    >
                      {labels.getApiKey || "Get Key"}
                      <ExternalLink size={12} />
                    </a>
                </div>
            </div>
          </div>

          {/* Section: Reset (Hazard Area) */}
          <SectionHeader title={labels.settingResetData || "Reset Application"} />
          <div id="settings-reset-section" className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20 mb-6">
            <div className="flex items-start gap-3 mb-3">
               <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
               <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">
                  {labels.resetConfirm || "Clearing data will remove all your practice history, cached analyses, and personalized settings. This action is irreversible."}
               </p>
            </div>
            <button
                id="reset-all-data-btn"
                onClick={handleReset}
                className="w-full py-2.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-red-200 dark:border-red-800 shadow-sm"
            >
                <Trash2 size={14} />
                {labels.resetBtn || "Wipe All Data"}
            </button>
          </div>

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
