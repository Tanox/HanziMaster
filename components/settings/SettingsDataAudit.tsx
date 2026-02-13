
/**
 * HanziMaster v0.4.9
 */
import React, { useState, useMemo } from 'react';
import { Database, ChevronUp, ChevronDown, Clipboard } from 'lucide-react';
import { UILabels } from '../../locales/types';
import { COMMON_CHARS } from '../../constants/commonChars';
import { PINYIN_MAP } from '../../constants/pinyinData';
import { useToast } from '../../context/ToastContext';
import SettingsSection from './SettingsSection';

interface SettingsDataAuditProps {
  labels: UILabels;
}

const SettingsDataAudit: React.FC<SettingsDataAuditProps> = ({ labels }) => {
  const [showAudit, setShowAudit] = useState(false);
  const { showToast } = useToast();

  const auditData = useMemo(() => {
    const total = COMMON_CHARS.length;
    const missing = COMMON_CHARS.filter(char => !PINYIN_MAP[char]);
    const covered = total - missing.length;
    const percentage = Math.round((covered / total) * 100);
    return { total, missing, covered, percentage };
  }, []);

  const copyMissingToClipboard = () => {
    const text = auditData.missing.join('');
    navigator.clipboard.writeText(text)
      .then(() => showToast(labels.copySuccess || "Copied!", 'success'))
      .catch(() => showToast(labels.copyFailed || "Copy failed", 'error'));
  };

  const coverageDesc = labels.pinyinCoverageDesc 
    ? labels.pinyinCoverageDesc.replace('{covered}', auditData.covered.toString()).replace('{total}', auditData.total.toString())
    : `Local pinyin mapping for random suggestions. ${auditData.covered} out of ${auditData.total} characters covered.`;

  return (
    <SettingsSection title={labels.settingDatabaseStatus || "Database Status"}>
        <div id="settings-audit-section" className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Database size={16} className="text-teal-500" />
                {labels.pinyinCoverage || "Pinyin Coverage"}
            </div>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                {auditData.percentage}%
            </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-3">
            <div 
                className="h-full bg-teal-500 rounded-full transition-all duration-1000" 
                style={{ width: `${auditData.percentage}%` }}
            />
        </div>

        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            {coverageDesc}
        </p>

        <button
            onClick={() => setShowAudit(!showAudit)}
            className="w-full flex items-center justify-between px-3 py-2 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
        >
            <span className="flex items-center gap-1.5">
                {auditData.missing.length} {labels.missingChars || "Missing Characters"}
            </span>
            {showAudit ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {showAudit && (
            <div className="mt-3 animate-fade-in">
                <div className="max-h-32 overflow-y-auto p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-hanzi leading-loose tracking-widest text-slate-400 break-all select-all">
                    {auditData.missing.join(' ')}
                </div>
                <button
                    onClick={copyMissingToClipboard}
                    className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-bold text-teal-600 hover:text-teal-700 transition-colors"
                >
                    <Clipboard size={12} />
                    {labels.copyMissing || "Copy Missing List"}
                </button>
            </div>
        )}
        </div>
    </SettingsSection>
  );
};

export default SettingsDataAudit;
