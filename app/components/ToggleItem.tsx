// app/components/ToggleItem.tsx v1.3.4
import React from 'react';

interface ToggleItemProps {
  label: string;
  value: boolean;
  onChange: () => void;
  icon: React.ReactNode;
  disabled?: boolean;
}

const ToggleItem: React.FC<ToggleItemProps> = ({ label, value, onChange, icon, disabled = false }) => (
  <div className={`flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300 ${disabled ? 'opacity-40 pointer-events-none' : 'hover:border-slate-200 dark:hover:border-slate-700'}`}>
    <div className="flex items-center gap-4">
      <div className={`p-2.5 rounded-xl transition-colors duration-300 ${value ? 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400' : 'bg-slate-50 text-slate-400 dark:bg-slate-900'}`}>
         {icon}
      </div>
      <span className="text-slate-700 dark:text-slate-200 font-bold text-sm tracking-tight">{label}</span>
    </div>
    <button 
      onClick={onChange} 
      disabled={disabled} 
      className={`w-12 h-7 rounded-full p-1 transition-all duration-500 ease-in-out ${value ? 'bg-teal-500 shadow-lg shadow-teal-500/20' : 'bg-slate-200 dark:bg-slate-700'}`}
      aria-checked={value}
      role="switch"
    >
      <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-500 ease-in-out ${value ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  </div>
);

export default ToggleItem;
