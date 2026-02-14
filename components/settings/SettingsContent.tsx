
/**
 * HanziMaster v0.5.2
 */
import React from 'react';
import { BookOpen, History, Lightbulb, Box } from 'lucide-react';
import { AppSettings } from '../../types';
import { UILabels } from '../../locales/types';
import SettingsSection from './SettingsSection';
import ToggleItem from '../ToggleItem';

interface SettingsContentProps {
  labels: UILabels;
  settings: AppSettings;
  onUpdate: (key: keyof AppSettings, value: any) => void;
}

const SettingsContent: React.FC<SettingsContentProps> = ({ labels, settings, onUpdate }) => {
  return (
    <SettingsSection title={labels.sectionContent || 'Content'}>
      <div className="space-y-3">
        <ToggleItem 
          label={labels.settingShowStructure} 
          value={settings.showStructure} 
          onChange={() => onUpdate('showStructure', !settings.showStructure)}
          icon={<Box size={16} />}
        />
        <ToggleItem 
          label={labels.settingShowEtymology} 
          value={settings.showEtymology} 
          onChange={() => onUpdate('showEtymology', !settings.showEtymology)}
          icon={<History size={16} />}
        />
        <ToggleItem 
          label={labels.settingShowMnemonic} 
          value={settings.showMnemonic} 
          onChange={() => onUpdate('showMnemonic', !settings.showMnemonic)}
          icon={<Lightbulb size={16} />}
        />
        <ToggleItem 
          label={labels.settingShowExamples} 
          value={settings.showExamples} 
          onChange={() => onUpdate('showExamples', !settings.showExamples)}
          icon={<BookOpen size={16} />}
        />
      </div>
    </SettingsSection>
  );
};

export default SettingsContent;
