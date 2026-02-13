
/**
 * HanziMaster v0.4.9
 */
import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { UILabels } from '../../locales/types';
import { useToast } from '../../context/ToastContext';
import SettingsSection from './SettingsSection';

interface SettingsHazardZoneProps {
  labels: UILabels;
}

const SettingsHazardZone: React.FC<SettingsHazardZoneProps> = ({ labels }) => {
  const { showToast } = useToast();

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

  return (
    <SettingsSection title={labels.settingResetData || "Reset Application"}>
      <div id="settings-reset-section" className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20">
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
    </SettingsSection>
  );
};

export default SettingsHazardZone;
