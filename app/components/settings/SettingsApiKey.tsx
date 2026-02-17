// app/components/settings/SettingsApiKey.tsx v0.7.1
import React, { useState } from 'react';
import { Key, X, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { AppSettings, UILabels } from '../../types';
import SettingsSection from './SettingsSection';

interface SettingsApiKeyProps {
  labels: UILabels;
  apiKey: string | undefined;
  onUpdate: (key: keyof AppSettings, value: any) => void;
}

const SettingsApiKey: React.FC<SettingsApiKeyProps> = ({ labels, apiKey, onUpdate }) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const hasDefaultKey = Boolean(process.env.API_KEY);

  return (
    <SettingsSection title={labels.settingApiKey}>
      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100">
        <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium flex items-center gap-2"><Key size={16} className="text-teal-500" />Gemini API Key</label>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border">
                {apiKey ? labels.badgeCustom : hasDefaultKey ? labels.badgeDefault : labels.badgeNone}
            </span>
        </div>
        <div className="relative mb-2">
            <input type={showApiKey ? "text" : "password"} value={apiKey || ''} onChange={(e) => onUpdate('apiKey', e.target.value)} placeholder={labels.settingApiKeyPlaceholder} className="w-full bg-white dark:bg-slate-900 border rounded-lg pl-3 pr-20 py-2.5 text-sm outline-none focus:border-teal-500 font-mono" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {apiKey && <button onClick={() => onUpdate('apiKey', '')} className="p-1.5 text-slate-400 hover:text-red-500"><X size={14} /></button>}
                <button onClick={() => setShowApiKey(!showApiKey)} className="p-1.5 text-slate-400">{showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}</button>
            </div>
        </div>
        <div className="text-xs text-slate-500 flex flex-col gap-2">
            <p>{labels.settingApiKeyHelp}</p>
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline flex items-center gap-1 font-medium">{labels.getApiKey}<ExternalLink size={12} /></a>
        </div>
      </div>
    </SettingsSection>
  );
};

export default SettingsApiKey;