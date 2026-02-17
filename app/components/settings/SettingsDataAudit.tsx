// app/components/settings/SettingsDataAudit.tsx v0.9.1
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Database, Book, Loader2, Download, Wifi, CheckCircle2, Languages, RefreshCcw, AlertTriangle } from 'lucide-react';
import { UILabels, AppSettings } from '../../types';
import { COMMON_CHARS } from '../../constants/commonChars';
import { PINYIN_MAP } from '../../constants/pinyinData';
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
  const [lexiconCoveredCount, setLexiconCoveredCount] = useState(0);
  const [missingSample, setMissingSample] = useState<string[]>([]);
  
  const [offlineDict, setOfflineDict] = useLocalStorage<Record<string, string>>('offlineDictionary', {});
  const [isDictDownloading, setIsDictDownloading] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);

  const { showToast } = useToast();

  const auditLexicon = useCallback(async () => {
    setIsAuditing(true);
    try {
        const cache = await caches.open(CACHE_NAME);
        const keys = await cache.keys();
        const urls = new Set(keys.map(k => k.url));
        
        let count = 0;
        const missing: string[] = [];
        
        // Audit only high-frequency subset for the "Missing" list
        const highFreq = COMMON_CHARS.slice(0, 500);
        
        COMMON_CHARS.forEach(char => {
            const path = `${window.location.origin}${LOCAL_BASE_URL}/${char}.json`;
            if (urls.has(path)) {
                count++;
            } else if (highFreq.includes(char) && missing.length < 5) {
                missing.push(char);
            }
        });

        setLexiconCoveredCount(count);
        setMissingSample(missing);
    } catch (e) {
        console.warn("Lexicon audit failed", e);
    } finally {
        setIsAuditing(false);
    }
  }, []);

  useEffect(() => {
    auditLexicon();
  }, [auditLexicon]);

  const stats = useMemo(() => {
    const pinyinTotal = Object.keys(PINYIN_MAP).length;
    const lexiconTotal = COMMON_CHARS.length;
    const dictCovered = Object.keys(offlineDict).length;
    const dictTotal = 518; 

    return { lexiconTotal, pinyinTotal, dictCovered, dictTotal };
  }, [offlineDict]);

  const dictPercentage = Math.min(100, Math.round((stats.dictCovered / stats.dictTotal) * 100));
  const lexiconPercentage = Math.round((lexiconCoveredCount / stats.lexiconTotal) * 100);

  const handleDownloadLexicon = async () => {
    if (isLexiconDownloading) return;
    setIsLexiconDownloading(true);
    setLexiconProgress(0);
    try {
      const cache = await caches.open(CACHE_NAME);
      const total = stats.lexiconTotal;
      
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
        const currentProgress = Math.round((Math.min(i + BATCH_SIZE, total) / total) * 100);
        setLexiconProgress(currentProgress);
      }
      await auditLexicon();
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
    try {
        const module = await import('../../constants/dictionaryData');
        await new Promise(resolve => setTimeout(resolve, 600)); 
        setOfflineDict(module.SIMPLE_DICTIONARY);
        showToast(labels.dictionaryReady || "Dictionary Ready", 'success');
    } catch (e) {
        showToast(labels.dictionaryError || "Sync failed", 'error');
    } finally {
        setIsDictDownloading(false);
    }
  };

  return (
    <SettingsSection title={labels.sectionData || "Data Management"}>
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <ToggleItem 
                label={labels.settingOfflineMode} 
                value={settings.offlineMode} 
                onChange={() => onUpdate('offlineMode', !settings.offlineMode)} 
                icon={<Wifi size={16} />} 
                />
                <button 
                  onClick={auditLexicon}
                  disabled={isAuditing}
                  className="p-2 text-slate-400 hover:text-teal-500 transition-colors"
                  title="Refresh Audit"
                >
                   <RefreshCcw size={14} className={isAuditing ? 'animate-spin' : ''} />
                </button>
            </div>

            {/* Lexicon Sync */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                      <Database size={16} className="text-teal-500" />
                      {labels.downloadLexicon || "Lexicon Library"}
                    </div>
                    <div className="text-[10px] font-mono font-bold text-slate-400">
                      {lexiconCoveredCount} / {stats.lexiconTotal}
                    </div>
                </div>
                
                <div className="relative w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500 ${isLexiconDownloading ? 'animate-pulse' : ''}`} 
                      style={{ width: `${isLexiconDownloading ? lexiconProgress : lexiconPercentage}%` }} 
                    />
                </div>

                {lexiconPercentage < 100 && missingSample.length > 0 && !isLexiconDownloading && (
                    <div className="flex items-start gap-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-900/30">
                        <AlertTriangle size={12} className="text-amber-500 mt-0.5 shrink-0" />
                        <p className="text-[10px] text-amber-700 dark:text-amber-400 leading-tight">
                            {labels.missingChars || "Missing"}: {missingSample.join(', ')}...
                        </p>
                    </div>
                )}

                <button 
                  onClick={handleDownloadLexicon} 
                  disabled={isLexiconDownloading} 
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-bold transition-all shadow-sm ${lexiconPercentage === 100 && !isLexiconDownloading ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800 text-teal-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-[0.98]'}`}
                >
                    {isLexiconDownloading ? (
                      <><Loader2 size={14} className="animate-spin" /> {lexiconProgress}% {labels.downloading}</>
                    ) : lexiconPercentage === 100 ? (
                      <><CheckCircle2 size={14} /> {labels.downloadSuccess || "Offline Ready"}</>
                    ) : (
                      <><Download size={14} /> {labels.downloadLexicon}</>
                    )}
                </button>
            </div>

            {/* Dictionary Sync */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                      <Book size={16} className="text-indigo-500" />
                      {labels.dictionaryCoverage || "Local Dictionary"}
                    </div>
                    <div className="text-[10px] font-mono font-bold text-slate-400">
                      {stats.dictCovered} / {stats.dictTotal}
                    </div>
                </div>

                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full transition-all duration-700 ${isDictDownloading ? 'animate-pulse' : ''}`} 
                      style={{ width: `${dictPercentage}%` }} 
                    />
                </div>

                <button 
                  onClick={handleDownloadDictionary} 
                  disabled={isDictDownloading} 
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-bold transition-all shadow-sm ${dictPercentage >= 100 && !isDictDownloading ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-[0.98]'}`}
                >
                    {isDictDownloading ? (
                      <><Loader2 size={14} className="animate-spin" /> {labels.downloadingDictionary}</>
                    ) : dictPercentage >= 100 ? (
                      <><CheckCircle2 size={14} /> {labels.dictionaryReady || "Dictionary Active"}</>
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