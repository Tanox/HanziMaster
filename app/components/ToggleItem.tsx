// app/components/ToggleItem.tsx v0.7.1
import React from 'react';

interface ToggleItemProps {
  label: string;
  value: boolean;
  onChange: () => void;
  icon: React.ReactNode;
  disabled?: boolean;
}

const ToggleItem: React.FC<ToggleItemProps> = ({ label, value, onChange, icon, disabled = false }) => (
  <div className={`flex items-center justify-between ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${value ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
         {icon}
      </div>
      <span className="text-slate-700 dark:text-slate-200 font-medium text-sm">{label}</span>
    </div>
    <button onClick={onChange} disabled={disabled} className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${value ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
      <div className={`bg-white w-4 h-4 rounded-full transform transition-transform duration-300 ${value ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  </div>
);

export default ToggleItem;