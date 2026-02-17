/**
 * app/components/ui/Toast.tsx v0.7.1
 */
import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { ToastType } from '../../types';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const icons = {
    success: <CheckCircle className="text-teal-500" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
    info: <Info className="text-slate-500" size={20} />,
  };

  const backgrounds = {
    success: 'bg-teal-50 dark:bg-teal-900/80 border-teal-100 dark:border-teal-900/50',
    error: 'bg-red-50 dark:bg-red-900/80 border-red-100 dark:border-red-900/50',
    info: 'bg-slate-50 dark:bg-slate-800/80 border-slate-100 dark:border-slate-700/50',
  };

  return (
    <div
      id="toast-notification"
      className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl shadow-lg backdrop-blur-md border transition-all duration-300 ease-out transform ${backgrounds[type]} ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
      role="alert"
    >
      <div className="shrink-0">{icons[type]}</div>
      <p className="text-sm font-medium text-slate-800 dark:text-slate-100 flex-1">{message}</p>
      <button
        onClick={handleClose}
        className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;