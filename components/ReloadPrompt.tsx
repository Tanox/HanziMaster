
/**
 * HanziMaster v0.3.7
 */
import { RefreshCw, X, Wifi } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';

function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (needRefresh) {
    return (
      <div className="fixed bottom-4 right-4 z-50 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 animate-fade-in max-w-sm transition-all duration-300">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-full text-teal-600 dark:text-teal-400">
            <RefreshCw size={20} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">
              Update Available
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
              A new version of HanziMaster is available. Reload to update.
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => updateServiceWorker(true)}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-md transition-colors"
              >
                Reload
              </button>
              <button 
                onClick={close}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-md transition-colors"
              >
                Close
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
      <div className="fixed bottom-4 right-4 z-50 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 animate-fade-in max-w-sm transition-all duration-300">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-full text-teal-600 dark:text-teal-400">
            <Wifi size={20} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">
              Offline Ready
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
              App is ready to work offline.
            </p>
            <button 
              onClick={close}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-md transition-colors"
            >
              Dismiss
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
}

export default ReloadPrompt;
