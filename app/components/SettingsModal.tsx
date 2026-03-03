// app/components/SettingsModal.tsx v1.3.6
'use client';

import React, { useState } from 'react';
import { X, Layout, PenTool, BookOpen, Database, ShieldAlert, Sparkles } from 'lucide-react';
import { AppSettings, UILabels } from '../types';

import SettingsAppearance from './settings/SettingsAppearance';
import SettingsVisuals from './settings/SettingsVisuals';
import SettingsLearning from './settings/SettingsLearning';
import SettingsContent from './settings/SettingsContent';
import SettingsDataAudit from './settings/SettingsDataAudit';
import SettingsHazardZone from './settings/SettingsHazardZone';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  labels: UILabels;
  speed: number;
  onSpeedChange: (speed: number) => void;
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  currentTheme: 'light' | 'dark';
  onThemeChange: () => void;
}

type TabKey = 'appearance' | 'learning' | 'content' | 'data';

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen, onClose, settings, onUpdateSettings, labels, speed, onSpeedChange, currentLang, onLanguageChange, currentTheme, onThemeChange
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('appearance');

  if (!isOpen) return null;

  const update = (key: keyof AppSettings, value: any) => {
    onUpdateSettings({ ...settings, [key]: value });
  };

  const tabs = [
    { key: 'appearance', icon: <Layout size={18} />, label: labels.sectionAppearance || 'General' },
    { key: 'learning', icon: <PenTool size={18} />, label: labels.sectionInterface || 'Learning' },
    { key: 'content', icon: <BookOpen size={18} />, label: labels.sectionContent || 'Content' },
    { key: 'data', icon: <Database size={18} />, label: labels.sectionData || 'Storage' },
  ];

  return (
    <div id="settings-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-fade-in" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div id="settings-modal-content" className="bg-white dark:bg-slate-900 w-full max-w-2xl h-[85vh] md:h-[600px] overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/30 rounded-xl flex items-center justify-center text-teal-600">
               <Sparkles size={20} />
             </div>
             <h3 className="text-xl font-bold text-slate-800 dark:text-white">{labels.settingsTitle}</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"><X size={24} /></button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Tabs - Desktop */}
          <div id="settings-sidebar" className="hidden md:flex flex-col w-48 border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as TabKey)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === tab.key ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm border border-slate-200/50 dark:border-slate-700/50' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
            <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
               <div className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <ShieldAlert size={12} />
                  {labels.settingResetData}
               </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div id="settings-main-scroll" className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
            {/* Tab Navigation - Mobile */}
            <div className="flex md:hidden overflow-x-auto gap-2 mb-6 no-scrollbar pb-2">
               {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as TabKey)}
                    className={`flex-none flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all ${activeTab === tab.key ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
               ))}
            </div>

            {activeTab === 'appearance' && (
              <div className="animate-fade-in space-y-8">
                <SettingsAppearance labels={labels} currentTheme={currentTheme} onThemeChange={onThemeChange} currentLang={currentLang} onLanguageChange={onLanguageChange} />
                <SettingsVisuals labels={labels} settings={settings} onUpdate={update} />
              </div>
            )}
            
            {activeTab === 'learning' && (
              <div className="animate-fade-in">
                <SettingsLearning labels={labels} settings={settings} onUpdate={update} speed={speed} onSpeedChange={onSpeedChange} />
              </div>
            )}

            {activeTab === 'content' && (
              <div className="animate-fade-in">
                <SettingsContent labels={labels} settings={settings} onUpdate={update} />
              </div>
            )}

            {activeTab === 'data' && (
              <div className="animate-fade-in space-y-8">
                <SettingsDataAudit labels={labels} settings={settings} onUpdate={update} />
                <div className="pt-4">
                   <SettingsHazardZone labels={labels} />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 shrink-0">
           <p className="text-center text-xs text-slate-400 dark:text-slate-500">HanziMaster Settings</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
