
/**
 * HanziMaster v0.4.9
 */
import React, { useState } from 'react';
import { Key, Check, X, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { AppSettings } from '../../types';
import { UILabels } from '../../locales/types';
import SettingsSection from './SettingsSection';

interface SettingsApiKeyProps {
  labels: UILabels;
  apiKey: string | undefined;
  onUpdate: (key: keyof AppSettings, value: any) => void;
}

const SettingsApiKey: React.FC<SettingsApiKeyProps> = ({ labels, apiKey, onUpdate }) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const hasDefaultKey = Boolean(process.env.API_KEY);
  const usingCustomKey = Boolean(apiKey);

  return (
    <SettingsSection title={labels.settingApiKey}>
      <div id="settings-apikey-section" className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
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
                value={apiKey || ''} 
                onChange={(e) => onUpdate('apiKey', e.target.value)}
                placeholder={labels.settingApiKeyPlaceholder}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg pl-3 pr-20 py-2.5 text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-teal-500 dark:focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all font-mono"
                autoComplete="off"
                spellCheck="false"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {apiKey && (
                    <button
                        onClick={() => onUpdate('apiKey', '')}
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
    </SettingsSection>
  );
};

export default SettingsApiKey;
