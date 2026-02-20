// app/components/settings/SettingsHazardZone.tsx v1.1.6
import React, { useState } from 'react';
import { AlertTriangle, Trash2, X, Check } from 'lucide-react';
import { UILabels } from '../../types';
import { useToast } from '../../context/ToastContext';
import SettingsSection from './SettingsSection';

interface SettingsHazardZoneProps {
  labels: UILabels;
}

const SettingsHazardZone: React.FC<SettingsHazardZoneProps> = ({ labels }) => {
  const { showToast } = useToast();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    setShowConfirm(true);
  };

  const confirmReset = () => {
    try {
      localStorage.clear();
      if ('caches' in window) caches.keys().then(names => names.forEach(n => caches.delete(n)));
      window.location.reload();
    } catch (e) { 
      showToast(labels.toastError, 'error'); 
    }
  };

  return (
    <SettingsSection title={labels.settingResetData}>
      <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 relative">
        <div className="flex items-start gap-3 mb-3">
            <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">{labels.resetConfirm}</p>
        </div>
        <button onClick={handleReset} className="w-full py-2.5 rounded-lg bg-white dark:bg-slate-800 text-red-600 font-bold text-xs flex items-center justify-center gap-2 border border-red-200">
            <Trash2 size={14} />{labels.resetBtn}
        </button>

        {showConfirm && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-xl flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-xl border border-red-200 dark:border-red-900/50 w-full max-w-xs">
              <h4 className="font-bold text-red-700 dark:text-red-400 mb-2 text-sm">{labels.settingResetData}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">{labels.resetConfirm}</p>
              <div className="flex gap-2">
                <button 
                  onClick={confirmReset} 
                  className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                >
                  <Check size={14} /> {labels.resetBtn}
                </button>
                <button 
                  onClick={() => setShowConfirm(false)} 
                  className="flex-1 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                >
                  <X size={14} /> {labels.closeBtn || "Cancel"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SettingsSection>
  );
};

export default SettingsHazardZone;
