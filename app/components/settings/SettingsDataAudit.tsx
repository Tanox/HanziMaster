
// app/components/settings/SettingsDataAudit.tsx v1.0.3
import React from 'react';
import { Database, Book, Loader2, Download, Wifi, CheckCircle2, RefreshCcw, AlertTriangle } from 'lucide-react';
import { UILabels, AppSettings } from '../../types';
import SettingsSection from './SettingsSection';
import ToggleItem from '../ToggleItem';
import { useDataSync } from '../../hooks/useDataSync';

interface SettingsDataAuditProps {
  labels: UILabels;
  settings: AppSettings;
  onUpdate: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
}

const SettingsDataAudit: React.FC<SettingsDataAuditProps> = ({ labels, settings, onUpdate }) => {
  const { state, actions } = useDataSync(labels);
  const { isLexiconDownloading, lexiconProgress, missingSample, currentTarget, isDictDownloading, isAuditing, stats } = state;

  const dictPercentage = Math.min(100, Math.round((stats.dictCovered / stats.dictTotal) * 100));
  const lexiconPercentage = Math.round((stats.lexiconCoveredCount / stats.lexiconTotal) * 100);

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
                  onClick={actions.auditLexicon}
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
                  onClick={actions.handleDownloadLexicon} 
                  disabled={isLexiconDownloading} 
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all shadow-sm ${lexiconPercentage === 100 && !isLexiconDownloading ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800 text-teal-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-md active:scale-[0.98]'}`}
                >
                    {isLexiconDownloading ? (
                      <>{lexiconProgress}% {labels.downloading}</>
                    ) : lexiconPercentage === 100 ? (
                      <><CheckCircle2 size={14} /> {labels.downloadSuccess}</>
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
                      className={`h-full bg-gradient-to-r from-indigo-500 to-purple-400 bg-[length:200%_100%] rounded-full transition-all duration-700 ${isDictDownloading ? 'animate-shimmer' : ''}`} 
                      style={{ width: `${dictPercentage}%` }} 
                    />
                </div>

                <button 
                  onClick={actions.handleDownloadDictionary} 
                  disabled={isDictDownloading} 
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all shadow-sm ${dictPercentage >= 100 && !isDictDownloading ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-md active:scale-[0.98]'}`}
                >
                    {isDictDownloading ? (
                      <><Loader2 size={14} className="animate-spin" /> {labels.downloadingDictionary}</>
                    ) : dictPercentage >= 100 ? (
                      <><CheckCircle2 size={14} /> {labels.dictionaryReady}</>
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
