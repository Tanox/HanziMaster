/**
 * app/components/ReloadPrompt.tsx v0.7.1
 */
import React, { useState, useEffect } from 'react';
import { RefreshCw, X, Wifi } from 'lucide-react';
import { UILabels } from '../types';

/**
 * 健壮的 Service Worker 注册 Hook
 * 适配浏览器原生 API，不依赖 Vite 虚拟模块
 */
const useRegisterSW = () => {
  const [offlineReady, setOfflineReady] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg);
        
        // 监听新版本的 Service Worker
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setNeedRefresh(true);
              } else if (newWorker.state === 'installed') {
                setOfflineReady(true);
              }
            });
          }
        });
      });

      // 检查每小时自动更新
      const interval = setInterval(() => {
        if (registration) {
          registration.update().catch(() => console.debug('SW update check failed.'));
        }
      }, 60 * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [registration]);

  const updateServiceWorker = async (reloadPage?: boolean) => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    if (reloadPage) window.location.reload();
  };

  return {
    offlineReady: [offlineReady, setOfflineReady] as [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    needRefresh: [needRefresh, setNeedRefresh] as [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    updateServiceWorker,
  };
};

const ReloadPrompt: React.FC<{ labels: UILabels }> = ({ labels }) => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  const handleUpdate = () => {
    updateServiceWorker(true);
  };

  if (needRefresh) {
    return (
      <div id="pwa-refresh-prompt" className="fixed bottom-4 right-4 z-50 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 animate-fade-in max-w-sm transition-all duration-300">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-full text-teal-600 dark:text-teal-400">
            <RefreshCw size={20} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">{labels.updateAvailable || "Update Available"}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">{labels.updateMsg || "A new version is available. Click to reload."}</p>
            <div className="flex gap-2">
              <button onClick={handleUpdate} className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-md transition-colors">{labels.reloadBtn || "Reload"}</button>
              <button onClick={close} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-md">{labels.closeBtn || "Close"}</button>
            </div>
          </div>
          <button onClick={close} className="text-slate-400 p-1"><X size={16} /></button>
        </div>
      </div>
    );
  }

  if (offlineReady) {
    return (
      <div id="pwa-offline-ready" className="fixed bottom-4 right-4 z-50 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 animate-fade-in max-w-sm transition-all duration-300">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-teal-50 dark:bg-teal-900/30 rounded-full text-teal-600 dark:text-teal-400"><Wifi size={20} /></div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-1">{labels.offlineReady || "App Ready Offline"}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">{labels.offlineMsg || "The app has been cached for offline use."}</p>
            <button onClick={close} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-md">{labels.dismissBtn || "Dismiss"}</button>
          </div>
          <button onClick={close} className="text-slate-400 p-1"><X size={16} /></button>
        </div>
      </div>
    );
  }

  return null;
};

export default ReloadPrompt;