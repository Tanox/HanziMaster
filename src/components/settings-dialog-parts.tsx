// src/components/settings-dialog-parts.tsx v5.2.51
'use client';

/** 设置面板的开关行与分区标题；从 settings-dialog.tsx 拆出以满足单文件 200 行门禁。 */

export function SwitchRow({ label, desc, checked, onChange }: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-ink-500 dark:text-ink-400">{desc}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-vermilion-500' : 'bg-ink-200 dark:bg-ink-700'}`}
      >
        <span className={`absolute top-0.5 start-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'ltr:translate-x-5 rtl:-translate-x-5' : ''}`} />
      </button>
    </div>
  );
}

export const sectionTitle = 'text-xs font-semibold uppercase tracking-wide text-ink-400 dark:text-ink-500';
