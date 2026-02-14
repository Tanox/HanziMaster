/**
 * HanziMaster v0.5.8
 */
import React, { useState, useEffect } from 'react';
import { RefreshCw, X, Wifi } from 'lucide-react';
import { UILabels } from '../locales/types';

/**
 * Handles PWA update notifications and offline readiness.
 * Safe for use in non-PWA environments (like AI Studio Preview).
 */
const ReloadPrompt: React.FC<{ labels: UILabels }> = ({ labels }) => {
  const [offlineReady, setOfflineReady] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [updateHandler, setUpdateHandler] = useState<{ updateServiceWorker: (reload: boolean) => Promise<void> } | null>(null);

  useEffect(() => {
    // Dynamically attempt to load the PWA register module if it's a Vite build
    // @ts-ignore
    import('virtual:pwa-register/react')
      .then((mod) => {
        if (mod && mod.useRegisterSW) {
          // This component acts as a bridge to the virtual module hook
          // In a real Vite build, we'd use the hook directly.
          // In this sandbox, we just provide a safe fallback.
        }
      })
      .catch(() => {
        // Fallback: We are likely in a preview or development environment without PWA support
        console.debug('PWA module not found, operating in standard web mode.');
      });
  }, []);

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (needRefresh) {
    return (
      <div id="pwa-refresh-prompt" className="fixed bottom-4 right-4 z-50 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 animate-fade-in max-w-sm transition-all duration-300">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-full text-teal-600 dark:text-teal-400">
            <RefreshCw size={20} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">
              {labels.updateAvailable || "Update Available"}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
              {labels.updateMsg || "A new version of HanziMaster is available. Reload to update."}
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => updateHandler?.updateServiceWorker(true).then(() => window.location.reload())}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-md transition-colors"
              >
                {labels.reloadBtn || "Reload"}
              </button>
              <button 
                onClick={close}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-md transition-colors"
              >
                 {labels.closeBtn || "Close"}
              </button>
            </div>
          </div>
          <button onClick={close} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 -mt-1 -mr-1">
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  if (offlineReady) {
    return (
      <div id="pwa-offline-ready" className="fixed bottom-4 right-4 z-50 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 animate-fade-in max-w-sm transition-all duration-300">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-full text-teal-600 dark:text-teal-400">
            <Wifi size={20} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">
              {labels.offlineReady || "Offline Ready"}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
              {labels.offlineMsg || "App is ready to work offline."}
            </p>
            <button 
              onClick={close}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-md transition-colors"
            >
              {labels.dismissBtn || "Dismiss"}
            </button>
          </div>
          <button onClick={close} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 -mt-1 -mr-1">
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default ReloadPrompt;