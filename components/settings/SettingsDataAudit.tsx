/**
 * HanziMaster v0.5.3
 */
import React, { useState, useMemo } from 'react';
import { Database, ChevronUp, ChevronDown, Clipboard, Download, Loader2, CheckCircle2, Wifi } from 'lucide-react';
import { UILabels } from '../../locales/types';
import { AppSettings } from '../../types';
import { COMMON_CHARS } from '../../constants/commonChars';
import { PINYIN_MAP } from '../../constants/pinyinData';
import { useToast } from '../../context/ToastContext';
import SettingsSection from './SettingsSection';
import ToggleItem from '../ToggleItem';

interface SettingsDataAuditProps {
  labels: UILabels;
  settings: AppSettings;
  onUpdate: (key: keyof AppSettings, value: any) => void;
}

const CACHE_NAME = 'hanzi-data-local';
const LOCAL_BASE_URL = '/hanzi-data';

const SettingsDataAudit: React.FC<SettingsDataAuditProps> = ({ labels, settings, onUpdate }) => {
  const [showAudit, setShowAudit] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const { showToast } = useToast();

  const auditData = useMemo(() => {
    const total = COMMON_CHARS.length;
    if (total === 0) return { total: 0, missing: [], covered: 0, percentage: 0 };
    const missing = COMMON_CHARS.filter(char => !PINYIN_MAP[char]);
    const covered = total - missing.length;
    const percentage = Math.round((covered / total) * 100);
    return { total, missing, covered, percentage };
  }, []);

  const handleDownloadLexicon = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      const cache = await caches.open(CACHE_NAME);
      const total = COMMON_CHARS.length;
      let completed = 0;
      const chunkSize = 8; 

      for (let i = 0; i < total; i += chunkSize) {
        const chunk = COMMON_CHARS.slice(i, i + chunkSize);
        await Promise.all(chunk.map(async (char) => {
          const url = `${LOCAL_BASE_URL}/${char}.json`;
          const existing = await cache.match(url);
          if (!existing) {
            try {
                const response = await fetch(url);
                if (response.ok) await cache.put(url, response);
            } catch (e) {
                // Ignore individual file errors
            }
          }
          completed++;
          if (completed % 20 === 0 || completed === total) {
            setDownloadProgress(Math.round((completed / total) * 100));
          }
        }));
      }

      showToast(labels.downloadSuccess || "Lexicon Ready", 'success');
      if (navigator.vibrate) navigator.vibrate(50);
    } catch (error) {
      showToast(labels.downloadError || "Sync failed", 'error');
    } finally {
      setIsDownloading(false);
      setDownloadProgress(100);
    }
  };

  return (
    <SettingsSection title={labels.sectionData || "Data"}>
        <div id="settings-data-section" className="space-y-4">
            
            <ToggleItem 
                label={labels.settingOfflineMode} 
                value={settings.offlineMode} 
                onChange={() => onUpdate('offlineMode', !settings.offlineMode)}
                icon={<Wifi size={16} />}
            />

            <div id="lexicon-manager-card" className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                        <Database size={16} className="text-teal-500" />
                        {labels.pinyinCoverage || "Lexicon"}
                    </div>
                    <span className="text-[10px] font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600 text-slate-500">
                        ~2.4MB
                    </span>
                </div>
                
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mb-4">
                    <div className="h-full bg-teal-500 rounded-full transition-all duration-1000" style={{ width: `${auditData.percentage}%` }} />
                </div>

                <div className="flex flex-col gap-2">
                    <button
                        onClick={handleDownloadLexicon}
                        disabled={isDownloading}
                        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                            isDownloading 
                            ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 text-teal-600' 
                            : 'bg-white dark:bg-slate-700 border-slate-200 text-slate-700 dark:text-slate-200 hover:shadow-sm active:scale-95'
                        }`}
                    >
                        {isDownloading ? (
                            <>
                                <Loader2 size={14} className="animate-spin" />
                                {downloadProgress}% {labels.downloading}
                            </>
                        ) : downloadProgress === 100 ? (
                            <>
                                <CheckCircle2 size={14} className="text-emerald-500" />
                                {labels.downloadSuccess}
                            </>
                        ) : (
                            <>
                                <Download size={14} />
                                {labels.downloadLexicon}
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => setShowAudit(!showAudit)}
                        className="w-full flex items-center justify-between px-3 py-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <span>{auditData.missing.length} {labels.missingChars}</span>
                        {showAudit ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                </div>

                {showAudit && (
                    <div className="mt-3 animate-fade-in space-y-2">
                        <div className="max-h-24 overflow-y-auto p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[9px] font-hanzi leading-loose break-all text-slate-400">
                            {auditData.missing.join(' ')}
                        </div>
                        <button onClick={() => {
                            navigator.clipboard.writeText(auditData.missing.join(''));
                            showToast(labels.copySuccess || "Copied", 'success');
                        }} className="text-[9px] text-teal-600 font-bold flex items-center gap-1 mx-auto">
                            <Clipboard size={10} /> {labels.copyMissing}
                        </button>
                    </div>
                )}
            </div>
        </div>
    </SettingsSection>
  );
};

export default SettingsDataAudit;