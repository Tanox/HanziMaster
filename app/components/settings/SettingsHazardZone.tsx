// app/components/settings/SettingsHazardZone.tsx v0.7.1
import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { UILabels } from '../../types';
import { useToast } from '../../context/ToastContext';
import SettingsSection from './SettingsSection';

interface SettingsHazardZoneProps {
  labels: UILabels;
}

const SettingsHazardZone: React.FC<SettingsHazardZoneProps> = ({ labels }) => {
  const { showToast } = useToast();
  const handleReset = () => {
    if (window.confirm(labels.resetConfirm)) {
      try {
        localStorage.clear();
        if ('caches' in window) caches.keys().then(names => names.forEach(n => caches.delete(n)));
        window.location.reload();
      } catch (e) { showToast(labels.toastError, 'error'); }
    }
  };
  return (
    <SettingsSection title={labels.settingResetData}>
      <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100">
        <div className="flex items-start gap-3 mb-3">
            <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">{labels.resetConfirm}</p>
        </div>
        <button onClick={handleReset} className="w-full py-2.5 rounded-lg bg-white dark:bg-slate-800 text-red-600 font-bold text-xs flex items-center justify-center gap-2 border border-red-200">
            <Trash2 size={14} />{labels.resetBtn}
        </button>
      </div>
    </SettingsSection>
  );
};

export default SettingsHazardZone;