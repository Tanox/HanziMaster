// app/components/settings/SettingsHazardZone.tsx v2.1.1
import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
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
    } catch (e) { showToast(labels.toastError, 'error'); }
    setShowConfirm(false);
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

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">{labels.resetConfirm}</h3>
              <button onClick={() => setShowConfirm(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-semibold">
                {labels.cancelBtn || 'Cancel'}
              </button>
              <button onClick={confirmReset} className="flex-1 py-2 rounded-lg bg-red-500 text-white font-semibold">
                {labels.resetBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </SettingsSection>
  );
};

export default SettingsHazardZone;
