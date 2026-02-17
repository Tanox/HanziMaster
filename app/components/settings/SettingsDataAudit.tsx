// app/components/settings/SettingsDataAudit.tsx v0.9.3
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Database, Book, Loader2, Download, Wifi, CheckCircle2, RefreshCcw, AlertTriangle } from 'lucide-react';
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
  const [currentTarget, setCurrentTarget] = useState<string>('');
  
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
    const lexiconTotal = COMMON_CHARS.length;
    const dictCovered = Object.keys(offlineDict).length;
    const dictTotal = 518; 

    return { lexiconTotal, dictCovered, dictTotal };
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
      const BATCH_SIZE = 40;
      
      for (let i = 0; i < total; i += BATCH_SIZE) {
        const batch = COMMON_CHARS.slice(i, i + BATCH_SIZE);
        setCurrentTarget(batch[0]);
        
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
      
      setCurrentTarget('');
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
        await new Promise(resolve => setTimeout(resolve, 800)); 
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
            <div className="p-5 bg-slate-50 dark:bg-slate-900/40 rounded-[2rem] border border-slate-100 dark:border-slate-800 space-y-4 shadow-inner">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-teal-500/10 rounded-xl text-teal-600"><Database size={18} /></div>
                      <div>
                        <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{labels.downloadLexicon || "Stroke Library"}</div>
                        <div className="text-[10px] text-slate-400 font-medium">9,000+ Vector Paths</div>
                      </div>
                    </div>
                    <div className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-1 rounded-lg">
                      {lexiconPercentage}%
                    </div>
                </div>
                
                <div className="relative w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className={`h-full bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-500 bg-[length:200%_100%] rounded-full transition-all duration-500 ${isLexiconDownloading ? 'animate-shimmer' : ''}`} 
                      style={{ width: `${isLexiconDownloading ? lexiconProgress : lexiconPercentage}%` }} 
                    />
                </div>

                {isLexiconDownloading && currentTarget && (
                  <div className="flex items-center gap-2 px-1">
                    <Loader2 size={10} className="animate-spin text-teal-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Processing: {currentTarget}</span>
                  </div>
                )}

                {lexiconPercentage < 100 && missingSample.length > 0 && !isLexiconDownloading && (
                    <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/30">
                        <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-tighter">{labels.missingChars || "Missing High-Freq"}</p>
                          <p className="text-[10px] text-amber-700/60 dark:text-amber-500/60 leading-tight italic">
                              {missingSample.join(', ')}...
                          </p>
                        </div>
                    </div>
                )}

                <button 
                  onClick={handleDownloadLexicon} 
                  disabled={isLexiconDownloading} 
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all shadow-sm ${lexiconPercentage === 100 && !isLexiconDownloading ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800 text-teal-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-md active:scale-[0.98]'}`}
                >
                    {isLexiconDownloading ? (
                      <>{lexiconProgress}% {labels.downloading}</>
                    ) : lexiconPercentage === 100 ? (
                      <><CheckCircle2 size={14} /> {labels.downloadSuccess || "Offline Ready"}</>
                    ) : (
                      <><Download size={14} /> {labels.downloadLexicon}</>
                    )}
                </button>
            </div>

            {/* Dictionary Sync */}
            <div className="p-5 bg-slate-50 dark:bg-slate-900/40 rounded-[2rem] border border-slate-100 dark:border-slate-800 space-y-4 shadow-inner">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-600"><Book size={18} /></div>
                      <div>
                        <div className="text-sm font-bold text-slate-700 dark:text-slate-200">{labels.dictionaryCoverage || "Offline Dictionary"}</div>
                        <div className="text-[10px] text-slate-400 font-medium">Essential Meanings</div>
                      </div>
                    </div>
                    <div className="text-[10px] font-mono font-bold text-slate-400">
                      {stats.dictCovered} / {stats.dictTotal}
                    </div>
                </div>

                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className={`h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full transition-all duration-700 ${isDictDownloading ? 'animate-pulse' : ''}`} 
                      style={{ width: `${dictPercentage}%` }} 
                    />
                </div>

                <button 
                  onClick={handleDownloadDictionary} 
                  disabled={isDictDownloading} 
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all shadow-sm ${dictPercentage >= 100 && !isDictDownloading ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-md active:scale-[0.98]'}`}
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