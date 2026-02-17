/**
 * app/components/settings/SettingsDataAudit.tsx v0.7.1
 */
import React, { useState, useMemo } from 'react';
import { Database, Book, Loader2, Download, Wifi, CheckCircle2 } from 'lucide-react';
import { UILabels, AppSettings } from '../../types';
import { COMMON_CHARS } from '../../constants/commonChars';
import { SIMPLE_DICTIONARY } from '../../constants/dictionaryData';
import { useToast } from '../../context/ToastContext';
import SettingsSection from './SettingsSection';
import ToggleItem from '../ToggleItem';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface SettingsDataAuditProps {
  labels: UILabels;
  settings: AppSettings;
  onUpdate: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
}

const CACHE_NAME = 'hanzi-data-local';
const LOCAL_BASE_URL = '/hanzi-data';

const SettingsDataAudit: React.FC<SettingsDataAuditProps> = ({ labels, settings, onUpdate }) => {
  const [isLexiconDownloading, setIsLexiconDownloading] = useState(false);
  const [lexiconProgress, setLexiconProgress] = useState(0);
  
  const [offlineDict, setOfflineDict] = useLocalStorage<Record<string, string>>('offlineDictionary', {});
  const [isDictDownloading, setIsDictDownloading] = useState(false);

  const { showToast } = useToast();

  const dictAudit = useMemo(() => {
    const total = Object.keys(SIMPLE_DICTIONARY).length;
    const covered = Object.keys(offlineDict).length;
    const percentage = total > 0 ? Math.round((covered / total) * 100) : 0;
    return { total, covered, percentage };
  }, [offlineDict]);

  const handleDownloadLexicon = async () => {
    if (isLexiconDownloading) return;
    setIsLexiconDownloading(true);
    setLexiconProgress(0);
    try {
      const cache = await caches.open(CACHE_NAME);
      const total = COMMON_CHARS.length;
      
      // 分片下载避免阻塞
      const BATCH_SIZE = 50;
      for (let i = 0; i < total; i += BATCH_SIZE) {
        const batch = COMMON_CHARS.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(async (char) => {
          const url = `${LOCAL_BASE_URL}/${char}.json`;
          if (!(await cache.match(url))) {
            try { 
                const res = await fetch(url); 
                if (res.ok) await cache.put(url, res); 
            } catch (e) { /* silent catch */ }
          }
        }));
        setLexiconProgress(Math.round((Math.min(i + BATCH_SIZE, total) / total) * 100));
      }
      showToast(labels.downloadSuccess || "Lexicon Ready", 'success');
    } catch (error) { 
      showToast(labels.downloadError || "Sync failed", 'error'); 
    } finally { 
      setIsLexiconDownloading(false); 
    }
  };

  const handleDownloadDictionary = async () => {
    if (isDictDownloading) return;
    setIsDictDownloading(true);
    // 模拟解压与写入 IndexedDB 的过程
    await new Promise(resolve => setTimeout(resolve, 800));
    setOfflineDict(SIMPLE_DICTIONARY);
    showToast(labels.dictionaryReady || "Dictionary Ready", 'success');
    setIsDictDownloading(false);
  };

  return (
    <SettingsSection title={labels.sectionData || "Data Management"}>
        <div className="space-y-4">
            <ToggleItem 
              label={labels.settingOfflineMode} 
              value={settings.offlineMode} 
              onChange={() => onUpdate('offlineMode', !settings.offlineMode)} 
              icon={<Wifi size={16} />} 
            />
            
            <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                      <Database size={16} className="text-teal-500" />
                      {labels.pinyinCoverage || "Lexicon Library"}
                    </div>
                    {lexiconProgress === 100 && !isLexiconDownloading && <CheckCircle2 size={16} className="text-teal-500" />}
                </div>
                
                <div className="relative w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-300 ${isLexiconDownloading ? 'animate-pulse' : ''}`} 
                      style={{ width: `${isLexiconDownloading ? lexiconProgress : 100}%` }} 
                    />
                </div>

                <button 
                  onClick={handleDownloadLexicon} 
                  disabled={isLexiconDownloading} 
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-[0.98] disabled:opacity-50"
                >
                    {isLexiconDownloading ? (
                      <><Loader2 size={14} className="animate-spin" /> {lexiconProgress}% {labels.downloading}</>
                    ) : (
                      <><Download size={14} /> {labels.downloadLexicon}</>
                    )}
                </button>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                      <Book size={16} className="text-indigo-500" />
                      {labels.dictionaryCoverage || "Local Dictionary"}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {(labels.dictionaryStatus || "{count} cached").replace('{count}', dictAudit.covered.toString())}
                    </span>
                </div>

                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full transition-all duration-700" 
                      style={{ width: `${dictAudit.percentage}%` }} 
                    />
                </div>

                <button 
                  onClick={handleDownloadDictionary} 
                  disabled={isDictDownloading} 
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-[0.98] disabled:opacity-50"
                >
                    {isDictDownloading ? (
                      <><Loader2 size={14} className="animate-spin" /> {labels.downloadingDictionary}</>
                    ) : (
                      <><Download size={14} /> {labels.downloadDictionary}</>
                    )}
                </button>
            </div>
        </div>
    </SettingsSection>
  );
};

export default SettingsDataAudit;